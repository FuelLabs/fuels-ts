import fs from 'fs';
import path from 'path';

export const FUELS_VERSION_CACHE_FILE = path.join(__dirname, '.fuels-cache.json');

export type FuelsVersionCache = {
  data: { version: string } | null;
  timestamp: number;
};

export const saveToCache = (cache: FuelsVersionCache) => {
  fs.writeFileSync(FUELS_VERSION_CACHE_FILE, JSON.stringify(cache), 'utf-8');
};

export const FUELS_VERSION_CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

export const checkAndLoadCache = (): FuelsVersionCache | null => {
  if (fs.existsSync(FUELS_VERSION_CACHE_FILE)) {
    const savedCache = JSON.parse(fs.readFileSync(FUELS_VERSION_CACHE_FILE, 'utf-8'));
    if (
      savedCache &&
      savedCache.data &&
      Date.now() - savedCache.timestamp < FUELS_VERSION_CACHE_TTL
    ) {
      return savedCache.data.version;
    }
  }
  return null;
};
