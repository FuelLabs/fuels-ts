import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';
import { hexlify } from '@fuel-ts/utils';

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

  /**
   * @throws {FuelError} {@link ErrorCode.INVALID_TTL}
   * When the TTL is not a number
   * 
   * @throws {FuelError} {@link ErrorCode.INVALID_TTL}
   * When the TTL is less than or equal to zero
   */
  constructor(ttlInMs: number = DEFAULT_TTL_IN_MS) {
    this.ttl = ttlInMs;

    if (typeof ttlInMs !== 'number' || this.ttl <= 0) {
      throw new FuelError(
        ErrorCode.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
    }
  }

  get(value: BytesLike, isAutoExpiring = true): BytesLike | undefined {
    const key = hexlify(value);
    if (cache[key]) {
      if (!isAutoExpiring || cache[key].expires > Date.now()) {
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

  getAllData(): BytesLike[] {
    return Object.keys(cache).reduce((list, key) => {
      const data = this.get(key, false);
      if (data) {
        list.push(data);
      }

      return list;
    }, [] as BytesLike[]);
  }

  getActiveData(): BytesLike[] {
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
