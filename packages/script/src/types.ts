import type { FunctionFragment } from '@fuel-ts/abi-coder';
import type { BigNumberish } from '@fuel-ts/math';
import type { ScriptRequest } from '@fuel-ts/program';
import type { CoinQuantity, CoinQuantityLike } from '@fuel-ts/providers';

import type { Script } from './script';

export type CallParams = Partial<{
  forward: CoinQuantityLike;
  gasLimit: BigNumberish;
}>;

export type TxParams = Partial<{
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  variableOutputs: number;
}>;

export type CallOptions = Partial<{
  fundTransaction: boolean;
}>;

export type CallConfig<TInput extends Array<any> = Array<any>> = {
  func: FunctionFragment;
  script: Script<TInput, unknown>;
  scriptRequest: ScriptRequest<TInput, unknown>;
  callParameters?: CallParams;
  txParameters?: TxParams;
  forward?: CoinQuantity;
  args: TInput;
};

export type InvocationScopeLike = {
  getCallConfig(): CallConfig<Array<any>>;
};

export type TransactionCostOptions = Partial<{
  fundTransaction: boolean;
  gasPrice: BigNumberish;
  tolerance: number;
}>;
