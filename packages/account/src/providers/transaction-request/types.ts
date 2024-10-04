import type { JsonAbi } from '@fuel-ts/abi-coder';
import type { TransactionType } from '@fuel-ts/transactions';

import type {
  BlobTransactionRequest,
  BlobTransactionRequestLike,
} from './blob-transaction-request';
import type {
  CreateTransactionRequest,
  CreateTransactionRequestLike,
} from './create-transaction-request';
import type {
  ScriptTransactionRequest,
  ScriptTransactionRequestLike,
} from './script-transaction-request';
import type {
  UpgradeTransactionRequest,
  UpgradeTransactionRequestLike,
} from './upgrade-transaction-request';
import type {
  UploadTransactionRequest,
  UploadTransactionRequestLike,
} from './upload-transaction-request';

export type TransactionRequest =
  | ScriptTransactionRequest
  | CreateTransactionRequest
  | BlobTransactionRequest
  | UpgradeTransactionRequest
  | UploadTransactionRequest;
export type TransactionRequestLike =
  | ({ type: TransactionType.Script } & ScriptTransactionRequestLike)
  | ({ type: TransactionType.Create } & CreateTransactionRequestLike)
  | ({ type: TransactionType.Blob } & BlobTransactionRequestLike)
  | ({ type: TransactionType.Upgrade } & UpgradeTransactionRequestLike)
  | ({ type: TransactionType.Upload } & UploadTransactionRequestLike);

export type JsonAbisFromAllCalls = {
  main: JsonAbi;
  otherContractsAbis: Record<string, JsonAbi>;
};
