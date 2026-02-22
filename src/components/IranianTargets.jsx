import { useState } from 'react';

// Iranian High-Value Targets
const IRAN_TARGETS = [
  { 
    id: 1, 
    name: "Hossein Salami", 
    role: "IRGC Commander-in-Chief", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Hossein_Salami_2019.jpg/440px-Hossein_Salami_2019.jpg",
    status: "ALIVE",
    priority: "HIGH"
  },
  { 
    id: 2, 
    name: "Amir Ali Hajizadeh", 
    role: "IRGC Aerospace Force Commander", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Amir_Ali_Hajizadeh.jpg/440px-Amir_Ali_Hajizadeh.jpg",
    status: "ALIVE",
    priority: "HIGH"
  },
  { 
    id: 3, 
    name: "Esmail Qaani", 
    role: "Quds Force Commander", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Esmail_Qaani_2020.jpg/440px-Esmail_Qaani_2020.jpg",
    status: "ALIVE",
    priority: "HIGH"
  },
  { 
    id: 4, 
    name: "Mohammad Reza Ashtiani", 
    role: "Defense Minister", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Mohammad_Reza_Ashtiani_2021.jpg/440px-Mohammad_Reza_Ashtiani_2021.jpg",
    status: "ALIVE",
    priority: "MEDIUM"
  },
  { 
    id: 5, 
    name: "Mohammad Eslami", 
    role: "Nuclear Chief (AEOI)", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Mohammad_Eslami_2021.jpg/440px-Mohammad_Eslami_2021.jpg",
    status: "ALIVE",
    priority: "HIGH"
  },
  { 
    id: 6, 
    name: "Abdolrahim Mousavi", 
    role: "Artesh (Army) Commander", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Abdolrahim_Mousavi_2021.jpg/440px-Abdolrahim_Mousavi_2021.jpg",
    status: "ALIVE",
    priority: "MEDIUM"
  },
  { 
    id: 7, 
    name: "Gholam Ali Rashid", 
    role: "Khatam al-Anbiya Commander", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Gholam_Ali_Rashid.jpg/440px-Gholam_Ali_Rashid.jpg",
    status: "ALIVE",
    priority: "HIGH"
  },
  { 
    id: 8, 
    name: "Fereydoon Abbasi", 
    role: "Nuclear Scientist", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Fereydoon_Abbasi_2011.jpg/440px-Fereydoon_Abbasi_2011.jpg",
    status: "ALIVE",
    priority: "MEDIUM"
  },
];

export default function IranianTargets() {
  const [targets] = useState(IRAN_TARGETS);

  return (
    <div style={{ background: "#0d1117", padding: 16, borderBottom: "1px solid #1a2332" }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#e6edf3", letterSpacing: 1 }}>
          🎯 IRANIAN HIGH-VALUE TARGETS
        </div>
        <div style={{ fontSize: 9, color: "#8b949e", marginTop: 2 }}>
          IRGC Commanders • Nuclear Officials • Military Leadership
        </div>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", 
        gap: 10 
      }}>
        {targets.map((target) => (
          <div 
            key={target.id}
            style={{
              position: "relative",
              background: "#161b22",
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid #1a2332",
              transition: "all 0.2s"
            }}
          >
            {/* Status Badge */}
            <div style={{
              position: "absolute",
              top: 6,
              right: 6,
              padding: "2px 6px",
              borderRadius: 4,
              fontSize: 8,
              fontWeight: "bold",
              letterSpacing: 0.5,
              background: target.status === "ALIVE" ? "#00e67620" : "#ff174420",
              color: target.status === "ALIVE" ? "#00e676" : "#ff1744",
              border: `1px solid ${target.status === "ALIVE" ? "#00e67640" : "#ff174440"}`,
              zIndex: 10
            }}>
              {target.status}
            </div>

            {/* Priority Badge */}
            <div style={{
              position: "absolute",
              top: 6,
              left: 6,
              padding: "2px 6px",
              borderRadius: 4,
              fontSize: 7,
              fontWeight: "bold",
              background: target.priority === "HIGH" ? "#ff174420" : "#ffd60020",
              color: target.priority === "HIGH" ? "#ff1744" : "#ffd600",
              zIndex: 10
            }}>
              {target.priority}
            </div>

            {/* Image Container */}
            <div style={{ 
              position: "relative",
              height: 100,
              background: "#0d1117",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <img 
                src={target.image} 
                alt={target.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: target.status === "ELIMINATED" ? 0.3 : 1,
                  filter: target.status === "ELIMINATED" ? "grayscale(100%) brightness(0.5)" : "none"
                }}
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23161b22'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23333' font-size='30'%3E👤%3C/text%3E%3C/svg%3E";
                }}
              />
              
              {/* Big X for ELIMINATED */}
              {target.status === "ELIMINATED" && (
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: 60,
                  color: "#ff1744",
                  fontWeight: "bold",
                  textShadow: "0 0 10px rgba(255, 23, 68, 0.5)",
                  pointerEvents: "none"
                }}>
                  ✕
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ padding: 8 }}>
              <div style={{ 
                fontSize: 10, 
                fontWeight: 600, 
                color: "#e6edf3",
                lineHeight: 1.2
              }}>
                {target.name}
              </div>
              <div style={{ 
                fontSize: 8, 
                color: "#6e7681", 
                marginTop: 2,
                lineHeight: 1.2
              }}>
                {target.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
