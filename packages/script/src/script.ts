import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import type {
  CallResult,
  TransactionResultReceipt,
  TransactionResultReturnReceipt,
  TransactionResultReturnDataReceipt,
  TransactionResultRevertReceipt,
  TransactionResultScriptResultReceipt,
} from '@fuel-ts/providers';
import { ReceiptType } from '@fuel-ts/providers';

import { ScriptResultDecoderError } from './errors';

// TODO: Source these from other packages
const VM_TX_MEMORY = 10240;
const TRANSACTION_SCRIPT_FIXED_SIZE = 112;
const WORD_SIZE = 8;
const CONTRACT_ID_LEN = 32;
const ASSET_ID_LEN = 32;
const AMOUNT_LEN = 8;

export type ScriptResult = {
  code: bigint;
  gasUsed: bigint;
  receipts: TransactionResultReceipt[];
  scriptResultReceipt: TransactionResultScriptResultReceipt;
  returnReceipt:
    | TransactionResultReturnReceipt
    | TransactionResultReturnDataReceipt
    | TransactionResultRevertReceipt;
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
    return VM_TX_MEMORY + TRANSACTION_SCRIPT_FIXED_SIZE + this.bytes.length;
  }

  /**
   * Returns the memory offset for the contract call argument
   * Used for struct inputs
   */
  getArgOffset() {
    const callDataOffset = this.getScriptDataOffset() + ASSET_ID_LEN + AMOUNT_LEN;
    return callDataOffset + CONTRACT_ID_LEN + WORD_SIZE + WORD_SIZE;
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
