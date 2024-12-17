import type { BigNumberish, BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { BytesLike } from '@fuel-ts/utils';
import { hexlify } from '@fuel-ts/utils';

export type CoinQuantityLike =
  | [amount: BigNumberish, assetId: BytesLike, max?: BigNumberish]
  | { amount: BigNumberish; assetId: BytesLike; max?: BigNumberish };
export type CoinQuantity = { amount: BN; assetId: string; max?: BN };

/** @hidden */
export const coinQuantityfy = (coinQuantityLike: CoinQuantityLike): CoinQuantity => {
  let assetId;
  let amount;
  let max;
  if (Array.isArray(coinQuantityLike)) {
    amount = coinQuantityLike[0];
    assetId = coinQuantityLike[1];
    max = coinQuantityLike[2] ?? undefined;
  } else {
    amount = coinQuantityLike.amount;
    assetId = coinQuantityLike.assetId;
    max = coinQuantityLike.max ?? undefined;
  }

  const bnAmount = bn(amount);
  return {
    assetId: hexlify(assetId),
    amount: bnAmount.lt(1) ? bn(1) : bnAmount,
    max: max ? bn(max) : undefined,
  };
};

export interface IAddAmountToAssetParams {
  assetId: string;
  amount: BN;
  coinQuantities: CoinQuantity[];
}

export const addAmountToCoinQuantities = (params: IAddAmountToAssetParams): CoinQuantity[] => {
  const { amount, assetId } = params;

  const coinQuantities = [...params.coinQuantities];

  const assetIdx = coinQuantities.findIndex((coinQuantity) => coinQuantity.assetId === assetId);

  if (assetIdx !== -1) {
    coinQuantities[assetIdx].amount = coinQuantities[assetIdx].amount.add(amount);
  } else {
    coinQuantities.push({ assetId, amount });
  }

  return coinQuantities;
};
