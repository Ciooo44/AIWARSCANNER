const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const parser = new Parser();

// RSS Feed sources
const FEEDS = [
  { url: 'https://feeds.bbci.co.uk/news/world/middle_east/rss.xml', source: 'BBC', category: 'military' },
  { url: 'https://www.aljazeera.com/xml/rss/all.xml', source: 'Al Jazeera', category: 'military' },
  { url: 'http://feeds.reuters.com/reuters/worldnews', source: 'Reuters', category: 'diplomacy' },
  { url: 'http://rss.cnn.com/rss/edition_world.rss', source: 'CNN', category: 'military' },
];

// Keywords to filter Iran-related news
const KEYWORDS = [
  'iran', 'tehran', 'khamenei', 'pezeshkian', 'araghchi',
  'us strike', 'military action', 'nuclear deal', 'hormuz',
  'trump iran', 'pentagon', 'war', 'conflict', 'missile',
  'israel iran', 'middle east', 'gulf', 'sanctions'
];

function isIranRelated(title, content = '') {
  const text = (title + ' ' + content).toLowerCase();
  return KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()));
}

function determineCategory(title, content = '') {
  const text = (title + ' ' + content).toLowerCase();
  if (text.includes('strike') || text.includes('military') || text.includes('attack') || text.includes('missile')) return 'military';
  if (text.includes('talk') || text.includes('deal') || text.includes('negotiation') || text.includes('diplomat')) return 'diplomacy';
  if (text.includes('nuclear') || text.includes('enrichment') || text.includes('uranium')) return 'intelligence';
  return 'analysis';
}

function timeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

async function fetchNews() {
  const allNews = [];
  
  for (const feed of FEEDS) {
    try {
      console.log(`Fetching: ${feed.source}`);
      const data = await parser.parseURL(feed.url);
      
      for (const item of data.items.slice(0, 5)) {
        if (isIranRelated(item.title, item.contentSnippet)) {
          allNews.push({
            time: timeAgo(item.pubDate || item.isoDate),
            source: feed.source,
            title: item.title,
            category: determineCategory(item.title, item.contentSnippet),
            url: item.link
          });
        }
      }
    } catch (error) {
      console.error(`Error fetching ${feed.source}:`, error.message);
    }
  }
  
  // Sort by time (newest first) and limit to 15 items
  return allNews.slice(0, 15);
}

function updateDataFile(newsItems) {
  const dataPath = path.join(__dirname, '../../src/data.js');
  let content = fs.readFileSync(dataPath, 'utf8');
  
  // Format news items
  const newsArray = newsItems.map(item => 
    `  { time: "${item.time}", source: "${item.source}", title: "${item.title.replace(/"/g, '\\"')}", category: "${item.category}", url: "${item.url}" }`
  ).join(',\n');
  
  // Replace NEWS_ITEMS array
  const newContent = content.replace(
    /export const NEWS_ITEMS = \[[\s\S]*?\];/,
    `export const NEWS_ITEMS = [\n${newsArray}\n];`
  );
  
  fs.writeFileSync(dataPath, newContent);
  console.log(`Updated ${newsItems.length} news items`);
}

async function main() {
  console.log('Fetching latest Iran-US conflict news...');
  const news = await fetchNews();
  
  if (news.length === 0) {
    console.log('No new Iran-related news found');
    return;
  }
  
  updateDataFile(news);
  console.log('Done!');
}

main().catch(console.error);
