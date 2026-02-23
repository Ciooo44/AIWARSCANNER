// Telegram War Room Bot — Alert Script
// Usage: node telegram-bot.js "Your alert message"

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "YOUR_BOT_TOKEN_HERE";
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID || "@WSCNalert";

async function sendAlert(message, options = {}) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHANNEL_ID,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: false,
        ...options
      }),
    });
    
    const data = await response.json();
    if (data.ok) {
      console.log("✅ Alert sent successfully!");
      return data;
    } else {
      console.error("❌ Failed to send alert:", data.description);
      return null;
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    return null;
  }
}

// Pre-defined alert templates
const ALERT_TEMPLATES = {
  strike: (location, details = "") => `🔴 <b>STRIKE ALERT</b>

Reports of military action in <b>${location}</b>.

${details}

Monitoring all channels. Updates every 5 minutes.

🌐 aiwarscanner.vercel.app
$WSCN 🔴`,

  evacuation: (country, location, reason) => `🟠 <b>EVACUATION UPDATE</b>

${country} has evacuated from ${location}.
Reason: "${reason}"

Track all evacuations:
aiwarscanner.vercel.app

$WSCN 🔴`,

  escalation: (from, to, reason) => `⚡ <b>ESCALATION LEVEL: ${from} → ${to}</b>

${reason}

Dashboard: aiwarscanner.vercel.app

$WSCN 🔴`,

  proxy: (group, target, location) => `💥 <b>PROXY ATTACK REPORT</b>

${group} has attacked ${target} in ${location}.

Retaliation possible. Monitoring situation.

aiwarscanner.vercel.app
$WSCN 🔴`,

  diplomacy: (event, outcome) => `🟢 <b>DIPLOMATIC UPDATE</b>

${event}

Result: ${outcome}

aiwarscanner.vercel.app
$WSCN`,

  intelligence: (source, details) => `🔍 <b>INTELLIGENCE UPDATE</b>

Source: ${source}

${details}

aiwarscanner.vercel.app
$WSCN 🔴`,

  market: (asset, change) => `📊 <b>MARKET SHOCK</b>

${asset} ${change}

War premium building. Track live prices:
aiwarscanner.vercel.app

$WSCN`,
};

// Example usage:
// sendAlert(ALERT_TEMPLATES.strike("Tehran", "Multiple explosions reported near military facilities."));
// sendAlert(ALERT_TEMPLATES.evacuation("🇺🇸 US Embassy", "Lebanon", "Expected regional developments"));
// sendAlert(ALERT_TEMPLATES.escalation("85", "91", "USS Gerald R. Ford arrived at Haifa. NYT reports Trump leaning toward strikes."));

// Command line usage
if (process.argv.length > 2) {
  const message = process.argv.slice(2).join(" ");
  sendAlert(message);
} else {
  console.log(`
🤖 Telegram War Room Bot — Usage:

1. Set environment variables:
   export TELEGRAM_BOT_TOKEN="your_token"
   export TELEGRAM_CHANNEL_ID="@WSCNalert"

2. Send custom alert:
   node telegram-bot.js "Your custom message"

3. Use templates (edit this file):
   - Uncomment the template you want to use
   - Run: node telegram-bot.js

Available templates:
  - ALERT_TEMPLATES.strike(location, details)
  - ALERT_TEMPLATES.evacuation(country, location, reason)
  - ALERT_TEMPLATES.escalation(from, to, reason)
  - ALERT_TEMPLATES.proxy(group, target, location)
  - ALERT_TEMPLATES.diplomacy(event, outcome)
  - ALERT_TEMPLATES.intelligence(source, details)
  - ALERT_TEMPLATES.market(asset, change)
`);
}

module.exports = { sendAlert, ALERT_TEMPLATES };
