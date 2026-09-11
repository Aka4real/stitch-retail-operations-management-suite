# Nexus Retail Operations Management Suite

A modern, high-performance retail operations management suite built from Google Stitch design specifications, adhering to the **Nexus Design System**, **Emil Kowalski design engineering principles**, and **agency-tier visual design standards**.

---

## 🏬 Suite Overview

Nexus Retail Management provides mall and enterprise retail operators with real-time floor intelligence, financial oversight, inventory velocity monitoring, and staff duty orchestration across 6 core integrated modules:

1. **Operational Dashboard (`#dashboard`)**
   - Live revenue metrics with daily delta comparisons.
   - Real-time foot traffic telemetry with micro-pulse simulation.
   - Critical low stock alerts with single-click triage.
   - Interactive Hourly Revenue SVG Spline Chart with hover data scrubbers.
   - Active floor team presence and quick duty dispatch.

2. **Inventory & Goods Tracking (`#inventory`)**
   - Real-time stock valuation ($1.2M+ catalog).
   - Category filtering (*All, Electronics, Fashion, Home Goods*).
   - Instant search by product title or SKU code.
   - Dynamic depletion velocity progress meters.
   - Single-click stock replenishment (`+10`, `+50` units).
   - Interactive **Add SKU** modal with validation and live ledger updates.
   - Purchase order reminder approval and snooze controls.

3. **Sales & Financial Tracking (`#sales`)**
   - Revenue vs. Expenditure dual-curve comparative Spline chart.
   - High-contrast KPI metric cards with Doppelrand double-bezel framing.
   - Channel revenue distribution progress breakdowns.
   - Interactive transaction ledger with category filters and status pills.
   - Interactive **Add Sale / Transaction** modal.
   - Functional **Export CSV Report** engine that generates real CSV downloads.

4. **Human Resources & Team Performance (`#hr`)**
   - Visual organizational hierarchy tree with connected node architecture.
   - Real-time staff capacity and workload percentages.
   - Live Duty Assignments roster with status management (*In Progress, Completed, Pending Review*).
   - Quick navigation into associate profile scorecards.

5. **Associate Profile — Elena Rodriguez (`#profile`)**
   - Doppelrand identity card with live "Clocked In" status beacon.
   - Key metadata: Employee ID (`NEX-8492`), Department (`Apparel & Styling`), Hire Date, Assigned Store.
   - Performance scorecard: Sales Quota (95%), CSAT (4.9 / 5.0), Punctuality (99.2%).
   - Interactive assigned duty checklist with instant task toggles.
   - Single-click contact copy-to-clipboard (email, phone, address).
   - Profile parameter editor modal.

6. **Assign New Task (`#assign-task`)**
   - Visual associate selection bar with interactive checkmark transitions.
   - Pre-built quick task templates (*Inventory Audit, Window Restyle, Spill Cleanup*).
   - Priority segmented controls (*Low, Medium, High, Urgent*).
   - Floor zone and expected completion time selectors.
   - Dynamic checklist builder (add steps on Enter key, remove steps).
   - Automated routing and live dispatch into HR duty rosters with Sonner toasts.

7. **Manager Portal & RBAC Clearance Matrix (`#management`)**
   - **Zero-Trust Security Gate:** Protected by Manager Elevation passkey (`nexus2026` or quick elevation).
   - **Role Hierarchy & Clearance (Ranks 1 to 5):** Executive Admin (Rank 5), Operations Manager (Rank 4), Floor Lead (Rank 3), Specialist (Rank 2), Associate (Rank 1).
   - **Staff Provisioning Modal:** Add new mall staff with custom role, department, zone, rank, and terminal PIN.
   - **Granular Permissions Matrix:** Toggle switches per staff member for `Financials`, `Stock Ops`, `Approve POs`, `Dispatch Duties`, `Manage Staff`, and `Clock Override`.
   - **Cryptographic Audit Trail:** Immutable security log recording every promotion, permission toggle, and associate provisioning action.

8. **Staff Onboarding & Duty Cockpit (`#onboarding`)**
   - **Digital Punch Clock:** Real-time clock with 1-click *Clock In / Clock Out* toggle and shift timestamp logging.
   - **Personalized Shift Duties:** Live checklist of tasks assigned specifically to the authenticated employee with instant completion toggles.
   - **New Hire Compliance & Orientation:** Step-by-step onboarding walkthrough (Fire/Evacuation walk, RFID badge linkage, conduct policy sign-off).
   - **Floor Emergency Triggers:** Immediate dispatch buttons for warehouse restock alerts and hazard reports.

9. **Global Session Switcher (`modal-switch-user`)**
   - Test and simulate any persona across the enterprise (Admin Marcus Vance, Floor Lead Elena Rodriguez, Specialist David Chen, etc.).
   - Instant permission re-evaluation across all navigation tabs and views.

---

## 🎨 Design Engineering Highlights

- **Emil Kowalski Physics:**
  - Haptic button press states (`active:scale-[0.975]`).
  - Popovers and modals scale up from `scale(0.95)` with custom cubic-bezier easing (`cubic-bezier(0.23, 1, 0.32, 1)`), avoiding the artificial `scale(0)` anti-pattern.
  - Snappy interaction speeds under 220ms.
  - Custom Sonner-style toast notifications for feedback on every user action.
- **Doppelrand Architecture:** Nested double-bezel enclosures for cards, creating machine-like hardware depth.
- **Stitch Design Tokens:**
  - Strict palette: Primary Navy (`#041627`), Emerald Secondary (`#006c49`), Amber Warning (`#ca8100`), Canvas Surface (`#f8f9ff`).
  - Typography: **Hanken Grotesk** (display & headlines), **Inter** (body & UI), **JetBrains Mono** (monospaced metrics, SKUs & dates).
- **Command Palette (`Ctrl+K` / `⌘K`):** Global keyboard-driven shortcut menu for navigation and instant actions.
- **Dark Mode Support:** Smooth contrast switching adhering to the DESIGN.md dark surface palette.
- **State Persistence:** LocalStorage caching for tasks, inventory, transactions, and theme preference.

---

## 🚀 Getting Started

### Option 1: Direct Browser Launch
Open `index.html` directly in any modern web browser:
```bash
# Windows
start index.html
```

### Option 2: Local Node.js Server (Zero Dependencies)
Run the included standalone server (defaults to port 3050, with automatic conflict avoidance):
```bash
npm start
# or: node local-server.js
```
Then open [http://localhost:3050](http://localhost:3050) in your browser.

---

## 📁 Directory Structure

```
stitch_retail_operations_management_suite/
├── index.html                   # Master unified single-page application
├── styles.css                   # Custom design system CSS & Emil Kowalski physics
├── app.js                       # State management, router, charts & toast system
├── local-server.js              # Zero-dependency local web server
├── package.json                 # Project configuration & npm scripts
├── update-subscreens.js         # Subscreen navigation linking utility
├── README.md                    # Project documentation
│
├── nexus_retail_management/     # Stitch Design System Tokens
│   └── DESIGN.md
│
├── operational_dashboard/       # Screen 1 Prototype & Reference
│   ├── code.html
│   └── screen.png
├── inventory_stock_management/  # Screen 2 Prototype & Reference
│   ├── code.html
│   └── screen.png
├── sales_financial_tracking/    # Screen 3 Prototype & Reference
│   ├── code.html
│   └── screen.png
├── hr_team_performance/         # Screen 4 Prototype & Reference
│   ├── code.html
│   └── screen.png
├── employee_profile_elena_rodriguez/ # Screen 5 Prototype & Reference
│   ├── code.html
│   └── screen.png
└── assign_new_task/             # Screen 6 Prototype & Reference
    ├── code.html
    └── screen.png
```

---

*Engineered with precision for the Nexus Operations Management Platform.*
