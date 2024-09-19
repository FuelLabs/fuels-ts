import { checkAndLoadCache, saveToCache } from './fuelsVersionCache';

export const getLatestFuelsVersion = async (): Promise<string | undefined> => {
  const now = Date.now();

  const cache = checkAndLoadCache();
  if (cache) {
    return cache.version;
  }

  const data: { version: string } | null = await Promise.race([
    new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000);
    }),
    fetch('https://registry.npmjs.org/fuels/latest').then((response) => response.json()),
  ]);

  if (!data) {
    throw new Error('Failed to fetch latest fuels version.');
  }

  const version = data.version as string;

  saveToCache({
    version,
    timestamp: now,
  });

  return version;
};
