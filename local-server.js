const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');

// Load local .env configuration if present
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [k, ...v] = trimmed.split('=');
        const keyName = k.trim();
        if (!process.env[keyName]) {
          process.env[keyName] = v.join('=').trim().replace(/^["']|["']$/g, '');
        }
      }
    }
  }
} catch (e) {}

const BUILTIN_GEMINI_KEY = process.env.GEMINI_API_KEY || (typeof atob !== 'undefined' ? atob('QVEuQWI4Uk42S0xDY3BhV1B6b1hrcVRxWnIwcHFJVGNiYVlZRUstc2RlMFA4LTF2UkFFdHc=') : Buffer.from('QVEuQWI4Uk42S0xDY3BhV1B6b1hrcVRxWnIwcHFJVGNiYVlZRUstc2RlMFA4LTF2UkFFdHc=', 'base64').toString('utf8'));
const BUILTIN_GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

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
    let toolCount = 11;
    try {
      const { MCP_TOOLS } = require('./mcp-server.js');
      toolCount = MCP_TOOLS.length;
    } catch (e) {}

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      configured: true,
      engine: 'Google Gemini 3.8 Flash',
      defaultModel: BUILTIN_GEMINI_MODEL,
      availableModels: [
        'gemini-3.8-flash',
        'gemini-3.6-flash',
        'gemini-flash-latest',
        'gemini-2.5-pro'
      ],
      mcpToolsCount: toolCount,
      features: [
        'Multi-hop autonomous tool execution',
        'Direct connection to 11 MCP store tools',
        'Strict Rank 4/5 Executive Gatekeeper (Ranks 1-3 cloaked)',
        'Task execution strictly equivalent to caller rank',
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
        const modelName = payload.model || BUILTIN_GEMINI_MODEL;

        // STRICT RBAC REQUIREMENT: Ranks 1 to 3 have NO access to the AI Brain.
        if (!caller || Number(caller.rank) < 4) {
          res.writeHead(403, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: false,
            error: 'ACCESS_DENIED',
            message: 'Access Denied: The Executive AI Copilot is an Upper Management asset restricted exclusively to Rank 4 and Rank 5 personnel.'
          }));
          return;
        }

        const apiKey = req.headers['x-gemini-key'] || payload.apiKey || BUILTIN_GEMINI_KEY;

        if (!apiKey) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: false,
            needsKey: true,
            error: 'MISSING_API_KEY',
            message: 'No Google Gemini API Key configured.'
          }));
          return;
        }

        // Build Gemini System Instruction with full store knowledge & strict RBAC rules
        const { state, MCP_TOOLS, handleToolCall } = require('./mcp-server.js');
        const activeStaffCount = state.staff.filter(s => s.clockedIn).length;
        const openEscCount = state.escalations.filter(e => e.status === 'Open').length;
        const lowStockCount = state.inventory.filter(i => i.stock <= 15).length;
        const pendingDutiesCount = state.duties.filter(d => d.status === 'Pending Approval').length;

        // Dynamic highest rank analysis
        const highestActiveRank = Math.max(...state.staff.map(s => s.rank || 1));
        const highestRankingOfficers = state.staff.filter(s => s.rank === highestActiveRank).map(s => s.name);

        const systemInstruction = `
You are the Executive AI Operations Copilot for Nexus Retail Operations Management Suite (Store #104), powered by Google Gemini 3.8 Flash.
You have real-time visibility into the entire retail complex:
- 9 Floor Zones: North Wing #42, Storage Bay B, West Gallery, East Promenade, Central Mall HQ, South Atrium, Service Core A, Food Court Deck, Upper Mezzanine.
- 11 Store Departments: Executive Operations, Human Resources & Talent, Logistics & Bay Storage, Apparel & Fashion, Electronics & Gadgets, Customer Relations, Security & Safety, Facilities & Maintenance, Food & Beverage, Cashier & Front End, Beauty & Cosmetics.
- Current Store Snapshot: ${activeStaffCount} staff clocked in, ${openEscCount} open floor hazards, ${lowStockCount} low-stock SKUs, ${pendingDutiesCount} duties awaiting sign-off.
- Highest-Ranking Officer(s) (Dynamic Immunity): ${highestRankingOfficers.join(', ')} (Rank ${highestActiveRank}).

CURRENT CALLER IDENTITY & CLEARANCE:
- Name: ${caller.name}
- Role: ${caller.role}
- Rank: ${caller.rank}
- Department: ${caller.department}
- Clearance Tier: ${caller.rank >= 5 ? 'Global Administrator (Level 5 Omni-Access)' : 'Upper Management Executive (Rank 4)'}

CRITICAL ACCESS ENFORCEMENT (TASK ACCESS IS DIRECTLY EQUIVALENT TO CALLER'S RANK):
You can ONLY perform tasks that ${caller.name} has permission to perform:
1. IF CALLER IS RANK 4 (Operations Manager / HR Director):
   - PERMITTED:
     * Query real-time shift attendance across zones
     * Audit labor compliance (5-hour meal mandate & 15m rest periods)
     * Dispatch floor duties to leads and associates
     * Sign off / approve completed duty checklists
     * Adjust store inventory stock (+N / -N)
     * View spatial floor map telemetry
     * Decode barcodes and verify employee badges
     * Compile shift handover briefing reports
     * Initiate dismissal dossiers for regular staff (Rank 1, 2, or 3)
     * Affix 1 co-signature on Upper Management dismissal dossiers (requires 4 total signatures before deboarding)
     * Veto / reject pending dismissal proposals
   - FORBIDDEN TO RANK 4:
     * CANNOT authorize vendor purchase orders / procurement capital expenditure (requires Rank 5).
     * CANNOT trigger store-wide emergency evacuation siren broadcasts (requires Rank 5).
     * CANNOT unilaterally fire another Upper Management associate without 4-Executive Quorum.
     * CANNOT dismiss the highest-ranking officer (${highestRankingOfficers.join(', ')}).
   - If a Rank 4 employee requests any of these forbidden actions, DECLINE firmly:
     "Permission Denied: As a Rank 4 Executive, you do not have authorization to [action]. This executive action requires Rank 5 Global Administrator clearance."

2. IF CALLER IS RANK 5 (Global Administrator / Marcus Vance):
   - PERMITTED:
     * Full Level 5 Omni-Access across all store operations, financial purchase orders, mass replenishments, emergency broadcasts, and dismissals.
   - FORBIDDEN TO RANK 5:
     * CANNOT dismiss the highest-ranking officer (${highestRankingOfficers.join(', ')}). Involuntary termination of the supreme ranking personnel is structurally barred by constitutional governance.

TOOL CALLING:
- You have direct access to standard Model Context Protocol (MCP) tools.
- When an authorized user asks to perform an action, invoke the appropriate tool.
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

          const targetModel = modelName || BUILTIN_GEMINI_MODEL;
          const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;

          let geminiRes;
          for (let attempt = 0; attempt < 3; attempt++) {
            geminiRes = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(geminiReqBody)
            });
            if (geminiRes.status === 503 || geminiRes.status === 429) {
              if (attempt < 2) {
                await new Promise(r => setTimeout(r, 1200 * (attempt + 1)));
                continue;
              }
            }
            break;
          }

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

              contents.push(candidate.content);
              contents.push({
                role: 'user',
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
            contents.push(candidate.content);
            contents.push({
              role: 'user',
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
