import fs from 'fs';
import path from 'path';

export const FUELS_VERSION_CACHE_FILE = path.join(__dirname, 'FUELS_VERSION');

export type FuelsVersionCache = string;

export const saveToCache = (cache: FuelsVersionCache) => {
  fs.writeFileSync(FUELS_VERSION_CACHE_FILE, cache, 'utf-8');
};

export const FUELS_VERSION_CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

export const checkAndLoadCache = (): FuelsVersionCache | null => {
  const doesVersionCacheExist = fs.existsSync(FUELS_VERSION_CACHE_FILE);

  if (doesVersionCacheExist) {
    const cachedVersion = fs.readFileSync(FUELS_VERSION_CACHE_FILE, 'utf-8');
    if (!cachedVersion) {
      return null;
    }

    const { mtimeMs: cacheTimestamp } = fs.statSync(FUELS_VERSION_CACHE_FILE);
    const hasCacheExpired = Date.now() - cacheTimestamp < FUELS_VERSION_CACHE_TTL;

    return hasCacheExpired ? null : cachedVersion;
  }

  return null;
};
