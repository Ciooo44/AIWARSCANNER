import { useState, useEffect } from "react";
import TheaterMap from "./TheaterMap";
import WarPredictionPanel from "./components/WarPredictionPanel.jsx";
import LiveFlightRadar from "./components/LiveFlightRadar.jsx";
import LiveNewsTV from "./components/LiveNewsTV.jsx";
import { fetchLiveNews, startNewsRefresh } from "./data/newsFetcher.js";
import {
  CURRENT_THREAT,
  CRISIS_TIMELINE,
  NEWS_ITEMS as STATIC_NEWS,
  KEY_ACTORS,
  REGIONAL_POSITIONS,
  CATEGORY_COLORS,
  US_NAVAL_ASSETS,
  US_BASES,
  IRAN_ASSETS,
} from "./data";

// ── Escalation Gauge ───────────────────────────────────────────
function EscalationGauge() {
  const level = 87;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (level / 100) * circumference * 0.75;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="130" height="100" viewBox="0 0 130 110">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e676" />
            <stop offset="35%" stopColor="#ffd600" />
            <stop offset="65%" stopColor="#ff6d00" />
            <stop offset="100%" stopColor="#ff1744" />
          </linearGradient>
        </defs>
        <circle cx="65" cy="65" r="54" fill="none" stroke="#1a2332" strokeWidth="8"
          strokeDasharray={circumference * 0.75} strokeDashoffset={0}
          strokeLinecap="round" transform="rotate(135, 65, 65)" />
        <circle cx="65" cy="65" r="54" fill="none" stroke="url(#gaugeGrad)" strokeWidth="8"
          strokeDasharray={circumference * 0.75} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(135, 65, 65)"
          style={{ transition: "stroke-dashoffset 1s ease" }} />
        <text x="65" y="58" textAnchor="middle" fill="#ff1744" fontSize="26" fontWeight="700" fontFamily="'JetBrains Mono', monospace">{level}</text>
        <text x="65" y="76" textAnchor="middle" fill="#8b949e" fontSize="8" fontFamily="'JetBrains Mono', monospace" letterSpacing="1">ESCALATION</text>
      </svg>
      <div style={{ fontSize: 7, color: "#ff8a80", letterSpacing: 1, marginTop: -6 }}>CRITICAL THRESHOLD: 90</div>
    </div>
  );
}

// ── Trump Deadline Countdown ───────────────────────────────────
function DeadlineCountdown() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const deadline = new Date("2026-03-05T00:00:00Z");
    const update = () => {
      const diff = deadline - new Date();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 8, color: "#ff6d00", letterSpacing: 1, marginBottom: 8 }}>⏱ TRUMP ULTIMATUM COUNTDOWN</div>
      <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
        {[
          { v: timeLeft.days, l: "DAYS" },
          { v: timeLeft.hours, l: "HRS" },
          { v: timeLeft.minutes, l: "MIN" },
          { v: timeLeft.seconds, l: "SEC" },
        ].map((b, i) => (
          <div key={i} style={{
            background: "#161b22", border: "1px solid #ff174430", borderRadius: 4,
            padding: "5px 7px", minWidth: 40, textAlign: "center",
          }}>
            <div style={{
              fontSize: 17, fontWeight: 700,
              color: (timeLeft.days || 0) <= 5 ? "#ff1744" : "#ffd600",
              fontVariantNumeric: "tabular-nums",
            }}>{String(b.v ?? 0).padStart(2, "0")}</div>
            <div style={{ fontSize: 6, color: "#6e7681", letterSpacing: 1 }}>{b.l}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 7, color: "#484f58", marginTop: 5 }}>EST. DEADLINE: ~MAR 5, 2026</div>
    </div>
  );
}

// ── Header (sticky) ────────────────────────────────────────────
function Header({ currentTime }) {
  return (
    <div style={{
      background: "linear-gradient(180deg, #0d1117 0%, #0d1117ee 100%)",
      borderBottom: "1px solid #1a2332",
      padding: "12px 20px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 10,
      position: "sticky", top: 0, zIndex: 100,
      backdropFilter: "blur(12px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <img src="/logo.jpg" alt="AIWARSCANNER" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} />
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#e6edf3", letterSpacing: 2 }}>
            US — IRAN CONFLICT MONITOR
          </div>
          <div style={{ fontSize: 10, color: "#8b949e", marginTop: 2 }}>
            REAL-TIME SITUATIONAL AWARENESS DASHBOARD
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <EscalationGauge />
        <DeadlineCountdown />
      </div>
    </div>
  );
}

// ── Alert Ticker ───────────────────────────────────────────────
function AlertTicker() {
  return (
    <div style={{
      background: "linear-gradient(90deg, #ff174415 0%, #ff174408 50%, #ff174415 100%)",
      borderBottom: "1px solid #ff174440",
      padding: "8px 20px",
      display: "flex", alignItems: "center", gap: 10, overflow: "hidden",
    }}>
      <span style={{ color: "#ff1744", fontWeight: 700, fontSize: 10, letterSpacing: 1, animation: "blink 1.5s infinite", whiteSpace: "nowrap" }}>
        ⚠ FLASH
      </span>
      <div style={{ overflow: "hidden", flex: 1 }}>
        <div style={{
          color: "#ff8a80", fontSize: 11, whiteSpace: "nowrap",
          animation: "marquee 35s linear infinite",
        }}>
          TRUMP: IRAN HAS 10-15 DAYS TO MAKE DEAL OR FACE CONSEQUENCES • USS GERALD R. FORD TRANSITING TO ARABIAN SEA — 2ND CARRIER GROUP •
          LARGEST US AIRPOWER BUILDUP SINCE 2003 IRAQ INVASION • IRAN CLOSES STRAIT OF HORMUZ FOR IRGC LIVE-FIRE DRILLS •
          POLAND ORDERS CITIZENS TO LEAVE IRAN • ALL US FORCES IN PLACE BY MID-MARCH • GENEVA TALKS: PROGRESS BUT NO DEAL •
          UAE: NO MILITARY OPS FROM OUR TERRITORY • AXIOS: WAR LOOKS MOST LIKELY OPTION • IDF CHIEF: WAR WITHIN 2 WEEKS TO 2 MONTHS
        </div>
      </div>
    </div>
  );
}

// ── Quick Stats Bar ────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { label: "US NAVAL ASSETS", value: "14+", sub: "CENTCOM AOR", color: "#2979ff" },
    { label: "CARRIER GROUPS", value: "2", sub: "CVN-72 + CVN-78", color: "#2979ff" },
    { label: "US BASES ACTIVE", value: "11", sub: "MIDDLE EAST", color: "#00e676" },
    { label: "IRAN NUCLEAR", value: "4", sub: "SITES MONITORED", color: "#ff1744" },
    { label: "TRUMP DEADLINE", value: "~12d", sub: "ULTIMATUM ISSUED", color: "#ffd600" },
    { label: "HORMUZ STATUS", value: "DRILLS", sub: "20% GLOBAL OIL", color: "#ff6d00" },
  ];
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
      gap: 1, background: "#1a2332", borderBottom: "1px solid #1a2332",
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{ background: "#0d1117", padding: "10px 14px" }}>
          <div style={{ fontSize: 9, color: "#8b949e", letterSpacing: 1, marginBottom: 4 }}>{s.label}</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
          <div style={{ fontSize: 9, color: "#6e7681" }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

// ── Asset Detail Panel ─────────────────────────────────────────
function AssetDetail({ asset, onClose }) {
  if (!asset) return null;
  const typeColors = {
    nuclear: "#ff1744", carrier: "#2979ff", destroyer: "#00b0ff",
    submarine: "#7c4dff", lcs: "#00b0ff", airbase: "#2979ff",
    naval: "#00b0ff", army: "#4caf50", radar: "#ffd600",
    military: "#e040fb", chokepoint: "#ff6d00", economic: "#ffd600",
  };
  return (
    <div style={{
      background: "#0d1117", padding: 16,
      animation: "slideIn 0.2s ease",
      borderBottom: "1px solid #1a2332",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3" }}>{asset.name}</div>
          <div style={{ fontSize: 11, color: "#8b949e", marginTop: 4, lineHeight: 1.5, maxWidth: 700 }}>{asset.details}</div>
          <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 9, padding: "2px 8px", borderRadius: 3,
              background: `${typeColors[asset.type] || "#8b949e"}20`,
              color: typeColors[asset.type] || "#8b949e",
              border: `1px solid ${typeColors[asset.type] || "#8b949e"}40`,
              textTransform: "uppercase", letterSpacing: 1,
            }}>{asset.type}</span>
            {asset.status && (
              <span style={{
                fontSize: 9, padding: "2px 8px", borderRadius: 3,
                background: "#00e67620", color: "#00e676",
                border: "1px solid #00e67640",
                textTransform: "uppercase", letterSpacing: 1,
              }}>{asset.status}</span>
            )}
            {asset.country && <span style={{ fontSize: 9, color: "#6e7681", paddingTop: 3 }}>{asset.country}</span>}
            <span style={{ fontSize: 9, color: "#484f58", paddingTop: 3 }}>
              {asset.lat?.toFixed(2)}°N, {asset.lon?.toFixed(2)}°E
            </span>
          </div>
        </div>
        <button onClick={onClose} style={{
          background: "none", border: "1px solid #30363d", color: "#8b949e",
          borderRadius: 4, padding: "4px 8px", fontSize: 10, fontFamily: "inherit", cursor: "pointer",
        }}>✕</button>
      </div>
    </div>
  );
}

// ── News Feed ──────────────────────────────────────────────────
function NewsFeed({ news, filter, onFilterChange, isLive, lastUpdated }) {
  const filtered = filter === "all" ? news : news.filter(n => n.category === filter);
  return (
    <div style={{ background: "#0d1117", padding: 16, minHeight: 400 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 6 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", letterSpacing: 1 }}>
            ◆ {isLive ? '🔴 LIVE' : '📋 CACHED'} INTELLIGENCE FEED
          </div>
          {isLive && lastUpdated && (
            <div style={{ fontSize: 8, color: "#00e676", marginTop: 2 }}>
              Updated: {new Date(lastUpdated).toLocaleTimeString()}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {["all", "military", "diplomacy", "analysis", "intelligence"].map(f => (
            <button key={f} onClick={() => onFilterChange(f)} style={{
              background: filter === f ? "#21262d" : "transparent",
              border: `1px solid ${filter === f ? (CATEGORY_COLORS[f] || "#30363d") : "#1a2332"}`,
              color: filter === f ? (CATEGORY_COLORS[f] || "#e6edf3") : "#6e7681",
              borderRadius: 3, padding: "3px 8px", fontSize: 9, fontFamily: "inherit",
              textTransform: "uppercase", letterSpacing: 0.5, cursor: "pointer",
            }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, maxHeight: 450, overflow: "auto" }}>
        {filtered.map((n, i) => (
          <a 
            key={i}
            href={n.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 12px",
              background: i === 0 ? "#161b2280" : "transparent",
              borderLeft: `2px solid ${CATEGORY_COLORS[n.category] || "#30363d"}`,
              borderRadius: "0 4px 4px 0",
              textDecoration: "none",
              display: "block",
              transition: "all 0.2s",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#21262d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = i === 0 ? "#161b2280" : "transparent";
            }}
          >
            <div style={{ fontSize: 11, color: "#e6edf3", lineHeight: 1.4, fontWeight: i === 0 ? 600 : 400 }}>
              {n.title}
              <span style={{ marginLeft: 6, fontSize: 10, opacity: 0.6 }}>↗</span>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 9, color: CATEGORY_COLORS[n.category], textTransform: "uppercase", letterSpacing: 0.5 }}>
                {n.category}
              </span>
              <span style={{ fontSize: 9, color: "#6e7681" }}>{n.source}</span>
              <span style={{ fontSize: 9, color: "#484f58" }}>{n.time}</span>
              {i === 0 && (
                <span style={{
                  fontSize: 8, padding: "2px 6px", background: "#ff174420",
                  color: "#ff1744", borderRadius: 3, border: "1px solid #ff174440",
                  animation: "blink 2s infinite", letterSpacing: 0.5,
                }}>BREAKING</span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Timeline ───────────────────────────────────────────────────
function Timeline() {
  const [expanded, setExpanded] = useState(false);
  const items = [...CRISIS_TIMELINE].reverse();
  const severityColor = { critical: "#ff1744", high: "#ff6d00", elevated: "#ffd600" };

  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", letterSpacing: 1, marginBottom: 12 }}>◆ CRISIS TIMELINE</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, maxHeight: expanded ? 700 : 250, overflow: "auto", transition: "max-height 0.3s" }}>
        {items.map((e, i) => (
          <div key={i} style={{
            display: "flex", gap: 10, padding: "7px 0",
            borderLeft: `2px solid ${severityColor[e.severity] || "#ffd600"}`,
            paddingLeft: 12,
          }}>
            <div style={{ minWidth: 85, fontSize: 9, color: "#6e7681", paddingTop: 1 }}>{e.date}</div>
            <div style={{ fontSize: 10, color: "#c9d1d9", lineHeight: 1.4 }}>{e.event}</div>
          </div>
        ))}
      </div>
      <button onClick={() => setExpanded(!expanded)} style={{
        background: "none", border: "1px solid #21262d", color: "#8b949e",
        borderRadius: 4, padding: "4px 12px", fontSize: 9, fontFamily: "inherit",
        marginTop: 8, width: "100%", letterSpacing: 0.5, cursor: "pointer",
      }}>
        {expanded ? "COLLAPSE ▲" : "EXPAND FULL TIMELINE ▼"}
      </button>
    </div>
  );
}

// ── Force Comparison ───────────────────────────────────────────
function ForceComparison() {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", letterSpacing: 1, marginBottom: 12 }}>◆ FORCE COMPOSITION</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div style={{ padding: 12, background: "#161b22", borderRadius: 6, border: "1px solid #1a2332" }}>
          <div style={{ fontSize: 10, color: "#2979ff", fontWeight: 600, marginBottom: 8, letterSpacing: 1 }}>🇺🇸 US FORCES</div>
          {[
            { label: "Aircraft Carriers", count: "2" },
            { label: "Destroyers / Cruisers", count: "8" },
            { label: "Littoral Combat Ships", count: "3" },
            { label: "Submarines (SSGN)", count: "1+" },
            { label: "Regional Air Bases", count: "8" },
            { label: "Fighter Wings Deployed", count: "6+" },
            { label: "B-2 Stealth Bombers", count: "✓" },
            { label: "THAAD / Patriot Batteries", count: "✓" },
            { label: "E-3 AWACS", count: "✓" },
            { label: "Est. Personnel", count: "~50,000" },
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 9, borderBottom: "1px solid #1a233280" }}>
              <span style={{ color: "#8b949e" }}>{f.label}</span>
              <span style={{ color: "#2979ff", fontWeight: 600 }}>{f.count}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: 12, background: "#161b22", borderRadius: 6, border: "1px solid #1a2332" }}>
          <div style={{ fontSize: 10, color: "#ff1744", fontWeight: 600, marginBottom: 8, letterSpacing: 1 }}>🇮🇷 IRAN FORCES</div>
          {[
            { label: "Nuclear Facilities", count: "4" },
            { label: "Military Complexes", count: "2+" },
            { label: "Naval Bases", count: "2" },
            { label: "Air Bases (active)", count: "3+" },
            { label: "SRBM Launchers", count: "~200" },
            { label: "IRGCN Fast Boats", count: "~1,500" },
            { label: "Hormuz Mine Capability", count: "✓" },
            { label: "Ghadir-class Submarines", count: "~20" },
            { label: "S-300 / Bavar-373 SAM", count: "✓" },
            { label: "IRGC Total Personnel", count: "~190,000" },
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 9, borderBottom: "1px solid #1a233280" }}>
              <span style={{ color: "#8b949e" }}>{f.label}</span>
              <span style={{ color: "#ff1744", fontWeight: 600 }}>{f.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Key Actors Panel ───────────────────────────────────────────
function KeyActorsPanel() {
  return (
    <div style={{ background: "#0d1117", padding: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", letterSpacing: 1, marginBottom: 12 }}>◆ KEY ACTORS & POSITIONS</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {KEY_ACTORS.map((p, i) => (
          <div key={i} style={{
            padding: 10, background: "#161b22", borderRadius: 6,
            border: "1px solid #1a2332", borderLeft: `3px solid ${p.color}`,
          }}>
            <div style={{ fontSize: 11, color: "#e6edf3", fontWeight: 600 }}>{p.name}</div>
            <div style={{ fontSize: 9, color: "#6e7681", marginTop: 2 }}>{p.role}</div>
            <div style={{ fontSize: 9, color: p.stanceColor, marginTop: 4, fontStyle: "italic", lineHeight: 1.3 }}>"{p.stance}"</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Regional Positions ─────────────────────────────────────────
function RegionalPanel() {
  const stanceStyle = {
    for: { bg: "#2979ff20", color: "#2979ff", border: "#2979ff40", label: "SUPPORTS ACTION" },
    against: { bg: "#ff174420", color: "#ff1744", border: "#ff174440", label: "OPPOSES ACTION" },
    neutral: { bg: "#ffd60020", color: "#ffd600", border: "#ffd60040", label: "NEUTRAL / CAUTIOUS" },
  };
  return (
    <div style={{ background: "#0d1117", padding: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", letterSpacing: 1, marginBottom: 12 }}>◆ REGIONAL POSITIONS</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 6 }}>
        {REGIONAL_POSITIONS.map((r, i) => {
          const s = stanceStyle[r.stance];
          return (
            <div key={i} style={{
              padding: "8px 10px", background: "#161b22", borderRadius: 4,
              border: "1px solid #1a2332", display: "flex", flexDirection: "column", gap: 4,
            }}>
              <div style={{ fontSize: 10, color: "#e6edf3", fontWeight: 500 }}>{r.country}</div>
              <div style={{ fontSize: 9, color: "#8b949e", lineHeight: 1.3 }}>{r.position}</div>
              <span style={{
                fontSize: 8, padding: "1px 6px", borderRadius: 2, alignSelf: "flex-start",
                background: s.bg, color: s.color, border: `1px solid ${s.border}`, letterSpacing: 0.5,
              }}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────
export default function App() {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [activeLayer, setActiveLayer] = useState("all");
  const [newsFilter, setNewsFilter] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveNews, setLiveNews] = useState(null);
  const [lastNewsUpdate, setLastNewsUpdate] = useState(null);

  // Fetch live news on mount and refresh every 5 minutes
  useEffect(() => {
    const stopRefresh = startNewsRefresh((news) => {
      setLiveNews(news);
      setLastNewsUpdate(new Date().toISOString());
    });
    return stopRefresh;
  }, []);

  // Clock timer
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Use live news if available, otherwise static
  const newsItems = liveNews || STATIC_NEWS;

  return (
    <div style={{ minHeight: "100vh", background: "#030810" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee { 0%{transform:translateX(80%)} 100%{transform:translateX(-100%)} }
        button { cursor: pointer; transition: all 0.15s; }
        button:hover { filter: brightness(1.2); }
      `}</style>

      <Header currentTime={currentTime} />
      <AlertTicker />
      <StatsBar />

      <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "#1a2332" }}>
        {/* Map Section */}
        <div style={{ background: "#0d1117", padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", letterSpacing: 1 }}>◆ THEATER OF OPERATIONS — CENTCOM AOR</div>
            <div style={{ display: "flex", gap: 4 }}>
              {[
                { key: "all", label: "ALL LAYERS" },
                { key: "us", label: "US FORCES" },
                { key: "iran", label: "IRAN ASSETS" },
              ].map(l => (
                <button key={l.key} onClick={() => setActiveLayer(l.key)} style={{
                  background: activeLayer === l.key ? "#21262d" : "transparent",
                  border: `1px solid ${activeLayer === l.key ? "#30363d" : "#1a2332"}`,
                  color: activeLayer === l.key ? "#e6edf3" : "#8b949e",
                  borderRadius: 4, padding: "4px 10px", fontSize: 10,
                  fontFamily: "inherit", letterSpacing: 0.5,
                }}>{l.label}</button>
              ))}
            </div>
          </div>

          <TheaterMap onAssetSelect={setSelectedAsset} activeLayer={activeLayer} />

          {/* Selected Asset Detail */}
          <AssetDetail asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
        </div>

        {/* News + Timeline/Forces — two column */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
          <NewsFeed 
            news={newsItems} 
            filter={newsFilter} 
            onFilterChange={setNewsFilter}
            isLive={!!liveNews}
            lastUpdated={lastNewsUpdate}
          />
          <div style={{ background: "#0d1117", padding: 16, display: "flex", flexDirection: "column", gap: 20 }}>
            <Timeline />
            <ForceComparison />
          </div>
        </div>

        {/* AI War Prediction Panel */}
        <WarPredictionPanel />

        {/* Live Flight Radar */}
        <LiveFlightRadar />

        <KeyActorsPanel />
        <RegionalPanel />

        {/* Footer */}
        <div style={{
          background: "#0d1117", padding: "12px 20px",
          borderTop: "1px solid #1a2332",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
        }}>
          <div style={{ fontSize: 9, color: "#484f58" }}>
            DATA SOURCES: CENTCOM • CRITICAL THREATS • CFR • IISS • ADS-B • OPEN-SOURCE INTELLIGENCE
          </div>
          <div style={{ fontSize: 9, color: "#484f58" }}>
            UPDATED: {currentTime.toISOString().slice(0, 19)}Z • FOR INFORMATIONAL PURPOSES ONLY
          </div>
        </div>
      </div>

      {/* Live News TV Widget */}
      <LiveNewsTV />
    </div>
  );
}
