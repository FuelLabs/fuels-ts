import type { BN } from '@fuel-ts/math';

import type { CoinQuantity } from '../coin-quantity';

export const mergeQuantities = (arr1: CoinQuantity[], arr2: CoinQuantity[]): CoinQuantity[] => {
  const resultMap: { [key: string]: BN } = {};

  function addToMap({ amount, assetId }: CoinQuantity) {
    if (resultMap[assetId]) {
      resultMap[assetId] = resultMap[assetId].add(amount);
    } else {
      resultMap[assetId] = amount;
    }
  }

  // Process both arrays
  arr1.forEach(addToMap);
  arr2.forEach(addToMap);

  // Convert the resultMap back to an array
  return Object.entries(resultMap).map(([assetId, amount]) => ({ assetId, amount }));
};
