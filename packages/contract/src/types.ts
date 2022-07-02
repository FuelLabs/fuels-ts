import type { BigNumberish } from '@fuel-ts/math';
import type { CoinQuantityLike } from '@fuel-ts/providers';

export type CallParams = Partial<{
  forward: CoinQuantityLike;
  gasLimit: BigNumberish;
}>;

export type TxParams = Partial<{
  bytePrice: BigNumberish;
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  variableOutputs: number;
}>;

export type CallOptions = Partial<{
  fundTransaction: boolean;
}>;
