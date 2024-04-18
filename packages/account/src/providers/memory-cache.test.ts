import { randomBytes } from '@fuel-ts/crypto';
import type { BytesLike } from '@fuel-ts/interfaces';
import { hexlify } from '@fuel-ts/utils';

import { MemoryCache } from './memory-cache';

/**
 * @group node
 * @group browser
 */
describe('Memory Cache', () => {
  it('can construct [valid numerical ttl]', () => {
    const memCache = new MemoryCache(1000);

    expect(memCache.ttl).toEqual(1000);
  });

  it('can construct [invalid numerical ttl]', () => {
    expect(() => new MemoryCache(-1)).toThrow(/Invalid TTL: -1. Use a value greater than zero./);
  });

  it('can construct [invalid mistyped ttl]', () => {
    // @ts-expect-error intentional invalid input
    expect(() => new MemoryCache('bogus')).toThrow(
      /Invalid TTL: bogus. Use a value greater than zero./
    );
  });

  it('can construct [missing ttl]', () => {
    const memCache = new MemoryCache();

    expect(memCache.ttl).toEqual(30_000);
  });

  it('can get [unknown key]', () => {
    const memCache = new MemoryCache(1000);

    expect(
      memCache.get('0xda5d131c490db33333333333333333334444444444444444444455555555556666')
    ).toEqual(undefined);
  });

  it('can get active [no data]', () => {
    const EXPECTED: BytesLike[] = [];
    const memCache = new MemoryCache(100);

    expect(memCache.getActiveData()).toStrictEqual(EXPECTED);
  });

  it('can set', () => {
    const ttl = 1000;
    const expiresAt = Date.now() + ttl;
    const memCache = new MemoryCache(ttl);
    const value = randomBytes(8);

    expect(memCache.set(value)).toBeGreaterThanOrEqual(expiresAt);
  });

  it('can get [valid key]', () => {
    const value = randomBytes(8);
    const memCache = new MemoryCache(100);

    memCache.set(value);

    expect(memCache.get(value)).toEqual(value);
  });

  it('can get [valid key bytes like]', () => {
    const value = randomBytes(8);
    const memCache = new MemoryCache(100);

    memCache.set(value);

    expect(memCache.get(value)).toEqual(value);
  });

  it('can get [valid key, expired content]', async () => {
    const value = randomBytes(8);
    const memCache = new MemoryCache(1);

    memCache.set(value);

    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });

    expect(memCache.get(value)).toEqual(undefined);
  });

  it('can get, disabling auto deletion [valid key, expired content]', async () => {
    const value = randomBytes(8);
    const memCache = new MemoryCache(1);

    memCache.set(value);

    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });

    expect(memCache.get(value, false)).toEqual(value);
  });

  it('can delete', () => {
    const value = randomBytes(8);
    const memCache = new MemoryCache(100);

    memCache.set(value);
    memCache.del(value);

    expect(memCache.get(value)).toEqual(undefined);
  });

  it('can get active [with data]', () => {
    const value1 = randomBytes(8);
    const value2 = randomBytes(8);
    const value3 = hexlify(randomBytes(8));
    const EXPECTED: BytesLike[] = [value1, value2, value3];

    const memCache = new MemoryCache(100);

    memCache.set(value1);
    memCache.set(value2);
    memCache.set(value3);

    expect(memCache.getActiveData()).containSubset(EXPECTED);
  });

  it('can get all [with data + expired data]', async () => {
    const oldValue = randomBytes(8);
    const value1 = randomBytes(8);
    const value2 = randomBytes(8);
    const EXPECTED: BytesLike[] = [value1, value2, oldValue];

    let memCache = new MemoryCache(500);
    memCache.set(value1);
    memCache.set(value2);

    memCache = new MemoryCache(1);
    memCache.set(oldValue);

    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });

    /*
      MemoryCache uses a global cache with values from
      several instances, all returned by `getActiveData()`.
      However, we only want to check the ones from this
      test, so we use `containSubset`.
    */
    expect(memCache.getAllData()).containSubset(EXPECTED);
  });

  it('should validate that MemoryCache uses a global cache', async () => {
    const oldValue = randomBytes(8);

    const instance1 = new MemoryCache(1000);
    instance1.set(oldValue);

    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });

    const newValue = randomBytes(8);

    const instance2 = new MemoryCache(100);
    instance2.set(newValue);

    const activeData = instance2.getActiveData();

    expect(activeData).toContain(oldValue);
    expect(activeData).toContain(newValue);
  });
});
