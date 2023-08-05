/* eslint-disable @typescript-eslint/no-explicit-any */
import { arrayify, concat } from '@ethersproject/bytes';
import {
  VM_TX_MEMORY,
  TRANSACTION_SCRIPT_FIXED_SIZE,
  WORD_SIZE,
  U64Coder,
  Interface,
  B256Coder,
  ASSET_ID_LEN,
} from '@fuel-ts/abi-coder';
import { BaseAssetId } from '@fuel-ts/address/configs';
import type { BN } from '@fuel-ts/math';
import { toNumber } from '@fuel-ts/math';
import type { CallResult, TransactionResultReturnDataReceipt } from '@fuel-ts/providers';
import { ReceiptType } from '@fuel-ts/transactions';
import * as asm from '@fuels/vm-asm';

import { InstructionSet } from './instruction-set';
import type { ScriptResult } from './script-request';
import { decodeCallResult, ScriptRequest } from './script-request';
import type { ContractCall } from './types';

type CallOpcodeParamsOffset = {
  callDataOffset: number;
  gasForwardedOffset: number;
  amountOffset: number;
  assetIdOffset: number;
};

const DEFAULT_OPCODE_PARAMS = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0,
};
const SCRIPT_DATA_BASE_OFFSET = VM_TX_MEMORY + TRANSACTION_SCRIPT_FIXED_SIZE;

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
const getSingleCallInstructions = ({
  callDataOffset,
  gasForwardedOffset,
  amountOffset,
  assetIdOffset,
}: CallOpcodeParamsOffset): InstructionSet =>
  new InstructionSet(
    asm.movi(0x10, callDataOffset),
    asm.movi(0x11, gasForwardedOffset),
    asm.lw(0x11, 0x11, 0),
    asm.movi(0x12, amountOffset),
    asm.lw(0x12, 0x12, 0),
    asm.movi(0x13, assetIdOffset),
    asm.call(0x10, 0x12, 0x13, 0x11)
  );

// Given a list of contract calls, create the actual opcodes used to call the contract
function getInstructions(offsets: CallOpcodeParamsOffset[]): Uint8Array {
  const multiCallInstructions = new InstructionSet();
  for (let i = 0; i < offsets.length; i += 1) {
    multiCallInstructions.extend(getSingleCallInstructions(offsets[i]).entries());
  }

  multiCallInstructions.push(asm.ret(0x01));
  return multiCallInstructions.toBytes();
}

type ScriptReturn = {
  call_returns: Array<{
    Value: BN;
    Data: [BN, BN];
  }>;
};

const scriptResultDecoder = (result: ScriptResult) => {
  if (toNumber(result.code) !== 0) {
    throw new Error(`Script returned non-zero result: ${result.code}`);
  }
  if (result.returnReceipt.type !== ReceiptType.ReturnData) {
    throw new Error(`Script did not return data: ${ReceiptType[result.returnReceipt.type]}`);
  }

  const encodedScriptReturn = arrayify(result.returnReceipt.data);
  const contractCallAbiInterface = new Interface([{}]);
  const [scriptReturn] = contractCallAbiInterface.functions.main.decodeOutput(encodedScriptReturn);
  const ret = scriptReturn as unknown as ScriptReturn;

  const results: any[] = ret.call_returns
    .filter((c) => !!c)
    .map((callResult) => {
      if (callResult.Data) {
        const [ptr, length] = callResult.Data;
        const receipt = result.receipts.find(
          (r) => r.type === ReceiptType.ReturnData && r.ptr.eq(ptr) && r.len.eq(length)
        );
        return (receipt as TransactionResultReturnDataReceipt).data;
      }
      return new U64Coder().encode(callResult.Value);
    });

  return results;
};

export const decodeContractCallScriptResult = (
  callResult: CallResult,
  logs: Array<any> = []
): Uint8Array[] => decodeCallResult(callResult, scriptResultDecoder, logs);

export const getContractCallScript = (
  TOTAL_CALLS: number
): ScriptRequest<ContractCall[], Uint8Array[]> =>
  new ScriptRequest<ContractCall[], Uint8Array[]>(
    // Script to call the contract, start with stub size matching length of calls
    getInstructions(new Array(TOTAL_CALLS).fill(DEFAULT_OPCODE_PARAMS)),
    (contractCalls, updateScript) => {
      if (TOTAL_CALLS === 0) {
        return new Uint8Array();
      }

      // Calculate instructions length for call instructions
      const singleCallLength = getSingleCallInstructions(DEFAULT_OPCODE_PARAMS).byteLength();
      const callInstructionsLength = singleCallLength * TOTAL_CALLS;

      // get total data offset AFTER all scripts
      const baseOffset =
        SCRIPT_DATA_BASE_OFFSET +
        callInstructionsLength +
        // placeholder for RET instruction which is added later
        asm.Instruction.size();

      // pad length
      const paddingLength = (8 - (baseOffset % 8)) % 8;
      const paddedInstructionsLength = baseOffset + paddingLength;

      const paramOffsets: CallOpcodeParamsOffset[] = [];

      // The data for each call is ordered into segments
      let segmentOffset = paddedInstructionsLength;
      const scriptData: Uint8Array[] = [];
      const refArgData: Uint8Array[] = [];
      for (let i = 0; i < TOTAL_CALLS; i += 1) {
        const call = contractCalls[i];
        const callParamOffsets: CallOpcodeParamsOffset = {
          assetIdOffset: segmentOffset,
          amountOffset: segmentOffset + ASSET_ID_LEN,
          gasForwardedOffset: segmentOffset + ASSET_ID_LEN + WORD_SIZE,
          callDataOffset: segmentOffset + ASSET_ID_LEN + 2 * WORD_SIZE,
        };

        paramOffsets.push(callParamOffsets);
        /// script data, consisting of the following items in the given order:
        /// 1. Asset ID to be forwarded ([`AssetId::LEN`])
        scriptData.push(new B256Coder().encode(call.assetId?.toString() || BaseAssetId));
        /// 2. Amount to be forwarded `(1 * `[`WORD_SIZE`]`)`
        scriptData.push(new U64Coder().encode(call.amount || 0));
        /// 3. Gas to be forwarded `(1 * `[`WORD_SIZE`]`)`
        scriptData.push(new U64Coder().encode(call.gas || 100));
        /// 4. Contract ID ([`ContractId::LEN`]);
        scriptData.push(call.contractId.toBytes());

        /// 5. Function selector `(1 * `[`WORD_SIZE`]`)`
        scriptData.push(new U64Coder().encode(call.fnSelector));
        /// 6. Calldata offset (optional) `(1 * `[`WORD_SIZE`]`)`

        // If the method call takes custom inputs or has more than
        // one argument, we need to calculate the `call_data_offset`,
        // which points to where the data for the custom types start in the
        // transaction. If it doesn't take any custom inputs, this isn't necessary.
        //   let encoded_args_start_offset = if call.compute_custom_input_offset {
        //     // Custom inputs are stored after the previously added parameters,
        //     // including custom_input_offset
        //     let custom_input_offset =
        //         segment_offset + AssetId::LEN + 2 * WORD_SIZE + ContractId::LEN + 2 * WORD_SIZE;
        //     script_data.extend((custom_input_offset as Word).to_be_bytes());
        //     custom_input_offset
        // } else {
        //     segment_offset
        // };

        /// 7. Encoded arguments (optional) (variable length)
        const args = arrayify(call.data);
        // let refArgData = new Uint8Array();
        // let fnArg;
        if (call.isDataPointer) {
          refArgData.push(args);
        }

        scriptData.push(args);

        // move offset for next call
        segmentOffset = baseOffset + concat(scriptData).byteLength;
      }

      const script = getInstructions(paramOffsets);
      updateScript(script);

      const finalScriptData = concat(scriptData);
      const finalRefArgData = concat(refArgData);
      return concat([finalScriptData, finalRefArgData]);
    },
    scriptResultDecoder
  );
