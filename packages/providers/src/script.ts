/* eslint-disable max-classes-per-file */
// TODO: Move this file out of this package
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import type {
  ReceiptReturn,
  ReceiptReturnData,
  ReceiptRevert,
  ReceiptScriptResult,
} from '@fuel-ts/transactions';
import { ReceiptType } from '@fuel-ts/transactions';

import type { CallResult } from './provider';
import type { TransactionResultReceipt } from './transaction-response';

// TODO: Source these from other packages
const VM_TX_MEMORY = 10240;
const TRANSACTION_SCRIPT_FIXED_SIZE = 112;
const WORD_SIZE = 8;
const CONTRACT_ID_LEN = 32;
const ASSET_ID_LEN = 32;
const AMOUNT_LEN = 8;

const bigintReplacer = (key: unknown, value: unknown) =>
  typeof value === 'bigint' ? value.toString() : value;

class ScriptResultDecoderError extends Error {
  constructor(result: CallResult, message: string) {
    const revertReceipts = result.receipts.filter(
      (r) => r.type === ReceiptType.Revert
    ) as ReceiptRevert[];
    const revertsText = revertReceipts.length
      ? `Reverts:\n${revertReceipts
          .map(({ type, id, ...r }) => `${id}: ${JSON.stringify(r, bigintReplacer)}`)
          .join('\n')}`
      : null;
    const receiptsText = `Receipts:\n${JSON.stringify(
      result.receipts.map(({ type, ...r }) => ({ type: ReceiptType[type], ...r })),
      bigintReplacer,
      2
    )}`;
    super(`${message}\n\n${revertsText ? `${revertsText}\n\n` : ''}${receiptsText}`);
  }
}

export type ScriptResult = {
  code: bigint;
  gasUsed: bigint;
  receipts: TransactionResultReceipt[];
  scriptResultReceipt: ReceiptScriptResult;
  returnReceipt: ReceiptReturn | ReceiptReturnData | ReceiptRevert;
  callResult: CallResult;
};

function callResultToScriptResult(callResult: CallResult): ScriptResult {
  const receipts = [...callResult.receipts];

  // Every script call ends with two specific receipts
  // Here we check them so `this.scriptResultDecoder` doesn't have to
  const scriptResultReceipt = receipts.pop();
  if (!scriptResultReceipt) {
    throw new Error(`Expected scriptResultReceipt`);
  }
  if (scriptResultReceipt.type !== ReceiptType.ScriptResult) {
    throw new Error(`Invalid scriptResultReceipt type: ${scriptResultReceipt.type}`);
  }
  const returnReceipt = receipts.pop();
  if (!returnReceipt) {
    throw new Error(`Expected returnReceipt`);
  }
  if (
    returnReceipt.type !== ReceiptType.Return &&
    returnReceipt.type !== ReceiptType.ReturnData &&
    returnReceipt.type !== ReceiptType.Revert
  ) {
    throw new Error(`Invalid returnReceipt type: ${returnReceipt.type}`);
  }

  const scriptResult = {
    code: scriptResultReceipt.result,
    gasUsed: scriptResultReceipt.gasUsed,
    receipts,
    scriptResultReceipt,
    returnReceipt,
    callResult,
  };

  return scriptResult;
}
export class Script<TData = void, TResult = void> {
  bytes: Uint8Array;
  scriptDataEncoder: (data: TData) => Uint8Array;
  scriptResultDecoder: (scriptResult: ScriptResult) => TResult;

  constructor(
    bytes: BytesLike,
    scriptDataEncoder: (data: TData) => Uint8Array,
    scriptResultDecoder: (scriptResult: ScriptResult) => TResult
  ) {
    this.bytes = arrayify(bytes);
    this.scriptDataEncoder = scriptDataEncoder;
    this.scriptResultDecoder = scriptResultDecoder;
  }

  getScriptDataOffset() {
    return (
      VM_TX_MEMORY + TRANSACTION_SCRIPT_FIXED_SIZE + ASSET_ID_LEN + AMOUNT_LEN + this.bytes.length
    );
  }

  /**
   * Returns the memory offset for the contract call argument
   * Used for struct inputs
   */
  getArgOffset() {
    return this.getScriptDataOffset() + CONTRACT_ID_LEN + 2 * WORD_SIZE;
  }

  /**
   * Encodes the data for a script call
   */
  encodeScriptData(data: TData): Uint8Array {
    return this.scriptDataEncoder(data);
  }

  /**
   * Decodes the result of a script call
   */
  decodeCallResult(callResult: CallResult): TResult {
    try {
      const scriptResult = callResultToScriptResult(callResult);
      const decoded = this.scriptResultDecoder(scriptResult);
      return decoded;
    } catch (error) {
      throw new ScriptResultDecoderError(callResult, (error as Error).message);
    }
  }
}
