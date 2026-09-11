/**
 * Nexus Retail Operations Management Suite - Model Context Protocol (MCP) Server
 * Standard: JSON-RPC 2.0 over stdio and HTTP
 * Enables AI Agents (Antigravity, Claude, Cursor) to monitor store telemetry,
 * dispatch floor staff, audit labor law compliance, and manage inventory.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const EventEmitter = require('events');

// Real-time Event Broadcaster for SSE and webhooks
const mcpEvents = new EventEmitter();

// Store Mock Data & State Engine
const STORE_DATA_PATH = path.join(__dirname, 'mcp-state.json');

function loadState() {
  try {
    if (fs.existsSync(STORE_DATA_PATH)) {
      return JSON.parse(fs.readFileSync(STORE_DATA_PATH, 'utf8'));
    }
  } catch (e) {}

  return {
    departments: [
      'Human Resources & Talent', 'Apparel & Fashion', 'Electronics & Gadgets', 'Logistics & Bay Storage',
      'Customer Relations', 'Security & Safety', 'Facilities & Maintenance',
      'Food & Beverage', 'Cashier & Front End', 'Beauty & Cosmetics', 'Home Goods & Furniture'
    ],
    zones: [
      'North Wing #42', 'Storage Bay B', 'West Gallery', 'East Promenade',
      'Central Mall HQ', 'South Atrium', 'Service Core A', 'Food Court Deck', 'Upper Mezzanine'
    ],
    staff: [
      { id: 'NEX-0001', name: 'Marcus Vance', role: 'Global Administrator', rank: 5, dept: 'Executive Operations', zone: 'Central Mall HQ', clockedIn: true, clockInTime: '07:30 AM' },
      { id: 'NEX-0003', name: 'Rachel Adams', role: 'HR Director', rank: 4, dept: 'Human Resources & Talent', zone: 'Central Mall HQ', clockedIn: true, clockInTime: '08:15 AM' },
      { id: 'NEX-0004', name: 'Benjamin Hayes', role: 'People Operations Lead', rank: 3, dept: 'Human Resources & Talent', zone: 'Central Mall HQ', clockedIn: true, clockInTime: '08:30 AM' },
      { id: 'NEX-0005', name: 'Samantha Clark', role: 'Talent Acquisition Specialist', rank: 2, dept: 'Human Resources & Talent', zone: 'Central Mall HQ', clockedIn: true, clockInTime: '08:45 AM' },
      { id: 'NEX-8492', name: 'Elena Rodriguez', role: 'Senior Sales Lead', rank: 3, dept: 'Apparel & Fashion', zone: 'North Wing #42', clockedIn: true, clockInTime: '08:45 AM' },
      { id: 'NEX-3401', name: 'David Chen', role: 'Inventory Specialist', rank: 2, dept: 'Logistics & Bay Storage', zone: 'Storage Bay B', clockedIn: true, clockInTime: '09:00 AM' },
      { id: 'NEX-1044', name: 'Anita Jones', role: 'Fashion Consultant', rank: 1, dept: 'Apparel & Fashion', zone: 'North Wing #42', clockedIn: true, clockInTime: '09:15 AM' },
      { id: 'NEX-1001', name: 'James Smith', role: 'Dock Receiver', rank: 1, dept: 'Logistics & Bay Storage', zone: 'Storage Bay B', clockedIn: true, clockInTime: '08:00 AM' }
    ],
    duties: [
      { id: 201, title: 'Inventory Audit - North Wing', zone: 'North Wing #42', lead: 'Elena Rodriguez', status: 'Pending Approval', priority: 'High' },
      { id: 202, title: 'Display Window Restyling', zone: 'East Promenade', lead: 'Elena Rodriguez', status: 'In Progress', priority: 'Medium' },
      { id: 203, title: 'Storage Bay B Inventory Sorting', zone: 'Storage Bay B', lead: 'David Chen', status: 'In Progress', priority: 'High' }
    ],
    escalations: [
      { id: 'ESC-101', category: 'Stock Depletion', zone: 'North Wing #42', urgency: 'Urgent', desc: 'Depleted size S/M mannequins during rush.', status: 'Open' },
      { id: 'ESC-102', category: 'Sensor Malfunction', zone: 'Storage Bay B', urgency: 'Normal', desc: 'Dock 3 sensor sticking.', status: 'Open' }
    ],
    inventory: [
      { sku: 'EL-OM-27', name: 'OLED Monitor 27"', stock: 145, max: 200, bay: 'Bay B-4', price: 349.99 },
      { sku: 'FA-WP-L', name: 'Winter Parka - L', stock: 12, max: 80, bay: 'Bay A-1', price: 129.50 },
      { sku: 'EL-WE-P', name: 'Wireless Earbuds Pro', stock: 0, max: 150, bay: 'Bay B-2', price: 89.99 },
      { sku: 'HG-EC-B', name: 'Ergo Office Chair', stock: 45, max: 60, bay: 'Bay C-3', price: 219.00 }
    ],
    swaps: [
      { id: 'SWAP-101', requester: 'Anita Jones', target: 'Elena Rodriguez', shift: 'Wed Oct 25 - Morning', status: 'Pending Coworker' }
    ]
  };
}

function saveState(state) {
  try {
    fs.writeFileSync(STORE_DATA_PATH, JSON.stringify(state, null, 2), 'utf8');
  } catch (e) {}
}

const state = loadState();

// Tool Catalog Definitions conforming to MCP Specification
const MCP_TOOLS = [
  {
    name: 'get_shift_attendance',
    description: 'Query real-time staff attendance, clock-in times, and break status across store departments or zones.',
    inputSchema: {
      type: 'object',
      properties: {
        department: { type: 'string', description: 'Filter by department (e.g. "Logistics & Bay Storage", "Apparel & Fashion")' },
        zone: { type: 'string', description: 'Filter by mall zone (e.g. "North Wing #42", "Storage Bay B")' },
        clocked_in_only: { type: 'boolean', default: true, description: 'Only return currently clocked-in personnel' }
      }
    }
  },
  {
    name: 'audit_labor_compliance',
    description: 'Audit employees for legal labor law compliance: 5-hour continuous shift meal break mandate and 15m rest break tracking.',
    inputSchema: {
      type: 'object',
      properties: {
        max_continuous_hours_threshold: { type: 'number', default: 5.0, description: 'Statutory threshold in hours for meal violation penalties' }
      }
    }
  },
  {
    name: 'dispatch_shift_duty',
    description: 'Dispatch an urgent or scheduled multi-staff operational duty to the store floor with designated lead, assignees, and checklist.',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Title of the operational task (e.g. "Spill Cleanup & Safety Hazard Triage")' },
        zone: { type: 'string', description: 'Store floor zone (e.g. "North Wing #42", "South Atrium")' },
        department: { type: 'string', description: 'Department responsible for duty' },
        team_lead_name: { type: 'string', description: 'Name of the designated team lead' },
        priority: { type: 'string', enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'High' },
        checklist_items: { type: 'array', items: { type: 'string' }, description: 'Checklist subtasks for crew' }
      },
      required: ['title', 'zone']
    }
  },
  {
    name: 'list_shift_duties',
    description: 'Retrieve floor duties filtered by zone, lead, or completion status (In Progress, Pending Approval, Signed Off).',
    inputSchema: {
      type: 'object',
      properties: {
        zone: { type: 'string', description: 'Filter by store zone' },
        status: { type: 'string', enum: ['All', 'In Progress', 'Pending Approval', 'Signed Off'], default: 'All' }
      }
    }
  },
  {
    name: 'sign_off_duty',
    description: 'Manager 1-click authorization or rework request for a completed task checklist.',
    inputSchema: {
      type: 'object',
      properties: {
        duty_id: { type: 'number', description: 'Duty ID to approve' },
        action: { type: 'string', enum: ['approve', 'rework'], default: 'approve' },
        notes: { type: 'string', description: 'Manager sign-off notes or rework instructions' }
      },
      required: ['duty_id']
    }
  },
  {
    name: 'get_floor_map_telemetry',
    description: 'Retrieve spatial telemetry for all 9 retail zones: headcount on duty, active duty halos, escalation radar beacons, and floor coverage index.',
    inputSchema: {
      type: 'object',
      properties: {
        zone: { type: 'string', description: 'Optional: specific zone to query' }
      }
    }
  },
  {
    name: 'escalate_floor_incident',
    description: 'Submit an emergency safety hazard, spill alert, or POS outage ticket that immediately triggers a red radar beacon on the Digital Twin map.',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', description: 'Hazard category (e.g. "Spill / Slip Hazard", "POS Offline", "Stock Outage")' },
        zone: { type: 'string', description: 'Store floor zone where incident occurred' },
        urgency: { type: 'string', enum: ['Normal', 'Urgent', 'Emergency'], default: 'Urgent' },
        description: { type: 'string', description: 'Detailed incident report' }
      },
      required: ['category', 'zone', 'description']
    }
  },
  {
    name: 'resolve_floor_incident',
    description: 'Mark an active floor incident or hazard escalation as resolved, deactivating its map beacon.',
    inputSchema: {
      type: 'object',
      properties: {
        escalation_id: { type: 'string', description: 'Incident ID (e.g. "ESC-101")' },
        resolution_notes: { type: 'string', description: 'Resolution explanation' }
      },
      required: ['escalation_id']
    }
  },
  {
    name: 'lookup_barcode',
    description: 'Optical scanner lookup for product SKU tags or employee ID badges, returning stock, storage bay, or credentials.',
    inputSchema: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'Barcode SKU string (e.g. "EL-OM-27") or Employee ID (e.g. "NEX-0001")' }
      },
      required: ['code']
    }
  },
  {
    name: 'adjust_inventory_stock',
    description: 'Record dock receiving stock arrival (+N) or sales adjustment (-N) with audit tracking.',
    inputSchema: {
      type: 'object',
      properties: {
        sku: { type: 'string', description: 'Product SKU (e.g. "EL-OM-27")' },
        delta_units: { type: 'number', description: 'Positive number for receipts, negative for deductions' },
        reason: { type: 'string', description: 'Adjustment note (e.g. "Dock Pallet Arrival", "Damaged Defect")' }
      },
      required: ['sku', 'delta_units']
    }
  },
  {
    name: 'generate_shift_handover_report',
    description: 'Compile an end-of-shift operational digest with task KPIs, open escalations, low-stock warnings, and attendance scores.',
    inputSchema: {
      type: 'object',
      properties: {
        shift_name: { type: 'string', default: 'Afternoon Shift', description: 'Name of outgoing shift' },
        supervisor_notes: { type: 'string', description: 'Closing directives for incoming shift lead' }
      }
    }
  }
];

// Tool Execution Dispatcher
async function handleToolCall(name, args) {
  switch (name) {
    case 'get_shift_attendance': {
      let filtered = state.staff;

      // RBAC cloaking: only HR team and Upper Management can see HR personnel
      const HR_DEPT = 'Human Resources & Talent';
      const HR_ROLES = ['HR Director', 'People Operations Lead', 'Talent Acquisition Specialist', 'Employee Relations Consultant'];
      const reqId = args.requester_id;
      const reqRank = args.requester_rank !== undefined ? Number(args.requester_rank) : null;
      let canSeeHR = true;
      if (reqId) {
        const caller = state.staff.find(s => s.id === reqId);
        if (caller) {
          canSeeHR = caller.dept === HR_DEPT || caller.rank >= 4;
        }
      } else if (reqRank !== null) {
        canSeeHR = reqRank >= 4;
      }

      if (!canSeeHR) {
        filtered = filtered.filter(s => s.dept !== HR_DEPT && !HR_ROLES.includes(s.role));
      }

      if (args.department) filtered = filtered.filter(s => s.dept.toLowerCase().includes(args.department.toLowerCase()));
      if (args.zone) filtered = filtered.filter(s => s.zone.toLowerCase().includes(args.zone.toLowerCase()));
      if (args.clocked_in_only !== false) filtered = filtered.filter(s => s.clockedIn);
      return {
        total_on_shift: filtered.length,
        associates: filtered.map(s => ({
          id: s.id,
          name: s.name,
          role: s.role,
          department: s.dept,
          zone: s.zone,
          clocked_in_at: s.clockInTime
        }))
      };
    }

    case 'audit_labor_compliance': {
      const threshold = args.max_continuous_hours_threshold || 5.0;
      const violations = [];
      state.staff.forEach(s => {
        if (s.clockedIn) {
          // Simulated hours calculation
          const estHours = 4.5;
          if (estHours >= threshold) {
            violations.push({
              employee: s.name,
              id: s.id,
              dept: s.dept,
              hours_worked: estHours,
              violation: '5-Hour Continuous Work Meal Breach Risk'
            });
          }
        }
      });
      return {
        labor_law_compliance: violations.length === 0 ? '100% COMPLIANT' : 'BREACHES DETECTED',
        statutory_threshold_hours: threshold,
        violations_count: violations.length,
        violations: violations,
        recommendation: violations.length === 0 
          ? 'All active staff have taken statutory 15m rest and 30m meal punches.'
          : 'Immediately punch meal breaks for flagged associates to prevent OSHA fines.'
      };
    }

    case 'dispatch_shift_duty': {
      const newId = Date.now();
      const checklist = (args.checklist_items || ['Execute task', 'Verify standards', 'Submit for sign-off']).map((t, idx) => ({
        id: idx + 1,
        text: t,
        done: false
      }));

      const newDuty = {
        id: newId,
        title: args.title,
        zone: args.zone,
        department: args.department || 'Facilities & Maintenance',
        lead: args.team_lead_name || 'David Chen',
        priority: args.priority || 'High',
        status: 'In Progress',
        checklist: checklist,
        dispatched_at: new Date().toISOString()
      };

      state.duties.unshift(newDuty);
      saveState(state);
      mcpEvents.emit('event', { type: 'duty_dispatched', data: newDuty });
      return {
        status: 'SUCCESS',
        message: `Duty "${args.title}" dispatched to ${args.zone}.`,
        duty: newDuty
      };
    }

    case 'list_shift_duties': {
      let duties = state.duties;
      if (args.zone) duties = duties.filter(d => d.zone.toLowerCase().includes(args.zone.toLowerCase()));
      if (args.status && args.status !== 'All') duties = duties.filter(d => d.status === args.status);
      return { total_duties: duties.length, duties: duties };
    }

    case 'sign_off_duty': {
      const duty = state.duties.find(d => d.id === args.duty_id);
      if (!duty) throw new Error(`Duty ID ${args.duty_id} not found.`);
      if (args.action === 'approve') {
        duty.status = 'Signed Off';
        duty.signed_off_at = new Date().toISOString();
      } else {
        duty.status = 'In Progress';
        duty.rework_notes = args.notes || 'Rework required by manager';
      }
      saveState(state);
      mcpEvents.emit('event', { type: 'duty_signed_off', data: duty });
      return { status: 'SUCCESS', duty: duty };
    }

    case 'get_floor_map_telemetry': {
      const telemetry = {};
      state.zones.forEach(z => {
        const staffCount = state.staff.filter(s => s.zone === z && s.clockedIn).length;
        const activeDuties = state.duties.filter(d => d.zone === z && d.status !== 'Signed Off').length;
        const escalations = state.escalations.filter(e => e.zone === z && e.status === 'Open').length;
        telemetry[z] = {
          stationed_personnel: staffCount,
          active_duty_halos: activeDuties,
          escalation_radar_beacons: escalations,
          status: escalations > 0 ? 'ALERT' : activeDuties > 0 ? 'ACTIVE_DUTY' : 'NORMAL'
        };
      });
      return {
        store: 'Nexus Retail Mall #104',
        timestamp: new Date().toISOString(),
        coverage_rate: '100%',
        zones: telemetry
      };
    }

    case 'escalate_floor_incident': {
      const escId = `ESC-${Date.now().toString().slice(-3)}`;
      const esc = {
        id: escId,
        category: args.category,
        zone: args.zone,
        urgency: args.urgency || 'Urgent',
        desc: args.description,
        status: 'Open',
        reported_at: new Date().toISOString()
      };
      state.escalations.unshift(esc);
      saveState(state);
      mcpEvents.emit('event', { type: 'incident_created', data: esc });
      return { status: 'ALERT_BEACON_TRIGGERED', escalation: esc };
    }

    case 'resolve_floor_incident': {
      const esc = state.escalations.find(e => e.id === args.escalation_id);
      if (!esc) throw new Error(`Incident ${args.escalation_id} not found.`);
      esc.status = 'Resolved';
      esc.resolved_at = new Date().toISOString();
      saveState(state);
      mcpEvents.emit('event', { type: 'incident_resolved', data: esc });
      return { status: 'RESOLVED', escalation: esc };
    }

    case 'lookup_barcode': {
      const code = args.code.toUpperCase().trim();
      const item = state.inventory.find(i => i.sku === code || i.name.toUpperCase().includes(code));
      if (item) {
        return { type: 'INVENTORY_SKU', item: item };
      }
      const employee = state.staff.find(s => s.id === code);
      if (employee) {
        const HR_DEPT = 'Human Resources & Talent';
        const HR_ROLES = ['HR Director', 'People Operations Lead', 'Talent Acquisition Specialist', 'Employee Relations Consultant'];
        const isHR = employee.dept === HR_DEPT || HR_ROLES.includes(employee.role);
        if (isHR && args.requester_rank !== undefined && Number(args.requester_rank) < 4 && args.requester_dept !== HR_DEPT) {
          throw new Error(`Security Exception: Insufficient clearance to inspect Human Resources personnel badge.`);
        }
        return { type: 'STAFF_BADGE', employee: employee };
      }
      throw new Error(`Barcode/Code "${args.code}" not found in retail registry.`);
    }

    case 'adjust_inventory_stock': {
      const item = state.inventory.find(i => i.sku === args.sku.toUpperCase());
      if (!item) throw new Error(`SKU ${args.sku} not found.`);
      const oldStock = item.stock;
      item.stock = Math.max(0, item.stock + args.delta_units);
      saveState(state);
      mcpEvents.emit('event', { type: 'stock_adjusted', data: { sku: item.sku, name: item.name, previous_stock: oldStock, updated_stock: item.stock, bay_location: item.bay } });
      return {
        status: 'SUCCESS',
        sku: item.sku,
        name: item.name,
        previous_stock: oldStock,
        updated_stock: item.stock,
        bay_location: item.bay
      };
    }

    case 'generate_shift_handover_report': {
      return {
        store: 'Nexus Retail Mall #104',
        shift: args.shift_name || 'Afternoon Shift',
        generated_at: new Date().toISOString(),
        kpis: {
          duties_completed: state.duties.filter(d => d.status === 'Signed Off').length,
          duties_in_progress: state.duties.filter(d => d.status !== 'Signed Off').length,
          open_escalations: state.escalations.filter(e => e.status === 'Open').length,
          low_stock_items: state.inventory.filter(i => i.stock <= 15).length,
          active_crew_headcount: state.staff.filter(s => s.clockedIn).length
        },
        supervisor_directives: args.supervisor_notes || 'All floor zones secured. Inbound dock pallets inspected.'
      };
    }

    default:
      throw new Error(`Unknown MCP tool: ${name}`);
  }
}

// JSON-RPC 2.0 Stdio Interface Implementation
function processMessage(msg) {
  const { id, method, params } = msg;

  if (method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {},
          resources: {}
        },
        serverInfo: {
          name: 'nexus-retail-operations-mcp',
          version: '1.0.0'
        }
      }
    };
  }

  if (method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: { tools: MCP_TOOLS }
    };
  }

  if (method === 'tools/call') {
    return (async () => {
      try {
        const toolResult = await handleToolCall(params.name, params.arguments || {});
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(toolResult, null, 2)
              }
            ]
          }
        };
      } catch (err) {
        return {
          jsonrpc: '2.0',
          id,
          error: {
            code: -32000,
            message: err.message
          }
        };
      }
    })();
  }

  if (method === 'resources/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        resources: [
          { uri: 'retail://floormap/telemetry', name: 'Live Floor Map Spatial Telemetry', mimeType: 'application/json' },
          { uri: 'retail://inventory/status', name: 'Warehouse & Store Inventory Levels', mimeType: 'application/json' }
        ]
      }
    };
  }

  if (method === 'resources/read') {
    const uri = params?.uri;
    let text = '{}';
    if (uri === 'retail://floormap/telemetry') {
      text = JSON.stringify(state.zones, null, 2);
    } else if (uri === 'retail://inventory/status') {
      text = JSON.stringify(state.inventory, null, 2);
    }
    return {
      jsonrpc: '2.0',
      id,
      result: {
        contents: [{ uri, mimeType: 'application/json', text }]
      }
    };
  }

  return {
    jsonrpc: '2.0',
    id,
    error: {
      code: -32601,
      message: `Method ${method} not found`
    }
  };
}

// Start stdio interface
if (require.main === module) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', async (line) => {
    if (!line.trim()) return;
    try {
      const msg = JSON.parse(line);
      const res = await processMessage(msg);
      process.stdout.write(JSON.stringify(res) + '\n');
    } catch (e) {
      process.stdout.write(JSON.stringify({
        jsonrpc: '2.0',
        id: null,
        error: { code: -32700, message: 'Parse error' }
      }) + '\n');
    }
  });
}

module.exports = {
  MCP_TOOLS,
  handleToolCall,
  processMessage,
  mcpEvents,
  loadState,
  state
};
