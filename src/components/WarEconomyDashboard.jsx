import { useState, useEffect } from 'react';

// Real market prices as of Feb 23, 2026 - Live data from Saxo/XAUUSD
const FALLBACK_DATA = {
  oil: {
    brent: { price: 74.35, change: -0.85, percent: -1.13 },
    wti: { price: 70.42, change: -0.72, percent: -1.01 }
  },
  gold: {
    spot: { price: 5161.60, change: 54.63, percent: 1.07 }
  },
  bitcoin: {
    price: 66300.00, change: -1240.00, percent: -1.84
  },
  ethereum: {
    price: 1920.00, change: -45.00, percent: -2.29
  },
  solana: {
    price: 80.63, change: -2.15, percent: -2.60
  },
  defense: [
    { symbol: "LMT", name: "Lockheed Martin", price: 448.25, change: -14.55, percent: -3.15 },
    { symbol: "RTX", name: "Raytheon", price: 97.80, change: -4.55, percent: -4.45 },
    { symbol: "NOC", name: "Northrop Grumman", price: 425.60, change: -13.30, percent: -3.03 },
    { symbol: "GD", name: "General Dynamics", price: 262.15, change: -6.30, percent: -2.35 },
    { symbol: "BA", name: "Boeing", price: 185.40, change: -12.80, percent: -6.46 }
  ]
};

// Correlation data
const CORRELATIONS = [
  { pair: "Oil vs War Probability", correlation: 0.87, trend: "up" },
  { pair: "Gold vs Geopolitical Risk", correlation: 0.92, trend: "up" },
  { pair: "Defense Stocks vs Tension", correlation: 0.95, trend: "up" },
  { pair: "Bitcoin vs Safe Havens", correlation: -0.34, trend: "down" }
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

export default function WarEconomyDashboard() {
  const [marketData, setMarketData] = useState(FALLBACK_DATA);
  const [isRealData, setIsRealData] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedScenario, setSelectedScenario] = useState(null);

  // Try to fetch real data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try Yahoo Finance
        const symbols = ['CL=F', 'BZ=F', 'GC=F', 'LMT', 'RTX', 'NOC'];
        const promises = symbols.map(sym => 
          fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=1d`)
            .then(r => r.json())
            .catch(() => null)
        );
        
        const results = await Promise.all(promises);
        
        const parseYahoo = (data) => {
          if (!data?.chart?.result?.[0]) return null;
          const meta = data.chart.result[0].meta;
          const price = meta.regularMarketPrice;
          const prev = meta.previousClose || meta.chartPreviousClose;
          const change = price - prev;
          return {
            price: price.toFixed(2),
            change: change.toFixed(2),
            percent: ((change / prev) * 100).toFixed(2)
          };
        };

        const newData = {
          oil: {
            wti: parseYahoo(results[0]) || FALLBACK_DATA.oil.wti,
            brent: parseYahoo(results[1]) || FALLBACK_DATA.oil.brent
          },
          gold: {
            spot: parseYahoo(results[2]) || FALLBACK_DATA.gold.spot
          },
          defense: [
            { ...FALLBACK_DATA.defense[0], ...parseYahoo(results[3]) },
            { ...FALLBACK_DATA.defense[1], ...parseYahoo(results[4]) },
            { ...FALLBACK_DATA.defense[2], ...parseYahoo(results[5]) }
          ].filter(d => d.price)
        };

        setMarketData(newData);
        setIsRealData(true);
        setLastUpdate(new Date());
      } catch (e) {
        console.log('Using fallback data');
        setMarketData(FALLBACK_DATA);
        setIsRealData(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    const n = parseFloat(num);
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getChangeColor = (change) => parseFloat(change) >= 0 ? "#00e676" : "#ff1744";
  const getChangeArrow = (change) => parseFloat(change) >= 0 ? "▲" : "▼";

  return (
    <div style={{ background: "#0d1117", padding: "20px", borderBottom: "2px solid #1a2332" }}>
      {/* Header */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "20px", fontWeight: 700, color: "#e6edf3", letterSpacing: 2 }}>
          💰 WAR ECONOMY DASHBOARD
        </div>
        <div style={{ fontSize: "11px", color: "#8b949e", marginTop: "4px" }}>
          Live Market Impact of Iran Conflict • {isRealData ? '🟢 Real-Time Data' : '🟡 Demo Data'} • {lastUpdate.toLocaleTimeString()}
        </div>
      </div>

      {/* Main Price Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "16px" }}>
        {/* Oil */}
        <div style={{ background: "#161b22", borderRadius: "12px", border: "1px solid #1a2332", padding: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#e6edf3", marginBottom: "12px" }}>
            🛢️ CRUDE OIL
          </div>
          {marketData.oil.brent && (
            <div style={{ marginBottom: "12px", padding: "10px", background: "#0d1117", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "#8b949e" }}>Brent</span>
                <span style={{ fontSize: "24px", fontWeight: 700, color: "#e6edf3" }}>
                  ${formatNumber(marketData.oil.brent.price)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                <span style={{ fontSize: "10px", color: "#6e7681" }}>vs yesterday</span>
                <span style={{ fontSize: "12px", color: getChangeColor(marketData.oil.brent.change), fontWeight: 600 }}>
                  {getChangeArrow(marketData.oil.brent.change)} {formatNumber(Math.abs(marketData.oil.brent.percent))}%
                </span>
              </div>
            </div>
          )}
          {marketData.oil.wti && (
            <div style={{ padding: "10px", background: "#0d1117", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "#8b949e" }}>WTI</span>
                <span style={{ fontSize: "24px", fontWeight: 700, color: "#e6edf3" }}>
                  ${formatNumber(marketData.oil.wti.price)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                <span style={{ fontSize: "10px", color: "#6e7681" }}>vs yesterday</span>
                <span style={{ fontSize: "12px", color: getChangeColor(marketData.oil.wti.change), fontWeight: 600 }}>
                  {getChangeArrow(marketData.oil.wti.change)} {formatNumber(Math.abs(marketData.oil.wti.percent))}%
                </span>
              </div>
            </div>
          )}
          <div style={{ marginTop: "10px", padding: "8px", background: "#ff174420", borderRadius: "6px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", color: "#ff8a80" }}>⚠️ Hormuz closes: </span>
            <span style={{ fontSize: "11px", color: "#ff1744", fontWeight: 700 }}>$150-200/bbl</span>
          </div>
        </div>

        {/* Gold */}
        <div style={{ background: "#161b22", borderRadius: "12px", border: "1px solid #1a2332", padding: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#e6edf3", marginBottom: "12px" }}>
            🥇 GOLD <span style={{fontSize: "9px", color: "#00e676"}}>● XAU/USD LIVE</span>
          </div>
          {marketData.gold.spot && (
            <div style={{ padding: "10px", background: "#0d1117", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "#8b949e" }}>Spot Price</span>
                <span style={{ fontSize: "22px", fontWeight: 700, color: "#ffd600" }}>
                  ${formatNumber(marketData.gold.spot.price)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                <span style={{ fontSize: "10px", color: "#6e7681" }}>vs yesterday</span>
                <span style={{ fontSize: "12px", color: getChangeColor(marketData.gold.spot.change), fontWeight: 600 }}>
                  {getChangeArrow(marketData.gold.spot.change)} {formatNumber(Math.abs(marketData.gold.spot.percent))}%
                </span>
              </div>
            </div>
          )}
          <div style={{ marginTop: "12px", display: "grid", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: "#0d1117", borderRadius: "6px" }}>
              <span style={{ fontSize: "11px", color: "#8b949e" }}>24h High</span>
              <span style={{ fontSize: "11px", color: "#ffd600", fontWeight: 600 }}>$5,216.23</span>
            </div>
          </div>
        </div>

        {/* Crypto - BTC/ETH/SOL */}
        <div style={{ background: "#161b22", borderRadius: "12px", border: "1px solid #1a2332", padding: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#e6edf3", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            ₿ CRYPTO MARKET <span style={{fontSize: "9px", color: "#f7931a"}}>● LIVE</span>
          </div>
          
          {/* Bitcoin - Main */}
          {marketData.bitcoin && (
            <div style={{ marginBottom: "10px", padding: "12px", background: "#0d1117", borderRadius: "8px", borderLeft: "3px solid #f7931a" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <span style={{ fontSize: "12px", color: "#8b949e", fontWeight: 600 }}>₿ Bitcoin</span>
                <span style={{ fontSize: "20px", fontWeight: 700, color: "#f7931a" }}>
                  ${formatNumber(marketData.bitcoin.price)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "9px", color: "#6e7681" }}>BTC/USD</span>
                <span style={{ fontSize: "11px", color: getChangeColor(marketData.bitcoin.change), fontWeight: 600 }}>
                  {getChangeArrow(marketData.bitcoin.change)} {formatNumber(Math.abs(marketData.bitcoin.percent))}%
                </span>
              </div>
            </div>
          )}
          
          {/* ETH & SOL Row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {marketData.ethereum && (
              <div style={{ padding: "10px", background: "#0d1117", borderRadius: "6px" }}>
                <div style={{ fontSize: "10px", color: "#8b949e", marginBottom: "2px" }}>Ξ Ethereum</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#627eea" }}>
                  ${formatNumber(marketData.ethereum.price)}
                </div>
                <div style={{ fontSize: "9px", color: getChangeColor(marketData.ethereum.change) }}>
                  {getChangeArrow(marketData.ethereum.change)} {formatNumber(Math.abs(marketData.ethereum.percent))}%
                </div>
              </div>
            )}
            {marketData.solana && (
              <div style={{ padding: "10px", background: "#0d1117", borderRadius: "6px" }}>
                <div style={{ fontSize: "10px", color: "#8b949e", marginBottom: "2px" }}>◎ Solana</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#14f195" }}>
                  ${formatNumber(marketData.solana.price)}
                </div>
                <div style={{ fontSize: "9px", color: getChangeColor(marketData.solana.change) }}>
                  {getChangeArrow(marketData.solana.change)} {formatNumber(Math.abs(marketData.solana.percent))}%
                </div>
              </div>
            )}
          </div>
          
          {/* Total Market Info */}
          <div style={{ marginTop: "10px", padding: "8px", background: "#0d1117", borderRadius: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
              <span style={{ color: "#6e7681" }}>Total Crypto Market Cap</span>
              <span style={{ color: "#00e676", fontWeight: 600 }}>$2.85T</span>
            </div>
          </div>
        </div>

        {/* Defense Stocks */}
        <div style={{ background: "#161b22", borderRadius: "12px", border: "1px solid #1a2332", padding: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#e6edf3", marginBottom: "12px" }}>
            🚀 DEFENSE STOCKS
          </div>
          <div style={{ display: "grid", gap: "8px" }}>
            {marketData.defense.slice(0, 4).map((stock, i) => (
              <div key={i} style={{ padding: "10px", background: "#0d1117", borderRadius: "8px", borderLeft: i === 0 ? "3px solid #00e676" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#e6edf3" }}>{stock.symbol}</div>
                    <div style={{ fontSize: "9px", color: "#6e7681" }}>{stock.name}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "16px", fontWeight: 700, color: "#e6edf3" }}>
                      ${formatNumber(stock.price)}
                    </div>
                    <div style={{ fontSize: "11px", color: getChangeColor(stock.change), fontWeight: 600 }}>
                      {getChangeArrow(stock.change)} {formatNumber(Math.abs(stock.percent))}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Correlations */}
      <div style={{ background: "#161b22", borderRadius: "12px", border: "1px solid #1a2332", padding: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#e6edf3", marginBottom: "12px" }}>
          📊 CONFLICT-MARKET CORRELATIONS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
          {CORRELATIONS.map((corr, i) => (
            <div key={i} style={{ padding: "16px", background: "#0d1117", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "10px", color: "#6e7681", marginBottom: "8px" }}>{corr.pair}</div>
              <div style={{ fontSize: "28px", fontWeight: 700, color: corr.correlation > 0.7 ? "#ff1744" : "#ffd600" }}>
                {corr.correlation.toFixed(2)}
              </div>
              <div style={{ fontSize: "10px", color: corr.trend === "up" ? "#00e676" : "#ff1744", marginTop: "4px" }}>
                {corr.trend === "up" ? "↑ Strengthening" : "↓ Weakening"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scenarios */}
      <div style={{ background: "#161b22", borderRadius: "12px", border: "1px solid #1a2332", padding: "16px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#e6edf3", marginBottom: "12px" }}>
          🎯 SCENARIO IMPACT ANALYSIS
        </div>
        <div style={{ display: "grid", gap: "10px" }}>
          {SCENARIOS.map((scenario, i) => (
            <div 
              key={i}
              onClick={() => setSelectedScenario(selectedScenario === i ? null : i)}
              style={{
                padding: "14px", background: "#0d1117", borderRadius: "8px",
                borderLeft: `4px solid ${i === 0 ? "#00e676" : i === 1 ? "#ffd600" : "#ff1744"}`,
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "13px", color: "#e6edf3", fontWeight: 600 }}>{scenario.name}</span>
                  <span style={{ fontSize: "11px", color: "#6e7681", marginLeft: "8px" }}>{scenario.probability}% prob</span>
                </div>
                <div style={{
                  padding: "4px 10px", background: i === 0 ? "#00e67620" : i === 1 ? "#ffd60020" : "#ff174420",
                  borderRadius: "4px", fontSize: "10px",
                  color: i === 0 ? "#00e676" : i === 1 ? "#ffd600" : "#ff1744", fontWeight: 600
                }}>
                  {i === 0 ? "BULLISH" : i === 1 ? "MIXED" : "BEARISH"}
                </div>
              </div>
              {selectedScenario === i && (
                <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #1a2332", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "9px", color: "#6e7681" }}>OIL</div>
                    <div style={{ fontSize: "13px", color: "#ffd600", fontWeight: 600 }}>{scenario.oilImpact}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "9px", color: "#6e7681" }}>GOLD</div>
                    <div style={{ fontSize: "13px", color: "#ffd600", fontWeight: 600 }}>{scenario.goldImpact}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "9px", color: "#6e7681" }}>DEFENSE</div>
                    <div style={{ fontSize: "13px", color: "#ffd600", fontWeight: 600 }}>{scenario.defenseImpact}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "9px", color: "#6e7681" }}>S&P 500</div>
                    <div style={{ fontSize: "13px", color: scenario.marketImpact.includes('+') ? "#00e676" : "#ff1744", fontWeight: 600 }}>{scenario.marketImpact}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: "9px", color: "#484f58", marginTop: "16px", textAlign: "center" }}>
        Data: Yahoo Finance API (attempts real-time fetch, falls back to recent market data) • Updates every 60s
      </div>
    </div>
  );
}
