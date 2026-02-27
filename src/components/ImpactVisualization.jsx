import { useState } from 'react';

const SCENARIOS = [
  {
    id: "limited",
    name: "Limited Strike",
    probability: 45,
    impact: {
      oil: { price: "$95-110", change: "+30%", color: "#ffd600" },
      gold: { price: "$2,800", change: "+8%", color: "#ffd600" },
      sp500: { price: "-8%", change: "Crash", color: "#ff6d00" },
      casualties: { us: "5-50", iran: "500-2,000", color: "#ff6d00" },
      duration: "24-72 hours"
    }
  },
  {
    id: "full",
    name: "Full Assault",
    probability: 35,
    impact: {
      oil: { price: "$140-180", change: "+100%", color: "#ff6d00" },
      gold: { price: "$3,200", change: "+25%", color: "#ff6d00" },
      sp500: { price: "-15%", change: "Bear Market", color: "#ff1744" },
      casualties: { us: "100-500", iran: "5,000-15,000", color: "#ff1744" },
      duration: "7-21 days"
    }
  },
  {
    id: "regime",
    name: "Regime Change",
    probability: 20,
    impact: {
      oil: { price: "$200-250", change: "+180%", color: "#ff1744" },
      gold: { price: "$3,800", change: "+45%", color: "#ff1744" },
      sp500: { price: "-25%", change: "CRISIS", color: "#8b0000" },
      casualties: { us: "500-2,000", iran: "50,000+", color: "#8b0000" },
      duration: "21-90 days"
    }
  }
];

export default function ImpactVisualization() {
  const [selectedScenario, setSelectedScenario] = useState("full");
  
  const scenario = SCENARIOS.find(s => s.id === selectedScenario);

  return (
    <div style={{
      background: "#0d1117",
      borderRadius: 20,
      padding: 24,
      border: "1px solid #1a2332",
      margin: "16px 0"
    }}>
      <div style={{
        fontSize: 14,
        fontWeight: 700,
        color: "#e6edf3",
        letterSpacing: 1,
        marginBottom: 16
      }}>
        📊 STRIKE IMPACT SIMULATION
      </div>

      {/* Scenario Selector */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
        marginBottom: 20
      }}>
        {SCENARIOS.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedScenario(s.id)}
            style={{
              padding: "12px 8px",
              background: selectedScenario === s.id ? "#ff174420" : "#161b22",
              border: `2px solid ${selectedScenario === s.id ? "#ff1744" : "#1a2332"}`,
              borderRadius: 10,
              color: selectedScenario === s.id ? "#ff1744" : "#8b949e",
              fontSize: 11,
              fontWeight: selectedScenario === s.id ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            <div>{s.name}</div>
            <div style={{ fontSize: 10, marginTop: 4 }}>{s.probability}%</div>
          </button>
        ))}
      </div>

      {/* Impact Metrics */}
      {scenario && (
        <div style={{
          background: "#161b22",
          borderRadius: 16,
          padding: 20,
          border: `2px solid ${scenario.impact.oil.color}40`
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16
          }}>
            {/* Oil */}
            <div style={{
              background: "#0d1117",
              borderRadius: 10,
              padding: 14,
              border: `1px solid ${scenario.impact.oil.color}30`
            }}>
              <div style={{ fontSize: 10, color: "#6e7681", marginBottom: 4 }}>🛢️ OIL PRICE</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: scenario.impact.oil.color }}>
                {scenario.impact.oil.price}
              </div>
              <div style={{ fontSize: 11, color: scenario.impact.oil.color }}>
                {scenario.impact.oil.change}
              </div>
            </div>

            {/* Gold */}
            <div style={{
              background: "#0d1117",
              borderRadius: 10,
              padding: 14,
              border: `1px solid ${scenario.impact.gold.color}30`
            }}>
              <div style={{ fontSize: 10, color: "#6e7681", marginBottom: 4 }}>🥇 GOLD</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: scenario.impact.gold.color }}>
                {scenario.impact.gold.price}
              </div>
              <div style={{ fontSize: 11, color: scenario.impact.gold.color }}>
                {scenario.impact.gold.change}
              </div>
            </div>

            {/* S&P 500 */}
            <div style={{
              background: "#0d1117",
              borderRadius: 10,
              padding: 14,
              border: `1px solid ${scenario.impact.sp500.color}30`
            }}>
              <div style={{ fontSize: 10, color: "#6e7681", marginBottom: 4 }}>📈 S&P 500</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: scenario.impact.sp500.color }}>
                {scenario.impact.sp500.price}
              </div>
              <div style={{ fontSize: 11, color: scenario.impact.sp500.color }}>
                {scenario.impact.sp500.change}
              </div>
            </div>

            {/* Duration */}
            <div style={{
              background: "#0d1117",
              borderRadius: 10,
              padding: 14,
              border: "1px solid #1a2332"
            }}>
              <div style={{ fontSize: 10, color: "#6e7681", marginBottom: 4 }}>⏱️ DURATION</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#e6edf3" }}>
                {scenario.impact.duration}
              </div>
            </div>
          </div>

          {/* Casualties */}
          <div style={{
            marginTop: 16,
            padding: 14,
            background: scenario.impact.casualties.color + "15",
            borderRadius: 10,
            border: `1px solid ${scenario.impact.casualties.color}40`
          }}>
            <div style={{ fontSize: 10, color: "#6e7681", marginBottom: 8 }}>⚠️ ESTIMATED CASUALTIES</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 11, color: "#8b949e" }}>US Forces</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: scenario.impact.casualties.color }}>
                  {scenario.impact.casualties.us}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#8b949e" }}>Iran</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: scenario.impact.casualties.color }}>
                  {scenario.impact.casualties.iran}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
