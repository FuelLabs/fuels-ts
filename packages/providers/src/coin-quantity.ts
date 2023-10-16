import { BaseAssetId } from '@fuel-ts/address/configs';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import { hexlify } from 'ethers';
import type { BytesLike } from 'ethers';

export type CoinQuantityLike =
  | [amount: BigNumberish, assetId?: BytesLike, max?: BigNumberish]
  | { amount: BigNumberish; assetId?: BytesLike; max?: BigNumberish };
export type CoinQuantity = { amount: BN; assetId: string; max?: BN };

/** @hidden */
export const coinQuantityfy = (coinQuantityLike: CoinQuantityLike): CoinQuantity => {
  let assetId;
  let amount;
  let max;
  if (Array.isArray(coinQuantityLike)) {
    amount = coinQuantityLike[0];
    assetId = coinQuantityLike[1] ?? BaseAssetId;
    max = coinQuantityLike[2] ?? undefined;
  } else {
    amount = coinQuantityLike.amount;
    assetId = coinQuantityLike.assetId ?? BaseAssetId;
    max = coinQuantityLike.max ?? undefined;
  }

  return {
    assetId: hexlify(assetId),
    amount: bn(amount),
    max: max ? bn(max) : undefined,
  };
};
