---
name: Nexus Retail Management
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#44474c'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777d'
  outline-variant: '#c4c6cd'
  surface-tint: '#4f6073'
  primary: '#041627'
  on-primary: '#ffffff'
  primary-container: '#1a2b3c'
  on-primary-container: '#8192a7'
  inverse-primary: '#b7c8de'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#221200'
  on-tertiary: '#ffffff'
  tertiary-container: '#3e2400'
  on-tertiary-container: '#ca8100'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4fb'
  primary-fixed-dim: '#b7c8de'
  on-primary-fixed: '#0b1d2d'
  on-primary-fixed-variant: '#38485a'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  table-data:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 20px
  margin: 24px
---

## Brand & Style
The design system is engineered for high-performance retail management, prioritizing clarity, trust, and rapid data synthesis. The visual language follows a **Modern Corporate** aesthetic with a heavy emphasis on information density and functional hierarchy. 

The system utilizes high-contrast typography and a structured grid to manage complex datasets, ensuring that shopping center operators can monitor foot traffic, sales metrics, and tenant health at a glance. The emotional response is one of calm control and professional precision.

## Colors
This design system utilizes a logic-driven palette where color serves a functional purpose rather than just an aesthetic one.

- **Primary (#1A2B3C):** A deep navy used for structural elements, navigation, and primary headings to establish authority.
- **Success/Growth (#10B981):** An emerald green reserved strictly for positive growth indicators, meeting sales targets, and "Active" status badges.
- **Warning/Alert (#F59E0B):** An amber used for pending lease renewals, maintenance reminders, or dipping performance metrics.
- **Neutral/Surface:** A range of cool grays starting from a crisp white (#FFFFFF) for cards, moving to a soft background tint (#F8FAFC) to reduce eye strain during long sessions.

## Typography
The typographic system uses a tri-font approach to maximize legibility across different data types.

- **Hanken Grotesk** is used for headlines and dashboard titles. Its contemporary geometry provides a professional, sharp look.
- **Inter** handles all body copy and primary UI labels. It is chosen for its exceptional legibility in dense interfaces and neutral tone.
- **JetBrains Mono** is utilized sparingly for tabular numeric data, IDs, and timestamps. The monospaced nature ensures that columns of numbers align perfectly, aiding in rapid financial audits.

## Layout & Spacing
The layout follows a **Fluid Grid** model designed for widescreen dashboard monitors. A 12-column system is used for the main content area, with a fixed 280px left-hand navigation rail.

- **Dashboard View:** Utilizes a 4-column span for primary KPIs and an 8-column span for large-scale performance charts.
- **Table Views:** Edge-to-edge content with consistent 16px horizontal padding within cells.
- **Breakpoints:** 
  - Desktop: 1440px+ (Full visibility)
  - Tablet: 1024px (Navigation collapses to icons)
  - Mobile: 375px (Cards stack vertically, typography scales down)

## Elevation & Depth
This design system uses **Tonal Layering** combined with soft, directional shadows to indicate hierarchy without cluttering the UI.

- **Surface (Level 0):** Background (#F8FAFC) is flat.
- **Card (Level 1):** White background with a 1px border (#E2E8F0) and a subtle 4px blur shadow at 5% opacity. Used for data widgets and table containers.
- **Dropdowns/Modals (Level 2):** Elevated with a 12px blur shadow at 10% opacity to sit clearly above the management interface.
- **Interactive Elements:** Buttons utilize a slight inner-glow on hover rather than an increase in drop shadow to maintain a "pressed" tactile feel.

## Shapes
A **Soft** shape language is applied to maintain a modern feel while remaining professional.

- **Cards & Containers:** Use `rounded-lg` (0.5rem) to soften the density of data.
- **Buttons & Inputs:** Use `rounded` (0.25rem) for a more precise, tool-like appearance.
- **Badges/Chips:** Use full pill-shaped rounding to distinguish status indicators from clickable buttons.

## Components
### Tables & Data Grids
Complex tables are the core of this system. Headers must be sticky with a subtle bottom border. Rows use an alternating zebra stripe (1% Primary color) or a hover-highlight to assist eye-tracking.

### Performance Charts
Charts should use a 2px stroke width. Areas under lines should have a 5% opacity gradient fill of the line color. Avoid "spaghetti" charts; limit to 4 data series per widget.

### Status Badges
Badges use a "Tinted" style: a light background (10% opacity of the color) with high-contrast text.
- **Active:** Emerald text on light emerald background.
- **Pending:** Amber text on light amber background.
- **Overdue:** Red text on light red background.

### Input Fields
Inputs use a white background with a 1px neutral border. On focus, the border changes to Primary Navy with a 2px soft outer glow. Labels always remain visible (no floating placeholders that disappear).

### Team Hierarchy
Visualized using "Node Cards" connected by 1px solid lines. Each node displays a thumbnail, role, and a "Current Load" indicator bar.