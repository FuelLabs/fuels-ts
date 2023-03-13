import type { BytesLike } from '@ethersproject/bytes';
import { hexlify } from '@ethersproject/bytes';
import { getEnv } from '@fuel-ts/constants';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';

const { NativeAssetId } = getEnv();

export type CoinQuantityLike =
  | [amount: BigNumberish, assetId?: BytesLike, max?: BigNumberish]
  | { amount: BigNumberish; assetId?: BytesLike; max?: BigNumberish };
export type CoinQuantity = { amount: BN; assetId: string; max?: BN };

export const coinQuantityfy = (coinQuantityLike: CoinQuantityLike): CoinQuantity => {
  let assetId;
  let amount;
  let max;
  if (Array.isArray(coinQuantityLike)) {
    amount = coinQuantityLike[0];
    assetId = coinQuantityLike[1] ?? NativeAssetId;
    max = coinQuantityLike[2] ?? undefined;
  } else {
    amount = coinQuantityLike.amount;
    assetId = coinQuantityLike.assetId ?? NativeAssetId;
    max = coinQuantityLike.max ?? undefined;
  }

  return {
    assetId: hexlify(assetId),
    amount: bn(amount),
    max: max ? bn(max) : undefined,
  };
};
