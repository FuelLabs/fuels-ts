import { bn } from '@fuel-ts/math';

import type { CoinQuantity } from '../coin-quantity';

import { mergeQuantities } from './merge-quantities';

/**
 * @group node
 */
describe('mergeQuantities', () => {
  const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
  const assetIdB = '0x0202020202020202020202020202020202020202020202020202020202020202';

  it('combines non-overlapping coin quantities', () => {
    const arr1: CoinQuantity[] = [{ assetId: assetIdA, amount: bn(10) }];
    const arr2: CoinQuantity[] = [{ assetId: assetIdB, amount: bn(20) }];

    const result = mergeQuantities(arr1, arr2);
    expect(result).toEqual([
      { assetId: assetIdA, amount: bn(10) },
      { assetId: assetIdB, amount: bn(20) },
    ]);
  });

  it('combines overlapping coin quantities', () => {
    const arr1: CoinQuantity[] = [{ assetId: assetIdA, amount: bn(10) }];
    const arr2: CoinQuantity[] = [{ assetId: assetIdA, amount: bn(20) }];

    const result = mergeQuantities(arr1, arr2);
    expect(result).toEqual([{ assetId: assetIdA, amount: bn(10).add(20) }]);
  });

  it('handles one empty array', () => {
    const arr1: CoinQuantity[] = [];
    const arr2: CoinQuantity[] = [{ assetId: assetIdB, amount: bn(20) }];

    const result = mergeQuantities(arr1, arr2);
    expect(result).toEqual([{ assetId: assetIdB, amount: bn(20) }]);
  });

  it('handles two empty arrays', () => {
    const arr1: CoinQuantity[] = [];
    const arr2: CoinQuantity[] = [];

    const result = mergeQuantities(arr1, arr2);
    expect(result).toEqual([]);
  });
});
