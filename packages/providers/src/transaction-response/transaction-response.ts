import { arrayify } from '@ethersproject/bytes';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type {
  ReceiptCall,
  ReceiptLog,
  ReceiptLogData,
  ReceiptPanic,
  ReceiptReturn,
  ReceiptReturnData,
  ReceiptRevert,
  ReceiptTransfer,
  ReceiptTransferOut,
  ReceiptScriptResult,
  ReceiptMessageOut,
  Transaction,
} from '@fuel-ts/transactions';
import { TransactionCoder } from '@fuel-ts/transactions';

import type { GqlGetTransactionWithReceiptsQuery } from '../__generated__/operations';
import type Provider from '../provider';
import { assembleTransactionSummary } from '../transaction-summary/assemble-transaction-summary';
import type {
  TransactionSummary,
  FailureStatus,
  GqlTransaction,
} from '../transaction-summary/types';
import { sleep } from '../utils';

import { processGqlReceipt } from './utils';

export type TransactionResultCallReceipt = ReceiptCall;
export type TransactionResultReturnReceipt = ReceiptReturn;
export type TransactionResultReturnDataReceipt = ReceiptReturnData & { data: string };
export type TransactionResultPanicReceipt = ReceiptPanic;
export type TransactionResultRevertReceipt = ReceiptRevert;
export type TransactionResultLogReceipt = ReceiptLog;
export type TransactionResultLogDataReceipt = ReceiptLogData & { data: string };
export type TransactionResultTransferReceipt = ReceiptTransfer;
export type TransactionResultTransferOutReceipt = ReceiptTransferOut;
export type TransactionResultScriptResultReceipt = ReceiptScriptResult;
export type TransactionResultMessageOutReceipt = ReceiptMessageOut;

export type TransactionResultReceipt =
  | TransactionResultCallReceipt
  | TransactionResultReturnReceipt
  | TransactionResultReturnDataReceipt
  | TransactionResultPanicReceipt
  | TransactionResultRevertReceipt
  | TransactionResultLogReceipt
  | TransactionResultLogDataReceipt
  | TransactionResultTransferReceipt
  | TransactionResultTransferOutReceipt
  | TransactionResultScriptResultReceipt
  | TransactionResultMessageOutReceipt;

const STATUS_POLLING_INTERVAL_MAX_MS = 5000;
const STATUS_POLLING_INTERVAL_MIN_MS = 1000;

export type TransactionResult<TTransactionType = void> = TransactionSummary<TTransactionType> & {
  gqlTransaction: GqlTransaction;
};

export class TransactionResponse {
  /** Transaction ID */
  id: string;
  /** Current provider */
  provider: Provider;
  /** Gas used on the transaction */
  gasUsed: BN = bn(0);
  /** Number off attempts to get the committed tx */
  attempts: number = 0;

  constructor(id: string, provider: Provider) {
    this.id = id;
    this.provider = provider;
  }

  async fetch(): Promise<GqlGetTransactionWithReceiptsQuery> {
    const transaction = await this.provider.operations.getTransactionWithReceipts({
      transactionId: this.id,
    });

    return transaction;
  }

  decodeTransaction<TTransactionType = void>(
    transactionWithReceipts: NonNullable<GqlGetTransactionWithReceiptsQuery['transaction']>
  ) {
    return new TransactionCoder().decode(
      arrayify(transactionWithReceipts.rawPayload),
      0
    )?.[0] as Transaction<TTransactionType>;
  }

  /** Waits for transaction to succeed or fail and returns the result */
  async waitForResult<TTransactionType = void>(): Promise<TransactionResult<TTransactionType>> {
    const {
      transaction: gqlTransaction,
      chain: {
        consensusParameters: { gasPerByte, gasPriceFactor },
      },
    } = await this.fetch();

    const isStatusSubmitted = gqlTransaction?.status?.type === 'SubmittedStatus';

    if (!gqlTransaction?.status?.type || isStatusSubmitted) {
      // This code implements a similar approach from the fuel-core await_transaction_commit
      // https://github.com/FuelLabs/fuel-core/blob/cb37f9ce9a81e033bde0dc43f91494bc3974fb1b/fuel-client/src/client.rs#L356
      // double the interval duration on each attempt until max is reached
      //
      // This can wait forever, it would be great to implement a max timeout here, but it would require
      // improve request handler as response Error not mean that the tx fail.
      this.attempts += 1;
      await sleep(
        Math.min(STATUS_POLLING_INTERVAL_MIN_MS * this.attempts, STATUS_POLLING_INTERVAL_MAX_MS)
      );
      return this.waitForResult();
    }

    const decodedTransaction = this.decodeTransaction<TTransactionType>(
      gqlTransaction
    ) as Transaction<TTransactionType>;

    const receipts = gqlTransaction.receipts?.map(processGqlReceipt) || [];

    const transactionSummary = assembleTransactionSummary<TTransactionType>({
      id: this.id,
      gasPrice: bn(gqlTransaction.gasPrice),
      receipts,
      transaction: decodedTransaction,
      transactionBytes: arrayify(gqlTransaction.rawPayload),
      gqlTransactionStatus: gqlTransaction.status,
      gasPerByte: bn(gasPerByte),
      gasPriceFactor: bn(gasPriceFactor),
    });

    const transactionResult: TransactionResult<TTransactionType> = {
      gqlTransaction,
      ...transactionSummary,
    };

    return transactionResult;
  }

  /** Waits for transaction to succeed and returns the result */
  async wait<TTransactionType = void>(): Promise<TransactionResult<TTransactionType>> {
    const result = await this.waitForResult<TTransactionType>();

    if (result.isStatusFailure) {
      throw new Error(
        `Transaction failed: ${(<FailureStatus>result.gqlTransaction.status).reason}`
      );
    }

    return result;
  }
}
