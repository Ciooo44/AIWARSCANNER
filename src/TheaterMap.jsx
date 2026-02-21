import { useEffect, useRef, useState } from 'react';
import { US_NAVAL_ASSETS, US_BASES, IRAN_ASSETS } from "./data";

// Leaflet CSS will be loaded dynamically
const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

export default function TheaterMap({ onAssetSelect, activeLayer }) {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    if (!window.L) {
      const script = document.createElement('script');
      script.src = LEAFLET_JS;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || leafletMap.current) return;

    const L = window.L;

    // Initialize map centered on Persian Gulf
    const map = L.map(mapRef.current, {
      center: [28.5, 52.0],
      zoom: 6,
      minZoom: 4,
      maxZoom: 12,
      zoomControl: false,
      attributionControl: false
    });

    leafletMap.current = map;

    // Add zoom control to top-right
    L.control.zoom({
      position: 'topright'
    }).addTo(map);

    // Dark theme map tiles (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Add Strait of Hormuz danger zone
    const hormuzZone = L.circle([26.575, 56.25], {
      radius: 50000, // 50km
      color: '#ff1744',
      fillColor: '#ff1744',
      fillOpacity: 0.1,
      weight: 2,
      dashArray: '10, 10'
    }).addTo(map);

    hormuzZone.bindPopup(`
      <div style="font-family: monospace; background: #0d1117; color: #e6edf3; padding: 10px; border-radius: 8px;">
        <div style="color: #ff1744; font-weight: bold; margin-bottom: 5px;">⚠ STRAIT OF HORMUZ</div>
        <div style="font-size: 12px; color: #8b949e;">Critical chokepoint - 20% global oil</div>
        <div style="font-size: 11px; color: #ff6d00; margin-top: 5px;">IRGC conducting live-fire drills</div>
      </div>
    `);

    // Animate Hormuz zone
    let pulsing = true;
    const pulseHormuz = () => {
      if (!pulsing) return;
      hormuzZone.setStyle({ fillOpacity: 0.1 });
      setTimeout(() => {
        if (pulsing) hormuzZone.setStyle({ fillOpacity: 0.25 });
      }, 1000);
      setTimeout(() => {
        if (pulsing) hormuzZone.setStyle({ fillOpacity: 0.1 });
      }, 2000);
    };
    const pulseInterval = setInterval(pulseHormuz, 3000);

    return () => {
      pulsing = false;
      clearInterval(pulseInterval);
      map.remove();
      leafletMap.current = null;
    };
  }, [isLoaded]);

  // Add/update markers based on active layer
  useEffect(() => {
    if (!leafletMap.current || !isLoaded) return;
    const L = window.L;
    const map = leafletMap.current;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const showUS = activeLayer === "all" || activeLayer === "us";
    const showIran = activeLayer === "all" || activeLayer === "iran";

    // Custom icon generator
    const createIcon = (color, icon, isPulse = false) => {
      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 28px; 
            height: 28px; 
            background: ${color}; 
            border: 2px solid #fff; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            box-shadow: 0 0 15px ${color}80;
            ${isPulse ? 'animation: pulse 2s infinite;' : ''}
          ">
            <span style="font-size: 12px;">${icon}</span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14]
      });
    };

    // Add Iran assets
    if (showIran) {
      IRAN_ASSETS.forEach(asset => {
        const isNuclear = asset.type === 'nuclear';
        const isChokepoint = asset.type === 'chokepoint';
        
        const color = isNuclear ? '#ff1744' : isChokepoint ? '#ff6d00' : '#e040fb';
        const icon = isNuclear ? '☢️' : isChokepoint ? '⚠️' : '🔴';
        
        const marker = L.marker([asset.lat, asset.lon], {
          icon: createIcon(color, icon, isNuclear || isChokepoint)
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: 'JetBrains Mono', monospace; min-width: 250px;">
            <div style="background: #0d1117; color: #e6edf3; padding: 12px; border-radius: 8px; border: 1px solid #30363d;">
              <div style="color: ${color}; font-weight: bold; font-size: 14px; margin-bottom: 8px;">
                ${isNuclear ? '☢️ ' : ''}${asset.name}
              </div>
              <div style="color: #8b949e; font-size: 11px; line-height: 1.5; margin-bottom: 10px;">
                ${asset.details}
              </div>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <span style="background: ${color}20; color: ${color}; padding: 2px 8px; border-radius: 4px; font-size: 10px; text-transform: uppercase;">
                  ${asset.type}
                </span>
                <span style="color: #6e7681; font-size: 10px;">
                  ${asset.lat.toFixed(2)}°N, ${asset.lon.toFixed(2)}°E
                </span>
              </div>
            </div>
          </div>
        `);

        marker.on('click', () => {
          setSelectedAsset(asset.id);
          onAssetSelect?.(asset);
        });

        markersRef.current.push(marker);
      });
    }

    // Add US bases
    if (showUS) {
      US_BASES.forEach(base => {
        const marker = L.marker([base.lat, base.lon], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                width: 24px; 
                height: 24px; 
                background: #2979ff; 
                border: 2px solid #fff; 
                border-radius: 4px; 
                display: flex; 
                align-items: center; 
                justify-content: center;
                box-shadow: 0 0 12px #2979ff80;
                transform: rotate(45deg);
              ">
                <span style="font-size: 10px; transform: rotate(-45deg);">🎯</span>
              </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          })
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: 'JetBrains Mono', monospace; min-width: 250px;">
            <div style="background: #0d1117; color: #e6edf3; padding: 12px; border-radius: 8px; border: 1px solid #30363d;">
              <div style="color: #2979ff; font-weight: bold; font-size: 14px; margin-bottom: 8px;">
                🎯 ${base.name}
              </div>
              <div style="color: #00e676; font-size: 11px; margin-bottom: 5px;">
                📍 ${base.country}
              </div>
              <div style="color: #8b949e; font-size: 11px; line-height: 1.5; margin-bottom: 10px;">
                ${base.details}
              </div>
              <span style="background: #2979ff20; color: #2979ff; padding: 2px 8px; border-radius: 4px; font-size: 10px; text-transform: uppercase;">
                ${base.type}
              </span>
            </div>
          </div>
        `);

        marker.on('click', () => {
          setSelectedAsset(base.id);
          onAssetSelect?.(base);
        });

        markersRef.current.push(marker);
      });
    }

    // Add US naval assets
    if (showUS) {
      US_NAVAL_ASSETS.forEach(asset => {
        const isCarrier = asset.type === 'carrier';
        const isSub = asset.type === 'submarine';
        
        const color = isCarrier ? '#2979ff' : isSub ? '#7c4dff' : '#00b0ff';
        const size = isCarrier ? 32 : 24;
        const icon = isCarrier ? '🚢' : isSub ? '🔻' : '⚓';
        
        const marker = L.marker([asset.lat, asset.lon], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                width: ${size}px; 
                height: ${size}px; 
                background: ${color}; 
                border: 2px solid #fff; 
                border-radius: 50%; 
                display: flex; 
                align-items: center; 
                justify-content: center;
                box-shadow: 0 0 20px ${color}80;
                ${isCarrier ? 'animation: pulse 2s infinite;' : ''}
              ">
                <span style="font-size: ${isCarrier ? 14 : 10}px;">${icon}</span>
              </div>
            `,
            iconSize: [size, size],
            iconAnchor: [size/2, size/2]
          })
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: 'JetBrains Mono', monospace; min-width: 280px;">
            <div style="background: #0d1117; color: #e6edf3; padding: 12px; border-radius: 8px; border: 1px solid #30363d;">
              <div style="color: ${color}; font-weight: bold; font-size: 14px; margin-bottom: 8px;">
                ${icon} ${asset.name}
              </div>
              <div style="color: #8b949e; font-size: 11px; line-height: 1.5; margin-bottom: 10px;">
                ${asset.details}
              </div>
              <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 8px;">
                <span style="background: ${color}20; color: ${color}; padding: 2px 8px; border-radius: 4px; font-size: 10px; text-transform: uppercase;">
                  ${asset.type}
                </span>
                <span style="background: ${asset.status === 'deployed' ? '#00e67620' : '#ffd60020'}; color: ${asset.status === 'deployed' ? '#00e676' : '#ffd600'}; padding: 2px 8px; border-radius: 4px; font-size: 10px; text-transform: uppercase;">
                  ${asset.status}
                </span>
              </div>
              <div style="color: #6e7681; font-size: 10px;">
                📍 ${asset.lat.toFixed(2)}°N, ${asset.lon.toFixed(2)}°E
              </div>
            </div>
          </div>
        `);

        marker.on('click', () => {
          setSelectedAsset(asset.id);
          onAssetSelect?.(asset);
        });

        markersRef.current.push(marker);
      });
    }

  }, [isLoaded, activeLayer, onAssetSelect]);

  if (!isLoaded) {
    return (
      <div style={{
        width: "100%",
        height: "500px",
        background: "#030810",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        border: "2px solid #1a2332"
      }}>
        <div style={{ color: "#8b949e", fontFamily: "monospace" }}>
          🗺️ Loading Map...
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Map Header */}
      <div style={{
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 1000,
        background: "rgba(13, 17, 23, 0.95)",
        padding: "10px 14px",
        borderRadius: 8,
        border: "1px solid #30363d",
        backdropFilter: "blur(10px)"
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#e6edf3", letterSpacing: 1 }}>
          🗺️ CENTCOM THEATER OF OPERATIONS
        </div>
        <div style={{ fontSize: 9, color: "#6e7681", marginTop: 4 }}>
          Real-time asset tracking • Leaflet OSM
        </div>
      </div>

      {/* Legend */}
      <div style={{
        position: "absolute",
        bottom: 20,
        left: 12,
        zIndex: 1000,
        background: "rgba(13, 17, 23, 0.95)",
        padding: "12px",
        borderRadius: 8,
        border: "1px solid #30363d",
        backdropFilter: "blur(10px)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10
      }}>
        <div style={{ color: "#e6edf3", fontWeight: "bold", marginBottom: 8, fontSize: 11 }}>
          LEGEND
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14 }}>🚢</span>
            <span style={{ color: "#8b949e" }}>US Carrier (CVN)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12 }}>🎯</span>
            <span style={{ color: "#8b949e" }}>US Military Base</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14 }}>☢️</span>
            <span style={{ color: "#8b949e" }}>Iran Nuclear Site</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12 }}>⚠️</span>
            <span style={{ color: "#8b949e" }}>Critical Zone</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapRef}
        style={{
          width: "100%",
          height: "550px",
          borderRadius: 12,
          border: "2px solid #1a2332",
          overflow: "hidden"
        }}
      />

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          background: #0d1117 !important;
          border: 1px solid #30363d !important;
          border-radius: 8px !important;
          padding: 0 !important;
        }
        .leaflet-popup-tip {
          background: #0d1117 !important;
          border: 1px solid #30363d !important;
        }
        .leaflet-container {
          background: #030810 !important;
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </div>
  );
}
