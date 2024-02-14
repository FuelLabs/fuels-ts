/* eslint-disable no-param-reassign */

export type CacheFor = {
  [key: string]: {
    timeout: number;
    value: unknown;
  } | null;
};

type CacheForOptions = {
  key: string;
  cache: CacheFor;
  cacheTime: number;
};

export function cacheFor<F extends (...args: unknown[]) => Promise<unknown>>(
  fn: F,
  { cache, cacheTime, key }: CacheForOptions
): F {
  return (async (...args: unknown[]) => {
    if (cache[key] && cache[key]?.value) {
      return cache[key]?.value as ReturnType<F>;
    }
    clearTimeout(cache[key]?.timeout);
    const result = await fn(...args);

    // Create cache auto clean

    cache[key] = {
      timeout: Number(
        setTimeout(() => {
          cache[key] = null;
        }, cacheTime)
      ),
      value: result,
    };

    return result;
  }) as F;
}
