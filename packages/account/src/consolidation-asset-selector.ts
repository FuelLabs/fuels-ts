import { bn, type BN } from '@fuel-ts/math';

import type { Coin } from './providers';

function getBaseAssetsByLeastAmount(args: {
  maxFee: BN;
  count: number;
  baseAssets: Coin[];
}): Coin[] {
  const { maxFee, count, baseAssets } = args;

  const sortedBaseAssets = [...baseAssets].sort((a, b) => a.amount.cmp(b.amount));

  let totalAmount = bn(0);
  const selectedBaseAssets = [];
  for (const asset of sortedBaseAssets) {
    totalAmount = totalAmount.add(asset.amount);
    selectedBaseAssets.push(asset);

    if (selectedBaseAssets.length === count) {
      if (totalAmount.gte(maxFee)) {
        break;
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const removedAsset = selectedBaseAssets.shift()!;
      totalAmount = totalAmount.sub(removedAsset.amount);
    }
  }

  return selectedBaseAssets;
}

function getBaseAssetsByMaxAmount(args: { maxInputs: number; maxFee: BN; baseAssets: Coin[] }) {
  const { maxInputs, maxFee, baseAssets } = args;
  let totalAmount = bn(0);

  const sortedBaseAssets = [...baseAssets].sort((a, b) => b.amount.cmp(a.amount));
  const selectedBaseAssets = [];

  for (const asset of sortedBaseAssets) {
    if (totalAmount.gte(maxFee)) {
      break;
    }

    totalAmount = totalAmount.add(asset.amount);
    selectedBaseAssets.push(asset);

    if (selectedBaseAssets.length === maxInputs - 2) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const removedAsset = selectedBaseAssets.shift()!;
      totalAmount = totalAmount.sub(removedAsset.amount);
    }
  }

  return selectedBaseAssets;
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
    baseAssets,
  });

  if (optimalBaseAssets.length > 0) {
    return {
      baseAssets: optimalBaseAssets,
      consolidationCoins: sortedConsolidationCoins.slice(0, maxInputs - optimalBaseAssets.length),
    };
  }

  const maxAmountBaseAssets = getBaseAssetsByMaxAmount({
    maxFee,
    maxInputs,
    baseAssets,
  });

  return {
    baseAssets: maxAmountBaseAssets,
    consolidationCoins: sortedConsolidationCoins.slice(0, maxInputs - maxAmountBaseAssets.length),
  };
}
