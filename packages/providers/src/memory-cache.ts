import type { BytesLike } from '@ethersproject/bytes';

type Cache = {
  [key: string]: {
    expires: number;
    value: BytesLike;
  };
};
const cache: Cache = {}; // it's a cache hash ~~> cash?

const DEFAULT_TTL_IN_MS = 30 * 1000; // 30seconds

class MemoryCache {
  ttl: number;
  constructor(ttlInMs: number | boolean) {
    if (typeof ttlInMs === 'boolean') {
      this.ttl = DEFAULT_TTL_IN_MS;
    } else {
      this.ttl = typeof ttlInMs === 'number' && ttlInMs > 0 ? ttlInMs : DEFAULT_TTL_IN_MS;
    }
  }

  get(id: BytesLike): BytesLike | undefined {
    const key = id.toString();
    if (cache[key]) {
      if (cache[key].expires > Date.now()) {
        return cache[key].value;
      }

      delete cache[key];
    }

    return undefined;
  }

  set(id: BytesLike): number {
    const expiresAt = Date.now() + this.ttl;
    const key = id.toString();
    cache[key] = {
      expires: expiresAt,
      value: id,
    };

    return expiresAt;
  }

  getExcluded(): BytesLike[] {
    return Object.keys(cache).reduce((list, key) => {
      const data = this.get(key);
      if (data) {
        list.push(data);
      }

      return list;
    }, [] as BytesLike[]);
  }

  del(key: string) {
    delete cache[key];
  }
}

export default MemoryCache;
