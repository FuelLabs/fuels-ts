import { BaseAssetId } from '@fuel-ts/address/configs';
import { bn } from '@fuel-ts/math';

import type { CoinQuantity } from '../coin-quantity';

import { uniteCoinQuantities } from './unite-coin-quantities';

describe('uniteCoinQuantities', () => {
  const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
  const assetIdB = '0x0202020202020202020202020202020202020202020202020202020202020202';

  it('combines non-overlapping coin quantities', () => {
    const arr1: CoinQuantity[] = [{ assetId: assetIdA, amount: bn(10) }];
    const arr2: CoinQuantity[] = [{ assetId: assetIdB, amount: bn(20) }];

    const result = uniteCoinQuantities(arr1, arr2);
    expect(result).toEqual([
      { assetId: assetIdA, amount: bn(10) },
      { assetId: assetIdB, amount: bn(20) },
      { assetId: BaseAssetId, amount: bn(1) },
    ]);
  });

  it('combines overlapping coin quantities', () => {
    const arr1: CoinQuantity[] = [{ assetId: assetIdA, amount: bn(10) }];
    const arr2: CoinQuantity[] = [{ assetId: assetIdA, amount: bn(20) }];

    const result = uniteCoinQuantities(arr1, arr2);
    expect(result).toEqual([
      { assetId: assetIdA, amount: bn(10).add(20) },
      { assetId: BaseAssetId, amount: bn(1) },
    ]);
  });

  it('handles one empty array', () => {
    const arr1: CoinQuantity[] = [];
    const arr2: CoinQuantity[] = [{ assetId: assetIdB, amount: bn(20) }];

    const result = uniteCoinQuantities(arr1, arr2);
    expect(result).toEqual([
      { assetId: assetIdB, amount: bn(20) },
      { assetId: BaseAssetId, amount: bn(1) },
    ]);
  });

  it('handles two empty arrays', () => {
    const arr1: CoinQuantity[] = [];
    const arr2: CoinQuantity[] = [];

    const result = uniteCoinQuantities(arr1, arr2);
    expect(result).toEqual([{ assetId: BaseAssetId, amount: bn(1) }]);
  });

  it('adds BaseAssetId if not present', () => {
    const arr1: CoinQuantity[] = [{ assetId: assetIdA, amount: bn(10) }];
    const arr2: CoinQuantity[] = [{ assetId: assetIdB, amount: bn(20) }];

    const result = uniteCoinQuantities(arr1, arr2);
    const baseAssetEntry = result.find((coin) => coin.assetId === BaseAssetId);
    expect(baseAssetEntry).toBeDefined();
    expect(baseAssetEntry?.amount.toNumber()).toBe(1);
  });
});
