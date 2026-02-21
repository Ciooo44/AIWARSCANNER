// Client-side news fetcher
// Fetches from our API and updates the news feed

const API_URL = '/api/news';
const FALLBACK_NEWS = []; // Will use static data as fallback

export async function fetchLiveNews() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    
    if (data.success && data.news.length > 0) {
      return data.news;
    }
    
    // Return null to indicate we should use fallback
    return null;
    
  } catch (error) {
    console.log('Live news fetch failed:', error);
    return null;
  }
}

// Auto-refresh news every 5 minutes
export function startNewsRefresh(callback) {
  // Initial fetch
  fetchLiveNews().then(news => {
    if (news) callback(news);
  });
  
  // Set up interval
  const interval = setInterval(async () => {
    const news = await fetchLiveNews();
    if (news) callback(news);
  }, 5 * 60 * 1000); // 5 minutes
  
  return () => clearInterval(interval);
}

// Check if news is fresh (less than 10 minutes old)
export function isNewsFresh(lastUpdated) {
  if (!lastUpdated) return false;
  const age = Date.now() - new Date(lastUpdated).getTime();
  return age < 10 * 60 * 1000; // 10 minutes
}
