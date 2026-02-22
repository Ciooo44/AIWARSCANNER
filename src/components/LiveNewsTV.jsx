import { useState } from 'react';

const NEWS_CHANNELS = [
  { id: 'AlJazeera', name: 'Al Jazeera', url: 'https://www.youtube.com/embed/live_stream?channel=UCNye-wNBqGNq1xbVyon1ENA', country: 'Qatar' },
  { id: 'Reuters', name: 'Reuters', url: 'https://www.youtube.com/embed/live_stream?channel=UChqUTb7kYRX8-EiaN3XBfSQ', country: 'UK' },
  { id: 'BBC', name: 'BBC News', url: 'https://www.youtube.com/embed/live_stream?channel=UC16niRr50-MSBwiO3YDb3RA', country: 'UK' },
  { id: 'CNN', name: 'CNN', url: 'https://www.youtube.com/embed/live_stream?channel=UCupvZG-5ko_eiXAupbDfxWw', country: 'USA' },
  { id: 'CNA', name: 'CNA', url: 'https://www.youtube.com/embed/live_stream?channel=UC83jt4dlz1Gjl58fzQrrKZg', country: 'Singapore' },
];

export default function LiveNewsTV() {
  const [activeChannel, setActiveChannel] = useState(NEWS_CHANNELS[0]);
  const [isMinimized, setIsMinimized] = useState(false);

  if (isMinimized) {
    return (
      <div 
        onClick={() => setIsMinimized(false)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "#ff1744",
          color: "#fff",
          padding: "8px 16px",
          borderRadius: 20,
          cursor: "pointer",
          fontSize: 11,
          fontWeight: "bold",
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(255, 23, 68, 0.4)",
          display: "flex",
          alignItems: "center",
          gap: 6
        }}
      >
        📺 LIVE TV
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed",
      bottom: 20,
      right: 20,
      width: "360px",
      background: "#0d1117",
      borderRadius: 12,
      border: "1px solid #30363d",
      overflow: "hidden",
      zIndex: 1000,
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #ff1744 0%, #ff6d00 100%)",
        padding: "8px 12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span style={{ fontSize: 11, fontWeight: "bold", color: "#fff" }}>
          🔴 LIVE NEWS TV
        </span>
        <button 
          onClick={() => setIsMinimized(true)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: 16
          }}
        >
          −
        </button>
      </div>

      {/* Channel Selector */}
      <div style={{
        display: "flex",
        gap: 4,
        padding: 8,
        background: "#161b22",
        overflowX: "auto"
      }}>
        {NEWS_CHANNELS.map(channel => (
          <button
            key={channel.id}
            onClick={() => setActiveChannel(channel)}
            style={{
              padding: "4px 8px",
              fontSize: 9,
              background: activeChannel.id === channel.id ? "#ff1744" : "#21262d",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            {channel.name}
          </button>
        ))}
      </div>

      {/* Video Player */}
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        <iframe
          src={activeChannel.url}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none"
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Footer */}
      <div style={{
        padding: "6px 12px",
        background: "#0d1117",
        fontSize: 9,
        color: "#8b949e",
        textAlign: "center"
      }}>
        {activeChannel.name} • {activeChannel.country}
      </div>
    </div>
  );
}
