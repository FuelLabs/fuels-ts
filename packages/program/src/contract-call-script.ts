/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  WORD_SIZE,
  B256Coder,
  ASSET_ID_LEN,
  BigNumberCoder,
  CONTRACT_ID_LEN,
  ENCODING_V1,
} from '@fuel-ts/abi-coder';
import type {
  CallResult,
  TransactionResultCallReceipt,
  TransactionResultReturnDataReceipt,
  TransactionResultReturnReceipt,
} from '@fuel-ts/account';
import { BaseAssetId, ZeroBytes32 } from '@fuel-ts/address/configs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { bn, toNumber } from '@fuel-ts/math';
import { ReceiptType } from '@fuel-ts/transactions';
import { concat, arrayify } from '@fuel-ts/utils';
import * as asm from '@fuels/vm-asm';

import { InstructionSet } from './instruction-set';
import type { EncodedScriptCall, ScriptResult } from './script-request';
import {
  decodeCallResult,
  ScriptRequest,
  POINTER_DATA_OFFSET,
  calculateScriptDataBaseOffset,
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

type ContractCallScriptFn = (
  call: ContractCall,
  segmentOffset: number
) => { scriptData: Uint8Array[]; callParamOffsets: CallOpcodeParamsOffset };

const DEFAULT_OPCODE_PARAMS: CallOpcodeParamsOffset = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0,
};

// During a script execution, this script's contract id is the **null** contract id
const SCRIPT_WRAPPER_CONTRACT_ID = ZeroBytes32;

// Returns the VM instructions for calling a contract method
// We use the [`Opcode`] to call a contract: [`CALL`](Opcode::CALL)
// pointing at the following registers:
//
// 0x10 Script data offset
// 0x11 Coin amount
// 0x12 Asset ID
// 0x13 Gas forwarded
//
// These are arbitrary non-reserved registers, no special meaning
const getSingleCallInstructions = (
  { callDataOffset, gasForwardedOffset, amountOffset, assetIdOffset }: CallOpcodeParamsOffset,
  outputInfo: CallOutputInfo
): InstructionSet => {
  const inst = new InstructionSet(
    asm.movi(0x10, callDataOffset),
    asm.movi(0x11, amountOffset),
    asm.lw(0x11, 0x11, 0),
    asm.movi(0x12, assetIdOffset)
  );

  if (gasForwardedOffset) {
    inst.push(
      asm.movi(0x13, gasForwardedOffset),
      asm.lw(0x13, 0x13, 0),
      asm.call(0x10, 0x11, 0x12, 0x13)
    );
  } else {
    inst.push(asm.call(0x10, 0x11, 0x12, asm.RegId.cgas().to_u8()));
  }

  if (outputInfo.isHeap) {
    inst.extend([
      // The RET register contains the pointer address of the `CALL` return (a stack
      // address).
      // The RETL register contains the length of the `CALL` return (=24 because the Vec/Bytes
      // struct takes 3 WORDs). We don't actually need it unless the Vec/Bytes struct encoding
      // changes in the compiler.
      // Load the word located at the address contained in RET, it's a word that
      // translates to a heap address. 0x15 is a free register.
      asm.lw(0x15, asm.RegId.ret().to_u8(), 0),
      // We know a Vec/Bytes struct has its third WORD contain the length of the underlying
      // vector, so use a 2 offset to store the length in 0x16, which is a free register.
      asm.lw(0x16, asm.RegId.ret().to_u8(), 2),
      // The in-memory size of the type is (in-memory size of the inner type) * length
      asm.muli(0x16, 0x16, outputInfo.encodedLength),
      asm.retd(0x15, 0x16),
    ]);
  }

  return inst;
};
// Given a list of contract calls, create the actual opcodes used to call the contract
function getInstructions(offsets: CallOpcodeParamsOffset[], outputs: CallOutputInfo[]): Uint8Array {
  if (!offsets.length) {
    return new Uint8Array();
  }

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
      throw new FuelError(
        ErrorCode.TRANSACTION_ERROR,
        `Execution of the script associated with contract ${contractId} resulted in a non-zero exit code: ${result.code}.`
      );
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
          return [
            new BigNumberCoder('u64').encode((receipt as TransactionResultReturnReceipt).val),
          ];
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
      });
  };

export const decodeContractCallScriptResult = (
  callResult: CallResult,
  contractId: AbstractAddress,
  isOutputDataHeap: boolean,
  logs: Array<any> = []
): Uint8Array[] =>
  decodeCallResult(callResult, scriptResultDecoder(contractId, isOutputDataHeap), logs);

const getCallInstructionsLength = (contractCalls: ContractCall[]): number =>
  contractCalls.reduce(
    (sum, call) => {
      const offset: CallOpcodeParamsOffset = { ...DEFAULT_OPCODE_PARAMS };
      if (call.gas) {
        offset.gasForwardedOffset = 1;
      }
      const output: CallOutputInfo = {
        isHeap: call.isOutputDataHeap,
        encodedLength: call.outputEncodedLength,
      };
      return sum + getSingleCallInstructions(offset, output).byteLength();
    },
    asm.Instruction.size() // placeholder for single RET instruction which is added later
  );

const getFunctionOutputInfos = (functionScopes: InvocationScopeLike[]): CallOutputInfo[] =>
  functionScopes.map((funcScope) => {
    const { func } = funcScope.getCallConfig();
    return {
      isHeap: func.outputMetadata.isHeapType,
      encodedLength: func.outputMetadata.encodedLength,
    };
  });

/**
 * Obtains script data for a contract call according to the V0 specification.
 *
 * @param call - the contract call to obtain for script data for.
 * @param segmentOffset - the segment to generate pointers and offset data from.
 * @returns the populated script data and call parameter offsets.
 */
export const getScriptDataV0 = (
  call: ContractCall,
  segmentOffset: number
): { scriptData: Uint8Array[]; callParamOffsets: CallOpcodeParamsOffset } => {
  const scriptData: Uint8Array[] = [];
  let gasForwardedSize: number = 0;

  const callParamOffsets: CallOpcodeParamsOffset = {
    amountOffset: segmentOffset,
    assetIdOffset: segmentOffset + WORD_SIZE,
    gasForwardedOffset: call.gas ? segmentOffset + WORD_SIZE + ASSET_ID_LEN : 0,
    callDataOffset: segmentOffset + WORD_SIZE + ASSET_ID_LEN + gasForwardedSize,
  };

  /// script data, consisting of the following items in the given order:
  /// 1. Amount to be forwarded `(1 * `[`WORD_SIZE`]`)`
  scriptData.push(new BigNumberCoder('u64').encode(call.amount || 0));
  /// 2. Asset ID to be forwarded ([`AssetId::LEN`])
  scriptData.push(new B256Coder().encode(call.assetId?.toString() || BaseAssetId));
  /// 3. Contract ID ([`ContractId::LEN`]);
  scriptData.push(call.contractId.toBytes());
  /// 4. Function selector `(1 * `[`WORD_SIZE`]`)`
  scriptData.push(new BigNumberCoder('u64').encode(call.fnSelector));
  /// 5. Gas to be forwarded `(1 * `[`WORD_SIZE`]`)`
  if (call.gas) {
    scriptData.push(new BigNumberCoder('u64').encode(call.gas));

    gasForwardedSize = WORD_SIZE;
  }

  /// 6. Calldata offset (optional) `(1 * `[`WORD_SIZE`]`)`
  // If the method call takes custom inputs or has more than
  // one argument, we need to calculate the `call_data_offset`,
  // which points to where the data for the custom types start in the
  // transaction. If it doesn't take any custom inputs, this isn't necessary.
  if (call.isInputDataPointer) {
    const pointerInputOffset = segmentOffset + POINTER_DATA_OFFSET + gasForwardedSize;
    scriptData.push(new BigNumberCoder('u64').encode(pointerInputOffset));
  }

  /// 7. Encoded arguments (optional) (variable length)
  const args = arrayify(call.data);
  scriptData.push(args);

  return {
    scriptData,
    callParamOffsets,
  };
};

/**
 * Obtains script data for a contract call according to the V1 specification.
 *
 * @param call - the contract call to obtain for script data for.
 * @param segmentOffset - the segment to generate pointers and offset data from.
 * @returns the populated script data and call parameter offsets.
 */
export const getScriptDataV1 = (
  call: ContractCall,
  segmentOffset: number
): { scriptData: Uint8Array[]; callParamOffsets: CallOpcodeParamsOffset } => {
  const scriptData: Uint8Array[] = [];
  const callSegmentOffset = segmentOffset + WORD_SIZE;
  let gasForwardedSize: number = 0;

  // 1. Amount
  scriptData.push(new BigNumberCoder('u64').encode(call.amount || 0));
  // 2. Asset ID
  scriptData.push(new B256Coder().encode(call.assetId?.toString() || BaseAssetId));
  // 3. Gas to be forwarded
  if (call.gas) {
    scriptData.push(new BigNumberCoder('u64').encode(call.gas));
    gasForwardedSize = WORD_SIZE;
  }

  const callParamOffsets: CallOpcodeParamsOffset = {
    amountOffset: callSegmentOffset,
    assetIdOffset: callSegmentOffset + WORD_SIZE,
    gasForwardedOffset: callSegmentOffset + WORD_SIZE + ASSET_ID_LEN,
    callDataOffset: callSegmentOffset + WORD_SIZE + ASSET_ID_LEN + gasForwardedSize,
  };
  const encodedSelectorOffset =
    callParamOffsets.callDataOffset + CONTRACT_ID_LEN + WORD_SIZE + WORD_SIZE;
  const customInputOffset = encodedSelectorOffset + call.fnSelectorBytes.length;
  const bytes = arrayify(call.data);

  // 4. Contract ID
  scriptData.push(call.contractId.toBytes());
  // 5. Function selector offset
  scriptData.push(new BigNumberCoder('u64').encode(encodedSelectorOffset));
  // 6. CallData offset
  scriptData.push(new BigNumberCoder('u64').encode(customInputOffset));
  // 7. Function selector
  scriptData.push(call.fnSelectorBytes);
  // 8. Encoded arguments
  scriptData.push(bytes);

  return {
    scriptData,
    callParamOffsets,
  };
};

/**
 * Retrieves a script data function for a specific encoding version.
 *
 * @param encoding - the encoding version used for the contract call.
 * @returns an appropriate script data function.
 */
export const getScriptDataForEncoding = (encoding?: string): ContractCallScriptFn => {
  if (encoding === ENCODING_V1) {
    return getScriptDataV1;
  }
  return getScriptDataV0;
};

export const getContractCallScript = (
  functionScopes: InvocationScopeLike[],
  maxInputs: BN
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

      // Get total data offset AFTER all scripts
      const callInstructionsLength = getCallInstructionsLength(contractCalls);

      // Pad length
      const paddingLength = (8 - (callInstructionsLength % 8)) % 8;
      const paddedInstructionsLength = callInstructionsLength + paddingLength;

      // Base offset
      const dataOffset =
        calculateScriptDataBaseOffset(maxInputs.toNumber()) + paddedInstructionsLength;

      // The data for each call is ordered into segments
      const paramOffsets: CallOpcodeParamsOffset[] = [];
      // the data about the contract output
      const outputInfos: CallOutputInfo[] = [];
      let segmentOffset = dataOffset;

      const scriptData: Uint8Array[] = [];
      for (let i = 0; i < TOTAL_CALLS; i += 1) {
        const call = contractCalls[i];

        const { scriptData: callScriptData, callParamOffsets } = getScriptDataForEncoding(
          call.encoding
        )(call, segmentOffset);

        // store output and param offsets for asm instructions later
        outputInfos.push({
          isHeap: call.isOutputDataHeap,
          encodedLength: call.outputEncodedLength,
        });
        scriptData.push(concat(callScriptData));
        paramOffsets.push(callParamOffsets);
        segmentOffset = dataOffset + concat(scriptData).byteLength;
      }

      // get asm instructions
      const script = getInstructions(paramOffsets, outputInfos);
      const finalScriptData = concat(scriptData);
      return { data: finalScriptData, script };
    },
    () => [new Uint8Array()]
  );
