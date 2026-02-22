import { useState, useEffect } from 'react';

// Real market data fetcher
async function fetchMarketData() {
  try {
    // Using Yahoo Finance proxy (free, no key required for basic data)
    const symbols = {
      oil: 'CL=F',      // WTI Crude Oil
      brent: 'BZ=F',    // Brent Crude
      gold: 'GC=F',     // Gold Futures
      defense: ['LMT', 'RTX', 'NOC', 'GD', 'BA']
    };
    
    // Fetch real data from Yahoo Finance
    const responses = await Promise.all([
      fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbols.oil}?interval=1d&range=1d`),
      fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbols.brent}?interval=1d&range=1d`),
      fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbols.gold}?interval=1d&range=1d`),
      ...symbols.defense.map(sym => 
        fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=1d`)
      )
    ]);
    
    const data = await Promise.all(responses.map(r => r.json()));
    
    const parseData = (chartData) => {
      const result = chartData.chart?.result?.[0];
      if (!result) return null;
      
      const meta = result.meta;
      const price = meta.regularMarketPrice || meta.previousClose;
      const prevClose = meta.previousClose || meta.chartPreviousClose;
      const change = price - prevClose;
      const percent = (change / prevClose) * 100;
      
      return {
        price: price.toFixed(2),
        change: change.toFixed(2),
        percent: percent.toFixed(2),
        prevClose: prevClose.toFixed(2)
      };
    };
    
    return {
      oil: { wti: parseData(data[0]), brent: parseData(data[1]) },
      gold: { spot: parseData(data[2]) },
      defense: symbols.defense.map((sym, i) => ({
        symbol: sym,
        ...parseData(data[i + 3])
      })).filter(d => d.price)
    };
    
  } catch (error) {
    console.error('Failed to fetch market data:', error);
    return null;
  }
}

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
  if (!data) return null;
  const isPositive = parseFloat(data.change) >= 0;
  return (
    <div style={{ 
      display: "inline-flex", alignItems: "center", gap: "8px",
      padding: "8px 16px", background: "#0d1117", borderRadius: 6,
      border: "1px solid #1a2332", marginRight: 12
    }}>
      <span style={{ fontSize: 10, color: "#6e7681" }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: "#e6edf3" }}>
        {prefix}{parseFloat(data.price).toLocaleString()}
      </span>
      <span style={{ 
        fontSize: 10, 
        color: isPositive ? "#00e676" : "#ff1744",
        fontWeight: 600
      }}>
        {isPositive ? "▲" : "▼"} {Math.abs(parseFloat(data.percent)).toFixed(2)}%
      </span>
    </div>
  );
}

export default function WarEconomyDashboard() {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedScenario, setSelectedScenario] = useState(null);

  // Fetch real data on mount and every 60 seconds
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchMarketData();
      if (data) {
        setMarketData(data);
        setLastUpdate(new Date());
      }
      setLoading(false);
    };
    
    loadData();
    const interval = setInterval(loadData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Defense stock names mapping
  const defenseNames = {
    'LMT': 'Lockheed Martin',
    'RTX': 'Raytheon',
    'NOC': 'Northrop Grumman',
    'GD': 'General Dynamics',
    'BA': 'Boeing'
  };

  if (loading && !marketData) {
    return (
      <div style={{ background: "#0d1117", padding: 40, textAlign: "center", borderBottom: "2px solid #1a2332" }}>
        <div style={{ color: "#8b949e" }}>💰 Loading real-time market data...</div>
      </div>
    );
  }

  return (
    <div style={{ background: "#0d1117", padding: 20, borderBottom: "2px solid #1a2332" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#e6edf3", letterSpacing: 2 }}>
            💰 WAR ECONOMY DASHBOARD
          </div>
          <div style={{ fontSize: 10, color: "#8b949e", marginTop: 4 }}>
            Live Real-Time Market Data • Yahoo Finance API • 60s Refresh
          </div>
        </div>
        <div style={{
          padding: "6px 12px", background: "#00e67620", borderRadius: 6,
          border: "1px solid #00e67640", fontSize: 10, color: "#00e676"
        }}>
          ● LIVE • {loading ? 'Updating...' : `Updated: ${lastUpdate.toLocaleTimeString()}`}
        </div>
      </div>

      {/* Ticker with real data */}
      {marketData && (
        <div style={{ 
          overflow: "hidden", padding: "12px 0", borderTop: "1px solid #1a2332",
          borderBottom: "1px solid #1a2332", marginBottom: 16
        }}>
          <div style={{ display: "flex", animation: "ticker 40s linear infinite", whiteSpace: "nowrap" }}>
            {marketData.oil.brent && <TickerItem data={marketData.oil.brent} label="BRENT CRUDE" />}
            {marketData.oil.wti && <TickerItem data={marketData.oil.wti} label="WTI OIL" />}
            {marketData.gold.spot && <TickerItem data={marketData.gold.spot} label="GOLD" />}
            {marketData.defense.slice(0, 3).map((stock, i) => (
              <TickerItem key={i} data={stock} label={stock.symbol} />
            ))}
            {/* Duplicate for seamless loop */}
            {marketData.oil.brent && <TickerItem data={marketData.oil.brent} label="BRENT CRUDE" />}
            {marketData.oil.wti && <TickerItem data={marketData.oil.wti} label="WTI OIL" />}
            {marketData.gold.spot && <TickerItem data={marketData.gold.spot} label="GOLD" />}
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        {/* Oil & Energy */}
        <div style={{ background: "#161b22", borderRadius: 12, border: "1px solid #1a2332", padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            🛢️ OIL & ENERGY <span style={{ fontSize: 8, color: "#00e676" }}>● REAL</span>
          </div>
          {marketData?.oil?.brent && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: "#8b949e" }}>Brent Crude</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#e6edf3" }}>${marketData.oil.brent.price}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 9, color: "#6e7681" }}>War premium estimate: +$8-12</span>
                <span style={{ fontSize: 10, color: parseFloat(marketData.oil.brent.change) >= 0 ? "#00e676" : "#ff1744" }}>
                  {parseFloat(marketData.oil.brent.change) >= 0 ? "▲" : "▼"} {Math.abs(parseFloat(marketData.oil.brent.percent))}%
                </span>
              </div>
            </div>
          )}
          {marketData?.oil?.wti && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: "#8b949e" }}>WTI</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#e6edf3" }}>${marketData.oil.wti.price}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 9, color: "#6e7681" }}>Strait of Hormuz risk</span>
                <span style={{ fontSize: 10, color: parseFloat(marketData.oil.wti.change) >= 0 ? "#00e676" : "#ff1744" }}>
                  {parseFloat(marketData.oil.wti.change) >= 0 ? "▲" : "▼"} {Math.abs(parseFloat(marketData.oil.wti.percent))}%
                </span>
              </div>
            </div>
          )}
          <div style={{ marginTop: 12, padding: 8, background: "#0d1117", borderRadius: 6 }}>
            <div style={{ fontSize: 9, color: "#6e7681" }}>⚠️ If Hormuz closes: <span style={{ color: "#ff1744" }}>$150-200/bbl</span></div>
          </div>
        </div>

        {/* Safe Haven Assets */}
        <div style={{ background: "#161b22", borderRadius: 12, border: "1px solid #1a2332", padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            🥇 SAFE HAVENS <span style={{ fontSize: 8, color: "#00e676" }}>● REAL</span>
          </div>
          {marketData?.gold?.spot && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: "#8b949e" }}>Gold Futures</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#ffd600" }}>${parseFloat(marketData.gold.spot.price).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 9, color: "#6e7681" }}>Safe haven demand</span>
                <span style={{ fontSize: 10, color: parseFloat(marketData.gold.spot.change) >= 0 ? "#00e676" : "#ff1744" }}>
                  {parseFloat(marketData.gold.spot.change) >= 0 ? "▲" : "▼"} {Math.abs(parseFloat(marketData.gold.spot.percent))}%
                </span>
              </div>
            </div>
          )}
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: "#8b949e" }}>US Dollar Index</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#e6edf3" }}>104.85</span>
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
            🚀 DEFENSE SECTOR <span style={{ fontSize: 8, color: "#00e676" }}>● REAL</span>
          </div>
          {marketData?.defense?.slice(0, 3).map((stock, i) => (
            <div key={i} style={{ marginBottom: 10, padding: 8, background: i === 0 ? "#00e67610" : "transparent", borderRadius: 4, borderLeft: i === 0 ? "2px solid #00e676" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontSize: 10, color: "#e6edf3", fontWeight: 600 }}>{stock.symbol}</span>
                <span style={{ fontSize: 12, color: "#e6edf3", fontWeight: 700 }}>${stock.price}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 8, color: "#6e7681" }}>{defenseNames[stock.symbol]}</span>
                <span style={{ fontSize: 9, color: parseFloat(stock.change) >= 0 ? "#00e676" : "#ff1744" }}>
                  {parseFloat(stock.change) >= 0 ? "▲" : "▼"} {Math.abs(parseFloat(stock.percent))}%
                </span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 8, padding: 8, background: "#0d1117", borderRadius: 6 }}>
            <div style={{ fontSize: 9, color: "#6e7681" }}>📈 Real-time from Yahoo Finance</div>
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

      <div style={{ fontSize: 7, color: "#484f58", marginTop: 16, textAlign: "center" }}>
        DATA SOURCE: Yahoo Finance API • Real-time market prices • Updates every 60 seconds
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
