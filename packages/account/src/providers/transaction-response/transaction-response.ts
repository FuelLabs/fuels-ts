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
import { arrayify } from '@fuel-ts/utils';

import type { GqlReceiptFragment } from '../__generated__/operations';
import type Provider from '../provider';
import type { JsonAbisFromAllCalls } from '../transaction-request';
import { assembleTransactionSummary } from '../transaction-summary/assemble-transaction-summary';
import { processGqlReceipt } from '../transaction-summary/receipt';
import type { TransactionSummary, GqlTransaction, AbiMap } from '../transaction-summary/types';
import { extractTxError } from '../utils';

import { getDecodedLogs } from './getDecodedLogs';

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

/** @hidden */
export type TransactionResult<TTransactionType = void> = TransactionSummary<TTransactionType> & {
  gqlTransaction: GqlTransaction;
  logs?: Array<unknown>;
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
  /** The graphql Transaction with receipts object. */
  gqlTransaction?: GqlTransaction;

  abis?: JsonAbisFromAllCalls;

  /**
   * Constructor for `TransactionResponse`.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  constructor(id: string, provider: Provider, abis?: JsonAbisFromAllCalls) {
    this.id = id;
    this.provider = provider;
    this.abis = abis;
  }

  /**
   * Async constructor for `TransactionResponse`. This method can be used to create
   * an instance of `TransactionResponse` and wait for the transaction to be fetched
   * from the chain, ensuring that the `gqlTransaction` property is set.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  static async create(
    id: string,
    provider: Provider,
    abis?: JsonAbisFromAllCalls
  ): Promise<TransactionResponse> {
    const response = new TransactionResponse(id, provider, abis);
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
      const subscription = this.provider.operations.statusChange({
        transactionId: this.id,
      });

      for await (const { statusChange } of subscription) {
        if (statusChange) {
          break;
        }
      }

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

    let txReceipts: GqlReceiptFragment[] = [];

    if (transaction?.status && 'receipts' in transaction.status) {
      txReceipts = transaction.status.receipts;
    }

    const receipts = txReceipts.map(processGqlReceipt) || [];

    const { gasPerByte, gasPriceFactor, gasCosts, maxGasPerTx } = this.provider.getGasConfig();
    const gasPrice = await this.provider.getLatestGasPrice();
    const maxInputs = this.provider.getChain().consensusParameters.txParameters.maxInputs;
    const baseAssetId = this.provider.getBaseAssetId();

    const transactionSummary = assembleTransactionSummary<TTransactionType>({
      id: this.id,
      receipts,
      transaction: decodedTransaction,
      transactionBytes: arrayify(transaction.rawPayload),
      gqlTransactionStatus: transaction.status,
      gasPerByte,
      gasPriceFactor,
      abiMap: contractsAbiMap,
      maxInputs,
      gasCosts,
      maxGasPerTx,
      gasPrice,
      baseAssetId,
    });

    return transactionSummary;
  }

  private async waitForStatusChange() {
    const status = this.gqlTransaction?.status?.type;
    if (status && status !== 'SubmittedStatus') {
      return;
    }

    const subscription = this.provider.operations.statusChange({
      transactionId: this.id,
    });

    for await (const { statusChange } of subscription) {
      if (statusChange.type === 'SqueezedOutStatus') {
        this.unsetResourceCache();
        throw new FuelError(
          ErrorCode.TRANSACTION_SQUEEZED_OUT,
          `Transaction Squeezed Out with reason: ${statusChange.reason}`
        );
      }
      if (statusChange.type !== 'SubmittedStatus') {
        break;
      }
    }

    await this.fetch();
  }

  /**
   * Assembles the result of a transaction by retrieving the transaction summary,
   * decoding logs (if available), and handling transaction failure.
   *
   * This method can be used to obtain the result of a transaction that has just
   * been submitted or one that has already been processed.
   *
   * @template TTransactionType - The type of the transaction.
   * @param contractsAbiMap - The map of contract ABIs.
   * @returns - The assembled transaction result.
   * @throws If the transaction status is a failure.
   */
  async assembleResult<TTransactionType = void>(
    contractsAbiMap?: AbiMap
  ): Promise<TransactionResult<TTransactionType>> {
    const transactionSummary = await this.getTransactionSummary<TTransactionType>(contractsAbiMap);

    const transactionResult: TransactionResult<TTransactionType> = {
      gqlTransaction: this.gqlTransaction as GqlTransaction,
      ...transactionSummary,
    };

    let logs: Array<unknown> = [];

    if (this.abis) {
      logs = getDecodedLogs(
        transactionSummary.receipts,
        this.abis.main,
        this.abis.otherContractsAbis
      );

      transactionResult.logs = logs;
    }

    const { gqlTransaction, receipts } = transactionResult;

    if (gqlTransaction.status?.type === 'FailureStatus') {
      this.unsetResourceCache();
      const { reason } = gqlTransaction.status;
      throw extractTxError({
        receipts,
        statusReason: reason,
        logs,
      });
    }

    return transactionResult;
  }

  /**
   * Waits for transaction to complete and returns the result.
   *
   * @returns The completed transaction result
   */
  async waitForResult<TTransactionType = void>(
    contractsAbiMap?: AbiMap
  ): Promise<TransactionResult<TTransactionType>> {
    await this.waitForStatusChange();
    return this.assembleResult<TTransactionType>(contractsAbiMap);
  }

  /**
   * Waits for transaction to complete and returns the result.
   *
   * @param contractsAbiMap - The contracts ABI map.
   */
  async wait<TTransactionType = void>(
    contractsAbiMap?: AbiMap
  ): Promise<TransactionResult<TTransactionType>> {
    return this.waitForResult<TTransactionType>(contractsAbiMap);
  }

  private unsetResourceCache() {
    this.provider.cache?.unset(this.id);
  }
}
