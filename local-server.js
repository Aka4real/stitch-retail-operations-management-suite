const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');

let DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3050;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.csv': 'text/csv; charset=utf-8'
};

// =========================================================================
// STEP 1: SCOPED API KEY AUTHENTICATION REGISTRY
// =========================================================================
const API_KEYS = {
  'nexus_live_agent_admin_9x82': {
    name: 'Executive AI Agent (Antigravity / Claude)',
    role: 'Global Admin',
    rank: 5,
    scopes: ['*']
  },
  'nexus_live_agent_supervisor_4p11': {
    name: 'Supervisor AI Agent (Floor Manager)',
    role: 'Floor Lead',
    rank: 3,
    scopes: ['mcp:read', 'mcp:call', 'duty:write', 'incident:write', 'telemetry:read']
  },
  'nexus_live_scanner_pda_77k0': {
    name: 'Handheld Zebra Scanner Fleet (Dock & Aisle)',
    role: 'Hardware PDA',
    rank: 2,
    scopes: ['mcp:call', 'barcode:read', 'inventory:adjust', 'telemetry:read']
  },
  'nexus_dev_open_key': {
    name: 'Developer Sandbox & Web Dashboard Client',
    role: 'Web Operations Portal',
    rank: 5,
    scopes: ['*']
  }
};

/**
 * Validates request authorization header, x-api-key, or query param ?api_key=
 * Falls back to nexus_dev_open_key if running in development mode.
 */
function verifyAuth(req, requiredScope = '*') {
  const authHeader = req.headers['authorization'] || '';
  let token = '';

  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  } else if (req.headers['x-api-key']) {
    token = req.headers['x-api-key'].trim();
  } else {
    try {
      const parsedUrl = new URL(req.url, 'http://localhost');
      token = parsedUrl.searchParams.get('api_key') || '';
    } catch (e) {}
  }

  // Development fallback for local convenience
  if (!token && process.env.NODE_ENV !== 'production') {
    token = 'nexus_dev_open_key';
  }

  const keyRecord = API_KEYS[token];
  if (!keyRecord) {
    return {
      authorized: false,
      status: 401,
      error: 'Unauthorized: Missing or invalid API key. Supply via Authorization: Bearer <key>, x-api-key header, or ?api_key= URL parameter.'
    };
  }

  if (requiredScope !== '*' && !keyRecord.scopes.includes('*') && !keyRecord.scopes.includes(requiredScope)) {
    return {
      authorized: false,
      status: 403,
      error: `Forbidden: Key "${keyRecord.name}" lacks required scope "${requiredScope}". Permitted: [${keyRecord.scopes.join(', ')}]`
    };
  }

  return { authorized: true, client: keyRecord };
}

// =========================================================================
// STEP 2: SERVER-SENT EVENTS (SSE) REAL-TIME DATA STREAMING HUB
// =========================================================================
const sseClients = new Set();

function broadcastSSE(eventType, data) {
  const payload = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch (e) {
      sseClients.delete(client);
    }
  }
}

// Keep-alive heartbeat every 20 seconds to maintain persistent connections (local server only)
let sseHeartbeat = null;
if (require.main === module) {
  sseHeartbeat = setInterval(() => {
    for (const client of sseClients) {
      try {
        client.write(':ping\n\n');
      } catch (e) {
        sseClients.delete(client);
      }
    }
  }, 20000);
  if (sseHeartbeat && sseHeartbeat.unref) sseHeartbeat.unref();
}

// Hook into mcp-server events for automated real-time broadcasts
try {
  const { mcpEvents } = require('./mcp-server.js');
  mcpEvents.on('event', (evt) => {
    broadcastSSE(evt.type, evt.data);
  });
} catch (err) {
  console.warn('Warning: Could not bind mcpEvents to SSE hub:', err.message);
}

// =========================================================================
// HTTP REQUEST ROUTER
// =========================================================================
function requestHandler(req, res) {
  // CORS Headers for AI Agent, MCP, and Scanner Integrations
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const rawUrl = req.headers['x-forwarded-uri'] || req.url;
  const urlPath = rawUrl.split('?')[0];

  // API Route 1: GET /api/auth/verify - Verify API Key & Scopes
  if (urlPath === '/api/auth/verify' && req.method === 'GET') {
    const auth = verifyAuth(req, '*');
    if (!auth.authorized) {
      res.writeHead(auth.status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ authenticated: false, error: auth.error }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      authenticated: true,
      client: auth.client.name,
      role: auth.client.role,
      rank: auth.client.rank,
      scopes: auth.client.scopes
    }, null, 2));
    return;
  }

  // API Route 2: GET /api/telemetry/stream - Server-Sent Events (SSE) Live Feed
  if (urlPath === '/api/telemetry/stream' && req.method === 'GET') {
    const auth = verifyAuth(req, 'telemetry:read');
    if (!auth.authorized) {
      res.writeHead(auth.status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: auth.error }));
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'X-Accel-Buffering': 'no'
    });
    res.write(':connected\n\n');

    sseClients.add(res);

    // Send immediate initial sync payload
    try {
      const { state } = require('./mcp-server.js');
      const initialPayload = {
        connected: true,
        client: auth.client.name,
        connected_listeners: sseClients.size,
        timestamp: new Date().toISOString(),
        active_escalations: state.escalations.filter(e => e.status === 'Open').length,
        active_duties: state.duties.filter(d => d.status !== 'Signed Off').length
      };
      res.write(`event: initial_sync\ndata: ${JSON.stringify(initialPayload)}\n\n`);
    } catch (e) {
      res.write(`event: initial_sync\ndata: {"connected":true}\n\n`);
    }

    req.on('close', () => {
      sseClients.delete(res);
    });
    return;
  }

  // API Route 3: POST /api/telemetry/broadcast - Manual / Webhook Alert Broadcast
  if (urlPath === '/api/telemetry/broadcast' && req.method === 'POST') {
    const auth = verifyAuth(req, 'incident:write');
    if (!auth.authorized) {
      res.writeHead(auth.status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: auth.error }));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const eventName = payload.event || 'broadcast_alert';
        const eventData = payload.data || payload;
        broadcastSSE(eventName, eventData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          status: 'BROADCASTED',
          event: eventName,
          recipients: sseClients.size
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API Route 4: GET /api/mcp/tools - Public Tool Catalog
  if (urlPath === '/api/mcp/tools' && req.method === 'GET') {
    try {
      const { MCP_TOOLS } = require('./mcp-server.js');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'ACTIVE',
        protocol: 'MCP JSON-RPC 2.0',
        sse_streaming_endpoint: '/api/telemetry/stream',
        auth_required: 'API Key (Bearer / x-api-key / ?api_key=)',
        count: MCP_TOOLS.length,
        tools: MCP_TOOLS
      }, null, 2));
      return;
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
      return;
    }
  }

  // API Route 5: POST /api/mcp - Standard Model Context Protocol Endpoint
  if (urlPath === '/api/mcp' && req.method === 'POST') {
    const auth = verifyAuth(req, 'mcp:call');
    if (!auth.authorized) {
      res.writeHead(auth.status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        jsonrpc: '2.0',
        id: null,
        error: { code: -32001, message: auth.error }
      }));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { processMessage } = require('./mcp-server.js');
        const jsonMsg = JSON.parse(body);
        const rpcResult = await processMessage(jsonMsg);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(rpcResult, null, 2));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: err.message } }));
      }
    });
    return;
  }

  // API Route 6: GET /api/ai/status - Gemini AI Copilot Brain Status
  if (urlPath === '/api/ai/status' && req.method === 'GET') {
    const hasServerKey = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
    let toolCount = 11;
    try {
      const { MCP_TOOLS } = require('./mcp-server.js');
      toolCount = MCP_TOOLS.length;
    } catch (e) {}

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      configured: hasServerKey,
      engine: 'Google Gemini 3.8 / 2.5 Flash',
      defaultModel: 'gemini-2.5-flash',
      availableModels: [
        'gemini-2.5-flash',
        'gemini-1.5-pro',
        'gemini-2.0-flash',
        'gemini-3.8-flash'
      ],
      mcpToolsCount: toolCount,
      features: [
        'Multi-hop autonomous tool execution',
        'Direct connection to 11 MCP store tools',
        'Executive RBAC enforcement (Ranks 1-5)',
        'Constitutional dismissal protection & 4-Executive Quorum'
      ]
    }, null, 2));
    return;
  }

  // API Route 7: POST /api/ai/chat - Gemini 3.8 Agentic Chat & Tool Calling Loop
  if (urlPath === '/api/ai/chat' && req.method === 'POST') {
    const auth = verifyAuth(req, '*');
    if (!auth.authorized) {
      res.writeHead(auth.status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: auth.error }));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        const userPrompt = payload.message || '';
        const userHistory = payload.history || [];
        const caller = payload.currentUser || { name: 'Executive Administrator', rank: 5, role: 'Global Admin', department: 'Executive Operations' };
        const modelName = payload.model || 'gemini-2.5-flash';

        const apiKey = req.headers['x-gemini-key'] || payload.apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

        if (!apiKey) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: false,
            needsKey: true,
            error: 'MISSING_API_KEY',
            message: 'No Google Gemini API Key configured. Please supply a key in Copilot Settings or set GEMINI_API_KEY in server environment.'
          }));
          return;
        }

        // Build Gemini System Instruction with full store knowledge & strict RBAC rules
        const { state, MCP_TOOLS, handleToolCall } = require('./mcp-server.js');
        const activeStaffCount = state.staff.filter(s => s.clockedIn).length;
        const openEscCount = state.escalations.filter(e => e.status === 'Open').length;
        const lowStockCount = state.inventory.filter(i => i.stock <= 15).length;
        const pendingDutiesCount = state.duties.filter(d => d.status === 'Pending Approval').length;

        const systemInstruction = `
You are the Executive AI Operations Copilot for Nexus Retail Operations Management Suite (Store #104).
You have real-time visibility into the entire retail complex:
- 9 Floor Zones: North Wing #42, Storage Bay B, West Gallery, East Promenade, Central Mall HQ, South Atrium, Service Core A, Food Court Deck, Upper Mezzanine.
- 11 Store Departments: Executive Operations, Human Resources & Talent, Logistics & Bay Storage, Apparel & Fashion, Electronics & Gadgets, Customer Relations, Security & Safety, Facilities & Maintenance, Food & Beverage, Cashier & Front End, Beauty & Cosmetics.
- Current Store Snapshot: ${activeStaffCount} staff clocked in, ${openEscCount} open floor hazards, ${lowStockCount} low-stock SKUs, ${pendingDutiesCount} duties awaiting sign-off.

CURRENT CALLER IDENTITY & CLEARANCE:
- Name: ${caller.name}
- Role: ${caller.role}
- Rank: ${caller.rank} (Scale 1 to 5)
- Department: ${caller.department}
- Clearance Tier: ${caller.rank >= 4 ? 'Executive Upper Management' : (caller.rank === 3 ? 'Floor Supervisor / Lead' : 'General Associate')}

STRICT ROLE-BASED ACCESS CONTROL (RBAC) & CONSTITUTIONAL RULES:
1. Rank 1-2 (General Associates): Can ONLY query floor status, check attendance, lookup barcodes, and check their own duties. They are STRICTLY FORBIDDEN from executing executive actions: sacking/firing staff, approving duties, restocking inventory, resolving safety hazards, or initiating evacuations. If they attempt these, DECLINE politely with: "Clearance Denied: As a Rank ${caller.rank} (${caller.role}), you do not possess executive clearance to perform this action. Rank 4+ clearance required."
2. Rank 3 (Floor Leads / Supervisors): Can dispatch floor duties, log punches, and audit shift breaks. CANNOT execute staff dismissals or financial purchase order sign-offs.
3. Rank 4 (Upper Management / HR Directors): Can authorize completed duties, adjust inventory, audit statutory labor compliance, and initiate regular staff dismissals (Rank < 4).
4. Rank 5 (Global Administrator / Marcus Vance): Full Level 5 Omni-Access across all store operations, including emergency evacuations and PO sign-offs.
5. CONSTITUTIONAL DISMISSAL GOVERNANCE:
   - Dynamic Protection: The highest-ranking officer currently in the organization CANNOT be dismissed by anyone under any circumstances.
   - 4-Executive Quorum: Any Upper Management personnel (Rank 4+) can ONLY be dismissed if at least 4 Upper Management executives co-sign the dismissal dossier. Deboarding and severance payout remain locked until this quorum is met.
   - General Staff (Rank < 4): Requires 1 Upper Management sign-off.
   - Executive Veto: Any higher-ranking manager can veto and reject a pending dismissal proposal.

TOOL CALLING:
- You have direct access to standard Model Context Protocol (MCP) tools.
- When an authorized user asks to perform an action (e.g. check attendance, dispatch duty, sign off duty, adjust stock, escalate/resolve incident), call the appropriate tool.
- Always provide clear, executive-grade responses detailing exactly what store records were inspected or updated.
`;

        // Format MCP tools for Gemini function declarations
        const functionDeclarations = MCP_TOOLS.map(tool => ({
          name: tool.name,
          description: tool.description,
          parameters: tool.inputSchema
        }));

        // Convert user history to Gemini contents format
        const contents = [];
        for (const item of userHistory.slice(-8)) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text || item.content || '' }]
          });
        }
        contents.push({
          role: 'user',
          parts: [{ text: userPrompt }]
        });

        // Gemini Agentic Execution Loop
        let finalReply = '';
        const executedToolCalls = [];
        let maxLoops = 5;

        while (maxLoops > 0) {
          maxLoops--;

          const geminiReqBody = {
            contents: contents,
            systemInstruction: {
              parts: [{ text: systemInstruction }]
            },
            tools: [{ functionDeclarations }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 1024
            }
          };

          const targetModel = modelName.startsWith('gemini-') ? modelName : 'gemini-2.5-flash';
          const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;

          const geminiRes = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(geminiReqBody)
          });

          if (!geminiRes.ok) {
            const errText = await geminiRes.text();
            throw new Error(`Gemini API Error (${geminiRes.status}): ${errText}`);
          }

          const geminiData = await geminiRes.json();
          const candidate = geminiData.candidates?.[0];
          if (!candidate) {
            throw new Error('Gemini returned no response candidates.');
          }

          const parts = candidate.content?.parts || [];
          const functionCallPart = parts.find(p => p.functionCall);

          if (functionCallPart) {
            const fCall = functionCallPart.functionCall;
            const toolName = fCall.name;
            const toolArgs = fCall.args || {};

            // Executive RBAC check prior to execution
            const executiveTools = ['sign_off_duty', 'adjust_inventory_stock', 'resolve_floor_incident'];
            if (executiveTools.includes(toolName) && caller.rank < 4) {
              const rejectionResult = {
                error: 'CLEARANCE_DENIED',
                message: `Action denied: Caller ${caller.name} holds Rank ${caller.rank}, which is insufficient for ${toolName}. Requires Rank 4+ Executive clearance.`
              };
              executedToolCalls.push({ name: toolName, args: toolArgs, result: rejectionResult, allowed: false });

              contents.push({
                role: 'model',
                parts: [{ functionCall: fCall }]
              });
              contents.push({
                role: 'function',
                parts: [{
                  functionResponse: {
                    name: toolName,
                    response: { output: rejectionResult }
                  }
                }]
              });
              continue;
            }

            // Execute MCP tool via handleToolCall
            let toolOutput;
            try {
              toolOutput = await handleToolCall(toolName, {
                ...toolArgs,
                requester_id: caller.id,
                requester_rank: caller.rank,
                requester_dept: caller.department
              });
            } catch (toolErr) {
              toolOutput = { error: toolErr.message };
            }

            executedToolCalls.push({ name: toolName, args: toolArgs, result: toolOutput, allowed: true });

            // Push function call and response back to dialogue contents
            contents.push({
              role: 'model',
              parts: [{ functionCall: fCall }]
            });
            contents.push({
              role: 'function',
              parts: [{
                functionResponse: {
                  name: toolName,
                  response: { output: toolOutput }
                }
              }]
            });
          } else {
            // Text response arrived
            const textPart = parts.find(p => p.text);
            finalReply = textPart ? textPart.text : 'Directive processed.';
            break;
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          reply: finalReply,
          toolCalls: executedToolCalls,
          model: modelName
        }, null, 2));

      } catch (chatErr) {
        console.error('Gemini Chat Error:', chatErr);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: chatErr.message }));
      }
    });
    return;
  }

  // Static File Server
  let reqPath = decodeURI(urlPath);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(__dirname, reqPath);

  // Security check - stay inside root
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for client-side routing
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (indexErr, indexData) => {
        if (indexErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(indexData);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        res.end(`Server Error: ${readErr.code}`);
      } else {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache'
        });
        res.end(content);
      }
    });
  });
}

// Function to find an available port
function findAvailablePort(startPort, callback) {
  const tester = net.createServer();
  tester.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      findAvailablePort(startPort + 1, callback);
    } else {
      callback(err, null);
    }
  });
  tester.once('listening', () => {
    tester.close(() => {
      callback(null, startPort);
    });
  });
  tester.listen(startPort, '0.0.0.0');
}

if (require.main === module) {
  findAvailablePort(DEFAULT_PORT, (err, port) => {
    if (err) {
      console.error('Failed to find free port:', err);
      process.exit(1);
    }

    const server = http.createServer(requestHandler);
    server.listen(port, '0.0.0.0', () => {
      console.log(`\n======================================================`);
      console.log(` Nexus Retail Operations Management Suite`);
      console.log(` Server running at: http://localhost:${port}`);
      console.log(` MCP Endpoint: http://localhost:${port}/api/mcp`);
      console.log(` SSE Stream:   http://localhost:${port}/api/telemetry/stream`);
      console.log(` Tool Catalog: http://localhost:${port}/api/mcp/tools`);
      console.log(`======================================================\n`);
    });
  });
}

module.exports = requestHandler;
