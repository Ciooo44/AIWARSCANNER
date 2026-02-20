// Telegram Bot for AIWARSCANNER
// Real-time alerts to Telegram channel

const TELEGRAM_CONFIG = {
  botToken: process.env.TELEGRAM_BOT_TOKEN,
  channelId: process.env.TELEGRAM_CHANNEL_ID, // @aiwarscanner or channel ID
};

// Message templates with emojis
const MESSAGE_TEMPLATES = {
  critical: {
    prefix: '🚨 <b>CRITICAL ALERT</b>\n\n',
    color: '#FF1744',
    pin: true
  },
  high: {
    prefix: '⚡ <b>HIGH PRIORITY</b>\n\n',
    color: '#FF6D00',
    pin: false
  },
  normal: {
    prefix: '📰 <b>UPDATE</b>\n\n',
    color: '#00E676',
    pin: false
  }
};

// Format message for Telegram HTML
export function formatTelegramMessage(event) {
  const template = MESSAGE_TEMPLATES[event.severity] || MESSAGE_TEMPLATES.normal;
  
  let message = template.prefix;
  message += `<b>${event.title}</b>\n\n`;
  
  if (event.description) {
    message += `${event.description.substring(0, 300)}...\n\n`;
  }
  
  message += `📍 <b>Location:</b> ${event.location || 'Regional'}\n`;
  message += `⏰ <b>Time:</b> ${event.time}\n`;
  message += `📡 <b>Source:</b> ${event.source}\n\n`;
  
  if (event.url) {
    message += `🔗 <a href="${event.url}">Read More</a>\n\n`;
  }
  
  message += `📊 Live Dashboard: https://aiwarscanner.com\n`;
  message += `#AIWARSCANNER #OSINT`;
  
  return {
    text: message,
    parse_mode: 'HTML',
    disable_web_page_preview: false,
    pin: template.pin
  };
}

// Keyboard buttons for interaction
export function getAlertKeyboard(event) {
  return {
    inline_keyboard: [
      [
        { text: '📍 View on Map', url: `https://aiwarscanner.com/map?lat=${event.lat}&lon=${event.lon}` },
        { text: '📊 Full Report', url: 'https://aiwarscanner.com' }
      ],
      [
        { text: '🔔 Turn On Alerts', callback_data: 'subscribe_alerts' },
        { text: 'ℹ️ About', callback_data: 'show_about' }
      ]
    ]
  };
}

// Daily digest format
export function formatDailyDigest(summary) {
  let message = '📅 <b>24-HOUR CRISIS DIGEST</b>\n';
  message += '━━━━━━━━━━━━━━━━━━━━━━\n\n';
  
  message += `🔴 <b>Threat Level:</b> ${summary.threatLevel}\n`;
  message += `📰 <b>News Items:</b> ${summary.newsCount}\n`;
  message += `⚔️ <b>Military Movements:</b> ${summary.assetMovements}\n`;
  message += `🌍 <b>Diplomatic Updates:</b> ${summary.diplomaticUpdates}\n\n`;
  
  message += '<b>🔥 Top Stories:</b>\n';
  summary.topStories.forEach((story, i) => {
    message += `${i + 1}. ${story.title.substring(0, 60)}...\n`;
  });
  
  message += '\n━━━━━━━━━━━━━━━━━━━━━━\n';
  message += '🚀 Full dashboard: https://aiwarscanner.com';
  
  return message;
}

// Stats update for channel description
export function getChannelDescription(stats) {
  return `AIWARSCANNER - Real-time US/Iran Crisis Monitor\n` +
    `🔴 Threat Level: ${stats.threatLevel}\n` +
    `📡 Last Update: ${new Date().toUTCString()}\n` +
    `🌐 https://aiwarscanner.com`;
}

export default { formatTelegramMessage, getAlertKeyboard, formatDailyDigest };
