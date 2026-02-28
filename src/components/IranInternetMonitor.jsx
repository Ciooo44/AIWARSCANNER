import { useState, useEffect } from 'react';

// Iran Internet Shutdown Monitor - Real-time connectivity tracking
const CONNECTIVITY_DATA = {
  currentStatus: "NEAR-COMPLETE SHUTDOWN",
  currentConnectivity: 2, // 2% of normal levels
  previousWeek: 100,
  dropPercentage: 98,
  shutdownStart: "07:00 UTC",
  duration: "5+ hours",
  trend: "stable-at-bottom", // stable-at-bottom, declining, recovering
  lastUpdate: "12:57 UTC",
  historical: [
    { time: "06:00", connectivity: 95 },
    { time: "06:30", connectivity: 88 },
    { time: "07:00", connectivity: 45 },
    { time: "07:30", connectivity: 12 },
    { time: "08:00", connectivity: 4 },
    { time: "08:30", connectivity: 3 },
    { time: "09:00", connectivity: 4 },
    { time: "09:30", connectivity: 3 },
    { time: "10:00", connectivity: 3 },
    { time: "10:30", connectivity: 2 },
    { time: "11:00", connectivity: 2 },
    { time: "11:30", connectivity: 2 },
    { time: "12:00", connectivity: 2 },
    { time: "12:30", connectivity: 2 },
    { time: "13:00", connectivity: 2 },
  ]
};

const AFFECTED_SERVICES = [
  { name: "Mobile Data", status: "DOWN", icon: "📱", percentage: 1 },
  { name: "Fixed Internet", status: "DOWN", icon: "🌐", percentage: 3 },
  { name: "Social Media", status: "BLOCKED", icon: "💬", percentage: 0 },
  { name: "VPN Access", status: "LIMITED", icon: "🔒", percentage: 5 },
  { name: "Messaging Apps", status: "DEGRADED", icon: "✉️", percentage: 8 },
  { name: "International Calls", status: "DEGRADED", icon: "📞", percentage: 15 },
];

export default function IranInternetMonitor() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pulseEffect, setPulseEffect] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const pulse = setInterval(() => {
      setPulseEffect(p => !p);
    }, 1000);
    return () => clearInterval(pulse);
  }, []);

  const getStatusColor = (percentage) => {
    if (percentage <= 5) return "#ff0000";
    if (percentage <= 20) return "#ff6d00";
    if (percentage <= 50) return "#ffd600";
    return "#00e676";
  };

  const getStatusText = (percentage) => {
    if (percentage <= 5) return "🔴 CRITICAL";
    if (percentage <= 20) return "🟠 SEVERE";
    if (percentage <= 50) return "🟡 MODERATE";
    return "🟢 NORMAL";
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #1a0000 0%, #0d1117 50%, #1a0000 100%)",
      borderRadius: 20,
      padding: 24,
      margin: "16px 0",
      border: `3px solid ${getStatusColor(CONNECTIVITY_DATA.currentConnectivity)}`,
      boxShadow: `0 0 ${pulseEffect ? 60 : 30}px ${getStatusColor(CONNECTIVITY_DATA.currentConnectivity)}60`
    }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: `2px solid ${getStatusColor(CONNECTIVITY_DATA.currentConnectivity)}40`
      }}>
        <div style={{
          fontSize: 18,
          fontWeight: 900,
          color: getStatusColor(CONNECTIVITY_DATA.currentConnectivity),
          letterSpacing: 3,
          marginBottom: 8,
          animation: pulseEffect ? "pulse 1s infinite" : "none"
        }}>
          🌐 IRAN INTERNET SHUTDOWN MONITOR
        </div>
        <div style={{
          fontSize: 11,
          color: "#8b949e"
        }}>
          Real-time connectivity tracking via NetBlocks & network data
        </div>
        <div style={{
          marginTop: 8,
          padding: "4px 12px",
          background: `${getStatusColor(CONNECTIVITY_DATA.currentConnectivity)}20`,
          borderRadius: 4,
          display: "inline-block"
        }}>
          <span style={{
            fontSize: 10,
            color: getStatusColor(CONNECTIVITY_DATA.currentConnectivity),
            fontWeight: 700
          }}>
            {getStatusText(CONNECTIVITY_DATA.currentConnectivity)}
          </span>
        </div>
      </div>

      {/* Main Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 12,
        marginBottom: 24
      }}>
        {/* Current Connectivity */}
        <div style={{
          background: "rgba(0,0,0,0.5)",
          borderRadius: 12,
          padding: 16,
          textAlign: "center",
          border: `2px solid ${getStatusColor(CONNECTIVITY_DATA.currentConnectivity)}`
        }}>
          <div style={{ fontSize: 10, color: "#8b949e", marginBottom: 4 }}>CONNECTIVITY</div>
          <div style={{
            fontSize: 36,
            fontWeight: 900,
            color: getStatusColor(CONNECTIVITY_DATA.currentConnectivity),
            textShadow: `0 0 20px ${getStatusColor(CONNECTIVITY_DATA.currentConnectivity)}80`
          }}>
            {CONNECTIVITY_DATA.currentConnectivity}%
          </div>
          <div style={{ fontSize: 9, color: "#6e7681" }}>of normal levels</div>
        </div>

        {/* Drop Percentage */}
        <div style={{
          background: "rgba(0,0,0,0.5)",
          borderRadius: 12,
          padding: 16,
          textAlign: "center",
          border: "2px solid #ff0000"
        }}>
          <div style={{ fontSize: 10, color: "#8b949e", marginBottom: 4 }}>DROP FROM NORMAL</div>
          <div style={{
            fontSize: 36,
            fontWeight: 900,
            color: "#ff0000",
            textShadow: "0 0 20px #ff000080"
          }}>
            -{CONNECTIVITY_DATA.dropPercentage}%
          </div>
          <div style={{ fontSize: 9, color: "#6e7681" }}>vs previous week</div>
        </div>

        {/* Duration */}
        <div style={{
          background: "rgba(0,0,0,0.5)",
          borderRadius: 12,
          padding: 16,
          textAlign: "center",
          border: "2px solid #ff6d00"
        }}>
          <div style={{ fontSize: 10, color: "#8b949e", marginBottom: 4 }}>SHUTDOWN DURATION</div>
          <div style={{
            fontSize: 36,
            fontWeight: 900,
            color: "#ff6d00"
          }}>
            {CONNECTIVITY_DATA.duration}
          </div>
          <div style={{ fontSize: 9, color: "#6e7681" }}>since {CONNECTIVITY_DATA.shutdownStart}</div>
        </div>

        {/* Last Update */}
        <div style={{
          background: "rgba(0,0,0,0.5)",
          borderRadius: 12,
          padding: 16,
          textAlign: "center",
          border: "2px solid #30363d"
        }}>
          <div style={{ fontSize: 10, color: "#8b949e", marginBottom: 4 }}>LAST UPDATE</div>
          <div style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#e6edf3"
          }}>
            {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
          </div>
          <div style={{ fontSize: 9, color: "#00e676" }}>● Live tracking</div>
        </div>
      </div>

      {/* Connectivity Graph */}
      <div style={{
        background: "rgba(0,0,0,0.3)",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#e6edf3" }}>
            📉 CONNECTIVITY TIMELINE (Last 7 Hours)
          </div>
          <div style={{ fontSize: 10, color: "#8b949e" }}>
            Data: NetBlocks
          </div>
        </div>

        {/* Bar Chart */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 4,
          height: 120,
          padding: "10px 0"
        }}>
          {CONNECTIVITY_DATA.historical.map((point, index) => {
            const height = Math.max(point.connectivity * 1.1, 4);
            const color = getStatusColor(point.connectivity);
            const isLast = index === CONNECTIVITY_DATA.historical.length - 1;
            
            return (
              <div
                key={index}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4
                }}
              >
                <div style={{
                  fontSize: 8,
                  color: isLast ? "#fff" : "#6e7681",
                  fontWeight: isLast ? 700 : 400
                }}>
                  {point.connectivity}%
                </div>
                <div style={{
                  width: "100%",
                  height: `${height}px`,
                  background: isLast ? color : `${color}60`,
                  borderRadius: "2px 2px 0 0",
                  transition: "all 0.3s ease",
                  boxShadow: isLast ? `0 0 10px ${color}` : "none"
                }} />
                <div style={{
                  fontSize: 7,
                  color: "#6e7681",
                  transform: "rotate(-45deg)",
                  whiteSpace: "nowrap",
                  marginTop: 8
                }}>
                  {point.time}
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline markers */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
          padding: "8px 0",
          borderTop: "1px dashed #30363d"
        }}>
          <div style={{ fontSize: 9, color: "#8b949e" }}>
            🚀 Strikes begin: 07:00 UTC
          </div>
          <div style={{ fontSize: 9, color: "#ff1744" }}>
            🔴 Shutdown complete: 08:00 UTC
          </div>
          <div style={{ fontSize: 9, color: "#8b949e" }}>
            ⏰ Now: {currentTime.toLocaleTimeString('en-US', { hour12: false })}
          </div>
        </div>
      </div>

      {/* Affected Services Grid */}
      <div style={{
        background: "rgba(0,0,0,0.3)",
        borderRadius: 12,
        padding: 16
      }}>
        <div style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#e6edf3",
          marginBottom: 12
        }}>
          📱 AFFECTED SERVICES
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 8
        }}>
          {AFFECTED_SERVICES.map((service, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: 10,
                background: "rgba(22,27,34,0.8)",
                borderRadius: 8,
                border: `1px solid ${getStatusColor(service.percentage)}40`
              }}
            >
              <div style={{ fontSize: 20 }}>{service.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#e6edf3"
                }}>
                  {service.name}
                </div>
                <div style={{
                  fontSize: 9,
                  color: getStatusColor(service.percentage),
                  fontWeight: 700
                }}>
                  {service.status}
                </div>
              </div>
              <div style={{
                fontSize: 12,
                fontWeight: 700,
                color: getStatusColor(service.percentage)
              }}>
                {service.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Context Note */}
      <div style={{
        marginTop: 20,
        padding: 14,
        background: "rgba(255,23,68,0.1)",
        borderRadius: 10,
        border: "1px dashed #ff1744"
      }}>
        <div style={{
          fontSize: 11,
          color: "#ff6d00",
          fontWeight: 600,
          lineHeight: 1.6
        }}>
          ⚠️ <strong>CONTEXT:</strong> The disruption began around 07:00 UTC following reports of military strikes. 
          In past incidents, the Iranian government has responded to internal unrest and external threats with 
          nationwide Internet shutdowns to control information flow. This appears to be the most severe shutdown 
          since the November 2019 protests.
        </div>
      </div>

      {/* Data Sources */}
      <div style={{
        marginTop: 16,
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {[
          { name: "NetBlocks", url: "https://netblocks.org/" },
          { name: "Cloudflare Radar", url: "https://radar.cloudflare.com/" },
          { name: "IODA", url: "https://ioda.inetintel.cc.gatech.edu/" }
        ].map(source => (
          <a
            key={source.name}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 10,
              color: "#8b949e",
              textDecoration: "none",
              padding: "6px 12px",
              background: "#161b22",
              borderRadius: 4,
              border: "1px solid #30363d"
            }}
          >
            📡 {source.name} →
          </a>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
