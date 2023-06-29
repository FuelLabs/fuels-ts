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
