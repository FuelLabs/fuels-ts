import { arrayify } from '@ethersproject/bytes';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
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

import type Provider from '../provider';
import { assembleTransactionSummary } from '../transaction-summary/assemble-transaction-summary';
import { processGqlReceipt } from '../transaction-summary/receipt';
import type {
  TransactionSummary,
  FailureStatus,
  GqlTransaction,
  AbiMap,
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
  /** Number of attempts made to fetch the transaction */
  fetchAttempts: number = 0;
  /** Number of attempts made to retrieve a processed transaction. */
  resultAttempts: number = 0;
  /** The graphql Transaction with receipts object. */
  gqlTransaction?: GqlTransaction;

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
   * Async constructor for `TransactionResponse`. This method can be used to create
   * an instance of `TransactionResponse` and wait for the transaction to be fetched
   * from the chain, ensuring that the `gqlTransaction` property is set.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  static async create(id: string, provider: Provider): Promise<TransactionResponse> {
    const response = new TransactionResponse(id, provider);
    await response.fetch();
    return response;
  }

  /**
   * Fetch the transaction with receipts from the provider.
   *
   * @returns Transaction with receipts query result.
   */
  async fetch(): Promise<GqlTransaction> {
    const response = await this.provider.operations.getTransactionWithReceipts({
      transactionId: this.id,
    });

    if (!response.transaction) {
      await this.sleepBasedOnAttempts(++this.fetchAttempts);
      return this.fetch();
    }

    this.gqlTransaction = response.transaction;

    return response.transaction;
  }

  /**
   * Decode the raw payload of the transaction.
   *
   * @param transactionWithReceipts - The transaction with receipts object.
   * @returns The decoded transaction.
   */
  decodeTransaction<TTransactionType = void>(transactionWithReceipts: GqlTransaction) {
    return new TransactionCoder().decode(
      arrayify(transactionWithReceipts.rawPayload),
      0
    )?.[0] as Transaction<TTransactionType>;
  }

  /**
   * Retrieves the TransactionSummary. If the `gqlTransaction` is not set, it will
   * fetch it from the provider
   *
   * @param contractsAbiMap - The contracts ABI map.
   * @returns
   */
  async getTransactionSummary<TTransactionType = void>(
    contractsAbiMap?: AbiMap
  ): Promise<TransactionSummary<TTransactionType>> {
    let transaction = this.gqlTransaction;

    if (!transaction) {
      transaction = await this.fetch();
    }

    const decodedTransaction = this.decodeTransaction<TTransactionType>(
      transaction
    ) as Transaction<TTransactionType>;

    const receipts = transaction.receipts?.map(processGqlReceipt) || [];

    const { gasPerByte, gasPriceFactor } = this.provider.getGasConfig();
    const maxInputs = this.provider.getChain().consensusParameters.maxInputs;

    const transactionSummary = assembleTransactionSummary<TTransactionType>({
      id: this.id,
      receipts,
      transaction: decodedTransaction,
      transactionBytes: arrayify(transaction.rawPayload),
      gqlTransactionStatus: transaction.status,
      gasPerByte: bn(gasPerByte),
      gasPriceFactor: bn(gasPriceFactor),
      abiMap: contractsAbiMap,
      maxInputs,
    });

    return transactionSummary;
  }

  /**
   * Waits for transaction to complete and returns the result.
   *
   * @returns The completed transaction result
   */
  async waitForResult<TTransactionType = void>(
    contractsAbiMap?: AbiMap
  ): Promise<TransactionResult<TTransactionType>> {
    await this.fetch();

    if (this.gqlTransaction?.status?.type === 'SubmittedStatus') {
      await this.sleepBasedOnAttempts(++this.resultAttempts);

      return this.waitForResult<TTransactionType>(contractsAbiMap);
    }

    const transactionSummary = await this.getTransactionSummary<TTransactionType>(contractsAbiMap);

    const transactionResult: TransactionResult<TTransactionType> = {
      gqlTransaction: this.gqlTransaction as GqlTransaction,
      ...transactionSummary,
    };

    return transactionResult;
  }

  /**
   * Waits for transaction to complete and returns the result.
   *
   * @param contractsAbiMap - The contracts ABI map.
   */
  async wait<TTransactionType = void>(
    contractsAbiMap?: AbiMap
  ): Promise<TransactionResult<TTransactionType>> {
    const result = await this.waitForResult<TTransactionType>(contractsAbiMap);

    if (result.isStatusFailure) {
      throw new FuelError(
        ErrorCode.TRANSACTION_FAILED,
        `Transaction failed: ${(<FailureStatus>result.gqlTransaction.status).reason}`
      );
    }

    return result;
  }

  /**
   * Introduces a delay based on the number of previous attempts made.
   *
   * @param attempts - The number of attempts.
   */
  private async sleepBasedOnAttempts(attempts: number): Promise<void> {
    // TODO: Consider adding `maxTimeout` or `maxAttempts` parameter.
    // The aim is to avoid perpetual execution; when the limit
    // is reached, we can throw accordingly.
    await sleep(
      Math.min(STATUS_POLLING_INTERVAL_MIN_MS * attempts, STATUS_POLLING_INTERVAL_MAX_MS)
    );
  }
}
