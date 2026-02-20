// Enhanced Live Ticker with WebSocket Support
// Real-time updates without page refresh

import { useEffect, useState, useRef } from 'react';

// WebSocket connection for real-time updates
export class LiveTickerSocket {
  constructor(url = 'wss://aiwarscanner.com/ws') {
    this.url = url;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.listeners = new Set();
  }

  connect() {
    try {
      this.ws = new WebSocket(this.url);
      
      this.ws.onopen = () => {
        console.log('🔌 WebSocket Connected');
        this.reconnectAttempts = 0;
        this.broadcast({ type: 'connected' });
      };
      
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.broadcast(data);
      };
      
      this.ws.onclose = () => {
        console.log('🔌 WebSocket Disconnected');
        this.attemptReconnect();
      };
      
      this.ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`🔄 Reconnecting... Attempt ${this.reconnectAttempts}`);
        this.connect();
      }, 5000 * this.reconnectAttempts);
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  broadcast(data) {
    this.listeners.forEach(callback => callback(data));
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

// Ticker hook for React components
export function useLiveTicker() {
  const [alerts, setAlerts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    // For now, use polling fallback until WebSocket is set up
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('https://aiwarscanner.com/api/alerts');
        if (response.ok) {
          const data = await response.json();
          setAlerts(data.alerts || []);
        }
      } catch (error) {
        // Silent fail for polling
      }
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(pollInterval);
  }, []);

  return { alerts, isConnected };
}

// Marquee text generator with priority
export function generateMarqueeText(items) {
  const critical = items.filter(i => i.severity === 'critical');
  const high = items.filter(i => i.severity === 'high');
  
  let text = '';
  
  if (critical.length > 0) {
    text += `🔴 ${critical.map(i => i.title.toUpperCase()).join(' • ')} • `;
  }
  
  if (high.length > 0) {
    text += `🟠 ${high.map(i => i.title).join(' • ')} • `;
  }
  
  // Default fallback
  if (!text) {
    text = '🟢 Monitoring active • Awaiting significant developments • ';
  }
  
  return text.repeat(3); // Repeat for seamless loop
}

// Sound alert for critical events
export function playAlertSound(severity) {
  const sounds = {
    critical: '/sounds/red-alert.mp3',
    high: '/sounds/notification.mp3',
    normal: null
  };
  
  const soundFile = sounds[severity];
  if (soundFile && typeof Audio !== 'undefined') {
    const audio = new Audio(soundFile);
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play failed:', e));
  }
}

// Browser notification
export function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      console.log('Notification permission:', permission);
    });
  }
}

export function sendNotification(title, options = {}) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: 'aiwarscanner-alert',
      requireInteraction: true,
      ...options
    });
  }
}

// Export enhanced ticker component
export default function EnhancedTicker({ items }) {
  const marqueeText = generateMarqueeText(items);
  
  return {
    text: marqueeText,
    hasCritical: items.some(i => i.severity === 'critical'),
    lastUpdate: new Date().toISOString()
  };
}
