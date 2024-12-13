/* eslint-disable @typescript-eslint/no-explicit-any */
import { WORD_SIZE, ASSET_ID_LEN, CONTRACT_ID_LEN, encoding } from '@fuel-ts/abi';
import type {
  CallResult,
  TransactionResultCallReceipt,
  TransactionResultReturnDataReceipt,
  TransactionResultReturnReceipt,
} from '@fuel-ts/account';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { bn, toNumber } from '@fuel-ts/math';
import { ReceiptType } from '@fuel-ts/transactions';
import { concat, arrayify } from '@fuel-ts/utils';
import * as asm from '@fuels/vm-asm';

import { InstructionSet } from './instruction-set';
import type { EncodedScriptCall, ScriptResult } from './script-request';
import { decodeCallResult, ScriptRequest, calculateScriptDataBaseOffset } from './script-request';
import type { ContractCall, InvocationScopeLike } from './types';

type CallOpcodeParamsOffset = {
  callDataOffset: number;
  gasForwardedOffset: number;
  amountOffset: number;
  assetIdOffset: number;
};

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
const getSingleCallInstructions = ({
  callDataOffset,
  gasForwardedOffset,
  amountOffset,
  assetIdOffset,
}: CallOpcodeParamsOffset): InstructionSet => {
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

  return inst;
};
// Given a list of contract calls, create the actual opcodes used to call the contract
function getInstructions(offsets: CallOpcodeParamsOffset[]): Uint8Array {
  if (!offsets.length) {
    return new Uint8Array();
  }

  const multiCallInstructions = new InstructionSet();
  for (let i = 0; i < offsets.length; i += 1) {
    multiCallInstructions.extend(getSingleCallInstructions(offsets[i]).entries());
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

const scriptResultDecoder = (contractId: AbstractAddress) => (result: ScriptResult) => {
  if (toNumber(result.code) !== 0) {
    throw new FuelError(ErrorCode.SCRIPT_REVERTED, `Transaction reverted.`);
  }

  const mainCallResult = getMainCallReceipt(
    result.receipts as TransactionResultCallReceipt[],
    contractId.toB256()
  );
  const mainCallInstructionStart = bn(mainCallResult?.is);

  const receipts = result.receipts as ReturnReceipt[];
  return receipts
    .filter(({ type }) => isReturnType(type))
    .flatMap((receipt: ReturnReceipt) => {
      if (!mainCallInstructionStart.eq(bn(receipt.is))) {
        return [];
      }
      if (receipt.type === ReceiptType.Return) {
        return [encoding.v1.u64.encode((receipt as TransactionResultReturnReceipt).val)];
      }
      if (receipt.type === ReceiptType.ReturnData) {
        const encodedScriptReturn = arrayify(receipt.data);

        return [encodedScriptReturn];
      }

      return [new Uint8Array()];
    });
};

export const decodeContractCallScriptResult = (
  callResult: CallResult,
  contractId: AbstractAddress,
  logs: Array<any> = []
): Uint8Array[] => decodeCallResult(callResult, scriptResultDecoder(contractId), logs);

const getCallInstructionsLength = (contractCalls: ContractCall[]): number =>
  contractCalls.reduce(
    (sum, call) => {
      const offset: CallOpcodeParamsOffset = { ...DEFAULT_OPCODE_PARAMS };
      if (call.gas) {
        offset.gasForwardedOffset = 1;
      }

      return sum + getSingleCallInstructions(offset).byteLength();
    },
    asm.Instruction.size() // placeholder for single RET instruction which is added later
  );

export const getContractCallScript = (
  functionScopes: InvocationScopeLike[],
  maxInputs: BN
): ScriptRequest<ContractCall[], Uint8Array[]> =>
  new ScriptRequest<ContractCall[], Uint8Array[]>(
    // Script to call the contract, start with stub size matching length of calls
    getInstructions(new Array(functionScopes.length).fill(DEFAULT_OPCODE_PARAMS)),
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
      let segmentOffset = dataOffset;

      const scriptData: Uint8Array[] = [];
      for (let i = 0; i < TOTAL_CALLS; i += 1) {
        const call = contractCalls[i];

        const amountOffset = segmentOffset;
        const assetIdOffset = amountOffset + WORD_SIZE;
        const callDataOffset = assetIdOffset + ASSET_ID_LEN;
        const encodedSelectorOffset = callDataOffset + CONTRACT_ID_LEN + WORD_SIZE + WORD_SIZE;
        const encodedArgsOffset = encodedSelectorOffset + call.fnSelectorBytes.byteLength;
        const encodedArgs = arrayify(call.data);
        let gasForwardedOffset = 0;

        // 1. Amount
        scriptData.push(encoding.v1.u64.encode(call.amount || 0));
        // 2. Asset ID
        scriptData.push(encoding.v1.b256.encode(call.assetId?.toString() || ZeroBytes32));
        // 3. Contract ID
        scriptData.push(call.contractId.toBytes());
        // 4. Function selector offset
        scriptData.push(encoding.v1.u64.encode(encodedSelectorOffset));
        // 5. Encoded argument offset
        scriptData.push(encoding.v1.u64.encode(encodedArgsOffset));
        // 6. Encoded function selector
        scriptData.push(call.fnSelectorBytes);
        // 7. Encoded arguments
        scriptData.push(encodedArgs);

        // 8. Gas to be forwarded
        if (call.gas) {
          scriptData.push(encoding.v1.u64.encode(call.gas));
          gasForwardedOffset = encodedArgsOffset + encodedArgs.byteLength;
        }

        const callParamOffsets: CallOpcodeParamsOffset = {
          amountOffset,
          assetIdOffset,
          gasForwardedOffset,
          callDataOffset,
        };

        // store param offsets for asm instructions later
        paramOffsets.push(callParamOffsets);
        segmentOffset = dataOffset + concat(scriptData).byteLength;
      }

      // get asm instructions
      const script = getInstructions(paramOffsets);
      const finalScriptData = concat(scriptData);
      return { data: finalScriptData, script };
    },
    () => [new Uint8Array()]
  );
