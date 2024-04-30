import type { BN } from '@fuel-ts/math';

import type { CoinQuantity } from '../coin-quantity';

export const mergeQuantities = (...coinQuantities: CoinQuantity[][]): CoinQuantity[] => {
  const resultMap: { [key: string]: BN } = {};

  function addToMap({ amount, assetId }: CoinQuantity) {
    if (resultMap[assetId]) {
      resultMap[assetId] = resultMap[assetId].add(amount);
    } else {
      resultMap[assetId] = amount;
    }
  }

  coinQuantities.forEach((arr) => arr.forEach(addToMap));

  // Convert the resultMap back to an array
  return Object.entries(resultMap).map(([assetId, amount]) => ({ assetId, amount }));
};
