// Social Sharing Module
// Share any dashboard panel to social media

export const SHARE_PLATFORMS = {
  twitter: {
    name: 'Twitter/X',
    icon: '𝕏',
    color: '#000000',
    url: (text, url) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  },
  telegram: {
    name: 'Telegram',
    icon: '✈️',
    color: '#0088cc',
    url: (text, url) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: '💬',
    color: '#25D366',
    url: (text, url) => `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
  },
  reddit: {
    name: 'Reddit',
    icon: '🤖',
    color: '#FF4500',
    url: (text, url) => `https://reddit.com/submit?title=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  },
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    color: '#0077b5',
    url: (text, url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  },
  copy: {
    name: 'Copy Link',
    icon: '🔗',
    color: '#6e7681',
    action: 'copy'
  }
};

// Generate embeddable widget code
export function generateEmbedCode(panelType, config = {}) {
  const embedUrl = `https://aiwarscanner.com/embed/${panelType}`;
  
  return {
    iframe: `<iframe src="${embedUrl}" width="${config.width || 600}" height="${config.height || 400}" frameborder="0" style="border:1px solid #1a2332;border-radius:8px;"></iframe>`,
    script: `<script src="https://aiwarscanner.com/widget.js" data-panel="${panelType}" data-theme="${config.theme || 'dark'}"></script>`,
    oembed: `https://aiwarscanner.com/oembed?url=${encodeURIComponent(embedUrl)}&format=json`
  };
}

// Share specific panel
export function sharePanel(panelType, data) {
  const shareTexts = {
    map: `🗺️ Theater Map: ${data.activeAssets} military assets tracked in real-time #AIWARSCANNER`,
    timeline: `⏱️ Crisis Timeline: ${data.eventCount} events since June 2025 #USIran`,
    forces: `⚔️ Force Comparison: US vs Iran military capabilities #OSINT`,
    news: `📰 Latest: ${data.headline?.substring(0, 80)}... #BreakingNews`,
    threat: `🔴 Current Threat Level: ${data.level} #IranCrisis`
  };
  
  return {
    text: shareTexts[panelType] || 'Check out AIWARSCANNER - Real-time US/Iran crisis monitor',
    url: `https://aiwarscanner.com#${panelType}`,
    image: `https://aiwarscanner.com/og/${panelType}.png` // Open Graph image
  };
}

// QR Code generation for mobile sharing
export function generateQRCode(url) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
}

// Export component
export function SocialShareButtons({ panelType, data }) {
  const shareData = sharePanel(panelType, data);
  
  return Object.entries(SHARE_PLATFORMS).map(([key, platform]) => ({
    platform: key,
    name: platform.name,
    icon: platform.icon,
    color: platform.color,
    url: platform.url ? platform.url(shareData.text, shareData.url) : null,
    action: platform.action || 'open'
  }));
}
