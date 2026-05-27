---
name: Premium Equity
colors:
  surface: "#111317"
  surface-dim: "#111317"
  surface-bright: "#37393e"
  surface-container-lowest: "#0c0e12"
  surface-container-low: "#1a1c20"
  surface-container: "#1e2024"
  surface-container-high: "#282a2e"
  surface-container-highest: "#333539"
  on-surface: "#e2e2e8"
  on-surface-variant: "#c4c5d9"
  inverse-surface: "#e2e2e8"
  inverse-on-surface: "#2f3035"
  outline: "#8e90a2"
  outline-variant: "#434656"
  surface-tint: "#b8c3ff"
  primary: "#b8c3ff"
  on-primary: "#002388"
  primary-container: "#2e5bff"
  on-primary-container: "#efefff"
  inverse-primary: "#124af0"
  secondary: "#44e092"
  on-secondary: "#00391f"
  secondary-container: "#03c177"
  on-secondary-container: "#004729"
  tertiary: "#ffb3ae"
  on-tertiary: "#68000b"
  tertiary-container: "#d02a30"
  on-tertiary-container: "#ffecea"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#dde1ff"
  primary-fixed-dim: "#b8c3ff"
  on-primary-fixed: "#001356"
  on-primary-fixed-variant: "#0035be"
  secondary-fixed: "#66fdac"
  secondary-fixed-dim: "#44e092"
  on-secondary-fixed: "#002110"
  on-secondary-fixed-variant: "#00522f"
  tertiary-fixed: "#ffdad7"
  tertiary-fixed-dim: "#ffb3ae"
  on-tertiary-fixed: "#410004"
  on-tertiary-fixed-variant: "#930014"
  background: "#111317"
  on-background: "#e2e2e8"
  surface-variant: "#333539"
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  data-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: "500"
    lineHeight: 24px
  data-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: "500"
    lineHeight: 18px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "700"
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 1.5rem
  margin-edge: 2rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

This design system is engineered for high-stakes financial decision-making, emphasizing **trust, precision, and clarity**. The visual language draws from **Corporate Modernism** with a focus on data density without cognitive overload.

The aesthetic is characterized by a "Dark-First" philosophy that seamlessly transitions to a high-utility light mode. It utilizes a structured information hierarchy where data points are the primary heroes. The emotional response is one of calm authority—providing investors with a professional-grade toolset that feels both sophisticated and accessible. Key attributes include:

- **Precision:** Perfect alignment and consistent spacing to reflect financial accuracy.
- **Modernity:** Subtle use of depth and layered surfaces to organize complex data.
- **Utility:** High-legibility typography optimized for rapid scanning of numerical values.

## Colors

The palette is anchored by a sophisticated **Indigo Primary** used for branding and primary actions. Financial status is communicated through a high-vibrancy **Success Green** and **Danger Red**, ensuring immediate recognition of market movement.

### Semantic Application

- **Primary (#2E5BFF):** Brand presence, focus states, and primary CTA buttons.
- **Success (#00C076):** Positive growth, "Buy" signals, and upward trends.
- **Danger (#FF4D4D):** Losses, "Sell" signals, and critical alerts.
- **Surface (Dark Mode):** Base background is a deep charcoal (#0F1115), with containers utilizing lighter elevations (#1A1D23) to create depth.
- **Surface (Light Mode):** Clean white base (#FFFFFF) with cool gray borders (#E2E8F0) and soft secondary backgrounds (#F8FAFC).

## Typography

The typographic system balances character with utility. **Hanken Grotesk** provides a modern, sharp feel for headlines and brand moments. **Inter** handles the heavy lifting for body text and descriptions due to its exceptional legibility.

For numerical data, tickers, and prices, **JetBrains Mono** is employed to ensure tabular alignment and clear character distinction (e.g., distinguishing '0' from 'O'), which is critical for financial accuracy.

### Usage Guidelines

- Use **Display-LG** for portfolio totals or major market indices.
- Use **Data-LG** for current stock prices and percentage changes.
- Apply **Label-Caps** for metadata such as exchange names or market status (OPEN/CLOSED).

## Layout & Spacing

The system utilizes a **12-column fluid grid** for desktop, transitioning to a **4-column grid** for mobile. A strict 8px (0.5rem) base unit governs all spatial relationships.

### Breakpoints

- **Desktop (1280px+):** 12 columns, 32px margins, 24px gutters.
- **Tablet (768px - 1279px):** 8 columns, 24px margins, 16px gutters.
- **Mobile (Up to 767px):** 4 columns, 16px margins, 12px gutters.

The layout philosophy emphasizes **logical grouping**. Related financial metrics are clustered in cards with tight internal spacing (8-12px), while distinct modules (e.g., Watchlist vs. Chart) are separated by larger gaps (32px+) to prevent visual clutter.

## Elevation & Depth

Visual hierarchy is managed through **tonal layering** in dark mode and **soft ambient shadows** in light mode.

### Dark Mode (Depth)

- **Level 0 (Base):** #0F1115. Used for the application background.
- **Level 1 (Card):** #1A1D23. Used for the primary content containers.
- **Level 2 (Overlay):** #262A33. Used for hover states, dropdowns, and modals.
- **Accents:** 1px borders (#2D323E) are used instead of shadows to define card boundaries.

### Light Mode (Elevation)

- **Base:** #F8FAFC.
- **Cards:** White (#FFFFFF) with a very soft, diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.05)) and a subtle 1px border (#E2E8F0).

## Shapes

The system uses a **Rounded** (0.5rem) corner radius as the standard. This strikes a balance between the clinical sharpness of traditional finance apps and the approachability of modern consumer tech.

- **Standard (8px):** Buttons, input fields, and small cards.
- **Large (16px):** Main dashboard modules and modal containers.
- **Pill:** Reserved for status tags (e.g., "Strong Buy") and selection chips to provide high visual contrast against rectangular data cards.

## Components

### Buttons

- **Primary:** Solid Indigo background with white text. High-contrast, 48px height for main actions.
- **Ghost:** Border-only for secondary actions like "Add to Watchlist."
- **Actionable Data:** Small 32px buttons with Success/Danger backgrounds for quick "Buy/Sell" triggers within lists.

### Financial Cards

- **Stock Card:** Contains Ticker (Headline-SM), Price (Data-LG), and a mini sparkline chart.
- **Recommendation Card:** Uses a specific background tint in dark mode (Success Green at 5% opacity) to highlight "Buy" recommendations.

### Input Fields

- Dark-themed inputs use a subtle #262A33 background. On focus, the border transitions to Primary Indigo with a soft outer glow.

### Chips & Badges

- **Signal Chips:** Small, pill-shaped badges with semi-transparent backgrounds of Success Green or Danger Red. Text should be bold for readability at small scales.

### Lists

- Data rows should feature alternating "zebra" backgrounds or 1px dividers. Hover states must be distinct to assist the eye in tracking data across wide horizontal planes.
