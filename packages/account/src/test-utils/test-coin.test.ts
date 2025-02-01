import { describe, expect, test } from 'vitest';
import { Coin } from '@fuel-ts/account';
import { bn } from '@fuel-ts/math';
import { getRandomB256 } from '@fuel-ts/crypto';

import { TestCoin } from './TestCoin';

/**
 * @group node
 */
describe('TestCoin', () => {
  test('create() returns coin with default values', () => {
    const coin = TestCoin.create();

    expect(coin.id).toBeDefined();
    expect(coin.id).toMatch(/^0x[a-f0-9]{64}$/);
    expect(coin.owner).toBeDefined();
    expect(coin.owner).toMatch(/^0x[a-f0-9]{64}$/);
    expect(coin.amount).toBeDefined();
    expect(coin.amount.toString()).toBe('1000000');
    expect(coin.type).toBe(0);
  });

  test('create() accepts custom values', () => {
    const customCoin: Partial<Coin> = {
      id: getRandomB256(),
      owner: getRandomB256(),
      amount: bn(500),
      type: 1,
    };

    const coin = TestCoin.create(customCoin);

    expect(coin.id).toBe(customCoin.id);
    expect(coin.owner).toBe(customCoin.owner);
    expect(coin.amount).toBe(customCoin.amount);
    expect(coin.type).toBe(customCoin.type);
  });

  test('many() creates specified number of coins', () => {
    const count = 3;
    const coins = TestCoin.many({}, count);

    expect(coins).toHaveLength(count);
    expect(coins[0].id).not.toBe(coins[1].id);
    expect(coins[1].id).not.toBe(coins[2].id);
  });

  test('many() applies same base parameters to all coins', () => {
    const baseParams: Partial<Coin> = {
      owner: getRandomB256(),
      amount: bn(1000),
      type: 2,
    };

    const coins = TestCoin.many(baseParams, 2);

    expect(coins[0].owner).toBe(baseParams.owner);
    expect(coins[0].amount).toBe(baseParams.amount);
    expect(coins[0].type).toBe(baseParams.type);
    expect(coins[1].owner).toBe(baseParams.owner);
    expect(coins[1].amount).toBe(baseParams.amount);
    expect(coins[1].type).toBe(baseParams.type);
  });
});
