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
  OutputCoin,
  OutputContract,
  OutputChange,
  OutputVariable,
  OutputContractCreated,
  Output,
  TransactionType,
} from '@fuel-ts/transactions';
import { OutputType, TransactionCoder, TxPointerCoder } from '@fuel-ts/transactions';
import { arrayify, assertUnreachable } from '@fuel-ts/utils';

import type {
  GqlMalleableTransactionFieldsFragment,
  GqlStatusChangeSubscription,
} from '../__generated__/operations';
import type Provider from '../provider';
import type { JsonAbisFromAllCalls, TransactionRequest } from '../transaction-request';
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
  logs?: Array<unknown>;
};

function mapGqlOutputsToTxOutputs(
  outputs: GqlMalleableTransactionFieldsFragment['outputs']
): Output[] {
  return outputs.map((o) => {
    const obj = 'amount' in o ? { ...o, amount: bn(o.amount) } : o;
    switch (obj.type) {
      case 'CoinOutput':
        return { ...obj, type: OutputType.Coin } satisfies OutputCoin;
      case 'ContractOutput':
        return {
          ...obj,
          type: OutputType.Contract,
          inputIndex: parseInt(obj.inputIndex, 10),
        } satisfies OutputContract;
      case 'ChangeOutput':
        return {
          ...obj,
          type: OutputType.Change,
        } satisfies OutputChange;
      case 'VariableOutput':
        return { ...obj, type: OutputType.Variable } satisfies OutputVariable;
      case 'ContractCreated':
        return {
          ...obj,
          type: OutputType.ContractCreated,
          contractId: obj.contract,
        } satisfies OutputContractCreated;
      default:
        return assertUnreachable(obj);
    }
  });
}

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
  private status?: GqlStatusChangeSubscription['statusChange'];
  abis?: JsonAbisFromAllCalls;

  /**
   * Constructor for `TransactionResponse`.
   *
   * @param tx - The transaction ID or TransactionRequest.
   * @param provider - The provider.
   */
  constructor(tx: string | TransactionRequest, provider: Provider, abis?: JsonAbisFromAllCalls) {
    this.id = typeof tx === 'string' ? tx : tx.getTransactionId(provider.getChainId());

    this.provider = provider;
    this.abis = abis;
    this.request = typeof tx === 'string' ? undefined : tx;
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

  private applyMalleableSubscriptionFields<TTransactionType = void>(
    transaction: Transaction<TTransactionType>
  ) {
    const status = this.status;
    if (!status) {
      return;
    }

    // The SDK currently submits only these
    const tx = transaction as Transaction<
      TransactionType.Script | TransactionType.Create | TransactionType.Blob
    >;

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

      tx.outputs = mapGqlOutputsToTxOutputs(status.transaction.outputs);

      if ('receiptsRoot' in status.transaction) {
        (tx as Transaction<TransactionType.Script>).receiptsRoot = status.transaction
          .receiptsRoot as string;
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
    return {
      tx: this.decodeTransaction(gqlTransaction) as Transaction<TTransactionType>,
      bytes: arrayify(gqlTransaction.rawPayload),
    };
  }

  private getReceipts(): TransactionResultReceipt[] {
    const status = this.status ?? this.gqlTransaction?.status;

    switch (status?.type) {
      case 'SuccessStatus':
      case 'FailureStatus':
        return status.receipts.map(processGqlReceipt);
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

    if (!response.transaction) {
      const subscription = this.provider.operations.statusChange({
        transactionId: this.id,
      });

      for await (const { statusChange } of subscription) {
        if (statusChange) {
          this.status = statusChange;
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
    const { tx: transaction, bytes: transactionBytes } =
      await this.getTransaction<TTransactionType>();

    const { gasPerByte, gasPriceFactor, gasCosts, maxGasPerTx } = this.provider.getGasConfig();
    const gasPrice = await this.provider.getLatestGasPrice();
    const maxInputs = this.provider.getChain().consensusParameters.txParameters.maxInputs;
    const baseAssetId = this.provider.getBaseAssetId();

    const transactionSummary = assembleTransactionSummary<TTransactionType>({
      id: this.id,
      receipts: this.getReceipts(),
      transaction,
      transactionBytes,
      gqlTransactionStatus: this.status ?? this.gqlTransaction?.status,
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
      this.status = statusChange;
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

    let logs: Array<unknown> = [];

    if (this.abis) {
      logs = getDecodedLogs(
        transactionSummary.receipts,
        this.abis.main,
        this.abis.otherContractsAbis
      );

      transactionResult.logs = logs;
    }

    const { receipts } = transactionResult;

    const status = this.status ?? this.gqlTransaction?.status;
    if (status?.type === 'FailureStatus') {
      this.unsetResourceCache();
      const { reason } = status;
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
