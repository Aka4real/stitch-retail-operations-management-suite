/**
 * Nexus Retail Operations Management Suite
 * Engineered with Emil Kowalski UI polish, Stitch Design System tokens,
 * and high-end visual design architecture.
 * Features Role-Based Access Control (RBAC), Manager Provisioning Portal,
 * and Staff Onboarding & Duty Cockpit.
 */

// --- STATE MANAGEMENT & RBAC SYSTEM ---
const AppState = {
  currentView: 'dashboard',
  darkMode: localStorage.getItem('nexus_dark_mode') === 'true',

  // Employees Roster & Permission System
  employees: JSON.parse(localStorage.getItem('nexus_employees')) || [
    {
      id: 'NEX-0001',
      name: 'Marcus Vance',
      role: 'Global Administrator',
      rank: 5,
      department: 'Executive Operations',
      zone: 'Central Mall HQ',
      email: 'admin@nexus.com',
      pin: 'nexus2026',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKSgqOhip-FBpGhGxiH_p3xkjhxsk3PP2VO6IGwn9PSyLusBEUkgw6evs1p0mAX4naSSp_htp8N8deYgLX2qkNuBz_euEwpwPPD_C7FEVU3h6-cFvXeyrS1zZRrhaDC2mZilSquCjUp0An5W9mC553moCWm57K_QsXn9RcOkzH1FV53yaDg0ce1g7EsukiDU-9Fy-hHVH5YZHw-g7R8_FAfCtKXRUcUiZGA5tEBzJJFhBDFDJEcnCw',
      permissions: ['view_financials', 'manage_inventory', 'approve_pos', 'assign_tasks', 'manage_staff', 'override_clock', 'security_audit'],
      clockedIn: true,
      clockInTime: '07:30 AM',
      hireDate: 'Jan 15, 2019'
    },
    {
      id: 'NEX-8492',
      name: 'Elena Rodriguez',
      role: 'Senior Sales Associate & Floor Lead',
      rank: 3,
      department: 'Apparel & Styling',
      zone: 'North Wing #42',
      email: 'e.rodriguez@nexusretail.com',
      pin: '1234',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSy1JbUL5EHLhUSq8T2TP-nxMlEbEub9YzHHTfuoYoS7r_OInuKon5Y3btmVGcZx939OM0OSKVXIiE6xlFNw_VaZ51zI6AQsAdFTyNlxkGfznYfVX---VEIieISxwt_ATd9yuxqcPQrm2X_WSq3aOD-wZfaEuY1azLRJaw90ELG92UZK-syldymQKKs95hUMo6-QdGaT21IyeehJgHFVEA8aqPls9RyWeVAvBhtYknb5wJ19k45v0X',
      permissions: ['assign_tasks', 'manage_inventory'],
      clockedIn: true,
      clockInTime: '08:45 AM',
      hireDate: 'Oct 12, 2021'
    },
    {
      id: 'NEX-3401',
      name: 'David Chen',
      role: 'Inventory Operations Specialist',
      rank: 2,
      department: 'Logistics & Stock',
      zone: 'Storage Bay B',
      email: 'd.chen@nexusretail.com',
      pin: '2345',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy2xEe2XngudVkETnuUqbHnByXcJQqYENFFek-6XrOgnfAyfcGG_ZTB0LnCeHbZvQLOmeZX2_IkhfHSKjNqHAD_eX58tVEfD412GFJ3Qf4tB6vnB74OrF-PRG0g1CNatntoQvh7Q8hkbF6SkaoQM27tVGwz_R2szIgAqDrbDHzkNjg-CEvTiRNg0q6SI1cK__O7XHGRhSuJSAK-kQ26WIUAD88KSy49tDqXdcXD0aSJp-m3sHZsHC7',
      permissions: ['manage_inventory'],
      clockedIn: true,
      clockInTime: '09:00 AM',
      hireDate: 'Mar 04, 2022'
    },
    {
      id: 'NEX-7712',
      name: 'Sarah Jenkins',
      role: 'Customer Experience Lead',
      rank: 2,
      department: 'Customer Relations',
      zone: 'South Atrium',
      email: 's.jenkins@nexusretail.com',
      pin: '3456',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT-BEtrJIqSrrSuRv72V0Mz6dVWZ-YTROUXxG70gj31hVZ4O0bEd4Pc7Yslj_V0pZh4jT2ccgRlojx8Qwn9KA8Mp8XMlof1y7dFFt5YQ2ApLTgFkHwE8iMwBeMUJFTt8fvwydG7y61MZp0Hvu9WfqdsRLgy5TjhhlJu5HmjKKUr3u6QppaeK71-Li19pgna0FxbiUe497tyZ9LoGPQMlemjkL_RcwwsBrN_qOe6L1jMFb-TsvnVRXo',
      permissions: ['assign_tasks'],
      clockedIn: false,
      clockInTime: null,
      hireDate: 'Aug 19, 2022'
    },
    {
      id: 'NEX-9920',
      name: 'Marcus Thorne',
      role: 'Mall Security Lead',
      rank: 3,
      department: 'Security & Safety',
      zone: 'West Gallery',
      email: 'm.thorne@nexusretail.com',
      pin: '4567',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB53ZHJNsRwuEOo42TueHQHHwFFqRQWcBbh6hmgJG-5W4Al0cszV3p-1zccIjwuiG-eZunPKo8dOgDTcQfsfqdbVEoxp5kFGXMqFmatiLrr8PFdftVXrooDhXfSNW0flXnrP-YKmvKJF11JylvLuFvr9Lm28cvpz7UtjB7ezdWmAuv5Ua3t9Dr5c_BlBJxvCYWMtoVYxduR-UseW4BijMcbo6boPW0kDfmAwGhbnhPYMxzTrqfuWy3I',
      permissions: ['security_audit', 'assign_tasks'],
      clockedIn: true,
      clockInTime: '06:00 AM',
      hireDate: 'Nov 01, 2020'
    },
    {
      id: 'NEX-1044',
      name: 'Anita Jones',
      role: 'Retail Merchandising Associate',
      rank: 1,
      department: 'Apparel & Styling',
      zone: 'East Promenade',
      email: 'a.jones@nexusretail.com',
      pin: '5678',
      avatar: '',
      initials: 'AJ',
      permissions: [],
      clockedIn: true,
      clockInTime: '10:00 AM',
      hireDate: 'Sep 01, 2026'
    }
  ],

  // Current Logged-in User Session (Default to Global Admin Marcus Vance)
  currentUserId: localStorage.getItem('nexus_current_user_id') || 'NEX-0001',

  get currentUser() {
    return this.employees.find(e => e.id === this.currentUserId) || this.employees[0];
  },

  isManager() {
    return this.currentUser && this.currentUser.rank >= 4;
  },

  hasPermission(permKey) {
    if (!this.currentUser) return false;
    if (this.currentUser.rank === 5) return true; // Super admin has all permissions
    return Array.isArray(this.currentUser.permissions) && this.currentUser.permissions.includes(permKey);
  },

  // Security & Permission Audit Log
  auditLogs: JSON.parse(localStorage.getItem('nexus_audit_logs')) || [
    { timestamp: 'Today, 08:30 AM', actor: 'Marcus Vance (Admin)', action: 'System Initialization', target: 'Security Cluster', detail: 'All RBAC policy enforcement active' },
    { timestamp: 'Today, 09:15 AM', actor: 'Marcus Vance (Admin)', action: 'Permission Granted', target: 'Elena Rodriguez', detail: 'Added "assign_tasks" clearance' },
    { timestamp: 'Yesterday, 04:20 PM', actor: 'Marcus Vance (Admin)', action: 'Role Provisioning', target: 'David Chen', detail: 'Elevated to Rank 2: Inventory Specialist' }
  ],

  // Data stores with persistence
  inventory: JSON.parse(localStorage.getItem('nexus_inventory')) || [
    { id: 1, name: 'OLED Monitor 27"', sku: 'EL-OM-27', category: 'Electronics', stock: 145, max: 200, price: 349.99, status: 'In Stock' },
    { id: 2, name: 'Winter Parka - L', sku: 'FA-WP-L', category: 'Fashion', stock: 12, max: 80, price: 129.50, status: 'Reorder Now' },
    { id: 3, name: 'Wireless Earbuds Pro', sku: 'EL-WE-P', category: 'Electronics', stock: 0, max: 150, price: 89.99, status: 'Out of Stock' },
    { id: 4, name: 'Ergo Office Chair', sku: 'HG-EC-B', category: 'Home Goods', stock: 45, max: 60, price: 219.00, status: 'In Stock' },
    { id: 5, name: 'Ceramic Table Lamp', sku: 'HG-CTL-W', category: 'Home Goods', stock: 28, max: 50, price: 64.00, status: 'In Stock' },
    { id: 6, name: 'Merino Wool Sweater', sku: 'FA-MWS-M', category: 'Fashion', stock: 8, max: 50, price: 95.00, status: 'Reorder Now' },
    { id: 7, name: 'Smart Video Doorbell', sku: 'EL-SVD-1', category: 'Electronics', stock: 62, max: 100, price: 119.99, status: 'In Stock' },
    { id: 8, name: 'Cotton Linen Duvet Set', sku: 'HG-CLD-K', category: 'Home Goods', stock: 19, max: 40, price: 85.00, status: 'In Stock' }
  ],

  transactions: JSON.parse(localStorage.getItem('nexus_transactions')) || [
    { id: 101, date: 'Oct 24, 2023', desc: 'Tenant Lease Payment - Zara', category: 'Revenue', type: 'revenue', amount: 12500, status: 'Completed' },
    { id: 102, date: 'Oct 23, 2023', desc: 'Facility Maintenance - HVAC Services', category: 'Maintenance', type: 'expense', amount: 3420, status: 'Completed' },
    { id: 103, date: 'Oct 22, 2023', desc: 'East Wing Lighting Retrofit', category: 'Utilities', type: 'expense', amount: 1850, status: 'Pending' },
    { id: 104, date: 'Oct 21, 2023', desc: 'Anchor Tenant Lease - Apple Store', category: 'Revenue', type: 'revenue', amount: 28500, status: 'Completed' },
    { id: 105, date: 'Oct 20, 2023', desc: 'Bi-Weekly Security Contractor Payroll', category: 'Payroll', type: 'expense', amount: 8400, status: 'Completed' },
    { id: 106, date: 'Oct 19, 2023', desc: 'Food Court Concession Royalty', category: 'Revenue', type: 'revenue', amount: 6720, status: 'Completed' },
    { id: 107, date: 'Oct 18, 2023', desc: 'Parking Garage Automation License', category: 'Utilities', type: 'expense', amount: 1200, status: 'Completed' },
    { id: 108, date: 'Oct 17, 2023', desc: 'Emergency Plumbing Repair - Level 2', category: 'Maintenance', type: 'expense', amount: 950, status: 'Completed' }
  ],

  tasks: JSON.parse(localStorage.getItem('nexus_tasks')) || [
    { id: 201, associate: 'Elena Rodriguez', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSy1JbUL5EHLhUSq8T2TP-nxMlEbEub9YzHHTfuoYoS7r_OInuKon5Y3btmVGcZx939OM0OSKVXIiE6xlFNw_VaZ51zI6AQsAdFTyNlxkGfznYfVX---VEIieISxwt_ATd9yuxqcPQrm2X_WSq3aOD-wZfaEuY1azLRJaw90ELG92UZK-syldymQKKs95hUMo6-QdGaT21IyeehJgHFVEA8aqPls9RyWeVAvBhtYknb5wJ19k45v0X', zone: 'North Wing', task: 'Inventory Audit - North Wing', status: 'In Progress', priority: 'High', due: 'Today, 4:00 PM' },
    { id: 202, associate: 'Anita Jones', avatar: '', initials: 'AJ', zone: 'East Promenade', task: 'Display Window Restyling', status: 'In Progress', priority: 'Medium', due: 'Today, 6:00 PM' },
    { id: 203, associate: 'David Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy2xEe2XngudVkETnuUqbHnByXcJQqYENFFek-6XrOgnfAyfcGG_ZTB0LnCeHbZvQLOmeZX2_IkhfHSKjNqHAD_eX58tVEfD412GFJ3Qf4tB6vnB74OrF-PRG0g1CNatntoQvh7Q8hkbF6SkaoQM27tVGwz_R2szIgAqDrbDHzkNjg-CEvTiRNg0q6SI1cK__O7XHGRhSuJSAK-kQ26WIUAD88KSy49tDqXdcXD0aSJp-m3sHZsHC7', zone: 'Storage Bay B', task: 'Receiving Dock Clearance', status: 'Completed', priority: 'High', due: 'Completed 11:30 AM' },
    { id: 204, associate: 'Sarah Jenkins', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT-BEtrJIqSrrSuRv72V0Mz6dVWZ-YTROUXxG70gj31hVZ4O0bEd4Pc7Yslj_V0pZh4jT2ccgRlojx8Qwn9KA8Mp8XMlof1y7dFFt5YQ2ApLTgFkHwE8iMwBeMUJFTt8fvwydG7y61MZp0Hvu9WfqdsRLgy5TjhhlJu5HmjKKUr3u6QppaeK71-Li19pgna0FxbiUe497tyZ9LoGPQMlemjkL_RcwwsBrN_qOe6L1jMFb-TsvnVRXo', zone: 'South Atrium', task: 'Customer Information Desk Lead', status: 'In Progress', priority: 'Medium', due: 'Today, 8:00 PM' },
    { id: 205, associate: 'Marcus Thorne', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB53ZHJNsRwuEOo42TueHQHHwFFqRQWcBbh6hmgJG-5W4Al0cszV3p-1zccIjwuiG-eZunPKo8dOgDTcQfsfqdbVEoxp5kFGXMqFmatiLrr8PFdftVXrooDhXfSNW0flXnrP-YKmvKJF11JylvLuFvr9Lm28cvpz7UtjB7ezdWmAuv5Ua3t9Dr5c_BlBJxvCYWMtoVYxduR-UseW4BijMcbo6boPW0kDfmAwGhbnhPYMxzTrqfuWy3I', zone: 'West Gallery', task: 'Security Camera Field Verification', status: 'In Progress', priority: 'Urgent', due: 'Today, 2:30 PM' }
  ],

  selectedAssociateForTask: 'Elena Rodriguez',

  saveState() {
    localStorage.setItem('nexus_inventory', JSON.stringify(this.inventory));
    localStorage.setItem('nexus_transactions', JSON.stringify(this.transactions));
    localStorage.setItem('nexus_tasks', JSON.stringify(this.tasks));
    localStorage.setItem('nexus_employees', JSON.stringify(this.employees));
    localStorage.setItem('nexus_audit_logs', JSON.stringify(this.auditLogs));
    localStorage.setItem('nexus_current_user_id', this.currentUserId);
  }
};

// --- SONNER TOAST NOTIFICATIONS ---
const toast = {
  container: null,
  init() {
    this.container = document.getElementById('sonner-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'sonner-container';
      this.container.className = 'sonner-container';
      document.body.appendChild(this.container);
    }
  },
  show(type, title, message = '') {
    this.init();
    const item = document.createElement('div');
    item.className = `sonner-toast ${type}`;

    let iconName = 'check_circle';
    if (type === 'error') iconName = 'error';
    if (type === 'info') iconName = 'info';

    item.innerHTML = `
      <span class="material-symbols-outlined toast-icon fill text-[22px]">${iconName}</span>
      <div class="flex-1">
        <div class="font-semibold text-white">${title}</div>
        ${message ? `<div class="text-xs text-white/70 mt-0.5">${message}</div>` : ''}
      </div>
      <button class="text-white/50 hover:text-white transition-colors p-1" onclick="this.closest('.sonner-toast').remove()">
        <span class="material-symbols-outlined text-[16px]">close</span>
      </button>
    `;

    this.container.appendChild(item);

    requestAnimationFrame(() => {
      item.classList.add('show');
    });

    setTimeout(() => {
      item.classList.remove('show');
      item.classList.add('hiding');
      setTimeout(() => {
        if (item.parentNode) item.remove();
      }, 220);
    }, 3800);
  },
  success(title, message) { this.show('success', title, message); },
  error(title, message) { this.show('error', title, message); },
  info(title, message) { this.show('info', title, message); }
};

// --- USER SESSION & AUTHENTICATION ---
function updateSessionUI() {
  const user = AppState.currentUser;
  if (!user) return;

  // Header user display
  const headerName = document.getElementById('header-user-name');
  if (headerName) headerName.textContent = user.name;

  const headerRank = document.getElementById('header-user-rank');
  if (headerRank) {
    headerRank.textContent = `Rank ${user.rank}: ${user.role.split('&')[0].trim()}`;
    headerRank.className = `badge-pill text-[10px] rank-badge-${user.rank}`;
  }

  const headerAvatar = document.getElementById('header-user-avatar');
  if (headerAvatar) {
    if (user.avatar) {
      headerAvatar.src = user.avatar;
    } else {
      headerAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=041627&color=6cf8bb`;
    }
  }

  // Sidebar profile card
  const sideName = document.getElementById('sidebar-user-name');
  if (sideName) sideName.textContent = user.name;

  const sideRole = document.getElementById('sidebar-user-role');
  if (sideRole) sideRole.textContent = user.role;

  const sideRank = document.getElementById('sidebar-user-rank');
  if (sideRank) {
    sideRank.textContent = `Rank ${user.rank} Clearance`;
    sideRank.className = `font-mono text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block rank-badge-${user.rank}`;
  }

  const sideAvatar = document.getElementById('sidebar-user-avatar');
  if (sideAvatar) {
    if (user.avatar) {
      sideAvatar.src = user.avatar;
    } else {
      sideAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=041627&color=6cf8bb`;
    }
  }

  // Update Manager Nav Lock indicator
  const managerLockBadge = document.getElementById('manager-nav-lock');
  if (managerLockBadge) {
    if (AppState.isManager()) {
      managerLockBadge.classList.add('hidden');
    } else {
      managerLockBadge.classList.remove('hidden');
    }
  }
}

function switchUser(empId) {
  const emp = AppState.employees.find(e => e.id === empId);
  if (emp) {
    AppState.currentUserId = emp.id;
    AppState.saveState();
    updateSessionUI();
    renderSwitchUserModalList();
    closeModal('modal-switch-user');
    toast.success('Session Switched', `Active User: ${emp.name} (Rank ${emp.rank})`);

    // Re-render active view
    navigateTo(AppState.currentView);
  }
}

function handleManagerLoginSubmit(e) {
  e.preventDefault();
  const inputPass = e.target.querySelector('input[type="password"]')?.value || document.getElementById('manager-login-pass')?.value || '';
  const pass = inputPass.trim();
  if (pass === 'nexus2026' || pass === 'admin') {
    // Elevate to Marcus Vance (Global Admin) or give manager rank
    AppState.currentUserId = 'NEX-0001';
    AppState.saveState();
    updateSessionUI();
    renderSwitchUserModalList();
    closeModal('modal-manager-login');
    toast.success('Manager Authenticated', 'Higher Management rank & background permissions granted');
    navigateTo('management');
  } else {
    toast.error('Access Denied', 'Invalid Manager Passkey. Hint: default passkey is "nexus2026"');
  }
}

function quickElevateToManager() {
  AppState.currentUserId = 'NEX-0001';
  AppState.saveState();
  updateSessionUI();
  closeModal('modal-manager-login');
  closeModal('modal-switch-user');
  toast.success('Manager Clearance Granted', 'Logged in as Marcus Vance (Global Administrator, Rank 5)');
  navigateTo('management');
}

// --- ROUTER & PERMISSION ENFORCEMENT ---
function navigateTo(viewId) {
  const validViews = ['dashboard', 'inventory', 'sales', 'hr', 'profile', 'assign-task', 'management', 'onboarding'];
  if (!validViews.includes(viewId)) viewId = 'dashboard';

  // Permission Gate: Manager Portal requires Rank 4+
  if (viewId === 'management' && !AppState.isManager()) {
    // Show manager login gate modal or render the locked view
    AppState.currentView = 'management';
    window.location.hash = 'management';
    renderNavActive('management');
    renderSecurityGate();
    closeMobileDrawer();
    return;
  }

  // Financials Gate: Check 'view_financials'
  if (viewId === 'sales' && !AppState.hasPermission('view_financials')) {
    toast.info('Restricted Financials', 'Your account has read-only simulated ledger access');
  }

  AppState.currentView = viewId;
  window.location.hash = viewId;
  renderNavActive(viewId);
  closeMobileDrawer();

  // Trigger view renderers
  if (viewId === 'dashboard') renderDashboard();
  if (viewId === 'inventory') renderInventory();
  if (viewId === 'sales') renderSales();
  if (viewId === 'hr') renderHR();
  if (viewId === 'profile') renderProfile();
  if (viewId === 'assign-task') renderAssignTask();
  if (viewId === 'management') renderManagement();
  if (viewId === 'onboarding') renderOnboarding();
}

function renderNavActive(viewId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.view === viewId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  document.querySelectorAll('.view-section').forEach(sec => {
    if (sec.id === `view-${viewId}`) {
      sec.classList.remove('hidden');
      sec.style.opacity = '0';
      sec.style.transform = 'translateY(6px)';
      requestAnimationFrame(() => {
        sec.style.transition = 'opacity 180ms var(--ease-out), transform 180ms var(--ease-out)';
        sec.style.opacity = '1';
        sec.style.transform = 'translateY(0)';
      });
    } else {
      sec.classList.add('hidden');
    }
  });
}

function renderSecurityGate() {
  document.querySelectorAll('.view-section').forEach(sec => {
    if (sec.id === 'view-management') {
      sec.classList.remove('hidden');
      const container = document.getElementById('management-content-container');
      const gate = document.getElementById('management-security-gate');
      if (container) container.classList.add('hidden');
      if (gate) gate.classList.remove('hidden');
    } else {
      sec.classList.add('hidden');
    }
  });
}

function openMobileDrawer() {
  const drawer = document.getElementById('sidebar-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('sidebar-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
  }
}

// --- THEME MANAGEMENT ---
function toggleTheme() {
  AppState.darkMode = !AppState.darkMode;
  localStorage.setItem('nexus_dark_mode', AppState.darkMode);
  applyTheme();
  toast.info(AppState.darkMode ? 'Dark Mode Activated' : 'Light Mode Activated');
}

function applyTheme() {
  if (AppState.darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  const themeIcons = document.querySelectorAll('.theme-toggle-icon');
  themeIcons.forEach(icon => {
    icon.textContent = AppState.darkMode ? 'light_mode' : 'dark_mode';
  });
}

// --- MODAL HELPERS ---
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// =========================================================================
// VIEW RENDERERS
// =========================================================================

// 1. Operational Dashboard
function renderDashboard() {
  const totalSales = AppState.transactions
    .filter(t => t.type === 'revenue')
    .reduce((sum, t) => sum + t.amount, 0);

  const salesEl = document.getElementById('dash-kpi-sales');
  if (salesEl) salesEl.textContent = `$${(totalSales + 124500).toLocaleString()}`;

  const lowStockCount = AppState.inventory.filter(i => i.status === 'Reorder Now' || i.status === 'Out of Stock').length;
  const stockAlertEl = document.getElementById('dash-kpi-stock');
  if (stockAlertEl) stockAlertEl.textContent = lowStockCount;

  const activeTasks = AppState.tasks.filter(t => t.status === 'In Progress').length;
  const teamDutyEl = document.getElementById('dash-kpi-duty');
  if (teamDutyEl) teamDutyEl.textContent = `${activeTasks} Active`;

  renderHourlyRevenueChart();
}

function renderHourlyRevenueChart() {
  const chartBox = document.getElementById('dash-revenue-chart');
  if (!chartBox) return;

  const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  const values = [12400, 24600, 39800, 68200, 84100, 102500, 118400, 124500];
  const maxVal = 140000;

  const points = values.map((v, idx) => {
    const x = (idx / (values.length - 1)) * 100;
    const y = 90 - (v / maxVal) * 75;
    return { x, y, val: v, hour: hours[idx] };
  });

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const xc = (points[i].x + points[i + 1].x) / 2;
    const yc = (points[i].y + points[i + 1].y) / 2;
    pathD += ` Q ${points[i].x} ${points[i].y}, ${xc} ${yc}`;
  }
  pathD += ` T ${points[points.length - 1].x} ${points[points.length - 1].y}`;
  const areaD = `${pathD} L 100 95 L 0 95 Z`;

  chartBox.innerHTML = `
    <div class="relative w-full h-full min-h-[280px]">
      <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="dash-chart-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#006c49" stop-opacity="0.25"></stop>
            <stop offset="100%" stop-color="#006c49" stop-opacity="0.01"></stop>
          </linearGradient>
        </defs>
        <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(196,198,205,0.3)" stroke-width="0.3" stroke-dasharray="1 1"></line>
        <line x1="0" y1="45" x2="100" y2="45" stroke="rgba(196,198,205,0.3)" stroke-width="0.3" stroke-dasharray="1 1"></line>
        <line x1="0" y1="70" x2="100" y2="70" stroke="rgba(196,198,205,0.3)" stroke-width="0.3" stroke-dasharray="1 1"></line>
        <line x1="0" y1="95" x2="100" y2="95" stroke="rgba(196,198,205,0.5)" stroke-width="0.5"></line>
        <path d="${areaD}" fill="url(#dash-chart-grad)"></path>
        <path d="${pathD}" fill="none" stroke="#006c49" stroke-width="1.2" stroke-linecap="round"></path>
        ${points.map((p, i) => `
          <circle cx="${p.x}" cy="${p.y}" r="2" class="cursor-pointer fill-white stroke-[#006c49]" stroke-width="1" data-idx="${i}"></circle>
        `).join('')}
      </svg>
      <div id="dash-chart-tooltip" class="chart-tooltip"></div>
      <div class="flex justify-between items-center text-[11px] font-mono text-on-surface-variant pt-2">
        ${hours.map(h => `<span>${h}</span>`).join('')}
      </div>
    </div>
  `;

  const tooltip = document.getElementById('dash-chart-tooltip');
  const circles = chartBox.querySelectorAll('circle');
  circles.forEach(c => {
    c.addEventListener('mouseenter', (e) => {
      const idx = e.target.dataset.idx;
      const pt = points[idx];
      tooltip.innerHTML = `<strong>${pt.hour}</strong>: $${pt.val.toLocaleString()}`;
      tooltip.style.left = `${pt.x}%`;
      tooltip.style.top = `${pt.y}%`;
      tooltip.classList.add('visible');
    });
    c.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });
  });
}

// 2. Inventory & Goods Tracking
let activeCategoryFilter = 'All';

function renderInventory() {
  const kpiVal = document.getElementById('inv-kpi-total-val');
  if (kpiVal) kpiVal.textContent = `$${(AppState.inventory.reduce((sum, i) => sum + (i.stock * i.price), 0)).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;

  const kpiLow = document.getElementById('inv-kpi-low');
  if (kpiLow) kpiLow.textContent = AppState.inventory.filter(item => item.status === 'Reorder Now').length;

  const kpiOut = document.getElementById('inv-kpi-out');
  if (kpiOut) kpiOut.textContent = AppState.inventory.filter(item => item.status === 'Out of Stock').length;

  const searchQuery = (document.getElementById('inventory-search-input')?.value || '').toLowerCase().trim();
  const filtered = AppState.inventory.filter(item => {
    const matchesCat = activeCategoryFilter === 'All' || item.category === activeCategoryFilter;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery) || item.sku.toLowerCase().includes(searchQuery);
    return matchesCat && matchesQuery;
  });

  const tbody = document.getElementById('inventory-table-body');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-12 text-on-surface-variant">
          <span class="material-symbols-outlined text-4xl mb-2 opacity-40">inventory_2</span>
          <p class="font-medium">No inventory items found matching your criteria.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    let statusBadge = '';
    let barColor = 'bg-secondary';
    const percent = Math.min(100, Math.round((item.stock / item.max) * 100));

    if (item.status === 'In Stock') {
      statusBadge = `<span class="badge-pill bg-secondary-container/30 text-secondary border border-secondary/20"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>In Stock</span>`;
      barColor = 'bg-secondary';
    } else if (item.status === 'Reorder Now') {
      statusBadge = `<span class="badge-pill bg-tertiary-container/30 text-on-tertiary-container border border-on-tertiary-container/30"><span class="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>Reorder Now</span>`;
      barColor = 'bg-on-tertiary-container';
    } else {
      statusBadge = `<span class="badge-pill bg-error-container/30 text-error border border-error/30"><span class="w-1.5 h-1.5 rounded-full bg-error"></span>Out of Stock</span>`;
      barColor = 'bg-error';
    }

    let iconCategory = 'category';
    if (item.category === 'Electronics') iconCategory = 'devices';
    if (item.category === 'Fashion') iconCategory = 'checkroom';
    if (item.category === 'Home Goods') iconCategory = 'chair';

    return `
      <tr class="group cursor-pointer">
        <td>
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span class="material-symbols-outlined text-[18px]">${iconCategory}</span>
            </div>
            <div>
              <div class="font-semibold text-on-surface">${item.name}</div>
              <div class="text-xs text-on-surface-variant">${item.category}</div>
            </div>
          </div>
        </td>
        <td class="font-mono text-xs text-on-surface-variant font-medium">${item.sku}</td>
        <td class="font-mono text-sm font-semibold">${item.stock} <span class="text-xs text-on-surface-variant font-normal">/ ${item.max}</span></td>
        <td>${statusBadge}</td>
        <td>
          <div class="flex items-center gap-2">
            <div class="w-24 h-2 bg-surface-container rounded-full overflow-hidden">
              <div class="h-full ${barColor} transition-all duration-300" style="width: ${percent}%"></div>
            </div>
            <span class="text-xs font-mono text-on-surface-variant">${percent}%</span>
          </div>
        </td>
        <td class="text-right">
          <div class="flex items-center justify-end gap-1">
            <button onclick="quickRestock(${item.id}, 10)" class="p-1 rounded-md text-xs font-semibold bg-surface-container hover:bg-surface-highest text-primary transition-colors" title="Add 10 units">
              +10
            </button>
            <button onclick="quickRestock(${item.id}, 50)" class="p-1 rounded-md text-xs font-semibold bg-surface-container hover:bg-surface-highest text-primary transition-colors" title="Add 50 units">
              +50
            </button>
            <button onclick="deleteProduct(${item.id})" class="p-1 text-on-surface-variant hover:text-error transition-colors" title="Remove SKU">
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function filterInventoryCategory(category) {
  activeCategoryFilter = category;
  document.querySelectorAll('.inv-cat-pill').forEach(btn => {
    if (btn.dataset.cat === category) {
      btn.className = 'inv-cat-pill px-3 py-1 bg-primary text-white rounded-lg text-xs font-medium';
    } else {
      btn.className = 'inv-cat-pill px-3 py-1 bg-surface border border-outline-variant text-on-surface-variant hover:bg-surface-container rounded-lg text-xs font-medium transition-colors';
    }
  });
  renderInventory();
}

function quickRestock(productId, amount) {
  const product = AppState.inventory.find(p => p.id === productId);
  if (product) {
    product.stock += amount;
    if (product.stock > 0 && product.status === 'Out of Stock') {
      product.status = 'In Stock';
    }
    if (product.stock > 20 && product.status === 'Reorder Now') {
      product.status = 'In Stock';
    }
    AppState.saveState();
    renderInventory();
    toast.success(`Restocked ${amount} units`, `${product.name} now at ${product.stock} units`);
  }
}

function deleteProduct(productId) {
  const idx = AppState.inventory.findIndex(p => p.id === productId);
  if (idx !== -1) {
    const item = AppState.inventory[idx];
    AppState.inventory.splice(idx, 1);
    AppState.saveState();
    renderInventory();
    toast.info('Item Removed', `${item.name} (${item.sku}) removed from roster`);
  }
}

function handleAddProductSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.prod_name.value.trim();
  const sku = form.prod_sku.value.trim();
  const category = form.prod_category.value;
  const stock = parseInt(form.prod_stock.value, 10) || 0;
  const max = parseInt(form.prod_max.value, 10) || 100;
  const price = parseFloat(form.prod_price.value) || 0;

  if (!name || !sku) {
    toast.error('Validation Error', 'Product Name and SKU are required');
    return;
  }

  let status = 'In Stock';
  if (stock === 0) status = 'Out of Stock';
  else if (stock <= 15) status = 'Reorder Now';

  const newProd = {
    id: Date.now(),
    name,
    sku,
    category,
    stock,
    max,
    price,
    status
  };

  AppState.inventory.unshift(newProd);
  AppState.saveState();
  closeModal('modal-add-product');
  form.reset();
  renderInventory();
  toast.success('Product Added', `${name} is now tracked in inventory`);
}

// 3. Sales & Financial Tracking
function renderSales() {
  const revenueTotal = AppState.transactions
    .filter(t => t.type === 'revenue')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseTotal = AppState.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = revenueTotal - expenseTotal;

  const revEl = document.getElementById('sales-kpi-revenue');
  if (revEl) revEl.textContent = `$${revenueTotal.toLocaleString()}`;

  const expEl = document.getElementById('sales-kpi-expense');
  if (expEl) expEl.textContent = `$${expenseTotal.toLocaleString()}`;

  const netEl = document.getElementById('sales-kpi-net');
  if (netEl) netEl.textContent = `$${netProfit.toLocaleString()}`;

  renderSalesChart();
  renderTransactionsTable();
}

function renderSalesChart() {
  const chartEl = document.getElementById('sales-financial-chart');
  if (!chartEl) return;

  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const revValues = [92000, 108000, 125000, 118000, 134000, 142500];
  const expValues = [42000, 45000, 47000, 46000, 49000, 48200];
  const maxVal = 160000;

  const revPoints = revValues.map((v, i) => ({
    x: (i / (months.length - 1)) * 100,
    y: 90 - (v / maxVal) * 75,
    val: v,
    month: months[i]
  }));

  const expPoints = expValues.map((v, i) => ({
    x: (i / (months.length - 1)) * 100,
    y: 90 - (v / maxVal) * 75,
    val: v,
    month: months[i]
  }));

  const buildPath = (pts) => {
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const xc = (pts[i].x + pts[i + 1].x) / 2;
      const yc = (pts[i].y + pts[i + 1].y) / 2;
      d += ` Q ${pts[i].x} ${pts[i].y}, ${xc} ${yc}`;
    }
    d += ` T ${pts[pts.length - 1].x} ${pts[pts.length - 1].y}`;
    return d;
  };

  const revPath = buildPath(revPoints);
  const expPath = buildPath(expPoints);

  chartEl.innerHTML = `
    <div class="relative w-full h-full min-h-[300px]">
      <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#006c49" stop-opacity="0.25"></stop>
            <stop offset="100%" stop-color="#006c49" stop-opacity="0.0"></stop>
          </linearGradient>
          <linearGradient id="exp-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ba1a1a" stop-opacity="0.15"></stop>
            <stop offset="100%" stop-color="#ba1a1a" stop-opacity="0.0"></stop>
          </linearGradient>
        </defs>

        <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(196,198,205,0.3)" stroke-width="0.3"></line>
        <line x1="0" y1="45" x2="100" y2="45" stroke="rgba(196,198,205,0.3)" stroke-width="0.3"></line>
        <line x1="0" y1="70" x2="100" y2="70" stroke="rgba(196,198,205,0.3)" stroke-width="0.3"></line>
        <line x1="0" y1="95" x2="100" y2="95" stroke="rgba(196,198,205,0.5)" stroke-width="0.5"></line>

        <path d="${revPath} L 100 95 L 0 95 Z" fill="url(#rev-grad)"></path>
        <path d="${expPath} L 100 95 L 0 95 Z" fill="url(#exp-grad)"></path>

        <path d="${revPath}" fill="none" stroke="#006c49" stroke-width="1.5" stroke-linecap="round"></path>
        <path d="${expPath}" fill="none" stroke="#ba1a1a" stroke-width="1.5" stroke-linecap="round"></path>

        ${revPoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="2" class="fill-white stroke-[#006c49]" stroke-width="1.2"></circle>`).join('')}
        ${expPoints.map(p => `<circle cx="${p.x}" cy="${p.y}" r="2" class="fill-white stroke-[#ba1a1a]" stroke-width="1.2"></circle>`).join('')}
      </svg>
      <div class="flex justify-between items-center text-[11px] font-mono text-on-surface-variant pt-2">
        ${months.map(m => `<span>${m}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderTransactionsTable() {
  const tbody = document.getElementById('sales-transactions-body');
  if (!tbody) return;

  tbody.innerHTML = AppState.transactions.map(t => {
    const isRev = t.type === 'revenue';
    const amountStr = `${isRev ? '+' : '-'}$${t.amount.toLocaleString()}.00`;
    const amountClass = isRev ? 'text-secondary font-bold' : 'text-on-surface font-semibold';

    let statusClass = 'bg-secondary-container/30 text-secondary border border-secondary/20';
    if (t.status === 'Pending') statusClass = 'bg-tertiary-container/30 text-on-tertiary-container border border-on-tertiary-container/20';

    return `
      <tr class="hover:bg-surface-container transition-colors">
        <td class="font-mono text-xs text-on-surface-variant">${t.date}</td>
        <td class="font-medium text-on-surface">${t.desc}</td>
        <td class="text-xs text-on-surface-variant">${t.category}</td>
        <td>
          <span class="badge-pill ${statusClass}">${t.status}</span>
        </td>
        <td class="text-right font-mono text-sm ${amountClass}">${amountStr}</td>
      </tr>
    `;
  }).join('');
}

function handleAddTransactionSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const desc = form.trans_desc.value.trim();
  const category = form.trans_category.value;
  const type = form.trans_type.value;
  const amount = parseFloat(form.trans_amount.value) || 0;
  const status = form.trans_status.value;

  if (!desc || amount <= 0) {
    toast.error('Validation Error', 'Please enter a valid description and positive amount');
    return;
  }

  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const newTrans = {
    id: Date.now(),
    date: today,
    desc,
    category,
    type,
    amount,
    status
  };

  AppState.transactions.unshift(newTrans);
  AppState.saveState();
  closeModal('modal-add-transaction');
  form.reset();
  renderSales();
  toast.success('Transaction Logged', `${desc} ($${amount.toLocaleString()}) recorded.`);
}

function exportSalesReport() {
  const headers = ['ID', 'Date', 'Description', 'Category', 'Type', 'Amount', 'Status'];
  const rows = AppState.transactions.map(t => [
    t.id,
    `"${t.date}"`,
    `"${t.desc.replace(/"/g, '""')}"`,
    t.category,
    t.type,
    t.amount,
    t.status
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Nexus_Financial_Report_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  toast.success('Report Exported', 'CSV financial data downloaded to your browser');
}

// 4. HR & Team Performance
function renderHR() {
  const tbody = document.getElementById('hr-assignments-body');
  if (!tbody) return;

  tbody.innerHTML = AppState.tasks.map(task => {
    let avatarHtml = '';
    if (task.avatar) {
      avatarHtml = `<img src="${task.avatar}" class="w-8 h-8 rounded-full object-cover border border-outline-variant shadow-sm" alt="${task.associate}"/>`;
    } else {
      avatarHtml = `<div class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">${task.initials || 'EM'}</div>`;
    }

    return `
      <tr class="hover:bg-surface-container transition-colors">
        <td>
          <div class="flex items-center gap-3">
            ${avatarHtml}
            <div>
              <div class="font-semibold text-on-surface cursor-pointer hover:underline" onclick="openAssociateProfile('${task.associate}')">${task.associate}</div>
              <div class="text-[11px] text-on-surface-variant">${task.due}</div>
            </div>
          </div>
        </td>
        <td class="text-xs font-medium text-on-surface-variant">${task.zone}</td>
        <td class="font-medium text-on-surface">${task.task}</td>
        <td>
          <select onchange="updateTaskStatus(${task.id}, this.value)" class="text-xs font-semibold rounded-full px-2 py-1 bg-surface border border-outline-variant focus:outline-none">
            <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="Pending Review" ${task.status === 'Pending Review' ? 'selected' : ''}>Pending Review</option>
          </select>
        </td>
        <td class="text-right">
          <button onclick="removeTask(${task.id})" class="p-1 text-on-surface-variant hover:text-error transition-colors" title="Delete Task">
            <span class="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function updateTaskStatus(taskId, newStatus) {
  const task = AppState.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = newStatus;
    AppState.saveState();
    toast.success('Duty Updated', `${task.associate}: ${task.task} set to "${newStatus}"`);
    renderHR();
  }
}

function removeTask(taskId) {
  const idx = AppState.tasks.findIndex(t => t.id === taskId);
  if (idx !== -1) {
    const t = AppState.tasks[idx];
    AppState.tasks.splice(idx, 1);
    AppState.saveState();
    renderHR();
    toast.info('Task Removed', `Assignment for ${t.associate} deleted.`);
  }
}

function openAssociateProfile(name) {
  if (name.includes('Elena')) {
    navigateTo('profile');
  } else {
    toast.info(`Viewing ${name}`, 'Routing to active assignment details');
    navigateTo('profile');
  }
}

// 5. Employee Profile (Elena Rodriguez)
function renderProfile() {
  const tasksContainer = document.getElementById('profile-tasks-list');
  if (!tasksContainer) return;

  const elenaTasks = AppState.tasks.filter(t => t.associate.includes('Elena'));
  tasksContainer.innerHTML = elenaTasks.map(t => `
    <div class="flex items-center justify-between p-3 bg-surface rounded-xl border border-outline-variant/60 hover:border-primary transition-all">
      <div class="flex items-center gap-3">
        <input type="checkbox" onchange="toggleProfileTask(${t.id}, this.checked)" ${t.status === 'Completed' ? 'checked' : ''} class="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"/>
        <div>
          <div class="text-sm font-semibold ${t.status === 'Completed' ? 'line-through text-on-surface-variant' : 'text-on-surface'}">${t.task}</div>
          <div class="text-xs text-on-surface-variant font-mono">Zone: ${t.zone} • Due: ${t.due}</div>
        </div>
      </div>
      <span class="badge-pill text-[10px] ${t.priority === 'High' ? 'bg-error-container/30 text-error' : 'bg-surface-container text-on-surface-variant'}">${t.priority}</span>
    </div>
  `).join('');
}

function toggleProfileTask(taskId, isChecked) {
  const task = AppState.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = isChecked ? 'Completed' : 'In Progress';
    AppState.saveState();
    renderProfile();
    toast.success(isChecked ? 'Task Completed' : 'Task Reopened', task.task);
  }
}

function copyContact(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    toast.success('Copied to Clipboard', `${label}: ${text}`);
  }).catch(() => {
    toast.info('Copied', text);
  });
}

// 6. Assign New Task
let selectedAssociate = 'Elena Rodriguez';
let taskPriority = 'Medium';
let checklistItems = ['Check high-value electronics display', 'Verify delivery manifest with warehouse scanner'];

function renderAssignTask() {
  document.querySelectorAll('.associate-card').forEach(card => {
    const name = card.dataset.name;
    const badge = card.querySelector('.selected-check');
    if (name === selectedAssociate) {
      card.classList.remove('opacity-60');
      card.classList.add('ring-2', 'ring-primary', 'bg-surface-container');
      if (badge) badge.classList.remove('hidden');
    } else {
      card.classList.add('opacity-60');
      card.classList.remove('ring-2', 'ring-primary', 'bg-surface-container');
      if (badge) badge.classList.add('hidden');
    }
  });

  renderChecklist();
}

function selectAssociate(name) {
  selectedAssociate = name;
  renderAssignTask();
}

function setPriority(level) {
  taskPriority = level;
  document.querySelectorAll('.priority-btn').forEach(btn => {
    if (btn.dataset.priority === level) {
      btn.className = 'priority-btn flex-1 py-1.5 px-3 rounded-md text-xs font-semibold bg-primary text-white shadow-sm transition-all';
    } else {
      btn.className = 'priority-btn flex-1 py-1.5 px-3 rounded-md text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-all';
    }
  });
}

function renderChecklist() {
  const container = document.getElementById('task-checklist-container');
  if (!container) return;

  container.innerHTML = checklistItems.map((item, idx) => `
    <div class="flex items-center gap-2 p-2 bg-surface rounded-lg border border-outline-variant/60">
      <span class="material-symbols-outlined text-[16px] text-on-surface-variant">check_box_outline_blank</span>
      <span class="text-sm font-medium flex-1 text-on-surface">${item}</span>
      <button type="button" onclick="removeChecklistItem(${idx})" class="text-on-surface-variant hover:text-error p-1 transition-colors">
        <span class="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  `).join('');
}

function addChecklistItem() {
  const input = document.getElementById('new-checklist-input');
  if (!input) return;
  const val = input.value.trim();
  if (val) {
    checklistItems.push(val);
    input.value = '';
    renderChecklist();
  }
}

function removeChecklistItem(idx) {
  checklistItems.splice(idx, 1);
  renderChecklist();
}

function handleAssignTaskSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const title = form.task_title.value.trim();
  const zone = form.task_zone.value;
  const due = form.task_due.value || 'Today, 5:00 PM';

  if (!title) {
    toast.error('Required Field', 'Please enter a Task Title');
    return;
  }

  let avatar = '';
  let initials = 'EM';
  const matchEmp = AppState.employees.find(e => e.name === selectedAssociate);
  if (matchEmp) {
    avatar = matchEmp.avatar;
    initials = matchEmp.initials || matchEmp.name.split(' ').map(n=>n[0]).join('');
  }

  const newTask = {
    id: Date.now(),
    associate: selectedAssociate,
    avatar,
    initials,
    zone,
    task: title,
    status: 'In Progress',
    priority: taskPriority,
    due
  };

  AppState.tasks.unshift(newTask);
  AppState.saveState();
  toast.success('Task Assigned!', `${title} assigned to ${selectedAssociate}`);

  setTimeout(() => {
    navigateTo('hr');
  }, 350);
}

function applyTaskTemplate(title, zone, priority) {
  const form = document.getElementById('assign-task-form');
  if (!form) return;
  form.task_title.value = title;
  form.task_zone.value = zone;
  setPriority(priority);
  toast.info('Template Applied', title);
}

// =========================================================================
// 7. MANAGER PORTAL & RBAC PERMISSIONS MATRIX
// =========================================================================

function renderManagement() {
  const container = document.getElementById('management-content-container');
  const gate = document.getElementById('management-security-gate');

  if (!AppState.isManager()) {
    if (container) container.classList.add('hidden');
    if (gate) gate.classList.remove('hidden');
    return;
  }

  if (container) container.classList.remove('hidden');
  if (gate) gate.classList.add('hidden');

  // Overview metrics
  const totalStaffEl = document.getElementById('mgmt-total-staff');
  if (totalStaffEl) totalStaffEl.textContent = AppState.employees.length;

  const managersCount = AppState.employees.filter(e => e.rank >= 4).length;
  const mgrCountEl = document.getElementById('mgmt-managers-count');
  if (mgrCountEl) mgrCountEl.textContent = managersCount;

  // Render Employee Provisioning & Permissions Matrix Table
  renderPermissionsMatrix();
  renderAuditLogs();
}

function renderPermissionsMatrix() {
  const tbody = document.getElementById('permissions-matrix-body');
  if (!tbody) return;

  const permsDef = [
    { key: 'view_financials', label: 'Financials' },
    { key: 'manage_inventory', label: 'Stock Ops' },
    { key: 'approve_pos', label: 'Approve POs' },
    { key: 'assign_tasks', label: 'Dispatch Duties' },
    { key: 'manage_staff', label: 'Manage Staff' },
    { key: 'override_clock', label: 'Clock Override' }
  ];

  tbody.innerHTML = AppState.employees.map(emp => {
    const isSelf = emp.id === AppState.currentUserId;
    const isSuperAdmin = emp.rank === 5;

    let avatarHtml = emp.avatar 
      ? `<img src="${emp.avatar}" class="w-9 h-9 rounded-full object-cover border border-outline-variant" alt="${emp.name}"/>`
      : `<div class="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center font-bold text-xs text-primary">${emp.initials || 'EM'}</div>`;

    return `
      <tr class="hover:bg-surface-container/50 transition-colors">
        <td>
          <div class="flex items-center gap-3">
            ${avatarHtml}
            <div>
              <div class="font-bold text-on-surface flex items-center gap-2">
                <span>${emp.name}</span>
                ${isSelf ? '<span class="text-[10px] bg-primary text-white px-1.5 py-0.2 rounded">YOU</span>' : ''}
              </div>
              <div class="font-mono text-[11px] text-on-surface-variant">${emp.id} • ${emp.department}</div>
            </div>
          </div>
        </td>
        <td>
          <select onchange="handleRankChange('${emp.id}', this.value)" ${isSuperAdmin ? 'disabled' : ''} class="text-xs font-semibold rounded-lg px-2.5 py-1 bg-surface dark:bg-surface-lowest border border-outline-variant/80 focus:ring-1 focus:ring-primary outline-none cursor-pointer">
            <option value="5" ${emp.rank === 5 ? 'selected' : ''}>Rank 5: Executive Admin</option>
            <option value="4" ${emp.rank === 4 ? 'selected' : ''}>Rank 4: Operations Manager</option>
            <option value="3" ${emp.rank === 3 ? 'selected' : ''}>Rank 3: Floor Lead</option>
            <option value="2" ${emp.rank === 2 ? 'selected' : ''}>Rank 2: Specialist</option>
            <option value="1" ${emp.rank === 1 ? 'selected' : ''}>Rank 1: Associate</option>
          </select>
        </td>
        ${permsDef.map(p => {
          const has = emp.rank === 5 || (Array.isArray(emp.permissions) && emp.permissions.includes(p.key));
          const disabled = emp.rank === 5 || isSelf;
          return `
            <td class="text-center">
              <label class="switch">
                <input type="checkbox" ${has ? 'checked' : ''} ${disabled ? 'disabled' : ''} onchange="handlePermissionToggle('${emp.id}', '${p.key}', this.checked)">
                <span class="slider"></span>
              </label>
            </td>
          `;
        }).join('')}
        <td class="text-right">
          <div class="flex items-center justify-end gap-1">
            <button onclick="switchUser('${emp.id}')" class="px-2 py-1 text-xs font-semibold bg-surface-container hover:bg-surface-highest text-primary rounded-lg transition-colors" title="Log in as this staff member">
              Impersonate
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function handleRankChange(empId, newRankStr) {
  const rank = parseInt(newRankStr, 10);
  const emp = AppState.employees.find(e => e.id === empId);
  if (!emp) return;

  const oldRank = emp.rank;
  emp.rank = rank;

  if (rank === 4) {
    emp.role = 'Operations Manager';
    if (!emp.permissions.includes('manage_staff')) emp.permissions.push('manage_staff');
    if (!emp.permissions.includes('view_financials')) emp.permissions.push('view_financials');
  } else if (rank === 3) {
    emp.role = 'Floor Supervisor';
  } else if (rank <= 2) {
    emp.role = 'Retail Associate';
    emp.permissions = emp.permissions.filter(p => p !== 'manage_staff');
  }

  // Audit Log Entry
  const audit = {
    timestamp: 'Just now',
    actor: `${AppState.currentUser.name} (Rank ${AppState.currentUser.rank})`,
    action: 'Rank Modified',
    target: emp.name,
    detail: `Adjusted clearance from Rank ${oldRank} to Rank ${rank}`
  };
  AppState.auditLogs.unshift(audit);
  AppState.saveState();

  toast.success('Rank Elevation Updated', `${emp.name} is now Rank ${rank}`);
  renderPermissionsMatrix();
  renderAuditLogs();
  updateSessionUI();
}

function handlePermissionToggle(empId, permKey, isChecked) {
  const emp = AppState.employees.find(e => e.id === empId);
  if (!emp) return;

  if (!Array.isArray(emp.permissions)) emp.permissions = [];

  if (isChecked) {
    if (!emp.permissions.includes(permKey)) emp.permissions.push(permKey);
  } else {
    emp.permissions = emp.permissions.filter(p => p !== permKey);
  }

  // Audit Log Entry
  const audit = {
    timestamp: 'Just now',
    actor: `${AppState.currentUser.name} (Rank ${AppState.currentUser.rank})`,
    action: isChecked ? 'Permission Granted' : 'Permission Revoked',
    target: emp.name,
    detail: `${isChecked ? 'Granted' : 'Removed'} "${permKey}" permission`
  };
  AppState.auditLogs.unshift(audit);
  AppState.saveState();

  toast.info('Security Policy Saved', `${emp.name}: ${permKey} = ${isChecked ? 'ON' : 'OFF'}`);
  renderAuditLogs();
}

function handleAddNewEmployee(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.emp_name.value.trim();
  const email = form.emp_email.value.trim();
  const phone = form.emp_phone.value.trim();
  const role = form.emp_role.value.trim();
  const department = form.emp_dept.value;
  const zone = form.emp_zone.value;
  const rank = parseInt(form.emp_rank.value, 10) || 1;
  const pin = form.emp_pin.value.trim() || '1234';

  if (!name || !email) {
    toast.error('Validation Error', 'Full Name and Email are mandatory');
    return;
  }

  const newId = `NEX-${Math.floor(1000 + Math.random() * 9000)}`;

  // Default permissions based on rank
  let initialPerms = [];
  if (rank >= 4) {
    initialPerms = ['view_financials', 'manage_inventory', 'approve_pos', 'assign_tasks', 'manage_staff'];
  } else if (rank === 3) {
    initialPerms = ['assign_tasks', 'manage_inventory'];
  } else if (rank === 2) {
    initialPerms = ['manage_inventory'];
  }

  const newEmployee = {
    id: newId,
    name,
    role,
    rank,
    department,
    zone,
    email,
    phone,
    pin,
    avatar: '',
    initials: name.split(' ').map(n => n[0]).join(''),
    permissions: initialPerms,
    clockedIn: false,
    clockInTime: null,
    hireDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  AppState.employees.push(newEmployee);

  // Audit entry
  AppState.auditLogs.unshift({
    timestamp: 'Just now',
    actor: `${AppState.currentUser.name} (Rank ${AppState.currentUser.rank})`,
    action: 'Employee Provisioned',
    target: name,
    detail: `Created ${newId} with Rank ${rank} in ${department}`
  });

  AppState.saveState();
  renderSwitchUserModalList();
  closeModal('modal-add-employee');
  form.reset();

  toast.success('Staff Member Provisioned!', `${name} (${newId}) added with PIN "${pin}"`);
  renderManagement();
}

function renderAuditLogs() {
  const container = document.getElementById('management-audit-logs');
  if (!container) return;

  container.innerHTML = AppState.auditLogs.slice(0, 10).map(log => `
    <div class="flex items-start justify-between p-3 rounded-xl bg-surface-container-low/40 border border-outline-variant/30 text-xs">
      <div class="flex items-start gap-2.5">
        <span class="material-symbols-outlined text-primary text-[18px] mt-0.5">verified_user</span>
        <div>
          <div class="font-bold text-on-surface">
            <span>${log.action}</span> &bull; <span class="text-on-surface-variant font-normal">Target: <strong>${log.target}</strong></span>
          </div>
          <p class="text-on-surface-variant text-[11px] mt-0.5">${log.detail}</p>
        </div>
      </div>
      <div class="text-right">
        <span class="font-mono text-[10px] text-outline">${log.timestamp}</span>
        <div class="text-[10px] text-on-surface-variant">by ${log.actor}</div>
      </div>
    </div>
  `).join('');
}

// =========================================================================
// 8. STAFF ONBOARDING & DUTY PORTAL
// =========================================================================

function renderOnboarding() {
  const user = AppState.currentUser;

  // Header personalized greeting
  const greetName = document.getElementById('onboard-user-name');
  if (greetName) greetName.textContent = user.name;

  const greetRole = document.getElementById('onboard-user-role');
  if (greetRole) greetRole.textContent = `${user.role} • ${user.department}`;

  const greetId = document.getElementById('onboard-user-id');
  if (greetId) greetId.textContent = user.id;

  // Punch Clock Status
  updatePunchClockUI();

  // User's assigned duties
  renderMyDutiesList();
}

function updatePunchClockUI() {
  const user = AppState.currentUser;
  const statusBadge = document.getElementById('punch-clock-status');
  const punchBtn = document.getElementById('punch-clock-btn');
  const lastPunchEl = document.getElementById('punch-clock-last-time');

  if (user.clockedIn) {
    if (statusBadge) {
      statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-secondary live-pulse"></span><span>ON SHIFT (CLOCKED IN)</span>`;
      statusBadge.className = 'badge-pill bg-secondary-container/40 text-secondary border border-secondary/30 text-xs';
    }
    if (punchBtn) {
      punchBtn.innerHTML = `<span class="material-symbols-outlined text-[20px]">logout</span><span>Clock Out Shift</span>`;
      punchBtn.className = 'px-6 py-2.5 bg-error text-white font-bold text-xs rounded-xl hover:bg-error/90 transition-all shadow-md active:scale-95 flex items-center gap-2';
    }
    if (lastPunchEl) lastPunchEl.textContent = `Shift started at ${user.clockInTime || '08:30 AM'}`;
  } else {
    if (statusBadge) {
      statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-outline"></span><span>OFF DUTY (CLOCKED OUT)</span>`;
      statusBadge.className = 'badge-pill bg-surface-container text-on-surface-variant border border-outline-variant text-xs';
    }
    if (punchBtn) {
      punchBtn.innerHTML = `<span class="material-symbols-outlined text-[20px]">login</span><span>Clock In Now</span>`;
      punchBtn.className = 'px-6 py-2.5 bg-secondary text-white font-bold text-xs rounded-xl hover:bg-secondary/90 transition-all shadow-md active:scale-95 flex items-center gap-2';
    }
    if (lastPunchEl) lastPunchEl.textContent = 'Not clocked in today';
  }
}

function handleStaffClockToggle() {
  const user = AppState.currentUser;
  user.clockedIn = !user.clockedIn;

  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (user.clockedIn) {
    user.clockInTime = nowTime;
    toast.success('Clock-In Verified', `Welcome, ${user.name}! Shift recorded at ${nowTime}`);
  } else {
    toast.info('Clock-Out Recorded', `Shift ended at ${nowTime}. Rest well!`);
  }

  AppState.saveState();
  updatePunchClockUI();
  updateSessionUI();
}

function renderMyDutiesList() {
  const container = document.getElementById('my-duties-container');
  if (!container) return;

  const user = AppState.currentUser;
  // Match tasks by name or initials
  const myTasks = AppState.tasks.filter(t => t.associate === user.name || t.associate.includes(user.name.split(' ')[0]));

  if (myTasks.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-on-surface-variant bg-surface-container-low/30 rounded-xl border border-dashed border-outline-variant/60">
        <span class="material-symbols-outlined text-3xl mb-1 text-secondary">task_alt</span>
        <p class="font-semibold text-sm text-on-surface">All caught up!</p>
        <p class="text-xs">No active pending duties assigned to your station right now.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = myTasks.map(t => `
    <div class="flex items-center justify-between p-3.5 bg-surface-lowest dark:bg-surface-lowest rounded-xl border border-outline-variant/60 hover:border-primary transition-all">
      <div class="flex items-center gap-3">
        <input type="checkbox" onchange="toggleMyDuty(${t.id}, this.checked)" ${t.status === 'Completed' ? 'checked' : ''} class="w-5 h-5 rounded text-secondary focus:ring-secondary cursor-pointer"/>
        <div>
          <div class="text-sm font-bold ${t.status === 'Completed' ? 'line-through text-on-surface-variant' : 'text-on-surface'}">${t.task}</div>
          <div class="text-xs text-on-surface-variant font-mono mt-0.5">Zone: ${t.zone} &bull; Deadline: ${t.due}</div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="badge-pill text-[10px] ${t.priority === 'High' ? 'bg-error-container/30 text-error' : 'bg-surface-container text-on-surface-variant'}">${t.priority}</span>
        <button onclick="toast.info('Duty Notes', 'Logged station progress to central operations')" class="p-1 text-on-surface-variant hover:text-primary">
          <span class="material-symbols-outlined text-[18px]">comment</span>
        </button>
      </div>
    </div>
  `).join('');
}

function toggleMyDuty(taskId, isChecked) {
  const task = AppState.tasks.find(t => t.id === taskId);
  if (task) {
    task.status = isChecked ? 'Completed' : 'In Progress';
    AppState.saveState();
    renderMyDutiesList();
    toast.success(isChecked ? 'Duty Completed!' : 'Duty Reopened', task.task);
  }
}

// Digital clock live ticker
function startLiveDigitalClock() {
  const clockDisplay = document.getElementById('live-digital-clock');
  if (!clockDisplay) return;

  const update = () => {
    const now = new Date();
    clockDisplay.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };
  update();
  setInterval(update, 1000);
}

// --- COMMAND PALETTE (Ctrl+K) ---
function initCommandPalette() {
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleCommandPalette();
    }
    if (e.key === 'Escape') {
      closeCommandPalette();
      closeModal('modal-add-product');
      closeModal('modal-add-transaction');
      closeModal('modal-edit-profile');
      closeModal('modal-switch-user');
      closeModal('modal-manager-login');
      closeModal('modal-add-employee');
    }
  });
}

function toggleCommandPalette() {
  const pal = document.getElementById('command-palette');
  if (pal) {
    if (pal.classList.contains('open')) {
      closeCommandPalette();
    } else {
      pal.classList.add('open');
      const input = document.getElementById('palette-input');
      if (input) {
        input.value = '';
        input.focus();
        filterPaletteActions('');
      }
    }
  }
}

function closeCommandPalette() {
  const pal = document.getElementById('command-palette');
  if (pal) pal.classList.remove('open');
}

const PALETTE_ACTIONS = [
  { label: 'Go to Operational Dashboard', icon: 'dashboard', action: () => navigateTo('dashboard') },
  { label: 'Go to Inventory Management', icon: 'inventory_2', action: () => navigateTo('inventory') },
  { label: 'Go to Sales & Finance', icon: 'payments', action: () => navigateTo('sales') },
  { label: 'Go to HR & Team Performance', icon: 'badge', action: () => navigateTo('hr') },
  { label: 'Go to Staff Onboarding & Duty Cockpit', icon: 'badge', action: () => navigateTo('onboarding') },
  { label: 'Go to Manager Portal (Staff & Permissions)', icon: 'admin_panel_settings', action: () => navigateTo('management') },
  { label: 'Switch Active User Session', icon: 'switch_account', action: () => openModal('modal-switch-user') },
  { label: 'Punch Clock (Clock In / Out)', icon: 'punch_clock', action: () => { navigateTo('onboarding'); handleStaffClockToggle(); } },
  { label: 'Add New Staff Employee', icon: 'person_add', action: () => { navigateTo('management'); openModal('modal-add-employee'); } },
  { label: 'View Elena Rodriguez Profile', icon: 'account_circle', action: () => navigateTo('profile') },
  { label: 'Assign New Task', icon: 'assignment_add', action: () => navigateTo('assign-task') },
  { label: 'Add New Product SKU', icon: 'add_box', action: () => { navigateTo('inventory'); openModal('modal-add-product'); } },
  { label: 'Record New Sale / Transaction', icon: 'receipt_long', action: () => { navigateTo('sales'); openModal('modal-add-transaction'); } },
  { label: 'Export Financial CSV Report', icon: 'download', action: () => exportSalesReport() },
  { label: 'Toggle Light / Dark Mode', icon: 'dark_mode', action: () => toggleTheme() }
];

function filterPaletteActions(query) {
  const list = document.getElementById('palette-results');
  if (!list) return;

  const q = query.toLowerCase().trim();
  const filtered = PALETTE_ACTIONS.filter(a => a.label.toLowerCase().includes(q));

  if (filtered.length === 0) {
    list.innerHTML = `<div class="p-4 text-center text-sm text-on-surface-variant">No matching commands</div>`;
    return;
  }

  list.innerHTML = filtered.map((a, i) => `
    <div onclick="executePaletteAction(${i})" class="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container cursor-pointer transition-colors text-sm font-medium text-on-surface">
      <span class="material-symbols-outlined text-primary text-[20px]">${a.icon}</span>
      <span>${a.label}</span>
    </div>
  `).join('');
}

function executePaletteAction(index) {
  closeCommandPalette();
  if (PALETTE_ACTIONS[index]) {
    PALETTE_ACTIONS[index].action();
  }
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  initCommandPalette();
  updateSessionUI();
  startLiveDigitalClock();

  // Populate Switch User list in modal
  renderSwitchUserModalList();

  // Handle URL Hash navigation
  const initialHash = window.location.hash.replace('#', '') || 'dashboard';
  navigateTo(initialHash);

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    if (hash !== AppState.currentView) {
      navigateTo(hash);
    }
  });

  // Live Foot traffic micro-pulse simulation
  setInterval(() => {
    const trafficEl = document.getElementById('dash-kpi-traffic');
    if (trafficEl) {
      const base = 8432;
      const delta = Math.floor(Math.random() * 21) - 10;
      trafficEl.textContent = (base + delta).toLocaleString();
    }
  }, 4000);
});

function renderSwitchUserModalList() {
  const list = document.getElementById('switch-user-list');
  if (!list) return;

  list.innerHTML = AppState.employees.map(emp => `
    <div onclick="switchUser('${emp.id}')" class="flex items-center justify-between p-3 rounded-xl border border-outline-variant/60 hover:border-primary hover:bg-surface-container cursor-pointer transition-all ${emp.id === AppState.currentUserId ? 'ring-2 ring-primary bg-surface-container' : ''}">
      <div class="flex items-center gap-3">
        ${emp.avatar 
          ? `<img src="${emp.avatar}" class="w-10 h-10 rounded-full object-cover border border-outline-variant" alt="${emp.name}"/>` 
          : `<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary">${emp.initials || 'EM'}</div>`}
        <div>
          <div class="font-bold text-sm text-on-surface flex items-center gap-1.5">
            <span>${emp.name}</span>
            <span class="badge-pill text-[9px] rank-badge-${emp.rank}">Rank ${emp.rank}</span>
          </div>
          <div class="text-xs text-on-surface-variant font-mono">${emp.id} &bull; ${emp.role}</div>
        </div>
      </div>
      <span class="material-symbols-outlined text-primary text-[20px]">chevron_right</span>
    </div>
  `).join('');
}
