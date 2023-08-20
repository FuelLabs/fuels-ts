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
  ReceiptMint,
  ReceiptBurn,
} from '@fuel-ts/transactions';
import { TransactionCoder } from '@fuel-ts/transactions';

import type { GqlGetTransactionWithReceiptsQuery } from '../__generated__/operations';
import type Provider from '../provider';
import { assembleTransactionSummary } from '../transaction-summary/assemble-transaction-summary';
import { processGqlReceipt } from '../transaction-summary/receipt';
import type {
  TransactionSummary,
  FailureStatus,
  GqlTransaction,
} from '../transaction-summary/types';
import { sleep } from '../utils';

/** @hidden */
export type TransactionResultCallReceipt = ReceiptCall;
/** @hidden */
export type TransactionResultReturnReceipt = ReceiptReturn;
/** @hidden */
export type TransactionResultReturnDataReceipt = ReceiptReturnData & { data: string };
/** @hidden */
export type TransactionResultPanicReceipt = ReceiptPanic;
/** @hidden */
export type TransactionResultRevertReceipt = ReceiptRevert;
/** @hidden */
export type TransactionResultLogReceipt = ReceiptLog;
/** @hidden */
export type TransactionResultLogDataReceipt = ReceiptLogData & { data: string };
/** @hidden */
export type TransactionResultTransferReceipt = ReceiptTransfer;
/** @hidden */
export type TransactionResultTransferOutReceipt = ReceiptTransferOut;
/** @hidden */
export type TransactionResultScriptResultReceipt = ReceiptScriptResult;
/** @hidden */
export type TransactionResultMessageOutReceipt = ReceiptMessageOut;
export type TransactionResultMintReceipt = ReceiptMint;
export type TransactionResultBurnReceipt = ReceiptBurn;

/** @hidden */
export type TransactionResultReceipt =
  | ReceiptCall
  | ReceiptReturn
  | (ReceiptReturnData & { data: string })
  | ReceiptPanic
  | ReceiptRevert
  | ReceiptLog
  | (ReceiptLogData & { data: string })
  | ReceiptTransfer
  | ReceiptTransferOut
  | ReceiptScriptResult
  | ReceiptMessageOut
  | TransactionResultMintReceipt
  | TransactionResultBurnReceipt;

const STATUS_POLLING_INTERVAL_MAX_MS = 5000;
const STATUS_POLLING_INTERVAL_MIN_MS = 1000;

/** @hidden */
export type TransactionResult<TTransactionType = void> = TransactionSummary<TTransactionType> & {
  gqlTransaction: GqlTransaction;
};

/**
 * Represents a response for a transaction.
 */
export class TransactionResponse {
  /** Transaction ID */
  id: string;
  /** Current provider */
  provider: Provider;
  /** Gas used on the transaction */
  gasUsed: BN = bn(0);
  /** Number off attempts to get the committed tx */
  attempts: number = 0;

  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(id: string, provider: Provider) {
    this.id = id;
    this.provider = provider;
  }

  /**
   * Fetch the transaction with receipts from the provider.
   *
   * @returns Transaction with receipts query result.
   */
  async fetch(): Promise<GqlGetTransactionWithReceiptsQuery> {
    const transaction = await this.provider.operations.getTransactionWithReceipts({
      transactionId: this.id,
    });

    return transaction;
  }

  /**
   * Decode the raw payload of the transaction.
   *
   * @param transactionWithReceipts - The transaction with receipts object.
   * @returns The decoded transaction.
   */
  decodeTransaction<TTransactionType = void>(
    transactionWithReceipts: NonNullable<GqlGetTransactionWithReceiptsQuery['transaction']>
  ) {
    return new TransactionCoder().decode(
      arrayify(transactionWithReceipts.rawPayload),
      0
    )?.[0] as Transaction<TTransactionType>;
  }

  /**
   * Waits for transaction to complete and returns the result.
   *
   * @returns The completed transaction result
   */
  async waitForResult<TTransactionType = void>(): Promise<TransactionResult<TTransactionType>> {
    const {
      transaction: gqlTransaction,
      chain: {
        consensusParameters: { gasPerByte, gasPriceFactor },
      },
    } = await this.fetch();

    const nullResponse = !gqlTransaction?.status?.type;
    const isStatusSubmitted = gqlTransaction?.status?.type === 'SubmittedStatus';

    if (nullResponse || isStatusSubmitted) {
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

  /**
   * Waits for transaction to complete and returns the result.
   *
   * @returns The completed transaction.
   */
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
