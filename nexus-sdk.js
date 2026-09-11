/**
 * Nexus Retail Operations Management Suite - Official Universal SDK
 * Compatible with Node.js (v18+), Modern Browsers, React Native, and Handheld PDAs (Zebra/Honeywell)
 * 
 * Provides type-safe wrappers for:
 * - Scoped API Key Authentication
 * - 11 Retail Operations MCP Tools (Workforce, Tasks, Floor Map Telemetry, POS/Inventory, Compliance)
 * - Server-Sent Events (SSE) Real-Time Data Streaming Hub
 * 
 * @example
 * const { NexusRetail } = require('./nexus-sdk.js');
 * const nexus = new NexusRetail({ baseUrl: 'http://localhost:3050', apiKey: 'nexus_live_agent_admin_9x82' });
 * const attendance = await nexus.workforce.getAttendance({ zone: 'Storage Bay B' });
 */

class NexusRetail {
  /**
   * @param {Object} options
   * @param {string} [options.baseUrl='http://localhost:3050'] - Retail API Gateway URL
   * @param {string} [options.apiKey='nexus_dev_open_key'] - Scoped Bearer API Key
   * @param {number} [options.timeoutMs=15000] - Request timeout in milliseconds
   */
  constructor(options = {}) {
    this.baseUrl = (options.baseUrl || 'http://localhost:3050').replace(/\/$/, '');
    this.apiKey = options.apiKey || 'nexus_dev_open_key';
    this.timeoutMs = options.timeoutMs || 15000;
    this._rpcIdCounter = 1;

    // Sub-modules
    this.auth = new NexusAuthModule(this);
    this.workforce = new NexusWorkforceModule(this);
    this.duties = new NexusDutiesModule(this);
    this.telemetry = new NexusTelemetryModule(this);
    this.inventory = new NexusInventoryModule(this);
    this.reports = new NexusReportsModule(this);
    this.stream = new NexusStreamModule(this);
  }

  /**
   * Invokes an MCP tool via standard JSON-RPC 2.0
   * @param {string} toolName
   * @param {Object} [args={}]
   * @returns {Promise<any>}
   */
  async callTool(toolName, args = {}) {
    const payload = {
      jsonrpc: '2.0',
      id: this._rpcIdCounter++,
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args
      }
    };

    const response = await this._fetch('/api/mcp', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (response.error) {
      const err = new Error(response.error.message || `MCP Error ${response.error.code}`);
      err.code = response.error.code;
      throw err;
    }

    if (response.result && response.result.content && response.result.content[0]) {
      const rawText = response.result.content[0].text;
      try {
        return JSON.parse(rawText);
      } catch (e) {
        return rawText;
      }
    }

    return response.result;
  }

  /**
   * Retrieves full MCP Tool Catalog schema
   * @returns {Promise<Array>}
   */
  async listTools() {
    const data = await this._fetch('/api/mcp/tools', { method: 'GET' });
    return data.tools || [];
  }

  /**
   * Low-level fetch wrapper with Auth and Timeout
   * @private
   */
  async _fetch(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'x-api-key': this.apiKey,
      ...(options.headers || {})
    };

    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), this.timeoutMs) : null;

    try {
      const res = await fetch(url, {
        ...options,
        headers,
        signal: controller ? controller.signal : undefined
      });

      if (timeoutId) clearTimeout(timeoutId);

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errorMsg = json.error || `HTTP ${res.status}: ${res.statusText}`;
        const err = new Error(errorMsg);
        err.status = res.status;
        throw err;
      }

      return json;
    } catch (err) {
      if (timeoutId) clearTimeout(timeoutId);
      throw err;
    }
  }
}

// =========================================================================
// MODULE 1: AUTHENTICATION
// =========================================================================
class NexusAuthModule {
  constructor(client) {
    this.client = client;
  }

  /**
   * Verify API key validity, role, clearance rank, and granted scopes
   * @returns {Promise<{ authenticated: boolean, client: string, role: string, rank: number, scopes: string[] }>}
   */
  async verify() {
    return this.client._fetch('/api/auth/verify', { method: 'GET' });
  }
}

// =========================================================================
// MODULE 2: WORKFORCE & LABOR COMPLIANCE
// =========================================================================
class NexusWorkforceModule {
  constructor(client) {
    this.client = client;
  }

  /**
   * Get real-time shift attendance
   * @param {Object} [filter]
   * @param {string} [filter.department] - e.g. "Logistics & Bay Storage", "Apparel & Fashion"
   * @param {string} [filter.zone] - e.g. "Storage Bay B", "North Wing #42"
   * @param {boolean} [filter.clockedInOnly=true]
   */
  async getAttendance(filter = {}) {
    return this.client.callTool('get_shift_attendance', {
      department: filter.department,
      zone: filter.zone,
      clocked_in_only: filter.clockedInOnly !== undefined ? filter.clockedInOnly : true
    });
  }

  /**
   * Audit statutory labor law compliance: 5-hour continuous shift meal rule and rest breaks
   * @param {Object} [options]
   * @param {number} [options.maxContinuousHours=5.0]
   */
  async auditLaborCompliance(options = {}) {
    return this.client.callTool('audit_labor_compliance', {
      max_continuous_hours_threshold: options.maxContinuousHours || 5.0
    });
  }
}

// =========================================================================
// MODULE 3: TASK & SHIFT DUTIES
// =========================================================================
class NexusDutiesModule {
  constructor(client) {
    this.client = client;
  }

  /**
   * Dispatch operational task to floor crew with checklist
   * @param {Object} duty
   * @param {string} duty.title - Task title
   * @param {string} duty.zone - Mall / store zone
   * @param {string} [duty.department] - Assigned department
   * @param {string} [duty.teamLead] - Name of designated lead
   * @param {'Low'|'Medium'|'High'|'Urgent'} [duty.priority='High']
   * @param {string[]} [duty.checklist] - Array of subtask strings
   */
  async dispatch(duty) {
    return this.client.callTool('dispatch_shift_duty', {
      title: duty.title,
      zone: duty.zone,
      department: duty.department,
      team_lead_name: duty.teamLead,
      priority: duty.priority || 'High',
      checklist_items: duty.checklist || []
    });
  }

  /**
   * Query floor duties filtered by zone and status
   * @param {Object} [filter]
   * @param {string} [filter.zone]
   * @param {'All'|'In Progress'|'Pending Approval'|'Signed Off'} [filter.status='All']
   */
  async list(filter = {}) {
    return this.client.callTool('list_shift_duties', {
      zone: filter.zone,
      status: filter.status || 'All'
    });
  }

  /**
   * Manager sign-off or rework request for a completed task
   * @param {Object} params
   * @param {number} params.dutyId - Task ID
   * @param {'approve'|'rework'} [params.action='approve']
   * @param {string} [params.notes] - Supervisor feedback
   */
  async signOff(params) {
    return this.client.callTool('sign_off_duty', {
      duty_id: params.dutyId,
      action: params.action || 'approve',
      notes: params.notes || ''
    });
  }
}

// =========================================================================
// MODULE 4: FLOOR MAP TELEMETRY & EMERGENCY ESCALATIONS
// =========================================================================
class NexusTelemetryModule {
  constructor(client) {
    this.client = client;
  }

  /**
   * Retrieve spatial density, duty halos, and radar beacons across all 9 zones
   * @param {string} [zone] - Optional zone filter
   */
  async getFloorMap(zone) {
    return this.client.callTool('get_floor_map_telemetry', zone ? { zone } : {});
  }

  /**
   * Escalate an emergency hazard, spill, or POS outage, triggering red radar beacons on Digital Twin map
   * @param {Object} incident
   * @param {string} incident.category - e.g. "Spill / Slip Hazard", "POS Offline", "Security / Theft"
   * @param {string} incident.zone - Zone location
   * @param {'Normal'|'Urgent'|'Emergency'} [incident.urgency='Urgent']
   * @param {string} incident.description - Detailed incident explanation
   */
  async escalateIncident(incident) {
    return this.client.callTool('escalate_floor_incident', {
      category: incident.category,
      zone: incident.zone,
      urgency: incident.urgency || 'Urgent',
      description: incident.description
    });
  }

  /**
   * Resolve an active floor incident and deactivate its radar map beacon
   * @param {string} escalationId - e.g. "ESC-101"
   */
  async resolveIncident(escalationId) {
    return this.client.callTool('resolve_floor_incident', {
      escalation_id: escalationId
    });
  }

  /**
   * Broadcast custom alert or webhook payload to all connected SSE clients
   * @param {string} event - Event name
   * @param {Object} data - Payload data
   */
  async broadcast(event, data) {
    return this.client._fetch('/api/telemetry/broadcast', {
      method: 'POST',
      body: JSON.stringify({ event, data })
    });
  }
}

// =========================================================================
// MODULE 5: HARDWARE SCANNER & INVENTORY MANAGEMENT
// =========================================================================
class NexusInventoryModule {
  constructor(client) {
    this.client = client;
  }

  /**
   * Decodes product SKU barcode or associate security NFC/QR ID badge
   * @param {string} code - Barcode string or Employee ID (e.g. "EL-OM-27", "NEX-1001")
   */
  async lookupBarcode(code) {
    return this.client.callTool('lookup_barcode', { code });
  }

  /**
   * Adjust warehouse or floor stock: pallet receiving (+N) or sales/shrinkage deduction (-N)
   * @param {Object} params
   * @param {string} params.sku - Product SKU
   * @param {number} params.deltaUnits - Units to adjust (positive or negative integer)
   */
  async adjustStock(params) {
    return this.client.callTool('adjust_inventory_stock', {
      sku: params.sku,
      delta_units: params.deltaUnits
    });
  }
}

// =========================================================================
// MODULE 6: OPERATIONAL DIGESTS & REPORTS
// =========================================================================
class NexusReportsModule {
  constructor(client) {
    this.client = client;
  }

  /**
   * Generates end-of-shift operational digest with task KPIs, compliance summary, and replenishment alerts
   * @param {Object} [options]
   * @param {string} [options.shiftName='Afternoon Shift']
   * @param {string} [options.supervisorNotes]
   */
  async generateHandoverReport(options = {}) {
    return this.client.callTool('generate_shift_handover_report', {
      shift_name: options.shiftName || 'Afternoon Shift',
      supervisor_notes: options.supervisorNotes || ''
    });
  }
}

// =========================================================================
// MODULE 7: SERVER-SENT EVENTS (SSE) REAL-TIME STREAMING
// =========================================================================
class NexusStreamModule {
  constructor(client) {
    this.client = client;
    this.listeners = new Map();
    this.activeSource = null;
    this.isConnected = false;
  }

  /**
   * Connect to real-time telemetry stream
   * @returns {NexusStreamModule}
   */
  connect() {
    if (this.activeSource) return this;

    const streamUrl = `${this.client.baseUrl}/api/telemetry/stream?api_key=${encodeURIComponent(this.client.apiKey)}`;

    // In Browser or environments with global EventSource
    if (typeof EventSource !== 'undefined') {
      this.activeSource = new EventSource(streamUrl);

      this.activeSource.onopen = () => {
        this.isConnected = true;
        this._dispatch('open', { connected: true });
      };

      this.activeSource.onerror = (err) => {
        this.isConnected = false;
        this._dispatch('error', err);
      };

      // Standard retail event listeners
      const events = ['initial_sync', 'incident_created', 'incident_resolved', 'duty_dispatched', 'duty_signed_off', 'stock_adjusted'];
      events.forEach(evt => {
        this.activeSource.addEventListener(evt, (e) => {
          try {
            this._dispatch(evt, JSON.parse(e.data));
          } catch (err) {
            this._dispatch(evt, e.data);
          }
        });
      });
    } else {
      // Node.js fallback using standard HTTP stream
      const http = this.client.baseUrl.startsWith('https') ? require('https') : require('http');
      const req = http.request(streamUrl, {
        headers: {
          'Authorization': `Bearer ${this.client.apiKey}`,
          'Accept': 'text/event-stream'
        }
      }, (res) => {
        if (res.statusCode === 200) {
          this.isConnected = true;
          this._dispatch('open', { connected: true });
        }

        let buffer = '';
        res.on('data', (chunk) => {
          buffer += chunk.toString();
          const lines = buffer.split('\n\n');
          buffer = lines.pop(); // keep remainder

          for (const block of lines) {
            if (!block.trim()) continue;
            let eventName = 'message';
            let dataStr = '';

            for (const line of block.split('\n')) {
              if (line.startsWith('event: ')) {
                eventName = line.replace('event: ', '').trim();
              } else if (line.startsWith('data: ')) {
                dataStr = line.replace('data: ', '').trim();
              }
            }

            if (dataStr) {
              try {
                this._dispatch(eventName, JSON.parse(dataStr));
              } catch (e) {
                this._dispatch(eventName, dataStr);
              }
            }
          }
        });

        res.on('end', () => {
          this.isConnected = false;
          this._dispatch('close', {});
        });
      });

      req.on('error', (err) => {
        this.isConnected = false;
        this._dispatch('error', err);
      });

      req.end();
      this.activeSource = req;
    }

    return this;
  }

  /**
   * Subscribe to a streaming event
   * @param {string} event - e.g. 'incident_created', 'duty_dispatched', 'stock_adjusted'
   * @param {Function} handler - Callback function
   */
  on(event, handler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(handler);
    return this;
  }

  /**
   * Unsubscribe from an event
   * @param {string} event
   * @param {Function} handler
   */
  off(event, handler) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(handler);
    }
    return this;
  }

  /**
   * Disconnect the active stream
   */
  disconnect() {
    if (this.activeSource) {
      if (typeof this.activeSource.close === 'function') {
        this.activeSource.close();
      } else if (typeof this.activeSource.destroy === 'function') {
        this.activeSource.destroy();
      }
      this.activeSource = null;
      this.isConnected = false;
    }
  }

  _dispatch(event, data) {
    if (this.listeners.has(event)) {
      for (const handler of this.listeners.get(event)) {
        try {
          handler(data);
        } catch (e) {
          console.error(`[NexusStream] Error in "${event}" handler:`, e);
        }
      }
    }
  }
}

// =========================================================================
// EXPORTS: Universal CommonJS & Browser Global Support
// =========================================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    NexusRetail,
    NexusAuthModule,
    NexusWorkforceModule,
    NexusDutiesModule,
    NexusTelemetryModule,
    NexusInventoryModule,
    NexusReportsModule,
    NexusStreamModule
  };
}

if (typeof window !== 'undefined') {
  window.NexusRetail = NexusRetail;
}
