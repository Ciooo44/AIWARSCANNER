// Client-side news fetcher using Supabase
import { fetchNewsFromSupabase, subscribeToNews } from './supabase.js';

// Use Supabase for live news
export async function fetchLiveNews() {
  try {
    const news = await fetchNewsFromSupabase(20);
    return news;
  } catch (error) {
    console.error('Failed to fetch live news:', error);
    return null;
  }
}

// Auto-refresh with realtime subscription
export function startNewsRefresh(callback) {
  // Initial fetch
  fetchLiveNews().then(news => {
    if (news) callback(news);
  });
  
  // Subscribe to realtime updates
  const subscription = subscribeToNews((newItem) => {
    callback(currentNews => {
      // Add new item to beginning, remove duplicates
      const filtered = currentNews?.filter(n => n.url !== newItem.url) || [];
      return [newItem, ...filtered].slice(0, 20);
    });
  });
  
  // Return cleanup function
  return () => {
    subscription.unsubscribe();
  };
}

// Check if news is fresh
export function isNewsFresh(lastUpdated) {
  if (!lastUpdated) return false;
  const age = Date.now() - new Date(lastUpdated).getTime();
  return age < 10 * 60 * 1000; // 10 minutes
}
