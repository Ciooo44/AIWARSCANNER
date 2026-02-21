// Client-side news fetcher
// NOTE: RSS feeds require CORS proxy. Using static fallback for now.

import { NEWS_ITEMS } from "./data.js";

// For now, return static news
// TODO: Implement CORS proxy or serverless function for RSS feeds
export async function fetchLiveNews() {
  // Return null to use static news
  return null;
}

// Auto-refresh placeholder
export function startNewsRefresh(callback) {
  // Static news only for now
  return () => {};
}

export const isNewsFresh = () => false;
