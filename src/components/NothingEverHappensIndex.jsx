import { useState, useEffect } from 'react';

// The "Nothing Ever Happens Index" - tracking how wrong the "nothing will happen" crowd was
const NOTHING_INDEX = {
  predictions: [
    { source: "Twitter Analysts", prediction: "Trump is bluffing", date: "Feb 20", status: "WRONG" },
    { source: "Reddit r/worldnews", prediction: "Just saber rattling", date: "Feb 22", status: "WRONG" },
    { source: "Cable News Pundits", prediction: "Diplomacy will work", date: "Feb 24", status: "WRONG" },
    { source: "Iranian Officials", prediction: "US won't dare attack", date: "Feb 26", status: "WRONG" },
    { source: "Defense Experts", prediction: "March deadline is fake", date: "Feb 27", status: "WRONG" },
  ],
  currentStatus: "SOMETHING HAPPENED",
  warStarted: "Feb 28, 2026",
  confidenceBefore: "85% said 'nothing will happen'",
  reality: "WAR IS HAPPENING"
};

export default function NothingEverHappensIndex() {
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    // Animate the wrong predictions counter
    const target = NOTHING_INDEX.predictions.length;
    let current = 0;
    const interval = setInterval(() => {
      if (current < target) {
        current++;
        setWrongCount(current);
      } else {
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: "linear-gradient(135deg, #263238 0%, #37474f 50%, #263238 100%)",
      borderRadius: 20,
      padding: 24,
      margin: "16px 0",
      border: "2px solid #00e676",
      boxShadow: "0 0 30px rgba(0,230,118,0.3)"
    }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: 20
      }}>
        <div style={{
          fontSize: 14,
          fontWeight: 800,
          color: "#00e676",
          letterSpacing: 2,
          marginBottom: 8
        }}>
          📉 NOTHING EVER HAPPENS INDEX
        </div>
        <div style={{
          fontSize: 11,
          color: "#8b949e",
          fontStyle: "italic"
        }}>
          Tracking how wrong the "nothing will happen" crowd was
        </div>
      </div>

      {/* Big Status */}
      <div style={{
        background: "linear-gradient(135deg, #ff1744 0%, #8b0000 100%)",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        textAlign: "center",
        border: "2px solid #ffeb3b",
        animation: "pulse 2s infinite"
      }}>
        <div style={{
          fontSize: 12,
          color: "#ffeb3b",
          marginBottom: 8,
          fontWeight: 700
        }}>
          CURRENT STATUS
        </div>
        <div style={{
          fontSize: 32,
          fontWeight: 900,
          color: "#fff",
          textShadow: "0 0 20px rgba(255,0,0,0.8)",
          marginBottom: 8
        }}>
          ❌ SOMETHING HAPPENED ❌
        </div>
        <div style={{
          fontSize: 14,
          color: "#ffeb3b"
        }}>
          War Started: {NOTHING_INDEX.warStarted}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginBottom: 20
      }}>
        <div style={{
          background: "rgba(0,0,0,0.3)",
          borderRadius: 10,
          padding: 14,
          textAlign: "center",
          border: "1px solid #ff1744"
        }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#ff1744" }}>
            {wrongCount}
          </div>
          <div style={{ fontSize: 10, color: "#8b949e" }}>
            EXPERTS WERE WRONG
          </div>
        </div>
        <div style={{
          background: "rgba(0,0,0,0.3)",
          borderRadius: 10,
          padding: 14,
          textAlign: "center",
          border: "1px solid #00e676"
        }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#00e676" }}>
            0
          </div>
          <div style={{ fontSize: 10, color: "#8b949e" }}>
            EXPERTS WERE RIGHT
          </div>
        </div>
      </div>

      {/* Wrong Predictions List */}
      <div style={{
        background: "rgba(0,0,0,0.2)",
        borderRadius: 12,
        padding: 16
      }}>
        <div style={{
          fontSize: 11,
          color: "#8b949e",
          marginBottom: 12,
          letterSpacing: 1
        }}>
          📋 WRONG PREDICTIONS HALL OF SHAME
        </div>
        
        {NOTHING_INDEX.predictions.map((pred, index) => (
          <div key={index} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: index < NOTHING_INDEX.predictions.length - 1 ? "1px solid #37474f" : "none"
          }}>
            <div>
              <div style={{ fontSize: 11, color: "#e6edf3", fontWeight: 600 }}>
                {pred.source}
              </div>
              <div style={{ fontSize: 10, color: "#8b949e" }}>
                "{pred.prediction}"
              </div>
            </div>
            <div style={{
              fontSize: 10,
              padding: "4px 10px",
              background: "#ff174420",
              color: "#ff1744",
              borderRadius: 4,
              fontWeight: 700,
              border: "1px solid #ff174440"
            }}>
              ❌ {pred.status}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom quote */}
      <div style={{
        marginTop: 16,
        padding: 12,
        background: "rgba(0,230,118,0.1)",
        borderRadius: 8,
        textAlign: "center",
        border: "1px dashed #00e676"
      }}>
        <div style={{
          fontSize: 12,
          color: "#00e676",
          fontStyle: "italic"
        }}>
          💡 "This time it's different" — said every time, and sometimes it was
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255,0,0,0.4); }
          50% { box-shadow: 0 0 40px rgba(255,0,0,0.6); }
        }
      `}</style>
    </div>
  );
}
