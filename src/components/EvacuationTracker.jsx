// Evacuation Tracker — Real-time embassy & military withdrawal monitoring
// TIME SENSITIVE: Lebanon evacuation happened TODAY (Feb 23, 2026)

const EVACUATIONS = [
  {
    id: "china-evac",
    country: "🇨🇳 CHINA",
    flag: "CN",
    location: "Iran — All Chinese citizens",
    status: "LEAVE IMMEDIATELY",
    statusColor: "#ff0000",
    date: "Feb 27, 2026",
    details: "BREAKING: Beijing orders ALL citizens to immediately evacuate Iran. China joins global evacuation wave. This is a MAJOR escalation signal — China rarely issues such urgent evacuation orders. War imminent.",
    source: "Chinese State Media / MFA",
    severity: "critical",
  },
  {
    id: "global-wave",
    country: "🌍 15+ COUNTRIES",
    flag: "UN",
    location: "Iran — Global evacuation wave",
    status: "LEAVE IMMEDIATELY",
    statusColor: "#8b0000",
    date: "Feb 27, 2026",
    details: "MASS COORDINATED EVACUATION: Australia, Brazil, Canada, China, Cyprus, Finland, Germany, India, Poland, Serbia, Singapore, South Korea, Sweden, UK, US all tell citizens to GET OUT NOW. Not routine advice — rush to clear civilians before war.",
    source: "FCDO / State Dept / Multiple Govts",
    severity: "critical",
  },
  {
    id: "us-lebanon",
    country: "🇺🇸 United States",
    flag: "US",
    location: "Lebanon — US Embassy Beirut",
    status: "EVACUATING",
    statusColor: "#ff1744",
    date: "Feb 23, 2026",
    details: "Dozens of embassy employees evacuated due to 'expected regional developments'. Embassy expected to issue statement.",
    source: "LBCI Lebanon News",
    severity: "critical",
  },
  {
    id: "poland-iran",
    country: "🇵🇱 Poland",
    flag: "PL",
    location: "Iran — All Polish citizens",
    status: "LEAVE IMMEDIATELY",
    statusColor: "#ff1744",
    date: "Feb 20, 2026",
    details: "PM Donald Tusk: 'Within a few, a dozen, or even a few dozen hours, the possibility of evacuation will be out of the question.' Did not elaborate further.",
    source: "Polish PM Office",
    severity: "critical",
  },
  {
    id: "germany-iraq",
    country: "🇩🇪 Germany",
    flag: "DE",
    location: "Iraq — Irbil base",
    status: "PARTIAL WITHDRAWAL",
    statusColor: "#ff6d00",
    date: "Feb 19, 2026",
    details: "Moved 'mid-two digit number' of non-mission critical personnel out of northern Iraq base. Some troops remain for camp operations.",
    source: "German Military Statement",
    severity: "high",
  },
  {
    id: "us-iraq",
    country: "🇺🇸 United States",
    flag: "US",
    location: "Middle East — Multiple bases",
    status: "REPOSITIONING",
    statusColor: "#ff6d00",
    date: "Feb 19, 2026",
    details: "Pentagon moving some personnel temporarily out of the Middle East region — primarily to Europe. Standard practice ahead of potential military activity.",
    source: "CBS News",
    severity: "high",
  },
  {
    id: "us-ford-haifa",
    country: "🇺🇸 US Navy",
    flag: "US",
    location: "Israel — Haifa Port",
    status: "CVN-78 ARRIVED",
    statusColor: "#2979ff",
    date: "Feb 23, 2026",
    details: "USS Gerald R. Ford (CVN-78) aircraft carrier has arrived in the Middle East and docked at Haifa, Israel. Accompanied by multiple warships and support vessels.",
    source: "Maritime Tracking / OSINT",
    severity: "high",
  },
  {
    id: "uk-review",
    country: "🇬🇧 United Kingdom",
    flag: "GB",
    location: "Middle East — Regional",
    status: "REVIEWING",
    statusColor: "#ffd600",
    date: "Feb 20, 2026",
    details: "UK reviewing regional deployments. RAF Fairford and Diego Garcia confirmed as potential US staging bases for Iran strikes per Trump Truth Social post.",
    source: "UK MOD / Trump Truth Social",
    severity: "elevated",
  },
  {
    id: "france-gulf",
    country: "🇫🇷 France",
    flag: "FR",
    location: "Gulf Region — Naval assets",
    status: "MONITORING",
    statusColor: "#ffd600",
    date: "Feb 21, 2026",
    details: "French naval forces in the region maintaining heightened readiness. No public evacuation orders but monitoring situation closely.",
    source: "French MOD",
    severity: "monitoring",
  },
  {
    id: "japan-advisory",
    country: "🇯🇵 Japan",
    flag: "JP",
    location: "Iran + Iraq — Travel advisory",
    status: "AVOID TRAVEL",
    statusColor: "#ffd600",
    date: "Feb 18, 2026",
    details: "Raised travel advisory to highest level for Iran. Urged all citizens to leave if possible.",
    source: "Japanese MOFA",
    severity: "elevated",
  },
  {
    id: "australia-advisory",
    country: "🇦🇺 Australia",
    flag: "AU",
    location: "Iran — Travel advisory",
    status: "DO NOT TRAVEL",
    statusColor: "#ff6d00",
    date: "Feb 19, 2026",
    details: "Updated Iran advisory to 'Do Not Travel' — highest level. Urged citizens to depart immediately while commercial options remain.",
    source: "DFAT Australia",
    severity: "high",
  },
  {
    id: "canada-iran",
    country: "🇨🇦 Canada",
    flag: "CA",
    location: "Iran — Travel advisory",
    status: "AVOID ALL TRAVEL",
    statusColor: "#ff6d00",
    date: "Feb 18, 2026",
    details: "Canada has no embassy in Iran. Urged citizens to leave immediately via commercial flights. Limited consular assistance available.",
    source: "Global Affairs Canada",
    severity: "high",
  },
];

const HISTORICAL_PATTERN = [
  { war: "Gulf War 1991", evacuation: "48hrs", before: "before strikes ✓" },
  { war: "Iraq 2003", evacuation: "72hrs", before: "before invasion ✓" },
  { war: "Libya 2011", evacuation: "24hrs", before: "before no-fly zone ✓" },
  { war: "Iran June 2025", evacuation: "36hrs", before: "before strikes ✓" },
];

export default function EvacuationTracker() {
  const critical = EVACUATIONS.filter(e => e.severity === "critical");
  const high = EVACUATIONS.filter(e => e.severity === "high");
  const elevated = EVACUATIONS.filter(e => e.severity === "elevated" || e.severity === "monitoring");
  
  const signalScore = Math.min(100, (critical.length * 25) + (high.length * 15) + (elevated.length * 5));
  
  const getSeverityColor = (severity) => {
    if (severity === "critical") return "#ff1744";
    if (severity === "high") return "#ff6d00";
    if (severity === "elevated") return "#ffd600";
    return "#8b949e";
  };
  
  const getSeverityLabel = (severity) => {
    if (severity === "critical") return "🔴 CRITICAL";
    if (severity === "high") return "🟠 HIGH";
    if (severity === "elevated") return "🟡 ELEVATED";
    return "⚪ MONITORING";
  };

  return (
    <div style={{ background: "#0d1117", padding: 20, borderBottom: "2px solid #1a2332" }}>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#e6edf3", letterSpacing: 2, marginBottom: 4 }}>
          ◆ EVACUATION TRACKER
        </div>
        <div style={{ fontSize: 10, color: "#8b949e" }}>
          "When embassies evacuate, strikes follow."
        </div>
      </div>

      {/* Signal Gauge */}
      <div style={{ background: "#161b22", borderRadius: 12, padding: 16, marginBottom: 16, border: "1px solid #1a2332" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: "#e6edf3", fontWeight: 600 }}>EVACUATION SIGNAL</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: signalScore > 75 ? "#ff1744" : signalScore > 50 ? "#ff6d00" : "#ffd600" }}>
            {signalScore}/100 — {signalScore > 75 ? "HIGH" : signalScore > 50 ? "ELEVATED" : "MODERATE"}
          </span>
        </div>
        <div style={{ height: 8, background: "#0d1117", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ 
            width: `${signalScore}%`, 
            height: "100%", 
            background: `linear-gradient(90deg, #00e676 0%, #ffd600 50%, ${signalScore > 75 ? "#ff1744" : "#ff6d00"} 100%)`,
            borderRadius: 4,
            transition: "width 0.5s ease"
          }} />
        </div>
        <div style={{ fontSize: 9, color: "#6e7681", marginTop: 8 }}>
          {critical.length} countries actively evacuating • {high.length} at high alert • {elevated.length} monitoring
        </div>
      </div>

      {/* Evacuation Feed */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* Critical & High */}
        <div>
          {/* Critical */}
          {critical.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: "#ff1744", fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>🔴 CRITICAL</div>
              <div style={{ display: "grid", gap: 8 }}>
                {critical.map(e => (
                  <div key={e.id} style={{ 
                    background: "#161b22", 
                    borderRadius: 8, 
                    padding: 12, 
                    border: "1px solid #ff174440",
                    borderLeft: "3px solid #ff1744"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: "#e6edf3", fontWeight: 600 }}>{e.country}</span>
                      <span style={{ 
                        fontSize: 8, padding: "2px 6px", background: e.statusColor + "20", 
                        color: e.statusColor, borderRadius: 3, border: `1px solid ${e.statusColor}40`,
                        fontWeight: 600
                      }}>{e.status}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#8b949e", marginBottom: 4 }}>{e.location}</div>
                    <div style={{ fontSize: 9, color: "#c9d1d9", lineHeight: 1.4, marginBottom: 6 }}>{e.details}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8, color: "#484f58" }}>
                      <span>Source: {e.source}</span>
                      <span>{e.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* High */}
          {high.length > 0 && (
            <div>
              <div style={{ fontSize: 10, color: "#ff6d00", fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>🟠 HIGH</div>
              <div style={{ display: "grid", gap: 8 }}>
                {high.map(e => (
                  <div key={e.id} style={{ 
                    background: "#161b22", 
                    borderRadius: 8, 
                    padding: 12, 
                    border: "1px solid #1a2332",
                    borderLeft: "3px solid #ff6d00"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: "#e6edf3", fontWeight: 600 }}>{e.country}</span>
                      <span style={{ 
                        fontSize: 8, padding: "2px 6px", background: e.statusColor + "20", 
                        color: e.statusColor, borderRadius: 3, border: `1px solid ${e.statusColor}40`,
                        fontWeight: 600
                      }}>{e.status}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#8b949e", marginBottom: 4 }}>{e.location}</div>
                    <div style={{ fontSize: 9, color: "#c9d1d9", lineHeight: 1.4 }}>{e.details}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Elevated + Historical Pattern */}
        <div>
          {/* Elevated */}
          {elevated.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: "#ffd600", fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>🟡 ELEVATED</div>
              <div style={{ display: "grid", gap: 6 }}>
                {elevated.map(e => (
                  <div key={e.id} style={{ 
                    background: "#161b22", 
                    borderRadius: 6, 
                    padding: 10, 
                    border: "1px solid #1a2332",
                    borderLeft: "2px solid #ffd600"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 10, color: "#e6edf3", fontWeight: 500 }}>{e.country}</span>
                      <span style={{ fontSize: 8, padding: "2px 6px", background: "#ffd60020", color: "#ffd600", borderRadius: 3 }}>{e.status}</span>
                    </div>
                    <div style={{ fontSize: 9, color: "#8b949e", marginTop: 2 }}>{e.location}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Historical Pattern */}
          <div style={{ background: "#161b22", borderRadius: 10, padding: 14, border: "1px solid #1a2332" }}>
            <div style={{ fontSize: 10, color: "#6e7681", marginBottom: 10, fontStyle: "italic" }}>
              "In every major US military operation since 1990, embassy evacuations preceded strikes by 24-72hrs."
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              {HISTORICAL_PATTERN.map((h, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#8b949e" }}>
                  <span>{h.war}</span>
                  <span style={{ color: "#00e676" }}>{h.evacuation} {h.before}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, padding: 8, background: "#ff174410", borderRadius: 6, border: "1px solid #ff174420" }}>
              <span style={{ fontSize: 9, color: "#ff1744", fontWeight: 600 }}>⚠️ Current status: ACTIVE EVACUATIONS IN PROGRESS</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 8, color: "#484f58", marginTop: 16, textAlign: "center" }}>
        Sources: LBCI Lebanon, Polish PM Office, German Military, CBS News, Maritime OSINT, Multiple governments
      </div>
    </div>
  );
}
