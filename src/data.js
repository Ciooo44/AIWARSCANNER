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
  { id: "cvn78", name: "USS Gerald R. Ford (CVN-78)", type: "carrier", lat: 34.5, lon: 20.0, status: "transiting", details: "World's largest carrier. Transiting Atlantic → Mediterranean → Arabian Sea. ETA: early March.", icon: "⚓" },
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
];

// ── Live News Feed ─────────────────────────────────────────────
export const NEWS_ITEMS = [
  { time: "1h ago", source: "Al Jazeera", title: "Tracking the rapid US military build-up near Iran — full asset breakdown", category: "military", url: "https://aljazeera.com" },
  { time: "3h ago", source: "NBC News", title: "US pushes more weaponry into Middle East for possible strikes on Iran", category: "military", url: "https://nbcnews.com" },
  { time: "5h ago", source: "Bloomberg", title: "Trump tells reporters: Iran has 10 to 'pretty much maximum' 15 days to reach a deal", category: "diplomacy", url: "https://bloomberg.com" },
  { time: "7h ago", source: "Reuters", title: "Araghchi says 'some progress' made in Geneva but no imminent nuclear deal", category: "diplomacy", url: "https://reuters.com" },
  { time: "9h ago", source: "Wall Street Journal", title: "US amasses greatest airpower buildup in Middle East since 2003 invasion of Iraq", category: "military", url: "https://wsj.com" },
  { time: "10h ago", source: "Axios", title: "Analysis: No signs of a breakthrough in negotiations — war looks most likely option", category: "analysis", url: "https://axios.com" },
  { time: "14h ago", source: "CNN", title: "Iran temporarily closes Strait of Hormuz for IRGC military drills", category: "military", url: "https://cnn.com" },
  { time: "18h ago", source: "Washington Post", title: "Gulf states warn US: Iran retains short-range ballistic missiles that could strike bases", category: "intelligence", url: "https://washingtonpost.com" },
  { time: "1d ago", source: "Critical Threats", title: "Iran regime conducting diplomatic, informational & military effort to prevent US action", category: "analysis", url: "https://criticalthreats.org" },
  { time: "1d ago", source: "CFR", title: "All US military forces required for possible action to be in place by mid-March", category: "military", url: "https://cfr.org" },
  { time: "2d ago", source: "BBC", title: "European leaders suggest Iran's leadership in its 'final days and weeks'", category: "diplomacy", url: "https://bbc.com" },
  { time: "2d ago", source: "New York Times", title: "UAE tells Washington: We will not allow military ops from our territory", category: "diplomacy", url: "https://nytimes.com" },
  { time: "3d ago", source: "Reuters", title: "India seizes vessels linked to illicit Iranian oil shipments under sanctions pressure", category: "intelligence", url: "https://reuters.com" },
  { time: "3d ago", source: "IISS", title: "Iran has built multilayered defense: mines, missiles, submarines, drones around Hormuz", category: "analysis", url: "https://iiss.org" },
  { time: "4d ago", source: "Al Jazeera", title: "B-2 stealth bombers at Diego Garcia — 'Watch for movement' says CSIS analyst", category: "military", url: "https://aljazeera.com" },
];

// ── Key Actors ─────────────────────────────────────────────────
export const KEY_ACTORS = [
  { name: "Donald Trump", role: "US President", stance: "10-15 days ultimatum — 'bad things will happen'", color: "#2979ff", stanceColor: "#ff6d00" },
  { name: "Ali Khamenei", role: "Iran Supreme Leader", stance: "Warns confrontation could spark wider regional war", color: "#ff1744", stanceColor: "#ff1744" },
  { name: "Steve Witkoff", role: "US Special Envoy", stance: "Leading Geneva nuclear talks — awaiting Iran's written proposal", color: "#2979ff", stanceColor: "#ffd600" },
  { name: "Abbas Araghchi", role: "Iran Foreign Minister", stance: "'Some progress' but no deal — says Iran rebuilt June 2025 damage", color: "#ff1744", stanceColor: "#ffd600" },
  { name: "Benjamin Netanyahu", role: "Israel Prime Minister", stance: "Will not allow Iran to re-establish missile/nuclear programs", color: "#00e676", stanceColor: "#00e676" },
  { name: "Pete Hegseth", role: "US Secretary of Defense", stance: "All forces in place by mid-March — Iran will pay for Houthi support", color: "#2979ff", stanceColor: "#ff6d00" },
  { name: "Masoud Pezeshkian", role: "Iran President", stance: "Diplomatic outreach to regional states — flurry of activity", color: "#ff1744", stanceColor: "#ffd600" },
  { name: "Reza Pahlavi", role: "Iranian Opposition (exiled)", stance: "Calls for targeted military strikes against the regime", color: "#e040fb", stanceColor: "#e040fb" },
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
};
