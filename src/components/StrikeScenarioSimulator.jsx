import { useState } from 'react';

const SCENARIOS = [
  {
    id: 'limited',
    name: 'Limited Strike',
    emoji: '🎯',
    probability: 45,
    color: '#ffd600',
    duration: '24-72 hours',
    assets: 'B-2 Bombers + 200-400 Tomahawks',
    description: 'Surgical attack on nuclear facilities and air defense only. Regime leadership untouched.',
    targets: {
      natanz: true,
      fordow: true,
      isfahan: true,
      arak: true,
      missileBases: false,
      navalBases: false,
      commandCenters: false,
      leadership: false,
      oilFacilities: false,
      powerGrid: false
    },
    metrics: {
      sorties: '300-500',
      missiles: '200-400',
      oilImpact: '$90-105/barrel (+25-40%)',
      usCasualties: '5-50',
      iranCasualties: '500-2,000',
      nuclearDelay: '2-5 years'
    },
    iranResponse: 'Limited ballistic missile strikes on US bases. Proxy attacks in Iraq/Syria. Strait of Hormuz briefly threatened but not closed.',
    risks: [
      'Iran rebuilds program within 5 years',
      'Regional allies question US commitment',
      'Escalation to broader conflict if Iran retaliates hard'
    ],
    supporters: ['Israel', 'Saudi Arabia (quietly)', 'UAE (tacit)'],
    opponents: ['Russia', 'China', 'Turkey', 'Iraq']
  },
  {
    id: 'full',
    name: 'Full Assault',
    emoji: '💥',
    probability: 35,
    color: '#ff6d00',
    duration: '7-21 days',
    assets: '2 Carrier Groups + CENTCOM + B-2 Fleet',
    description: 'Comprehensive destruction of nuclear, missile, naval, and air defense capabilities.',
    targets: {
      natanz: true,
      fordow: true,
      isfahan: true,
      arak: true,
      missileBases: true,
      navalBases: true,
      commandCenters: true,
      leadership: false,
      oilFacilities: false,
      powerGrid: false
    },
    metrics: {
      sorties: '2,000-4,000',
      missiles: '1,000-2,000',
      oilImpact: '$125-150/barrel (+70-100%)',
      usCasualties: '100-500',
      iranCasualties: '5,000-15,000',
      nuclearDelay: '10-15 years'
    },
    iranResponse: 'Massive ballistic missile barrage (1,200+ missiles) at US bases. Mines Hormuz Strait. Proxy attacks across region. Possible blockade of Gulf shipping.',
    risks: [
      '60-70% chance of regional war',
      'Hormuz closure for weeks/months',
      'Global economic shock',
      'Iranian proxies activate worldwide'
    ],
    supporters: ['Israel', 'Saudi Arabia', 'Bahrain'],
    opponents: ['Russia', 'China', 'Turkey', 'Iraq', 'Pakistan', 'Oman']
  },
  {
    id: 'decapitation',
    name: 'Decapitation',
    emoji: '👑',
    probability: 20,
    color: '#ff1744',
    duration: '21-90+ days',
    assets: 'Full CENTCOM + Special Operations + Cyber',
    description: 'Regime change operation targeting leadership, infrastructure, and state apparatus.',
    targets: {
      natanz: true,
      fordow: true,
      isfahan: true,
      arak: true,
      missileBases: true,
      navalBases: true,
      commandCenters: true,
      leadership: true,
      oilFacilities: true,
      powerGrid: true
    },
    metrics: {
      sorties: '5,000-10,000+',
      missiles: '3,000-5,000+',
      oilImpact: '$185-220/barrel (+150-200%)',
      usCasualties: '500-2,000+',
      iranCasualties: '50,000-200,000+',
      nuclearDelay: 'Indefinite (regime-dependent)'
    },
    iranResponse: 'Total war posture. All missiles fired. Hormuz closed indefinitely. Proxy global terror campaign. Cyber attacks on Western infrastructure. Possible use of chemical weapons.',
    risks: [
      '90%+ chance of Middle East-wide war',
      'Iraq 2003 repeat — power vacuum',
      'Civil war in Iran (25M armed Basij)',
      'Global recession (oil shock)',
      'Russia/China intervention risk',
      'Nuclear proliferation if program disperses'
    ],
    supporters: ['Israel (strong advocate)', 'MEK opposition'],
    opponents: ['Russia', 'China', 'Turkey', 'Iraq', 'Pakistan', 'Most EU', 'UN']
  }
];

const TARGET_LABELS = {
  natanz: 'Natanz Enrichment Facility',
  fordow: 'Fordow Underground Site',
  isfahan: 'Isfahan Conversion Plant',
  arak: 'Arak Heavy Water Reactor',
  missileBases: 'Ballistic Missile Bases',
  navalBases: 'Naval Bases (Bandar Abbas)',
  commandCenters: 'IRGC Command Centers',
  leadership: 'Regime Leadership (Khamenei)',
  oilFacilities: 'Oil Export Terminals',
  powerGrid: 'National Power Grid'
};

export default function StrikeScenarioSimulator() {
  const [selected, setSelected] = useState('limited');
  const scenario = SCENARIOS.find(s => s.id === selected);

  return (
    <div style={{ background: "#0d1117", padding: "20px", borderBottom: "2px solid #1a2332" }}>
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "20px", fontWeight: 700, color: "#e6edf3", letterSpacing: 2 }}>
          🎯 STRIKE SCENARIO SIMULATOR
        </div>
        <div style={{ fontSize: "11px", color: "#8b949e", marginTop: "4px" }}>
          Compare US military intervention options against Iran
        </div>
      </div>

      {/* Probability Bar */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "10px", color: "#6e7681", marginBottom: "8px" }}>SCENARIO PROBABILITY</div>
        <div style={{ display: "flex", height: "24px", borderRadius: "4px", overflow: "hidden", background: "#161b22" }}>
          {SCENARIOS.map((s, i) => (
            <div
              key={s.id}
              onClick={() => setSelected(s.id)}
              style={{
                width: `${s.probability}%`,
                background: s.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                color: "#0d1117",
                cursor: "pointer",
                opacity: selected === s.id ? 1 : 0.6,
                border: selected === s.id ? "2px solid #fff" : "none"
              }}
            >
              {s.probability}%
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "10px" }}>
          {SCENARIOS.map(s => (
            <div key={s.id} style={{ color: selected === s.id ? s.color : "#6e7681", cursor: "pointer" }} onClick={() => setSelected(s.id)}>
              <span style={{ marginRight: "4px" }}>{s.emoji}</span>
              {s.name}
            </div>
          ))}
        </div>
      </div>

      {/* Scenario Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
        {SCENARIOS.map(s => (
          <div
            key={s.id}
            onClick={() => setSelected(s.id)}
            style={{
              padding: "14px",
              background: selected === s.id ? "#161b22" : "#0d1117",
              borderRadius: "10px",
              border: `2px solid ${selected === s.id ? s.color : "#1a2332"}`,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>{s.emoji}</div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: s.color, marginBottom: "4px" }}>{s.name}</div>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#e6edf3" }}>{s.probability}%</div>
            <div style={{ fontSize: "9px", color: "#6e7681", marginTop: "4px" }}>{s.duration}</div>
          </div>
        ))}
      </div>

      {/* Selected Scenario Details */}
      {scenario && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {/* Left Column - Targets & Description */}
          <div>
            {/* Description */}
            <div style={{ background: "#161b22", borderRadius: "10px", border: `1px solid ${scenario.color}40`, padding: "14px", marginBottom: "12px" }}>
              <div style={{ fontSize: "10px", color: "#6e7681", marginBottom: "6px" }}>SCENARIO DESCRIPTION</div>
              <div style={{ fontSize: "12px", color: "#e6edf3", lineHeight: 1.5 }}>{scenario.description}</div>
              <div style={{ marginTop: "10px", fontSize: "10px", color: "#8b949e" }}>
                <span style={{ color: scenario.color }}>Assets:</span> {scenario.assets}
              </div>
            </div>

            {/* Targets */}
            <div style={{ background: "#161b22", borderRadius: "10px", padding: "14px", border: "1px solid #1a2332" }}>
              <div style={{ fontSize: "10px", color: "#6e7681", marginBottom: "10px" }}>TARGETS</div>
              <div style={{ display: "grid", gap: "6px" }}>
                {Object.entries(TARGET_LABELS).map(([key, label]) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ 
                      fontSize: "12px",
                      color: scenario.targets[key] ? "#ff1744" : "#484f58"
                    }}>
                      {scenario.targets[key] ? '◉' : '○'}
                    </span>
                    <span style={{ 
                      fontSize: "11px", 
                      color: scenario.targets[key] ? "#e6edf3" : "#6e7681"
                    }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Metrics & Risks */}
          <div>
            {/* Metrics */}
            <div style={{ background: "#161b22", borderRadius: "10px", padding: "14px", marginBottom: "12px", border: "1px solid #1a2332" }}>
              <div style={{ fontSize: "10px", color: "#6e7681", marginBottom: "10px" }}>OPERATIONAL METRICS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{ padding: "8px", background: "#0d1117", borderRadius: "6px" }}>
                  <div style={{ fontSize: "9px", color: "#6e7681" }}>Sorties</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#e6edf3" }}>{scenario.metrics.sorties}</div>
                </div>
                <div style={{ padding: "8px", background: "#0d1117", borderRadius: "6px" }}>
                  <div style={{ fontSize: "9px", color: "#6e7681" }}>Missiles</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#e6edf3" }}>{scenario.metrics.missiles}</div>
                </div>
                <div style={{ padding: "8px", background: "#0d1117", borderRadius: "6px" }}>
                  <div style={{ fontSize: "9px", color: "#6e7681" }}>US Casualties</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#ffd600" }}>{scenario.metrics.usCasualties}</div>
                </div>
                <div style={{ padding: "8px", background: "#0d1117", borderRadius: "6px" }}>
                  <div style={{ fontSize: "9px", color: "#6e7681" }}>Iran Casualties</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#ff6d00" }}>{scenario.metrics.iranCasualties}</div>
                </div>
                <div style={{ padding: "8px", background: "#0d1117", borderRadius: "6px", gridColumn: "span 2" }}>
                  <div style={{ fontSize: "9px", color: "#6e7681" }}>Oil Price Impact</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#00e676" }}>{scenario.metrics.oilImpact}</div>
                </div>
                <div style={{ padding: "8px", background: "#0d1117", borderRadius: "6px", gridColumn: "span 2" }}>
                  <div style={{ fontSize: "9px", color: "#6e7681" }}>Nuclear Program Delay</div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#e6edf3" }}>{scenario.metrics.nuclearDelay}</div>
                </div>
              </div>
            </div>

            {/* Iran Response */}
            <div style={{ background: "#161b22", borderRadius: "10px", padding: "12px", marginBottom: "12px", border: "1px solid #ff174440" }}>
              <div style={{ fontSize: "10px", color: "#ff6d00", marginBottom: "6px" }}>⚠️ PREDICTED IRAN RESPONSE</div>
              <div style={{ fontSize: "11px", color: "#e6edf3", lineHeight: 1.5 }}>{scenario.iranResponse}</div>
            </div>

            {/* Risks */}
            <div style={{ background: "#161b22", borderRadius: "10px", padding: "12px", marginBottom: "12px", border: "1px solid #1a2332" }}>
              <div style={{ fontSize: "10px", color: "#6e7681", marginBottom: "8px" }}>🔴 KEY RISKS</div>
              <div style={{ display: "grid", gap: "6px" }}>
                {scenario.risks.map((risk, i) => (
                  <div key={i} style={{ fontSize: "10px", color: "#ff8a80", display: "flex", gap: "6px" }}>
                    <span>•</span>
                    <span>{risk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supporters/Opponents */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div style={{ background: "#00e67610", borderRadius: "8px", padding: "10px", border: "1px solid #00e67640" }}>
                <div style={{ fontSize: "9px", color: "#00e676", marginBottom: "6px" }}>✓ SUPPORTERS</div>
                <div style={{ fontSize: "10px", color: "#e6edf3" }}>{scenario.supporters.join(', ')}</div>
              </div>
              <div style={{ background: "#ff174410", borderRadius: "8px", padding: "10px", border: "1px solid #ff174440" }}>
                <div style={{ fontSize: "9px", color: "#ff1744", marginBottom: "6px" }}>✗ OPPONENTS</div>
                <div style={{ fontSize: "10px", color: "#e6edf3" }}>{scenario.opponents.join(', ')}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ fontSize: "8px", color: "#484f58", marginTop: "16px", textAlign: "center" }}>
        ANALYSIS: Based on open-source intelligence, war game simulations, and expert assessments | Last updated: Feb 23, 2026
      </div>
    </div>
  );
}
