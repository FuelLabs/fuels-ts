import type { BlobTransactionRequest } from '@fuel-ts/account';

export type ContractChunk = {
  id: number;
  size: number;
  bytecode: Uint8Array;
  blobId: string;
  transactionRequest: BlobTransactionRequest;
};
