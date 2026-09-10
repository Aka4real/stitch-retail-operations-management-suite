const fs = require('fs');
const path = require('path');

const screens = [
  { folder: 'operational_dashboard', defaultHash: 'dashboard' },
  { folder: 'inventory_stock_management', defaultHash: 'inventory' },
  { folder: 'sales_financial_tracking', defaultHash: 'sales' },
  { folder: 'hr_team_performance', defaultHash: 'hr' },
  { folder: 'employee_profile_elena_rodriguez', defaultHash: 'profile' },
  { folder: 'assign_new_task', defaultHash: 'assign-task' }
];

screens.forEach(({ folder, defaultHash }) => {
  const filePath = path.join(__dirname, folder, 'code.html');
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace navigation hrefs
  content = content.replace(/(<a[^>]*href=["'])#(["'][^>]*>[\s\S]*?<span[^>]*>dashboard<\/span>[\s\S]*?Dashboard[\s\S]*?<\/a>)/gi, (match) => {
    return match.replace(/href=["']#["']/, 'href="../index.html#dashboard"');
  });

  content = content.replace(/(<a[^>]*href=["'])#(["'][^>]*>[\s\S]*?<span[^>]*>inventory_2<\/span>[\s\S]*?Inventory[\s\S]*?<\/a>)/gi, (match) => {
    return match.replace(/href=["']#["']/, 'href="../index.html#inventory"');
  });

  content = content.replace(/(<a[^>]*href=["'])#(["'][^>]*>[\s\S]*?<span[^>]*>payments<\/span>[\s\S]*?Sales &amp; Finance[\s\S]*?<\/a>)/gi, (match) => {
    return match.replace(/href=["']#["']/, 'href="../index.html#sales"');
  });

  content = content.replace(/(<a[^>]*href=["'])#(["'][^>]*>[\s\S]*?<span[^>]*>badge<\/span>[\s\S]*?Human Resources[\s\S]*?<\/a>)/gi, (match) => {
    return match.replace(/href=["']#["']/, 'href="../index.html#hr"');
  });

  content = content.replace(/(<a[^>]*href=["'])#(["'][^>]*>[\s\S]*?<span[^>]*>groups<\/span>[\s\S]*?Team Management[\s\S]*?<\/a>)/gi, (match) => {
    return match.replace(/href=["']#["']/, 'href="../index.html#hr"');
  });

  // Action buttons
  content = content.replace(/onclick=["'][^"']*["']/g, (m) => m); // preserve
  
  // Add a top floating banner linking to the full interactive application
  const banner = `
<!-- Nexus Suite Floating Interactive Launcher -->
<div style="position:fixed;bottom:16px;right:16px;z-index:9999;background:#041627;color:#fff;padding:10px 16px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.3);font-family:sans-serif;font-size:13px;display:flex;align-items:center;gap:10px;border:1px solid rgba(255,255,255,0.15);">
  <span><strong>Nexus Retail Suite</strong> (Prototype View)</span>
  <a href="../index.html#${defaultHash}" style="background:#6cf8bb;color:#00714d;padding:6px 12px;border-radius:8px;font-weight:bold;text-decoration:none;font-size:12px;display:inline-flex;align-items:center;gap:4px;">
    Launch Unified Suite &rarr;
  </a>
</div>
`;

  if (!content.includes('Nexus Suite Floating Interactive Launcher')) {
    content = content.replace('</body>', `${banner}\n</body>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated navigation for ${folder}/code.html`);
});

console.log('Subscreen linking complete!');
