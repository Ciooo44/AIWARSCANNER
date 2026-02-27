import { useState, useEffect } from 'react';

// Force comparison data - US vs Iran
const FORCE_DATA = {
  us: {
    name: "U.S. & ALLIES",
    flag: "🇺🇸",
    color: "#2979ff",
    forces: {
      bases: { count: 25, label: "U.S. BASES", icon: "🏗️" },
      naval: { count: 14, label: "NAVAL ASSETS", icon: "⚓" },
      personnel: { count: "94K+", label: "PERSONNEL", icon: "👤" },
      carriers: { count: 2, label: "CARRIERS", icon: "🛳️" },
      aircraft: { count: 280, label: "AIRCRAFT", icon: "✈️" },
      missiles: { count: "500+", label: "CRUISE MISSILES", icon: "🚀" }
    }
  },
  iran: {
    name: "IRAN / ADVERSARY",
    flag: "🇮🇷",
    color: "#ff1744",
    forces: {
      nuclear: { count: 18, label: "NUCLEAR FACILITIES", icon: "☢️" },
      missiles: { count: 52, label: "MISSILE SITES", icon: "🚀" },
      airdef: { count: 21, label: "AIR DEFENSE", icon: "📡" },
      airbases: { count: 29, label: "AIR BASES", icon: "✈️" },
      irgc: { count: 8, label: "IRGC BASES", icon: "⚔️" },
      oilgas: { count: 38, label: "OIL/GAS FACILITIES", icon: "🛢️" }
    }
  }
};

function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const targetNum = typeof target === 'string' ? parseInt(target) : target;
    const increment = targetNum / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setCount(targetNum);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target, duration]);
  
  return <span>{typeof target === 'string' && target.includes('K') ? `${count}K+` : count}</span>;
}

export default function ForceComparisonCounters() {
  const [selectedSide, setSelectedSide] = useState('both');

  return (
    <div style={{
      background: "#0d1117",
      borderRadius: 20,
      padding: 24,
      border: "1px solid #1a2332",
      margin: "16px 0"
    }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: 24
      }}>
        <div style={{
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 3,
          marginBottom: 8
        }}>
          <span style={{ color: "#2979ff" }}>🇺🇸 U.S.</span>
          <span style={{ color: "#8b949e", margin: "0 12px" }}>&</span>
          <span style={{ color: "#ff1744" }}>ALLIES 🇮🇷 IRAN</span>
        </div>
        <div style={{
          fontSize: 11,
          color: "#8b949e",
          letterSpacing: 1
        }}>
          FORCE COMPARISON DASHBOARD
        </div>
      </div>

      {/* Toggle */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 8,
        marginBottom: 24
      }}>
        {[
          { key: 'us', label: '🇺🇸 U.S. Forces', color: '#2979ff' },
          { key: 'both', label: '⚔️ Both Sides', color: '#ffd600' },
          { key: 'iran', label: '🇮🇷 Iran Forces', color: '#ff1744' }
        ].map(option => (
          <button
            key={option.key}
            onClick={() => setSelectedSide(option.key)}
            style={{
              padding: "8px 16px",
              background: selectedSide === option.key ? `${option.color}20` : '#161b22',
              border: `2px solid ${selectedSide === option.key ? option.color : '#1a2332'}`,
              borderRadius: 8,
              color: selectedSide === option.key ? option.color : '#8b949e',
              fontSize: 12,
              fontWeight: selectedSide === option.key ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* US Forces */}
      {(selectedSide === 'us' || selectedSide === 'both') && (
        <div style={{
          background: "#161b22",
          borderRadius: 16,
          padding: 20,
          marginBottom: 16,
          border: "2px solid #2979ff40"
        }}>
          <div style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#2979ff",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            🇺🇸 U.S. FORCES
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12
          }}>
            {Object.entries(FORCE_DATA.us.forces).map(([key, force]) => (
              <div key={key} style={{
                background: "#0d1117",
                borderRadius: 10,
                padding: 14,
                textAlign: "center",
                border: "1px solid #2979ff20"
              }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{force.icon}</div>
                <div style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#e6edf3",
                  marginBottom: 4
                }}>
                  {typeof force.count === 'number' ? (
                    <AnimatedCounter target={force.count} />
                  ) : (
                    force.count
                  )}
                </div>
                <div style={{
                  fontSize: 9,
                  color: "#8b949e",
                  letterSpacing: 0.5
                }}>
                  {force.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VS Divider */}
      {selectedSide === 'both' && (
        <div style={{
          textAlign: "center",
          margin: "20px 0",
          position: "relative"
        }}>
          <div style={{
            fontSize: 32,
            fontWeight: 900,
            color: "#ffd600",
            textShadow: "0 0 20px rgba(255,214,0,0.5)"
          }}>
            VS
          </div>
          <div style={{
            fontSize: 10,
            color: "#8b949e",
            marginTop: 4
          }}>
            FORCE COMPARISON
          </div>
        </div>
      )}

      {/* Iran Forces */}
      {(selectedSide === 'iran' || selectedSide === 'both') && (
        <div style={{
          background: "#161b22",
          borderRadius: 16,
          padding: 20,
          border: "2px solid #ff174440"
        }}>
          <div style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#ff1744",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            🇮🇷 IRAN / ADVERSARY
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12
          }}>
            {Object.entries(FORCE_DATA.iran.forces).map(([key, force]) => (
              <div key={key} style={{
                background: "#0d1117",
                borderRadius: 10,
                padding: 14,
                textAlign: "center",
                border: "1px solid #ff174420"
              }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{force.icon}</div>
                <div style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#e6edf3",
                  marginBottom: 4
                }}>
                  <AnimatedCounter target={force.count} />
                </div>
                <div style={{
                  fontSize: 9,
                  color: "#8b949e",
                  letterSpacing: 0.5
                }}>
                  {force.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer note */}
      <div style={{
        marginTop: 16,
        textAlign: "center",
        fontSize: 9,
        color: "#484f58",
        fontStyle: "italic"
      }}>
        Data: CENTCOM, IISS, Critical Threats, Open Source Intelligence
      </div>
    </div>
  );
}
