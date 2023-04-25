import type { BytesLike } from '@ethersproject/bytes';
import { hexlify } from '@ethersproject/bytes';
import { randomBytes } from '@fuel-ts/keystore';

import MemoryCache from './memory-cache';

const CACHE_ITEMS = [hexlify(randomBytes(8)), randomBytes(8), randomBytes(8)];

describe('Memory Cache', () => {
  it('can construct [true ttl]', () => {
    const memCache = new MemoryCache(true);

    expect(memCache.ttl).toEqual(30_000);
  });

  it('can construct [valid numerical ttl]', () => {
    const memCache = new MemoryCache(1000);

    expect(memCache.ttl).toEqual(1000);
  });

  it('can construct [invalid numerical ttl]', () => {
    const memCache = new MemoryCache(-1);

    expect(memCache.ttl).toEqual(30_000);
  });

  it('can construct [invalid mistyped ttl]', () => {
    // @ts-expect-error intentional invalid input
    const memCache = new MemoryCache('bogus');

    expect(memCache.ttl).toEqual(30_000);
  });

  it('can get [unknown key]', () => {
    const memCache = new MemoryCache(1000);

    expect(
      memCache.get('0xda5d131c490db33333333333333333334444444444444444444455555555556666')
    ).toEqual(undefined);
  });

  it('can get excluded [no data]', () => {
    const EXPECTED: BytesLike[] = [];
    const memCache = new MemoryCache(100);

    expect(memCache.getExcluded()).toStrictEqual(EXPECTED);
  });

  it('can set', () => {
    const ttl = 1000;
    const expiresAt = Date.now() + ttl;
    const memCache = new MemoryCache(ttl);

    expect(memCache.set(CACHE_ITEMS[0])).toBeGreaterThanOrEqual(expiresAt);
  });

  it('can get [valid key]', () => {
    const KEY = CACHE_ITEMS[1];
    const memCache = new MemoryCache(100);

    memCache.set(KEY);

    expect(memCache.get(KEY)).toEqual(KEY);
  });

  it('can get [valid key bytes like]', () => {
    const KEY = CACHE_ITEMS[2];
    const memCache = new MemoryCache(100);

    memCache.set(KEY);

    expect(memCache.get(KEY)).toEqual(KEY);
  });

  it('can get [valid key, expired content]', async () => {
    const KEY = randomBytes(8);
    const memCache = new MemoryCache(1);

    memCache.set(KEY);

    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });

    expect(memCache.get(KEY)).toEqual(undefined);
  });

  it('can delete', () => {
    const KEY = randomBytes(8);
    const memCache = new MemoryCache(100);

    memCache.set(KEY);
    memCache.del(KEY);

    expect(memCache.get(KEY)).toEqual(undefined);
  });

  it('can get excluded [with data]', () => {
    const EXPECTED: BytesLike[] = [CACHE_ITEMS[0], CACHE_ITEMS[1], CACHE_ITEMS[2]];
    const memCache = new MemoryCache(100);

    expect(memCache.getExcluded()).toStrictEqual(EXPECTED);
  });
});
