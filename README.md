# 🔴 US-IRAN CONFLICT MONITOR

**Real-time situational awareness dashboard** tracking the 2026 US-Iran crisis — military deployments, nuclear negotiations, crisis timeline, and regional positions.

![Threat Level: CRITICAL](https://img.shields.io/badge/THREAT%20LEVEL-CRITICAL-red?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

---

## Features

### 🗺️ Interactive Theater Map
- **US Naval Assets**: 14+ warships including USS Abraham Lincoln & USS Gerald R. Ford carrier strike groups, destroyers, LCS, and Ohio-class SSGN
- **US Military Bases**: 11 installations across Qatar, Bahrain, Kuwait, Saudi Arabia, Oman, Turkey, Iraq, Syria, Israel, and Diego Garcia
- **Iran Assets**: 4 nuclear facilities (Natanz, Fordow, Bushehr, Isfahan), military complexes, naval bases, and Strait of Hormuz chokepoint
- **Layer Filtering**: Toggle between All, US Forces, and Iran Assets views
- **Interactive tooltips** with detailed asset information

### 📡 Live Intelligence Feed
- **15+ news items** from Al Jazeera, NBC, Bloomberg, Reuters, WSJ, CNN, Axios, BBC, NYT, CFR
- **Category filters**: Military, Diplomacy, Analysis, Intelligence
- Breaking news indicators

### ⏱️ Crisis Timeline
- **19 key events** from June 2025 (Operation Midnight Hammer) through today
- Color-coded severity: Critical / High / Elevated
- Expandable full timeline view

### ⚔️ Force Composition
- Side-by-side US vs Iran military capability comparison
- Detailed asset counts and capabilities

### 👥 Key Actors & Diplomatic Track
- 8 key decision-makers with current positions
- Trump ultimatum tracker
- Geneva nuclear talks status

### 🌍 Regional Positions
- 15 countries' official positions on potential military action
- Color-coded: Supports / Opposes / Neutral

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/us-iran-monitor.git
cd us-iran-monitor

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo at vercel.com/new
```

One-click deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/us-iran-monitor)

---

## Tech Stack

- **React 18** — UI components
- **Vite 6** — Build tool
- **SVG** — Interactive theater map (no external map dependencies)
- **Pure CSS** — Animations, military-grade aesthetic
- **JetBrains Mono** — Monospace typography

## Project Structure

```
us-iran-monitor/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main dashboard layout
│   ├── TheaterMap.jsx   # SVG map component
│   ├── data.js          # All military/news/timeline data
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Data Sources

All data is sourced from open-source intelligence (OSINT):
- **CENTCOM** — US Central Command official communications
- **Critical Threats (AEI)** — Iran updates & CTP-ISW analysis
- **Council on Foreign Relations** — Global Conflict Tracker
- **IISS** — Military balance assessments
- **Major news outlets** — Al Jazeera, BBC, CNN, Reuters, NYT, WSJ, NBC, Bloomberg, Axios, Washington Post

## Updating Data

All data is centralized in `src/data.js`. To update:

1. Edit `NEWS_ITEMS` array with latest headlines
2. Update `CRISIS_TIMELINE` with new events
3. Modify `US_NAVAL_ASSETS` / `IRAN_ASSETS` for force movements
4. Adjust `CURRENT_THREAT` level as situation evolves
5. Update `REGIONAL_POSITIONS` for diplomatic changes

---

## Disclaimer

This dashboard is for **informational and educational purposes only**. It aggregates publicly available open-source information. Asset positions on the map are approximate and based on publicly reported data — they do not represent classified intelligence.

## License

MIT
