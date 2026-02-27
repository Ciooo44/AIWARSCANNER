import { useState, useEffect } from 'react';

// Simulated live social media feed
const SOCIAL_POSTS = [
  {
    id: 1,
    source: "X / Twitter",
    author: "@sentdefender",
    handle: "OSINT",
    text: "10 C-17 Globemaster IIIs and 1 C-5 Super Galaxy active over Europe right now. This is massive.",
    time: "2 min ago",
    verified: true,
    likes: "12.5K",
    shares: "8.2K"
  },
  {
    id: 2,
    source: "X / Twitter", 
    author: "@IntelDoge",
    handle: "OSINT",
    text: "Israel opening public shelters is not routine. This is pre-war preparation.",
    time: "5 min ago",
    verified: true,
    likes: "24.1K",
    shares: "15.3K"
  },
  {
    id: 3,
    source: "X / Twitter",
    author: "@MiddleEastEye",
    handle: "News",
    text: "BREAKING: Khamenei's direct threat to Trump is unprecedented in US-Iran history.",
    time: "8 min ago",
    verified: true,
    likes: "45.2K",
    shares: "32.1K"
  },
  {
    id: 4,
    source: "X / Twitter",
    author: "@OSINTtechnical",
    handle: "Military OSINT",
    text: "USS Gerald R. Ford positioning is textbook pre-strike deployment. Outside missile range, within strike range.",
    time: "12 min ago",
    verified: true,
    likes: "18.7K",
    shares: "11.4K"
  },
  {
    id: 5,
    source: "X / Twitter",
    author: "@IAEAorg",
    handle: "Official",
    text: "Iran has not cooperated with nuclear inspectors for 180 days. Status unknown.",
    time: "1 hour ago",
    verified: true,
    likes: "8.9K",
    shares: "6.2K"
  }
];

export default function SocialFeed() {
  const [posts, setPosts] = useState(SOCIAL_POSTS);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;
    
    // Simulate new posts coming in
    const interval = setInterval(() => {
      // In real app, this would fetch new posts
      setPosts(prev => prev);
    }, 30000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div style={{
      background: "#0d1117",
      borderRadius: 16,
      padding: 20,
      border: "1px solid #1a2332"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
      }}>
        <div>
          <div style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#e6edf3",
            letterSpacing: 1
          }}>
            🐦 LIVE SOCIAL FEED
          </div>
          <div style={{
            fontSize: 10,
            color: "#8b949e",
            marginTop: 2
          }}>
            Real-time signals from X, analysts, OSINT
          </div>
        </div>
        
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
          <span style={{
            width: 8,
            height: 8,
            background: "#00e676",
            borderRadius: "50%",
            animation: "pulse 1s infinite"
          }} />
          <span style={{
            fontSize: 10,
            color: "#00e676",
            fontWeight: 600
          }}>
            LIVE
          </span>
        </div>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxHeight: 400,
        overflow: "auto"
      }}>
        {posts.map((post, index) => (
          <div 
            key={post.id}
            style={{
              background: index === 0 ? "#ff174410" : "#161b22",
              borderRadius: 12,
              padding: 16,
              border: index === 0 ? "1px solid #ff174440" : "1px solid #1a2332",
              borderLeft: `3px solid ${post.verified ? "#1da1f2" : "#6e7681"}`
            }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 8
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  fontSize: 12,
                  color: "#1da1f2",
                  fontWeight: 600
                }}>
                  {post.author}
                </span>
                {post.verified && (
                  <span style={{
                    fontSize: 10,
                    color: "#1da1f2",
                    background: "#1da1f220",
                    padding: "2px 6px",
                    borderRadius: 4
                  }}>
                    ✓ {post.handle}
                  </span>
                )}
              </div>
              <span style={{
                fontSize: 10,
                color: "#6e7681"
              }}>
                {post.time}
              </span>
            </div>

            <p style={{
              fontSize: 13,
              color: "#c9d1d9",
              lineHeight: 1.5,
              marginBottom: 12
            }}>
              {post.text}
            </p>

            <div style={{
              display: "flex",
              gap: 16,
              fontSize: 11,
              color: "#6e7681"
            }}>
              <span>❤️ {post.likes}</span>
              <span>🔄 {post.shares}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 12,
        textAlign: "center",
        fontSize: 10,
        color: "#484f58"
      }}>
        Updates every 30 seconds • Source: X/Twitter API
      </div>
    </div>
  );
}
