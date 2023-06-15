/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import {
  VM_TX_MEMORY,
  TRANSACTION_SCRIPT_FIXED_SIZE,
  ASSET_ID_LEN,
  WORD_SIZE,
  CONTRACT_ID_LEN,
} from '@fuel-ts/abi-coder';
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
import { ReceiptType, ByteArrayCoder } from '@fuel-ts/transactions';
import { versions } from '@fuel-ts/versions';

import { ScriptResultDecoderError } from './errors';
import type { CallConfig } from './types';

const logger = new Logger(versions.FUELS);

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
    throw new Error(`Expected scriptResultReceipt`);
  }

  if (!returnReceipt) {
    throw new Error(`Expected returnReceipt`);
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

function decodeCallResult<TResult>(
  callResult: CallResult,
  decoder: (scriptResult: ScriptResult) => TResult,
  logs: Array<any> = []
): TResult {
  try {
    const scriptResult = callResultToScriptResult(callResult);
    return decoder(scriptResult);
  } catch (error) {
    throw new ScriptResultDecoderError(
      callResult as TransactionResult<'failure'>,
      (error as Error).message,
      logs
    );
  }
}

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
    return decodeCallResult(callResult, this.scriptResultDecoder, logs);
  }
}
