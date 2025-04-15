import type { Coin } from '../providers';

import { splitCoinsIntoBatches } from './split-coins-into-batches';

const createMockCoins = (count: number): Coin[] =>
  Array.from({ length: count }, (_, i) => ({ id: `${i}` }) as Coin);

describe('splitCoinsIntoBatches', () => {
  it('should return an empty array if coins list is empty', () => {
    const result = splitCoinsIntoBatches([], 5);
    expect(result).toEqual([]);
  });

  it('should return a single batch if coins.length <= maxBatchLength', () => {
    const coins = createMockCoins(3);
    const result = splitCoinsIntoBatches(coins, 5);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(coins);
  });

  it('should split coins evenly when divisible', () => {
    const coins = createMockCoins(6);
    const result = splitCoinsIntoBatches(coins, 2);
    expect(result.length).toBe(3);
    expect(result[0].length).toBe(2);
    expect(result[1].length).toBe(2);
    expect(result[2].length).toBe(2);
  });

  it('should split coins unevenly when not divisible', () => {
    const coins = createMockCoins(7);
    const result = splitCoinsIntoBatches(coins, 3);
    expect(result.length).toBe(3);
    expect(result[0].length).toBe(3);
    expect(result[1].length).toBe(3);
    expect(result[2].length).toBe(1);
  });

  it('should handle maxBatchLength of 1 (one coin per batch)', () => {
    const coins = createMockCoins(4);
    const result = splitCoinsIntoBatches(coins, 1);
    expect(result.length).toBe(4);
    result.forEach((batch, i) => {
      expect(batch.length).toBe(1);
      expect(batch[0].id).toBe(`${i}`);
    });
  });

  it('should handle maxBatchLength greater than array length', () => {
    const coins = createMockCoins(2);
    const result = splitCoinsIntoBatches(coins, 10);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(coins);
  });
});
