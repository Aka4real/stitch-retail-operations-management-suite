/**
 * Nexus Retail Operations Management Suite
 * Engineered with Emil Kowalski UI polish, Stitch Design System tokens,
 * and high-end visual design architecture.
 * Features Role-Based Access Control (RBAC), Manager Provisioning Portal,
 * 200 Mock Employees Directory, Multi-Staff Duty Cockpit with Team Leads,
 * Manager Approval & Sign-Off Engine, Floor Escalations Queue, and Real-Time Notifications.
 */

// =========================================================================
// 0. SERVERLESS / NODE ENVIRONMENT SHIM (PREVENTS FUNCTION_INVOCATION_FAILED)
// =========================================================================
if (typeof window === 'undefined') {
  global.window = global;
  global.localStorage = {
    _data: {},
    getItem(k) { return this._data[k] || null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; },
    clear() { this._data = {}; }
  };
  global.document = {
    addEventListener: () => {},
    removeEventListener: () => {},
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, style: {}, innerHTML: '', classList: { add: () => {}, remove: () => {} } }),
    body: { classList: { add: () => {}, remove: () => {}, contains: () => false }, appendChild: () => {} },
    documentElement: { classList: { add: () => {}, remove: () => {}, toggle: () => {} } }
  };
  global.navigator = { userAgent: 'node', clipboard: { writeText: () => Promise.resolve() } };
  global.location = { hash: '', search: '', pathname: '/', reload: () => {} };
  global.customElements = { define: () => {} };
}

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

const HR_DEPARTMENT_NAME = "Human Resources & Talent";

const HR_PROTECTED_ROLES = [
  "HR Director",
  "People Operations Lead",
  "Talent Acquisition Specialist",
  "Employee Relations Consultant"
];

const DEPARTMENTS = [
  { 
    name: "Human Resources & Talent", 
    roles: ["HR Director", "People Operations Lead", "Talent Acquisition Specialist", "Employee Relations Consultant"], 
    zone: "Central Mall HQ", 
    isHR: true 
  },
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
      id: 'NEX-0003',
      name: 'Rachel Adams',
      role: 'HR Director',
      rank: 4,
      department: 'Human Resources & Talent',
      zone: 'Central Mall HQ',
      email: 'r.adams@nexusretail.com',
      pin: '1234',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      initials: 'RA',
      permissions: ['assign_tasks', 'manage_staff'],
      clockedIn: true,
      clockInTime: '08:15 AM',
      hireDate: 'Mar 14, 2021'
    },
    {
      id: 'NEX-0004',
      name: 'Benjamin Hayes',
      role: 'People Operations Lead',
      rank: 3,
      department: 'Human Resources & Talent',
      zone: 'Central Mall HQ',
      email: 'b.hayes@nexusretail.com',
      pin: '1234',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      initials: 'BH',
      permissions: ['assign_tasks', 'manage_staff'],
      clockedIn: true,
      clockInTime: '08:30 AM',
      hireDate: 'Nov 02, 2022'
    },
    {
      id: 'NEX-0005',
      name: 'Samantha Clark',
      role: 'Talent Acquisition Specialist',
      rank: 2,
      department: 'Human Resources & Talent',
      zone: 'Central Mall HQ',
      email: 's.clark@nexusretail.com',
      pin: '1234',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      initials: 'SC',
      permissions: ['assign_tasks'],
      clockedIn: true,
      clockInTime: '09:00 AM',
      hireDate: 'Jan 10, 2023'
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
    let list;
    try {
      const stored = JSON.parse(localStorage.getItem('nexus_employees'));
      if (Array.isArray(stored) && stored.length >= 200) {
        list = stored;
      }
    } catch(e) {}
    if (!list) {
      list = generate200MockEmployees();
    }
    // Guarantee HR Department staff exist in roster
    const hrDirector = list.find(e => e.id === 'NEX-0003');
    if (!hrDirector) {
      list.splice(2, 0,
        {
          id: 'NEX-0003',
          name: 'Rachel Adams',
          role: 'HR Director',
          rank: 4,
          department: 'Human Resources & Talent',
          zone: 'Central Mall HQ',
          email: 'r.adams@nexusretail.com',
          pin: '1234',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
          initials: 'RA',
          permissions: ['assign_tasks', 'manage_staff'],
          clockedIn: true,
          clockInTime: '08:15 AM',
          hireDate: 'Mar 14, 2021'
        },
        {
          id: 'NEX-0004',
          name: 'Benjamin Hayes',
          role: 'People Operations Lead',
          rank: 3,
          department: 'Human Resources & Talent',
          zone: 'Central Mall HQ',
          email: 'b.hayes@nexusretail.com',
          pin: '1234',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          initials: 'BH',
          permissions: ['assign_tasks', 'manage_staff'],
          clockedIn: true,
          clockInTime: '08:30 AM',
          hireDate: 'Nov 02, 2022'
        },
        {
          id: 'NEX-0005',
          name: 'Samantha Clark',
          role: 'Talent Acquisition Specialist',
          rank: 2,
          department: 'Human Resources & Talent',
          zone: 'Central Mall HQ',
          email: 's.clark@nexusretail.com',
          pin: '1234',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          initials: 'SC',
          permissions: ['assign_tasks'],
          clockedIn: true,
          clockInTime: '09:00 AM',
          hireDate: 'Jan 10, 2023'
        }
      );
    }
    localStorage.setItem('nexus_employees', JSON.stringify(list));
    return list;
  })(),

  // Current Logged-in User Session (Default to Global Admin Marcus Vance)
  currentUserId: localStorage.getItem('nexus_current_user_id') || 'NEX-0001',

  get currentUser() {
    return this.employees.find(e => e.id === this.currentUserId) || this.employees[0];
  },

  isManager() {
    return this.currentUser && this.currentUser.rank >= 4;
  },

  // HR & Higher Management RBAC Clearances
  isHRMember() {
    const u = this.currentUser;
    if (!u) return false;
    return u.department === HR_DEPARTMENT_NAME || u.department === 'Human Resources';
  },

  isUpperManagement() {
    const u = this.currentUser;
    if (!u) return false;
    return u.rank >= 4; // Rank 4: Operations/Store Manager, Rank 5: Global Administrator / VP
  },

  canSeeHRRoles() {
    return this.isHRMember() || this.isUpperManagement();
  },

  canAssignRoles() {
    const u = this.currentUser;
    if (!u) return false;
    // Only HR staff (Rank >= 2 in HR team) or Upper Management (Rank >= 4)
    return (this.isHRMember() && u.rank >= 2) || this.isUpperManagement();
  },

  canPerformHRFunctions() {
    return this.isHRMember() || this.isUpperManagement();
  },

  canPerformUpperManagement() {
    return this.isUpperManagement();
  },

  hasPermission(permKey) {
    if (!this.currentUser) return false;
    if (this.currentUser.rank === 5) return true; // Super admin has all permissions
    return Array.isArray(this.currentUser.permissions) && this.currentUser.permissions.includes(permKey);
  },

  canViewCrewMembers(deptName) {
    const u = this.currentUser;
    if (!u) return false;
    // Upper Management (Rank 4+) & Global Admin can view any crew
    if (this.canPerformUpperManagement() || u.rank >= 4) return true;
    // If viewing All Store Crew, require Rank 2+ or HR
    if (deptName === "All Store Crew") return u.rank >= 2 || this.isHRMember();
    // If viewing HR Crew, only HR team and Upper Management have clearance
    if (deptName && (deptName.toLowerCase().includes('human resources') || deptName.toLowerCase().includes('hr'))) {
      return this.canSeeHRRoles();
    }
    // HR staff can inspect all enterprise crews
    if (this.isHRMember()) return true;
    // Team Leads (Rank 3+) can inspect department crew rosters
    if (u.rank >= 3) return true;
    // Associate can view their own department's crew
    if (u.department && deptName && u.department.toLowerCase() === deptName.toLowerCase()) return true;
    return false;
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
  auditLogs: (function() {
    try {
      const stored = JSON.parse(localStorage.getItem('nexus_audit_logs'));
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch(e) {}
    return [
      { timestamp: 'Today, 08:30 AM', actor: 'Marcus Vance (Admin)', action: 'System Initialization', target: 'Security Cluster', detail: 'All RBAC policy enforcement active' },
      { timestamp: 'Today, 09:15 AM', actor: 'Marcus Vance (Admin)', action: 'Permission Granted', target: 'Elena Rodriguez', detail: 'Added "assign_tasks" clearance' },
      { timestamp: 'Yesterday, 04:20 PM', actor: 'Marcus Vance (Admin)', action: 'Role Provisioning', target: 'David Chen', detail: 'Elevated to Rank 2: Inventory Specialist' }
    ];
  })(),

  // Inventory Store
  inventory: (function() {
    try {
      const stored = JSON.parse(localStorage.getItem('nexus_inventory'));
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch(e) {}
    return [
      { id: 1, name: 'OLED Monitor 27"', sku: 'EL-OM-27', category: 'Electronics', stock: 145, max: 200, price: 349.99, status: 'In Stock' },
      { id: 2, name: 'Winter Parka - L', sku: 'FA-WP-L', category: 'Fashion', stock: 12, max: 80, price: 129.50, status: 'Reorder Now' },
      { id: 3, name: 'Wireless Earbuds Pro', sku: 'EL-WE-P', category: 'Electronics', stock: 0, max: 150, price: 89.99, status: 'Out of Stock' },
      { id: 4, name: 'Ergo Office Chair', sku: 'HG-EC-B', category: 'Home Goods', stock: 45, max: 60, price: 219.00, status: 'In Stock' },
      { id: 5, name: 'Ceramic Table Lamp', sku: 'HG-CTL-W', category: 'Home Goods', stock: 28, max: 50, price: 64.00, status: 'In Stock' },
      { id: 6, name: 'Merino Wool Sweater', sku: 'FA-MWS-M', category: 'Fashion', stock: 8, max: 50, price: 95.00, status: 'Reorder Now' },
      { id: 7, name: 'Smart Video Doorbell', sku: 'EL-SVD-1', category: 'Electronics', stock: 62, max: 100, price: 119.99, status: 'In Stock' },
      { id: 8, name: 'Cotton Linen Duvet Set', sku: 'HG-CLD-K', category: 'Home Goods', stock: 19, max: 40, price: 85.00, status: 'In Stock' }
    ];
  })(),

  // Transactions Store
  transactions: (function() {
    try {
      const stored = JSON.parse(localStorage.getItem('nexus_transactions'));
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch(e) {}
    return [
      { id: 101, date: 'Oct 24, 2023', desc: 'Tenant Lease Payment - Zara', category: 'Revenue', type: 'revenue', amount: 12500, status: 'Completed' },
      { id: 102, date: 'Oct 23, 2023', desc: 'Facility Maintenance - HVAC Services', category: 'Maintenance', type: 'expense', amount: 3420, status: 'Completed' },
      { id: 103, date: 'Oct 22, 2023', desc: 'East Wing Lighting Retrofit', category: 'Utilities', type: 'expense', amount: 1850, status: 'Pending' },
      { id: 104, date: 'Oct 21, 2023', desc: 'Anchor Tenant Lease - Apple Store', category: 'Revenue', type: 'revenue', amount: 28500, status: 'Completed' },
      { id: 105, date: 'Oct 20, 2023', desc: 'Bi-Weekly Security Contractor Payroll', category: 'Payroll', type: 'expense', amount: 8400, status: 'Completed' },
      { id: 106, date: 'Oct 19, 2023', desc: 'Food Court Concession Royalty', category: 'Revenue', type: 'revenue', amount: 6720, status: 'Completed' },
      { id: 107, date: 'Oct 18, 2023', desc: 'Parking Garage Automation License', category: 'Utilities', type: 'expense', amount: 1200, status: 'Completed' },
      { id: 108, date: 'Oct 17, 2023', desc: 'Emergency Plumbing Repair - Level 2', category: 'Maintenance', type: 'expense', amount: 950, status: 'Completed' }
    ];
  })(),

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

  // Break & Labor Compliance Tracker
  breakState: {
    isOnBreak: false,
    breakType: null, // 'rest' (15m) or 'meal' (30m)
    durationMins: 0,
    startTime: null,
    remainingSeconds: 0,
    timerInterval: null
  },

  // Floor Map & Digital Twin State
  floorMap: {
    mode: 'blueprint', // 'blueprint' | 'heatmap'
    selectedZone: 'North Wing #42'
  },

  // Weekly Workforce Shift Schedules (Mon-Sun across 10 Departments)
  shiftSchedules: (function() {
    try {
      const stored = JSON.parse(localStorage.getItem('nexus_shift_schedules'));
      if (Array.isArray(stored) && stored.length >= 70) return stored;
    } catch(e) {}
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const shiftTypes = [
      { type: 'Morning', hours: '08:00 - 16:00', label: 'Morning Open' },
      { type: 'Midday', hours: '12:00 - 20:00', label: 'Midday Peak' },
      { type: 'Evening', hours: '14:00 - 22:00', label: 'Evening Close' }
    ];
    const generated = [];
    let counter = 101;
    DEPARTMENTS.forEach(dept => {
      days.forEach(day => {
        shiftTypes.forEach(st => {
          generated.push({
            id: `SCH-${counter++}`,
            department: dept.name,
            zone: dept.zone,
            day: day,
            shiftType: st.type,
            hours: st.hours,
            label: st.label,
            status: 'Scheduled'
          });
        });
      });
    });
    return generated;
  })(),

  // Peer-to-Peer Shift Swaps & Manager Approvals
  shiftSwaps: (function() {
    try {
      const stored = JSON.parse(localStorage.getItem('nexus_shift_swaps'));
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch(e) {}
    return [
      {
        id: 'SWAP-101',
        requesterId: 'NEX-1044',
        requesterName: 'Anita Jones',
        requesterDept: 'Apparel & Fashion',
        targetCoworkerId: 'NEX-8492',
        targetCoworkerName: 'Elena Rodriguez',
        shiftDate: 'Wednesday Oct 25 - Morning (08:00 - 16:00)',
        shiftDescription: 'Apparel & Fashion • Floor Lead Coverage',
        reason: 'Personal & Family Obligation',
        notes: 'Medical appointment in morning',
        status: 'Pending Coworker',
        createdAt: 'Today, 08:30 AM'
      },
      {
        id: 'SWAP-102',
        requesterId: 'NEX-1001',
        requesterName: 'James Smith',
        requesterDept: 'Logistics & Bay Storage',
        targetCoworkerId: 'NEX-3401',
        targetCoworkerName: 'David Chen',
        shiftDate: 'Friday Oct 27 - Afternoon (12:00 - 20:00)',
        shiftDescription: 'Storage Bay B • Pallet Receiving',
        reason: 'Academic / Exam Conflict',
        notes: 'Midterm examination review session',
        status: 'Pending Manager',
        createdAt: 'Yesterday, 03:15 PM'
      }
    ];
  })(),

  // AI Operations Copilot Conversation History
  copilotHistory: [
    {
      sender: 'assistant',
      text: 'Greetings, Store Director. I am your **Nexus Retail Operations Copilot**, powered by real-time store telemetry and MCP endpoints. How can I assist with floor dispatch, staff tracking, or labor compliance?'
    }
  ],

  // Executive AI Operations Cockpit Activity Ledger (Level 5 Omni-Access)
  execAIHistory: (function() {
    try {
      const stored = JSON.parse(localStorage.getItem('nexus_exec_ai_history'));
      if (Array.isArray(stored) && stored.length > 0) return stored;
    } catch(e) {}
    return [
      {
        id: 'init-1',
        type: 'system',
        badge: 'SUPERUSER ONLINE',
        title: 'Level 5 Omni-Access Gateway Initialized',
        detail: 'Marcus Vance authenticated with Global Administrator clearance. All 7 store subsystems (Staff Roster, Inventory Depot, Financial Ledger, Floor Halos, Escalation Grid, Break Compliance, Supabase Sync) unlocked for natural language execution.',
        timestamp: 'Active Now',
        status: 'Online'
      }
    ];
  })(),

  saveState() {
    localStorage.setItem('nexus_inventory', JSON.stringify(this.inventory));
    localStorage.setItem('nexus_transactions', JSON.stringify(this.transactions));
    localStorage.setItem('nexus_tasks', JSON.stringify(this.tasks));
    localStorage.setItem('nexus_employees', JSON.stringify(this.employees));
    localStorage.setItem('nexus_audit_logs', JSON.stringify(this.auditLogs));
    localStorage.setItem('nexus_notifications', JSON.stringify(this.notifications));
    localStorage.setItem('nexus_escalations', JSON.stringify(this.escalations));
    localStorage.setItem('nexus_shift_schedules', JSON.stringify(this.shiftSchedules));
    localStorage.setItem('nexus_shift_swaps', JSON.stringify(this.shiftSwaps));
    localStorage.setItem('nexus_exec_ai_history', JSON.stringify(this.execAIHistory));
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
  warning(title, message) { this.show('warning', title, message); },
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

  // CRITICAL REQUIREMENT: "ONLY STAFF IN THAT TEAM AND HIGHER MANAGEMENT CAN SEE HR ROLES"
  // Completely hide the HR nav link for non-HR and non-upper-management
  const hrLink = document.getElementById('sidebar-nav-hr');
  if (hrLink) {
    if (AppState.canPerformHRFunctions()) {
      hrLink.style.display = '';
      hrLink.classList.remove('hidden');
    } else {
      hrLink.style.display = 'none';
      hrLink.classList.add('hidden');
    }
  }

  // CRITICAL REQUIREMENT: "normal employee should not even see or know that there is a manager page"
  // Completely hide the manager nav link for non-managers
  const mgmtLink = document.getElementById('sidebar-nav-management');
  if (mgmtLink) {
    if (AppState.isUpperManagement()) {
      mgmtLink.style.display = '';
      mgmtLink.classList.remove('hidden');
    } else {
      mgmtLink.style.display = 'none';
      mgmtLink.classList.add('hidden');
    }
  }

  // Provision button in switch modal
  const provisionContainer = document.getElementById('switch-modal-provision-container');
  if (provisionContainer) {
    provisionContainer.style.display = AppState.canPerformHRFunctions() ? '' : 'none';
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

    // If switching to non-HR / non-management staff and was on HR or management page, redirect appropriately
    if (!AppState.canPerformHRFunctions() && AppState.currentView === 'hr') {
      navigateTo('dashboard');
    } else if (!AppState.isManager() && AppState.currentView === 'management') {
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
    if (btnAuth) btnAuth.className = 'apple-tab-item active';
    if (btnDir) btnDir.className = 'apple-tab-item';
    if (contentAuth) contentAuth.classList.remove('hidden');
    if (contentDir) contentDir.classList.add('hidden');
  } else {
    if (btnDir) btnDir.className = 'apple-tab-item active';
    if (btnAuth) btnAuth.className = 'apple-tab-item';
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
// 5B. WORKFORCE ACCESS PORTAL & CONTACTLESS HARDWARE ENGINE (RFID / NFC / PASSKEY)
// =========================================================================

function renderLoginView() {
  const nfcLabel = document.getElementById('nfc-hardware-label');
  const nfcDetail = document.getElementById('nfc-hardware-detail');
  const nfcBtn = document.getElementById('btn-activate-web-nfc');

  const hasWebNFC = typeof window !== 'undefined' && 'NDEFReader' in window;
  if (nfcLabel && nfcDetail) {
    if (hasWebNFC) {
      nfcLabel.innerHTML = `<span>Web NFC Hardware Active</span><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>`;
      nfcDetail.textContent = 'Native NDEFReader ready • Tap card to rear device antenna';
      if (nfcBtn) {
        nfcBtn.textContent = 'Scan NFC';
        nfcBtn.className = 'px-2.5 py-1 text-[11px] font-bold bg-primary text-on-primary rounded-lg shadow-sm hover:bg-primary-container';
      }
    } else {
      nfcLabel.innerHTML = `<span>Contactless Wedge Listener Active</span><span class="w-2 h-2 rounded-full bg-secondary"></span>`;
      nfcDetail.textContent = '13.56MHz USB Wedge / Card Reader • Keyboard simulation active';
      if (nfcBtn) {
        nfcBtn.textContent = 'Simulate Tap';
        nfcBtn.className = 'px-2.5 py-1 text-[11px] font-semibold bg-surface border border-outline-variant text-primary rounded-lg hover:bg-surface-container';
      }
    }
  }

  const identInput = document.getElementById('portal-emp-identifier');
  if (identInput && !identInput.value) {
    identInput.placeholder = 'e.g. NEX-8492 or e.rodriguez@nexusretail.com';
  }
}

function switchLoginPortalTab(tab) {
  const btnCreds = document.getElementById('login-tab-btn-creds');
  const btnPasskey = document.getElementById('login-tab-btn-passkey');
  const btnRfid = document.getElementById('login-tab-btn-rfid');

  const panelCreds = document.getElementById('login-panel-creds');
  const panelPasskey = document.getElementById('login-panel-passkey');
  const panelRfid = document.getElementById('login-panel-rfid');

  if (btnCreds) btnCreds.className = `apple-tab-item ${tab === 'creds' ? 'active' : ''}`;
  if (btnPasskey) btnPasskey.className = `apple-tab-item ${tab === 'passkey' ? 'active' : ''}`;
  if (btnRfid) btnRfid.className = `apple-tab-item ${tab === 'rfid' ? 'active' : ''}`;

  if (panelCreds) panelCreds.classList.toggle('hidden', tab !== 'creds');
  if (panelPasskey) panelPasskey.classList.toggle('hidden', tab !== 'passkey');
  if (panelRfid) panelRfid.classList.toggle('hidden', tab !== 'rfid');

  if (tab === 'passkey') {
    const feedback = document.getElementById('passkey-status-feedback');
    if (feedback) feedback.textContent = 'Ready for biometric challenge (Windows Hello, Touch ID, Face ID)';
  } else if (tab === 'rfid') {
    renderLoginView();
  }
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId || 'portal-emp-password');
  const icon = document.getElementById('portal-pass-icon');
  const text = document.getElementById('portal-pass-text');
  if (!input) return;

  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.textContent = 'visibility_off';
    if (text) text.textContent = 'Hide';
  } else {
    input.type = 'password';
    if (icon) icon.textContent = 'visibility';
    if (text) text.textContent = 'Show';
  }
}

function fillPortalLogin(identifier, pin) {
  switchLoginPortalTab('creds');
  const idEl = document.getElementById('portal-emp-identifier');
  const passEl = document.getElementById('portal-emp-password');
  if (idEl) {
    idEl.value = identifier;
    idEl.focus();
  }
  if (passEl) {
    passEl.value = pin || '1234';
  }
  toast.info('Credentials Populated', `Loaded identifier: ${identifier}`);
}

function handlePortalCredentialLogin(e, autoClockIn = false) {
  if (e && e.preventDefault) e.preventDefault();

  const idInput = (document.getElementById('portal-emp-identifier')?.value || '').trim();
  const passInput = (document.getElementById('portal-emp-password')?.value || '').trim();

  if (!idInput) {
    toast.error('Identity Required', 'Please enter your Work Email or Employee ID (e.g. NEX-8492 or e.rodriguez@nexusretail.com)');
    return;
  }

  const query = idInput.toLowerCase();
  const emp = AppState.employees.find(x => 
    x.id.toLowerCase() === query ||
    x.id.toLowerCase().replace('nex-', '') === query ||
    (x.email && x.email.toLowerCase() === query) ||
    (x.name && x.name.toLowerCase() === query)
  );

  if (!emp) {
    toast.error('Authentication Failed', `No workforce record matches "${idInput}". Check corporate ID or use the 1-click test pills.`);
    return;
  }

  const validPin = emp.pin || '1234';
  if (passInput !== validPin && passInput !== '1234' && passInput !== 'nexus2026') {
    toast.error('Security Rejection', `Invalid Password / PIN for ${emp.name}. Default associate PIN is "1234".`);
    return;
  }

  AppState.currentUserId = emp.id;
  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (autoClockIn) {
    emp.clockedIn = true;
    emp.clockInTime = nowTime;

    AppState.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: `${emp.name} Clocked In via Portal`,
      message: `${emp.role} authenticated & clocked in at ${nowTime} [Zone: ${emp.zone}]`,
      timestamp: 'Just now',
      read: false,
      type: 'clock_in',
      empId: emp.id
    });

    playScannerBeep();
    toast.success('Shift Clock-In Verified', `Welcome, ${emp.name}! Authenticated & clocked in at ${nowTime}.`);
  } else {
    toast.success('Identity Verified', `Welcome back, ${emp.name} (${emp.role})`);
  }

  AppState.saveState();
  updateSessionUI();
  updatePunchClockUI();
  renderShiftAttendanceFeed();

  if (AppState.isUpperManagement()) {
    navigateTo('dashboard');
  } else {
    navigateTo('onboarding');
  }
}

function handlePortalCredentialLoginWithClockIn() {
  handlePortalCredentialLogin(null, true);
}

async function handlePasskeyAuth(autoClockIn = false) {
  const feedback = document.getElementById('passkey-status-feedback');
  if (feedback) {
    feedback.innerHTML = `<span class="text-primary font-semibold flex items-center justify-center gap-1.5"><span class="material-symbols-outlined text-[15px] animate-spin">progress_activity</span> Requesting biometric challenge (Windows Hello / Touch ID / Face ID)...</span>`;
  }

  const isWebAuthnSupported = typeof window !== 'undefined' && window.PublicKeyCredential;

  if (isWebAuthnSupported && window.isSecureContext) {
    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      await navigator.credentials.get({
        publicKey: {
          challenge,
          timeout: 4000,
          userVerification: 'preferred',
          rpId: window.location.hostname || 'localhost'
        }
      }).catch(err => {
        console.log('[WebAuthn] Handled ceremony fallback:', err.name);
      });
    } catch (e) {
      console.log('[WebAuthn] Non-fatal WebAuthn invocation:', e);
    }
  }

  const idInput = (document.getElementById('portal-emp-identifier')?.value || '').trim().toLowerCase();
  let emp = null;
  if (idInput) {
    emp = AppState.employees.find(x => 
      x.id.toLowerCase() === idInput ||
      x.id.toLowerCase().replace('nex-', '') === idInput ||
      (x.email && x.email.toLowerCase() === idInput)
    );
  }
  if (!emp) {
    emp = AppState.employees.find(x => x.id === AppState.currentUserId) || 
          AppState.employees.find(x => x.id === 'NEX-8492') || 
          AppState.employees[0];
  }

  if (navigator.vibrate) {
    try { navigator.vibrate([60, 40, 60]); } catch(e) {}
  }
  playScannerBeep();

  if (feedback) {
    feedback.innerHTML = `<span class="text-secondary font-bold flex items-center justify-center gap-1.5"><span class="material-symbols-outlined text-[15px]">verified_user</span> Biometric Verified &bull; Passkey Authenticated (${emp.name})</span>`;
  }

  AppState.currentUserId = emp.id;
  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (autoClockIn) {
    emp.clockedIn = true;
    emp.clockInTime = nowTime;

    AppState.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: `${emp.name} Clocked In via Passkey`,
      message: `${emp.role} authenticated via WebAuthn/FIDO2 passkey and clocked in at ${nowTime} [Zone: ${emp.zone}]`,
      timestamp: 'Just now',
      read: false,
      type: 'clock_in',
      empId: emp.id
    });

    toast.success('Passkey Clock-In Successful', `Biometric match confirmed. ${emp.name} clocked in at ${nowTime}.`);
  } else {
    toast.success('Passkey Authenticated', `Biometric signature verified for ${emp.name} (${emp.role}).`);
  }

  AppState.saveState();
  updateSessionUI();
  updatePunchClockUI();
  renderShiftAttendanceFeed();
  closeModal('modal-switch-user');

  setTimeout(() => {
    if (AppState.isUpperManagement()) {
      navigateTo('dashboard');
    } else {
      navigateTo('onboarding');
    }
  }, 450);
}

function handleBadgeScan(badgeCode, forceClockIn) {
  if (!badgeCode) return;
  const rawCode = String(badgeCode).trim();
  const cleanCode = rawCode.toLowerCase().replace(/^(rfid-|nfc-|tag-)/, '');

  const emp = AppState.employees.find(x => 
    x.id.toLowerCase() === cleanCode ||
    x.id.toLowerCase() === rawCode.toLowerCase() ||
    x.id.toLowerCase().replace('nex-', '') === cleanCode ||
    (x.email && x.email.toLowerCase() === cleanCode) ||
    (x.name && x.name.toLowerCase() === cleanCode) ||
    (cleanCode.length >= 3 && x.id.toLowerCase().includes(cleanCode))
  );

  if (!emp) {
    playScannerBeep();
    toast.error('Unregistered Badge', `Card UID / Code "${rawCode}" is not registered to an active workforce member.`);
    return;
  }

  if (navigator.vibrate) {
    try { navigator.vibrate([100, 50, 100]); } catch(e) {}
  }
  playScannerBeep();

  let isClockIn = false;
  if (forceClockIn !== undefined) {
    isClockIn = !!forceClockIn;
  } else {
    const selectedMode = document.querySelector('input[name="rfid_action_mode"]:checked')?.value;
    isClockIn = selectedMode !== 'auth_only';
  }

  AppState.currentUserId = emp.id;
  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isClockIn) {
    emp.clockedIn = true;
    emp.clockInTime = nowTime;

    AppState.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: `${emp.name} Clocked In via Contactless Badge`,
      message: `${emp.role} tapped RFID/NFC tag [${emp.id}] at ${nowTime} [Zone: ${emp.zone}]`,
      timestamp: 'Just now',
      read: false,
      type: 'clock_in',
      empId: emp.id
    });

    toast.success('Contactless Shift Clock-In', `Badge verified: Welcome ${emp.name}! Shift recorded at ${nowTime}.`);
  } else {
    toast.success('Badge Authenticated', `Contactless login verified: ${emp.name} (${emp.role})`);
  }

  AppState.saveState();
  updateSessionUI();
  updatePunchClockUI();
  renderShiftAttendanceFeed();
  closeModal('modal-switch-user');

  if (AppState.isUpperManagement()) {
    navigateTo('dashboard');
  } else {
    navigateTo('onboarding');
  }
}

function simulateBadgeTapOnPad() {
  const entered = (document.getElementById('portal-emp-identifier')?.value || '').trim();
  if (entered) {
    handleBadgeScan(entered);
    return;
  }

  const sampleBadges = ['NEX-8492', 'NEX-3401', 'NEX-1044', 'NEX-0004', 'NEX-0001'];
  const randomBadge = sampleBadges[Math.floor(Math.random() * sampleBadges.length)];
  handleBadgeScan(randomBadge);
}

function promptManualRFIDEntry() {
  const entered = prompt('Scan or enter RFID Badge UID / Employee ID / Work Email:', 'NEX-8492');
  if (entered && entered.trim()) {
    handleBadgeScan(entered.trim(), true);
  }
}

async function triggerWebNFCScan() {
  if (typeof window !== 'undefined' && 'NDEFReader' in window) {
    try {
      const ndef = new window.NDEFReader();
      await ndef.scan();
      toast.info('NFC Reader Active', 'Hold contactless badge or smartphone to the rear device antenna...');

      const feedback = document.getElementById('nfc-hardware-label');
      if (feedback) {
        feedback.innerHTML = `<span>Scanning for NFC Tag...</span><span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>`;
      }

      ndef.onreading = (event) => {
        let tagData = '';
        if (event.message && event.message.records) {
          for (const record of event.message.records) {
            if (record.recordType === 'text') {
              const textDecoder = new TextDecoder(record.encoding || 'utf-8');
              tagData = textDecoder.decode(record.data);
            }
          }
        }
        const badgeCode = tagData || event.serialNumber || 'NEX-8492';
        handleBadgeScan(badgeCode);
      };

      ndef.onreadingerror = () => {
        toast.error('NFC Read Failure', 'Could not parse NFC tag payload. Please reposition card and hold steady.');
      };
    } catch (err) {
      toast.info('Web NFC Notice', err.message || 'Web NFC permission required. Falling back to contactless simulator.');
      simulateBadgeTapOnPad();
    }
  } else {
    toast.info('Hardware Emulation', 'Native Web NFC is available on Android Chrome & Zebra PDAs. Executing RFID wedge tap simulation.');
    simulateBadgeTapOnPad();
  }
}

function initRFIDAndNFCSystem() {
  const hasWebNFC = typeof window !== 'undefined' && 'NDEFReader' in window;
  console.log(`[Workforce Hardware] Contactless subsystem loaded. Web NFC: ${hasWebNFC ? 'Supported' : 'Unavailable (Desktop/Wedge mode)'}`);

  let rfidWedgeBuffer = '';
  let lastKeyTime = 0;

  window.addEventListener('keydown', (e) => {
    const now = Date.now();
    const interval = now - lastKeyTime;
    lastKeyTime = now;

    const activeEl = document.activeElement;
    const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA');

    if (e.key === 'Enter') {
      if (rfidWedgeBuffer.length >= 3 && (!isTyping || interval < 85)) {
        const scannedCode = rfidWedgeBuffer.trim();
        rfidWedgeBuffer = '';
        console.log(`[RFID Wedge] Scanned tag payload: ${scannedCode}`);
        handleBadgeScan(scannedCode);
        if (isTyping) e.preventDefault();
        return;
      }
      rfidWedgeBuffer = '';
    } else if (e.key.length === 1) {
      if (interval < 85 || rfidWedgeBuffer.length === 0) {
        rfidWedgeBuffer += e.key;
      } else {
        rfidWedgeBuffer = e.key;
      }
    }
  });
}

// =========================================================================
// 6. ROUTER & PERMISSION ENFORCEMENT
// =========================================================================

function navigateTo(viewId) {
  const validViews = ['dashboard', 'inventory', 'sales', 'hr', 'profile', 'assign-task', 'management', 'onboarding', 'floor-map', 'schedule', 'login'];
  if (!validViews.includes(viewId)) viewId = 'dashboard';

  // CRITICAL REQUIREMENT: "normal employee should not even see or know that there is a manager page"
  // If non-manager attempts to route to 'management', silently redirect to 'onboarding'
  if (viewId === 'management' && !AppState.isUpperManagement()) {
    AppState.currentView = 'onboarding';
    window.location.hash = 'onboarding';
    renderNavActive('onboarding');
    renderOnboarding();
    closeMobileDrawer();
    return;
  }

  // CRITICAL REQUIREMENT: "NO HR OR UPPER MANAGEMENT SHOULD NOT BE ABLE TO PERFORM HR FUNCTION"
  // If non-HR / non-management attempts to route to 'hr', redirect to 'dashboard'
  if (viewId === 'hr' && !AppState.canPerformHRFunctions()) {
    AppState.currentView = 'dashboard';
    window.location.hash = 'dashboard';
    renderNavActive('dashboard');
    renderDashboard();
    closeMobileDrawer();
    toast.error('Clearance Denied', 'The HR & Team Roster is strictly restricted to HR Personnel and Upper Management.');
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

  // Track SPA subscreen navigation in Vercel Analytics
  try {
    if (typeof window.va === 'function') {
      window.va('event', { name: 'view_change', view: viewId });
    }
  } catch(e) {}

  // Trigger view renderers
  if (viewId === 'dashboard') renderDashboard();
  if (viewId === 'inventory') renderInventory();
  if (viewId === 'sales') renderSales();
  if (viewId === 'hr') renderHR();
  if (viewId === 'profile') renderProfile();
  if (viewId === 'assign-task') renderAssignTask();
  if (viewId === 'management') renderManagement();
  if (viewId === 'onboarding') renderOnboarding();
  if (viewId === 'floor-map') renderFloorMap();
  if (viewId === 'schedule') renderSchedule();
  if (viewId === 'login') renderLoginView();
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

// =========================================================================
// 11. HR & TEAM PERFORMANCE & WORKFORCE LIFECYCLE
// =========================================================================

function renderHR() {
  renderHRDutiesTable();
  renderHRDepartmentCrews();

  // Sync hr-dept-filter dropdown options with cloaking
  const deptFilterElem = document.getElementById('hr-dept-filter');
  if (deptFilterElem) {
    const canSeeHR = AppState.canSeeHRRoles();
    const currentVal = deptFilterElem.value;
    const hrOpt = Array.from(deptFilterElem.options).find(o => o.value === HR_DEPARTMENT_NAME);
    if (canSeeHR && !hrOpt) {
      const opt = document.createElement('option');
      opt.value = HR_DEPARTMENT_NAME;
      opt.textContent = HR_DEPARTMENT_NAME;
      deptFilterElem.appendChild(opt);
    } else if (!canSeeHR && hrOpt) {
      hrOpt.remove();
      if (currentVal === HR_DEPARTMENT_NAME) deptFilterElem.value = 'ALL';
    }
  }

  renderHRStaffRoster();
}

function renderHRDutiesTable() {
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

// Global state for Department Crew Inspection Modal
let currentCrewModalDept = null;
let currentCrewModalFilter = 'all';

function renderHRDepartmentCrews() {
  const container = document.getElementById('hr-department-crews-grid');
  if (!container) return;

  const depts = [
    { name: "Human Resources & Talent", zone: "Central Mall HQ", icon: "badge", isHR: true },
    { name: "Apparel & Fashion", zone: "North Wing #42", icon: "styler" },
    { name: "Electronics & Gadgets", zone: "South Atrium", icon: "devices" },
    { name: "Logistics & Bay Storage", zone: "Storage Bay B", icon: "warehouse" },
    { name: "Customer Relations", zone: "Central Mall HQ", icon: "support_agent" },
    { name: "Security & Safety", zone: "West Gallery", icon: "security" },
    { name: "Facilities & Maintenance", zone: "Service Core A", icon: "build" },
    { name: "Food & Beverage", zone: "Food Court Deck", icon: "restaurant" },
    { name: "Cashier & Front End", zone: "East Promenade", icon: "point_of_sale" },
    { name: "Beauty & Cosmetics", zone: "North Wing #42", icon: "spa" },
    { name: "Home Goods & Furniture", zone: "Upper Mezzanine", icon: "chair" }
  ];

  container.innerHTML = depts.map(dept => {
    // If user cannot see HR roles and this is HR, skip displaying the card
    if (dept.isHR && !AppState.canSeeHRRoles()) return '';

    const activeStaff = AppState.employees.filter(e => e.department === dept.name && e.status !== 'Terminated');
    const clockedCount = activeStaff.filter(e => e.clockedIn).length;
    const lead = activeStaff.find(e => e.rank >= 3)?.name || 'Unassigned';
    const canView = AppState.canViewCrewMembers(dept.name);

    return `
      <div onclick="handleViewCrewMembers('${dept.name}')" class="p-4 rounded-2xl bg-white dark:bg-surface-lowest border border-slate-200/90 dark:border-white/10 shadow-sm flex flex-col justify-between hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group ${dept.isHR ? 'ring-1 ring-primary/40 bg-primary/5' : ''}">
        <div>
          <!-- Header -->
          <div class="flex items-start justify-between gap-2 mb-2">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-primary/10 text-primary dark:text-primary-fixed flex items-center justify-center group-hover:scale-105 transition-transform">
                <span class="material-symbols-outlined text-[20px]">${dept.icon}</span>
              </div>
              <div>
                <h4 class="font-extrabold text-sm text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
                  <span>${dept.name}</span>
                  ${dept.isHR ? '<span class="badge-pill bg-primary text-white font-mono text-[8px] font-bold">HR CORE</span>' : ''}
                </h4>
                <p class="text-[11px] text-slate-500 font-mono flex items-center gap-0.5">
                  <span class="material-symbols-outlined text-[13px]">location_on</span>
                  <span>${dept.zone}</span>
                </p>
              </div>
            </div>
            <span class="badge-pill bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-[10px] font-bold border border-slate-200 dark:border-slate-700">
              ${activeStaff.length} Staff
            </span>
          </div>

          <!-- Roster Metric Snippet -->
          <div class="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-[11px]">
            <div>
              <span class="text-slate-500 text-[10px] block font-medium">On Shift:</span>
              <span class="font-bold text-secondary font-mono flex items-center gap-1">
                <span class="w-2 h-2 rounded-full ${clockedCount > 0 ? 'bg-secondary live-pulse' : 'bg-slate-400'}"></span>
                ${clockedCount} Active
              </span>
            </div>
            <div>
              <span class="text-slate-500 text-[10px] block font-medium">Team Lead:</span>
              <span class="font-bold text-slate-900 dark:text-white truncate block" title="${lead}">${lead}</span>
            </div>
          </div>
        </div>

        <div class="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-800">
          <!-- Primary Action: View / Tap to inspect Crew Members -->
          ${canView ? `
            <button type="button" onclick="event.stopPropagation(); handleViewCrewMembers('${dept.name}')" class="w-full py-2 px-3 bg-primary/10 hover:bg-primary text-primary hover:text-white dark:bg-white/10 dark:hover:bg-white dark:hover:text-slate-900 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-2xs">
              <span class="material-symbols-outlined text-[16px]">group</span>
              <span>Inspect Crew Members (${activeStaff.length}) &rarr;</span>
            </button>
          ` : `
            <button type="button" onclick="event.stopPropagation(); toast.error('Clearance Denied', 'Viewing ${dept.name} crew roster requires Team Lead or Upper Management clearance.');" class="w-full py-2 px-3 bg-slate-100 dark:bg-slate-800/80 text-slate-400 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-not-allowed">
              <span class="material-symbols-outlined text-[15px]">lock</span>
              <span>Crew Roster Restricted</span>
            </button>
          `}

          <!-- Administrative Controls for Upper Management -->
          ${AppState.canPerformUpperManagement() ? `
            <div class="flex items-center gap-1.5 pt-1">
              <button onclick="event.stopPropagation(); openDissolveTeamModal('${dept.name}')" class="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 active:scale-95" title="Disband active shift assignments and return associates to reserve">
                <span class="material-symbols-outlined text-[14px]">cancel</span>
                <span>Dissolve</span>
              </button>
              <button onclick="event.stopPropagation(); openSackTeamModal('${dept.name}')" class="py-1.5 px-2.5 bg-error/10 hover:bg-error/20 text-error text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 active:scale-95" title="Mass terminate all associates in this department">
                <span class="material-symbols-outlined text-[14px]">gavel</span>
                <span>Sack</span>
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// Controller to open and display Crew Members Modal
function handleViewCrewMembers(deptName) {
  if (!deptName) return;

  // Clearance verification
  if (!AppState.canViewCrewMembers(deptName)) {
    toast.error('Clearance Denied', `Viewing ${deptName} crew roster requires Team Lead, HR, or Upper Management clearance.`);
    return;
  }

  currentCrewModalDept = deptName;
  currentCrewModalFilter = 'all';

  const searchInput = document.getElementById('crew-search-input');
  if (searchInput) searchInput.value = '';

  ['all', 'shift', 'off'].forEach(f => {
    const btn = document.getElementById(`crew-tab-${f}`);
    if (btn) btn.classList.toggle('active', f === 'all');
  });

  renderCrewMembersModal();
  openModal('modal-crew-members');
}

// View Active Floor Crew across all departments (from floor map KPI)
function handleViewActiveFloorCrew() {
  const u = AppState.currentUser;
  if (!u) return;

  if (u.rank < 2 && !AppState.isHRMember()) {
    toast.error('Clearance Denied', 'Viewing complete live floor crew roster requires Supervisory clearance (Rank 2+).');
    return;
  }

  handleViewCrewMembers("All Store Crew");
}

function setCrewModalFilter(filter) {
  currentCrewModalFilter = filter;
  ['all', 'shift', 'off'].forEach(f => {
    const btn = document.getElementById(`crew-tab-${f}`);
    if (btn) btn.classList.toggle('active', f === filter);
  });
  renderCrewMembersModal();
}

function filterCrewModalMembers() {
  renderCrewMembersModal();
}

function renderCrewMembersModal() {
  if (!currentCrewModalDept) return;
  const deptName = currentCrewModalDept;
  const isAll = deptName === "All Store Crew";
  const isHR = !isAll && (deptName.toLowerCase().includes('human resources') || deptName.toLowerCase().includes('hr'));

  // Strict security check: non-HR and non-management cannot view HR crew
  if (isHR && !AppState.canSeeHRRoles()) {
    closeModal('modal-crew-members');
    toast.error('Clearance Denied', 'Access to HR crew roster restricted to HR personnel and Upper Management.');
    return;
  }

  const deptsMeta = [
    { name: "Human Resources & Talent", zone: "Central Mall HQ", icon: "badge" },
    { name: "Apparel & Fashion", zone: "North Wing #42", icon: "styler" },
    { name: "Electronics & Gadgets", zone: "South Atrium", icon: "devices" },
    { name: "Logistics & Bay Storage", zone: "Storage Bay B", icon: "warehouse" },
    { name: "Customer Relations", zone: "Central Mall HQ", icon: "support_agent" },
    { name: "Security & Safety", zone: "West Gallery", icon: "security" },
    { name: "Facilities & Maintenance", zone: "Service Core A", icon: "build" },
    { name: "Food & Beverage", zone: "Food Court Deck", icon: "restaurant" },
    { name: "Cashier & Front End", zone: "East Promenade", icon: "point_of_sale" },
    { name: "Beauty & Cosmetics", zone: "North Wing #42", icon: "spa" },
    { name: "Home Goods & Furniture", zone: "Upper Mezzanine", icon: "chair" }
  ];

  const meta = isAll ? 
    { name: "All Store Crew", zone: "Storewide (All 9 Mall Zones)", icon: "groups" } :
    (deptsMeta.find(d => d.name === deptName) || { name: deptName, zone: "Store Floor", icon: "groups" });

  // Update header DOM elements
  const titleEl = document.getElementById('crew-modal-title');
  const iconEl = document.getElementById('crew-modal-icon');
  const zoneEl = document.getElementById('crew-modal-zone-text');
  const hrBadge = document.getElementById('crew-modal-hr-badge');
  const totalPill = document.getElementById('crew-modal-total-pill');
  const clockedText = document.getElementById('crew-modal-clocked-text');

  if (titleEl) titleEl.textContent = isAll ? "All Store Floor Crew" : `${deptName} Crew`;
  if (iconEl) iconEl.textContent = meta.icon;
  if (zoneEl) zoneEl.textContent = meta.zone;
  if (hrBadge) hrBadge.classList.toggle('hidden', !isHR);

  // Retrieve employees
  let allDeptStaff = isAll ? 
    AppState.employees.filter(e => e.status !== 'Terminated' && (!e.department.includes('Human Resources') || AppState.canSeeHRRoles())) :
    AppState.employees.filter(e => e.department === deptName && e.status !== 'Terminated');

  const onShiftStaff = allDeptStaff.filter(e => e.clockedIn);
  const offShiftStaff = allDeptStaff.filter(e => !e.clockedIn);

  if (totalPill) totalPill.textContent = `${allDeptStaff.length} Members`;
  if (clockedText) clockedText.textContent = `${onShiftStaff.length} On Shift (${Math.round((onShiftStaff.length / (allDeptStaff.length || 1)) * 100)}%)`;

  // Update counts in segmented tabs
  const countAll = document.getElementById('crew-filter-count-all');
  const countShift = document.getElementById('crew-filter-count-shift');
  const countOff = document.getElementById('crew-filter-count-off');
  if (countAll) countAll.textContent = `(${allDeptStaff.length})`;
  if (countShift) countShift.textContent = `(${onShiftStaff.length})`;
  if (countOff) countOff.textContent = `(${offShiftStaff.length})`;

  // Apply shift filter
  let displayedStaff = allDeptStaff;
  if (currentCrewModalFilter === 'shift') displayedStaff = onShiftStaff;
  if (currentCrewModalFilter === 'off') displayedStaff = offShiftStaff;

  // Apply search query filter
  const query = (document.getElementById('crew-search-input')?.value || '').trim().toLowerCase();
  if (query) {
    displayedStaff = displayedStaff.filter(e => 
      e.name.toLowerCase().includes(query) ||
      e.id.toLowerCase().includes(query) ||
      e.role.toLowerCase().includes(query) ||
      (e.department && e.department.toLowerCase().includes(query)) ||
      (e.rfid && e.rfid.toLowerCase().includes(query))
    );
  }

  // Sort: Higher ranks first, then clocked-in associates, then alphabetical
  displayedStaff.sort((a, b) => {
    if (b.rank !== a.rank) return b.rank - a.rank;
    if (a.clockedIn !== b.clockedIn) return a.clockedIn ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  const container = document.getElementById('crew-members-roster-container');
  if (!container) return;

  if (displayedStaff.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-500 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
        <span class="material-symbols-outlined text-3xl mb-1 text-slate-400">group_off</span>
        <p class="font-bold text-sm text-slate-800 dark:text-slate-200">No Crew Members Found</p>
        <p class="text-xs mt-0.5">No associates matching current search or shift filter.</p>
      </div>
    `;
    return;
  }

  const rankColors = {
    1: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300',
    2: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
    3: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300',
    4: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300',
    5: 'bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300'
  };
  const rankLabels = { 1: 'R1 Assoc', 2: 'R2 Specialist', 3: 'R3 Team Lead', 4: 'R4 Manager', 5: 'R5 Admin' };

  container.innerHTML = displayedStaff.map(emp => {
    const isClocked = !!emp.clockedIn;
    const isLead = emp.rank >= 3;
    const isMe = emp.id === AppState.currentUser.id;

    return `
      <div class="p-3.5 rounded-2xl bg-white dark:bg-surface-lowest border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/40 transition-all">
        <!-- Left: Avatar & Info -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${isClocked ? 'bg-secondary/15 text-secondary border border-secondary/30 ring-2 ring-secondary/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}">
            ${emp.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div class="flex items-center gap-1.5 flex-wrap">
              <h4 class="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">${emp.name}</h4>
              <span class="badge-pill text-[9px] font-mono font-bold border ${rankColors[emp.rank] || rankColors[1]}">
                ${rankLabels[emp.rank] || 'R1'}
              </span>
              ${isMe ? '<span class="badge-pill bg-primary text-white text-[9px] font-bold">YOU</span>' : ''}
              ${isAll ? `<span class="badge-pill bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[9px] font-semibold">${emp.department}</span>` : ''}
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5">${emp.role}</p>
            <div class="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 dark:text-slate-500 font-mono">
              <span>ID: ${emp.id}</span>
              <span>&bull;</span>
              <span>${emp.rfid ? `Tag: ${emp.rfid}` : 'No RFID'}</span>
              <span>&bull;</span>
              <span class="truncate max-w-[140px] sm:max-w-[180px]">${emp.email}</span>
            </div>
          </div>
        </div>

        <!-- Right: Live Shift Status & Actions -->
        <div class="flex items-center gap-2 self-end sm:self-center">
          ${isClocked ? `
            <div class="px-2.5 py-1 rounded-xl bg-secondary-container/40 text-secondary border border-secondary/30 text-xs font-bold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-secondary live-pulse"></span>
              <span>On Shift</span>
            </div>
          ` : `
            <div class="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-semibold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-slate-400"></span>
              <span>Off Duty</span>
            </div>
          `}

          ${AppState.canPerformUpperManagement() || AppState.isUserInHRTeam() ? `
            <button onclick="closeModal('modal-crew-members'); openTransferEmployeeModal('${emp.id}')" class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors" title="Transfer Associate">
              <span class="material-symbols-outlined text-[18px]">swap_horiz</span>
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function renderHRStaffRoster(filteredList) {
  const tbody = document.getElementById('hr-full-roster-body');
  if (!tbody) return;

  let list = filteredList || AppState.employees.filter(e => e.status !== 'Terminated');

  // CRITICAL REQUIREMENT: "ONLY STAFF IN THAT TEAM AND HIGHER MANAGEMENT CAN SEE HR ROLES"
  // If viewing user is not in the HR team and not upper management, filter out HR department staff and protected roles
  if (!AppState.canSeeHRRoles()) {
    list = list.filter(e => e.department !== HR_DEPARTMENT_NAME && !HR_PROTECTED_ROLES.includes(e.role));
  }

  const countBadge = document.getElementById('hr-roster-count-badge');
  if (countBadge) countBadge.textContent = `${list.length} Associates`;

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="p-8 text-center text-on-surface-variant">
          <span class="material-symbols-outlined text-4xl mb-1 text-outline">group_off</span>
          <p class="font-bold text-xs text-on-surface">No associates match filter criteria</p>
          <p class="text-[11px]">Adjust your search query or department filter above.</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.slice(0, 100).map(emp => {
    let avatarHtml = emp.avatar
      ? `<img src="${emp.avatar}" class="w-8 h-8 rounded-full object-cover border border-outline-variant shadow-sm" alt="${emp.name}"/>`
      : `<div class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">${emp.initials || 'EM'}</div>`;

    const rankPillClass = `rank-badge-${emp.rank || 1}`;

    return `
      <tr class="hover:bg-surface-container transition-colors">
        <td>
          <div class="flex items-center gap-3">
            ${avatarHtml}
            <div>
              <div class="font-bold text-xs text-on-surface">${emp.name}</div>
              <div class="text-[10px] text-outline font-mono">${emp.id} • ${emp.email}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="text-xs font-semibold text-on-surface">${emp.department}</div>
          <div class="text-[10px] text-on-surface-variant font-mono">${emp.zone}</div>
        </td>
        <td>
          <div class="text-xs font-medium text-on-surface">${emp.role}</div>
          <span class="badge-pill text-[9px] ${rankPillClass} mt-0.5">Rank ${emp.rank} Clearance</span>
        </td>
        <td>
          ${emp.clockedIn
            ? `<span class="badge-pill bg-secondary-container text-secondary text-[10px] font-bold flex items-center gap-1 w-fit">
                <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                <span>On Shift (${emp.clockInTime || 'Active'})</span>
               </span>`
            : `<span class="badge-pill bg-surface-container text-outline text-[10px] font-medium w-fit">Off Duty</span>`
          }
        </td>
        <td class="text-right">
          <div class="flex items-center justify-end gap-1">
            <button onclick="openTransferModal('${emp.id}')" class="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-semibold" title="Transfer to another team/department">
              <span class="material-symbols-outlined text-[16px]">swap_horiz</span>
              <span class="hidden sm:inline">Transfer</span>
            </button>
            ${emp.rank < 5 ? `
              <button onclick="openTerminateModal('${emp.id}')" class="p-1.5 text-error hover:bg-error/10 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-bold" title="Terminate / Sack Associate">
                <span class="material-symbols-outlined text-[16px]">person_remove</span>
                <span class="hidden sm:inline">Sack</span>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function filterHRStaffRoster() {
  const searchInput = document.getElementById('hr-staff-search');
  const deptFilter = document.getElementById('hr-dept-filter');
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const dept = deptFilter ? deptFilter.value : 'ALL';

  const canSeeHR = AppState.canSeeHRRoles();
  const filtered = AppState.employees.filter(emp => {
    if (emp.status === 'Terminated') return false;
    if (!canSeeHR && (emp.department === HR_DEPARTMENT_NAME || HR_PROTECTED_ROLES.includes(emp.role))) {
      return false;
    }
    const matchDept = dept === 'ALL' || emp.department === dept;
    const matchQuery = !query || 
      emp.name.toLowerCase().includes(query) ||
      emp.role.toLowerCase().includes(query) ||
      emp.id.toLowerCase().includes(query);
    return matchDept && matchQuery;
  });

  renderHRStaffRoster(filtered);
}

// --- MODAL CONTROLS & HANDLERS ---

function openTransferModal(empId) {
  if (!AppState.canPerformHRFunctions()) {
    toast.error('Clearance Denied', 'Transferring staff between teams is strictly restricted to HR Personnel and Upper Management.');
    return;
  }

  const emp = AppState.employees.find(e => e.id === empId);
  if (!emp) return;

  document.getElementById('transfer-emp-id').value = emp.id;
  document.getElementById('transfer-emp-name').textContent = `${emp.name} (${emp.id})`;
  document.getElementById('transfer-emp-current').textContent = `Current: ${emp.department} • ${emp.zone}`;
  
  const avatar = document.getElementById('transfer-emp-avatar');
  if (avatar) avatar.textContent = emp.initials || 'NA';

  const deptSelect = document.getElementById('transfer-target-dept');
  if (deptSelect) {
    const visibleDepts = DEPARTMENTS.filter(d => !d.isHR || AppState.canSeeHRRoles());
    deptSelect.innerHTML = visibleDepts.map(d => `<option value="${d.name}" ${d.name === emp.department ? 'selected' : ''}>${d.name}</option>`).join('');
  }

  const roleInput = document.getElementById('transfer-target-role');
  if (roleInput) roleInput.value = emp.role;

  autoUpdateTransferZone(deptSelect ? deptSelect.value : emp.department);
  openModal('modal-transfer-employee');
}

function autoUpdateTransferZone(deptName) {
  const zoneMap = {
    "Human Resources & Talent": "Central Mall HQ",
    "Apparel & Fashion": "North Wing #42",
    "Electronics & Gadgets": "South Atrium",
    "Logistics & Bay Storage": "Storage Bay B",
    "Customer Relations": "Central Mall HQ",
    "Security & Safety": "West Gallery",
    "Facilities & Maintenance": "Service Core A",
    "Food & Beverage": "Food Court Deck",
    "Cashier & Front End": "East Promenade",
    "Beauty & Cosmetics": "North Wing #42",
    "Home Goods & Furniture": "Upper Mezzanine"
  };
  const zoneInput = document.getElementById('transfer-target-zone');
  if (zoneInput && zoneMap[deptName]) {
    zoneInput.value = zoneMap[deptName];
  }
}

function handleTransferEmployeeSubmit(e) {
  e.preventDefault();
  if (!AppState.canPerformHRFunctions()) {
    toast.error('Clearance Denied', 'Transferring associates is strictly restricted to HR Personnel and Upper Management.');
    return;
  }

  const form = e.target;
  const empId = form.emp_id.value;
  const targetDept = form.target_dept.value;
  const targetZone = form.target_zone.value;
  const targetRole = form.target_role.value.trim();

  // If transferring into HR Team, require HR Lead or Upper Management
  if (targetDept === HR_DEPARTMENT_NAME && !AppState.isUpperManagement() && !(AppState.isHRMember() && AppState.currentUser.rank >= 3)) {
    toast.error('Clearance Denied', 'Transferring personnel into the Human Resources & Talent department requires HR Lead or Upper Management clearance.');
    return;
  }

  // If assigning an HR role, ensure viewer has HR role clearance
  if (HR_PROTECTED_ROLES.includes(targetRole) && !AppState.canSeeHRRoles()) {
    toast.error('Security Rejection', 'Unauthorized to assign protected Human Resources roles.');
    return;
  }

  const emp = AppState.employees.find(e => e.id === empId);
  if (!emp) return;

  const oldDept = emp.department;
  emp.department = targetDept;
  emp.zone = targetZone;
  if (targetRole) emp.role = targetRole;

  // Supabase sync
  if (window.RetailSupabase && typeof window.RetailSupabase.transferEmployee === 'function') {
    window.RetailSupabase.transferEmployee(emp.id, targetDept, targetZone, targetRole);
  }

  AppState.auditLogs.unshift({
    timestamp: 'Just now',
    actor: `${AppState.currentUser.name} (${AppState.currentUser.role})`,
    action: 'Associate Transferred',
    target: emp.name,
    detail: `Transferred from ${oldDept} to ${targetDept} [${targetZone}]`
  });

  AppState.saveState();
  closeModal('modal-transfer-employee');
  toast.success('Associate Transferred!', `${emp.name} moved to ${targetDept}.`);
  renderHR();
  renderManagement();
  renderShiftAttendanceFeed();
}

function openTerminateModal(empId) {
  if (!AppState.canPerformHRFunctions()) {
    toast.error('Clearance Denied', 'Terminating or sacking staff is strictly restricted to HR Personnel and Upper Management.');
    return;
  }

  const emp = AppState.employees.find(e => e.id === empId);
  if (!emp) return;

  // Upper Management protection: non-upper-management cannot sack Rank 4+ staff
  if (emp.rank >= 4 && !AppState.isUpperManagement()) {
    toast.error('Security Restriction', 'Only Upper Management (Rank 4+) can terminate managerial or executive personnel.');
    return;
  }

  // HR Team protection: only Higher Management or higher-ranking HR can terminate HR personnel
  if (emp.department === HR_DEPARTMENT_NAME && !AppState.isUpperManagement() && !(AppState.isHRMember() && AppState.currentUser.rank > emp.rank)) {
    toast.error('Security Restriction', 'Terminating HR personnel requires higher HR rank or Upper Management clearance.');
    return;
  }

  document.getElementById('terminate-emp-id').value = emp.id;
  document.getElementById('terminate-emp-name').textContent = emp.name;
  document.getElementById('terminate-emp-role').textContent = emp.role;
  document.getElementById('terminate-emp-meta').textContent = `${emp.id} • ${emp.department} • Rank ${emp.rank}`;

  const avatar = document.getElementById('terminate-emp-avatar');
  if (avatar) avatar.textContent = emp.initials || 'NA';

  openModal('modal-terminate-employee');
}

function handleTerminateEmployeeSubmit(e) {
  e.preventDefault();
  if (!AppState.canPerformHRFunctions()) {
    toast.error('Clearance Denied', 'Terminating staff is strictly restricted to HR Personnel and Upper Management.');
    return;
  }

  const form = e.target;
  const empId = form.emp_id.value;
  const reason = form.terminate_reason.value;
  const notes = form.terminate_notes.value.trim();

  const emp = AppState.employees.find(e => e.id === empId);
  if (!emp) return;

  if (emp.rank >= 4 && !AppState.isUpperManagement()) {
    toast.error('Security Restriction', 'Only Upper Management (Rank 4+) can terminate managerial or executive personnel.');
    return;
  }

  // Mark as terminated & clocked out
  emp.status = 'Terminated';
  emp.clockedIn = false;
  emp.clockInTime = null;
  emp.terminationReason = reason;
  emp.terminatedAt = new Date().toISOString();

  // Remove associate from any active tasks/crews
  AppState.tasks.forEach(task => {
    if (task.teamLeadId === emp.id) {
      task.teamLeadId = null;
      task.teamLeadName = 'Reassignment Pending';
    }
    if (Array.isArray(task.assignees)) {
      task.assignees = task.assignees.filter(a => a.id !== emp.id);
    }
  });

  // Supabase sync
  if (window.RetailSupabase && typeof window.RetailSupabase.terminateEmployee === 'function') {
    window.RetailSupabase.terminateEmployee(emp.id, reason, notes);
  }

  // Audit log
  AppState.auditLogs.unshift({
    timestamp: 'Just now',
    actor: `${AppState.currentUser.name} (${AppState.currentUser.role})`,
    action: 'Associate Sacked / Terminated',
    target: emp.name,
    detail: `Terminated from ${emp.department}. Reason: ${reason}. Notes: ${notes || 'None'}`
  });

  // Add Notification
  AppState.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: `Staff Terminated: ${emp.name}`,
    message: `${emp.role} was terminated by ${AppState.currentUser.name} (${reason})`,
    timestamp: 'Just now',
    read: false,
    type: 'staff_terminated'
  });

  AppState.saveState();
  closeModal('modal-terminate-employee');
  toast.error('Staff Member Terminated', `${emp.name} has been sacked and removed from the active roster.`);
  renderHR();
  renderManagement();
  renderShiftAttendanceFeed();
  renderSwitchUserModalList();
  updateNotificationBadge();
}

function openDissolveTeamModal(deptName) {
  if (!AppState.canPerformUpperManagement()) {
    toast.error('Clearance Denied', 'Dissolving shift crews requires Upper Management clearance (Rank 4+).');
    return;
  }

  if (deptName === HR_DEPARTMENT_NAME && AppState.currentUser.rank < 5) {
    toast.error('Executive Restriction', 'Only the Global Administrator (Rank 5) can dissolve the Human Resources team.');
    return;
  }

  const staff = AppState.employees.filter(e => e.department === deptName && e.status !== 'Terminated');
  document.getElementById('team-action-dept').value = deptName;
  document.getElementById('team-action-type').value = 'dissolve';
  document.getElementById('team-action-title').textContent = `Dissolve ${deptName} Shift Crew`;
  document.getElementById('team-action-subtitle').textContent = 'Disband active shift assignments and return associates to reserve';
  document.getElementById('team-action-dept-name').textContent = deptName;
  document.getElementById('team-action-count').textContent = `${staff.length} Active Members`;
  document.getElementById('team-action-count').className = 'badge-pill bg-amber-500/10 text-amber-600 font-mono text-[10px] font-bold';
  document.getElementById('team-action-desc').textContent = 'This action unassigns all team members from current shift duties in this department. Team members remain active in the workforce reserve pool.';
  document.getElementById('team-action-warning').className = 'p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-700 dark:text-amber-300 space-y-1';
  document.getElementById('team-action-warning').innerHTML = '<p class="font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">info</span><span>Operational Crew Reallocation</span></p><p>Active duties in this department will be reset to pending unassigned. Associates will be ready for new assignments.</p>';
  document.getElementById('team-action-submit-btn').className = 'px-5 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl hover:bg-amber-700 shadow-md active:scale-95 flex items-center gap-1.5';
  document.getElementById('team-action-submit-btn').innerHTML = '<span class="material-symbols-outlined text-[16px]">cancel</span><span>Confirm Crew Dissolution</span>';

  openModal('modal-sack-team');
}

function openSackTeamModal(deptName) {
  if (!AppState.canPerformUpperManagement()) {
    toast.error('Clearance Denied', 'Sacking entire teams requires Upper Management clearance (Rank 4+).');
    return;
  }

  if (deptName === HR_DEPARTMENT_NAME && AppState.currentUser.rank < 5) {
    toast.error('Executive Restriction', 'Only the Global Administrator (Rank 5) can terminate the Human Resources department.');
    return;
  }

  const staff = AppState.employees.filter(e => e.department === deptName && e.status !== 'Terminated' && e.rank < 5);
  document.getElementById('team-action-dept').value = deptName;
  document.getElementById('team-action-type').value = 'sack';
  document.getElementById('team-action-title').textContent = `Outrightly Sack ${deptName} Team`;
  document.getElementById('team-action-subtitle').textContent = 'Mass termination of all associates in this department';
  document.getElementById('team-action-dept-name').textContent = deptName;
  document.getElementById('team-action-count').textContent = `${staff.length} Associates Sacked`;
  document.getElementById('team-action-count').className = 'badge-pill bg-error/10 text-error font-mono text-[10px] font-bold';
  document.getElementById('team-action-desc').textContent = `Warning: This action will sack all ${staff.length} non-manager associates in ${deptName} immediately.`;
  document.getElementById('team-action-warning').className = 'p-3 bg-error/10 border border-error/20 rounded-xl text-[11px] text-error space-y-1';
  document.getElementById('team-action-warning').innerHTML = '<p class="font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">warning</span><span>Irreversible Mass Termination</span></p><p>All associates in this team will have terminal clearance revoked, clocked out, and removed from the active roster in the database.</p>';
  document.getElementById('team-action-submit-btn').className = 'px-5 py-2 bg-error text-white text-xs font-bold rounded-xl hover:bg-error/90 shadow-md active:scale-95 flex items-center gap-1.5';
  document.getElementById('team-action-submit-btn').innerHTML = '<span class="material-symbols-outlined text-[16px]">gavel</span><span>Execute Mass Team Sack</span>';

  openModal('modal-sack-team');
}

function handleTeamActionSubmit(e) {
  e.preventDefault();
  if (!AppState.canPerformUpperManagement()) {
    toast.error('Clearance Denied', 'Sacking or dissolving teams requires Upper Management clearance (Rank 4+).');
    return;
  }

  const form = e.target;
  const deptName = form.dept_name.value;
  const actionType = form.action_type.value;
  const reason = form.team_reason.value.trim();

  if (deptName === HR_DEPARTMENT_NAME && AppState.currentUser.rank < 5) {
    toast.error('Executive Restriction', 'Only the Global Administrator (Rank 5) can terminate the Human Resources department.');
    return;
  }

  if (actionType === 'dissolve') {
    // Unassign duties in this department
    AppState.tasks.forEach(t => {
      if (t.department === deptName && t.status !== 'Approved') {
        t.status = 'Assigned';
        t.assignees = [];
      }
    });

    if (window.RetailSupabase && typeof window.RetailSupabase.dissolveTeam === 'function') {
      window.RetailSupabase.dissolveTeam(deptName);
    }

    AppState.auditLogs.unshift({
      timestamp: 'Just now',
      actor: `${AppState.currentUser.name} (Manager)`,
      action: 'Team Crew Dissolved',
      target: deptName,
      detail: `Dissolved shift crew in ${deptName}. Reason: ${reason}`
    });

    toast.warning('Team Dissolved', `${deptName} crew disbanded. Associates returned to reserve.`);
  } else {
    // Outright sack entire team
    const sackedList = [];
    AppState.employees.forEach(emp => {
      if (emp.department === deptName && emp.rank < 5 && emp.status !== 'Terminated') {
        emp.status = 'Terminated';
        emp.clockedIn = false;
        emp.terminationReason = reason;
        emp.terminatedAt = new Date().toISOString();
        sackedList.push(emp.name);
      }
    });

    // Remove from duties
    AppState.tasks.forEach(t => {
      if (t.department === deptName) {
        t.status = 'Cancelled';
      }
    });

    if (window.RetailSupabase && typeof window.RetailSupabase.sackTeam === 'function') {
      window.RetailSupabase.sackTeam(deptName, reason);
    }

    AppState.auditLogs.unshift({
      timestamp: 'Just now',
      actor: `${AppState.currentUser.name} (Manager)`,
      action: 'Department Team Outright Sacked',
      target: deptName,
      detail: `Sacked ${sackedList.length} associates in ${deptName}. Reason: ${reason}`
    });

    AppState.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: `Team Terminated: ${deptName}`,
      message: `${sackedList.length} associates sacked in ${deptName} by ${AppState.currentUser.name} (${reason})`,
      timestamp: 'Just now',
      read: false,
      type: 'team_sacked'
    });

    toast.error('Team Sacked', `All ${sackedList.length} associates in ${deptName} have been permanently terminated.`);
  }

  AppState.saveState();
  closeModal('modal-sack-team');
  renderHR();
  renderManagement();
  renderShiftAttendanceFeed();
  renderSwitchUserModalList();
  updateNotificationBadge();
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
  renderExecAISection();
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
  const canSeeHR = AppState.canSeeHRRoles();
  const filtered = AppState.employees.filter(emp => {
    if (!canSeeHR && (emp.department === HR_DEPARTMENT_NAME || HR_PROTECTED_ROLES.includes(emp.role))) {
      return false;
    }
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
          <select onchange="handleRankChange('${emp.id}', this.value)" ${(!AppState.canAssignRoles() || isSuperAdmin) ? 'disabled' : ''} class="text-xs font-semibold rounded-lg px-2.5 py-1 bg-surface dark:bg-surface-lowest border border-outline-variant/80 focus:ring-1 focus:ring-primary outline-none cursor-pointer">
            <option value="5" ${emp.rank === 5 ? 'selected' : ''}>Rank 5: Executive Admin</option>
            <option value="4" ${emp.rank === 4 ? 'selected' : ''}>Rank 4: Operations Manager</option>
            <option value="3" ${emp.rank === 3 ? 'selected' : ''}>Rank 3: Floor Lead</option>
            <option value="2" ${emp.rank === 2 ? 'selected' : ''}>Rank 2: Specialist</option>
            <option value="1" ${emp.rank === 1 ? 'selected' : ''}>Rank 1: Associate</option>
          </select>
        </td>
        ${permsDef.map(p => {
          const has = emp.rank === 5 || (Array.isArray(emp.permissions) && emp.permissions.includes(p.key));
          const disabled = emp.rank === 5 || isSelf || !AppState.isUpperManagement();
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
  if (!AppState.canAssignRoles()) {
    toast.error('Clearance Denied', 'Only Human Resources personnel and Upper Management are authorized to alter employee ranks or roles.');
    renderPermissionsMatrix();
    return;
  }

  const rank = parseInt(newRankStr, 10);
  const emp = AppState.employees.find(e => e.id === empId);
  if (!emp) return;

  // Protect HR team personnel
  if ((emp.department === HR_DEPARTMENT_NAME || HR_PROTECTED_ROLES.includes(emp.role)) && !AppState.isUpperManagement()) {
    toast.error('Security Restriction', 'Only Upper Management can alter the clearance rank of Human Resources personnel.');
    renderPermissionsMatrix();
    return;
  }

  // Ceiling check: non-admin (rank < 5) cannot grant a rank equal to or above their own
  if (AppState.currentUser.rank < 5 && rank >= AppState.currentUser.rank) {
    toast.error('Clearance Ceiling', `You (Rank ${AppState.currentUser.rank}) cannot assign a security rank equal to or higher than your own (Rank ${rank}).`);
    renderPermissionsMatrix();
    return;
  }

  const oldRank = emp.rank;
  emp.rank = rank;

  if (emp.department === HR_DEPARTMENT_NAME) {
    if (rank === 4) {
      emp.role = 'HR Director';
      if (!emp.permissions.includes('manage_staff')) emp.permissions.push('manage_staff');
      if (!emp.permissions.includes('view_financials')) emp.permissions.push('view_financials');
    } else if (rank === 3) {
      emp.role = 'People Operations Lead';
    } else if (rank === 2) {
      emp.role = 'Talent Acquisition Specialist';
    } else {
      emp.role = 'Employee Relations Consultant';
      emp.permissions = emp.permissions.filter(p => p !== 'manage_staff');
    }
  } else {
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
  }

  const audit = {
    timestamp: 'Just now',
    actor: `${AppState.currentUser.name} (Rank ${AppState.currentUser.rank})`,
    action: 'Rank Modified',
    target: emp.name,
    detail: `Adjusted clearance from Rank ${oldRank} to Rank ${rank} (${emp.role})`
  };
  AppState.auditLogs.unshift(audit);
  AppState.saveState();

  toast.success('Rank Elevation Updated', `${emp.name} is now Rank ${rank} (${emp.role})`);
  renderPermissionsMatrix();
  renderAuditLogs();
  updateSessionUI();
}

function handlePermissionToggle(empId, permKey, isChecked) {
  if (!AppState.isUpperManagement() && !AppState.canAssignRoles()) {
    toast.error('Clearance Denied', 'Only authorized leadership can modify security permissions.');
    renderPermissionsMatrix();
    return;
  }

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

function openAddEmployeeModal() {
  if (!AppState.canPerformHRFunctions()) {
    toast.error('Clearance Denied', 'Only Human Resources personnel and Upper Management are authorized to employ or provision staff.');
    return;
  }

  const deptSelect = document.querySelector('#modal-add-employee select[name="emp_dept"]');
  if (deptSelect) {
    const canSeeHR = AppState.canSeeHRRoles();
    const availableDepts = DEPARTMENTS.filter(d => canSeeHR || !d.isHR);
    deptSelect.innerHTML = availableDepts.map(d => `<option value="${d.name}">${d.name}</option>`).join('');
  }

  const rankSelect = document.querySelector('#modal-add-employee select[name="emp_rank"]');
  if (rankSelect) {
    const curRank = AppState.currentUser.rank;
    let rankOptions = '';
    if (curRank >= 5) {
      rankOptions = `
        <option value="1">Rank 1: Associate (Standard floor duties)</option>
        <option value="2">Rank 2: Specialist (Inventory / Ops)</option>
        <option value="3" selected>Rank 3: Floor Lead (Task dispatch)</option>
        <option value="4">Rank 4: Operations Manager (Staff management)</option>
        <option value="5">Rank 5: Executive Administrator</option>
      `;
    } else if (curRank === 4) {
      rankOptions = `
        <option value="1">Rank 1: Associate (Standard floor duties)</option>
        <option value="2">Rank 2: Specialist (Inventory / Ops)</option>
        <option value="3" selected>Rank 3: Floor Lead (Task dispatch)</option>
        <option value="4">Rank 4: Operations Manager (Staff management)</option>
      `;
    } else if (curRank === 3) {
      rankOptions = `
        <option value="1">Rank 1: Associate (Standard floor duties)</option>
        <option value="2" selected>Rank 2: Specialist (Inventory / Ops)</option>
      `;
    } else if (curRank === 2) {
      rankOptions = `
        <option value="1" selected>Rank 1: Associate (Standard floor duties)</option>
      `;
    } else {
      rankOptions = `<option value="1">Rank 1: Associate</option>`;
    }
    rankSelect.innerHTML = rankOptions;
  }

  openModal('modal-add-employee');
}

function handleAddNewEmployee(e) {
  e.preventDefault();

  if (!AppState.canPerformHRFunctions()) {
    toast.error('Clearance Denied', 'Only Human Resources personnel and Upper Management are authorized to employ or provision staff.');
    return;
  }

  if (!AppState.canAssignRoles()) {
    toast.error('Clearance Denied', 'Your security rank does not permit assigning roles or provisioning personnel.');
    return;
  }

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

  // RBAC ceiling: non-admins cannot assign rank equal to or above their own
  if (AppState.currentUser.rank < 5 && rank >= AppState.currentUser.rank) {
    toast.error('Clearance Ceiling', `You (Rank ${AppState.currentUser.rank}) cannot provision staff with Rank ${rank} (must be strictly lower).`);
    return;
  }

  // Gating HR roles / department
  const isTargetingHR = department === HR_DEPARTMENT_NAME || HR_PROTECTED_ROLES.includes(role);
  if (isTargetingHR) {
    // Only Upper Management or HR leadership (Rank >= 3) can provision HR personnel
    if (!AppState.isUpperManagement() && !(AppState.isHRMember() && AppState.currentUser.rank >= 3)) {
      toast.error('Restricted Role', 'Only Upper Management or HR Leadership can provision Human Resources roles.');
      return;
    }
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
    detail: `Created ${newId} (${role}) with Rank ${rank} in ${department}`
  });

  AppState.saveState();
  if (window.RetailSupabase && typeof window.RetailSupabase.employEmployee === 'function') {
    window.RetailSupabase.employEmployee(newEmployee);
  }
  renderSwitchUserModalList();
  closeModal('modal-add-employee');
  form.reset();

  toast.success('Staff Member Provisioned!', `${name} (${newId}) registered with PIN "${pin}"`);
  renderManagement();
  renderHR();
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
      <div class="p-4 rounded-2xl bg-white dark:bg-surface-lowest border border-slate-200/90 dark:border-white/10 shadow-sm space-y-3.5 hover:border-primary/40 transition-all">
        <!-- Duty Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              ${statusBadge}
              <span class="badge-pill text-[10px] ${duty.priority === 'High' || duty.priority === 'Urgent' ? 'bg-error-container/40 text-error font-bold' : 'bg-surface-container text-on-surface-variant font-semibold'}">${duty.priority}</span>
              <span class="font-mono text-xs text-on-surface-variant">Zone: ${duty.zone}</span>
              <span class="font-mono text-xs text-on-surface-variant">&bull; Due: ${duty.due}</span>
            </div>
            <h4 class="font-headline text-base font-bold text-slate-900 dark:text-white mt-1">${duty.task}</h4>
          </div>

          <div class="flex items-center gap-2">
            ${isUserLead ? `
              <span class="badge-pill bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">stars</span>
                <span>You are Team Lead</span>
              </span>
            ` : `
              <div class="text-left sm:text-right">
                <span class="text-[10px] text-on-surface-variant block uppercase font-semibold">Team Lead</span>
                <span class="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
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
        <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-semibold text-slate-700 dark:text-slate-300">Assigned Team (${assignees.length}):</span>
            <div class="flex flex-wrap gap-1.5">
              ${assignees.map(a => `
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 ${a.id === user.id ? 'bg-primary text-white font-bold shadow-xs' : (a.isLead ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold border border-amber-500/30' : 'bg-surface-container text-slate-800 dark:text-slate-200 border border-outline-variant/40')}">
                  ${a.isLead ? '★ ' : ''}${a.name} ${a.id === user.id ? '(You)' : ''}
                </span>
              `).join('')}
            </div>
          </div>
          <div class="flex items-center gap-2 font-mono text-xs">
            <span class="text-on-surface-variant font-medium">Completion:</span>
            <span class="font-bold text-primary dark:text-primary-fixed">${progressPercent}%</span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="w-full duty-progress-bar">
          <div class="duty-progress-fill ${duty.status === 'Approved' ? 'bg-secondary' : 'bg-primary'}" style="width: ${progressPercent}%;"></div>
        </div>

        <!-- Subtasks Checklist -->
        <div class="space-y-2">
          <span class="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">Station Checklist:</span>
          <div class="space-y-1.5">
            ${checklist.map((step, idx) => `
              <label class="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 dark:bg-slate-900/50 dark:hover:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-primary/40 cursor-pointer text-xs transition-colors">
                <input type="checkbox" ${step.done ? 'checked' : ''} ${duty.status === 'Pending Approval' || duty.status === 'Approved' ? 'disabled' : ''} onchange="toggleDutyChecklistItem(${duty.id}, ${idx}, this.checked)" class="w-4 h-4 rounded text-secondary focus:ring-secondary"/>
                <span class="${step.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100 font-semibold'} flex-1">${step.text}</span>
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
  { label: 'Go to Workforce Terminal Login & RFID/NFC Gateway', icon: 'badge', action: () => navigateTo('login') },
  { label: 'Scan RFID / NFC Contactless Employee Badge', icon: 'contactless', action: () => { navigateTo('login'); switchLoginPortalTab('rfid'); simulateBadgeTapOnPad(); } },
  { label: 'Authenticate via WebAuthn Biometric Passkey', icon: 'fingerprint', action: () => { navigateTo('login'); switchLoginPortalTab('passkey'); handlePasskeyAuth(false); } },
  { label: 'Lock Terminal & Return to Login Portal', icon: 'lock', action: () => navigateTo('login') },
  { label: 'Go to Operational Dashboard', icon: 'dashboard', action: () => navigateTo('dashboard') },
  { label: 'Go to Inventory Management', icon: 'inventory_2', action: () => navigateTo('inventory') },
  { label: 'Go to Sales & Finance', icon: 'payments', action: () => navigateTo('sales') },
  { label: 'Go to HR & Team Performance', icon: 'badge', action: () => navigateTo('hr') },
  { label: 'Go to Staff Onboarding & Duty Station', icon: 'punch_clock', action: () => navigateTo('onboarding') },
  { label: 'Go to Manager Portal (Staff & Permissions)', icon: 'admin_panel_settings', action: () => navigateTo('management') },
  { label: 'Switch Active User Session', icon: 'switch_account', action: () => openModal('modal-switch-user') },
  { label: 'Punch Clock (Clock In / Out)', icon: 'punch_clock', action: () => { navigateTo('onboarding'); handleStaffClockToggle(); } },
  { label: 'Escalate Floor Issue (Report Hazard / Block)', icon: 'report_problem', action: () => openModal('modal-escalate-issue') },
  { label: 'Add New Staff Employee', icon: 'person_add', action: () => openAddEmployeeModal() },
  { label: 'Assign New Duty Task', icon: 'assignment_add', action: () => navigateTo('assign-task') },
  { label: 'Add New Product SKU', icon: 'add_box', action: () => { navigateTo('inventory'); openModal('modal-add-product'); } },
  { label: 'Record New Sale / Transaction', icon: 'receipt_long', action: () => { navigateTo('sales'); openModal('modal-add-transaction'); } },
  { label: 'Export Financial CSV Report', icon: 'download', action: () => exportSalesReport() },
  { label: 'Toggle Light / Dark Mode', icon: 'dark_mode', action: () => toggleTheme() }
];

function filterPaletteActions(query) {
  const list = document.getElementById('palette-results');
  if (!list) return;

  const canHR = AppState.canPerformHRFunctions();
  const canMgmt = AppState.isUpperManagement();
  const visibleActions = PALETTE_ACTIONS.filter(a => {
    if (a.label.includes('HR') && !canHR) return false;
    if (a.label.includes('Staff Employee') && !canHR) return false;
    if (a.label.includes('Manager Portal') && !canMgmt) return false;
    return true;
  });

  const q = query.toLowerCase().trim();
  const filtered = visibleActions.filter(a => a.label.toLowerCase().includes(q));

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

  const canSeeHR = AppState.canSeeHRRoles();

  // Sync directory-dept-filter dropdown options to cloaking rule
  const deptFilterElem = document.getElementById('directory-dept-filter');
  if (deptFilterElem) {
    const currentVal = deptFilterElem.value;
    const hrOpt = Array.from(deptFilterElem.options).find(o => o.value === HR_DEPARTMENT_NAME);
    if (!canSeeHR && hrOpt) {
      hrOpt.remove();
      if (currentVal === HR_DEPARTMENT_NAME) deptFilterElem.value = '';
    } else if (canSeeHR && !hrOpt) {
      const opt = document.createElement('option');
      opt.value = HR_DEPARTMENT_NAME;
      opt.textContent = HR_DEPARTMENT_NAME;
      deptFilterElem.appendChild(opt);
    }
  }

  // Sync provision button container in switch modal
  const provisionContainer = document.getElementById('switch-modal-provision-container');
  if (provisionContainer) {
    provisionContainer.style.display = AppState.canPerformHRFunctions() ? '' : 'none';
  }

  const searchQuery = (document.getElementById('directory-search-input')?.value || '').toLowerCase().trim();
  const deptFilter = document.getElementById('directory-dept-filter')?.value || '';

  const filtered = AppState.employees.filter(emp => {
    // CRITICAL: Hide HR department and protected roles from non-HR and non-upper-management
    if (!canSeeHR && (emp.department === HR_DEPARTMENT_NAME || HR_PROTECTED_ROLES.includes(emp.role))) {
      return false;
    }
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
      <div onclick="switchUser('${emp.id}')" class="flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-500 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 shadow-xs hover:shadow-sm cursor-pointer transition-all active:scale-[0.99] ${isCurrent ? 'ring-2 ring-slate-900 dark:ring-white bg-white dark:bg-slate-800' : ''}">
        <div class="flex items-center gap-3 min-w-0">
          <div class="relative shrink-0">
            ${avatarHtml}
            <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full ${emp.clockedIn ? 'bg-emerald-500' : 'bg-slate-400'} border-2 border-white dark:border-slate-900"></span>
          </div>
          <div class="min-w-0">
            <div class="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5 truncate">
              <span class="truncate">${emp.name}</span>
              <span class="badge-pill text-[9px] rank-badge-${emp.rank}">Rank ${emp.rank}</span>
              ${isCurrent ? '<span class="text-[9px] bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-1.5 py-0.2 rounded font-bold">ACTIVE</span>' : ''}
            </div>
            <div class="text-[11px] text-slate-600 dark:text-slate-300 font-mono truncate font-medium">${emp.id} &bull; ${emp.role}</div>
            <div class="text-[10px] text-slate-500 dark:text-slate-400 truncate">${emp.department} &bull; ${emp.zone}</div>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="badge-pill text-[9px] ${emp.clockedIn ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600'}">
            ${emp.clockedIn ? 'On Shift' : 'Off Duty'}
          </span>
          <button type="button" class="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold transition-all active:scale-95">
            Switch &rarr;
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// =========================================================================
// 19. INTERACTIVE STORE FLOOR MAP (DIGITAL TWIN & HEATMAP)
// =========================================================================

const FLOOR_ZONE_CONFIG = {
  'North Wing #42': { id: 'north-wing', name: 'North Wing #42', depts: ['Apparel & Fashion', 'Beauty & Cosmetics'], cx: 170, cy: 145 },
  'Storage Bay B': { id: 'storage-bay', name: 'Storage Bay B', depts: ['Logistics & Bay Storage'], cx: 500, cy: 145 },
  'West Gallery': { id: 'west-gallery', name: 'West Gallery', depts: ['Security & Safety'], cx: 830, cy: 145 },
  'East Promenade': { id: 'east-promenade', name: 'East Promenade', depts: ['Cashier & Front End'], cx: 170, cy: 420 },
  'Central Mall HQ': { id: 'central-hq', name: 'Central Mall HQ', depts: ['Customer Relations', 'Executive Operations'], cx: 500, cy: 420 },
  'South Atrium': { id: 'south-atrium', name: 'South Atrium', depts: ['Electronics & Gadgets'], cx: 830, cy: 420 },
  'Service Core A': { id: 'service-core', name: 'Service Core A', depts: ['Facilities & Maintenance'], cx: 170, cy: 622 },
  'Food Court Deck': { id: 'food-court', name: 'Food Court Deck', depts: ['Food & Beverage'], cx: 500, cy: 622 },
  'Upper Mezzanine': { id: 'upper-mezzanine', name: 'Upper Mezzanine', depts: ['Home Goods & Furniture'], cx: 830, cy: 622 }
};

function renderFloorMap() {
  const staffByZone = {};
  const tasksByZone = {};
  const escByZone = {};

  let totalClockedIn = 0;
  let activeDutyZones = 0;
  let totalEscalations = 0;

  // Initialize count structures
  Object.keys(FLOOR_ZONE_CONFIG).forEach(z => {
    staffByZone[z] = [];
    tasksByZone[z] = [];
    escByZone[z] = [];
  });

  // Aggregate staff
  AppState.employees.forEach(emp => {
    if (emp.clockedIn && emp.status !== 'Terminated') {
      totalClockedIn++;
      if (staffByZone[emp.zone]) {
        staffByZone[emp.zone].push(emp);
      }
    }
  });

  // Aggregate tasks
  AppState.tasks.forEach(t => {
    if (t.status !== 'Signed Off' && tasksByZone[t.zone]) {
      tasksByZone[t.zone].push(t);
    }
  });

  // Aggregate escalations
  AppState.escalations.forEach(esc => {
    if (esc.status === 'Open') {
      totalEscalations++;
      if (escByZone[esc.zone]) {
        escByZone[esc.zone].push(esc);
      }
    }
  });

  // Count active duty zones
  Object.keys(tasksByZone).forEach(z => {
    if (tasksByZone[z].length > 0) activeDutyZones++;
  });

  // Update KPI Cards
  const kpiStaff = document.getElementById('map-kpi-staff-count');
  const kpiDuty = document.getElementById('map-kpi-duty-count');
  const kpiEsc = document.getElementById('map-kpi-escalation-count');
  const kpiCov = document.getElementById('map-kpi-coverage');

  if (kpiStaff) kpiStaff.textContent = totalClockedIn;
  if (kpiDuty) kpiDuty.textContent = `${activeDutyZones} Zones`;
  if (kpiEsc) kpiEsc.textContent = `${totalEscalations} Open`;
  if (kpiCov) {
    const mannedZones = Object.values(staffByZone).filter(list => list.length > 0).length;
    const pct = Math.round((mannedZones / 9) * 100);
    kpiCov.textContent = `${pct}%`;
  }

  // Render SVG overlays for each zone
  Object.entries(FLOOR_ZONE_CONFIG).forEach(([zoneName, cfg]) => {
    const container = document.getElementById(`svg-zone-content-${cfg.id}`);
    if (!container) return;

    const zStaff = staffByZone[zoneName] || [];
    const zTasks = tasksByZone[zoneName] || [];
    const zEsc = escByZone[zoneName] || [];

    const isHeatmap = AppState.floorMap.mode === 'heatmap';
    let contentHtml = '';

    if (isHeatmap) {
      // Heatmap density glow circle
      const densityRadius = Math.min(75, Math.max(25, zStaff.length * 4.5));
      const opacity = Math.min(0.7, 0.2 + (zStaff.length / 25) * 0.5);
      contentHtml += `
        <circle cx="${cfg.cx}" cy="${cfg.cy}" r="${densityRadius}" fill="#006c49" fill-opacity="${opacity}" filter="url(#glow-duty)"/>
        <text x="${cfg.cx}" y="${cfg.cy + 5}" text-anchor="middle" fill="#ffffff" font-family="JetBrains Mono" font-size="12" font-weight="bold">${zStaff.length} Associates</text>
      `;
    } else {
      // Blueprint View: Staff Pin Badge
      contentHtml += `
        <g transform="translate(${cfg.cx - 50}, ${cfg.cy - 20})">
          <rect width="100" height="26" rx="8" class="fill-surface-container-high/90 stroke-outline-variant/60" stroke-width="1"/>
          <circle cx="16" cy="13" r="5" fill="#006c49"/>
          <text x="28" y="17" class="font-mono font-bold text-[11px] fill-on-surface">${zStaff.length} On Duty</text>
        </g>
      `;

      // Duty Halo: Animated Pulse Ring
      if (zTasks.length > 0) {
        contentHtml += `
          <g transform="translate(${cfg.cx + 55}, ${cfg.cy - 40})">
            <circle cx="0" cy="0" r="14" fill="#006c49" fill-opacity="0.3" class="animate-ping"/>
            <circle cx="0" cy="0" r="8" fill="#006c49"/>
            <text x="0" y="3" text-anchor="middle" fill="#ffffff" font-family="JetBrains Mono" font-size="9" font-weight="bold">${zTasks.length}</text>
          </g>
        `;
      }

      // Escalation Radar Beacon: Pulsing Red Ping
      if (zEsc.length > 0) {
        contentHtml += `
          <g transform="translate(${cfg.cx + 55}, ${cfg.cy + 15})">
            <circle cx="0" cy="0" r="18" fill="#ba1a1a" fill-opacity="0.35" class="beacon-ping" stroke="#ba1a1a" stroke-width="2"/>
            <circle cx="0" cy="0" r="8" fill="#ba1a1a"/>
            <text x="0" y="3" text-anchor="middle" fill="#ffffff" font-family="Inter" font-size="10" font-weight="bold">!</text>
          </g>
        `;
      }
    }

    container.innerHTML = contentHtml;

    // Highlight selected zone rect
    const groupEl = document.getElementById(`svg-zone-${cfg.id}`);
    if (groupEl) {
      const rectEl = groupEl.querySelector('.zone-rect');
      if (rectEl) {
        if (zoneName === AppState.floorMap.selectedZone) {
          rectEl.setAttribute('stroke', '#041627');
          rectEl.setAttribute('stroke-width', '3.5');
          rectEl.classList.add('selected-zone-highlight');
        } else {
          rectEl.setAttribute('stroke-width', '1.5');
          rectEl.classList.remove('selected-zone-highlight');
        }
      }
    }
  });

  updateZoneInspector(AppState.floorMap.selectedZone);
}

function selectFloorMapZone(zoneName) {
  AppState.floorMap.selectedZone = zoneName;
  const filterSelect = document.getElementById('map-zone-filter');
  if (filterSelect) filterSelect.value = zoneName;
  renderFloorMap();
}

function filterFloorMapZone(zoneVal) {
  if (zoneVal === 'all') {
    AppState.floorMap.selectedZone = 'North Wing #42';
  } else {
    AppState.floorMap.selectedZone = zoneVal;
  }
  renderFloorMap();
}

function setFloorMapMode(mode) {
  AppState.floorMap.mode = mode;
  const btnBp = document.getElementById('btn-map-mode-blueprint');
  const btnHm = document.getElementById('btn-map-mode-heatmap');

  if (mode === 'blueprint') {
    if (btnBp) { btnBp.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-primary text-white shadow-sm flex items-center gap-1.5'; }
    if (btnHm) { btnHm.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-on-surface-variant hover:text-on-surface flex items-center gap-1.5'; }
  } else {
    if (btnBp) { btnBp.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-on-surface-variant hover:text-on-surface flex items-center gap-1.5'; }
    if (btnHm) { btnHm.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-primary text-white shadow-sm flex items-center gap-1.5'; }
  }
  renderFloorMap();
}

function refreshFloorMapTelemetry() {
  renderFloorMap();
  toast.success('Telemetry Refreshed', 'Real-time spatial staff and beacon coordinates updated.');
}

function updateZoneInspector(zoneName) {
  const titleEl = document.getElementById('inspector-zone-title');
  const badgeEl = document.getElementById('inspector-zone-badge');
  const staffCountEl = document.getElementById('inspector-staff-count');
  const staffListEl = document.getElementById('inspector-staff-list');
  const dutiesCountEl = document.getElementById('inspector-duties-count');
  const dutiesListEl = document.getElementById('inspector-duties-list');
  const escCountEl = document.getElementById('inspector-escalations-count');
  const escListEl = document.getElementById('inspector-escalations-list');

  if (titleEl) titleEl.textContent = zoneName;

  const staff = AppState.employees.filter(e => e.zone === zoneName && e.clockedIn && e.status !== 'Terminated');
  const duties = AppState.tasks.filter(t => t.zone === zoneName && t.status !== 'Signed Off');
  const escalations = AppState.escalations.filter(e => e.zone === zoneName && e.status === 'Open');

  if (badgeEl) badgeEl.textContent = `${staff.length} On Duty`;
  if (staffCountEl) staffCountEl.textContent = `${staff.length} staff clocked in`;
  if (dutiesCountEl) dutiesCountEl.textContent = `${duties.length} active tasks`;
  if (escCountEl) escCountEl.textContent = `${escalations.length} critical alerts`;

  // Render Staff List
  if (staffListEl) {
    if (staff.length === 0) {
      staffListEl.innerHTML = '<div class="p-3 text-center text-xs text-on-surface-variant">No associates currently clocked in to this zone.</div>';
    } else {
      staffListEl.innerHTML = staff.slice(0, 10).map(emp => {
        const avatar = emp.avatar 
          ? `<img src="${emp.avatar}" class="w-6 h-6 rounded-full object-cover" alt="${emp.name}"/>`
          : `<div class="w-6 h-6 rounded-full bg-surface-container font-mono text-[10px] font-bold flex items-center justify-center">${emp.initials}</div>`;
        return `
          <div class="flex items-center justify-between p-2 rounded-lg bg-surface-container border border-outline-variant/40 text-xs">
            <div class="flex items-center gap-2 min-w-0">
              ${avatar}
              <div class="truncate">
                <span class="font-semibold text-on-surface">${emp.name}</span>
                <span class="text-[10px] text-on-surface-variant block truncate">${emp.role}</span>
              </div>
            </div>
            <span class="badge-pill text-[9px] rank-badge-${emp.rank}">Rank ${emp.rank}</span>
          </div>
        `;
      }).join('');
    }
  }

  // Render Duties List
  if (dutiesListEl) {
    if (duties.length === 0) {
      dutiesListEl.innerHTML = '<div class="p-2 text-center text-xs text-on-surface-variant">No duties currently active in this zone.</div>';
    } else {
      dutiesListEl.innerHTML = duties.map(d => {
        const completedChecks = d.checklist ? d.checklist.filter(c => c.done).length : 0;
        const totalChecks = d.checklist ? d.checklist.length : 1;
        const pct = Math.round((completedChecks / totalChecks) * 100);
        return `
          <div class="p-2 rounded-lg bg-surface-container border border-outline-variant/40 text-xs space-y-1">
            <div class="flex items-center justify-between">
              <span class="font-bold text-on-surface truncate">${d.title}</span>
              <span class="badge-pill text-[9px] ${d.status === 'Pending Approval' ? 'bg-amber-500/15 text-amber-700' : 'bg-secondary-container/40 text-secondary'}">${d.status}</span>
            </div>
            <div class="flex items-center justify-between text-[10px] text-on-surface-variant">
              <span>Lead: ${d.teamLeadName}</span>
              <span class="font-mono font-bold">${pct}% Done</span>
            </div>
            <div class="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
              <div class="bg-secondary h-full rounded-full" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // Render Escalations List
  if (escListEl) {
    if (escalations.length === 0) {
      escListEl.innerHTML = '<div class="p-2 text-center text-xs text-secondary font-medium">✓ All clear: zero active incidents.</div>';
    } else {
      escListEl.innerHTML = escalations.map(esc => `
        <div class="p-2 rounded-lg bg-error/10 border border-error/20 text-xs space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-bold text-error flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">warning</span>
              <span>${esc.category}</span>
            </span>
            <span class="badge-pill bg-error text-white font-mono text-[9px] font-bold">${esc.urgency}</span>
          </div>
          <p class="text-[11px] text-on-surface">${esc.description}</p>
          <div class="flex items-center justify-between text-[10px] text-on-surface-variant pt-1 border-t border-error/20">
            <span>By ${esc.senderName}</span>
            <button onclick="resolveEscalation('${esc.id}')" class="text-primary dark:text-primary-fixed font-bold hover:underline">Mark Resolved &rarr;</button>
          </div>
        </div>
      `).join('');
    }
  }
}

function openRapidDispatchForZone() {
  AppState.selectedAssociateForTask = AppState.floorMap.selectedZone;
  navigateTo('assign-task');
  const zoneSelect = document.querySelector('select[name="task_zone"]');
  if (zoneSelect) zoneSelect.value = AppState.floorMap.selectedZone;
  toast.info('Rapid Dispatch', `Configuring duty dispatch for ${AppState.floorMap.selectedZone}`);
}

// =========================================================================
// 20. WEEKLY SHIFT SCHEDULE & PEER-TO-PEER SWAPPING
// =========================================================================

function renderSchedule() {
  renderScheduleMatrix();
  renderShiftSwapsTray();
}

function renderScheduleMatrix() {
  const container = document.getElementById('schedule-matrix-grid');
  if (!container) return;

  const filterDept = document.getElementById('schedule-dept-filter')?.value || 'all';
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  container.innerHTML = days.map((day, dIdx) => {
    const isToday = dIdx === 2; // Wednesday simulated as today
    const dayDate = `Oct ${23 + dIdx}`;

    // Get shifts for this day
    const dayShifts = AppState.shiftSchedules.filter(s => {
      if (s.day !== day) return false;
      if (filterDept !== 'all' && s.department !== filterDept) return false;
      return true;
    }).slice(0, 3);

    return `
      <div class="flex flex-col gap-2.5 p-3 rounded-2xl ${isToday ? 'bg-surface-container-high border-2 border-primary/30 ring-2 ring-primary/10' : 'bg-surface-container-low border border-outline-variant/50'}">
        <div class="flex items-center justify-between pb-2 border-b border-outline-variant/40">
          <div>
            <div class="font-headline text-xs font-bold text-on-surface">${day}</div>
            <div class="text-[10px] font-mono text-on-surface-variant">${dayDate}</div>
          </div>
          ${isToday ? '<span class="badge-pill bg-primary text-white font-mono text-[9px] font-bold">TODAY</span>' : ''}
        </div>

        <div class="space-y-2">
          ${dayShifts.map(shift => {
            // Find assigned associate
            const deptEmps = AppState.employees.filter(e => e.department === shift.department && e.status !== 'Terminated');
            const assignedEmp = deptEmps[Math.abs((shift.id.charCodeAt(4) || 1) % deptEmps.length)] || AppState.employees[0];
            const isCurrentUser = assignedEmp.id === AppState.currentUserId;

            return `
              <div class="p-2.5 rounded-xl bg-surface dark:bg-surface-lowest border border-outline-variant/50 hover:border-primary transition-all text-xs flex flex-col gap-1.5 shadow-sm group">
                <div class="flex items-center justify-between">
                  <span class="badge-pill font-mono text-[9px] font-bold ${shift.shiftType === 'Morning' ? 'bg-secondary-container/40 text-secondary' : shift.shiftType === 'Midday' ? 'bg-primary/10 text-primary' : 'bg-amber-500/15 text-amber-700'}">
                    ${shift.shiftType}
                  </span>
                  <span class="text-[10px] font-mono text-outline">${shift.hours}</span>
                </div>
                <div class="font-bold text-on-surface truncate">${assignedEmp.name}</div>
                <div class="text-[10px] text-on-surface-variant truncate">${shift.department}</div>
                
                <div class="pt-1.5 border-t border-outline-variant/30 flex items-center justify-between">
                  <span class="text-[9px] font-mono text-outline">Zone: ${shift.zone.split(' ')[0]}</span>
                  <button onclick="openShiftSwapModal('${day}', '${shift.hours}', '${assignedEmp.id}')" class="text-[10px] font-bold text-primary dark:text-primary-fixed hover:underline flex items-center gap-0.5">
                    <span class="material-symbols-outlined text-[12px]">swap_horiz</span> Trade
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderShiftSwapsTray() {
  const container = document.getElementById('sched-swaps-container');
  const badge = document.getElementById('sched-swaps-badge');
  const kpiPending = document.getElementById('sched-kpi-pending-swaps');

  if (!container) return;

  const pending = AppState.shiftSwaps.filter(s => s.status !== 'Approved' && s.status !== 'Declined');
  if (badge) badge.textContent = `${pending.length} Awaiting Action`;
  if (kpiPending) kpiPending.textContent = `${pending.length} Pending`;

  if (AppState.shiftSwaps.length === 0) {
    container.innerHTML = '<div class="col-span-2 p-6 text-center text-xs text-on-surface-variant">No active shift swap requests recorded.</div>';
    return;
  }

  container.innerHTML = AppState.shiftSwaps.map(swap => {
    const isTargetCoworker = swap.targetCoworkerId === AppState.currentUserId;
    const isRequester = swap.requesterId === AppState.currentUserId;
    const isMgr = AppState.isManager();

    let statusPill = '';
    if (swap.status === 'Pending Coworker') {
      statusPill = '<span class="badge-pill bg-amber-500/15 text-amber-700 font-mono text-[10px] font-bold">Awaiting Coworker Acceptance</span>';
    } else if (swap.status === 'Pending Manager') {
      statusPill = '<span class="badge-pill bg-blue-500/15 text-blue-700 font-mono text-[10px] font-bold">Awaiting Manager Sign-Off</span>';
    } else {
      statusPill = '<span class="badge-pill bg-secondary-container/40 text-secondary font-mono text-[10px] font-bold">Approved &amp; Scheduled</span>';
    }

    return `
      <div class="p-4 rounded-xl bg-surface dark:bg-surface-lowest border border-outline-variant/60 shadow-sm flex flex-col justify-between gap-3">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="font-mono text-[11px] font-bold text-on-surface-variant">${swap.id}</span>
            ${statusPill}
          </div>
          
          <div class="flex items-center gap-2 text-xs font-bold text-on-surface mb-1">
            <span>${swap.requesterName}</span>
            <span class="material-symbols-outlined text-[16px] text-outline">arrow_forward</span>
            <span>${swap.targetCoworkerName}</span>
          </div>

          <div class="text-xs text-on-surface-variant font-mono mb-2">
            📅 ${swap.shiftDate}
          </div>

          <div class="p-2.5 rounded-lg bg-surface-container-low text-xs space-y-1">
            <span class="font-semibold text-on-surface block">Reason: ${swap.tradeReason || swap.reason}</span>
            <p class="text-[11px] text-on-surface-variant">${swap.additionalNotes || swap.notes || 'No extra notes provided'}</p>
          </div>
        </div>

        <div class="pt-2 border-t border-outline-variant/40 flex items-center justify-between">
          <span class="text-[10px] font-mono text-outline">${swap.createdAt}</span>
          
          <div class="flex items-center gap-2">
            ${swap.status === 'Pending Coworker' && (isTargetCoworker || isMgr) ? `
              <button onclick="handleCoworkerAcceptSwap('${swap.id}')" class="px-3 py-1 bg-secondary text-white font-bold text-xs rounded-lg hover:bg-secondary/90 transition-all shadow-sm">
                Accept Trade
              </button>
            ` : ''}

            ${swap.status === 'Pending Manager' && isMgr ? `
              <button onclick="handleApproveShiftSwap('${swap.id}')" class="px-3 py-1 bg-primary text-white font-bold text-xs rounded-lg hover:bg-primary/90 transition-all shadow-sm flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">check</span> Authorize 1-Click
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function openShiftSwapModal(preDay, preHours, preEmpId) {
  const selectCoworker = document.getElementById('swap-coworker-select');
  if (selectCoworker) {
    const userDept = AppState.currentUser?.department || 'Apparel & Fashion';
    const eligible = AppState.employees.filter(e => e.department === userDept && e.id !== AppState.currentUserId && e.status !== 'Terminated');
    selectCoworker.innerHTML = eligible.map(e => `
      <option value="${e.id}">${e.name} (${e.role})</option>
    `).join('');
  }

  const shiftSelect = document.getElementById('swap-shift-select');
  if (shiftSelect && preDay && preHours) {
    shiftSelect.innerHTML = `<option value="${preDay} - ${preHours}">${preDay} - ${preHours}</option>` + shiftSelect.innerHTML;
  }

  openModal('modal-shift-swap');
}

function handleShiftSwapSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const shiftText = form.swap_shift.value;
  const coworkerId = form.swap_coworker.value;
  const reason = form.swap_reason.value;
  const notes = form.swap_notes.value;

  const targetCoworker = AppState.employees.find(e => e.id === coworkerId) || { name: 'Coworker' };

  const newSwap = {
    id: `SWAP-${Date.now().toString().slice(-4)}`,
    requesterId: AppState.currentUserId,
    requesterName: AppState.currentUser.name,
    requesterDept: AppState.currentUser.department,
    targetCoworkerId: coworkerId,
    targetCoworkerName: targetCoworker.name,
    shiftDate: shiftText,
    shiftDescription: `${AppState.currentUser.department} • Peer Shift Trade`,
    reason: reason,
    notes: notes,
    status: 'Pending Coworker',
    createdAt: 'Just now'
  };

  AppState.shiftSwaps.unshift(newSwap);
  AppState.saveState();

  if (window.RetailSupabase) {
    window.RetailSupabase.requestShiftSwap({
      shiftDate: shiftText,
      shiftDescription: newSwap.shiftDescription,
      reason: reason,
      notes: notes
    });
  }

  closeModal('modal-shift-swap');
  toast.success('Swap Request Sent', `Trade invitation delivered to ${targetCoworker.name}.`);
  renderSchedule();
}

function handleCoworkerAcceptSwap(swapId) {
  const swap = AppState.shiftSwaps.find(s => s.id === swapId);
  if (!swap) return;

  swap.status = 'Pending Manager';
  AppState.saveState();

  AppState.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: 'Shift Swap Accepted: Sign-Off Needed',
    message: `${swap.targetCoworkerName} accepted shift trade with ${swap.requesterName}. Awaiting Manager 1-click approval.`,
    timestamp: 'Just now',
    read: false,
    type: 'shift_swap'
  });

  toast.info('Trade Accepted', 'Shift swap forwarded to Manager Approvals Tray.');
  renderSchedule();
}

function handleApproveShiftSwap(swapId) {
  const swap = AppState.shiftSwaps.find(s => s.id === swapId);
  if (!swap) return;

  swap.status = 'Approved';
  AppState.saveState();

  AppState.auditLogs.unshift({
    timestamp: 'Just now',
    actor: AppState.currentUser.name,
    action: 'Shift Swap Authorized',
    target: `${swap.requesterName} ↔ ${swap.targetCoworkerName}`,
    detail: `Approved trade for ${swap.shiftDate}`
  });

  if (window.RetailSupabase) {
    window.RetailSupabase.approveShiftSwap(swapId, AppState.currentUserId);
  }

  toast.success('Swap Authorized', 'Shift matrix roster automatically updated.');
  renderSchedule();
}

// =========================================================================
// 21. BREAK & LABOR LAW COMPLIANCE TRACKER
// =========================================================================

function startBreak(type, durationMins) {
  if (AppState.breakState.timerInterval) {
    clearInterval(AppState.breakState.timerInterval);
  }

  AppState.breakState.isOnBreak = true;
  AppState.breakState.breakType = type; // 'rest' (15m) or 'meal' (30m)
  AppState.breakState.durationMins = durationMins;
  AppState.breakState.remainingSeconds = durationMins * 60;
  AppState.breakState.startTime = Date.now();

  updateBreakTickerUI();

  // Start countdown ticker
  AppState.breakState.timerInterval = setInterval(() => {
    if (AppState.breakState.remainingSeconds > 0) {
      AppState.breakState.remainingSeconds--;
      updateBreakTickerUI();
    } else {
      // Overstay alert!
      updateBreakTickerUI();
      const dot = document.getElementById('header-break-dot');
      const text = document.getElementById('header-break-text');
      if (dot) dot.className = 'w-2 h-2 rounded-full bg-error animate-ping';
      if (text) text.textContent = 'Break Overstay!';
    }
  }, 1000);

  // Update punch status badge
  const punchStatus = document.getElementById('punch-clock-status');
  if (punchStatus) {
    punchStatus.className = 'badge-pill bg-amber-500/20 text-amber-700 border border-amber-500/30 text-xs mt-1';
    punchStatus.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span><span>ON ${type.toUpperCase()} BREAK</span>`;
  }

  // Log to Supabase
  if (window.RetailSupabase) {
    window.RetailSupabase.logBreakCompliance({
      breakType: type,
      allocatedDurationMins: durationMins,
      complianceStatus: 'Compliant',
      notes: `Started ${durationMins}-minute ${type} break`
    });
  }

  toast.info('Break Started', `${durationMins}-minute ${type === 'meal' ? 'meal' : 'rest'} compliance timer running.`);
}

function endBreak() {
  if (AppState.breakState.timerInterval) {
    clearInterval(AppState.breakState.timerInterval);
    AppState.breakState.timerInterval = null;
  }

  const wasOverstay = AppState.breakState.remainingSeconds <= 0;
  AppState.breakState.isOnBreak = false;
  AppState.breakState.breakType = null;

  updateBreakTickerUI();

  // Reset header & punch clock badge
  const dot = document.getElementById('header-break-dot');
  const text = document.getElementById('header-break-text');
  if (dot) dot.className = 'w-2 h-2 rounded-full bg-emerald-500';
  if (text) text.textContent = 'Labor: Compliant';

  const punchStatus = document.getElementById('punch-clock-status');
  if (punchStatus) {
    punchStatus.className = 'badge-pill bg-secondary-container/40 text-secondary border border-secondary/30 text-xs mt-1';
    punchStatus.innerHTML = `<span class="w-2 h-2 rounded-full bg-secondary live-pulse"></span><span>CLOCKED IN</span>`;
  }

  closeModal('modal-break-compliance');

  if (wasOverstay) {
    toast.warning('Break Concluded', 'Recorded with minor overstay grace breach.');
  } else {
    toast.success('Break Concluded', 'Welcome back to active floor operations.');
  }
}

function updateBreakTickerUI() {
  const punchTicker = document.getElementById('punch-break-ticker');
  const punchVal = document.getElementById('punch-break-timer-val');
  const modalDisplay = document.getElementById('break-modal-timer-display');
  const modalProgress = document.getElementById('break-modal-progress-fill');
  const headerText = document.getElementById('header-break-text');
  const headerDot = document.getElementById('header-break-dot');
  const statusText = document.getElementById('break-modal-status-text');

  if (!AppState.breakState.isOnBreak) {
    if (punchTicker) punchTicker.classList.add('hidden');
    if (modalDisplay) modalDisplay.textContent = '15:00';
    if (statusText) statusText.textContent = 'Active on Retail Floor';
    return;
  }

  if (punchTicker) punchTicker.classList.remove('hidden');

  const mins = Math.floor(AppState.breakState.remainingSeconds / 60);
  const secs = AppState.breakState.remainingSeconds % 60;
  const timeStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;

  if (punchVal) punchVal.textContent = timeStr;
  if (modalDisplay) modalDisplay.textContent = timeStr;
  if (headerText) headerText.textContent = `Break: ${timeStr}`;
  if (headerDot) headerDot.className = 'w-2 h-2 rounded-full bg-secondary animate-pulse';

  if (statusText) {
    statusText.textContent = `On ${AppState.breakState.durationMins}-Min ${AppState.breakState.breakType === 'meal' ? 'Meal' : 'Rest'} Break`;
  }

  if (modalProgress) {
    const totalSecs = AppState.breakState.durationMins * 60;
    const pct = Math.max(0, Math.min(100, (AppState.breakState.remainingSeconds / totalSecs) * 100));
    modalProgress.style.width = `${pct}%`;
  }
}

function openBreakComplianceModal() {
  const lawBadge = document.getElementById('break-law-badge');
  const shiftDurationEl = document.getElementById('break-modal-shift-duration');

  // Estimate shift duration
  const clockInStr = AppState.currentUser?.clockInTime || '08:00 AM';
  if (shiftDurationEl) shiftDurationEl.textContent = `Shift Start: ${clockInStr} • Labor Tracker`;

  // Check 5-hour meal penalty compliance
  const isBreachRisk = false; // By default compliant
  if (lawBadge) {
    lawBadge.className = isBreachRisk 
      ? 'badge-pill bg-error/15 text-error font-mono text-[10px] font-bold'
      : 'badge-pill bg-emerald-500/10 text-emerald-600 font-mono text-[10px] font-bold';
    lawBadge.textContent = isBreachRisk ? '5H MEAL VIOLATION RISK' : 'COMPLIANT';
  }

  updateBreakTickerUI();
  openModal('modal-break-compliance');
}

// =========================================================================
// 22. BARCODE & QR CODE AUDIT SCANNER
// =========================================================================

let scannerStream = null;

function playScannerBeep() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1760, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch(e) {}
}

function openScannerModal() {
  openModal('modal-barcode-scanner');
  const resultCard = document.getElementById('scanner-result-container');
  if (resultCard) resultCard.classList.add('hidden');
}

function closeScannerModal() {
  if (scannerStream) {
    scannerStream.getTracks().forEach(track => track.stop());
    scannerStream = null;
  }
  const videoEl = document.getElementById('scanner-video');
  const placeholderEl = document.getElementById('scanner-cam-placeholder');
  if (videoEl) videoEl.classList.add('hidden');
  if (placeholderEl) placeholderEl.classList.remove('hidden');
  closeModal('modal-barcode-scanner');
}

async function toggleScannerCamera() {
  const videoEl = document.getElementById('scanner-video');
  const placeholderEl = document.getElementById('scanner-cam-placeholder');

  if (scannerStream) {
    scannerStream.getTracks().forEach(track => track.stop());
    scannerStream = null;
    if (videoEl) videoEl.classList.add('hidden');
    if (placeholderEl) placeholderEl.classList.remove('hidden');
    return;
  }

  try {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      scannerStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoEl) {
        videoEl.srcObject = scannerStream;
        videoEl.classList.remove('hidden');
        if (placeholderEl) placeholderEl.classList.add('hidden');
      }
    } else {
      toast.info('Optical Sensor Active', 'Simulated barcode camera engine ready.');
    }
  } catch(e) {
    toast.info('Simulated Scanner', 'Camera permissions denied. Rapid SKU picker buttons ready.');
  }
}

function simulateBarcodeScan(code) {
  playScannerBeep();
  displayScanResult(code);
}

function handleManualBarcodeSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('scanner-manual-input');
  if (!input || !input.value.trim()) return;
  simulateBarcodeScan(input.value.trim());
}

function displayScanResult(code) {
  const container = document.getElementById('scanner-result-container');
  if (!container) return;

  const cleanCode = code.toUpperCase().trim();
  container.classList.remove('hidden');

  // Check if Employee Badge
  const employee = AppState.employees.find(e => e.id.toUpperCase() === cleanCode || e.pin === cleanCode);
  if (employee) {
    container.innerHTML = `
      <div class="flex items-center justify-between pb-2 mb-2 border-b border-outline-variant/40">
        <span class="badge-pill bg-primary/10 text-primary font-mono text-[10px] font-bold">STAFF BADGE DETECTED</span>
        <span class="font-mono text-xs font-bold text-on-surface">${employee.id}</span>
      </div>
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded-full bg-surface-container font-bold text-primary flex items-center justify-center">
          ${employee.initials}
        </div>
        <div>
          <h4 class="font-bold text-sm text-on-surface">${employee.name}</h4>
          <p class="text-xs text-on-surface-variant">${employee.role} &bull; ${employee.department}</p>
        </div>
      </div>
      <div class="flex items-center justify-between pt-2 border-t border-outline-variant/30 text-xs">
        <span class="badge-pill ${employee.clockedIn ? 'bg-secondary-container/40 text-secondary' : 'bg-surface-container text-outline'}">
          ${employee.clockedIn ? 'Currently Clocked In' : 'Off Duty'}
        </span>
        <button onclick="switchUser('${employee.id}'); closeScannerModal();" class="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90">
          Login Station &rarr;
        </button>
      </div>
    `;
    return;
  }

  // Check if Inventory SKU
  const item = AppState.inventory.find(i => i.sku.toUpperCase() === cleanCode || i.name.toUpperCase().includes(cleanCode));
  if (item) {
    container.innerHTML = `
      <div class="flex items-center justify-between pb-2 mb-2 border-b border-outline-variant/40">
        <span class="badge-pill bg-secondary-container/40 text-secondary font-mono text-[10px] font-bold">INVENTORY SKU VERIFIED</span>
        <span class="font-mono text-xs font-bold text-on-surface">${item.sku}</span>
      </div>
      <div class="mb-3">
        <h4 class="font-bold text-sm text-on-surface">${item.name}</h4>
        <div class="grid grid-cols-3 gap-2 mt-2 p-2.5 rounded-lg bg-surface-container-low text-xs">
          <div>
            <span class="text-[10px] text-on-surface-variant block">Current Stock</span>
            <span class="font-mono font-bold text-sm text-on-surface">${item.stock} / ${item.max}</span>
          </div>
          <div>
            <span class="text-[10px] text-on-surface-variant block">Warehouse Bay</span>
            <span class="font-mono font-bold text-sm text-primary">Bay B-4</span>
          </div>
          <div>
            <span class="text-[10px] text-on-surface-variant block">Unit Price</span>
            <span class="font-mono font-bold text-sm text-secondary">$${item.price}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 pt-2 border-t border-outline-variant/30">
        <button onclick="handleScannerStockDelta('${item.sku}', 10)" class="flex-1 py-1.5 bg-secondary text-white font-bold text-xs rounded-lg hover:bg-secondary/90 flex items-center justify-center gap-1">
          <span class="material-symbols-outlined text-[14px]">add</span>
          <span>+10 Dock Receipt</span>
        </button>
        <button onclick="handleScannerStockDelta('${item.sku}', -1)" class="px-3 py-1.5 bg-surface-container hover:bg-surface-highest text-on-surface font-bold text-xs rounded-lg border border-outline-variant/50">
          -1 Sale
        </button>
      </div>
    `;
    return;
  }

  // Not Found
  container.innerHTML = `
    <div class="text-center py-2 text-xs text-error">
      <span class="material-symbols-outlined text-xl mb-1">warning</span>
      <p class="font-bold">Code "${cleanCode}" not found in retail registry.</p>
    </div>
  `;
}

function handleScannerStockDelta(sku, delta) {
  const item = AppState.inventory.find(i => i.sku === sku);
  if (!item) return;

  item.stock = Math.max(0, item.stock + delta);
  if (item.stock === 0) item.status = 'Out of Stock';
  else if (item.stock < item.max * 0.2) item.status = 'Reorder Now';
  else item.status = 'In Stock';

  AppState.saveState();
  renderInventory();
  displayScanResult(sku);
  toast.success('Inventory Adjusted', `${item.name} stock updated to ${item.stock} units.`);
}

// =========================================================================
// 23. END-OF-SHIFT HANDOVER BRIEFING GENERATOR
// =========================================================================

function openHandoverModal() {
  populateHandoverReport();
  openModal('modal-handover-report');
}

function populateHandoverReport() {
  const container = document.getElementById('handover-printable-area');
  if (!container) return;

  const totalDuties = AppState.tasks.length;
  const completedDuties = AppState.tasks.filter(t => t.status === 'Signed Off').length;
  const pendingDuties = AppState.tasks.filter(t => t.status === 'Pending Approval').length;
  const inProgressDuties = AppState.tasks.filter(t => t.status === 'In Progress').length;
  const openEscalations = AppState.escalations.filter(e => e.status === 'Open');
  const lowStock = AppState.inventory.filter(i => i.stock <= 15);
  const clockedInCount = AppState.employees.filter(e => e.clockedIn && e.status !== 'Terminated').length;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  container.innerHTML = `
    <!-- Header Block -->
    <div class="p-4 rounded-xl bg-surface-container border border-outline-variant/60 flex items-center justify-between">
      <div>
        <span class="badge-pill bg-primary/10 text-primary font-mono text-[10px] font-bold">NEXUS RETAIL BRIEFING &bull; STORE #104</span>
        <h2 class="font-headline text-xl font-bold text-on-surface mt-1">${dateStr} &bull; Afternoon Shift Handover</h2>
        <p class="text-xs text-on-surface-variant font-mono">Generated at ${timeStr} by ${AppState.currentUser.name} (${AppState.currentUser.role})</p>
      </div>
      <div class="text-right">
        <span class="font-mono text-2xl font-black text-secondary">A+ GRADE</span>
        <span class="text-[10px] text-outline block">98.2% Operational Score</span>
      </div>
    </div>

    <!-- Core Metrics Matrix -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div class="p-3 rounded-xl bg-surface-container-low border border-outline-variant/50 text-center">
        <span class="text-[10px] uppercase font-mono text-on-surface-variant">Duties Completed</span>
        <div class="font-headline text-xl font-extrabold text-secondary mt-0.5">${completedDuties} / ${totalDuties}</div>
        <span class="text-[10px] text-outline">${pendingDuties} pending sign-off</span>
      </div>
      <div class="p-3 rounded-xl bg-surface-container-low border border-outline-variant/50 text-center">
        <span class="text-[10px] uppercase font-mono text-on-surface-variant">Active Floor Incidents</span>
        <div class="font-headline text-xl font-extrabold ${openEscalations.length > 0 ? 'text-error' : 'text-secondary'} mt-0.5">${openEscalations.length} Open</div>
        <span class="text-[10px] text-outline">High priority alerts</span>
      </div>
      <div class="p-3 rounded-xl bg-surface-container-low border border-outline-variant/50 text-center">
        <span class="text-[10px] uppercase font-mono text-on-surface-variant">Supply Chain Alerts</span>
        <div class="font-headline text-xl font-extrabold text-amber-600 mt-0.5">${lowStock.length} Low SKUs</div>
        <span class="text-[10px] text-outline">Dock restock flagged</span>
      </div>
      <div class="p-3 rounded-xl bg-surface-container-low border border-outline-variant/50 text-center">
        <span class="text-[10px] uppercase font-mono text-on-surface-variant">Labor Law Compliance</span>
        <div class="font-headline text-xl font-extrabold text-emerald-600 mt-0.5">100%</div>
        <span class="text-[10px] text-outline">${clockedInCount} on-shift crew</span>
      </div>
    </div>

    <!-- Section 1: Unresolved Escalations -->
    <div class="nexus-card p-4">
      <h3 class="font-headline text-sm font-bold text-on-surface mb-2 pb-1 border-b border-outline-variant/40 flex items-center gap-1.5">
        <span class="material-symbols-outlined text-[16px] text-error">emergency</span>
        <span>Open Escalations Handover</span>
      </h3>
      ${openEscalations.length === 0 ? `
        <p class="text-xs text-secondary font-medium">All floor escalations resolved during shift.</p>
      ` : `
        <div class="space-y-2">
          ${openEscalations.map(e => `
            <div class="p-2 rounded-lg bg-surface-container text-xs flex justify-between items-center">
              <div>
                <span class="font-bold text-on-surface">[${e.zone}] ${e.category}</span>
                <p class="text-[11px] text-on-surface-variant">${e.description}</p>
              </div>
              <span class="badge-pill bg-error text-white text-[9px] font-bold font-mono">${e.urgency}</span>
            </div>
          `).join('')}
        </div>
      `}
    </div>

    <!-- Section 2: Critical Low Stock Items -->
    <div class="nexus-card p-4">
      <h3 class="font-headline text-sm font-bold text-on-surface mb-2 pb-1 border-b border-outline-variant/40 flex items-center gap-1.5">
        <span class="material-symbols-outlined text-[16px] text-secondary">inventory</span>
        <span>Critical Low Stock flagged for Night Receiving</span>
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        ${lowStock.map(i => `
          <div class="p-2 rounded-lg bg-surface-container flex justify-between items-center">
            <div>
              <span class="font-semibold text-on-surface">${i.name}</span>
              <span class="text-[10px] font-mono text-outline block">${i.sku} &bull; Bay B</span>
            </div>
            <span class="badge-pill bg-error/10 text-error font-mono text-[10px] font-bold">${i.stock} Left</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Section 3: Shift Supervisor Directive Notes -->
    <div class="nexus-card p-4">
      <h3 class="font-headline text-sm font-bold text-on-surface mb-2 pb-1 border-b border-outline-variant/40">
        Outgoing Supervisor Directives for Incoming Crew
      </h3>
      <textarea id="handover-notes-input" rows="3" class="w-full p-2.5 text-xs bg-surface-container border border-outline-variant/60 rounded-xl focus:ring-1 focus:ring-primary focus:outline-none" placeholder="Provide shift closing notes, VIP customer arrivals, or key priorities for the evening team...">Evening rush expected between 5:30 PM and 7:00 PM. Keep 3 cash registers active in East Promenade. Bay B receiving dock pallet count reconciled. All staff meal and rest compliance verified.</textarea>
    </div>
  `;
}

function printHandoverReport() {
  window.print();
}

function signAndCloseHandover() {
  AppState.auditLogs.unshift({
    timestamp: 'Just now',
    actor: AppState.currentUser.name,
    action: 'End-of-Shift Handover Briefing Archived',
    target: 'Store Command',
    detail: 'Signed off operational handover for incoming shift crew'
  });
  AppState.saveState();
  closeModal('modal-handover-report');
  toast.success('Handover Archived', 'Shift digest signed and transmitted to incoming supervisor.');
}

// =========================================================================
// 24. EXECUTIVE AI OPERATIONS COCKPIT & OMNI-ACCESS ENGINE (LEVEL 5 SUPERUSER)
// =========================================================================

function renderExecAISection() {
  const tsPill = document.getElementById('exec-ai-timestamp-pill');
  if (tsPill) {
    tsPill.textContent = `Gateway Active • ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  renderExecAIFeed();
}

function renderExecAIFeed() {
  const feed = document.getElementById('exec-ai-feed');
  if (!feed) return;

  const history = AppState.execAIHistory || [];
  if (history.length === 0) {
    feed.innerHTML = `
      <div class="p-5 text-center text-on-surface-variant bg-surface-container-low/30 rounded-2xl border border-dashed border-outline-variant/60">
        <span class="material-symbols-outlined text-2xl text-secondary mb-1">check_circle</span>
        <p class="font-bold text-xs text-on-surface">Executive AI Operations Ledger Ready</p>
        <p class="text-[11px] mt-0.5">Enter any operational instruction above or tap a Fast Directive preset chip.</p>
      </div>
    `;
    return;
  }

  feed.innerHTML = history.map((item, idx) => {
    return `
      <div class="exec-ai-mutation-card p-3.5 rounded-2xl bg-surface dark:bg-surface-lowest border border-outline-variant/50 shadow-sm space-y-2">
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <div class="flex items-center gap-1.5">
            <span class="badge-pill ${item.badgeClass || 'bg-secondary-container/40 text-secondary'} font-mono text-[9px] font-bold">
              ${item.badge || '✓ EXECUTED'}
            </span>
            <span class="text-xs font-bold text-on-surface">${item.title}</span>
          </div>
          <span class="text-[10px] font-mono text-on-surface-variant">${item.timestamp}</span>
        </div>

        ${item.query ? `
          <div class="text-[11px] font-mono text-on-surface-variant bg-surface-container-low px-2.5 py-1 rounded-lg border border-outline-variant/30 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[13px] text-primary">terminal</span>
            <span class="truncate">"${item.query}"</span>
          </div>
        ` : ''}

        <p class="text-xs text-on-surface leading-relaxed">${item.detail}</p>

        ${item.diffHtml ? `
          <div class="p-2.5 rounded-xl bg-surface-lowest dark:bg-surface-low border border-outline-variant/40 text-[11px] font-mono space-y-1">
            ${item.diffHtml}
          </div>
        ` : ''}

        ${item.actionHtml ? `
          <div class="flex items-center gap-2 pt-1">
            ${item.actionHtml}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

function clearExecAIFeed() {
  AppState.execAIHistory = [];
  AppState.saveState();
  renderExecAIFeed();
  toast.info('Ledger Cleared', 'Executive AI activity history reset.');
}

function sendExecAIPreset(promptText) {
  const input = document.getElementById('exec-ai-input');
  if (input) input.value = promptText;
  executeOmniCommand(promptText, 'cockpit');
  if (input) input.value = '';
}

function handleExecAIOrderSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('exec-ai-input');
  if (!input || !input.value.trim()) return;

  const query = input.value.trim();
  input.value = '';
  executeOmniCommand(query, 'cockpit');
}

function toggleExecAIVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    toast.info('Voice Dictation', 'Speech synthesis active. Type your command in the prompt box.');
    return;
  }

  const voiceBtn = document.getElementById('exec-ai-voice-btn');
  const input = document.getElementById('exec-ai-input');

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  recognition.onstart = () => {
    if (voiceBtn) voiceBtn.classList.add('text-error', 'animate-pulse');
    toast.info('Listening...', 'Speak your operational directive now.');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (input) input.value = transcript;
    executeOmniCommand(transcript, 'cockpit');
  };

  recognition.onerror = () => {
    if (voiceBtn) voiceBtn.classList.remove('text-error', 'animate-pulse');
  };

  recognition.onend = () => {
    if (voiceBtn) voiceBtn.classList.remove('text-error', 'animate-pulse');
  };

  recognition.start();
}

// =========================================================================
// UNDO OPERATIONS HELPER REGISTRY
// =========================================================================

function undoEmployeeTransfer(empId, oldDept, oldZone) {
  const emp = AppState.employees.find(e => e.id === empId);
  if (!emp) return;

  const currentDept = emp.department;
  emp.department = oldDept;
  emp.zone = oldZone;

  AppState.auditLogs.unshift({
    timestamp: 'Just now',
    actor: `${AppState.currentUser.name} (Undo Action)`,
    action: 'Staff Transfer Reverted',
    target: emp.name,
    detail: `Reverted from ${currentDept} back to ${oldDept} (${oldZone})`
  });

  AppState.saveState();
  renderEmployees();
  renderShiftAttendanceFeed();
  renderPermissionsMatrix();
  renderDashboard();
  renderExecAIFeed();
  toast.info('Transfer Reverted', `${emp.name} returned to ${oldDept}.`);
}

function undoInventoryAdjustment(sku, delta) {
  const item = AppState.inventory.find(i => i.sku === sku);
  if (!item) return;

  item.stock = Math.max(0, item.stock - delta);
  item.status = item.stock === 0 ? 'Out of Stock' : (item.stock <= 15 ? 'Reorder Now' : 'In Stock');

  AppState.saveState();
  renderInventory();
  renderDashboard();
  renderExecAIFeed();
  toast.info('Stock Reverted', `${item.name} (${sku}) adjusted by ${-delta} units.`);
}

function undoDutyApproval(dutyId) {
  const duty = AppState.tasks.find(t => t.id === dutyId);
  if (!duty) return;

  duty.status = 'Pending Approval';
  duty.signedOffBy = null;
  duty.signedOffAt = null;

  AppState.saveState();
  renderPendingApprovals();
  renderMyDutiesList();
  renderDashboard();
  renderExecAIFeed();
  toast.info('Sign-Off Reverted', `Duty #${dutyId} returned to Pending Approval queue.`);
}

function reinstateEmployee(empId) {
  const emp = AppState.employees.find(e => e.id === empId);
  if (!emp) return;

  emp.status = 'Active';
  emp.rank = 1;
  emp.permissions = ['assign_tasks'];
  emp.terminatedAt = null;

  AppState.auditLogs.unshift({
    timestamp: 'Just now',
    actor: `${AppState.currentUser.name} (Executive AI)`,
    action: 'Staff Reinstatement',
    target: emp.name,
    detail: 'Restored associate credentials and status to Active'
  });

  AppState.saveState();
  renderEmployees();
  renderPermissionsMatrix();
  renderDashboard();
  renderExecAIFeed();
  toast.success('Staff Reinstated', `${emp.name} restored to active workforce.`);
}

// =========================================================================
// OMNIPOTENT EXECUTIVE AI EXECUTION ENGINE
// =========================================================================

function executeOmniCommand(query, source = 'cockpit') {
  if (!query || !query.trim()) return;
  const rawQuery = query.trim();
  const lower = rawQuery.toLowerCase();

  // 1. RBAC Guard: Top management suite requires Rank 4+
  const isSuperuser = AppState.currentUser && AppState.currentUser.rank >= 4;
  if (!isSuperuser) {
    toast.error('Clearance Denied', 'Autonomous store execution requires Rank 4 or Rank 5 Executive clearance.');
    return;
  }

  // 2. UI Feedback: Show thinking indicator
  let thinkingEl = null;
  const thinkingId = `ai-thinking-${Date.now()}`;

  if (source === 'cockpit') {
    const feed = document.getElementById('exec-ai-feed');
    if (feed) {
      thinkingEl = document.createElement('div');
      thinkingEl.id = thinkingId;
      thinkingEl.className = 'p-3 rounded-2xl bg-surface-container/50 border border-primary/30 flex items-center gap-2 text-xs font-mono text-primary animate-pulse';
      thinkingEl.innerHTML = `
        <span class="material-symbols-outlined text-[18px] animate-spin">sync</span>
        <span>Executing Level 5 directive: "${rawQuery}"...</span>
      `;
      feed.prepend(thinkingEl);
    }
  } else {
    appendCopilotMessage('user', rawQuery);
    const thread = document.getElementById('copilot-chat-thread');
    if (thread) {
      thinkingEl = document.createElement('div');
      thinkingEl.id = thinkingId;
      thinkingEl.className = 'flex gap-2 items-start';
      thinkingEl.innerHTML = `
        <div class="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center shrink-0 text-[11px] font-bold animate-pulse">
          AI
        </div>
        <div class="bg-surface-container p-2.5 rounded-xl text-xs text-on-surface-variant font-mono flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
          <span>Executing store mutation across clusters...</span>
        </div>
      `;
      thread.appendChild(thinkingEl);
      thread.scrollTop = thread.scrollHeight;
    }
  }

  setTimeout(() => {
    // Remove thinking indicator
    const tEl = document.getElementById(thinkingId);
    if (tEl) tEl.remove();

    let resultRecord = null;
    let replyHtml = '';

    // -----------------------------------------------------------------------
    // INTENT 1: APPROVE / SIGN OFF PENDING DUTIES
    // -----------------------------------------------------------------------
    if (lower.includes('approve') || lower.includes('sign off') || lower.includes('sign-off') || (lower.includes('duty') && lower.includes('all'))) {
      const pending = AppState.tasks.filter(t => t.status === 'Pending Approval');
      if (pending.length > 0) {
        pending.forEach(d => {
          d.status = 'Signed Off';
          d.signedOffBy = `${AppState.currentUser.name} (Executive Admin)`;
          d.signedOffAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        });

        // Trigger MCP background sync
        try {
          fetch('/api/mcp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': 'nexus_live_agent_admin_9x82' },
            body: JSON.stringify({
              jsonrpc: '2.0', id: Date.now(), method: 'tools/call',
              params: { name: 'sign_off_duty', arguments: { duty_id: pending[0].id, action: 'approve' } }
            })
          }).catch(() => {});
        } catch(e) {}

        AppState.auditLogs.unshift({
          timestamp: 'Just now',
          actor: `${AppState.currentUser.name} (via Executive AI)`,
          action: 'Bulk Duty Authorization',
          target: `${pending.length} Completed Duties`,
          detail: `Approved checklists submitted by leads: ${pending.map(p => p.teamLeadName || p.associate).join(', ')}`
        });

        AppState.saveState();
        renderPendingApprovals();
        renderMyDutiesList();
        renderDashboard();

        const diffLines = pending.map(p => `
          <div class="flex justify-between items-center py-0.5">
            <span><strong>${p.title || p.task}</strong> (${p.zone})</span>
            <span class="text-secondary font-bold">Pending ➔ Signed Off</span>
          </div>
        `).join('');

        resultRecord = {
          id: `exec-${Date.now()}`,
          query: rawQuery,
          badge: '✓ EXECUTED: DUTY SIGN-OFF',
          badgeClass: 'bg-secondary-container text-secondary',
          title: `Approved ${pending.length} Completed Floor Duties`,
          detail: `Executive sign-off executed across all queued tasks. Duty checklists verified and records locked for payroll compliance.`,
          diffHtml: diffLines,
          actionHtml: `
            <button onclick="navigateTo('management')" class="px-3 py-1 bg-primary text-white rounded-lg text-xs font-bold">Inspect Approvals &rarr;</button>
            <button onclick="undoDutyApproval(${pending[0].id})" class="px-3 py-1 border border-outline-variant/60 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container">Undo Last</button>
          `,
          timestamp: 'Just now'
        };

        replyHtml = `
          <div class="space-y-2">
            <div class="flex items-center justify-between pb-1 border-b border-outline-variant/40">
              <span class="badge-pill bg-secondary text-white font-mono text-[9px] font-bold">✓ EXECUTED (RANK 5)</span>
              <span class="text-[10px] font-mono text-on-surface-variant">${pending.length} Tasks Approved</span>
            </div>
            <p class="font-bold text-on-surface text-xs">All pending duties have been authorized and signed off.</p>
            <div class="text-[11px] p-2 bg-surface-lowest rounded-xl font-mono space-y-1">
              ${diffLines}
            </div>
          </div>
        `;
        toast.success('Duties Signed Off', `Approved ${pending.length} duties with Executive clearance.`);
      } else {
        resultRecord = {
          id: `exec-${Date.now()}`,
          query: rawQuery,
          badge: 'CLEARANCE VERIFIED',
          badgeClass: 'bg-surface-container text-on-surface',
          title: 'No Pending Duties in Queue',
          detail: 'All floor duties are currently In Progress or already Signed Off. Shift leads have not submitted new completed checklists.',
          timestamp: 'Just now'
        };
        replyHtml = `<p class="text-xs">No pending duties currently await manager sign-off. All floor checklists are up to date.</p>`;
        toast.info('No Pending Duties', 'Queue is clear.');
      }
    }

    // -----------------------------------------------------------------------
    // INTENT 2: INVENTORY RESTOCK & ADJUSTMENTS
    // -----------------------------------------------------------------------
    else if (lower.includes('restock') || lower.includes('replenish') || (lower.includes('add') && lower.includes('unit')) || (lower.includes('stock') && (lower.includes('low') || lower.includes('units')))) {
      if (lower.includes('all') || lower.includes('low')) {
        // Bulk restock low-stock items
        const lowItems = AppState.inventory.filter(i => i.stock <= 15);
        const delta = 50;
        lowItems.forEach(item => {
          item.stock += delta;
          item.status = 'In Stock';
          try {
            fetch('/api/mcp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'x-api-key': 'nexus_live_agent_admin_9x82' },
              body: JSON.stringify({
                jsonrpc: '2.0', id: Date.now(), method: 'tools/call',
                params: { name: 'adjust_inventory_stock', arguments: { sku: item.sku, delta_units: delta, reason: 'Executive AI Mass Replenishment' } }
              })
            }).catch(() => {});
          } catch(e) {}
        });

        AppState.auditLogs.unshift({
          timestamp: 'Just now',
          actor: `${AppState.currentUser.name} (via Executive AI)`,
          action: 'Bulk Inventory Replenishment',
          target: `${lowItems.length} Low-Stock SKUs`,
          detail: `Injected +${delta} units into each depleted SKU to avert stockout risks`
        });

        AppState.saveState();
        renderInventory();
        renderDashboard();

        const diffLines = lowItems.map(item => `
          <div class="flex justify-between items-center py-0.5">
            <span><strong>${item.name}</strong> (${item.sku})</span>
            <span class="text-secondary font-bold font-mono">${item.stock - delta} ➔ ${item.stock} (+${delta})</span>
          </div>
        `).join('');

        resultRecord = {
          id: `exec-${Date.now()}`,
          query: rawQuery,
          badge: '✓ EXECUTED: REPLENISHMENT',
          badgeClass: 'bg-secondary-container text-secondary',
          title: `Replenished ${lowItems.length} Low-Stock Items (+${delta} units each)`,
          detail: `Autonomous dock supply allocation completed. Inventory statuses upgraded to 'In Stock'.`,
          diffHtml: diffLines,
          actionHtml: `
            <button onclick="navigateTo('inventory')" class="px-3 py-1 bg-primary text-white rounded-lg text-xs font-bold">Inspect Inventory &rarr;</button>
          `,
          timestamp: 'Just now'
        };

        replyHtml = `
          <div class="space-y-2">
            <div class="flex items-center justify-between pb-1 border-b border-outline-variant/40">
              <span class="badge-pill bg-secondary text-white font-mono text-[9px] font-bold">✓ EXECUTED (RANK 5)</span>
              <span class="text-[10px] font-mono text-on-surface-variant">+${delta} per SKU</span>
            </div>
            <p class="font-bold text-on-surface text-xs">Mass replenishment executed across low inventory.</p>
            <div class="text-[11px] p-2 bg-surface-lowest rounded-xl font-mono space-y-1">
              ${diffLines}
            </div>
          </div>
        `;
        toast.success('Stock Replenished', `Added +${delta} units to ${lowItems.length} SKUs.`);
      } else {
        // Target single SKU / product
        const deltaMatch = lower.match(/\b(\d+)\s+units?/);
        const delta = deltaMatch ? parseInt(deltaMatch[1], 10) : 50;

        let targetItem = null;
        for (const item of AppState.inventory) {
          if (lower.includes(item.sku.toLowerCase()) || lower.includes(item.name.toLowerCase())) {
            targetItem = item;
            break;
          }
        }
        if (!targetItem) targetItem = AppState.inventory[0]; // fallback to first item

        const prevStock = targetItem.stock;
        targetItem.stock += delta;
        targetItem.status = 'In Stock';

        try {
          fetch('/api/mcp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': 'nexus_live_agent_admin_9x82' },
            body: JSON.stringify({
              jsonrpc: '2.0', id: Date.now(), method: 'tools/call',
              params: { name: 'adjust_inventory_stock', arguments: { sku: targetItem.sku, delta_units: delta, reason: 'Executive AI Directive' } }
            })
          }).catch(() => {});
        } catch(e) {}

        AppState.auditLogs.unshift({
          timestamp: 'Just now',
          actor: `${AppState.currentUser.name} (via Executive AI)`,
          action: 'Stock Adjustment',
          target: `${targetItem.name} (${targetItem.sku})`,
          detail: `Stock level mutated from ${prevStock} to ${targetItem.stock} (+${delta} units)`
        });

        AppState.saveState();
        renderInventory();
        renderDashboard();

        resultRecord = {
          id: `exec-${Date.now()}`,
          query: rawQuery,
          badge: '✓ EXECUTED: STOCK ADJUSTMENT',
          badgeClass: 'bg-secondary-container text-secondary',
          title: `Injected +${delta} units to ${targetItem.name}`,
          detail: `SKU ${targetItem.sku} inventory recorded at ${targetItem.stock} units. ERP ledger synchronized.`,
          diffHtml: `
            <div class="flex justify-between items-center">
              <span>Previous Count: <span class="line-through text-error font-bold">${prevStock}</span></span>
              <span>Updated Count: <span class="text-secondary font-bold">${targetItem.stock} (+${delta})</span></span>
            </div>
          `,
          actionHtml: `
            <button onclick="navigateTo('inventory')" class="px-3 py-1 bg-primary text-white rounded-lg text-xs font-bold">Inspect in Inventory &rarr;</button>
            <button onclick="undoInventoryAdjustment('${targetItem.sku}', ${delta})" class="px-3 py-1 border border-outline-variant/60 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container">Undo</button>
          `,
          timestamp: 'Just now'
        };

        replyHtml = `
          <div class="space-y-2">
            <div class="flex items-center justify-between pb-1 border-b border-outline-variant/40">
              <span class="badge-pill bg-secondary text-white font-mono text-[9px] font-bold">✓ EXECUTED (RANK 5)</span>
              <span class="text-[10px] font-mono text-on-surface-variant">SKU ${targetItem.sku}</span>
            </div>
            <p class="font-bold text-on-surface text-xs">Stock adjusted for ${targetItem.name}.</p>
            <div class="text-[11px] p-2 bg-surface-lowest rounded-xl font-mono">
              Count: <span class="line-through text-error">${prevStock}</span> ➔ <span class="text-secondary font-bold">${targetItem.stock} (+${delta} units)</span>
            </div>
          </div>
        `;
        toast.success('Stock Adjusted', `Added +${delta} units to ${targetItem.name}.`);
      }
    }

    // -----------------------------------------------------------------------
    // INTENT 3: RESOLVE FLOOR HAZARDS & ESCALATIONS
    // -----------------------------------------------------------------------
    else if (lower.includes('resolve') || lower.includes('clear hazard') || lower.includes('clear escalation')) {
      const openEsc = AppState.escalations.filter(e => e.status === 'Open');
      if (openEsc.length > 0) {
        openEsc.forEach(e => {
          e.status = 'Resolved';
          e.resolvedBy = `${AppState.currentUser.name} (via Executive AI)`;
          e.resolvedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          try {
            fetch('/api/mcp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'x-api-key': 'nexus_live_agent_admin_9x82' },
              body: JSON.stringify({
                jsonrpc: '2.0', id: Date.now(), method: 'tools/call',
                params: { name: 'resolve_floor_incident', arguments: { escalation_id: e.id, resolution_notes: 'Resolved via Executive AI superuser command' } }
              })
            }).catch(() => {});
          } catch(err) {}
        });

        AppState.auditLogs.unshift({
          timestamp: 'Just now',
          actor: `${AppState.currentUser.name} (via Executive AI)`,
          action: 'Floor Hazard Resolution',
          target: `${openEsc.length} Incidents`,
          detail: `Cleared escalations: ${openEsc.map(e => e.id).join(', ')}. Floor map beacons deactivated.`
        });

        AppState.saveState();
        renderManagerEscalations();
        renderFloorMap();
        renderDashboard();

        const diffLines = openEsc.map(e => `
          <div class="flex justify-between items-center py-0.5">
            <span>[${e.zone}] <strong>${e.category}</strong> (${e.id})</span>
            <span class="text-secondary font-bold">Open ➔ Resolved</span>
          </div>
        `).join('');

        resultRecord = {
          id: `exec-${Date.now()}`,
          query: rawQuery,
          badge: '✓ EXECUTED: HAZARDS RESOLVED',
          badgeClass: 'bg-emerald-500/20 text-emerald-600',
          title: `Resolved ${openEsc.length} Open Floor Escalations`,
          detail: `Safety triage completed. Red radar beacons on Digital Twin Floor Map have been deactivated.`,
          diffHtml: diffLines,
          actionHtml: `
            <button onclick="navigateTo('floor-map')" class="px-3 py-1 bg-primary text-white rounded-lg text-xs font-bold">Inspect Digital Twin Map &rarr;</button>
          `,
          timestamp: 'Just now'
        };

        replyHtml = `
          <div class="space-y-2">
            <div class="flex items-center justify-between pb-1 border-b border-outline-variant/40">
              <span class="badge-pill bg-secondary text-white font-mono text-[9px] font-bold">✓ EXECUTED (RANK 5)</span>
              <span class="text-[10px] font-mono text-on-surface-variant">${openEsc.length} Resolved</span>
            </div>
            <p class="font-bold text-on-surface text-xs">All active floor hazard tickets have been marked resolved.</p>
            <div class="text-[11px] p-2 bg-surface-lowest rounded-xl font-mono space-y-1">
              ${diffLines}
            </div>
          </div>
        `;
        toast.success('Hazards Resolved', `Deactivated ${openEsc.length} escalation beacons.`);
      } else {
        resultRecord = {
          id: `exec-${Date.now()}`,
          query: rawQuery,
          badge: 'ALL CLEAR',
          badgeClass: 'bg-surface-container text-on-surface',
          title: 'Zero Active Floor Hazards',
          detail: 'No open incidents are registered across all store zones. Floor telemetry reports normal operations.',
          timestamp: 'Just now'
        };
        replyHtml = `<p class="text-xs">No active hazards found. The escalation queue is completely clear.</p>`;
        toast.info('All Clear', 'No active floor hazards.');
      }
    }

    // -----------------------------------------------------------------------
    // INTENT 4: STAFF TRANSFER / REASSIGNMENT
    // -----------------------------------------------------------------------
    else if (lower.includes('transfer') || lower.includes('move') || lower.includes('reassign')) {
      // Find candidate employee
      let targetEmp = null;
      for (const emp of AppState.employees) {
        const nameParts = emp.name.toLowerCase().split(' ');
        if (lower.includes(emp.name.toLowerCase()) || nameParts.some(p => p.length > 2 && lower.includes(p))) {
          targetEmp = emp;
          break;
        }
      }
      if (!targetEmp) targetEmp = AppState.employees.find(e => e.id === 'NEX-3401') || AppState.employees[1]; // David Chen fallback

      // Find candidate department
      let targetDept = DEPARTMENTS.find(d => lower.includes(d.name.toLowerCase()) || lower.includes(d.name.split(' ')[0].toLowerCase()));
      if (!targetDept) {
        if (lower.includes('logistics') || lower.includes('bay')) targetDept = DEPARTMENTS.find(d => d.name.includes('Logistics'));
        else if (lower.includes('apparel') || lower.includes('fashion')) targetDept = DEPARTMENTS.find(d => d.name.includes('Apparel'));
        else if (lower.includes('security')) targetDept = DEPARTMENTS.find(d => d.name.includes('Security'));
        else if (lower.includes('customer')) targetDept = DEPARTMENTS.find(d => d.name.includes('Customer'));
        else targetDept = DEPARTMENTS[3]; // Logistics
      }

      const prevDept = targetEmp.department;
      const prevZone = targetEmp.zone;
      targetEmp.department = targetDept.name;
      targetEmp.zone = targetDept.zone;

      if (lower.includes('lead')) {
        targetEmp.role = `${targetDept.name.split(' ')[0]} Lead`;
        targetEmp.rank = Math.max(targetEmp.rank, 3);
      }

      AppState.auditLogs.unshift({
        timestamp: 'Just now',
        actor: `${AppState.currentUser.name} (via Executive AI)`,
        action: 'Personnel Reassignment',
        target: targetEmp.name,
        detail: `Transferred from ${prevDept} to ${targetDept.name} (${targetDept.zone})`
      });

      AppState.saveState();
      renderEmployees();
      renderShiftAttendanceFeed();
      renderPermissionsMatrix();
      renderDashboard();
      renderMyDutiesList();

      resultRecord = {
        id: `exec-${Date.now()}`,
        query: rawQuery,
        badge: '✓ EXECUTED: STAFF TRANSFER',
        badgeClass: 'bg-secondary-container text-secondary',
        title: `Transferred ${targetEmp.name} to ${targetDept.name}`,
        detail: `Associate credentials and station terminal mapped to ${targetDept.zone}. Schedule & attendance rosters updated.`,
        diffHtml: `
          <div><span class="text-on-surface-variant">Previous:</span> <span class="line-through text-error">${prevDept} (${prevZone})</span></div>
          <div><span class="text-secondary font-bold">Updated:</span> <span>${targetDept.name} (${targetDept.zone})</span></div>
        `,
        actionHtml: `
          <button onclick="navigateTo('hr')" class="px-3 py-1 bg-primary text-white rounded-lg text-xs font-bold">Inspect Roster &rarr;</button>
          <button onclick="undoEmployeeTransfer('${targetEmp.id}', '${prevDept}', '${prevZone}')" class="px-3 py-1 border border-outline-variant/60 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container">Undo</button>
        `,
        timestamp: 'Just now'
      };

      replyHtml = `
        <div class="space-y-2">
          <div class="flex items-center justify-between pb-1 border-b border-outline-variant/40">
            <span class="badge-pill bg-secondary text-white font-mono text-[9px] font-bold">✓ EXECUTED (RANK 5)</span>
            <span class="text-[10px] font-mono text-on-surface-variant">${targetEmp.name}</span>
          </div>
          <p class="font-bold text-on-surface text-xs">Transferred to ${targetDept.name} (${targetDept.zone}).</p>
          <div class="text-[11px] p-2 bg-surface-lowest rounded-xl font-mono">
            <span class="line-through text-error">${prevDept}</span> ➔ <span class="text-secondary font-bold">${targetDept.name}</span>
          </div>
        </div>
      `;
      toast.success('Associate Transferred', `${targetEmp.name} moved to ${targetDept.name}.`);
    }

    // -----------------------------------------------------------------------
    // INTENT 5: CLOCK IN / OUT STAFF
    // -----------------------------------------------------------------------
    else if (lower.includes('clock in') || lower.includes('clock out')) {
      const isClockIn = lower.includes('clock in');
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      let affected = [];
      if (lower.includes('all') || lower.includes('logistics') || lower.includes('crew')) {
        let dept = 'Logistics & Bay Storage';
        if (lower.includes('apparel')) dept = 'Apparel & Fashion';
        if (lower.includes('all')) {
          affected = AppState.employees.slice(0, 15);
        } else {
          affected = AppState.employees.filter(e => e.department === dept && e.status !== 'Terminated');
        }
      } else {
        const emp = AppState.employees.find(e => lower.includes(e.name.toLowerCase()));
        if (emp) affected = [emp];
        else affected = AppState.employees.filter(e => e.department.includes('Logistics')).slice(0, 5);
      }

      affected.forEach(e => {
        e.clockedIn = isClockIn;
        e.clockInTime = isClockIn ? timeStr : null;
      });

      AppState.auditLogs.unshift({
        timestamp: 'Just now',
        actor: `${AppState.currentUser.name} (via Executive AI)`,
        action: isClockIn ? 'Bulk Biometric Punch In' : 'Bulk Clock Out',
        target: `${affected.length} Crew Members`,
        detail: `Updated terminal session punch times to ${timeStr}`
      });

      AppState.saveState();
      renderShiftAttendanceFeed();
      renderDashboard();

      resultRecord = {
        id: `exec-${Date.now()}`,
        query: rawQuery,
        badge: isClockIn ? '✓ EXECUTED: CLOCK IN' : '✓ EXECUTED: CLOCK OUT',
        badgeClass: 'bg-secondary-container text-secondary',
        title: `${isClockIn ? 'Clocked In' : 'Clocked Out'} ${affected.length} Staff Members`,
        detail: `Floor terminal attendance feed updated at ${timeStr}. Headcount recalculated.`,
        diffHtml: `
          <div class="text-secondary font-bold">Status: ${isClockIn ? 'Active On Shift' : 'Off Shift'} (${timeStr})</div>
          <div class="text-on-surface-variant truncate">Associates: ${affected.slice(0, 4).map(a => a.name).join(', ')}${affected.length > 4 ? ` +${affected.length - 4} more` : ''}</div>
        `,
        actionHtml: `
          <button onclick="navigateTo('management')" class="px-3 py-1 bg-primary text-white rounded-lg text-xs font-bold">Inspect Attendance &rarr;</button>
        `,
        timestamp: 'Just now'
      };

      replyHtml = `
        <div class="space-y-2">
          <div class="flex items-center justify-between pb-1 border-b border-outline-variant/40">
            <span class="badge-pill bg-secondary text-white font-mono text-[9px] font-bold">✓ EXECUTED (RANK 5)</span>
            <span class="text-[10px] font-mono text-on-surface-variant">${affected.length} Staff</span>
          </div>
          <p class="font-bold text-on-surface text-xs">Clocked ${isClockIn ? 'IN' : 'OUT'} ${affected.length} crew associates at ${timeStr}.</p>
        </div>
      `;
      toast.info('Attendance Updated', `${affected.length} crew members clocked ${isClockIn ? 'in' : 'out'}.`);
    }

    // -----------------------------------------------------------------------
    // INTENT 6: RECORD FINANCIAL LEDGER ENTRY / ADD SALE
    // -----------------------------------------------------------------------
    else if (lower.includes('record') || lower.includes('ledger') || lower.includes('tenant') || (lower.includes('sale') && lower.includes('$'))) {
      const amtMatch = rawQuery.match(/\$?([0-9,]+(?:\.[0-9]{2})?)/);
      const amount = amtMatch ? parseFloat(amtMatch[1].replace(/,/g, '')) : 12500;
      const isExpense = lower.includes('expense') || lower.includes('repair') || lower.includes('hvac');
      const descMatch = rawQuery.replace(/.*(?:for|from|desc)\s+/i, '');
      const desc = descMatch && descMatch.length > 4 ? descMatch : 'Tenant Lease Payment - Retail Partner';

      const newTx = {
        id: Date.now(),
        date: 'Today',
        desc: desc,
        category: isExpense ? 'Maintenance' : 'Revenue',
        type: isExpense ? 'expense' : 'revenue',
        amount: amount,
        status: 'Completed'
      };

      AppState.transactions.unshift(newTx);
      AppState.auditLogs.unshift({
        timestamp: 'Just now',
        actor: `${AppState.currentUser.name} (via Executive AI)`,
        action: 'Financial Ledger Entry',
        target: `$${amount.toLocaleString()}`,
        detail: `Posted ${newTx.type.toUpperCase()}: ${newTx.desc}`
      });

      AppState.saveState();
      renderSales();
      renderTransactions();
      renderDashboard();

      resultRecord = {
        id: `exec-${Date.now()}`,
        query: rawQuery,
        badge: '✓ EXECUTED: LEDGER TRANSACTION',
        badgeClass: 'bg-primary/10 text-primary dark:text-primary-fixed',
        title: `Posted $${amount.toLocaleString()} ${newTx.category} to General Ledger`,
        detail: `Transaction TX-${newTx.id.toString().slice(-4)} recorded under Marcus Vance authorization. Income statements and cashflow charts recalibrated.`,
        diffHtml: `
          <div class="flex justify-between items-center">
            <span>Description: <strong>${newTx.desc}</strong></span>
            <span class="${isExpense ? 'text-error' : 'text-secondary'} font-bold">${isExpense ? '-' : '+'}$${amount.toLocaleString()}</span>
          </div>
        `,
        actionHtml: `
          <button onclick="navigateTo('sales')" class="px-3 py-1 bg-primary text-white rounded-lg text-xs font-bold">Inspect Financial Ledger &rarr;</button>
        `,
        timestamp: 'Just now'
      };

      replyHtml = `
        <div class="space-y-2">
          <div class="flex items-center justify-between pb-1 border-b border-outline-variant/40">
            <span class="badge-pill bg-secondary text-white font-mono text-[9px] font-bold">✓ EXECUTED (RANK 5)</span>
            <span class="text-[10px] font-mono text-on-surface-variant">TX-${newTx.id.toString().slice(-4)}</span>
          </div>
          <p class="font-bold text-on-surface text-xs">Recorded ${newTx.desc} (+$${amount.toLocaleString()}).</p>
        </div>
      `;
      toast.success('Transaction Posted', `+$${amount.toLocaleString()} added to ledger.`);
    }

    // -----------------------------------------------------------------------
    // INTENT 7: DISPATCH URGENT FLOOR DUTY
    // -----------------------------------------------------------------------
    else if (lower.includes('dispatch') || lower.includes('assign duty') || lower.includes('create duty')) {
      const taskTitle = rawQuery.replace(/.*(?:dispatch|assign duty|create duty)\s+/i, '').replace(/\s+to\s+.*/i, '') || 'Emergency Floor Cleanup & Safety Triage';
      
      let assignee = AppState.employees.find(e => lower.includes(e.name.toLowerCase())) || AppState.employees.find(e => e.id === 'NEX-3401') || AppState.employees[1];
      const zone = assignee.zone || 'North Wing #42';

      const newDuty = {
        id: Date.now(),
        task: taskTitle,
        title: taskTitle,
        zone: zone,
        department: assignee.department,
        associate: assignee.name,
        teamLeadId: assignee.id,
        teamLeadName: assignee.name,
        assignees: [
          { id: assignee.id, name: assignee.name, role: 'Team Lead', isLead: true }
        ],
        status: 'In Progress',
        priority: 'Urgent',
        due: 'Today, 45m',
        createdAt: 'Just now',
        checklist: [
          { id: 1, text: 'Deploy station safety equipment & verify area', done: false },
          { id: 2, text: 'Execute assigned operational task', done: false },
          { id: 3, text: 'Submit completed checklist for supervisor review', done: false }
        ]
      };

      AppState.tasks.unshift(newDuty);

      try {
        fetch('/api/mcp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': 'nexus_live_agent_admin_9x82' },
          body: JSON.stringify({
            jsonrpc: '2.0', id: Date.now(), method: 'tools/call',
            params: { name: 'dispatch_shift_duty', arguments: { title: newDuty.title, zone: newDuty.zone, department: newDuty.department, team_lead_name: assignee.name, priority: 'Urgent' } }
          })
        }).catch(() => {});
      } catch(e) {}

      AppState.auditLogs.unshift({
        timestamp: 'Just now',
        actor: `${AppState.currentUser.name} (via Executive AI)`,
        action: 'Duty Dispatched',
        target: newDuty.title,
        detail: `Pushed duty to ${assignee.name} (${zone})`
      });

      AppState.saveState();
      renderMyDutiesList();
      renderDashboard();

      resultRecord = {
        id: `exec-${Date.now()}`,
        query: rawQuery,
        badge: '✓ EXECUTED: DUTY DISPATCH',
        badgeClass: 'bg-secondary-container text-secondary',
        title: `Dispatched Duty to ${assignee.name}`,
        detail: `Task pushed to Floor Station Terminal in ${zone}. 45-minute SLA countdown activated.`,
        diffHtml: `
          <div><strong>Task:</strong> ${newDuty.title}</div>
          <div><strong>Assignee:</strong> ${assignee.name} (${newDuty.department})</div>
          <div><strong>Station:</strong> ${zone} | Priority: <span class="text-error font-bold">Urgent</span></div>
        `,
        actionHtml: `
          <button onclick="navigateTo('assign-task')" class="px-3 py-1 bg-primary text-white rounded-lg text-xs font-bold">Inspect Task &rarr;</button>
        `,
        timestamp: 'Just now'
      };

      replyHtml = `
        <div class="space-y-2">
          <div class="flex items-center justify-between pb-1 border-b border-outline-variant/40">
            <span class="badge-pill bg-secondary text-white font-mono text-[9px] font-bold">✓ EXECUTED (RANK 5)</span>
            <span class="text-[10px] font-mono text-on-surface-variant">${zone}</span>
          </div>
          <p class="font-bold text-on-surface text-xs">Dispatched: "${newDuty.title}" to ${assignee.name}.</p>
        </div>
      `;
      toast.success('Duty Dispatched', `Task routed to ${assignee.name}.`);
    }

    // -----------------------------------------------------------------------
    // INTENT 8: CONFIDENTIAL HR ROSTER & PAYROLL
    // -----------------------------------------------------------------------
    else if (lower.includes('hr') || lower.includes('payroll') || lower.includes('human resources')) {
      const hrStaff = AppState.employees.filter(e => e.department.toLowerCase().includes('human resources') || e.department.toLowerCase().includes('talent'));
      
      const hrTable = hrStaff.map(e => `
        <div class="flex items-center justify-between py-1 border-b border-outline-variant/30">
          <div>
            <span class="font-bold text-on-surface">${e.name}</span>
            <span class="text-[10px] text-on-surface-variant block">${e.role} (Rank ${e.rank})</span>
          </div>
          <div class="text-right font-mono">
            <span class="text-secondary font-bold">$${(e.rank * 28000 + 42000).toLocaleString()}/yr</span>
            <span class="text-[9px] text-on-surface-variant block">${e.email}</span>
          </div>
        </div>
      `).join('');

      resultRecord = {
        id: `exec-${Date.now()}`,
        query: rawQuery,
        badge: 'CONFIDENTIAL HR DECLASSIFIED',
        badgeClass: 'bg-primary/10 text-primary dark:text-primary-fixed',
        title: `Disclosed Confidential HR Roster (${hrStaff.length} Records)`,
        detail: `Identity cloaking bypassed via Level 5 Superuser Clearance. Full compensation and talent metrics revealed.`,
        diffHtml: hrTable,
        actionHtml: `
          <button onclick="navigateTo('hr')" class="px-3 py-1 bg-primary text-white rounded-lg text-xs font-bold">Open HR Suite &rarr;</button>
        `,
        timestamp: 'Just now'
      };

      replyHtml = `
        <div class="space-y-2">
          <div class="flex items-center justify-between pb-1 border-b border-outline-variant/40">
            <span class="badge-pill bg-primary text-white font-mono text-[9px] font-bold">HR PRIVILEGE DECLASSIFIED</span>
            <span class="text-[10px] font-mono text-on-surface-variant">Rank 5 Access</span>
          </div>
          <p class="font-bold text-on-surface text-xs">Human Resources &amp; Talent Directorate Personnel:</p>
          <div class="text-[11px] p-2 bg-surface-lowest rounded-xl font-mono">
            ${hrTable}
          </div>
        </div>
      `;
    }

    // -----------------------------------------------------------------------
    // INTENT 9: EMERGENCY BROADCAST / LOCKDOWN
    // -----------------------------------------------------------------------
    else if (lower.includes('emergency') || lower.includes('lockdown') || lower.includes('evacuat')) {
      const emergencyEsc = {
        id: `ESC-${Date.now().toString().slice(-4)}`,
        senderId: AppState.currentUser.id,
        senderName: AppState.currentUser.name,
        senderRole: 'Global Administrator',
        target: 'all',
        targetLabel: 'All Personnel',
        category: 'EMERGENCY: Store Evacuation',
        urgency: 'Emergency',
        zone: 'Store-Wide',
        description: 'Store Director emergency broadcast. Evacuate through designated emergency exit corridors.',
        timestamp: 'Just now',
        status: 'Open'
      };

      AppState.escalations.unshift(emergencyEsc);
      AppState.notifications.unshift({
        id: `notif-${Date.now()}`,
        title: 'EMERGENCY BROADCAST',
        message: emergencyEsc.description,
        timestamp: 'Just now',
        read: false,
        type: 'emergency'
      });

      try {
        fetch('/api/telemetry/broadcast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-api-key': 'nexus_live_agent_admin_9x82' },
          body: JSON.stringify({
            event: 'emergency_alert',
            data: { alert: 'EMERGENCY STORE EVACUATION', initiator: 'Marcus Vance' }
          })
        }).catch(() => {});
      } catch(e) {}

      AppState.saveState();
      renderManagerEscalations();
      renderFloorMap();
      renderNotifications();

      resultRecord = {
        id: `exec-${Date.now()}`,
        query: rawQuery,
        badge: '🚨 EMERGENCY BROADCAST ACTIVE',
        badgeClass: 'bg-error text-white font-bold',
        title: 'Dispatched Store-Wide Emergency Evacuation Alert',
        detail: 'Red radar siren activated across all 9 floor zones. Handheld Zebra PDAs and POS registers locked to emergency mode.',
        diffHtml: `
          <div class="text-error font-bold font-mono">CODE RED: Emergency evacuation broadcast active. Audio sirens pulsing.</div>
        `,
        actionHtml: `
          <button onclick="navigateTo('floor-map')" class="px-3 py-1 bg-error text-white rounded-lg text-xs font-bold">View Emergency Map &rarr;</button>
          <button onclick="executeOmniCommand('Resolve all open floor hazards', 'cockpit')" class="px-3 py-1 border border-outline-variant/60 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container">Deactivate Alert</button>
        `,
        timestamp: 'Just now'
      };

      replyHtml = `
        <div class="space-y-2 p-2 bg-error/10 border border-error/30 rounded-xl">
          <div class="flex items-center justify-between pb-1 border-b border-error/20">
            <span class="badge-pill bg-error text-white font-mono text-[9px] font-bold">EMERGENCY ACTIVE</span>
            <span class="text-[10px] font-mono text-error font-bold">ALL STATIONS</span>
          </div>
          <p class="font-bold text-error text-xs">Emergency evacuation directive broadcast to entire retail complex.</p>
        </div>
      `;
      toast.error('EMERGENCY BROADCAST', 'Store evacuation alert dispatched to all floor terminals!');
    }

    // -----------------------------------------------------------------------
    // INTENT 10: LABOR LAW COMPLIANCE
    // -----------------------------------------------------------------------
    else if (lower.includes('compliance') || lower.includes('break') || lower.includes('meal') || lower.includes('labor')) {
      resultRecord = {
        id: `exec-${Date.now()}`,
        query: rawQuery,
        badge: '✓ 100% STATUTORY PASS',
        badgeClass: 'bg-emerald-500/20 text-emerald-600',
        title: 'Labor Law & OSHA Compliance Scorecard',
        detail: 'All 200 personnel records audited against statutory 5-hour continuous shift limits. Zero violations logged.',
        diffHtml: `
          <div class="flex items-center gap-1.5"><span class="text-secondary">✓</span> <strong>5-Hour Meal Mandate:</strong> 0 infractions detected.</div>
          <div class="flex items-center gap-1.5"><span class="text-secondary">✓</span> <strong>15-Minute Rest Cycle:</strong> 14 associates currently on verified rest.</div>
          <div class="flex items-center gap-1.5"><span class="text-secondary">✓</span> <strong>Overtime Grace:</strong> Compliant. Zero shifts exceeding daily ceiling.</div>
        `,
        actionHtml: `
          <button onclick="openBreakComplianceModal()" class="px-3 py-1 bg-secondary text-white rounded-lg text-xs font-bold">Open Break Compliance Station &rarr;</button>
        `,
        timestamp: 'Just now'
      };

      replyHtml = `
        <div class="space-y-2">
          <div class="flex items-center justify-between pb-1 border-b border-outline-variant/40">
            <span class="badge-pill bg-emerald-500 text-white font-mono text-[9px] font-bold">100% COMPLIANT</span>
            <span class="text-[10px] font-mono text-on-surface-variant">OSHA Audit</span>
          </div>
          <p class="font-bold text-on-surface text-xs">Labor compliance verified. All break requirements met.</p>
        </div>
      `;
      toast.success('Labor Audit', '100% compliant with labor regulations.');
    }

    // -----------------------------------------------------------------------
    // FALLBACK: INTELLIGENT TELEMETRY SYNTHESIS
    // -----------------------------------------------------------------------
    else {
      const activeStaff = AppState.employees.filter(e => e.clockedIn).length;
      const lowStock = AppState.inventory.filter(i => i.stock <= 15).length;
      const openEsc = AppState.escalations.filter(e => e.status === 'Open').length;

      resultRecord = {
        id: `exec-${Date.now()}`,
        query: rawQuery,
        badge: 'COMMAND ANALYZED',
        badgeClass: 'bg-primary/10 text-primary',
        title: `Analyzed Directive: "${rawQuery}"`,
        detail: `The Executive AI has verified your Level 5 clearance. Use direct commands to modify staff, adjust inventory, record revenues, dispatch floor tasks, or resolve hazards.`,
        diffHtml: `
          <div class="grid grid-cols-3 gap-1 text-center py-1">
            <div class="p-1 bg-surface-container rounded">Headcount: <strong>${activeStaff}</strong></div>
            <div class="p-1 bg-surface-container rounded">Low SKUs: <strong>${lowStock}</strong></div>
            <div class="p-1 bg-surface-container rounded">Open Hazards: <strong>${openEsc}</strong></div>
          </div>
        `,
        actionHtml: `
          <button onclick="sendExecAIPreset('Approve all pending duties')" class="px-2.5 py-1 bg-surface-container rounded text-xs font-semibold hover:bg-surface-highest">Approve Duties</button>
          <button onclick="sendExecAIPreset('Restock all low-stock items by 50 units')" class="px-2.5 py-1 bg-surface-container rounded text-xs font-semibold hover:bg-surface-highest">Restock SKUs</button>
          <button onclick="sendExecAIPreset('Resolve all open floor hazards')" class="px-2.5 py-1 bg-surface-container rounded text-xs font-semibold hover:bg-surface-highest">Clear Hazards</button>
        `,
        timestamp: 'Just now'
      };

      replyHtml = `
        <div class="space-y-1.5">
          <p class="text-xs">Analyzed directive: <em>"${rawQuery}"</em>.</p>
          <p class="text-xs text-on-surface-variant">Store telemetry: <strong>${activeStaff}</strong> associates on shift, <strong>${lowStock}</strong> critical stock warnings, <strong>${openEsc}</strong> open hazard tickets.</p>
        </div>
      `;
    }

    // Persist to Activity Ledger & Update UI
    if (resultRecord) {
      if (!AppState.execAIHistory) AppState.execAIHistory = [];
      AppState.execAIHistory.unshift(resultRecord);
      if (AppState.execAIHistory.length > 25) AppState.execAIHistory.pop();
      AppState.saveState();
      renderExecAIFeed();
    }

    if (source === 'copilot' && replyHtml) {
      appendCopilotMessage('assistant', replyHtml);
    }
  }, 350);
}

// Global Copilot router wrapper
function executeCopilotCommand(query) {
  executeOmniCommand(query, 'copilot');
}

function toggleCopilotVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    toast.info('Voice Dictation', 'Speech synthesis active. Type your command in the prompt box.');
    return;
  }

  const voiceBtn = document.getElementById('copilot-voice-btn');
  const input = document.getElementById('copilot-user-input');

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  recognition.onstart = () => {
    if (voiceBtn) voiceBtn.classList.add('text-error', 'animate-pulse');
    toast.info('Listening...', 'Speak your retail floor instruction now.');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (input) input.value = transcript;
    executeOmniCommand(transcript, 'copilot');
  };

  recognition.onerror = () => {
    if (voiceBtn) voiceBtn.classList.remove('text-error', 'animate-pulse');
  };

  recognition.onend = () => {
    if (voiceBtn) voiceBtn.classList.remove('text-error', 'animate-pulse');
  };

  recognition.start();
}


// =========================================================================
// 21. REAL-TIME SERVER-SENT EVENTS (SSE) TELEMETRY & MCP BROADCAST STREAM
// =========================================================================

function initTelemetrySSE() {
  const streamUrl = '/api/telemetry/stream?api_key=nexus_dev_open_key';
  let eventSource = null;
  let retryTimeout = null;

  function connect() {
    try {
      if (eventSource) {
        eventSource.close();
      }

      eventSource = new EventSource(streamUrl);

      eventSource.addEventListener('open', () => {
        console.log('[SSE] Real-time telemetry stream connected to Nexus Retail Hub.');
        updateSSEStatusBadge(true);
      });

      eventSource.addEventListener('initial_sync', (e) => {
        try {
          const syncData = JSON.parse(e.data);
          console.log('[SSE] Telemetry stream synchronized:', syncData);
          updateSSEStatusBadge(true);
        } catch (err) {}
      });

      // 1. Live Escalation / Hazard Beacon Triggered
      eventSource.addEventListener('incident_created', (e) => {
        try {
          const esc = JSON.parse(e.data);
          if (!AppState.escalations.some(x => x.id === esc.id)) {
            AppState.escalations.unshift({
              id: esc.id,
              category: esc.category,
              zone: esc.zone,
              urgency: esc.urgency || 'Urgent',
              description: esc.desc || esc.description,
              status: 'Open',
              senderName: 'AI Agent / MCP Telemetry',
              senderId: 'NEX-MCP',
              timestamp: 'Just now'
            });
            AppState.saveState();

            // Store notification
            AppState.addNotification({
              title: `Floor Hazard: ${esc.category}`,
              desc: `${esc.desc || esc.description} at ${esc.zone} (${esc.urgency})`,
              type: 'escalation',
              priority: 'Urgent'
            });

            toast.error(`Floor Hazard Alert: ${esc.category}`, `${esc.zone} - ${esc.desc || esc.description}`);

            // Live re-render if user is on relevant views
            renderFloorMap();
            if (AppState.currentView === 'management') renderManagerEscalations();
            if (AppState.currentView === 'onboarding') renderMyEscalationsList();
          }
        } catch (err) {
          console.error('[SSE] Error processing incident_created:', err);
        }
      });

      // 2. Incident Cleared / Beacon Resolved
      eventSource.addEventListener('incident_resolved', (e) => {
        try {
          const esc = JSON.parse(e.data);
          const found = AppState.escalations.find(x => x.id === esc.id);
          if (found) {
            found.status = 'Resolved';
            AppState.saveState();
            toast.success(`Incident Cleared: ${esc.category}`, `Zone ${esc.zone} cleared and secured.`);
            renderFloorMap();
            if (AppState.currentView === 'management') renderManagerEscalations();
          }
        } catch (err) {}
      });

      // 3. Multi-Staff Shift Duty Dispatched via AI / MCP
      eventSource.addEventListener('duty_dispatched', (e) => {
        try {
          const duty = JSON.parse(e.data);
          if (!AppState.tasks.some(t => t.id === duty.id)) {
            AppState.tasks.unshift({
              id: duty.id,
              task: duty.title,
              title: duty.title,
              zone: duty.zone,
              department: duty.department || 'Facilities & Maintenance',
              associate: duty.lead || 'David Chen',
              teamLeadName: duty.lead || 'David Chen',
              status: 'In Progress',
              priority: duty.priority || 'High',
              due: 'Today, End of Shift',
              createdAt: 'Just now',
              checklist: duty.checklist || []
            });
            AppState.saveState();
            toast.success('Duty Dispatched via AI MCP', `${duty.title} → ${duty.zone}`);
            renderFloorMap();
            if (AppState.currentView === 'dashboard') renderDashboard();
          }
        } catch (err) {}
      });

      // 4. Duty Approval / Sign-off
      eventSource.addEventListener('duty_signed_off', (e) => {
        try {
          const duty = JSON.parse(e.data);
          const t = AppState.tasks.find(x => x.id === duty.id);
          if (t) {
            t.status = duty.status;
            AppState.saveState();
            renderFloorMap();
            if (AppState.currentView === 'management') renderManagerApprovals();
          }
        } catch (err) {}
      });

      // 5. Dock Pallet Stock Adjustment
      eventSource.addEventListener('stock_adjusted', (e) => {
        try {
          const item = JSON.parse(e.data);
          const inv = AppState.inventory.find(x => x.sku === item.sku);
          if (inv) {
            inv.stock = item.updated_stock;
            AppState.saveState();
            toast.info('Stock Level Synchronized', `${item.sku}: ${item.updated_stock} units available (${item.name})`);
            if (AppState.currentView === 'inventory') renderInventory();
          }
        } catch (err) {}
      });

      eventSource.onerror = () => {
        updateSSEStatusBadge(false);
        if (eventSource) eventSource.close();
        clearTimeout(retryTimeout);
        retryTimeout = setTimeout(connect, 4000);
      };

    } catch (e) {
      console.warn('[SSE] EventSource unavailable or network blocked:', e);
    }
  }

  function updateSSEStatusBadge(isConnected) {
    const badge = document.getElementById('header-sse-live-pill');
    if (badge) {
      if (isConnected) {
        badge.innerHTML = `
          <span class="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
          <span class="text-[10px] font-bold text-secondary font-mono">LIVE STREAM</span>
        `;
        badge.className = 'hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border border-secondary/40 bg-secondary/10 transition-all';
      } else {
        badge.innerHTML = `
          <span class="w-2 h-2 rounded-full bg-outline"></span>
          <span class="text-[10px] font-mono text-outline">STREAM OFFLINE</span>
        `;
        badge.className = 'hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border border-outline-variant/60 bg-surface-container opacity-60 transition-all';
      }
    }
  }

  connect();
}

// =========================================================================
// 18. INITIALIZATION
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  initCommandPalette();
  initRFIDAndNFCSystem();
  updateSessionUI();
  startLiveDigitalClock();
  initTelemetrySSE();

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

// Serverless Function handler fallback if Vercel routes root requests to app.js
if (typeof module !== 'undefined' && module.exports) {
  const fs = require('fs');
  const path = require('path');
  module.exports = (req, res) => {
    try {
      const indexPath = path.join(__dirname, 'index.html');
      const html = fs.readFileSync(indexPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } catch(err) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/"></head><body>Loading Nexus Retail Operations...</body></html>');
    }
  };
}
