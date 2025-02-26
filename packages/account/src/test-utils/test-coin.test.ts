import { describe, expect, test } from 'vitest';
import { type Coin } from '@fuel-ts/account';
import { bn, type BN } from '@fuel-ts/math';
import { getRandomB256 } from '@fuel-ts/address';

import { TestCoin } from './TestCoin';

/**
 * @group node
 */
describe('TestCoin', () => {
  test('constructor creates coin with default values', () => {
    const testCoin = new TestCoin();
    const coin = testCoin.toCoin();

    expect(coin.id).toBeDefined();
    expect(coin.id).toMatch(/^0x[a-f0-9]{64}$/);
    expect(coin.owner).toBeDefined();
    expect(coin.owner).toMatch(/^0x[a-f0-9]{64}$/);
    expect(coin.amount).toBeDefined();
    expect(coin.amount.toString()).toBe('1000000');
    expect(coin.type).toBe(0);
  });

  test('constructor accepts custom values', () => {
    const customParams = {
      id: getRandomB256(),
      owner: getRandomB256(),
      amount: bn(500),
      type: 1,
    };

    const testCoin = new TestCoin(customParams);
    const coin = testCoin.toCoin();

    expect(coin.id).toBe(customParams.id);
    expect(coin.owner).toBe(customParams.owner);
    expect(coin.amount).toBe(customParams.amount);
    expect(coin.type).toBe(customParams.type);
  });

  test('many() creates specified number of coins', () => {
    const count = 3;
    const coins = TestCoin.many({}, count);

    expect(coins).toHaveLength(count);
    expect(coins[0].id).not.toBe(coins[1].id);
    expect(coins[1].id).not.toBe(coins[2].id);
  });

  test('many() applies same base parameters to all coins', () => {
    const baseParams = {
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
