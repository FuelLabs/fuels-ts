/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { TransactionCoder, ReceiptType, ReceiptCoder } from '@fuel-ts/transactions';

import type {
  GqlGetTransactionWithReceiptsQuery,
  GqlReceiptFragmentFragment,
} from '../__generated__/operations';
import type Provider from '../provider';
import { calculateTransactionFee, sleep } from '../utils';

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

export type TransactionResult<TStatus extends 'success' | 'failure', TTransactionType = void> = {
  status: TStatus extends 'success'
    ? { type: 'success'; programState: any }
    : { type: 'failure'; reason: any };
  /** Receipts produced during the execution of the transaction */
  receipts: TransactionResultReceipt[];
  transactionId: string;
  blockId: any;
  time: any;
  gasUsed: BN;
  fee: BN;
  transaction: Transaction<TTransactionType>;
};

const STATUS_POLLING_INTERVAL_MAX_MS = 5000;
const STATUS_POLLING_INTERVAL_MIN_MS = 1000;

const processGqlReceipt = (gqlReceipt: GqlReceiptFragmentFragment): TransactionResultReceipt => {
  const receipt = new ReceiptCoder().decode(arrayify(gqlReceipt.rawPayload), 0)[0];

  switch (receipt.type) {
    case ReceiptType.ReturnData: {
      return {
        ...receipt,
        data: gqlReceipt.data!,
      };
    }
    case ReceiptType.LogData: {
      return {
        ...receipt,
        data: gqlReceipt.data!,
      };
    }
    default:
      return receipt;
  }
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

  async fetch(): Promise<GqlGetTransactionWithReceiptsQuery['transaction']> {
    const { transaction } = await this.provider.operations.getTransactionWithReceipts({
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
  async waitForResult<TTransactionType = void>(): Promise<
    TransactionResult<any, TTransactionType>
  > {
    const transactionWithReceipts = await this.fetch();

    switch (transactionWithReceipts?.status?.type) {
      case undefined:
      case 'SubmittedStatus': {
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
      case 'FailureStatus': {
        const receipts = transactionWithReceipts.receipts!.map(processGqlReceipt);
        const {
          consensusParameters: { gasPriceFactor },
        } = await this.provider.getChain();
        const { gasUsed, fee } = calculateTransactionFee({
          receipts,
          gasPrice: bn(transactionWithReceipts?.gasPrice),
          gasPriceFactor,
        });

        this.gasUsed = gasUsed;
        return {
          status: { type: 'failure', reason: transactionWithReceipts.status.reason },
          receipts,
          transactionId: this.id,
          blockId: transactionWithReceipts.status.block.id,
          time: transactionWithReceipts.status.time,
          gasUsed,
          fee,
          transaction: this.decodeTransaction(transactionWithReceipts),
        };
      }
      case 'SuccessStatus': {
        const receipts = transactionWithReceipts.receipts?.map(processGqlReceipt) || [];
        const {
          consensusParameters: { gasPriceFactor },
        } = await this.provider.getChain();
        const { gasUsed, fee } = calculateTransactionFee({
          receipts,
          gasPrice: bn(transactionWithReceipts?.gasPrice),
          gasPriceFactor,
        });

        return {
          status: { type: 'success', programState: transactionWithReceipts.status.programState },
          receipts,
          transactionId: this.id,
          blockId: transactionWithReceipts.status.block.id,
          time: transactionWithReceipts.status.time,
          gasUsed,
          fee,
          transaction: this.decodeTransaction(transactionWithReceipts),
        };
      }
      default: {
        throw new Error('Invalid Transaction status');
      }
    }
  }

  /** Waits for transaction to succeed and returns the result */
  async wait<TTransactionType = void>(): Promise<TransactionResult<'success', TTransactionType>> {
    const result = await this.waitForResult<TTransactionType>();

    if (result.status.type === 'failure') {
      throw new Error(`Transaction failed: ${result.status.reason}`);
    }

    return result;
  }
}
