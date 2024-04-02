import type { JsonAbi } from '@fuel-ts/abi-coder';
import type { TransactionType } from '@fuel-ts/transactions';

import type {
  CreateTransactionRequest,
  CreateTransactionRequestLike,
} from './create-transaction-request';
import type {
  ScriptTransactionRequest,
  ScriptTransactionRequestLike,
} from './script-transaction-request';

export type TransactionRequest = ScriptTransactionRequest | CreateTransactionRequest;
export type TransactionRequestLike =
  | ({ type: TransactionType.Script } & ScriptTransactionRequestLike)
  | ({ type: TransactionType.Create } & CreateTransactionRequestLike);

export type JsonAbisFromAllCalls = {
  main: JsonAbi;
  otherContractsAbis: Record<string, JsonAbi>;
};
