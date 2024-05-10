import { bn } from '@fuel-ts/math';
import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';

import type { CoinQuantity } from '../coin-quantity';

import { mergeQuantities } from './merge-quantities';

/**
 * @group node
 */
describe('mergeQuantities', () => {
  it('combines non-overlapping coin quantities', () => {
    const arr1: CoinQuantity[] = [{ assetId: ASSET_A, amount: bn(10) }];
    const arr2: CoinQuantity[] = [{ assetId: ASSET_B, amount: bn(20) }];

    const result = mergeQuantities(arr1, arr2);
    expect(result).toEqual([
      { assetId: ASSET_A, amount: bn(10) },
      { assetId: ASSET_B, amount: bn(20) },
    ]);
  });

  it('combines overlapping coin quantities', () => {
    const arr1: CoinQuantity[] = [{ assetId: ASSET_A, amount: bn(10) }];
    const arr2: CoinQuantity[] = [{ assetId: ASSET_A, amount: bn(20) }];

    const result = mergeQuantities(arr1, arr2);
    expect(result).toEqual([{ assetId: ASSET_A, amount: bn(10).add(20) }]);
  });

  it('handles one empty array', () => {
    const arr1: CoinQuantity[] = [];
    const arr2: CoinQuantity[] = [{ assetId: ASSET_B, amount: bn(20) }];

    const result = mergeQuantities(arr1, arr2);
    expect(result).toEqual([{ assetId: ASSET_B, amount: bn(20) }]);
  });

  it('handles two empty arrays', () => {
    const arr1: CoinQuantity[] = [];
    const arr2: CoinQuantity[] = [];

    const result = mergeQuantities(arr1, arr2);
    expect(result).toEqual([]);
  });

  it('handles many arrays', () => {
    const arr1: CoinQuantity[] = [{ assetId: ASSET_A, amount: bn(10) }];
    const arr2: CoinQuantity[] = [{ assetId: ASSET_A, amount: bn(20) }];
    const arr3: CoinQuantity[] = [{ assetId: ASSET_B, amount: bn(30) }];
    const arr4: CoinQuantity[] = [{ assetId: ASSET_B, amount: bn(40) }];

    const result = mergeQuantities(arr1, arr2, arr3, arr4);
    expect(result).toEqual([
      { assetId: ASSET_A, amount: bn(10).add(20) },
      { assetId: ASSET_B, amount: bn(30).add(40) },
    ]);
  });
});
