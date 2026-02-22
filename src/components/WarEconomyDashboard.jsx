import { useState, useEffect } from 'react';

// Mock real-time market data - in production, this would connect to APIs
const MARKET_DATA = {
  oil: {
    brent: { price: 94.32, change: +2.47, percent: +2.69 },
    wti: { price: 89.15, change: +2.12, percent: +2.43 }
  },
  gold: {
    spot: { price: 2847.50, change: +45.20, percent: +1.61 },
    futures: { price: 2862.00, change: +47.80, percent: +1.70 }
  },
  defense: [
    { symbol: "LMT", name: "Lockheed Martin", price: 542.80, change: +18.40, percent: +3.51 },
    { symbol: "RTX", name: "Raytheon", price: 128.45, change: +4.20, percent: +3.38 },
    { symbol: "NOC", name: "Northrop Grumman", price: 512.30, change: +15.80, percent: +3.18 },
    { symbol: "GD", name: "General Dynamics", price: 298.75, change: +7.90, percent: +2.72 },
    { symbol: "BA", name: "Boeing", price: 178.20, change: +5.40, percent: +3.13 }
  ],
  crypto: {
    bitcoin: { price: 98750.00, change: +2450.00, percent: +2.54 },
    ethereum: { price: 2850.00, change: +89.50, percent: +3.24 }
  }
};

// Correlation data
const CORRELATIONS = [
  { pair: "Oil vs War Probability", correlation: 0.87, trend: "up" },
  { pair: "Gold vs Geopolitical Risk", correlation: 0.92, trend: "up" },
  { pair: "Defense Stocks vs Tension", correlation: 0.95, trend: "up" },
  { pair: "Bitcoin vs Traditional Safe Havens", correlation: -0.34, trend: "down" }
];

// War scenarios impact
const SCENARIOS = [
  {
    name: "Diplomatic Resolution",
    probability: 33,
    oilImpact: "$75-80 (-15%)",
    goldImpact: "$2,600 (-9%)",
    defenseImpact: "-5% to -8%",
    marketImpact: "S&P 500 +3%"
  },
  {
    name: "Limited Surgical Strikes",
    probability: 42,
    oilImpact: "$110-130 (+40%)",
    goldImpact: "$3,000 (+5%)",
    defenseImpact: "+15% to +25%",
    marketImpact: "S&P 500 -8%"
  },
  {
    name: "Full Regional War",
    probability: 25,
    oilImpact: "$180-220 (+130%)",
    goldImpact: "$3,500 (+23%)",
    defenseImpact: "+35% to +50%",
    marketImpact: "S&P 500 -20%"
  }
];

function TickerItem({ data, label, prefix = "$" }) {
  const isPositive = data.change >= 0;
  return (
    <div style={{ 
      display: "inline-flex", alignItems: "center", gap: "8px",
      padding: "8px 16px", background: "#0d1117", borderRadius: 6,
      border: "1px solid #1a2332", marginRight: 12
    }}>
      <span style={{ fontSize: 10, color: "#6e7681" }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: "#e6edf3" }}>
        {prefix}{data.price.toLocaleString()}
      </span>
      <span style={{ 
        fontSize: 10, 
        color: isPositive ? "#00e676" : "#ff1744",
        fontWeight: 600
      }}>
        {isPositive ? "▲" : "▼"} {data.percent.toFixed(2)}%
      </span>
    </div>
  );
}

export default function WarEconomyDashboard() {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedScenario, setSelectedScenario] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setLastUpdate(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: "#0d1117", padding: 20, borderBottom: "2px solid #1a2332" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#e6edf3", letterSpacing: 2 }}>
            💰 WAR ECONOMY DASHBOARD
          </div>
          <div style={{ fontSize: 10, color: "#8b949e", marginTop: 4 }}>
            Live Market Impact of US-Iran Conflict • Real-time Correlation Analysis
          </div>
        </div>
        <div style={{
          padding: "6px 12px", background: "#00e67620", borderRadius: 6,
          border: "1px solid #00e67640", fontSize: 10, color: "#00e676"
        }}>
          ● LIVE • Updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      {/* Ticker */}
      <div style={{ 
        overflow: "hidden", padding: "12px 0", borderTop: "1px solid #1a2332",
        borderBottom: "1px solid #1a2332", marginBottom: 16
      }}>
        <div style={{ display: "flex", animation: "ticker 30s linear infinite", whiteSpace: "nowrap" }}>
          <TickerItem data={MARKET_DATA.oil.brent} label="BRENT CRUDE" />
          <TickerItem data={MARKET_DATA.oil.wti} label="WTI OIL" />
          <TickerItem data={MARKET_DATA.gold.spot} label="GOLD SPOT" />
          <TickerItem data={MARKET_DATA.crypto.bitcoin} label="BITCOIN" />
          <TickerItem data={MARKET_DATA.defense[0]} label="LMT" />
          <TickerItem data={MARKET_DATA.defense[1]} label="RTX" />
          {/* Duplicate for seamless loop */}
          <TickerItem data={MARKET_DATA.oil.brent} label="BRENT CRUDE" />
          <TickerItem data={MARKET_DATA.oil.wti} label="WTI OIL" />
          <TickerItem data={MARKET_DATA.gold.spot} label="GOLD SPOT" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {/* Oil & Energy */}
        <div style={{ background: "#161b22", borderRadius: 12, border: "1px solid #1a2332", padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            🛢️ OIL & ENERGY
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: "#8b949e" }}>Brent Crude</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#e6edf3" }}>${MARKET_DATA.oil.brent.price}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 9, color: "#6e7681" }}>War premium: +$12</span>
              <span style={{ fontSize: 10, color: "#00e676" }}>+{MARKET_DATA.oil.brent.percent}%</span>
            </div>
            <div style={{ height: 4, background: "#21262d", borderRadius: 2, marginTop: 8 }}>
              <div style={{ width: "85%", height: "100%", background: "linear-gradient(90deg, #00e676, #ffd600)", borderRadius: 2 }} />
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: "#8b949e" }}>WTI</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#e6edf3" }}>${MARKET_DATA.oil.wti.price}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 9, color: "#6e7681" }}>Strait of Hormuz risk</span>
              <span style={{ fontSize: 10, color: "#00e676" }}>+{MARKET_DATA.oil.wti.percent}%</span>
            </div>
          </div>
          <div style={{ marginTop: 12, padding: 8, background: "#0d1117", borderRadius: 6 }}>
            <div style={{ fontSize: 9, color: "#6e7681" }}>⚠️ If Hormuz closes: <span style={{ color: "#ff1744" }}>$150-200/bbl</span></div>
          </div>
        </div>

        {/* Safe Haven Assets */}
        <div style={{ background: "#161b22", borderRadius: 12, border: "1px solid #1a2332", padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            🥇 SAFE HAVENS
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: "#8b949e" }}>Gold Spot</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#ffd600" }}>${MARKET_DATA.gold.spot.price.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 9, color: "#6e7681" }}>All-time high approaching</span>
              <span style={{ fontSize: 10, color: "#00e676" }}>+{MARKET_DATA.gold.spot.percent}%</span>
            </div>
            <div style={{ height: 4, background: "#21262d", borderRadius: 2, marginTop: 8 }}>
              <div style={{ width: "92%", height: "100%", background: "linear-gradient(90deg, #ffd600, #ff6d00)", borderRadius: 2 }} />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: "#8b949e" }}>US Dollar Index</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#e6edf3" }}>104.85</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 9, color: "#6e7681" }}>Flight to safety</span>
              <span style={{ fontSize: 10, color: "#00e676" }}>+0.85%</span>
            </div>
          </div>
          <div style={{ padding: 8, background: "#0d1117", borderRadius: 6 }}>
            <div style={{ fontSize: 9, color: "#6e7681" }}>📊 Gold/Iran tension correlation: <span style={{ color: "#ffd600" }}>0.92</span></div>
          </div>
        </div>

        {/* Defense Stocks */}
        <div style={{ background: "#161b22", borderRadius: 12, border: "1px solid #1a2332", padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            🚀 DEFENSE SECTOR
          </div>
          {MARKET_DATA.defense.slice(0, 3).map((stock, i) => (
            <div key={i} style={{ marginBottom: 10, padding: 8, background: i === 0 ? "#00e67610" : "transparent", borderRadius: 4, borderLeft: i === 0 ? "2px solid #00e676" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontSize: 10, color: "#e6edf3", fontWeight: 600 }}>{stock.symbol}</span>
                <span style={{ fontSize: 10, color: "#e6edf3" }}>${stock.price}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 8, color: "#6e7681" }}>{stock.name}</span>
                <span style={{ fontSize: 9, color: "#00e676" }}>+{stock.percent}%</span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 8, padding: 8, background: "#0d1117", borderRadius: 6 }}>
            <div style={{ fontSize: 9, color: "#6e7681" }}>📈 Sector avg: <span style={{ color: "#00e676" }}>+3.18%</span> today</div>
          </div>
        </div>
      </div>

      {/* Correlation Matrix */}
      <div style={{ background: "#161b22", borderRadius: 12, border: "1px solid #1a2332", padding: 16, marginTop: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>
          📊 CONFLICT-MARKET CORRELATIONS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {CORRELATIONS.map((corr, i) => (
            <div key={i} style={{ 
              padding: 12, background: "#0d1117", borderRadius: 8, textAlign: "center",
              border: "1px solid #1a2332"
            }}>
              <div style={{ fontSize: 9, color: "#6e7681", marginBottom: 4 }}>{corr.pair}</div>
              <div style={{ 
                fontSize: 20, fontWeight: 700, 
                color: corr.correlation > 0.7 ? "#ff1744" : corr.correlation > 0 ? "#ffd600" : "#00e676"
              }}>
                {corr.correlation.toFixed(2)}
              </div>
              <div style={{ fontSize: 8, color: corr.trend === "up" ? "#00e676" : "#ff1744" }}>
                {corr.trend === "up" ? "↑ Strengthening" : "↓ Weakening"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* War Scenarios Impact */}
      <div style={{ background: "#161b22", borderRadius: 12, border: "1px solid #1a2332", padding: 16, marginTop: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", marginBottom: 12 }}>
          🎯 MARKET IMPACT BY SCENARIO
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {SCENARIOS.map((scenario, i) => (
            <div 
              key={i}
              onClick={() => setSelectedScenario(selectedScenario === i ? null : i)}
              style={{
                padding: 12, background: "#0d1117", borderRadius: 8,
                border: "1px solid #1a2332", cursor: "pointer",
                borderLeft: `4px solid ${i === 0 ? "#00e676" : i === 1 ? "#ffd600" : "#ff1744"}`
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: 11, color: "#e6edf3", fontWeight: 600 }}>{scenario.name}</span>
                  <span style={{ fontSize: 9, color: "#6e7681", marginLeft: 8 }}>({scenario.probability}% probability)</span>
                </div>
                <div style={{
                  padding: "2px 8px", background: i === 0 ? "#00e67620" : i === 1 ? "#ffd60020" : "#ff174420",
                  borderRadius: 4, fontSize: 9,
                  color: i === 0 ? "#00e676" : i === 1 ? "#ffd600" : "#ff1744"
                }}>
                  {i === 0 ? "🕊️ BULLISH" : i === 1 ? "⚠️ MIXED" : "🔴 BEARISH"}
                </div>
              </div>
              {selectedScenario === i && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #1a2332", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 8, color: "#6e7681" }}>Oil Impact</div>
                    <div style={{ fontSize: 10, color: "#ffd600", fontWeight: 600 }}>{scenario.oilImpact}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 8, color: "#6e7681" }}>Gold Impact</div>
                    <div style={{ fontSize: 10, color: "#ffd600", fontWeight: 600 }}>{scenario.goldImpact}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 8, color: "#6e7681" }}>Defense Stocks</div>
                    <div style={{ fontSize: 10, color: "#ffd600", fontWeight: 600 }}>{scenario.defenseImpact}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 8, color: "#6e7681" }}>Overall Market</div>
                    <div style={{ fontSize: 10, color: scenario.marketImpact.includes('+') ? "#00e676" : "#ff1744", fontWeight: 600 }}>{scenario.marketImpact}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
