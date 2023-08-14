/* eslint-disable @typescript-eslint/no-explicit-any */
import { arrayify, concat } from '@ethersproject/bytes';
import { WORD_SIZE, U64Coder, B256Coder, ASSET_ID_LEN } from '@fuel-ts/abi-coder';
import { BaseAssetId, ZeroBytes32 } from '@fuel-ts/address/configs';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import { bn, toNumber } from '@fuel-ts/math';
import type {
  CallResult,
  TransactionResultCallReceipt,
  TransactionResultReturnDataReceipt,
  TransactionResultReturnReceipt,
} from '@fuel-ts/providers';
import { ReceiptType } from '@fuel-ts/transactions';
import * as asm from '@fuels/vm-asm';

import { InstructionSet } from './instruction-set';
import type { EncodedScriptCall, ScriptResult } from './script-request';
import {
  decodeCallResult,
  ScriptRequest,
  SCRIPT_DATA_BASE_OFFSET,
  POINTER_DATA_OFFSET,
} from './script-request';
import type { ContractCall, InvocationScopeLike } from './types';

type CallOpcodeParamsOffset = {
  callDataOffset: number;
  gasForwardedOffset: number;
  amountOffset: number;
  assetIdOffset: number;
};

type CallOutputInfo = {
  isHeap: boolean;
  encodedLength: number;
};

const DEFAULT_OPCODE_PARAMS: CallOpcodeParamsOffset = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0,
};

const DEFAULT_OUTPUT_INFO: CallOutputInfo = {
  isHeap: false,
  encodedLength: 0,
};

// During a script execution, this script's contract id is the **null** contract id
const SCRIPT_WRAPPER_CONTRACT_ID = ZeroBytes32;

// Returns the VM instructions for calling a contract method
// We use the [`Opcode`] to call a contract: [`CALL`](Opcode::CALL)
// pointing at the following registers:
//
// 0x10 Script data offset
// 0x11 Gas forwarded
// 0x12 Coin amount
// 0x13 Asset ID
//
// These are arbitrary non-reserved registers, no special meaning
const getSingleCallInstructions = (
  { callDataOffset, gasForwardedOffset, amountOffset, assetIdOffset }: CallOpcodeParamsOffset,
  outputInfo: CallOutputInfo
): InstructionSet => {
  const inst = new InstructionSet(
    asm.movi(0x10, callDataOffset),
    asm.movi(0x11, gasForwardedOffset),
    asm.lw(0x11, 0x11, 0),
    asm.movi(0x12, amountOffset),
    asm.lw(0x12, 0x12, 0),
    asm.movi(0x13, assetIdOffset),
    asm.call(0x10, 0x12, 0x13, 0x11)
  );

  if (outputInfo.isHeap) {
    inst.extend([
      // The RET register contains the pointer address of the `CALL` return (a stack
      // address).
      // The RETL register contains the length of the `CALL` return (=24 because the Vec/Bytes
      // struct takes 3 WORDs). We don't actually need it unless the Vec/Bytes struct encoding
      // changes in the compiler.
      // Load the word located at the address contained in RET, it's a word that
      // translates to a heap address. 0x15 is a free register.
      asm.lw(0x15, 0x0d, 0),
      // We know a Vec/Bytes struct has its third WORD contain the length of the underlying
      // vector, so use a 2 offset to store the length in 0x16, which is a free register.
      asm.lw(0x16, 0x0d, 2),
      // The in-memory size of the type is (in-memory size of the inner type) * length
      asm.muli(0x16, 0x16, outputInfo.encodedLength),
      asm.retd(0x15, 0x16),
    ]);
  }

  return inst;
};
// Given a list of contract calls, create the actual opcodes used to call the contract
function getInstructions(offsets: CallOpcodeParamsOffset[], outputs: CallOutputInfo[]): Uint8Array {
  const multiCallInstructions = new InstructionSet();
  for (let i = 0; i < offsets.length; i += 1) {
    multiCallInstructions.extend(getSingleCallInstructions(offsets[i], outputs[i]).entries());
  }

  multiCallInstructions.push(asm.ret(0x01));
  return multiCallInstructions.toBytes();
}

type ReturnReceipt = TransactionResultReturnReceipt | TransactionResultReturnDataReceipt;

const isReturnType = (type: ReturnReceipt['type']) =>
  type === ReceiptType.Return || type === ReceiptType.ReturnData;

const getMainCallReceipt = (
  receipts: TransactionResultCallReceipt[],
  contractId: string
): TransactionResultCallReceipt | undefined =>
  receipts.find(
    ({ type, from, to }) =>
      type === ReceiptType.Call && from === SCRIPT_WRAPPER_CONTRACT_ID && to === contractId
  );

const scriptResultDecoder =
  (contractId: AbstractAddress, isOutputDataHeap: boolean) => (result: ScriptResult) => {
    if (toNumber(result.code) !== 0) {
      throw new Error(`Script returned non-zero result: ${result.code}`);
    }

    const mainCallResult = getMainCallReceipt(
      result.receipts as TransactionResultCallReceipt[],
      contractId.toB256()
    );
    const mainCallInstructionStart = bn(mainCallResult?.is);

    const receipts = result.receipts as ReturnReceipt[];
    return receipts
      .filter(({ type }) => isReturnType(type))
      .flatMap((receipt: ReturnReceipt, index, filtered) => {
        if (!mainCallInstructionStart.eq(bn(receipt.is))) {
          return [];
        }
        if (receipt.type === ReceiptType.Return) {
          return [new U64Coder().encode((receipt as TransactionResultReturnReceipt).val)];
        }
        if (receipt.type === ReceiptType.ReturnData) {
          const encodedScriptReturn = arrayify(receipt.data);
          if (isOutputDataHeap && isReturnType(filtered[index + 1]?.type)) {
            const nextReturnData: TransactionResultReturnDataReceipt = filtered[
              index + 1
            ] as TransactionResultReturnDataReceipt;
            return concat([encodedScriptReturn, arrayify(nextReturnData.data)]);
          }

          return [encodedScriptReturn];
        }

        return [new Uint8Array()];
      })
      .filter((v) => v !== undefined);
  };

export const decodeContractCallScriptResult = (
  callResult: CallResult,
  contractId: AbstractAddress,
  isOutputDataHeap = false,
  logs: Array<any> = []
): Uint8Array[] =>
  decodeCallResult(callResult, scriptResultDecoder(contractId, isOutputDataHeap), logs);

const getCallInstructionsLength = (contractCalls: ContractCall[]): number => {
  const singleStackCallLength = getSingleCallInstructions(
    DEFAULT_OPCODE_PARAMS,
    DEFAULT_OUTPUT_INFO
  ).byteLength();

  let totalHeapCalls = 0;
  const heapCallsInstructionsLength = contractCalls.reduce((sum, call) => {
    if (!call.isOutputDataHeap) {
      return sum;
    }

    totalHeapCalls += 1;
    return (
      sum +
      getSingleCallInstructions(DEFAULT_OPCODE_PARAMS, {
        isHeap: true,
        encodedLength: call.outputEncodedLength,
      }).byteLength()
    );
  }, 0);

  const stackCallsInstructionsLength =
    singleStackCallLength * (contractCalls.length - totalHeapCalls);

  return (
    stackCallsInstructionsLength +
    heapCallsInstructionsLength +
    // placeholder for single RET instruction which is added later
    asm.Instruction.size()
  );
};

const getFunctionOutputInfos = (functionScopes: InvocationScopeLike[]): CallOutputInfo[] =>
  functionScopes.map((funcScope) => {
    const { func } = funcScope.getCallConfig();
    return {
      isHeap: func.isOutputDataHeap(),
      encodedLength: func.getOutputEncodedLength(),
    };
  });

export const getContractCallScript = (
  functionScopes: InvocationScopeLike[]
): ScriptRequest<ContractCall[], Uint8Array[]> =>
  new ScriptRequest<ContractCall[], Uint8Array[]>(
    // Script to call the contract, start with stub size matching length of calls
    getInstructions(
      new Array(functionScopes.length).fill(DEFAULT_OPCODE_PARAMS),
      getFunctionOutputInfos(functionScopes)
    ),
    (contractCalls): EncodedScriptCall => {
      const TOTAL_CALLS = contractCalls.length;
      if (TOTAL_CALLS === 0) {
        return { data: new Uint8Array(), script: new Uint8Array() };
      }

      // Calculate instructions length for call instructions
      const callInstructionsLength = getCallInstructionsLength(contractCalls);

      // pad length
      const paddingLength = (8 - (callInstructionsLength % 8)) % 8;
      const paddedInstructionsLength = callInstructionsLength + paddingLength;

      // get total data offset AFTER all scripts
      const dataOffset = SCRIPT_DATA_BASE_OFFSET + paddedInstructionsLength;

      // The data for each call is ordered into segments
      const paramOffsets: CallOpcodeParamsOffset[] = [];
      let segmentOffset = dataOffset;

      // the data about the contract output
      const outputInfos: CallOutputInfo[] = [];

      const scriptData: Uint8Array[] = [];
      for (let i = 0; i < TOTAL_CALLS; i += 1) {
        const call = contractCalls[i];

        // store output and param offsets for asm instructions later
        outputInfos.push({
          isHeap: call.isOutputDataHeap,
          encodedLength: call.outputEncodedLength,
        });
        paramOffsets.push({
          assetIdOffset: segmentOffset,
          amountOffset: segmentOffset + ASSET_ID_LEN,
          gasForwardedOffset: segmentOffset + ASSET_ID_LEN + WORD_SIZE,
          callDataOffset: segmentOffset + ASSET_ID_LEN + 2 * WORD_SIZE,
        });

        /// script data, consisting of the following items in the given order:
        /// 1. Asset ID to be forwarded ([`AssetId::LEN`])
        scriptData.push(new B256Coder().encode(call.assetId?.toString() || BaseAssetId));
        /// 2. Amount to be forwarded `(1 * `[`WORD_SIZE`]`)`
        scriptData.push(new U64Coder().encode(call.amount || 0));
        /// 3. Gas to be forwarded `(1 * `[`WORD_SIZE`]`)`
        scriptData.push(new U64Coder().encode(call.gas || 20000));
        /// 4. Contract ID ([`ContractId::LEN`]);
        scriptData.push(call.contractId.toBytes());
        /// 5. Function selector `(1 * `[`WORD_SIZE`]`)`
        scriptData.push(new U64Coder().encode(call.fnSelector));

        /// 6. Calldata offset (optional) `(1 * `[`WORD_SIZE`]`)`
        // If the method call takes custom inputs or has more than
        // one argument, we need to calculate the `call_data_offset`,
        // which points to where the data for the custom types start in the
        // transaction. If it doesn't take any custom inputs, this isn't necessary.
        if (call.isInputDataPointer) {
          const pointerInputOffset = segmentOffset + POINTER_DATA_OFFSET;
          scriptData.push(new U64Coder().encode(pointerInputOffset));
        }

        /// 7. Encoded arguments (optional) (variable length)
        const args = arrayify(call.data);
        scriptData.push(args);

        // move offset for next call
        segmentOffset = dataOffset + concat(scriptData).byteLength;
      }

      // get asm instructions
      const script = getInstructions(paramOffsets, outputInfos);
      const finalScriptData = concat(scriptData);
      return { data: finalScriptData, script };
    },
    () => [new Uint8Array()]
  );
