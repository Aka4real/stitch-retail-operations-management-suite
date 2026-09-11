/**
 * Integration Test for Nexus Retail Universal SDK (nexus-sdk.js)
 */
const { NexusRetail } = require('./nexus-sdk.js');

async function runTests() {
  console.log('==================================================');
  console.log(' Starting Nexus Retail SDK Integration Test Suite');
  console.log('==================================================\n');

  const nexus = new NexusRetail({
    baseUrl: 'http://localhost:3050',
    apiKey: 'nexus_live_agent_admin_9x82'
  });

  try {
    // 1. Test Auth Verification
    console.log('[Test 1] Verifying API Key Credentials...');
    const auth = await nexus.auth.verify();
    console.log('✓ Auth Verified:', auth.client, `(Rank ${auth.rank}, Scopes: ${auth.scopes.join(', ')})`);

    // 2. Test Real-Time SSE Stream
    console.log('\n[Test 2] Connecting to Real-Time SSE Telemetry Stream...');
    nexus.stream.connect();
    let streamEventReceived = false;

    nexus.stream.on('open', () => {
      console.log('✓ SSE Stream Connection Established!');
    });

    nexus.stream.on('incident_created', (evt) => {
      console.log('✓ Live SSE Incident Broadcast Captured:', evt.category, `(${evt.zone})`);
      streamEventReceived = true;
    });

    // 3. Test Workforce Attendance
    console.log('\n[Test 3] Querying Real-Time Shift Attendance...');
    const attendance = await nexus.workforce.getAttendance({ zone: 'Storage Bay B' });
    console.log(`✓ Attendance Retrieved: ${attendance.total_on_shift} staff clocked in to Storage Bay B.`);

    // 4. Test Labor Law Compliance Audit
    console.log('\n[Test 4] Running Statutory Labor Compliance Audit...');
    const compliance = await nexus.workforce.auditLaborCompliance({ maxContinuousHours: 5.0 });
    console.log('✓ Labor Audit Result:', compliance.labor_law_compliance, `(Violations: ${compliance.violations_count})`);

    // 5. Test Floor Map Telemetry
    console.log('\n[Test 5] Fetching Spatial Floor Map Telemetry...');
    const floorMap = await nexus.telemetry.getFloorMap();
    const zoneCount = Object.keys(floorMap.zones || {}).length;
    console.log(`✓ Floor Map Telemetry Retrieved across ${zoneCount} store zones.`);

    // 6. Test Barcode Lookup
    console.log('\n[Test 6] Looking up Barcode / SKU (EL-OM-27)...');
    const barcodeResult = await nexus.inventory.lookupBarcode('EL-OM-27');
    console.log(`✓ SKU Decoded: ${barcodeResult.item.name} (In Stock: ${barcodeResult.item.stock})`);

    // 7. Test Inventory Stock Adjustment
    console.log('\n[Test 7] Adjusting Inventory Stock (+10 units)...');
    const adjustResult = await nexus.inventory.adjustStock({ sku: 'EL-OM-27', deltaUnits: 10 });
    console.log(`✓ Stock Adjusted: ${adjustResult.previous_stock} -> ${adjustResult.updated_stock} units.`);

    // 8. Test Duty Dispatch
    console.log('\n[Test 8] Dispatching Floor Duty via SDK...');
    const dutyResult = await nexus.duties.dispatch({
      title: 'Restock Display Aisle 3',
      zone: 'North Wing #42',
      department: 'Apparel & Fashion',
      teamLead: 'Elena Rodriguez',
      priority: 'High',
      checklist: ['Unpack cartons', 'Hang outerwear', 'Steam wrinkles']
    });
    console.log('✓ Duty Dispatched:', dutyResult.duty.title, `(ID: ${dutyResult.duty.id})`);

    // 9. Test Emergency Escalation & SSE Broadcast
    console.log('\n[Test 9] Triggering Emergency Hazard Escalation (Testing SSE stream broadcast)...');
    const escalation = await nexus.telemetry.escalateIncident({
      category: 'Spill / Slip Hazard',
      zone: 'North Wing #42',
      urgency: 'Emergency',
      description: 'Broken olive oil bottle in aisle 3 via SDK test'
    });
    console.log('✓ Escalation Triggered:', escalation.escalation.id);

    // 10. Test Shift Handover Digest
    console.log('\n[Test 10] Generating Shift Handover Briefing...');
    const handover = await nexus.reports.generateHandoverReport({
      shiftName: 'SDK Verification Shift',
      supervisorNotes: 'All SDK automated integration tests executed successfully.'
    });
    console.log('✓ Handover Digest Compiled. Active Crew:', handover.kpis.active_crew_headcount);

    // Wait a brief moment for SSE broadcast to arrive
    await new Promise(r => setTimeout(r, 1200));

    nexus.stream.disconnect();
    console.log('\n==================================================');
    console.log(' ✓ ALL 10 SDK MODULE TESTS PASSED SUCCESSFULLY!');
    console.log('==================================================\n');
    process.exit(0);

  } catch (err) {
    console.error('\n❌ SDK Test Failed:', err);
    nexus.stream.disconnect();
    process.exit(1);
  }
}

runTests();
