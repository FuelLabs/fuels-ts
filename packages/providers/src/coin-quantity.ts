import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { hexlify } from '@ethersproject/bytes';
import { NativeAssetId } from '@fuel-ts/constants';

export type CoinQuantityLike =
  | [amount: BigNumberish, assetId?: BytesLike]
  | { amount: BigNumberish; assetId?: BytesLike };
export type CoinQuantity = { amount: BigNumber; assetId: string };

export const coinQuantityfy = (coinQuantityLike: CoinQuantityLike): CoinQuantity => {
  let assetId;
  let amount;
  if (Array.isArray(coinQuantityLike)) {
    amount = coinQuantityLike[0];
    assetId = coinQuantityLike[1] ?? NativeAssetId;
  } else {
    amount = coinQuantityLike.amount;
    assetId = coinQuantityLike.assetId ?? NativeAssetId;
  }

  return {
    assetId: hexlify(assetId),
    amount: BigNumber.from(amount),
  };
};
