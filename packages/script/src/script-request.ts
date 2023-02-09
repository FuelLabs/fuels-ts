import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import {
  VM_TX_MEMORY,
  TRANSACTION_SCRIPT_FIXED_SIZE,
  ASSET_ID_LEN,
  WORD_SIZE,
  CONTRACT_ID_LEN,
} from '@fuel-ts/abi-coder';
import type { BN } from '@fuel-ts/math';
import type {
  CallResult,
  TransactionResultReceipt,
  TransactionResultReturnReceipt,
  TransactionResultReturnDataReceipt,
  TransactionResultRevertReceipt,
  TransactionResultScriptResultReceipt,
  TransactionResult,
} from '@fuel-ts/providers';
import { ReceiptType, ByteArrayCoder } from '@fuel-ts/transactions';

import { ScriptResultDecoderError } from './errors';

export type ScriptResult = {
  code: BN;
  gasUsed: BN;
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
export class ScriptRequest<TData = void, TResult = void> {
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
      VM_TX_MEMORY +
      TRANSACTION_SCRIPT_FIXED_SIZE +
      new ByteArrayCoder(this.bytes.length).encodedLength
    );
  }

  /**
   * Returns the memory offset for the contract call argument
   * Used for struct inputs
   */
  getArgOffset() {
    const callDataOffset = this.getScriptDataOffset() + ASSET_ID_LEN + WORD_SIZE;
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
  decodeCallResult(callResult: CallResult, logs: Array<any> = []): TResult {
    try {
      const scriptResult = callResultToScriptResult(callResult);
      return this.scriptResultDecoder(scriptResult);
    } catch (error) {
      throw new ScriptResultDecoderError(
        callResult as TransactionResult<'failure'>,
        (error as Error).message,
        logs
      );
    }
  }
}
