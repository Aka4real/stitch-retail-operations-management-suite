/**
 * Nexus Retail Operations Management Suite
 * Engineered with Emil Kowalski UI polish, Stitch Design System tokens,
 * and high-end visual design architecture.
 * Features Role-Based Access Control (RBAC), Manager Provisioning Portal,
 * 200 Mock Employees Directory, Multi-Staff Duty Cockpit with Team Leads,
 * Manager Approval & Sign-Off Engine, Floor Escalations Queue, and Real-Time Notifications.
 */

// =========================================================================
// 1. 200 MOCK EMPLOYEES GENERATOR
// =========================================================================

const FIRST_NAMES = [
  "James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth",
  "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen",
  "Christopher", "Lisa", "Daniel", "Nancy", "Matthew", "Betty", "Anthony", "Sandra", "Mark", "Margaret",
  "Donald", "Ashley", "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
  "Kenneth", "Carol", "Kevin", "Amanda", "Brian", "Dorothy", "George", "Melissa", "Timothy", "Deborah",
  "Ronald", "Stephanie", "Edward", "Rebecca", "Jason", "Sharon", "Jeffrey", "Laura", "Ryan", "Cynthia",
  "Jacob", "Kathleen", "Gary", "Amy", "Nicholas", "Angela", "Eric", "Shirley", "Jonathan", "Anna",
  "Stephen", "Brenda", "Larry", "Pamela", "Justin", "Emma", "Scott", "Nicole", "Brandon", "Helen",
  "Benjamin", "Samantha", "Samuel", "Katherine", "Gregory", "Christine", "Alexander", "Debra", "Frank", "Rachel",
  "Patrick", "Carolyn", "Raymond", "Janet", "Jack", "Maria", "Dennis", "Heather", "Jerry", "Diane"
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"
];

const DEPARTMENTS = [
  { name: "Apparel & Fashion", roles: ["Fashion Sales Stylist", "Wardrobe Consultant", "Fitting Room Specialist", "Merchandising Associate"], zone: "North Wing #42" },
  { name: "Electronics & Gadgets", roles: ["Audio/Visual Tech Specialist", "Mobile Device Consultant", "Electronics Floor Lead", "Hardware Support Associate"], zone: "South Atrium" },
  { name: "Logistics & Bay Storage", roles: ["Inventory Stocker", "Receiving Dock Specialist", "Forklift & Bay Operator", "Logistics Coordinator"], zone: "Storage Bay B" },
  { name: "Customer Relations", roles: ["Concierge Representative", "Guest Services Lead", "VIP Loyalty Specialist", "Information Desk Host"], zone: "Central Mall HQ" },
  { name: "Security & Safety", roles: ["Loss Prevention Specialist", "Mall Patrol Officer", "Surveillance Operator", "Safety Compliance Officer"], zone: "West Gallery" },
  { name: "Facilities & Maintenance", roles: ["HVAC Technician", "Sanitation Team Lead", "Electrical Systems Tech", "Maintenance Associate"], zone: "Service Core A" },
  { name: "Food & Beverage", roles: ["Barista Specialist", "Concession Lead", "Kitchen Sanitation Host", "Food Court Supervisor"], zone: "Food Court Deck" },
  { name: "Cashier & Front End", roles: ["Head Cashier", "POS Float Specialist", "Checkout Associate", "Customer Cash Coordinator"], zone: "East Promenade" },
  { name: "Beauty & Cosmetics", roles: ["Fragrance Consultant", "Skincare Specialist", "Cosmetics Lead", "Beauty Advisor"], zone: "North Wing #42" },
  { name: "Home Goods & Furniture", roles: ["Interior Decor Advisor", "Furniture Stock Specialist", "Home Goods Lead", "Display Coordinator"], zone: "Upper Mezzanine" }
];

function generate200MockEmployees() {
  const list = [
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
      initials: 'MV',
      permissions: ['view_financials', 'manage_inventory', 'approve_pos', 'assign_tasks', 'manage_staff', 'override_clock', 'security_audit'],
      clockedIn: true,
      clockInTime: '07:30 AM',
      hireDate: 'Jan 15, 2019'
    },
    {
      id: 'NEX-0002',
      name: 'Victoria Stone',
      role: 'VP Retail Operations',
      rank: 5,
      department: 'Executive Operations',
      zone: 'Central Mall HQ',
      email: 'v.stone@nexusretail.com',
      pin: '1234',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      initials: 'VS',
      permissions: ['view_financials', 'manage_inventory', 'approve_pos', 'assign_tasks', 'manage_staff', 'override_clock', 'security_audit'],
      clockedIn: true,
      clockInTime: '08:00 AM',
      hireDate: 'May 10, 2020'
    },
    {
      id: 'NEX-8492',
      name: 'Elena Rodriguez',
      role: 'Senior Sales Associate & Floor Lead',
      rank: 3,
      department: 'Apparel & Fashion',
      zone: 'North Wing #42',
      email: 'e.rodriguez@nexusretail.com',
      pin: '1234',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSy1JbUL5EHLhUSq8T2TP-nxMlEbEub9YzHHTfuoYoS7r_OInuKon5Y3btmVGcZx939OM0OSKVXIiE6xlFNw_VaZ51zI6AQsAdFTyNlxkGfznYfVX---VEIieISxwt_ATd9yuxqcPQrm2X_WSq3aOD-wZfaEuY1azLRJaw90ELG92UZK-syldymQKKs95hUMo6-QdGaT21IyeehJgHFVEA8aqPls9RyWeVAvBhtYknb5wJ19k45v0X',
      initials: 'ER',
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
      department: 'Logistics & Bay Storage',
      zone: 'Storage Bay B',
      email: 'd.chen@nexusretail.com',
      pin: '1234',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy2xEe2XngudVkETnuUqbHnByXcJQqYENFFek-6XrOgnfAyfcGG_ZTB0LnCeHbZvQLOmeZX2_IkhfHSKjNqHAD_eX58tVEfD412GFJ3Qf4tB6vnB74OrF-PRG0g1CNatntoQvh7Q8hkbF6SkaoQM27tVGwz_R2szIgAqDrbDHzkNjg-CEvTiRNg0q6SI1cK__O7XHGRhSuJSAK-kQ26WIUAD88KSy49tDqXdcXD0aSJp-m3sHZsHC7',
      initials: 'DC',
      permissions: ['manage_inventory'],
      clockedIn: true,
      clockInTime: '09:00 AM',
      hireDate: 'Mar 04, 2022'
    },
    {
      id: 'NEX-7712',
      name: 'Sarah Jenkins',
      role: 'Customer Experience Lead',
      rank: 3,
      department: 'Customer Relations',
      zone: 'South Atrium',
      email: 's.jenkins@nexusretail.com',
      pin: '1234',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT-BEtrJIqSrrSuRv72V0Mz6dVWZ-YTROUXxG70gj31hVZ4O0bEd4Pc7Yslj_V0pZh4jT2ccgRlojx8Qwn9KA8Mp8XMlof1y7dFFt5YQ2ApLTgFkHwE8iMwBeMUJFTt8fvwydG7y61MZp0Hvu9WfqdsRLgy5TjhhlJu5HmjKKUr3u6QppaeK71-Li19pgna0FxbiUe497tyZ9LoGPQMlemjkL_RcwwsBrN_qOe6L1jMFb-TsvnVRXo',
      initials: 'SJ',
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
      pin: '1234',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB53ZHJNsRwuEOo42TueHQHHwFFqRQWcBbh6hmgJG-5W4Al0cszV3p-1zccIjwuiG-eZunPKo8dOgDTcQfsfqdbVEoxp5kFGXMqFmatiLrr8PFdftVXrooDhXfSNW0flXnrP-YKmvKJF11JylvLuFvr9Lm28cvpz7UtjB7ezdWmAuv5Ua3t9Dr5c_BlBJxvCYWMtoVYxduR-UseW4BijMcbo6boPW0kDfmAwGhbnhPYMxzTrqfuWy3I',
      initials: 'MT',
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
      department: 'Apparel & Fashion',
      zone: 'East Promenade',
      email: 'a.jones@nexusretail.com',
      pin: '1234',
      avatar: '',
      initials: 'AJ',
      permissions: [],
      clockedIn: true,
      clockInTime: '10:00 AM',
      hireDate: 'Sep 01, 2026'
    }
  ];

  // Operations Managers (Rank 4) - 6 managers
  const managers = [
    { name: "Liam Vance", dept: "Logistics & Bay Storage", role: "Logistics Operations Manager", zone: "Storage Bay B" },
    { name: "Sophia Bennett", dept: "Customer Relations", role: "Customer Service Operations Manager", zone: "Central Mall HQ" },
    { name: "Darius Sterling", dept: "Security & Safety", role: "Security & Facilities Manager", zone: "West Gallery" },
    { name: "Chloe Dupont", dept: "Apparel & Fashion", role: "Apparel & Styling Floor Manager", zone: "North Wing #42" },
    { name: "Mateo Alvarez", dept: "Electronics & Gadgets", role: "Consumer Tech Floor Manager", zone: "South Atrium" },
    { name: "Olivia Chang", dept: "Cashier & Front End", role: "Front End & POS Operations Manager", zone: "East Promenade" }
  ];

  managers.forEach((m, idx) => {
    const id = `NEX-${2000 + idx}`;
    list.push({
      id,
      name: m.name,
      role: m.role,
      rank: 4,
      department: m.dept,
      zone: m.zone,
      email: `${m.name.toLowerCase().replace(' ', '.')}@nexusretail.com`,
      pin: '1234',
      avatar: '',
      initials: m.name.split(' ').map(n=>n[0]).join(''),
      permissions: ['view_financials', 'manage_inventory', 'approve_pos', 'assign_tasks', 'manage_staff'],
      clockedIn: true,
      clockInTime: '07:45 AM',
      hireDate: 'Jan 10, 2021'
    });
  });

  // Generate remaining up to 200
  let idNumber = 1001;
  for (let i = 0; list.length < 200; i++) {
    const fIdx = i % FIRST_NAMES.length;
    const lIdx = (Math.floor(i / FIRST_NAMES.length) + (i % LAST_NAMES.length)) % LAST_NAMES.length;
    const fName = FIRST_NAMES[fIdx];
    const lName = LAST_NAMES[lIdx];
    const fullName = `${fName} ${lName}`;

    if (list.some(e => e.name === fullName)) continue;

    const deptObj = DEPARTMENTS[i % DEPARTMENTS.length];
    const roleTitle = deptObj.roles[i % deptObj.roles.length];

    // Rank distribution
    let rank = 1;
    const rankSeed = i % 10;
    if (rankSeed === 0 || rankSeed === 5) {
      rank = 3; // Team Lead (~20%)
    } else if (rankSeed === 1 || rankSeed === 3 || rankSeed === 7) {
      rank = 2; // Specialist (~30%)
    } else {
      rank = 1; // Associate (~50%)
    }

    const displayRole = rank === 3 ? `${deptObj.name.split('&')[0].trim()} Team Lead` : roleTitle;
    let perms = [];
    if (rank === 3) perms = ['assign_tasks', 'manage_inventory'];
    else if (rank === 2) perms = ['manage_inventory'];

    const isClockedIn = (i % 3) !== 0; // ~66% clocked in
    const clockHours = 7 + (i % 4);
    const clockMins = (i * 7) % 60;
    const clockTimeStr = `${clockHours < 10 ? '0' : ''}${clockHours}:${clockMins < 10 ? '0' : ''}${clockMins} AM`;

    list.push({
      id: `NEX-${idNumber++}`,
      name: fullName,
      role: displayRole,
      rank,
      department: deptObj.name,
      zone: deptObj.zone,
      email: `${fName.toLowerCase()}.${lName.toLowerCase()}@nexusretail.com`,
      pin: '1234',
      avatar: '',
      initials: `${fName[0]}${lName[0]}`,
      permissions: perms,
      clockedIn: isClockedIn,
      clockInTime: isClockedIn ? clockTimeStr : null,
      hireDate: `202${2 + (i % 4)}-0${1 + (i % 9)}-15`
    });
  }

  return list;
}

// =========================================================================
// 2. STATE MANAGEMENT & RBAC SYSTEM
// =========================================================================

const AppState = {
  currentView: 'dashboard',
  darkMode: localStorage.getItem('nexus_dark_mode') === 'true',

  // Employees Roster (Auto-generates 200 staff if missing or outdated)
  employees: (function() {
    try {
      const stored = JSON.parse(localStorage.getItem('nexus_employees'));
      if (Array.isArray(stored) && stored.length >= 200) {
        return stored;
      }
    } catch(e) {}
    const initial = generate200MockEmployees();
    localStorage.setItem('nexus_employees', JSON.stringify(initial));
    return initial;
  })(),

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

  // Real-Time Notifications & Shift Alerts
  notifications: (function() {
    try {
      const stored = JSON.parse(localStorage.getItem('nexus_notifications'));
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch(e) {}
    return [
      {
        id: 'notif-1',
        title: 'Elena Rodriguez Clocked In',
        message: 'Senior Sales Associate & Floor Lead clocked in at 08:45 AM (North Wing #42)',
        timestamp: '15m ago',
        read: false,
        type: 'clock_in',
        empId: 'NEX-8492'
      },
      {
        id: 'notif-2',
        title: 'Duty Completed: Pending Approval',
        message: 'Floor Lead Elena Rodriguez submitted "Inventory Audit - North Wing" for manager sign-off.',
        timestamp: '30m ago',
        read: false,
        type: 'duty_submitted',
        dutyId: 201
      },
      {
        id: 'notif-3',
        title: 'David Chen Clocked In',
        message: 'Inventory Operations Specialist clocked in at 09:00 AM (Storage Bay B)',
        timestamp: '45m ago',
        read: false,
        type: 'clock_in',
        empId: 'NEX-3401'
      }
    ];
  })(),

  // Staff Floor Escalations Queue
  escalations: (function() {
    try {
      const stored = JSON.parse(localStorage.getItem('nexus_escalations'));
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch(e) {}
    return [
      {
        id: 'ESC-101',
        senderId: 'NEX-1044',
        senderName: 'Anita Jones',
        senderRole: 'Retail Associate',
        target: 'manager',
        targetLabel: 'Operations Manager',
        category: 'Stock Shortage / Replenishment',
        urgency: 'Urgent',
        zone: 'North Wing #42',
        description: 'North Wing styling rack sizes S & M depleted during noon rush. Urgent bay replenishment needed.',
        timestamp: '18m ago',
        status: 'Open'
      },
      {
        id: 'ESC-102',
        senderId: 'NEX-3401',
        senderName: 'David Chen',
        senderRole: 'Inventory Specialist',
        target: 'team_lead',
        targetLabel: 'Shift Team Lead',
        category: 'Facilities & Cleanup',
        urgency: 'Normal',
        zone: 'Storage Bay B',
        description: 'Receiving bay roll-up door sensor sticking intermittently during pallet entry.',
        timestamp: '1h ago',
        status: 'Open'
      }
    ];
  })(),

  // Security & Permission Audit Log
  auditLogs: JSON.parse(localStorage.getItem('nexus_audit_logs')) || [
    { timestamp: 'Today, 08:30 AM', actor: 'Marcus Vance (Admin)', action: 'System Initialization', target: 'Security Cluster', detail: 'All RBAC policy enforcement active' },
    { timestamp: 'Today, 09:15 AM', actor: 'Marcus Vance (Admin)', action: 'Permission Granted', target: 'Elena Rodriguez', detail: 'Added "assign_tasks" clearance' },
    { timestamp: 'Yesterday, 04:20 PM', actor: 'Marcus Vance (Admin)', action: 'Role Provisioning', target: 'David Chen', detail: 'Elevated to Rank 2: Inventory Specialist' }
  ],

  // Inventory Store
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

  // Transactions Store
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

  // Tasks & Multi-Staff Duties with designated Team Leads and Checklists
  tasks: (function() {
    try {
      const stored = JSON.parse(localStorage.getItem('nexus_tasks'));
      if (Array.isArray(stored) && stored.length > 0 && stored[0].checklist) {
        return stored;
      }
    } catch(e) {}
    return [
      {
        id: 201,
        task: 'Inventory Audit - North Wing',
        title: 'Inventory Audit - North Wing',
        zone: 'North Wing #42',
        department: 'Apparel & Fashion',
        associate: 'Elena Rodriguez',
        teamLeadId: 'NEX-8492',
        teamLeadName: 'Elena Rodriguez',
        assignees: [
          { id: 'NEX-8492', name: 'Elena Rodriguez', role: 'Team Lead', isLead: true },
          { id: 'NEX-1044', name: 'Anita Jones', role: 'Associate', isLead: false }
        ],
        status: 'Pending Approval',
        priority: 'High',
        due: 'Today, 4:00 PM',
        createdAt: 'Today, 08:30 AM',
        checklist: [
          { id: 1, text: 'Scan all rack barcodes in Aisle 1-4', done: true },
          { id: 2, text: 'Reconcile RFID discrepancy report', done: true },
          { id: 3, text: 'Submit final discrepancy count to manager', done: true }
        ],
        reworkNotes: ''
      },
      {
        id: 202,
        task: 'Display Window Restyling',
        title: 'Display Window Restyling',
        zone: 'East Promenade',
        department: 'Apparel & Fashion',
        associate: 'Elena Rodriguez',
        teamLeadId: 'NEX-8492',
        teamLeadName: 'Elena Rodriguez',
        assignees: [
          { id: 'NEX-8492', name: 'Elena Rodriguez', role: 'Team Lead', isLead: true },
          { id: 'NEX-1044', name: 'Anita Jones', role: 'Associate', isLead: false }
        ],
        status: 'In Progress',
        priority: 'Medium',
        due: 'Today, 6:00 PM',
        createdAt: 'Today, 09:15 AM',
        checklist: [
          { id: 1, text: 'Unpack autumn designer mannequins', done: true },
          { id: 2, text: 'Calibrate track spotlight angles', done: false },
          { id: 3, text: 'Affix promotional window vinyl decals', done: false }
        ],
        reworkNotes: ''
      },
      {
        id: 203,
        task: 'Storage Bay B Inventory Sorting',
        title: 'Storage Bay B Inventory Sorting',
        zone: 'Storage Bay B',
        department: 'Logistics & Bay Storage',
        associate: 'David Chen',
        teamLeadId: 'NEX-3401',
        teamLeadName: 'David Chen',
        assignees: [
          { id: 'NEX-3401', name: 'David Chen', role: 'Team Lead', isLead: true },
          { id: 'NEX-1001', name: 'James Smith', role: 'Associate', isLead: false },
          { id: 'NEX-1002', name: 'Mary Johnson', role: 'Associate', isLead: false }
        ],
        status: 'In Progress',
        priority: 'High',
        due: 'Today, 3:30 PM',
        createdAt: 'Today, 07:45 AM',
        checklist: [
          { id: 1, text: 'Inspect inbound pallets from dock 3', done: true },
          { id: 2, text: 'Relocate bulk monitors to high rack aisle C', done: false },
          { id: 3, text: 'Scan RFID tags on 40 receiving containers', done: false }
        ],
        reworkNotes: ''
      },
      {
        id: 204,
        task: 'Customer Information Desk Lead',
        title: 'Customer Information Desk Lead',
        zone: 'South Atrium',
        department: 'Customer Relations',
        associate: 'Sarah Jenkins',
        teamLeadId: 'NEX-7712',
        teamLeadName: 'Sarah Jenkins',
        assignees: [
          { id: 'NEX-7712', name: 'Sarah Jenkins', role: 'Team Lead', isLead: true }
        ],
        status: 'In Progress',
        priority: 'Medium',
        due: 'Today, 8:00 PM',
        createdAt: 'Today, 09:00 AM',
        checklist: [
          { id: 1, text: 'Distribute mall directories and vouchers', done: true },
          { id: 2, text: 'Assist VIP patrons with wheelchair & stroller loans', done: false },
          { id: 3, text: 'Compile hourly customer inquiry log', done: false }
        ],
        reworkNotes: ''
      },
      {
        id: 205,
        task: 'Security Camera Field Verification',
        title: 'Security Camera Field Verification',
        zone: 'West Gallery',
        department: 'Security & Safety',
        associate: 'Marcus Thorne',
        teamLeadId: 'NEX-9920',
        teamLeadName: 'Marcus Thorne',
        assignees: [
          { id: 'NEX-9920', name: 'Marcus Thorne', role: 'Team Lead', isLead: true }
        ],
        status: 'In Progress',
        priority: 'Urgent',
        due: 'Today, 2:30 PM',
        createdAt: 'Today, 06:30 AM',
        checklist: [
          { id: 1, text: 'Verify optical zoom on PTZ cameras 12-18', done: true },
          { id: 2, text: 'Test emergency alarm button line at West Entrance', done: true },
          { id: 3, text: 'File digital inspection report with central command', done: false }
        ],
        reworkNotes: ''
      }
    ];
  })(),

  selectedAssociateForTask: 'Elena Rodriguez',

  saveState() {
    localStorage.setItem('nexus_inventory', JSON.stringify(this.inventory));
    localStorage.setItem('nexus_transactions', JSON.stringify(this.transactions));
    localStorage.setItem('nexus_tasks', JSON.stringify(this.tasks));
    localStorage.setItem('nexus_employees', JSON.stringify(this.employees));
    localStorage.setItem('nexus_audit_logs', JSON.stringify(this.auditLogs));
    localStorage.setItem('nexus_notifications', JSON.stringify(this.notifications));
    localStorage.setItem('nexus_escalations', JSON.stringify(this.escalations));
    localStorage.setItem('nexus_current_user_id', this.currentUserId);
  }
};

// =========================================================================
// 3. SONNER TOAST NOTIFICATIONS
// =========================================================================

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
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-white truncate">${title}</div>
        ${message ? `<div class="text-xs text-white/70 mt-0.5 leading-snug">${message}</div>` : ''}
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
    }, 4000);
  },
  success(title, message) { this.show('success', title, message); },
  error(title, message) { this.show('error', title, message); },
  info(title, message) { this.show('info', title, message); }
};

// =========================================================================
// 4. NOTIFICATION CENTER & REAL-TIME ALERTS
// =========================================================================

function toggleNotificationDropdown() {
  const dropdown = document.getElementById('header-notifications-dropdown');
  if (!dropdown) return;
  const isHidden = dropdown.classList.contains('hidden');
  if (isHidden) {
    dropdown.classList.remove('hidden');
    renderNotificationsList();
  } else {
    dropdown.classList.add('hidden');
  }
}

function renderNotificationsList() {
  const container = document.getElementById('notifications-list');
  if (!container) return;

  const notifs = AppState.notifications || [];
  if (notifs.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-on-surface-variant text-xs">
        <span class="material-symbols-outlined text-2xl mb-1 text-secondary">notifications_off</span>
        <p class="font-semibold">No active notifications</p>
        <p class="text-[11px] mt-0.5">Floor telemetry and manager dispatches will appear here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = notifs.map(n => {
    let icon = 'notifications';
    let iconColor = 'text-primary';
    if (n.type === 'clock_in') { icon = 'punch_clock'; iconColor = 'text-secondary'; }
    else if (n.type === 'duty_submitted') { icon = 'assignment_late'; iconColor = 'text-amber-500'; }
    else if (n.type === 'duty_approved') { icon = 'verified'; iconColor = 'text-secondary'; }
    else if (n.type === 'rework_requested') { icon = 'assignment_return'; iconColor = 'text-error'; }
    else if (n.type === 'escalation') { icon = 'report_problem'; iconColor = 'text-error'; }

    return `
      <div class="p-2.5 rounded-xl bg-surface dark:bg-surface-lowest border border-outline-variant/50 hover:border-primary/50 text-xs flex items-start gap-2.5 transition-colors ${!n.read ? 'border-primary/30 bg-primary/5' : ''}">
        <div class="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center shrink-0 ${iconColor}">
          <span class="material-symbols-outlined text-[16px]">${icon}</span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-1">
            <span class="font-bold text-on-surface truncate">${n.title}</span>
            <span class="font-mono text-[9px] text-outline shrink-0">${n.timestamp}</span>
          </div>
          <p class="text-[11px] text-on-surface-variant mt-0.5 leading-tight">${n.message}</p>
        </div>
        ${!n.read ? '<span class="w-2 h-2 rounded-full bg-primary shrink-0 mt-1"></span>' : ''}
      </div>
    `;
  }).join('');
}

function markAllNotificationsRead() {
  (AppState.notifications || []).forEach(n => n.read = true);
  AppState.saveState();
  updateNotificationBadge();
  renderNotificationsList();
  toast.info('Notifications Cleared', 'All alerts marked as read');
}

function updateNotificationBadge() {
  const countEl = document.getElementById('header-notification-count');
  if (!countEl) return;
  const unread = (AppState.notifications || []).filter(n => !n.read).length;
  if (unread > 0) {
    countEl.textContent = unread > 99 ? '99+' : unread;
    countEl.classList.remove('hidden');
  } else {
    countEl.classList.add('hidden');
  }
}

// Close notification dropdown when clicking outside
document.addEventListener('click', (e) => {
  const btn = document.getElementById('header-notifications-btn');
  const dropdown = document.getElementById('header-notifications-dropdown');
  if (dropdown && !dropdown.classList.contains('hidden')) {
    if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  }
});

// =========================================================================
// 5. USER SESSION & AUTHENTICATION (WITH CLOAKED MANAGER PAGE)
// =========================================================================

function updateSessionUI() {
  const user = AppState.currentUser;
  if (!user) return;

  const isMgr = AppState.isManager();

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

  // CRITICAL REQUIREMENT: "normal employee should not even see or know that there is a manager page"
  // Completely hide the manager nav link for non-managers
  const mgmtLink = document.getElementById('sidebar-nav-management');
  if (mgmtLink) {
    if (isMgr) {
      mgmtLink.style.display = '';
      mgmtLink.classList.remove('hidden');
    } else {
      mgmtLink.style.display = 'none';
      mgmtLink.classList.add('hidden');
    }
  }

  // Update Notification Badge
  updateNotificationBadge();
}

function switchUser(empId) {
  const emp = AppState.employees.find(e => e.id === empId);
  if (emp) {
    AppState.currentUserId = emp.id;
    AppState.saveState();
    updateSessionUI();
    renderSwitchUserModalList();
    closeModal('modal-switch-user');
    toast.success('Session Authenticated', `Active: ${emp.name} (Rank ${emp.rank} • ${emp.department})`);

    // If switching to normal staff (rank < 4) and was on management page, silently route to onboarding
    if (!AppState.isManager() && AppState.currentView === 'management') {
      navigateTo('onboarding');
    } else {
      navigateTo(AppState.currentView);
    }
  }
}

// Modal tab switcher for Credential Login vs 200-Staff Directory
function switchLoginModalTab(tab) {
  const btnAuth = document.getElementById('tab-btn-auth');
  const btnDir = document.getElementById('tab-btn-directory');
  const contentAuth = document.getElementById('tab-content-auth');
  const contentDir = document.getElementById('tab-content-directory');

  if (tab === 'auth') {
    if (btnAuth) btnAuth.className = 'px-4 py-2 text-xs font-bold border-b-2 border-primary text-primary transition-colors';
    if (btnDir) btnDir.className = 'px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5';
    if (contentAuth) contentAuth.classList.remove('hidden');
    if (contentDir) contentDir.classList.add('hidden');
  } else {
    if (btnDir) btnDir.className = 'px-4 py-2 text-xs font-bold border-b-2 border-primary text-primary transition-colors flex items-center gap-1.5';
    if (btnAuth) btnAuth.className = 'px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors';
    if (contentDir) contentDir.classList.remove('hidden');
    if (contentAuth) contentAuth.classList.add('hidden');
    renderSwitchUserModalList();
  }
}

// Staff Credential Login Form Handler
function handleStaffLoginSubmit(e) {
  e.preventDefault();
  const inputId = (document.getElementById('login-emp-identifier')?.value || '').trim().toLowerCase();
  const inputPin = (document.getElementById('login-emp-pin')?.value || '').trim();

  if (!inputId) {
    toast.error('Field Required', 'Please enter your Employee ID or corporate email');
    return;
  }

  const emp = AppState.employees.find(x => 
    x.id.toLowerCase() === inputId ||
    x.id.toLowerCase().replace('nex-', '') === inputId ||
    x.email.toLowerCase() === inputId ||
    x.name.toLowerCase() === inputId
  );

  if (!emp) {
    toast.error('Authentication Failed', `No employee record found for "${inputId}". Browse the 200-Staff Directory tab.`);
    return;
  }

  const validPin = emp.pin || '1234';
  if (inputPin !== validPin && inputPin !== '1234' && inputPin !== 'nexus2026') {
    toast.error('Security Rejection', 'Invalid PIN entered. Default employee PIN is "1234".');
    return;
  }

  switchUser(emp.id);
  closeModal('modal-switch-user');
}

function handleManagerLoginSubmit(e) {
  e.preventDefault();
  const inputPass = e.target.querySelector('input[type="password"]')?.value || document.getElementById('manager-login-pass')?.value || document.getElementById('manager-modal-login-pass')?.value || '';
  const pass = inputPass.trim();
  if (pass === 'nexus2026' || pass === 'admin') {
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

// =========================================================================
// 6. ROUTER & PERMISSION ENFORCEMENT
// =========================================================================

function navigateTo(viewId) {
  const validViews = ['dashboard', 'inventory', 'sales', 'hr', 'profile', 'assign-task', 'management', 'onboarding'];
  if (!validViews.includes(viewId)) viewId = 'dashboard';

  // CRITICAL REQUIREMENT: "normal employee should not even see or know that there is a manager page"
  // If non-manager attempts to route to 'management', silently redirect to 'onboarding'
  if (viewId === 'management' && !AppState.isManager()) {
    AppState.currentView = 'onboarding';
    window.location.hash = 'onboarding';
    renderNavActive('onboarding');
    renderOnboarding();
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

// =========================================================================
// 7. THEME MANAGEMENT & MODALS
// =========================================================================

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

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (modalId === 'modal-switch-user') {
      renderSwitchUserModalList();
    }
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
// 8. OPERATIONAL DASHBOARD
// =========================================================================

function renderDashboard() {
  const totalSales = AppState.transactions
    .filter(t => t.type === 'revenue')
    .reduce((sum, t) => sum + t.amount, 0);

  const salesEl = document.getElementById('dash-kpi-sales');
  if (salesEl) salesEl.textContent = `$${(totalSales + 124500).toLocaleString()}`;

  const lowStockCount = AppState.inventory.filter(i => i.status === 'Reorder Now' || i.status === 'Out of Stock').length;
  const stockAlertEl = document.getElementById('dash-kpi-stock');
  if (stockAlertEl) stockAlertEl.textContent = lowStockCount;

  const activeTasks = AppState.tasks.filter(t => t.status === 'In Progress' || t.status === 'Pending Approval').length;
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

// =========================================================================
// 9. INVENTORY & GOODS TRACKING
// =========================================================================

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

// =========================================================================
// 10. SALES & FINANCIAL TRACKING
// =========================================================================

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

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const rev = [14200, 18400, 22100, 19800, 31200, 42500, 38900];
  const exp = [6200, 8100, 7400, 9200, 11500, 14200, 12800];
  const maxVal = 50000;

  chartEl.innerHTML = `
    <div class="flex items-end justify-between gap-2 h-44 pt-4 px-2">
      ${days.map((d, i) => {
        const revH = (rev[i] / maxVal) * 100;
        const expH = (exp[i] / maxVal) * 100;
        return `
          <div class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer">
            <div class="w-full flex items-end justify-center gap-1 h-36">
              <div style="height: ${revH}%;" class="w-full max-w-[14px] bg-secondary rounded-t-sm transition-all group-hover:brightness-110" title="Rev: $${rev[i]}"></div>
              <div style="height: ${expH}%;" class="w-full max-w-[14px] bg-primary rounded-t-sm transition-all group-hover:brightness-110" title="Exp: $${exp[i]}"></div>
            </div>
            <span class="text-[10px] font-mono text-on-surface-variant">${d}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderTransactionsTable() {
  const tbody = document.getElementById('sales-transactions-body');
  if (!tbody) return;

  tbody.innerHTML = AppState.transactions.map(t => {
    const isRev = t.type === 'revenue';
    return `
      <tr class="hover:bg-surface-container transition-colors">
        <td class="font-mono text-xs text-on-surface-variant">${t.date}</td>
        <td class="font-medium text-on-surface">${t.desc}</td>
        <td>
          <span class="badge-pill ${isRev ? 'bg-secondary-container/30 text-secondary' : 'bg-primary-container/30 text-primary'}">
            ${t.category}
          </span>
        </td>
        <td class="font-mono font-bold text-sm text-right ${isRev ? 'text-secondary' : 'text-on-surface'}">
          ${isRev ? '+' : '-'}$${t.amount.toLocaleString()}
        </td>
        <td class="text-right">
          <span class="badge-pill ${t.status === 'Completed' ? 'bg-secondary-container/30 text-secondary' : 'bg-tertiary-container/30 text-on-tertiary-container'} text-[10px]">
            ${t.status}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

function handleAddTransactionSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const desc = form.trans_desc.value.trim();
  const amount = parseFloat(form.trans_amount.value) || 0;
  const category = form.trans_category.value;
  const type = form.trans_type.value;

  if (!desc || amount <= 0) {
    toast.error('Validation Error', 'Description and valid amount are required');
    return;
  }

  const newTrans = {
    id: Date.now(),
    date: 'Just now',
    desc,
    category,
    type,
    amount,
    status: 'Completed'
  };

  AppState.transactions.unshift(newTrans);
  AppState.saveState();
  closeModal('modal-add-transaction');
  form.reset();
  renderSales();
  toast.success('Transaction Logged', `${type.toUpperCase()}: $${amount.toLocaleString()} - ${desc}`);
}

function exportSalesReport() {
  const rows = [
    ['ID', 'Date', 'Description', 'Category', 'Type', 'Amount', 'Status'],
    ...AppState.transactions.map(t => [t.id, t.date, `"${t.desc}"`, t.category, t.type, t.amount, t.status])
  ];
  const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `nexus_financial_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success('Report Exported', 'CSV financial data downloaded to your browser');
}

// =========================================================================
// 11. HR & TEAM PERFORMANCE
// =========================================================================

function renderHR() {
  const tbody = document.getElementById('hr-assignments-body');
  if (!tbody) return;

  tbody.innerHTML = AppState.tasks.map(task => {
    const leadName = task.teamLeadName || task.associate;
    const assigneesCount = task.assignees?.length || 1;

    let avatarHtml = task.avatar
      ? `<img src="${task.avatar}" class="w-8 h-8 rounded-full object-cover border border-outline-variant shadow-sm" alt="${leadName}"/>`
      : `<div class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">${task.initials || 'EM'}</div>`;

    return `
      <tr class="hover:bg-surface-container transition-colors">
        <td>
          <div class="flex items-center gap-3">
            ${avatarHtml}
            <div>
              <div class="font-semibold text-on-surface flex items-center gap-1.5">
                <span>${leadName}</span>
                ${assigneesCount > 1 ? `<span class="badge-pill bg-primary/10 text-primary text-[9px] font-bold">Team of ${assigneesCount}</span>` : ''}
              </div>
              <div class="text-[11px] text-on-surface-variant font-mono">${task.due}</div>
            </div>
          </div>
        </td>
        <td class="text-xs font-medium text-on-surface-variant">${task.zone}</td>
        <td class="font-medium text-on-surface">${task.task}</td>
        <td>
          <span class="badge-pill text-xs font-semibold ${
            task.status === 'Approved' ? 'bg-secondary-container text-secondary' :
            task.status === 'Pending Approval' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold' :
            'bg-surface-container text-on-surface-variant'
          }">
            ${task.status}
          </span>
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
    toast.success('Duty Updated', `${task.task} set to "${newStatus}"`);
    renderHR();
    renderPendingApprovals();
    renderMyDutiesList();
  }
}

function removeTask(taskId) {
  const idx = AppState.tasks.findIndex(t => t.id === taskId);
  if (idx !== -1) {
    const t = AppState.tasks[idx];
    AppState.tasks.splice(idx, 1);
    AppState.saveState();
    renderHR();
    renderPendingApprovals();
    renderMyDutiesList();
    toast.info('Task Removed', `Assignment "${t.task}" removed.`);
  }
}

function openAssociateProfile(name) {
  toast.info(`Viewing ${name}`, 'Routing to associate profile');
  navigateTo('profile');
}

// =========================================================================
// 12. ASSOCIATE PROFILE (Elena Rodriguez)
// =========================================================================

function renderProfile() {
  const tasksContainer = document.getElementById('profile-tasks-list');
  if (!tasksContainer) return;

  const elenaTasks = AppState.tasks.filter(t => 
    t.associate?.includes('Elena') || 
    (t.assignees && t.assignees.some(a => a.name.includes('Elena')))
  );

  tasksContainer.innerHTML = elenaTasks.map(t => `
    <div class="flex items-center justify-between p-3 bg-surface rounded-xl border border-outline-variant/60 hover:border-primary transition-all">
      <div class="flex items-center gap-3">
        <input type="checkbox" onchange="toggleProfileTask(${t.id}, this.checked)" ${t.status === 'Approved' || t.status === 'Completed' ? 'checked' : ''} class="w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"/>
        <div>
          <div class="text-sm font-semibold ${t.status === 'Approved' || t.status === 'Completed' ? 'line-through text-on-surface-variant' : 'text-on-surface'}">${t.task}</div>
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
    task.status = isChecked ? 'Pending Approval' : 'In Progress';
    AppState.saveState();
    renderProfile();
    toast.success(isChecked ? 'Submitted for Approval' : 'Duty Reopened', task.task);
  }
}

function copyContact(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    toast.success('Copied to Clipboard', `${label}: ${text}`);
  }).catch(() => {
    toast.info('Copied', text);
  });
}

// =========================================================================
// 13. ASSIGN TASK VIEW
// =========================================================================

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
    title,
    status: 'In Progress',
    priority: taskPriority,
    due,
    teamLeadId: matchEmp ? matchEmp.id : 'NEX-8492',
    teamLeadName: selectedAssociate,
    assignees: [
      { id: matchEmp ? matchEmp.id : 'NEX-8492', name: selectedAssociate, role: matchEmp ? matchEmp.role : 'Staff', isLead: true }
    ],
    checklist: checklistItems.map((step, idx) => ({ id: idx + 1, text: step, done: false })),
    createdAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
// 14. MANAGER PORTAL & RBAC PERMISSIONS MATRIX
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

  const clockedInCount = AppState.employees.filter(e => e.clockedIn).length;
  const clockEl = document.getElementById('mgmt-clocked-in-count');
  if (clockEl) clockEl.textContent = clockedInCount;

  const pendingApprovalsCount = AppState.tasks.filter(t => t.status === 'Pending Approval').length;
  const pendingEl = document.getElementById('mgmt-pending-approvals-count');
  if (pendingEl) pendingEl.textContent = pendingApprovalsCount;

  const openEscalationsCount = AppState.escalations.filter(e => e.status === 'Open').length;
  const escEl = document.getElementById('mgmt-open-escalations-count');
  if (escEl) escEl.textContent = openEscalationsCount;

  // Render Sub-Sections
  renderPendingApprovals();
  renderShiftAttendanceFeed();
  initDutyDispatcherForm();
  renderManagerEscalations();
  renderPermissionsMatrix();
  renderAuditLogs();
}

// Pending Approvals Workflow
function renderPendingApprovals() {
  const container = document.getElementById('mgmt-pending-approvals-list');
  const countEl = document.getElementById('mgmt-pending-approvals-count');
  if (!container) return;

  const pending = AppState.tasks.filter(t => t.status === 'Pending Approval');
  if (countEl) countEl.textContent = pending.length;

  if (pending.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-on-surface-variant bg-surface-container-low/30 rounded-2xl border border-dashed border-outline-variant/60">
        <span class="material-symbols-outlined text-3xl mb-1 text-secondary">verified</span>
        <p class="font-bold text-sm text-on-surface">No Duties Awaiting Sign-Off</p>
        <p class="text-xs mt-0.5">When Shift Team Leads complete their checklists and submit duties, they will queue here for operational approval.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = pending.map(duty => {
    const assignees = duty.assignees || [{ name: duty.associate, isLead: true }];
    const leadName = duty.teamLeadName || duty.associate;
    const checklist = duty.checklist || [];
    const completedSteps = checklist.filter(c => c.done).length;
    const totalSteps = checklist.length || 1;
    const percent = Math.round((completedSteps / totalSteps) * 100);

    return `
      <div class="p-4 rounded-2xl bg-surface dark:bg-surface-lowest border-2 border-amber-500/40 shadow-sm space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div class="flex items-center gap-2">
              <span class="badge-pill bg-amber-500 text-white text-[10px] font-bold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-white alert-pulse"></span>
                <span>PENDING SIGN-OFF</span>
              </span>
              <span class="badge-pill text-[10px] ${duty.priority === 'High' || duty.priority === 'Urgent' ? 'bg-error-container/30 text-error font-bold' : 'bg-surface-container text-on-surface-variant'}">${duty.priority}</span>
              <span class="text-xs font-mono text-on-surface-variant">Zone: ${duty.zone}</span>
            </div>
            <h4 class="font-headline text-base font-bold text-on-surface mt-1">${duty.task}</h4>
          </div>
          <div class="text-left sm:text-right">
            <span class="text-[10px] text-amber-600 dark:text-amber-400 font-bold block uppercase tracking-wider">Submitted by Team Lead</span>
            <span class="text-xs font-bold text-on-surface flex items-center sm:justify-end gap-1">
              <span class="material-symbols-outlined text-amber-500 text-[14px]">stars</span>
              <span>${leadName}</span>
            </span>
          </div>
        </div>

        <!-- Team Roster Pill & Progress -->
        <div class="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-surface-container-low/50 border border-outline-variant/40 text-xs">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-on-surface-variant font-semibold">Team Members (${assignees.length}):</span>
            <div class="flex flex-wrap gap-1">
              ${assignees.map(a => `
                <span class="px-2 py-0.5 rounded-full text-[10px] ${a.isLead ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30' : 'bg-surface-container text-on-surface'}">
                  ${a.isLead ? '★ ' : ''}${a.name}
                </span>
              `).join('')}
            </div>
          </div>
          <div class="flex items-center gap-2 font-mono text-xs">
            <span class="text-on-surface-variant">Checklist:</span>
            <span class="font-bold text-secondary">${completedSteps}/${totalSteps} (${percent}%)</span>
          </div>
        </div>

        <!-- Checklist preview -->
        ${checklist.length > 0 ? `
          <div class="space-y-1 text-xs">
            ${checklist.map(c => `
              <div class="flex items-center gap-2 text-on-surface-variant">
                <span class="material-symbols-outlined text-[16px] ${c.done ? 'text-secondary' : 'text-outline'}">${c.done ? 'check_circle' : 'radio_button_unchecked'}</span>
                <span class="${c.done ? 'line-through' : ''}">${c.text}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Action Buttons: Sign Off vs Request Rework -->
        <div class="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/40">
          <button onclick="handleManagerRequestRework(${duty.id})" class="px-4 py-2 bg-surface-container hover:bg-surface-highest text-on-surface text-xs font-bold rounded-xl transition-all flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">replay</span>
            <span>Request Rework</span>
          </button>
          <button onclick="handleManagerSignOff(${duty.id})" class="px-5 py-2 bg-secondary text-white text-xs font-bold rounded-xl hover:bg-secondary/90 shadow-md active:scale-95 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px]">verified</span>
            <span>Sign Off &amp; Approve Duty</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function handleManagerSignOff(dutyId) {
  const duty = AppState.tasks.find(t => t.id === dutyId);
  if (!duty) return;

  duty.status = 'Approved';
  duty.approvedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  duty.approvedBy = AppState.currentUser.name;

  // Add Manager Notification to team
  AppState.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: 'Duty Approved by Manager',
    message: `${AppState.currentUser.name} executed sign-off on "${duty.task}". Operational clearance recorded.`,
    timestamp: 'Just now',
    read: false,
    type: 'duty_approved',
    dutyId: duty.id
  });

  // Audit entry
  AppState.auditLogs.unshift({
    timestamp: 'Just now',
    actor: `${AppState.currentUser.name} (Manager)`,
    action: 'Duty Sign-Off Executed',
    target: duty.task,
    detail: `Approved shift completion submitted by ${duty.teamLeadName || duty.associate}`
  });

  AppState.saveState();
  toast.success('Duty Signed Off!', `Approved "${duty.task}". Team notified.`);
  renderPendingApprovals();
  renderHR();
  renderOnboarding();
  updateNotificationBadge();
}

function handleManagerRequestRework(dutyId) {
  const duty = AppState.tasks.find(t => t.id === dutyId);
  if (!duty) return;

  const notes = prompt('Enter specific rework instructions for the Team Lead:', 'Please double-check discrepancy counts and verify scanner seal logs.') || 'Please review floor checklist before final sign-off.';
  duty.status = 'In Progress';
  duty.reworkNotes = notes;

  AppState.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: 'Rework Requested on Duty',
    message: `Manager requested rework on "${duty.task}": ${notes}`,
    timestamp: 'Just now',
    read: false,
    type: 'rework_requested',
    dutyId: duty.id
  });

  AppState.saveState();
  toast.info('Rework Requested', `Team Lead ${duty.teamLeadName || duty.associate} notified with revision instructions.`);
  renderPendingApprovals();
  renderHR();
  renderOnboarding();
  updateNotificationBadge();
}

// Live Shift Attendance Feed
function renderShiftAttendanceFeed() {
  const container = document.getElementById('mgmt-attendance-list');
  const clockCountEl = document.getElementById('mgmt-clocked-in-count');
  if (!container) return;

  const clockedInList = AppState.employees.filter(e => e.clockedIn);
  if (clockCountEl) clockCountEl.textContent = clockedInList.length;

  const search = (document.getElementById('mgmt-attendance-search')?.value || '').toLowerCase().trim();
  const filtered = AppState.employees.filter(e => {
    if (!search) return true;
    return e.name.toLowerCase().includes(search) || 
           e.id.toLowerCase().includes(search) || 
           e.department.toLowerCase().includes(search) ||
           e.zone.toLowerCase().includes(search);
  });

  container.innerHTML = filtered.slice(0, 36).map(emp => {
    let avatarHtml = emp.avatar
      ? `<img src="${emp.avatar}" class="w-9 h-9 rounded-full object-cover border border-outline-variant" alt="${emp.name}"/>`
      : `<div class="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center font-bold text-xs text-primary">${emp.initials || 'EM'}</div>`;

    return `
      <div class="p-3 rounded-xl bg-surface dark:bg-surface-lowest border border-outline-variant/60 flex items-center justify-between gap-3 text-xs hover:border-primary/60 transition-all">
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="relative">
            ${avatarHtml}
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${emp.clockedIn ? 'bg-secondary' : 'bg-outline'} border-2 border-surface"></span>
          </div>
          <div class="min-w-0">
            <div class="font-bold text-on-surface truncate flex items-center gap-1">
              <span class="truncate">${emp.name}</span>
              <span class="badge-pill text-[9px] rank-badge-${emp.rank}">R${emp.rank}</span>
            </div>
            <div class="text-[11px] text-on-surface-variant truncate font-mono">${emp.id} &bull; ${emp.zone}</div>
          </div>
        </div>

        <div class="text-right flex flex-col items-end gap-1 shrink-0">
          <span class="badge-pill text-[9px] ${emp.clockedIn ? 'bg-secondary-container/40 text-secondary font-bold' : 'bg-surface-container text-on-surface-variant'}">
            ${emp.clockedIn ? `IN (${emp.clockInTime || '08:00 AM'})` : 'OFF DUTY'}
          </span>
          <button onclick="quickPreFillDuty('${emp.id}')" class="text-[10px] font-semibold text-primary dark:text-primary-fixed hover:underline">
            + Assign Duty
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function quickPreFillDuty(empId) {
  const emp = AppState.employees.find(e => e.id === empId);
  if (!emp) return;

  const singleSelect = document.getElementById('dispatch-single-staff-select');
  if (singleSelect) singleSelect.value = emp.id;

  const zoneSelect = document.getElementById('dispatch-duty-zone');
  if (zoneSelect && emp.zone) zoneSelect.value = emp.zone;

  const titleInput = document.getElementById('dispatch-duty-title');
  if (titleInput) {
    titleInput.value = `${emp.department.split('&')[0].trim()} Station Duty - ${emp.name.split(' ')[0]}`;
    titleInput.focus();
  }

  document.getElementById('form-dispatch-duty')?.scrollIntoView({ behavior: 'smooth' });
  toast.info('Staff Pre-Selected', `Assigned form to ${emp.name} (${emp.zone})`);
}

// Duty Dispatcher Controller (Multi-Staff & Append Modes)
let currentDispatchMode = 'new'; // 'new' | 'append'
let currentAssignmentType = 'individual'; // 'individual' | 'group'
let selectedGroupEmpIds = [];
let dispatchSteps = [
  'Perform physical count and compare with warehouse manifest',
  'Scan item barcodes into RF handheld terminal',
  'Confirm station clearance with floor supervisor'
];

function initDutyDispatcherForm() {
  const singleSelect = document.getElementById('dispatch-single-staff-select');
  if (singleSelect && singleSelect.options.length <= 1) {
    singleSelect.innerHTML = AppState.employees.map(e => `
      <option value="${e.id}">${e.name} (${e.role.split('&')[0].trim()} • ${e.department}) [${e.clockedIn ? 'ON SHIFT' : 'Off'}]</option>
    `).join('');
  }

  const existingSelect = document.getElementById('dispatch-existing-duty-select');
  if (existingSelect) {
    existingSelect.innerHTML = AppState.tasks.map(t => `
      <option value="${t.id}">${t.task} (${t.zone}) [Lead: ${t.teamLeadName || t.associate}]</option>
    `).join('');
  }

  renderDispatchSteps();
  filterGroupPicker('');
}

function setDutyDispatchMode(mode) {
  currentDispatchMode = mode;
  const btnNew = document.getElementById('btn-mode-new-duty');
  const btnAppend = document.getElementById('btn-mode-append-duty');
  const existingContainer = document.getElementById('dispatch-existing-duty-container');

  if (mode === 'new') {
    if (btnNew) btnNew.className = 'px-3 py-1 rounded-lg bg-surface-lowest text-primary shadow-sm font-bold';
    if (btnAppend) btnAppend.className = 'px-3 py-1 rounded-lg text-on-surface-variant hover:text-on-surface';
    if (existingContainer) existingContainer.classList.add('hidden');
  } else {
    if (btnAppend) btnAppend.className = 'px-3 py-1 rounded-lg bg-surface-lowest text-primary shadow-sm font-bold';
    if (btnNew) btnNew.className = 'px-3 py-1 rounded-lg text-on-surface-variant hover:text-on-surface';
    if (existingContainer) existingContainer.classList.remove('hidden');

    const existingSelect = document.getElementById('dispatch-existing-duty-select');
    if (existingSelect) {
      existingSelect.innerHTML = AppState.tasks.map(t => `
        <option value="${t.id}">${t.task} (${t.zone}) [Lead: ${t.teamLeadName || t.associate}]</option>
      `).join('');
    }
  }
}

function toggleDutyAssignmentType(type) {
  currentAssignmentType = type;
  const singleContainer = document.getElementById('dispatch-individual-assignee-container');
  const groupContainer = document.getElementById('dispatch-group-assignee-container');

  if (type === 'individual') {
    if (singleContainer) singleContainer.classList.remove('hidden');
    if (groupContainer) groupContainer.classList.add('hidden');
  } else {
    if (singleContainer) singleContainer.classList.add('hidden');
    if (groupContainer) groupContainer.classList.remove('hidden');
    filterGroupPicker(document.getElementById('dispatch-group-search')?.value || '');
  }
}

function filterGroupPicker(query) {
  const q = (query || '').toLowerCase().trim();
  const list = document.getElementById('dispatch-group-members-list');
  if (!list) return;

  const filtered = AppState.employees.filter(e => 
    !q || e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q) || e.department.toLowerCase().includes(q)
  );

  list.innerHTML = filtered.slice(0, 48).map(emp => {
    const isChecked = selectedGroupEmpIds.includes(emp.id);
    return `
      <label class="flex items-center gap-2 p-2 rounded-lg border ${isChecked ? 'border-primary bg-primary/5' : 'border-outline-variant/40 bg-surface dark:bg-surface-lowest'} hover:border-primary cursor-pointer text-xs transition-colors">
        <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="handleGroupMemberToggle('${emp.id}', this.checked)" class="rounded text-primary focus:ring-primary"/>
        <div class="truncate">
          <div class="font-semibold text-on-surface truncate">${emp.name}</div>
          <div class="text-[10px] text-on-surface-variant truncate">${emp.id} &bull; ${emp.department.split('&')[0].trim()}</div>
        </div>
      </label>
    `;
  }).join('');
}

function handleGroupMemberToggle(empId, isChecked) {
  if (isChecked) {
    if (!selectedGroupEmpIds.includes(empId)) selectedGroupEmpIds.push(empId);
  } else {
    selectedGroupEmpIds = selectedGroupEmpIds.filter(id => id !== empId);
  }

  const badge = document.getElementById('group-selected-count-badge');
  if (badge) badge.textContent = `${selectedGroupEmpIds.length} Selected`;

  // Update designated Team Lead select dropdown
  const leadSelect = document.getElementById('dispatch-team-lead-select');
  if (leadSelect) {
    const selectedEmps = AppState.employees.filter(e => selectedGroupEmpIds.includes(e.id));
    if (selectedEmps.length === 0) {
      leadSelect.innerHTML = `<option value="">-- Choose Lead from Selected Team Members --</option>`;
    } else {
      leadSelect.innerHTML = `<option value="">-- Designate Team Lead --</option>` +
        selectedEmps.map(e => `
          <option value="${e.id}" ${e.rank >= 3 ? 'selected' : ''}>
            ${e.name} (Rank ${e.rank}: ${e.role})
          </option>
        `).join('');
    }
  }

  filterGroupPicker(document.getElementById('dispatch-group-search')?.value || '');
}

function renderDispatchSteps() {
  const container = document.getElementById('dispatch-checklist-items');
  if (!container) return;

  container.innerHTML = dispatchSteps.map((step, idx) => `
    <div class="flex items-center justify-between p-2 rounded-lg bg-surface dark:bg-surface-lowest border border-outline-variant/60 text-xs">
      <div class="flex items-center gap-2 min-w-0">
        <span class="font-mono text-outline">${idx + 1}.</span>
        <span class="text-on-surface font-medium truncate">${step}</span>
      </div>
      <button type="button" onclick="removeDispatchStep(${idx})" class="p-0.5 text-on-surface-variant hover:text-error shrink-0">
        <span class="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  `);
}

function addDispatchStep() {
  const input = document.getElementById('dispatch-new-task-step');
  if (!input) return;
  const val = input.value.trim();
  if (val) {
    dispatchSteps.push(val);
    input.value = '';
    renderDispatchSteps();
  }
}

function removeDispatchStep(idx) {
  dispatchSteps.splice(idx, 1);
  renderDispatchSteps();
}

function applyDutyTemplate(val) {
  if (!val) return;
  const [title, zone, priority] = val.split('|');
  const titleInput = document.getElementById('dispatch-duty-title');
  const zoneSelect = document.getElementById('dispatch-duty-zone');
  const prioSelect = document.getElementById('dispatch-duty-priority');

  if (titleInput) titleInput.value = title;
  if (zoneSelect) zoneSelect.value = zone;
  if (prioSelect) prioSelect.value = priority;

  toast.info('Template Applied', title);
}

function handleDispatchDutySubmit(e) {
  e.preventDefault();
  const form = e.target;

  if (currentDispatchMode === 'append') {
    const dutySelect = document.getElementById('dispatch-existing-duty-select');
    const dutyId = parseInt(dutySelect?.value, 10);
    const targetDuty = AppState.tasks.find(t => t.id === dutyId);
    if (!targetDuty) {
      toast.error('Selection Error', 'Please select an existing active duty');
      return;
    }

    if (dispatchSteps.length > 0) {
      if (!Array.isArray(targetDuty.checklist)) targetDuty.checklist = [];
      dispatchSteps.forEach(text => {
        targetDuty.checklist.push({ id: Date.now() + Math.random(), text, done: false });
      });
    }

    if (currentAssignmentType === 'group' && selectedGroupEmpIds.length > 0) {
      if (!Array.isArray(targetDuty.assignees)) targetDuty.assignees = [];
      selectedGroupEmpIds.forEach(empId => {
        const emp = AppState.employees.find(x => x.id === empId);
        if (emp && !targetDuty.assignees.some(a => a.id === emp.id)) {
          targetDuty.assignees.push({
            id: emp.id,
            name: emp.name,
            role: emp.role,
            isLead: emp.id === targetDuty.teamLeadId
          });
        }
      });
    }

    AppState.saveState();
    toast.success('Duty Updated', `Appended tasks and personnel to "${targetDuty.task}"`);
    renderHR();
    renderPendingApprovals();
    renderMyDutiesList();
    form.reset();
    return;
  }

  // New Duty Mode
  const title = document.getElementById('dispatch-duty-title').value.trim();
  const zone = document.getElementById('dispatch-duty-zone').value;
  const priority = document.getElementById('dispatch-duty-priority').value;
  const due = document.getElementById('dispatch-duty-due').value || 'Today, 5:00 PM';

  let assignees = [];
  let teamLeadId = '';
  let teamLeadName = '';

  if (currentAssignmentType === 'individual') {
    const singleStaffId = document.getElementById('dispatch-single-staff-select').value;
    const emp = AppState.employees.find(e => e.id === singleStaffId);
    if (!emp) {
      toast.error('Staff Required', 'Please select a staff member for this duty');
      return;
    }
    teamLeadId = emp.id;
    teamLeadName = emp.name;
    assignees = [{
      id: emp.id,
      name: emp.name,
      role: emp.role,
      avatar: emp.avatar,
      initials: emp.initials,
      isLead: true
    }];
  } else {
    if (selectedGroupEmpIds.length < 2) {
      toast.error('Team Size Required', 'Please select at least 2 staff members for a group assignment');
      return;
    }
    const leadSelect = document.getElementById('dispatch-team-lead-select');
    teamLeadId = leadSelect?.value;
    if (!teamLeadId) {
      toast.error('Team Lead Required', 'Please designate a Team Lead for this group assignment');
      return;
    }
    const leadEmp = AppState.employees.find(e => e.id === teamLeadId);
    teamLeadName = leadEmp ? leadEmp.name : 'Designated Lead';

    assignees = selectedGroupEmpIds.map(id => {
      const emp = AppState.employees.find(e => e.id === id);
      return {
        id: emp.id,
        name: emp.name,
        role: emp.role,
        avatar: emp.avatar,
        initials: emp.initials,
        isLead: emp.id === teamLeadId
      };
    });
  }

  const finalChecklist = dispatchSteps.length > 0
    ? dispatchSteps.map((step, i) => ({ id: Date.now() + i, text: step, done: false }))
    : [
        { id: 1, text: 'Execute scheduled station inspections', done: false },
        { id: 2, text: 'Log cycle count in terminal ledger', done: false },
        { id: 3, text: 'Confirm station handover with supervisor', done: false }
      ];

  const newDuty = {
    id: Date.now(),
    task: title,
    title,
    zone,
    priority,
    due,
    status: 'In Progress',
    teamLeadId,
    teamLeadName,
    assignees,
    checklist: finalChecklist,
    createdAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    associate: teamLeadName,
    avatar: assignees[0]?.avatar || '',
    initials: assignees[0]?.initials || 'EM'
  };

  AppState.tasks.unshift(newDuty);

  // Notify team members
  AppState.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: `New Duty Assigned: ${title}`,
    message: `Dispatched to ${assignees.map(a => a.name).join(', ')}. Lead: ${teamLeadName}`,
    timestamp: 'Just now',
    read: false,
    type: 'duty_assigned',
    dutyId: newDuty.id
  });

  AppState.saveState();
  toast.success('Duty Dispatched to Floor!', `Assigned to ${assignees.length} associates with Lead ${teamLeadName}`);

  form.reset();
  selectedGroupEmpIds = [];
  dispatchSteps = [
    'Perform physical count and compare with warehouse manifest',
    'Scan item barcodes into RF handheld terminal',
    'Confirm station clearance with floor supervisor'
  ];
  renderDispatchSteps();
  filterGroupPicker('');
  const badge = document.getElementById('group-selected-count-badge');
  if (badge) badge.textContent = '0 Selected';

  renderHR();
  renderPendingApprovals();
  renderMyDutiesList();
  updateNotificationBadge();
}

// Floor Escalations Management
function handleEscalateIssueSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const target = form.esc_target.value;
  const category = form.esc_category.value;
  const urgency = form.esc_urgency.value;
  const zone = form.esc_zone.value || AppState.currentUser.zone;
  const description = form.esc_description.value.trim();

  if (!description) {
    toast.error('Description Required', 'Please enter details regarding the floor obstacle or incident');
    return;
  }

  const targetLabel = target === 'team_lead' ? 'Shift Team Lead' : 'Operations Manager';
  const newEsc = {
    id: `ESC-${Math.floor(100 + Math.random()*900)}`,
    senderId: AppState.currentUser.id,
    senderName: AppState.currentUser.name,
    senderRole: AppState.currentUser.role,
    target,
    targetLabel,
    category,
    urgency,
    zone,
    description,
    timestamp: 'Just now',
    status: 'Open'
  };

  AppState.escalations.unshift(newEsc);

  // Alert Manager if targeted to manager
  if (target === 'manager') {
    AppState.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: `Floor Escalation (${urgency})`,
      message: `${newEsc.senderName} reported "${category}" in ${zone}: ${description.slice(0, 60)}...`,
      timestamp: 'Just now',
      read: false,
      type: 'escalation',
      escId: newEsc.id
    });
  }

  AppState.saveState();
  toast.success('Escalation Dispatched', `Incident routed directly to ${targetLabel}`);
  closeModal('modal-escalate-issue');
  form.reset();
  renderMyEscalationsList();
  renderManagerEscalations();
  updateNotificationBadge();
}

function renderMyEscalationsList() {
  const container = document.getElementById('onboard-escalations-container');
  const countEl = document.getElementById('onboard-escalations-count');
  if (!container) return;

  const user = AppState.currentUser;
  const myEscalations = AppState.escalations.filter(e => e.senderId === user.id || e.senderName === user.name);

  if (countEl) countEl.textContent = `${myEscalations.length} Active`;

  if (myEscalations.length === 0) {
    container.innerHTML = `
      <div class="p-4 text-center text-on-surface-variant bg-surface-container-low/30 rounded-xl text-xs border border-dashed border-outline-variant/60">
        No active floor escalations logged for your station.
      </div>
    `;
    return;
  }

  container.innerHTML = myEscalations.map(esc => `
    <div class="p-3 rounded-xl bg-surface dark:bg-surface-lowest border border-outline-variant/60 space-y-1.5 text-xs">
      <div class="flex items-center justify-between">
        <span class="badge-pill text-[10px] ${esc.urgency === 'Critical' ? 'bg-error text-white font-bold' : (esc.urgency === 'Urgent' ? 'bg-error-container/40 text-error font-bold' : 'bg-surface-container text-on-surface-variant')}">
          ${esc.urgency}
        </span>
        <span class="font-mono text-[10px] text-on-surface-variant">To: ${esc.targetLabel}</span>
      </div>
      <div class="font-bold text-on-surface">${esc.category}</div>
      <p class="text-[11px] text-on-surface-variant leading-tight">${esc.description}</p>
      <div class="flex items-center justify-between text-[10px] font-mono text-outline pt-1">
        <span>Zone: ${esc.zone}</span>
        <span>${esc.timestamp}</span>
      </div>
    </div>
  `).join('');
}

function renderManagerEscalations() {
  const container = document.getElementById('mgmt-escalations-list');
  const countEl = document.getElementById('mgmt-open-escalations-count');
  if (!container) return;

  const list = AppState.escalations.filter(e => e.status !== 'Resolved');
  if (countEl) countEl.textContent = list.length;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-on-surface-variant bg-surface-container-low/30 rounded-2xl border border-dashed border-outline-variant/60 text-xs">
        <span class="material-symbols-outlined text-3xl mb-1 text-secondary">check_circle</span>
        <p class="font-bold text-on-surface">Floor Clear</p>
        <p class="mt-0.5">No active staff escalations or unresolved incidents right now.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(esc => `
    <div class="p-4 rounded-2xl bg-surface dark:bg-surface-lowest border-2 ${esc.urgency === 'Critical' ? 'border-error shadow-error/10' : 'border-outline-variant/70'} space-y-2.5 shadow-sm text-xs">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="badge-pill text-[10px] font-bold ${esc.urgency === 'Critical' ? 'bg-error text-white alert-pulse' : (esc.urgency === 'Urgent' ? 'bg-error-container text-error' : 'bg-surface-container text-on-surface-variant')}">
            ${esc.urgency}
          </span>
          <span class="font-bold text-on-surface">${esc.category}</span>
          <span class="font-mono text-outline text-[11px]">&bull; Zone: ${esc.zone}</span>
        </div>
        <span class="font-mono text-[10px] text-on-surface-variant">${esc.timestamp}</span>
      </div>

      <p class="text-xs text-on-surface bg-surface-container-low/50 p-2.5 rounded-xl border border-outline-variant/40">
        "${esc.description}"
      </p>

      <div class="flex items-center justify-between pt-1 text-xs">
        <div class="text-on-surface-variant">
          Reported by: <strong class="text-on-surface">${esc.senderName}</strong> (${esc.senderRole || 'Staff'})
        </div>
        <button onclick="resolveEscalation('${esc.id}')" class="px-4 py-1.5 bg-secondary text-white font-bold text-xs rounded-xl hover:bg-secondary/90 shadow-sm active:scale-95 flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">done</span>
          <span>Acknowledge &amp; Resolve</span>
        </button>
      </div>
    </div>
  `).join('');
}

function resolveEscalation(escId) {
  const esc = AppState.escalations.find(e => e.id === escId);
  if (esc) {
    esc.status = 'Resolved';
    AppState.saveState();
    toast.success('Escalation Resolved', `Incident "${esc.category}" marked as resolved`);
    renderManagerEscalations();
    renderMyEscalationsList();
  }
}

// Permissions Matrix Controller
function renderPermissionsMatrix() {
  const tbody = document.getElementById('permissions-matrix-body');
  if (!tbody) return;

  const searchQuery = (document.getElementById('mgmt-perms-search')?.value || '').toLowerCase().trim();
  const filtered = AppState.employees.filter(emp => {
    if (!searchQuery) return true;
    return emp.name.toLowerCase().includes(searchQuery) ||
           emp.id.toLowerCase().includes(searchQuery) ||
           emp.department.toLowerCase().includes(searchQuery) ||
           emp.role.toLowerCase().includes(searchQuery);
  });

  const permsDef = [
    { key: 'view_financials', label: 'Financials' },
    { key: 'manage_inventory', label: 'Stock Ops' },
    { key: 'approve_pos', label: 'Approve POs' },
    { key: 'assign_tasks', label: 'Dispatch Duties' },
    { key: 'manage_staff', label: 'Manage Staff' },
    { key: 'override_clock', label: 'Clock Override' }
  ];

  tbody.innerHTML = filtered.slice(0, 50).map(emp => {
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
                ${isSelf ? '<span class="text-[10px] bg-primary text-white px-1.5 py-0.2 rounded font-bold">YOU</span>' : ''}
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
    pin,
    avatar: '',
    initials: name.split(' ').map(n => n[0]).join(''),
    permissions: initialPerms,
    clockedIn: false,
    clockInTime: null,
    hireDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  AppState.employees.unshift(newEmployee);

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
// 15. STAFF ONBOARDING & DUTY HUB
// =========================================================================

function renderOnboarding() {
  const user = AppState.currentUser;

  const greetName = document.getElementById('onboard-user-name');
  if (greetName) greetName.textContent = user.name;

  const greetRole = document.getElementById('onboard-user-role');
  if (greetRole) greetRole.textContent = `${user.role} • ${user.department}`;

  const greetId = document.getElementById('onboard-user-id');
  if (greetId) greetId.textContent = user.id;

  updatePunchClockUI();
  renderMyDutiesList();
  renderMyEscalationsList();
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
      punchBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">logout</span><span>Clock Out Shift</span>`;
      punchBtn.className = 'px-4 py-2 bg-error text-white font-bold text-xs rounded-xl hover:bg-error/90 transition-all shadow-sm active:scale-95 flex items-center gap-1.5';
    }
    if (lastPunchEl) lastPunchEl.textContent = `Shift started at ${user.clockInTime || '08:30 AM'}`;
  } else {
    if (statusBadge) {
      statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-outline"></span><span>OFF DUTY (CLOCKED OUT)</span>`;
      statusBadge.className = 'badge-pill bg-surface-container text-on-surface-variant border border-outline-variant text-xs';
    }
    if (punchBtn) {
      punchBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">login</span><span>Clock In Now</span>`;
      punchBtn.className = 'px-4 py-2 bg-secondary text-white font-bold text-xs rounded-xl hover:bg-secondary/90 transition-all shadow-sm active:scale-95 flex items-center gap-1.5';
    }
    if (lastPunchEl) lastPunchEl.textContent = 'Not clocked in today';
  }
}

// Normal employee clocks in -> Manager receives notification alert
function handleStaffClockToggle() {
  const user = AppState.currentUser;
  user.clockedIn = !user.clockedIn;

  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (user.clockedIn) {
    user.clockInTime = nowTime;

    // Dispatch Manager Alert for clock-in
    AppState.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: `${user.name} Clocked In`,
      message: `${user.role} clocked in for shift at ${nowTime} [Zone: ${user.zone}]`,
      timestamp: 'Just now',
      read: false,
      type: 'clock_in',
      empId: user.id
    });

    toast.success('Clock-In Verified', `Welcome, ${user.name}! Shift recorded at ${nowTime}. Operations notified.`);
  } else {
    toast.info('Clock-Out Recorded', `Shift ended at ${nowTime}. Rest well!`);
  }

  AppState.saveState();
  updatePunchClockUI();
  updateSessionUI();
  renderShiftAttendanceFeed();
}

// User Assigned Duties Cockpit with Team Leads, Members & Checklist
function renderMyDutiesList() {
  const container = document.getElementById('my-duties-container');
  if (!container) return;

  const user = AppState.currentUser;
  const myDuties = AppState.tasks.filter(t => {
    if (Array.isArray(t.assignees) && t.assignees.some(a => a.id === user.id || a.name === user.name)) {
      return true;
    }
    return t.associate === user.name || t.associate?.includes(user.name.split(' ')[0]);
  });

  if (myDuties.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-on-surface-variant bg-surface-container-low/30 rounded-2xl border border-dashed border-outline-variant/60">
        <span class="material-symbols-outlined text-4xl mb-2 text-secondary">task_alt</span>
        <p class="font-bold text-base text-on-surface">Station Ready &amp; Synchronized</p>
        <p class="text-xs max-w-sm mx-auto mt-1">No active pending duties assigned to your station right now. Check with your shift manager or team lead.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = myDuties.map(duty => {
    const assignees = duty.assignees || [{ id: user.id, name: duty.associate, isLead: true }];
    const leadId = duty.teamLeadId || assignees[0]?.id;
    const leadName = duty.teamLeadName || duty.associate;
    const isUserLead = leadId === user.id || leadName === user.name;
    const checklist = duty.checklist || [];
    const completedCount = checklist.filter(c => c.done).length;
    const totalCount = checklist.length || 1;
    const progressPercent = Math.round((completedCount / totalCount) * 100);

    let statusBadge = '';
    let actionArea = '';

    if (duty.status === 'Pending Approval') {
      statusBadge = `
        <span class="badge-pill bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 font-bold text-xs flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-amber-500 alert-pulse"></span>
          <span>Pending Manager Sign-Off</span>
        </span>
      `;
      actionArea = `
        <div class="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs flex items-center justify-between text-amber-700 dark:text-amber-300">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">hourglass_top</span>
            <span>Duty submitted to management by Team Lead. Awaiting administrative sign-off.</span>
          </div>
          <span class="font-mono text-[10px] font-bold">LOCKED FOR REVIEW</span>
        </div>
      `;
    } else if (duty.status === 'Approved' || duty.status === 'Completed') {
      statusBadge = `
        <span class="badge-pill bg-secondary-container text-secondary border border-secondary/30 font-bold text-xs flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">verified</span>
          <span>Approved by Manager</span>
        </span>
      `;
      actionArea = `
        <div class="p-3 bg-secondary-container/20 border border-secondary/30 rounded-xl text-xs flex items-center justify-between text-secondary">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Duty completed and formally approved by operations management. Excellent work!</span>
          </div>
          <span class="font-mono text-[10px] font-bold">100% COMPLETE</span>
        </div>
      `;
    } else {
      statusBadge = `
        <span class="badge-pill bg-primary/10 text-primary dark:text-primary-fixed border border-primary/20 font-bold text-xs">
          In Progress
        </span>
      `;

      if (isUserLead) {
        actionArea = `
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-outline-variant/40">
            <div class="text-xs text-on-surface-variant flex items-center gap-1.5">
              <span class="material-symbols-outlined text-amber-500 text-[18px]">star</span>
              <span class="font-semibold text-on-surface">You are Team Lead:</span>
              <span>Submit duty once checklist items are completed.</span>
            </div>
            <button onclick="handleTeamLeadSubmitDuty(${duty.id})" class="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-[18px]">verified</span>
              <span>Submit for Manager Sign-Off</span>
            </button>
          </div>
        `;
      } else {
        actionArea = `
          <div class="flex items-center justify-between pt-2 border-t border-outline-variant/40 text-xs text-on-surface-variant">
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">info</span>
              <span>Complete your assigned steps. Team Lead (<strong>${leadName}</strong>) will submit to manager.</span>
            </div>
          </div>
        `;
      }
    }

    return `
      <div class="p-4 rounded-2xl bg-surface dark:bg-surface-lowest border border-outline-variant/70 shadow-sm space-y-3.5 hover:border-primary/50 transition-all">
        <!-- Duty Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              ${statusBadge}
              <span class="badge-pill text-[10px] ${duty.priority === 'High' || duty.priority === 'Urgent' ? 'bg-error-container/30 text-error font-bold' : 'bg-surface-container text-on-surface-variant'}">${duty.priority}</span>
              <span class="font-mono text-xs text-on-surface-variant">Zone: ${duty.zone}</span>
              <span class="font-mono text-xs text-on-surface-variant">&bull; Due: ${duty.due}</span>
            </div>
            <h4 class="font-headline text-base font-bold text-on-surface mt-1">${duty.task}</h4>
          </div>

          <div class="flex items-center gap-2">
            ${isUserLead ? `
              <span class="badge-pill bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">stars</span>
                <span>You are Team Lead</span>
              </span>
            ` : `
              <div class="text-left sm:text-right">
                <span class="text-[10px] text-on-surface-variant block uppercase font-semibold">Team Lead</span>
                <span class="text-xs font-bold text-on-surface flex items-center gap-1">
                  <span class="material-symbols-outlined text-amber-500 text-[14px]">stars</span>
                  <span>${leadName}</span>
                </span>
              </div>
            `}
          </div>
        </div>

        ${duty.reworkNotes ? `
          <div class="p-3 rounded-xl bg-error/10 border border-error/30 text-xs flex items-start gap-2 text-error">
            <span class="material-symbols-outlined text-[18px] mt-0.5">error</span>
            <div>
              <span class="font-bold">Manager Rework Requested:</span>
              <p class="text-[11px] mt-0.5 text-on-surface">${duty.reworkNotes}</p>
            </div>
          </div>
        ` : ''}

        <!-- Team Members Roster Display -->
        <div class="p-2.5 rounded-xl bg-surface-container-low/50 border border-outline-variant/40 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-semibold text-on-surface-variant">Assigned Team (${assignees.length}):</span>
            <div class="flex flex-wrap gap-1.5">
              ${assignees.map(a => `
                <span class="px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 ${a.id === user.id ? 'bg-primary text-white font-bold' : (a.isLead ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold' : 'bg-surface-container text-on-surface')}">
                  ${a.isLead ? '★ ' : ''}${a.name} ${a.id === user.id ? '(You)' : ''}
                </span>
              `).join('')}
            </div>
          </div>
          <div class="flex items-center gap-2 font-mono text-xs">
            <span class="text-on-surface-variant">Completion:</span>
            <span class="font-bold text-primary">${progressPercent}%</span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full duty-progress-bar">
          <div class="duty-progress-fill ${duty.status === 'Approved' ? 'bg-secondary' : 'bg-primary'}" style="width: ${progressPercent}%;"></div>
        </div>

        <!-- Subtasks Checklist -->
        <div class="space-y-2">
          <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Station Checklist:</span>
          <div class="space-y-1.5">
            ${checklist.map((step, idx) => `
              <label class="flex items-center gap-2.5 p-2 rounded-xl bg-surface dark:bg-surface-lowest border border-outline-variant/50 hover:border-primary cursor-pointer text-xs transition-colors">
                <input type="checkbox" ${step.done ? 'checked' : ''} ${duty.status === 'Pending Approval' || duty.status === 'Approved' ? 'disabled' : ''} onchange="toggleDutyChecklistItem(${duty.id}, ${idx}, this.checked)" class="w-4 h-4 rounded text-secondary focus:ring-secondary"/>
                <span class="${step.done ? 'line-through text-on-surface-variant' : 'text-on-surface font-medium'} flex-1">${step.text}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Action / Sign-Off Area -->
        ${actionArea}
      </div>
    `;
  }).join('');
}

function toggleDutyChecklistItem(dutyId, itemIdx, isChecked) {
  const duty = AppState.tasks.find(t => t.id === dutyId);
  if (duty && duty.checklist && duty.checklist[itemIdx]) {
    duty.checklist[itemIdx].done = isChecked;
    AppState.saveState();
    renderMyDutiesList();
    renderPendingApprovals();
  }
}

// Team Lead marks duty as completed -> Status becomes Pending Approval -> Manager alerted
function handleTeamLeadSubmitDuty(dutyId) {
  const duty = AppState.tasks.find(t => t.id === dutyId);
  if (!duty) return;

  duty.status = 'Pending Approval';
  duty.submittedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  duty.reworkNotes = '';

  // Manager Alert
  AppState.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: 'Duty Completed: Pending Approval',
    message: `Team Lead ${AppState.currentUser.name} marked "${duty.task}" as completed. Requires manager sign-off.`,
    timestamp: 'Just now',
    read: false,
    type: 'duty_submitted',
    dutyId: duty.id
  });

  AppState.auditLogs.unshift({
    timestamp: 'Just now',
    actor: `${AppState.currentUser.name} (Team Lead)`,
    action: 'Duty Submitted for Sign-Off',
    target: duty.task,
    detail: 'Marked all subtasks as completed and queued for manager review'
  });

  AppState.saveState();
  toast.success('Submitted for Sign-Off!', 'Duty marked as completed. Operations Manager alerted for review.');
  renderMyDutiesList();
  renderPendingApprovals();
  updateNotificationBadge();
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

// =========================================================================
// 16. COMMAND PALETTE (Ctrl+K)
// =========================================================================

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
      closeModal('modal-escalate-issue');
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
  { label: 'Go to Staff Onboarding & Duty Station', icon: 'punch_clock', action: () => navigateTo('onboarding') },
  { label: 'Go to Manager Portal (Staff & Permissions)', icon: 'admin_panel_settings', action: () => navigateTo('management') },
  { label: 'Switch Active User Session', icon: 'switch_account', action: () => openModal('modal-switch-user') },
  { label: 'Punch Clock (Clock In / Out)', icon: 'punch_clock', action: () => { navigateTo('onboarding'); handleStaffClockToggle(); } },
  { label: 'Escalate Floor Issue (Report Hazard / Block)', icon: 'report_problem', action: () => openModal('modal-escalate-issue') },
  { label: 'Add New Staff Employee', icon: 'person_add', action: () => { navigateTo('management'); openModal('modal-add-employee'); } },
  { label: 'Assign New Duty Task', icon: 'assignment_add', action: () => navigateTo('assign-task') },
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

// =========================================================================
// 17. 200-STAFF DIRECTORY MODAL RENDERER
// =========================================================================

function renderSwitchUserModalList() {
  const list = document.getElementById('switch-user-list');
  if (!list) return;

  const searchQuery = (document.getElementById('directory-search-input')?.value || '').toLowerCase().trim();
  const deptFilter = document.getElementById('directory-dept-filter')?.value || '';

  const filtered = AppState.employees.filter(emp => {
    const matchesDept = !deptFilter || emp.department === deptFilter;
    const matchesSearch = !searchQuery || 
      emp.name.toLowerCase().includes(searchQuery) ||
      emp.id.toLowerCase().includes(searchQuery) ||
      emp.role.toLowerCase().includes(searchQuery) ||
      emp.department.toLowerCase().includes(searchQuery);
    return matchesDept && matchesSearch;
  });

  if (filtered.length === 0) {
    list.innerHTML = `<div class="p-6 text-center text-xs text-on-surface-variant">No employees found matching criteria</div>`;
    return;
  }

  list.innerHTML = filtered.map(emp => {
    const isCurrent = emp.id === AppState.currentUserId;
    let avatarHtml = emp.avatar 
      ? `<img src="${emp.avatar}" class="w-10 h-10 rounded-full object-cover border border-outline-variant" alt="${emp.name}"/>` 
      : `<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary">${emp.initials || 'EM'}</div>`;

    return `
      <div onclick="switchUser('${emp.id}')" class="flex items-center justify-between p-3 rounded-xl border border-outline-variant/60 hover:border-primary hover:bg-surface-container cursor-pointer transition-all ${isCurrent ? 'ring-2 ring-primary bg-surface-container' : ''}">
        <div class="flex items-center gap-3 min-w-0">
          <div class="relative">
            ${avatarHtml}
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${emp.clockedIn ? 'bg-secondary' : 'bg-outline'} border-2 border-surface"></span>
          </div>
          <div class="min-w-0">
            <div class="font-bold text-xs text-on-surface flex items-center gap-1.5 truncate">
              <span class="truncate">${emp.name}</span>
              <span class="badge-pill text-[9px] rank-badge-${emp.rank}">Rank ${emp.rank}</span>
              ${isCurrent ? '<span class="text-[9px] bg-primary text-white px-1.5 py-0.2 rounded font-bold">ACTIVE</span>' : ''}
            </div>
            <div class="text-[11px] text-on-surface-variant font-mono truncate">${emp.id} &bull; ${emp.role}</div>
            <div class="text-[10px] text-outline truncate">${emp.department} &bull; ${emp.zone} &bull; PIN: 1234</div>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="badge-pill text-[9px] ${emp.clockedIn ? 'bg-secondary-container/40 text-secondary' : 'bg-surface-container text-on-surface-variant'}">
            ${emp.clockedIn ? 'On Shift' : 'Off Duty'}
          </span>
          <button type="button" class="px-3 py-1 bg-surface-container hover:bg-primary hover:text-white rounded-lg text-xs font-semibold transition-colors">
            Login &rarr;
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// =========================================================================
// 18. INITIALIZATION
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  initCommandPalette();
  updateSessionUI();
  startLiveDigitalClock();

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
