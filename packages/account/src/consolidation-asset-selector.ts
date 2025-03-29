import { bn, type BN } from '@fuel-ts/math';

import type { Coin } from './providers';

function getBaseAssetsByLeastAmount(args: {
  maxFee: BN;
  count: number;
  baseAssetCoins: Coin[];
}): Coin[] {
  const { maxFee, count, baseAssetCoins } = args;

  const sortedCoins = [...baseAssetCoins].sort((a, b) => a.amount.cmp(b.amount));

  let totalAmount = bn(0);
  const selectedCoins = [];

  for (const asset of sortedCoins) {
    selectedCoins.push(asset);
    totalAmount = totalAmount.add(asset.amount);

    if (selectedCoins.length === count) {
      if (totalAmount.gte(maxFee)) {
        break;
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const removedAsset = selectedCoins.shift()!;
      totalAmount = totalAmount.sub(removedAsset.amount);
    }
  }

  return selectedCoins;
}

function getBaseAssetsByMaxAmount(args: { maxInputs: number; maxFee: BN; baseAssetCoins: Coin[] }) {
  const { maxInputs, maxFee, baseAssetCoins } = args;
  let totalAmount = bn(0);

  const sortedCoins = [...baseAssetCoins].sort((a, b) => b.amount.cmp(a.amount));
  const selectedCoins = [];

  for (const asset of sortedCoins) {
    totalAmount = totalAmount.add(asset.amount);
    selectedCoins.push(asset);

    if (totalAmount.gte(maxFee) || selectedCoins.length === maxInputs - 2) {
      break;
    }
  }

  return selectedCoins;
}

export function consolidationAssetSelector(params: {
  maxFee: BN;
  baseAssets: Coin[];
  consolidationCoins: Coin[];
  maxInputs: number;
}): { baseAssets: Coin[]; consolidationCoins: Coin[] } {
  const { maxFee, baseAssets, consolidationCoins, maxInputs } = params;

  const sortedConsolidationCoins = [...consolidationCoins].sort((a, b) => a.amount.cmp(b.amount));

  const optimalBaseAssets = getBaseAssetsByLeastAmount({
    maxFee,
    count: consolidationCoins.length < maxInputs ? maxInputs - consolidationCoins.length : 1,
    baseAssetCoins: baseAssets,
  });

  const totalAmountOptimal = optimalBaseAssets.reduce((acc, asset) => acc.add(asset.amount), bn(0));

  if (totalAmountOptimal.gte(maxFee)) {
    return {
      baseAssets: optimalBaseAssets,
      consolidationCoins: sortedConsolidationCoins.slice(0, maxInputs - optimalBaseAssets.length),
    };
  }

  const maxAmountBaseAssets = getBaseAssetsByMaxAmount({
    maxFee,
    maxInputs,
    baseAssetCoins: baseAssets,
  });

  return {
    baseAssets: maxAmountBaseAssets,
    consolidationCoins: sortedConsolidationCoins.slice(0, maxInputs - maxAmountBaseAssets.length),
  };
}
