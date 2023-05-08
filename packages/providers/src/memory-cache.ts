import type { BytesLike } from '@ethersproject/bytes';
import { hexlify } from '@ethersproject/bytes';

type Cache = {
  [key: string]: {
    expires: number;
    value: BytesLike;
  };
};
const cache: Cache = {}; // it's a cache hash ~~> cash?

const DEFAULT_TTL_IN_MS = 30 * 1000; // 30seconds

export class MemoryCache {
  ttl: number;
  constructor(ttlInMs: number = DEFAULT_TTL_IN_MS) {
    this.ttl = ttlInMs;

    if (typeof ttlInMs !== 'number' || this.ttl <= 0) {
      throw new Error(`Invalid TTL: ${this.ttl}. Use a value greater than zero.`);
    }
  }

  get(value: BytesLike): BytesLike | undefined {
    const key = hexlify(value);
    if (cache[key]) {
      if (cache[key].expires > Date.now()) {
        return cache[key].value;
      }

      this.del(value);
    }

    return undefined;
  }

  set(value: BytesLike): number {
    const expiresAt = Date.now() + this.ttl;
    const key = hexlify(value);
    cache[key] = {
      expires: expiresAt,
      value,
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

  del(value: BytesLike) {
    const key = hexlify(value);
    delete cache[key];
  }
}
