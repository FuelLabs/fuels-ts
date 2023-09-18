/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import {
  VM_TX_MEMORY,
  SCRIPT_FIXED_SIZE,
  ASSET_ID_LEN,
  WORD_SIZE,
  CONTRACT_ID_LEN,
} from '@fuel-ts/abi-coder';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';
import type {
  TransactionResultReturnDataReceipt,
  TransactionResultRevertReceipt,
  CallResult,
  TransactionResultReceipt,
  TransactionResultReturnReceipt,
  TransactionResultScriptResultReceipt,
  TransactionResult,
} from '@fuel-ts/providers';
import type { ReceiptScriptResult } from '@fuel-ts/transactions';
import { ReceiptType } from '@fuel-ts/transactions';
import { versions } from '@fuel-ts/versions';

import { ScriptResultDecoderError } from './errors';
import type { CallConfig } from './types';

const logger = new Logger(versions.FUELS);

export const SCRIPT_DATA_BASE_OFFSET = VM_TX_MEMORY + SCRIPT_FIXED_SIZE;
export const POINTER_DATA_OFFSET =
  WORD_SIZE + ASSET_ID_LEN + CONTRACT_ID_LEN + WORD_SIZE + WORD_SIZE;
/**
 * Represents a script result, containing information about the script execution.
 */
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

/**
 * Converts a CallResult to a ScriptResult by extracting relevant information.
 *
 * @param callResult - The CallResult from the script call.
 * @returns The converted ScriptResult.
 */
function callResultToScriptResult(callResult: CallResult): ScriptResult {
  const receipts = [...callResult.receipts];

  let scriptResultReceipt: ReceiptScriptResult | undefined;
  let returnReceipt:
    | TransactionResultReturnReceipt
    | TransactionResultReturnDataReceipt
    | TransactionResultRevertReceipt
    | undefined;

  receipts.forEach((receipt) => {
    if (receipt.type === ReceiptType.ScriptResult) {
      scriptResultReceipt = receipt;
    } else if (
      receipt.type === ReceiptType.Return ||
      receipt.type === ReceiptType.ReturnData ||
      receipt.type === ReceiptType.Revert
    ) {
      returnReceipt = receipt;
    }
  });

  if (!scriptResultReceipt) {
    throw new FuelError(
      ErrorCode.TRANSACTION_ERROR,
      `The script call result does not contain a 'scriptResultReceipt'.`
    );
  }

  if (!returnReceipt) {
    throw new FuelError(
      ErrorCode.TRANSACTION_ERROR,
      `The script call result does not contain a 'returnReceipt'.`
    );
  }

  const scriptResult: ScriptResult = {
    code: scriptResultReceipt.result,
    gasUsed: scriptResultReceipt.gasUsed,
    receipts,
    scriptResultReceipt,
    returnReceipt,
    callResult,
  };

  return scriptResult;
}

/**
 * Decodes a CallResult using the provided decoder function.
 *
 * @param callResult - The CallResult to decode.
 * @param decoder - The decoding function to apply on the ScriptResult.
 * @param logs - Optional logs associated with the decoding.
 * @returns The decoded result.
 * @throws Throws an error if decoding fails.
 */
export function decodeCallResult<TResult>(
  callResult: CallResult,
  decoder: (scriptResult: ScriptResult) => TResult,
  logs: Array<any> = []
): TResult {
  try {
    const scriptResult = callResultToScriptResult(callResult);
    return decoder(scriptResult);
  } catch (error) {
    throw new ScriptResultDecoderError(
      callResult as TransactionResult,
      (error as Error).message,
      logs
    );
  }
}

/**
 * Converts a CallResult to an invocation result based on the provided call configuration.
 *
 * @param callResult - The CallResult from the script call.
 * @param call - The call configuration.
 * @param logs - Optional logs associated with the decoding.
 * @returns The decoded invocation result.
 */
export function callResultToInvocationResult<TReturn>(
  callResult: CallResult,
  call: CallConfig,
  logs?: unknown[]
): TReturn {
  return decodeCallResult(
    callResult,
    (scriptResult: ScriptResult) => {
      if (scriptResult.returnReceipt.type === ReceiptType.Revert) {
        logger.throwError('Script Reverted', Logger.errors.CALL_EXCEPTION, logs);
      }

      if (
        scriptResult.returnReceipt.type !== ReceiptType.Return &&
        scriptResult.returnReceipt.type !== ReceiptType.ReturnData
      ) {
        logger.throwError(
          `Script Return Type [${scriptResult.returnReceipt.type}] Invalid`,
          Logger.errors.CALL_EXCEPTION,
          {
            logs,
            receipt: scriptResult.returnReceipt,
          }
        );
      }

      let value;
      if (scriptResult.returnReceipt.type === ReceiptType.Return) {
        value = scriptResult.returnReceipt.val;
      }
      if (scriptResult.returnReceipt.type === ReceiptType.ReturnData) {
        const decoded = call.program.interface.decodeFunctionResult(
          call.func,
          scriptResult.returnReceipt.data
        );
        value = (decoded as [TReturn])[0];
      }

      return value as TReturn;
    },
    logs
  );
}

export type EncodedScriptCall = Uint8Array | { data: Uint8Array; script: Uint8Array };

/**
 * `ScriptRequest` provides functionality to encode and decode script data and results.
 *
 * @template TData - Type of the script data.
 * @template TResult - Type of the script result.
 */
export class ScriptRequest<TData = void, TResult = void> {
  /**
   * The bytes of the script.
   */
  bytes: Uint8Array;

  /**
   * A function to encode the script data.
   */
  scriptDataEncoder: (data: TData) => EncodedScriptCall;

  /**
   * A function to decode the script result.
   */
  scriptResultDecoder: (scriptResult: ScriptResult) => TResult;

  /**
   * Creates an instance of the ScriptRequest class.
   *
   * @param bytes - The bytes of the script.
   * @param scriptDataEncoder - The script data encoder function.
   * @param scriptResultDecoder - The script result decoder function.
   */
  constructor(
    bytes: BytesLike,
    scriptDataEncoder: (data: TData) => EncodedScriptCall,
    scriptResultDecoder: (scriptResult: ScriptResult) => TResult
  ) {
    this.bytes = arrayify(bytes);
    this.scriptDataEncoder = scriptDataEncoder;
    this.scriptResultDecoder = scriptResultDecoder;
  }

  /**
   * Gets the script data offset for the given bytes.
   *
   * @param bytes - The bytes of the script.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(byteLength: number): number {
    return SCRIPT_DATA_BASE_OFFSET + byteLength;
  }

  /**
   * Gets the script data offset.
   *
   * @returns The script data offset.
   */
  getScriptDataOffset() {
    return ScriptRequest.getScriptDataOffsetWithScriptBytes(this.bytes.length);
  }

  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(data: TData): Uint8Array {
    const callScript = this.scriptDataEncoder(data);
    // if Uint8Array
    if (ArrayBuffer.isView(callScript)) {
      return callScript;
    }

    // object
    this.bytes = arrayify(callScript.script);
    return callScript.data;
  }

  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(callResult: CallResult, logs: Array<any> = []): TResult {
    return decodeCallResult(callResult, this.scriptResultDecoder, logs);
  }
}
