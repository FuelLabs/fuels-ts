import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { randomBytes } from '@fuel-ts/keystore';
import { bn } from '@fuel-ts/math';
import type { Receipt } from '@fuel-ts/transactions';
import { ReceiptType, TransactionType } from '@fuel-ts/transactions';
import * as GraphQL from 'graphql-request';

import MemoryCache from './memory-cache';

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

    expect(memCache.get('dogs')).toEqual(undefined);
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

    expect(memCache.set('dogs')).toBeGreaterThanOrEqual(expiresAt);
  });

  it('can get [valid key]', () => {
    const KEY = 'birds';
    const memCache = new MemoryCache(100);

    memCache.set(KEY);

    expect(memCache.get(KEY)).toEqual(KEY);
  });

  it('can get [valid key bytes like]', () => {
    const KEY = [0, 0, 0, 0, 0, 0, 0, 2];
    const memCache = new MemoryCache(100);

    memCache.set(KEY);

    expect(memCache.get(KEY)).toEqual(KEY);
  });

  it('can get [valid key, expired content]', async () => {
    const KEY = 'expiring_milk';
    const memCache = new MemoryCache(1);

    memCache.set(KEY);

    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });

    expect(memCache.get(KEY)).toEqual(undefined);
  });

  it('can delete', () => {
    const KEY = 'cats';
    const memCache = new MemoryCache(100);

    memCache.set(KEY);
    memCache.del(KEY);

    expect(memCache.get(KEY)).toEqual(undefined);
  });

  it('can get excluded [with data]', () => {
    const EXPECTED: BytesLike[] = ['dogs', 'birds', [0, 0, 0, 0, 0, 0, 0, 2]];
    const memCache = new MemoryCache(100);

    expect(memCache.getExcluded()).toStrictEqual(EXPECTED);
  });
});
