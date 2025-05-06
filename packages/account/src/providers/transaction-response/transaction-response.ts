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
  TransactionType,
  SubmittableTransactions,
} from '@fuel-ts/transactions';
import { TransactionCoder, TxPointerCoder } from '@fuel-ts/transactions';
import { arrayify } from '@fuel-ts/utils';

import Provider from '../provider';
import type { TransactionRequest, JsonAbisFromAllCalls } from '../transaction-request';
import {
  assemblePreConfirmationTransactionSummary,
  assembleTransactionSummary,
} from '../transaction-summary/assemble-transaction-summary';
import { getTotalFeeFromStatus } from '../transaction-summary/status';
import type {
  TransactionSummary,
  GqlTransaction,
  AbiMap,
  PreConfirmationTransactionSummary,
} from '../transaction-summary/types';
import { extractTxError } from '../utils';
import type { ProviderCacheJson } from '../utils/serialization';
import {
  deserializeProcessedTxOutput,
  deserializeReceipt,
  serializeProviderCache,
} from '../utils/serialization';

import { type DecodedLogs, getAllDecodedLogs } from './getAllDecodedLogs';

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
  logs?: DecodedLogs['logs'];
  groupedLogs?: DecodedLogs['groupedLogs'];
};

export type PreConfirmationTransactionResult = PreConfirmationTransactionSummary & {
  logs?: DecodedLogs['logs'];
  groupedLogs?: DecodedLogs['groupedLogs'];
};

type SubmitAndAwaitStatusSubscriptionIterable = Awaited<
  ReturnType<Provider['operations']['submitAndAwaitStatus']>
>;

type StatusChangeSubscription =
  Awaited<ReturnType<Provider['operations']['statusChange']>> extends AsyncIterable<infer R>
    ? R
    : never;

type StatusType = 'confirmation' | 'preConfirmation';

export type TransactionResponseJson = {
  id: string;
  providerUrl: string;
  abis?: JsonAbisFromAllCalls;
  status?: StatusChangeSubscription['statusChange'];
  preConfirmationStatus?: StatusChangeSubscription['statusChange'];
  providerCache: ProviderCacheJson;
  gqlTransaction?: GqlTransaction;
  requestJson?: string;
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
  private gqlTransaction?: GqlTransaction;
  private request?: TransactionRequest;
  private status?: StatusChangeSubscription['statusChange'];
  abis?: JsonAbisFromAllCalls;
  private waitingForStreamData = false;
  private statusResolvers: Map<StatusType, (() => void)[]> = new Map();
  private preConfirmationStatus?: StatusChangeSubscription['statusChange'];

  /**
   * Constructor for `TransactionResponse`.
   *
   * @param tx - The transaction ID or TransactionRequest.
   * @param provider - The provider.
   */
  constructor(
    tx: string | TransactionRequest,
    provider: Provider,
    chainId: number,
    abis?: JsonAbisFromAllCalls,
    private submitTxSubscription?: SubmitAndAwaitStatusSubscriptionIterable
  ) {
    // Transaction Request was not provided
    if (typeof tx === 'string') {
      this.id = tx;
    } else {
      // Transaction Request was provided
      this.id = tx.getTransactionId(chainId);
      this.request = tx;
    }

    this.provider = provider;
    this.abis = abis;
    this.waitForResult = this.waitForResult.bind(this);
    this.waitForPreConfirmation = this.waitForPreConfirmation.bind(this);
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
    const chainId = await provider.getChainId();
    const response = new TransactionResponse(id, provider, chainId, abis);
    await response.fetch();
    return response;
  }

  private applyMalleableSubscriptionFields<TTransactionType = void>(
    transaction: Transaction<TTransactionType>
  ) {
    const status = this.status;
    if (!status) {
      return;
    }

    const tx = transaction as SubmittableTransactions;

    if (status.type === 'SuccessStatus' || status.type === 'FailureStatus') {
      tx.inputs = tx.inputs.map((input, idx) => {
        if ('txPointer' in input) {
          const correspondingInput = status.transaction.inputs?.[idx] as { txPointer: string };
          return {
            ...input,
            txPointer: TxPointerCoder.decodeFromGqlScalar(correspondingInput.txPointer),
          };
        }
        return input;
      });

      tx.outputs = status.transaction.outputs.map(deserializeProcessedTxOutput);

      if (status.transaction.receiptsRoot) {
        (tx as Transaction<TransactionType.Script>).receiptsRoot = status.transaction.receiptsRoot;
      }
    }
  }

  private async getTransaction<TTransactionType = void>(): Promise<{
    tx: Transaction<TTransactionType>;
    bytes: Uint8Array;
  }> {
    if (this.request) {
      const tx = this.request.toTransaction() as Transaction<TTransactionType>;
      this.applyMalleableSubscriptionFields(tx);
      return {
        tx,
        bytes: this.request.toTransactionBytes(),
      };
    }

    const gqlTransaction = this.gqlTransaction ?? (await this.fetch());

    const { rawPayload } = gqlTransaction;
    const bytes = arrayify(rawPayload);
    const [tx] = new TransactionCoder().decode(bytes, 0);

    return {
      tx: tx as Transaction<TTransactionType>,
      bytes,
    };
  }

  /**
   *
   * NOTE: This method is only called within `getTransactionSummary`, which is invoked after `getTransaction`.
   * Since `getTransaction` only resolves once the transaction has been processed,
   * the status at this point is guaranteed to be either `SuccessStatus` or `FailureStatus`.
   */
  private getReceipts(): TransactionResultReceipt[] {
    const status = this.getTransactionStatus();

    switch (status?.type) {
      case 'SuccessStatus':
      case 'FailureStatus':
        return status.receipts.map(deserializeReceipt);
      default:
        return [];
    }
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

    /**
     * NOTE: Validate if there is a case where the transaction cannot be found after being submitted.
     *
     * This will subscribe to status change and it will to resolve as the first stream update is received
     */
    if (!response.transaction) {
      const subscription = await this.provider.operations.statusChange({
        transactionId: this.id,
      });

      for await (const { statusChange } of subscription) {
        if (statusChange) {
          this.status = statusChange;
          break;
        }
      }

      // NOTE: This code seems to be added to fetch the transaction again after the status change
      return this.fetch();
    }

    this.gqlTransaction = response.transaction;

    return response.transaction;
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
    const { tx: transaction, bytes: transactionBytes } =
      await this.getTransaction<TTransactionType>();

    const { gasPerByte, gasPriceFactor, gasCosts, maxGasPerTx } =
      await this.provider.getGasConfig();

    // If we have the total fee, we do not need to refetch the gas price
    const transactionStatus = this.getTransactionStatus();
    const totalFee = getTotalFeeFromStatus(transactionStatus);
    const gasPrice = totalFee ? bn(0) : await this.provider.getLatestGasPrice();

    const maxInputs = (await this.provider.getChain()).consensusParameters.txParameters.maxInputs;
    const baseAssetId = await this.provider.getBaseAssetId();

    const transactionSummary = assembleTransactionSummary<TTransactionType>({
      id: this.id,
      receipts: this.getReceipts(),
      transaction,
      transactionBytes,
      gqlTransactionStatus: transactionStatus,
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

  async getPreConfirmationTransactionSummary(
    contractsAbiMap?: AbiMap
  ): Promise<PreConfirmationTransactionSummary> {
    const baseAssetId = await this.provider.getBaseAssetId();
    const maxInputs = (await this.provider.getChain()).consensusParameters.txParameters.maxInputs;

    const transactionSummary = assemblePreConfirmationTransactionSummary({
      id: this.id,
      gqlTransactionStatus: this.preConfirmationStatus || this.status,
      baseAssetId,
      maxInputs,
      abiMap: contractsAbiMap,
      transactionRequest: this.request,
    });

    return transactionSummary;
  }

  private resolveStatus(type: StatusType) {
    const resolvers = this.statusResolvers.get(type) || [];
    // We can resolve all the promises at once for the same status type
    resolvers.forEach((resolve) => resolve());
    this.statusResolvers.delete(type);
  }

  private async waitForStatus(type: StatusType): Promise<void> {
    return new Promise((resolve, reject) => {
      const resolvers = this.statusResolvers.get(type) || [];
      resolvers.push(() => {
        resolve();
      });
      this.statusResolvers.set(type, resolvers);

      this.waitForStatusChange().catch(reject);
    });
  }

  /**
   * Waits for the status change of the transaction.
   * If the transaction is already in a final state, it will return immediately.
   * If the transaction is not in a final state, it will wait for the status change.
   * If we are already subscribed to the status change, it will return immediately.
   */
  private async waitForStatusChange() {
    const type = this.status?.type;

    // If the transaction is already in a final state, we can return immediately
    if (type && (type === 'FailureStatus' || type === 'SuccessStatus')) {
      // We need to resolve the statuses to avoid waiting for the stream data
      this.resolveStatus('preConfirmation');
      this.resolveStatus('confirmation');
      return;
    }

    if (this.waitingForStreamData) {
      return;
    }

    this.waitingForStreamData = true;

    const subscription =
      this.submitTxSubscription ??
      (await this.provider.operations.statusChange({
        transactionId: this.id,
        includePreConfirmation: true,
      }));

    for await (const sub of subscription) {
      // Handle both types of subscriptions
      const statusChange = 'statusChange' in sub ? sub.statusChange : sub.submitAndAwaitStatus;
      this.status = statusChange;

      // Transaction Squeezed Out
      if (statusChange.type === 'SqueezedOutStatus') {
        throw new FuelError(
          ErrorCode.TRANSACTION_SQUEEZED_OUT,
          `Transaction Squeezed Out with reason: ${statusChange.reason}`
        );
      }

      if (
        statusChange.type === 'PreconfirmationSuccessStatus' ||
        statusChange.type === 'PreconfirmationFailureStatus'
      ) {
        this.preConfirmationStatus = statusChange;
        this.resolveStatus('preConfirmation');
      }

      if (statusChange.type === 'SuccessStatus' || statusChange.type === 'FailureStatus') {
        this.resolveStatus('confirmation');
        /**
         * NOTE: We need to also resolve the preConfirmation status to avoid waiting for the stream data that
         * already happened. If the call to `waitForPreConfirmation` happens after the transaction is already processed,
         * the status will never be one of the preConfirmation statuses.
         */
        this.resolveStatus('preConfirmation');
        this.waitingForStreamData = false;
        break;
      }
    }
  }

  private async waitForConfirmationStatuses() {
    try {
      await this.waitForStatus('confirmation');
    } catch (error) {
      this.unsetResourceCache();
      throw error;
    }
  }

  private async waitForPreConfirmationStatuses() {
    try {
      await this.waitForStatus('preConfirmation');
    } catch (error) {
      this.unsetResourceCache();
      throw error;
    }
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
      ...transactionSummary,
    };

    let { logs, groupedLogs }: DecodedLogs = { logs: [], groupedLogs: {} };

    if (this.abis) {
      ({ logs, groupedLogs } = getAllDecodedLogs({
        receipts: transactionSummary.receipts,
        mainAbi: this.abis.main,
        externalAbis: this.abis.otherContractsAbis,
      }));

      transactionResult.logs = logs;
      transactionResult.groupedLogs = groupedLogs;
    }

    const { receipts } = transactionResult;

    const status = this.getTransactionStatus();

    if (status?.type === 'FailureStatus') {
      const { reason } = status;
      throw extractTxError({
        receipts,
        statusReason: reason,
        logs,
        groupedLogs,
      });
    }

    return transactionResult;
  }

  async assemblePreConfirmationResult(contractsAbiMap?: AbiMap) {
    const transactionSummary = await this.getPreConfirmationTransactionSummary(contractsAbiMap);

    const transactionResult: PreConfirmationTransactionResult = {
      ...transactionSummary,
      logs: [] as DecodedLogs['logs'],
      groupedLogs: {} as DecodedLogs['groupedLogs'],
    };

    let { logs, groupedLogs }: DecodedLogs = { logs: [], groupedLogs: {} };

    if (this.abis && transactionSummary.receipts) {
      ({ logs, groupedLogs } = getAllDecodedLogs({
        receipts: transactionSummary.receipts,
        mainAbi: this.abis.main,
        externalAbis: this.abis.otherContractsAbis,
      }));
      transactionResult.logs = logs;
      transactionResult.groupedLogs = groupedLogs;
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
    await this.waitForConfirmationStatuses();
    this.unsetResourceCache();
    return this.assembleResult<TTransactionType>(contractsAbiMap);
  }

  /**
   * Waits for the transaction's pre-confirmation and returns the result.
   *
   * @param contractsAbiMap - The contracts ABI map.
   * @returns The pre-confirmed transaction result
   */
  async waitForPreConfirmation(
    contractsAbiMap?: AbiMap
  ): Promise<PreConfirmationTransactionResult> {
    await this.waitForPreConfirmationStatuses();
    this.unsetResourceCache();
    return this.assemblePreConfirmationResult(contractsAbiMap);
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

  private getTransactionStatus() {
    return this.status ?? this.gqlTransaction?.status;
  }

  async toJson(): Promise<TransactionResponseJson> {
    return {
      id: this.id,
      status: this.status,
      abis: this.abis,
      requestJson: JSON.stringify(this.request),
      providerUrl: this.provider.url,
      providerCache: await serializeProviderCache(this.provider),
      gqlTransaction: this.gqlTransaction,
      preConfirmationStatus: this.preConfirmationStatus,
    };
  }

  static async fromJson(json: TransactionResponseJson): Promise<TransactionResponse> {
    const {
      id,
      gqlTransaction,
      status,
      preConfirmationStatus,
      abis,
      providerCache,
      providerUrl,
      requestJson,
    } = json;

    const provider = new Provider(providerUrl, { cache: providerCache });
    const chainId = await provider.getChainId();

    const response = new TransactionResponse(id, provider, chainId, abis);

    if (requestJson) {
      response.request = JSON.parse(requestJson);
    }

    response.status = status;
    response.gqlTransaction = gqlTransaction;
    response.preConfirmationStatus = preConfirmationStatus;

    return response;
  }
}
