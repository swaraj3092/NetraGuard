# CyberKavach AI — Complete Figma UI/UX Design Prompt
### India's First Real-Time Fraud Prevention Platform

---

## ⚡ PROJECT BRIEF FOR FIGMA

Create a **complete, production-ready design system and UI** for **CyberKavach AI** — India's first AI platform that stops digital fraud *before the money moves*. The product spans a **mobile citizen app**, a **law enforcement web dashboard**, and a **public-facing landing page**. The design must feel like a war room meets a premium Indian fintech product: commanding, intelligent, and deeply rooted in Indian visual identity — while being completely world-class in execution. Every screen should feel like it belongs in a Netflix documentary on cybercrime units.

---

## 🎨 DESIGN IDENTITY & PHILOSOPHY

### Core Aesthetic
**"Digital Kavach" — Armoured Intelligence**
Imagine a mythological shield (kavach) built from glowing neural circuits. The visual language merges ancient Indian geometry (chakra, mandala patterns at micro-level) with the cold precision of a military intelligence terminal. This is NOT a generic SaaS product. It is a weapon against fraud, and the UI must feel like one.

### Emotional Targets
- Citizens feel **protected and reassured**
- Law enforcement feels **empowered and in control**
- Judges/evaluators feel **awe at the technical depth**

---

## 🎨 COLOR SYSTEM

### Primary Palette
```
--kavach-void:        #050A14   /* Deep space black — primary background */
--kavach-deep:        #080F1E   /* Secondary background, cards */
--kavach-navy:        #0A1628   /* Tertiary surface */
--kavach-steel:       #0E1F35   /* Card backgrounds */
--kavach-shield:      #1A3A5C   /* Elevated surfaces */
```

### Accent Palette — The Kavach Signature Colors
```
--kavach-saffron:     #FF6B00   /* Indian saffron — primary CTA, warnings */
--kavach-saffron-glow:#FF6B0040 /* Saffron glow for halos */
--kavach-gold:        #FFB800   /* Gold — achievement, GENUINE status */
--kavach-gold-dim:    #FFB80020 /* Gold ambient */
--kavach-emerald:     #00E5A0   /* Safe/verified status, data viz */
--kavach-emerald-glow:#00E5A015 /* Emerald ambient */
--kavach-crimson:     #FF1744   /* Alert/fraud/danger */
--kavach-crimson-glow:#FF174420 /* Danger ambient */
--kavach-ice:         #00C8FF   /* Data lines, graph edges, accent */
--kavach-ice-dim:     #00C8FF12 /* Ice ambient */
--kavach-violet:      #8B5CF6   /* AI/ML indicators, intelligence layer */
```

### Neutral Scale
```
--text-primary:       #F0F4FF   /* Near-white, high contrast */
--text-secondary:     #8899BB   /* Secondary labels */
--text-muted:         #4A5A7A   /* Disabled / metadata */
--border-subtle:      #1E2E48   /* Default borders */
--border-glow:        #1E4A80   /* Highlighted borders */
```

### Status Colors
```
--status-safe:        #00E5A0   /* GENUINE / SAFE */
--status-suspicious:  #FFB800   /* SUSPICIOUS */
--status-fraud:       #FF1744   /* ACTIVE FRAUD / COUNTERFEIT */
--status-scanning:    #00C8FF   /* Processing/live */
```

---

## 🔤 TYPOGRAPHY SYSTEM

### Type Stack
- **Display Face:** `Space Grotesk` — Bold (700), weights 600–800
  → Used for hero headlines, stat numbers, screen titles
  → Letter-spacing: -0.03em for large sizes, 0.01em for utility

- **Body Face:** `Inter` — Regular (400), Medium (500), SemiBold (600)
  → Used for all body text, descriptions, UI labels
  → Optimized for Devanagari + Latin multilingual contexts

- **Monospace / Data Face:** `JetBrains Mono`
  → Used for phone numbers, UPI IDs, account numbers, confidence scores, hash IDs
  → Fraud network node labels, entity identifiers, technical readouts

- **Indic Display (Devanagari):** `Noto Sans Devanagari`
  → Used for Hindi UI labels in citizen-facing screens
  → Pairs with Inter for mixed-script text blocks

### Type Scale
```
--text-hero:      72px / Space Grotesk 800 / -0.04em  (landing page H1)
--text-display:   48px / Space Grotesk 700 / -0.03em  (dashboard headers)
--text-headline:  32px / Space Grotesk 700 / -0.02em  (screen titles)
--text-title:     24px / Space Grotesk 600 / -0.01em  (card headers)
--text-large:     18px / Inter 500 / 0em              (body lead)
--text-body:      16px / Inter 400 / 0.01em           (primary body)
--text-small:     14px / Inter 400 / 0.01em           (secondary labels)
--text-micro:     12px / Inter 500 / 0.04em UPPERCASE (tags, badges, metadata)
--text-code:      14px / JetBrains Mono 400 / 0em     (data strings)
```

---

## 🌐 SPACING & LAYOUT

### Grid System
- **Desktop Dashboard:** 12-column grid, 24px gutters, 48px margins
- **Mobile App:** 4-column grid, 16px gutters, 20px margins
- **Landing Page:** 12-column with max-width 1440px, fluid to 375px

### Spacing Scale (8pt base)
```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  24px
--space-6:  32px
--space-7:  48px
--space-8:  64px
--space-9:  96px
--space-10: 128px
```

### Border Radius
```
--radius-sm:  6px    (tags, chips)
--radius-md:  12px   (buttons, inputs)
--radius-lg:  16px   (cards)
--radius-xl:  24px   (panels, modals)
--radius-pill: 999px (status badges, toggles)
```

---

## ✨ GLASSMORPHISM & DEPTH SYSTEM

### Glass Card Variants
All cards use layered depth. Every glass surface must have:

**Level 1 — Base Surface (default cards)**
```
background: linear-gradient(135deg, rgba(26,58,92,0.4) 0%, rgba(8,15,30,0.6) 100%)
border: 1px solid rgba(30,74,128,0.3)
backdrop-filter: blur(20px) saturate(180%)
box-shadow:
  0 0 0 1px rgba(0,200,255,0.05) inset,
  0 4px 24px rgba(0,0,0,0.4),
  0 0 60px rgba(0,200,255,0.03)
```

**Level 2 — Alert / Active Cards**
```
background: linear-gradient(135deg, rgba(26,58,92,0.5) 0%, rgba(8,15,30,0.7) 100%)
border: 1px solid rgba(0,200,255,0.2)
box-shadow:
  0 0 0 1px rgba(0,200,255,0.1) inset,
  0 8px 32px rgba(0,0,0,0.5),
  0 0 80px rgba(0,200,255,0.08)
```

**Level 3 — Critical / Fraud Alert Cards**
```
background: linear-gradient(135deg, rgba(255,23,68,0.1) 0%, rgba(8,15,30,0.8) 100%)
border: 1px solid rgba(255,23,68,0.4)
box-shadow:
  0 0 0 1px rgba(255,23,68,0.15) inset,
  0 8px 48px rgba(0,0,0,0.6),
  0 0 120px rgba(255,23,68,0.12)
```

**Level 4 — Safe / Verified Cards**
```
background: linear-gradient(135deg, rgba(0,229,160,0.08) 0%, rgba(8,15,30,0.8) 100%)
border: 1px solid rgba(0,229,160,0.3)
box-shadow:
  0 0 0 1px rgba(0,229,160,0.1) inset,
  0 8px 48px rgba(0,0,0,0.5),
  0 0 100px rgba(0,229,160,0.08)
```

---

## 🎭 3D EFFECTS & ANIMATION SYSTEM

### Signature 3D Element: The Kavach Shield
A 3D rotating shield/chakra mark that appears as:
- The splash/loader animation
- A floating ambient element on the landing page
- A subtle watermark in dashboard backgrounds

**Shield Construction:**
- Outer ring: 12 evenly-spaced nodes (representing 12 language support) connected by glowing arcs
- Inner geometry: A stylized shield silhouette made of triangulated mesh panels
- Surface: Holographic iridescent material — shifts from deep blue to saffron depending on tilt
- Particle trail: 200 floating particles orbit the shield in elliptical paths
- Glow corona: Soft cyan glow emanates 60px outward from shield edge
- Rotation: 0.3 RPM auto-rotate on Y axis; tilts 15° on mouse hover proximity

### Animation Library (Define all as Figma Prototype flows AND Lottie-ready specs)

**A. Network Graph Pulse Animation**
- Node appearance: Scale from 0 → 1.2 → 1.0 with a ripple ring expanding outward (opacity 1 → 0)
- Edge draw-in: SVG stroke-dashoffset animation, 0.4s ease-in per edge
- Hub node (criminal centre): Permanent pulsing ring — scale 1.0 → 1.15 → 1.0, 2s loop, ease-in-out
- Color shift: When a new connection is discovered, the edge flashes white → settles to --kavach-ice
- Particle flow: Tiny dots travel along edges from victim nodes toward hub nodes (directional flow visualization)

**B. Scam Stage Funnel Fill Animation**
Four stage indicators (Authority → Fear → Isolation → Payment):
- Idle: Empty outlined icon, text --text-muted
- Active detection: Fill sweeps left-to-right with a shimmer effect, 0.6s ease-out
- Stage 1+2 co-detected: Yellow warning banner slides down from top, 0.3s spring
- Stage 3 detected: Full screen red overlay — expands from center with radial reveal, overlaid with repeating pulse rings

**C. Currency Scanner Animation**
- Frame finding: Scanning reticle with four corner brackets that animate inward
- Active scan: A horizontal scan line sweeps top → bottom in 0.8s, emitting a soft cyan glow trail
- Processing: 11 security feature chips appear one by one (staggered 0.1s), each with a fill-from-left animation
- GENUINE result: Green shield icon scales in (0 → 1.2 → 1.0), gold shimmer sweeps across card
- COUNTERFEIT result: Red X draws in with a shake animation (±6px horizontal, 3 oscillations)

**D. Micro-interactions**
- Button hover: Subtle upward translate (-2px), glow intensifies, box-shadow spreads
- Button press: Translate back to 0, scale 0.98, glow pulse
- Card hover: 3D tilt (max ±5° on X and Y), top-left corner light source brightens
- Alert badge: Continuous slow pulse (scale 1.0 → 1.08 → 1.0, 1.5s infinite)
- Loading skeleton: Diagonal shimmer sweep, direction 135°, 1.5s loop

**E. Page Load Sequence (Landing Page)**
```
0ms:    Background renders, deep void color
200ms:  Grid lines fade in (opacity 0 → 0.06), 400ms
400ms:  Kavach shield fades in and begins rotation
700ms:  Hero headline character-by-character reveal (10ms stagger per char)
900ms:  Subtitle fades up from 20px below
1100ms: CTA buttons scale in with spring (0 → 1.05 → 1.0)
1300ms: Stats counter animation begins (0 → final value, 1.5s ease-out)
1600ms: Scroll-down indicator bounces in
```

**F. Scroll-triggered Animations (Landing Page)**
- Feature cards: Slide in from bottom (40px) + fade in, triggered at 20% visibility
- Stats: Counter animation restarts when scrolled into view
- Architecture diagram: Layers reveal top-to-bottom as user scrolls
- Timeline: Draw in along a central axis as user scrolls through it

---

## 📱 SCREEN 1: MOBILE CITIZEN APP — "Fraud Shield"

### Home Screen
**Safe Mode (No Active Threat)**

Layout: Bottom tab navigation (5 tabs). Main area uses a card-stack layout.

- **Header Bar:**
  - Left: Kavach shield icon (16×16, animated idle pulse)
  - Center: "CyberKavach" in Space Grotesk 600, 18px
  - Right: Language selector chip (shows current language flag + code: 🇮🇳 HI)

- **Status Card (Hero, spans full width minus 20px margins):**
  - Background: Level 4 glass (green-tinted) — the calm state
  - Top: Status badge — "🛡️ KAVACH ACTIVE" in emerald, pill shape
  - Center: Large shield illustration (80×80px) with soft green glow
  - Text: "You are protected" / "आप सुरक्षित हैं" (bilingual)
  - Sub-label: "Real-time monitoring active"
  - Bottom: Three mini-indicators in a row: Live Call Monitor ✓ | Network Watch ✓ | Alert System ✓

- **Quick Action Row (4 icon buttons, pill-shaped cards):**
  1. 🔍 Check a Call — "Verify suspicious caller"
  2. 📱 Report Fraud — "Report to NCRP"
  3. 💰 Scan Note — "Verify currency"
  4. 📚 Fraud Guide — "Know the scams"

- **Recent Alerts Feed (scrollable list):**
  - Section title: "Recent Intelligence" with a live dot indicator
  - Each alert item: Left icon (status color) + title + timestamp + chevron
  - Empty state: Soft illustration of a sleeping shield with "No threats detected. Stay alert."

---

### Active Scam Interrupt Screen
**[CRITICAL STATE — Most important screen in the app]**

This triggers automatically when a live call shows 2+ manipulation stages detected.

**Full-screen interrupt overlay — red dominant**

- **Background:** Full-screen radial gradient — #FF1744 at center fading to #1A0A0A at edges. Pulsing concentric rings emanate from center, 2 rings visible, 3s loop.

- **Top Section:**
  - Blinking red alert icon (shield with exclamation, 64×64)
  - Text: **"⚠️ SCAM DETECTED"** — Space Grotesk 800, 32px, white
  - Subtitle: "This call shows fraud patterns" — Inter 400, 16px, rgba(255,255,255,0.8)

- **Stage Indicator Panel (glass card):**
  Four stage chips in a 2×2 grid:
  - Stage 1: "Authority Claim" — FILLED red (detected)
  - Stage 2: "Fear Tactics" — FILLED red (detected)
  - Stage 3: "Isolation" — OUTLINED orange (partial match)
  - Stage 4: "Payment Demand" — OUTLINED grey (not yet)
  Each chip: icon + label + detection confidence percentage in JetBrains Mono

- **Detection Evidence (expandable card):**
  - Shows the actual flagged phrases (redacted): e.g., "Phrases like 'CBI officer' and 'arrest warrant' detected"
  - Bottom: "Confidence: 94.7%" in emerald monospace

- **Action Buttons (stacked, full-width):**
  1. PRIMARY (saffron, large): "🚨 HANG UP NOW" — bold, 18px
  2. SECONDARY (outlined): "📞 Call 1930 Helpline" — dials immediately
  3. TERTIARY (text link): "Continue call with caution →"

- **Bottom Safety Script (auto-expanded scrollable):**
  - Title: "What to say to end the call safely:"
  - Numbered script: "1. Tell them you need to verify with your bank first. 2. Do NOT give OTPs or transfer money..."

---

### WhatsApp Advisory Conversation Screen
Simulates the WhatsApp chat interface with CyberKavach AI bot:

- **Chat Header:** CyberKavach AI bot with green verified badge, "Online"
- **Message Bubbles (inbound from bot):** Dark glass surface, bot avatar
- **Message Bubbles (outbound from user):** Saffron-tinted, right-aligned
- **Quick Reply Chips:** Floating above keyboard, suggests: "Yes, continue" | "Tell me more" | "Report this"
- **Verdict Card (special bot message):**
  - Large card inside the chat bubble
  - Status icon (color-coded shield: green/yellow/red)
  - Status label: "SUSPICIOUS CALL DETECTED"
  - Summary: 3 bullet points of why
  - Two CTA buttons inside card: "File NCRP Report" | "Share with Family"
- **NCRP Pre-Fill Banner:** Slides up from bottom — "Your report is 90% filled. Tap to submit in 45 seconds →"

---

### Currency Scanner Screen

- **Camera Viewfinder (full screen):**
  - Live camera feed as background
  - Scanning reticle overlay: four animated corner brackets (cyan, 2px stroke), auto-sizing to fill frame
  - Center guide text: "Align note within frame" — white text, soft drop shadow
  - Bottom info bar: Semi-transparent pill — "Hold still, scanning..."
  - Scan line: Animating horizontal cyan line sweeping top to bottom

- **Processing State (animates after capture):**
  - Camera freezes, note image centered
  - 11 analysis chips appear in staggered sequence around the note image:
    - Chip format: Icon + label + spinning loader → checkmark
    - Labels: "Latent Image" | "Security Thread" | "Microprint" | "Serial Number" | "Watermark" | "Intaglio" | "Colour Shift" | "See-through Register" | "RBI Seal" | "Numeral Ratio" | "Paper Texture"
  - Progress ring (circular) in center, fills from 0% to 100%

- **GENUINE Result Screen:**
  - Background transitions to deep green-tinted glass
  - Animated checkmark draws itself (stroke animation, 0.5s)
  - Large text: "GENUINE" in Space Grotesk 800, 48px, emerald
  - Confidence: "98.3% confidence" — JetBrains Mono
  - 11 feature grid: All chips green with checkmarks
  - Bottom: "Report location data to RBI" toggle + Submit button

- **COUNTERFEIT Result Screen:**
  - Background: Red-tinted glass, pulsing
  - Animated X with shake effect
  - Large text: "COUNTERFEIT" in crimson, with warning icon
  - Failed features: Highlighted in red within the 11-feature grid
  - Evidence card: Shows exactly which features failed
  - Bottom: One-tap submit button — sends GPS, timestamp, image, confidence score

---

## 🖥️ SCREEN 2: LAW ENFORCEMENT DASHBOARD

### Layout Structure
Full-width web app. Left sidebar (240px) + Main content area. No top nav bar (sidebar-first layout).

### Sidebar
- **Top:** Kavach shield logo (24×24) + "CyberKavach" wordmark
- **User badge:** Officer name, rank, jurisdiction — compact card
- **Navigation items (icon + label):**
  - 🌐 Fraud Network Graph (default active)
  - 🔊 Live Scam Interceptor
  - 🧠 Manipulation Intelligence
  - 💰 Counterfeit Reports
  - 📊 Campaign Intelligence
  - 🗂️ Evidence Packages
  - ⚙️ Settings
- **Bottom status bar:** System health indicators — 3 dots (green/yellow/red) for each service layer
- **Active state:** Saffron left border, background brightens to --kavach-shield

### Main Dashboard — Fraud Network Graph (Primary View)

**Top Stats Bar (horizontal row of 4 cards):**
Each card: Glass Level 1, flex-row, left icon + right number+label

| Card | Icon | Number | Label |
|------|------|--------|-------|
| 1 | 🔴 Fraud Rings | 47 | Active Networks Mapped |
| 2 | 👤 Victims | 1,247 | Linked Victims (30 days) |
| 3 | 💸 Amount | ₹3.2 Cr | At-Risk Capital |
| 4 | 🎯 Accuracy | 96.4% | Detection Confidence |

All four numbers: Space Grotesk 700, 32px, colored by severity.
Live refresh dot next to each — pulses cyan every 5s.

**Network Graph Panel (dominant, ~70% of main area):**

- **Graph Canvas:** Full-bleed, dark #050A14 background, CSS grid overlay (faint, opacity 0.04)
- **Node Types (each has distinct shape + color):**
  - 🔵 Victim: Small circle, --kavach-ice, 8px radius
  - 🟠 Scammer Identity: Pentagon shape, --kavach-saffron, 12px
  - 🔴 Hub Node (criminal centre): Hexagon, --kavach-crimson, 16px, permanent pulse ring
  - 🟢 Bank Account: Square, --kavach-emerald, 10px
  - 🟣 Phone Number: Diamond, --kavach-violet, 10px
  - ⬛ Device: Triangle, --text-secondary, 8px
  - 📍 Location: Circle with pin, --kavach-gold, 10px

- **Edge Types:**
  - Victim → Scammer: Thin line, --kavach-ice, opacity 0.4
  - Scammer → Bank Account: Animated dashed line with flowing dots (money trail)
  - Scammer → Scammer: Solid --kavach-violet line (organizational link)
  - Script similarity: Curved arc, --kavach-saffron, dotted

- **Hub Node Detail Overlay (on click):**
  Right panel slides in (320px) from the right edge:
  - Node ID in JetBrains Mono at top
  - Tabs: Overview | Phone Numbers | Accounts | Victims | Transactions
  - Each tab: scrollable list of linked entities, each clickable to center graph on that node
  - "Generate Evidence Package" button at bottom — saffron, full-width

- **Graph Controls (floating pill, top-right of graph):**
  - Zoom in/out buttons
  - Filter by: Node type toggles (7 color chips)
  - Layout: Force-directed / Hierarchical / Radial selector
  - Time range slider: Filter graph by date range

- **Mini-map (bottom-right corner of graph, 160×100px):**
  - Shows full graph at 10% scale
  - Viewport indicator (highlighted rectangle) shows current view area
  - Drag to navigate

**Side Panel — Campaign Activity Feed (right 30%):**
- Title: "Live Activity Feed"
- Vertical timeline, newest-first
- Each event: timestamp + icon + description + node ID
- Auto-scrolling with pause-on-hover
- Filter tabs: All | Fraud Alerts | New Connections | NCRP Reports

---

### Live Scam Interceptor Screen

**Full-width live monitoring console:**

- **Top Bar:** "LIVE CALL MONITORING — 847 calls analyzed today" + "ACTIVE INTERCEPTS: 3" badge (pulsing red)

- **Active Intercepts Panel (top half, horizontal cards):**
  Each intercepted call gets a card:
  - Call metadata: Duration, source type (VoIP/international), telecom provider
  - **4-Stage Funnel Bar:**
    - Horizontal progress bar divided into 4 colored segments
    - Each segment fills as stages are detected in real-time
    - Glow intensifies as more stages fill
  - Live transcript snippet (auto-updating, monospace)
  - Confidence score: Large number, color-coded
  - Action buttons: "Send Alert to Victim" | "Flag to Telecom" | "Archive"

- **Analysis Console (bottom half, terminal-style):**
  - Dark background (#020609), green terminal text
  - Real-time event log: "Stage 2 detected — Phrase: [REDACTED] — Confidence: 89.2%"
  - Auto-scrolling with "Pause" button
  - Filter input: grep-style search field

---

### Predictive Campaign Intelligence Screen

- **World Map / India Map:** D3.js choropleth, states colored by fraud campaign intensity (light blue → deep orange → red)
- **Campaign Timeline (bottom panel):** Horizontal swimlane chart — each campaign shown as a colored bar across time, click to see details
- **Pre-emptive Alert Control:** 
  - Card: "Campaign #CK-2847 detected — Est. 50,000 at-risk citizens in Odisha" 
  - Map zooms to highlighted region
  - One-click: "Send Pre-emptive Alert via WhatsApp/SMS" — shows preview of message
  - Post-send: Track alerts sent / opened / calls avoided (live counter)

---

## 🌐 SCREEN 3: LANDING PAGE (Public-Facing)

### Section 1: Hero

**Layout:** Full-viewport height. Split composition — left 55% text, right 45% 3D visual.

**Left Copy:**
- Eyebrow: Small pill badge — "ET AI HACKATHON 2.0 | DIGITAL PUBLIC SAFETY" in --kavach-ice, micro text
- H1 (72px Space Grotesk 800):
  Line 1: "India's AI"
  Line 2: "that stops fraud" — "stops" in saffron
  Line 3: "before ₹1 moves."
  → Character-by-character reveal animation on load
- Subheadline (18px Inter 400, --text-secondary):
  "Digital arrest scams stole ₹1,776 crore in 9 months. Every existing tool activates after the money is gone. CyberKavach acts during the call."
- CTA Row:
  - Primary: "Try Fraud Shield" — saffron filled, rounded pill, hover lifts + glow
  - Secondary: "Watch Demo →" — glass outlined, hover shows play icon animate in

**Right Visual (3D):**
The signature element — a semi-transparent 3D shield constructed from:
- Outer orbit: 12 glowing nodes (one per supported language), connected by animated arcs
- Central shield: Faceted mesh geometry, holographic surface shifts iridescent blue-to-saffron on scroll parallax
- Floating data chips orbit the shield: "94.7% confidence" | "Stage 2 Detected" | "GENUINE ✓"
- Background: Subtle dot grid, faint radial glow at shield center
- Shadow cast downward onto invisible floor — depth illusion

**Background:**
- Base: --kavach-void
- Faint hexagonal grid overlay at 3% opacity (cybersecurity visual language)
- Bottom gradient fade to next section

---

### Section 2: Crisis Stats Bar

Full-width, no gaps. Three stat tiles side by side:

| Tile | Number | Label |
|------|--------|-------|
| 1 | 1.14 Million | Cybercrime complaints in 2023 |
| 2 | ₹1,776 Crore | Stolen via digital arrest scams (9 months) |
| 3 | 60% YoY | Growth in cybercrime complaint volume |

- Each number: Space Grotesk 800, 56px, --kavach-saffron
- Counter animates from 0 when scrolled into view
- Dividers between tiles: 1px --border-subtle

---

### Section 3: The Paradigm Shift

Two-column layout, equal widths. Glass cards.

**Left Card — "What Exists Today" (crimson-tinted glass):**
- Header: ❌ "After the money moves"
- Four bullet rows, each: Grey icon + label + "AFTER transfer" badge in red
  - Truecaller: Flags spam AFTER it reaches your phone
  - NCRP: Accepts reports AFTER money is lost
  - Banks: Detect fraud AFTER transaction is processed
  - RBI: Trains staff AFTER fake notes circulate

**Right Card — "CyberKavach Does" (emerald-tinted glass):**
- Header: ✅ "Before a rupee moves"
- Four bullet rows, each: Saffron icon + action verb
  - Interrupt the scam call IN PROGRESS
  - Detect the fake note AT THE COUNTER
  - Map the fraud ring BEFORE mass victimisation
  - Generate court-ready evidence AUTOMATICALLY

---

### Section 4: Six Feature Pillars

Section title: "Six Capabilities. Zero Competitors."
Subtext: "Every one of these is a world-first."

**Layout:** 3-column card grid, 2 rows = 6 cards.

Each Feature Card:
- Glass Level 1 on hover lifts to Level 2
- Top: Gradient icon container (64×64, rounded 16px)
- Feature number: "01" in JetBrains Mono, --text-muted, small
- Feature title: Space Grotesk 600, 20px
- 3-line description: Inter 400, 14px, --text-secondary
- Bottom: "→ Learn more" link in --kavach-ice
- Hover: Card tilts 5°, border glows, icon container brightens

| # | Icon | Title | Color |
|---|------|-------|-------|
| 01 | 📡 | Real-Time Scam Interrupt | Crimson |
| 02 | 🧠 | Psychological Fingerprinter | Violet |
| 03 | 🕸️ | Cross-Victim Network Graph | Ice |
| 04 | 💵 | Mobile Counterfeit Detector | Gold |
| 05 | 🎯 | Predictive Victim Alerting | Saffron |
| 06 | 🌐 | Citizen Fraud Shield (12 Languages) | Emerald |

---

### Section 5: Live Demo Preview

Full-width cinematic section. Dark background. Left text + right animated mockup.

**Left:**
- Label: "SEE IT IN ACTION"
- Headline: "Watch a scam get stopped. Live."
- Description: "In 2.3 seconds, CyberKavach detects 2 manipulation stages in a live call and fires an interrupt overlay on the victim's phone."
- Demo trigger: "▶ Run Demo Simulation" button — clicking triggers the right panel animation

**Right (Interactive mockup):**
- Phone frame (SVG, realistic proportions)
- Inside: Shows a call screen with a fake caller name
- Animated progress: Four stage chips fill one by one (1s intervals)
- At Stage 2: Yellow warning slides down
- At Stage 3: Full red overlay fills the phone screen with "HANG UP NOW"
- The entire sequence loops every 8 seconds automatically

---

### Section 6: Who It Protects

Four user persona cards in horizontal scroll on mobile, 4-column grid on desktop.

Each card:
- Portrait illustration (abstract geometric avatar — no real faces)
- Role: Citizen / Law Enforcement / Bank Teller / Judiciary
- Primary need in 1 sentence
- How CyberKavach serves them in 2 sentences
- Card bottom: Relevant feature chip (e.g., "Fraud Shield" | "Network Graph" | "Note Scanner")

---

### Section 7: Technology Architecture

Full-width. Layered visual — an isometric diagram of the 7-layer stack:

**Layer visualization (left to right, each glows on hover):**
1. Ingestion Layer — icons of: phone, WhatsApp, camera, document
2. Processing Layer — STT, OCR, NLP pipeline icons
3. Intelligence Layer — brain/AI icons for each module
4. Orchestration Layer — interconnecting lines between modules
5. Storage Layer — database icons (Neo4j, PostgreSQL, Pinecone)
6. Output Layer — phone, web, WhatsApp, IVR icons
7. Security Layer — lock icon, bottom-spanning

Each layer: Glass card with layer name, 3 component chips inside.
Active connection lines animate flowing dots between layers.

---

### Section 8: Market Differentiation Matrix

**Headline:** "The only platform that operates DURING the attack."

8-row × 6-column comparison table:
- Row headers: 8 capability dimensions
- Column headers: Truecaller | NCRP | Bank Systems | MHA 1930 | RBI | **CyberKavach**
- Empty cells: "—" in --text-muted
- CyberKavach column: Every cell "YES" in emerald with checkmark, column highlighted with subtle saffron border
- CyberKavach column header: Saffron background, bold white text

---

### Section 9: Roadmap

Horizontal timeline with 4 nodes:

**Node 1: MVP (Hackathon)**
- Status chip: "LIVE NOW" in emerald
- Deliverables list

**Node 2: Pilot (Months 1-3)**
**Node 3: Scale (Months 4-12)**
**Node 4: National (Year 2)**

Timeline: Horizontal connecting line, nodes are circles with inner glow.
Current phase glows brighter. Future phases are slightly dimmed.

---

### Section 10: CTA / Footer

**CTA Block:**
- Centered, max-width 640px
- Headline: "Make India's digital future untouchable."
- Sub: "Join us in building the national fraud intelligence platform."
- Two buttons: "Request Pilot Partnership" | "Watch Full Demo"
- Kavach shield illustration behind — large, low-opacity watermark

**Footer:**
- Minimal. Wordmark + tagline + hackathon badge
- Links: Privacy | Architecture | GitHub (if applicable)
- Bottom: "CyberKavach AI — ET AI Hackathon 2.0 | Problem Statement 6 — Digital Public Safety"

---

## 🧩 COMPONENT LIBRARY TO BUILD

### Buttons
- Primary (saffron filled): Default | Hover | Active | Disabled | Loading
- Secondary (glass outlined): Default | Hover | Active | Disabled
- Danger (crimson filled): Default | Hover | Active
- Ghost (text only): Default | Hover

### Status Badges
- SAFE / GENUINE: Emerald + shield icon
- SUSPICIOUS: Gold + warning icon
- ACTIVE FRAUD / COUNTERFEIT: Crimson + alert icon + pulse animation
- SCANNING / LIVE: Ice + spinning indicator

### Cards
- Glass L1 (default info)
- Glass L2 (alert / elevated)
- Glass L3 (danger / fraud)
- Glass L4 (safe / verified)
- Feature card (icon + title + body + CTA)
- Stat card (number + label + trend indicator)
- Entity node card (for network graph detail panel)

### Form Elements
- Text input: Default | Focus | Error | Filled
- Language selector dropdown with flag icons
- Toggle switches (for features like "Enable Live Monitoring")
- Confidence score slider (read-only visual display)

### Navigation
- Sidebar navigation (desktop)
- Bottom tab bar (mobile, 5 tabs)
- Breadcrumb trail (dashboard sub-pages)

### Data Visualization Components
- 4-stage funnel indicator (horizontal progress)
- Network graph node (7 variants)
- Confidence ring (circular progress, percentage inside)
- Campaign timeline bar
- Choropleth map region (hover state)
- Live activity feed item

### Alerts & Notifications
- Toast notification (3 variants: info / warning / danger)
- Full-screen interrupt overlay (mobile — the scam alert)
- Inline alert banner (dashboard warnings)
- Push notification preview

### Overlays & Modals
- Evidence package export modal
- Network node detail side panel
- Language switcher dropdown
- Confirmation dialog

---

## 📐 FIGMA FILE STRUCTURE

```
CyberKavach AI
├── 🎨 Design System
│   ├── Color Tokens (all variables defined)
│   ├── Typography Scale
│   ├── Spacing & Grid
│   ├── Elevation & Glass Levels (4 variants)
│   ├── Icons (all custom)
│   └── Animations (prototype flows + Lottie specs)
├── 🧩 Component Library
│   ├── Atoms (buttons, badges, inputs, toggles)
│   ├── Molecules (cards, alerts, nav items, form groups)
│   ├── Organisms (sidebars, nav bars, graph panels, overlays)
│   └── Templates (dashboard layout, mobile shell, landing sections)
├── 📱 Mobile App — Citizen Fraud Shield
│   ├── Home (Safe State)
│   ├── Home (Active Threat State)
│   ├── Scam Interrupt Overlay (full-screen red)
│   ├── WhatsApp Advisory Chat
│   ├── Currency Scanner (Viewfinder)
│   ├── Currency Scanner (Processing)
│   ├── Currency Scanner (GENUINE result)
│   ├── Currency Scanner (COUNTERFEIT result)
│   ├── Fraud Encyclopedia
│   ├── Report Submission Flow (3 screens)
│   └── Language Selector
├── 🖥️ Law Enforcement Dashboard (Web)
│   ├── Fraud Network Graph (default view)
│   ├── Network Graph — Node Detail Panel
│   ├── Live Scam Interceptor
│   ├── Manipulation Intelligence
│   ├── Predictive Campaign Map
│   ├── Evidence Package Export
│   └── Counterfeit Reports Heatmap
└── 🌐 Landing Page (Web)
    ├── Hero Section
    ├── Stats Bar
    ├── Paradigm Shift (2-col)
    ├── 6 Feature Cards
    ├── Demo Preview (interactive)
    ├── User Personas
    ├── Architecture Diagram
    ├── Market Matrix Table
    ├── Roadmap Timeline
    └── CTA + Footer
```

---

## 🔑 CRITICAL DESIGN RULES

1. **Never use generic SaaS blue** (#3B82F6 or similar Bootstrap/Tailwind defaults). Every color must come from the defined palette.

2. **Every glass card must have an inner top-left light source** — a subtle white gradient from the top-left corner at 5–8% opacity simulates ambient room lighting and adds real depth.

3. **All data values in JetBrains Mono.** Account numbers, phone numbers, confidence scores, UPI IDs, hash strings — always monospace. This creates a "technical authenticity" that generic sans-serif destroys.

4. **The Kavach shield mark must appear on every screen** — either as a hero element, a small icon, or a low-opacity watermark on dark backgrounds. It is the visual anchor of the brand.

5. **Animations should feel like a military briefing room**, not a consumer app. Controlled, precise, purposeful. No bouncy spring animations except for CTA buttons. No confetti. No mascots.

6. **Status colors are sacred.** Green = SAFE. Amber = SUSPICIOUS. Red = DANGER. These must never be used decoratively for anything other than their designated status. A user in crisis needs instant color comprehension.

7. **Multilingual is a feature, not an afterthought.** At least 2 mockup screens should show Hindi/Odia/Tamil text rendered alongside English. The language selector must be prominent and accessible within 1 tap from any screen.

8. **Every number on the dashboard must feel live.** Use subtle animation (soft fade between value updates), a pulsing dot, or a "last updated 3s ago" timestamp to communicate real-time data freshness.

9. **Mobile-first in all respects.** The citizen app is the most critical user-facing product. Every touch target: minimum 44×44px. Thumb-friendly bottom navigation. No content below the fold that a citizen in panic would miss.

10. **The Law Enforcement dashboard is a power tool.** Density is appropriate. Information hierarchy over whitespace. Experts need data, not decoration.

---

## 🚀 DELIVERABLES CHECKLIST

- [ ] Design Token library (variables in Figma)
- [ ] 45+ component variants (all states)
- [ ] 20+ unique screen designs (mobile + desktop + landing)
- [ ] 8 prototype flows with transitions specified
- [ ] Animation specification annotations for each animated element
- [ ] Handoff-ready with auto-layout, proper naming, and dev mode notes
- [ ] Responsive breakpoints: 375px | 768px | 1280px | 1440px

---

*CyberKavach AI — ET AI Hackathon 2.0 | Problem Statement 6 | Confidential Design Brief*