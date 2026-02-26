// ============================================================
// US-IRAN CONFLICT MONITOR — DATA LAYER
// All data sourced from OSINT as of February 20, 2026
// ============================================================

export const THREAT_LEVELS = {
  CRITICAL: { color: "#ff1744", bg: "#ff174420", label: "CRITICAL", pulse: true },
  HIGH: { color: "#ff6d00", bg: "#ff6d0020", label: "HIGH", pulse: true },
  ELEVATED: { color: "#ffd600", bg: "#ffd60020", label: "ELEVATED", pulse: false },
  GUARDED: { color: "#00e676", bg: "#00e67620", label: "GUARDED", pulse: false },
};

export const CURRENT_THREAT = THREAT_LEVELS.CRITICAL;

// ── US Naval Assets currently deployed to CENTCOM AOR ──────────
export const US_NAVAL_ASSETS = [
  { id: "cvn72", name: "USS Abraham Lincoln (CVN-72)", type: "carrier", lat: 22.5, lon: 62.0, status: "deployed", details: "Carrier Strike Group — Arabian Sea. Departed San Diego Nov 2025, redirected from South China Sea.", icon: "⚓" },
  { id: "cvn78", name: "USS Gerald R. Ford (CVN-78)", type: "carrier", lat: 32.8, lon: 34.5, status: "deployed", details: "⚠️ APPROACHING ISRAEL — World's largest carrier now positioned off Israeli coast. Strike capability doubled with Lincoln CSG.", icon: "⚓" },
  { id: "ddg115", name: "USS Frank E. Petersen Jr. (DDG-115)", type: "destroyer", lat: 22.2, lon: 61.8, status: "deployed", details: "Abraham Lincoln CSG escort — Arleigh Burke-class", icon: "🚢" },
  { id: "ddg112", name: "USS Michael Murphy (DDG-112)", type: "destroyer", lat: 22.8, lon: 62.3, status: "deployed", details: "Abraham Lincoln CSG escort — Arleigh Burke-class", icon: "🚢" },
  { id: "ddg111", name: "USS Spruance (DDG-111)", type: "destroyer", lat: 23.0, lon: 61.5, status: "deployed", details: "Abraham Lincoln CSG escort — Arleigh Burke-class", icon: "🚢" },
  { id: "ddg87", name: "USS McFaul (DDG-87)", type: "destroyer", lat: 26.5, lon: 56.3, status: "deployed", details: "Strait of Hormuz patrol", icon: "🚢" },
  { id: "ddg57", name: "USS Mitscher (DDG-57)", type: "destroyer", lat: 26.8, lon: 56.1, status: "deployed", details: "Strait of Hormuz patrol", icon: "🚢" },
  { id: "ddg80", name: "USS Roosevelt (DDG-80)", type: "destroyer", lat: 35.5, lon: 18.5, status: "deployed", details: "Mediterranean Sea — eastern Med patrol", icon: "🚢" },
  { id: "ddg84", name: "USS Bulkeley (DDG-84)", type: "destroyer", lat: 35.2, lon: 19.0, status: "deployed", details: "Mediterranean Sea", icon: "🚢" },
  { id: "ddg100", name: "USS Delbert D. Black (DDG-100)", type: "destroyer", lat: 14.5, lon: 42.0, status: "deployed", details: "Red Sea operations — Houthi deterrence", icon: "🚢" },
  { id: "lcs30", name: "USS Canberra (LCS-30)", type: "lcs", lat: 26.0, lon: 51.5, status: "deployed", details: "Persian Gulf patrol — Independence-class", icon: "🚤" },
  { id: "lcs16", name: "USS Tulsa (LCS-16)", type: "lcs", lat: 25.5, lon: 52.0, status: "deployed", details: "Persian Gulf patrol — Independence-class", icon: "🚤" },
  { id: "lcs32", name: "USS Santa Barbara (LCS-32)", type: "lcs", lat: 25.8, lon: 51.0, status: "deployed", details: "Persian Gulf patrol — Independence-class", icon: "🚤" },
  { id: "ssn_ohio", name: "SSGN (Ohio-class, undisclosed)", type: "submarine", lat: 23.0, lon: 60.0, status: "deployed", details: "Guided missile submarine — 154 Tomahawk cruise missiles. Exact location classified.", icon: "🔻" },
];

// ── US Military Bases in the region ────────────────────────────
export const US_BASES = [
  { id: "aludeid", name: "Al Udeid Air Base", country: "Qatar", lat: 25.117, lon: 51.315, type: "airbase", details: "CENTCOM Forward HQ. ~10,000 personnel. Struck by Iran IRGC ballistic missiles June 23, 2025." },
  { id: "bahrain", name: "NSA Bahrain / NAVCENT", country: "Bahrain", lat: 26.209, lon: 50.608, type: "naval", details: "US Naval Forces Central Command — 5th Fleet HQ. ~9,000 personnel." },
  { id: "arifjan", name: "Camp Arifjan", country: "Kuwait", lat: 28.932, lon: 48.075, type: "army", details: "US Army Central forward HQ. Largest US Army facility in the Gulf." },
  { id: "alibrahim", name: "Ali Al Salem Air Base", country: "Kuwait", lat: 29.347, lon: 47.519, type: "airbase", details: "F-15E Strike Eagles deployed. Key ISR hub." },
  { id: "princessultan", name: "Prince Sultan Air Base", country: "Saudi Arabia", lat: 24.062, lon: 47.580, type: "airbase", details: "F-22 Raptors, Patriot batteries, THAAD missile defense." },
  { id: "thumrait", name: "Thumrait Air Base", country: "Oman", lat: 17.666, lon: 54.024, type: "airbase", details: "B-1B Lancer bombers staging area. KC-135 tanker support." },
  { id: "diegogarcia", name: "Diego Garcia", country: "BIOT", lat: -7.316, lon: 72.411, type: "airbase", details: "Joint UK-US base. B-2 Spirit stealth bombers. Key for long-range strike ops (Operation Midnight Hammer 2025)." },
  { id: "incirlik", name: "Incirlik Air Base", country: "Turkey", lat: 37.002, lon: 35.425, type: "airbase", details: "NATO / USAF. ~50 B61 nuclear gravity bombs stored. Turkey opposes use for Iran ops." },
  { id: "ainasad", name: "Ain al-Asad Air Base", country: "Iraq", lat: 33.772, lon: 42.448, type: "airbase", details: "Major US base in Iraq. Struck by Iran ballistic missiles January 2020." },
  { id: "tanf", name: "Al-Tanf Garrison", country: "Syria", lat: 33.476, lon: 38.629, type: "army", details: "US Special Operations Forces. Syria-Jordan border crossing control." },
  { id: "negev", name: "Site 512 / Negev", country: "Israel", lat: 30.050, lon: 34.920, type: "radar", details: "AN/TPY-2 X-band radar. Ballistic missile early warning for Israel & US forces." },
];

// ── Iranian Military Assets ────────────────────────────────────
export const IRAN_ASSETS = [
  { id: "bushehr", name: "Bushehr Nuclear Plant", lat: 28.831, lon: 50.887, type: "nuclear", details: "1,000 MW light-water reactor. Russian-built. Operational since 2011." },
  { id: "natanz", name: "Natanz Enrichment Facility", lat: 33.724, lon: 51.727, type: "nuclear", details: "Primary centrifuge facility. Struck June 2025 (Op. Midnight Hammer). Deep underground halls." },
  { id: "fordow", name: "Fordow Enrichment Plant", lat: 34.880, lon: 51.985, type: "nuclear", details: "Built inside mountain near Qom. Enriching to near weapons-grade. Struck June 2025." },
  { id: "isfahan", name: "Isfahan UCF", lat: 32.697, lon: 51.688, type: "nuclear", details: "Uranium Conversion Facility. Converts yellowcake to UF6 for enrichment." },
  { id: "parchin", name: "Parchin Military Complex", lat: 35.522, lon: 51.773, type: "military", details: "Military research. Satellite imagery (Jan 2026) shows active reconstruction with concrete." },
  { id: "bandarabbas", name: "Bandar Abbas Naval Base", lat: 27.148, lon: 56.276, type: "naval", details: "Iranian Navy / IRGCN HQ. Controls Strait of Hormuz. Fast attack boats, mines, submarines." },
  { id: "chabahar", name: "Chabahar Naval Base", lat: 25.290, lon: 60.637, type: "naval", details: "Gulf of Oman access. Ghadir-class midget submarines. Anti-ship missile batteries." },
  { id: "khatam", name: "Khatam al-Anbiya HQ", lat: 35.701, lon: 51.394, type: "military", details: "IRGC Air Defense Command — Tehran. S-300PMU2, Bavar-373 SAM systems." },
  { id: "tabriz", name: "Tabriz Air Base (TFB.2)", lat: 38.133, lon: 46.234, type: "airbase", details: "Su-35S fighters (Russian-supplied), legacy F-14AM Tomcats." },
  { id: "shiraz", name: "Shiraz Air Base (TFB.6)", lat: 29.540, lon: 52.590, type: "airbase", details: "F-4E Phantom IIs, Su-24 Fencers. Southern air defense." },
  { id: "hormuz_mines", name: "Strait of Hormuz", lat: 26.575, lon: 56.25, type: "chokepoint", details: "21 km wide. 20% of global oil transit. Iran conducting live-fire IRGC drills Feb 20, 2026." },
  { id: "kharg", name: "Kharg Island Oil Terminal", lat: 29.233, lon: 50.323, type: "economic", details: "~90% of Iran's oil exports. Critical infrastructure target." },
];

// ── Crisis Timeline ────────────────────────────────────────────
export const CRISIS_TIMELINE = [
  { date: "Jun 22, 2025", event: "Operation Midnight Hammer: US & Israel strike 3 Iranian nuclear sites (Natanz, Fordow, Isfahan)", severity: "critical" },
  { date: "Jun 23, 2025", event: "Iran retaliates — IRGC ballistic missiles hit Al Udeid Air Base in Qatar", severity: "critical" },
  { date: "Oct 2025", event: "Israel launches largest direct strike on Iran — air defenses & missile production hit", severity: "high" },
  { date: "Dec 28, 2025", event: "Nationwide protests erupt across all 31 Iranian provinces — economic collapse catalyst", severity: "high" },
  { date: "Jan 13, 2026", event: "Iran warns 'ready for war' — Trump threatens military action over protest crackdown", severity: "critical" },
  { date: "Jan 15, 2026", event: "Gulf states (Qatar, Saudi, Oman, Egypt) urge US not to attack — fear Iranian retaliation", severity: "elevated" },
  { date: "Jan 26, 2026", event: "USS Abraham Lincoln CSG deployed to Arabian Sea from South China Sea", severity: "high" },
  { date: "Jan 29, 2026", event: "AFCENT announces multi-day readiness drills across 20+ nations in AOR", severity: "high" },
  { date: "Jan 30, 2026", event: "Araghchi meets Erdogan in Istanbul — diplomatic track re-opens", severity: "elevated" },
  { date: "Feb 2, 2026", event: "Araghchi-Witkoff meet in Turkey — indirect nuclear talks resume via Omani mediation", severity: "elevated" },
  { date: "Feb 6, 2026", event: "USS Gerald R. Ford ordered to Middle East — 2nd carrier strike group deployment", severity: "critical" },
  { date: "Feb 14, 2026", event: "Geneva talks: 'Guiding principles' agreed but Araghchi says no deal imminent", severity: "elevated" },
  { date: "Feb 18, 2026", event: "WSJ: Largest US airpower buildup in Middle East since 2003 Iraq invasion", severity: "critical" },
  { date: "Feb 18, 2026", event: "Axios analysis: No signs of breakthrough — war looks the most likely option", severity: "critical" },
  { date: "Feb 19, 2026", event: "Trump: Iran has '10 to 15 days at most' to reach deal or 'bad things will happen'", severity: "critical" },
  { date: "Feb 19, 2026", event: "NSC Situation Room meeting: All forces for possible action in place by mid-March", severity: "critical" },
  { date: "Feb 19, 2026", event: "Poland orders citizens to leave Iran immediately", severity: "high" },
  { date: "Feb 20, 2026", event: "Iran closes Strait of Hormuz sections for IRGC live-fire military drills", severity: "critical" },
  { date: "Feb 20, 2026", event: "UAE declares: No military operations from our territory or airspace", severity: "high" },
  { date: "Feb 21, 2026", event: "Pezeshkian: 'Iran will not bow down to US pressure in nuclear talks'", severity: "critical" },
  { date: "Feb 21, 2026", event: "Pakistan strikes Afghanistan — cross-border tensions escalate regionally", severity: "elevated" },
  { date: "Feb 22, 2026", event: "AIWARSCANNER launches real-time conflict monitoring dashboard", severity: "info" },
  { date: "Feb 22, 2026", event: "Trump raises US global tariff to 15% after Supreme Court ruling — economic uncertainty", severity: "elevated" },
  { date: "Feb 22, 2026", event: "Gulf states reaffirm: No military bases for US operations against Iran", severity: "high" },
  { date: "Feb 23, 2026", event: "US-Iran Geneva talks continue — Oman confirms Thursday meeting", severity: "elevated" },
  { date: "Feb 23, 2026", event: "NY Times: Trump weighing limited strike with regime change escalation plan", severity: "critical" },
  { date: "Feb 23, 2026", event: "USS Gerald R. Ford arrives and docks at Haifa, Israel — dual carrier formation", severity: "critical" },
  { date: "Feb 24, 2026", event: "🚨 Anti-government protests spread to more Iranian universities", severity: "critical" },
  { date: "Feb 24, 2026", event: "US partially evacuates Beirut embassy — non-essential staff ordered out", severity: "critical" },
  { date: "Feb 24, 2026", event: "Israeli strikes kill at least 10 in Lebanon — deadliest since ceasefire ended", severity: "critical" },
  { date: "Mar 1, 2026", event: "⚠️ DEADLINE: Trump ultimatum expires — 85% action probability window opens", severity: "critical" },
  { date: "Mar 7, 2026", event: "🔮 POLYMARKET: $355M volume — 33% YES probability US strikes Iran by this date", severity: "prediction" },
  { date: "Mar 15, 2026", event: "🔮 POLYMARKET: $355M volume — 42% YES probability (+9%) US strikes by this date", severity: "prediction" },
  { date: "Mar 31, 2026", event: "🔮 POLYMARKET: $15M volume — 21% probability Khamenei removal / regime change", severity: "prediction" },
];

// ── Live News Feed ─────────────────────────────────────────────
export const NEWS_ITEMS = [
  { time: "🔥 BREAKING", source: "BBC", title: "US-Iran talks end after 'significant progress' — Geneva mediator says indirect negotiations concluded", category: "diplomacy", url: "https://www.bbc.com/news/articles/cvg1vd95nl9o" },
  { time: "⚡ JUST IN", source: "BBC", title: "US embassy to provide passport services at West Bank settlements — Palestinian Authority condemns move", category: "diplomacy", url: "https://www.bbc.com/news/articles/cx2g78k148eo" },
  { time: "15m ago", source: "Al Jazeera", title: "What is Greater Israel, and how popular is it among Israelis? — US and Israeli comments trigger regional concerns", category: "analysis", url: "https://www.aljazeera.com/news/2026/2/26/what-is-greater-israel-and-how-popular-is-it-among-israelis" },
  { time: "30m ago", source: "Al Jazeera", title: "Global impunity fuels Israel's illegal push to annex West Bank: Amnesty — Rights group slams international failure", category: "analysis", url: "https://www.aljazeera.com/news/2026/2/26/global-impunity-fuels-israels-illegal-push-to-annex-west-bank-amnesty" },
  { time: "1h ago", source: "BBC", title: "Anti-government student protests spread to more Iranian universities — fresh wave began Saturday", category: "protest", url: "https://www.bbc.com/news/articles/clyxrv8z0vdo" },
  { time: "3h ago", source: "BBC", title: "US partially evacuates Beirut embassy amid rising Iran tensions — State Department orders non-essential staff out", category: "military", url: "https://www.bbc.com/news/articles/cj32l00k47lo" },
  { time: "5h ago", source: "BBC", title: "Israeli strikes kill at least 10 in Lebanon — among deadliest since ceasefire ended", category: "military", url: "https://www.bbc.com/news/articles/cvg8914dkl0o" },
  { time: "8h ago", source: "CNN", title: "US military pulls last troops from key military facility in Syria — ISIS concerns remain", category: "military", url: "https://edition.cnn.com/2026/02/12/politics/us-troops-withdrawal-syria-isis" },
  { time: "12h ago", source: "NY Times / Times of Israel", title: "TRUMP PLAN REVEALED: Initial LIMITED strike on Iran, escalating to REGIME CHANGE if no results", category: "military", url: "https://www.timesofisrael.com/liveblog_entry/ny-times-trump-weighing-initial-limited-iran-strike-but-going-for-regime-change-if-no-results/" },
  { time: "14h ago", source: "Live Tracking", title: "USS GERALD R. FORD POSITIONED OFF ISRAEL — CVN-78 now 50km from Haifa coast", category: "military", url: "https://twitter.com/search?q=USS+Ford+Israel" },
  { time: "16h ago", source: "Die Welt", title: "Iran warns of 'full force' response — Tehran: Even 'limited' attack will be answered with full harshness", category: "diplomacy", url: "https://www.welt.de/politik/ausland/article699c3ec8ee35d0f0647c4a06/iran-usa-konflikt-teheran-warnt-vor-voller-haerte-bei-jedem-angriff.html" },
  { time: "18h ago", source: "Al Jazeera", title: "IRGC conducts overnight missile drills near Natanz — satellite imagery shows increased activity", category: "military", url: "https://www.aljazeera.com/news/" },
  { time: "20h ago", source: "BBC", title: "Russia warns US against 'dangerous escalation' — Lavrov: 'Iran strike would destabilize entire region'", category: "diplomacy", url: "https://www.bbc.com/news/world/middle_east" },
  { time: "1d ago", source: "CNN", title: "DEFCON level raised at CENTCOM bases — personnel recall ordered for weekend", category: "military", url: "https://www.cnn.com/politics" },
  { time: "1d ago", source: "Financial Times", title: "Oil traders brace for weekend volatility — Brent futures surge on strike speculation", category: "economic", url: "https://www.ft.com" },
];

// ── Key Actors ─────────────────────────────────────────────────
export const KEY_ACTORS = [
  { name: "Donald Trump", role: "US President", stance: "10-15 days ultimatum — 'bad things will happen'", color: "#2979ff", stanceColor: "#ff6d00", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/440px-Donald_Trump_official_portrait.jpg", twitter: "@realDonaldTrump", note: "Posted on Truth Social: 'Iran has to make a deal fast'" },
  { name: "Ali Khamenei", role: "Iran Supreme Leader", stance: "Warns confrontation could spark wider regional war", color: "#ff1744", stanceColor: "#ff1744", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Ali_Khamenei_2023.jpg/440px-Ali_Khamenei_2023.jpg", twitter: "@Khamenei_fa", note: "State TV statement: 'We are prepared for all scenarios'" },
  { name: "Steve Witkoff", role: "US Special Envoy", stance: "Leading Geneva nuclear talks — awaiting Iran's written proposal", color: "#2979ff", stanceColor: "#ffd600", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Steve_Witkoff_2025.jpg/440px-Steve_Witkoff_2025.jpg", twitter: "—", note: "Met with Araghchi in Geneva (Feb 20) — 'Progress but gaps remain'" },
  { name: "Abbas Araghchi", role: "Iran Foreign Minister", stance: "'Some progress' but no deal — says Iran rebuilt June 2025 damage", color: "#ff1744", stanceColor: "#ffd600", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Abbas_Arghchi_2024.jpg/440px-Abbas_Arghchi_2024.jpg", twitter: "@araghchi", note: "Tweeted: 'Iran will not surrender to pressure diplomacy'" },
  { name: "Benjamin Netanyahu", role: "Israel Prime Minister", stance: "Will not allow Iran to re-establish missile/nuclear programs", color: "#00e676", stanceColor: "#00e676", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Benjamin_Netanyahu_2023.jpg/440px-Benjamin_Netanyahu_2023.jpg", twitter: "@netanyahu", note: "Knesset speech: 'Israel reserves right to act alone'" },
  { name: "Pete Hegseth", role: "US Secretary of Defense", stance: "All forces in place by mid-March — Iran will pay for Houthi support", color: "#2979ff", stanceColor: "#ff6d00", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Pete_Hegseth_2025.jpg/440px-Pete_Hegseth_2025.jpg", twitter: "@PeteHegseth", note: "Pentagon briefing: '2 carriers, 8 destroyers ready'" },
  { name: "Masoud Pezeshkian", role: "Iran President", stance: "Diplomatic outreach to regional states — flurry of activity", color: "#ff1744", stanceColor: "#ffd600", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Masoud_Pezeshkian_2024.jpg/440px-Masoud_Pezeshkian_2024.jpg", twitter: "—", note: "Phone calls with leaders of Qatar, Oman, Turkey (Feb 21)" },
  { name: "Reza Pahlavi", role: "Iranian Opposition (exiled)", stance: "Calls for targeted military strikes against the regime", color: "#e040fb", stanceColor: "#e040fb", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Reza_Pahlavi_2023.jpg/440px-Reza_Pahlavi_2023.jpg", twitter: "@PahlaviReza", note: "WSJ op-ed: 'Time for regime change in Tehran'" },
];

// ── Regional Positions ─────────────────────────────────────────
export const REGIONAL_POSITIONS = [
  { country: "🇸🇦 Saudi Arabia", position: "Calls for peaceful, diplomatic resolution", stance: "neutral" },
  { country: "🇦🇪 UAE", position: "Will not allow military ops from territory or airspace", stance: "against" },
  { country: "🇹🇷 Turkey", position: "Opposes US military action — offers to mediate", stance: "against" },
  { country: "🇶🇦 Qatar", position: "Active de-escalation diplomacy", stance: "neutral" },
  { country: "🇮🇶 Iraq", position: "Warns escalation threatens regional stability — respect sovereignty", stance: "against" },
  { country: "🇵🇰 Pakistan", position: "Opposes external interference — urges restraint and dialogue", stance: "against" },
  { country: "🇨🇳 China", position: "Wang Yi: War would have consequences across entire region", stance: "against" },
  { country: "🇷🇺 Russia", position: "Offers to store & process Iran's enriched uranium", stance: "neutral" },
  { country: "🇮🇱 Israel", position: "Supports US pressure — IDF chief estimates war within 2 weeks to 2 months", stance: "for" },
  { country: "🇵🇱 Poland", position: "Ordered citizens to leave Iran immediately (Feb 19)", stance: "for" },
  { country: "🇮🇳 India", position: "Reducing Iran oil purchases — seized vessels linked to shadow fleet", stance: "neutral" },
  { country: "🇫🇷 France", position: "Urges Tehran to accept negotiations and make concessions", stance: "neutral" },
  { country: "🇩🇪 Germany", position: "Chancellor Merz: Iran's leadership in 'final days and weeks'", stance: "for" },
  { country: "🇴🇲 Oman", position: "Hosting mediation — Busaidi as intermediary in nuclear talks", stance: "neutral" },
  { country: "🇪🇬 Egypt", position: "Urged US not to attack — fears Iranian retaliation on region", stance: "against" },
];

// ── Category styling ───────────────────────────────────────────
export const CATEGORY_COLORS = {
  military: "#ff1744",
  diplomacy: "#2979ff",
  analysis: "#ffd600",
  intelligence: "#00e676",
  protest: "#e040fb",
  economic: "#f7931a",
};
