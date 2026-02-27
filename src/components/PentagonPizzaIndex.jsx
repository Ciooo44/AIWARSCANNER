import { useState, useEffect } from 'react';

// The famous "Pentagon Pizza Indicator" - increased pizza deliveries correlate with crisis staffing
const PIZZA_DATA = {
  currentStatus: "SPIKE DETECTED",
  location: "Papa John's - Pentagon",
  time: "12:07 PM ET",
  trafficLevel: "ABOVE AVERAGE",
  trafficPercent: 145, // 45% above normal
  trend: "spiking",
  historicalContext: [
    { event: "Normal Day", level: 100 },
    { event: "Current", level: 145 },
    { event: "9/11 Attacks", level: 320 },
    { event: "Iraq 2003 Invasion", level: 280 }
  ]
};

export default function PentagonPizzaIndex() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: "linear-gradient(135deg, #d32f2f 0%, #b71c1c 50%, #7f0000 100%)",
      borderRadius: 20,
      padding: 24,
      margin: "16px 0",
      border: "3px solid #ffeb3b",
      boxShadow: pulse ? "0 0 40px rgba(255,0,0,0.6)" : "0 0 20px rgba(255,0,0,0.3)",
      transition: "box-shadow 0.5s ease",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Pizza emoji background */}
      <div style={{
        position: "absolute",
        top: -20,
        right: -20,
        fontSize: 120,
        opacity: 0.1,
        transform: "rotate(15deg)"
      }}>
        🍕
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 16
      }}>
        <span style={{ fontSize: 32 }}>🍕</span>
        <div>
          <div style={{
            fontSize: 14,
            fontWeight: 800,
            color: "#ffeb3b",
            letterSpacing: 2,
            textShadow: "0 2px 4px rgba(0,0,0,0.5)"
          }}>
            PENTAGON PIZZA INDEX
          </div>
          <div style={{
            fontSize: 11,
            color: "#ffcdd2",
            fontStyle: "italic"
          }}>
            "When the brass orders extra pepperoni, war is coming"
          </div>
        </div>
      </div>

      {/* Main Status */}
      <div style={{
        background: "rgba(0,0,0,0.3)",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        border: "2px solid #ffeb3b",
        textAlign: "center"
      }}>
        <div style={{
          fontSize: 12,
          color: "#ffcdd2",
          marginBottom: 4
        }}>
          📍 {PIZZA_DATA.location} • {PIZZA_DATA.time}
        </div>
        <div style={{
          fontSize: 28,
          fontWeight: 900,
          color: "#ffeb3b",
          textShadow: "0 0 20px rgba(255,235,59,0.5)",
          animation: "pulse 1s infinite"
        }}>
          {PIZZA_DATA.currentStatus}
        </div>
        <div style={{
          fontSize: 14,
          color: "#fff",
          marginTop: 8
        }}>
          Traffic: <span style={{ fontWeight: 700, color: "#ffeb3b" }}>{PIZZA_DATA.trafficLevel}</span> ({PIZZA_DATA.trafficPercent}% of normal)
        </div>
      </div>

      {/* Historical Comparison */}
      <div style={{
        background: "rgba(0,0,0,0.2)",
        borderRadius: 10,
        padding: 14
      }}>
        <div style={{
          fontSize: 10,
          color: "#ffcdd2",
          marginBottom: 10,
          letterSpacing: 1
        }}>
          📊 HISTORICAL CONTEXT
        </div>
        
        {PIZZA_DATA.historicalContext.map((item, index) => (
          <div key={index} style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
            fontSize: 12
          }}>
            <span style={{
              minWidth: 100,
              color: index === 1 ? "#ffeb3b" : "#ffcdd2",
              fontWeight: index === 1 ? 700 : 400
            }}>
              {item.event}
            </span>
            <div style={{
              flex: 1,
              height: 8,
              background: "rgba(0,0,0,0.3)",
              borderRadius: 4,
              overflow: "hidden"
            }}>
              <div style={{
                width: `${(item.level / 320) * 100}%`,
                height: "100%",
                background: index === 1 ? "#ffeb3b" : (item.level > 200 ? "#ff5722" : "#8bc34a"),
                borderRadius: 4,
                transition: "width 1s ease"
              }} />
            </div>
            <span style={{
              minWidth: 40,
              textAlign: "right",
              color: index === 1 ? "#ffeb3b" : "#ffcdd2",
              fontWeight: index === 1 ? 700 : 400,
              fontSize: 11
            }}>
              {item.level}%
            </span>
          </div>
        ))}
      </div>

      {/* Warning message */}
      <div style={{
        marginTop: 14,
        padding: 12,
        background: "rgba(255,0,0,0.2)",
        borderRadius: 8,
        border: "1px dashed #ffeb3b",
        textAlign: "center"
      }}>
        <span style={{
          fontSize: 12,
          color: "#ffeb3b",
          fontStyle: "italic"
        }}>
          💡 "The Pentagon doesn't sleep, but they do order pizza. When deliveries spike, something big is brewing."
        </span>
      </div>

      <div style={{
        marginTop: 10,
        textAlign: "center",
        fontSize: 9,
        color: "rgba(255,255,255,0.5)"
      }}>
        Source: Papa John's traffic data • Updated: 12:07 PM ET
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}
