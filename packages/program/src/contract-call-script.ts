/* eslint-disable @typescript-eslint/no-explicit-any */
import { arrayify, concat } from '@ethersproject/bytes';
import type { JsonAbiFragmentType } from '@fuel-ts/abi-coder';
import {
  StructCoder,
  B256Coder,
  TRANSACTION_SCRIPT_FIXED_SIZE,
  VM_TX_MEMORY,
  ASSET_ID_LEN,
  WORD_SIZE,
  AbiCoder,
  U64Coder,
} from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/address/configs';
import { Opcode, Program, REG_ONE } from '@fuel-ts/asm';
import { bn, toNumber } from '@fuel-ts/math';
import type { CallResult } from '@fuel-ts/providers';
import { ReceiptType } from '@fuel-ts/transactions';

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
}: CallOpcodeParamsOffset): Program =>
  new Program([
    Opcode.movi(0x10, callDataOffset),
    Opcode.movi(0x11, gasForwardedOffset),
    Opcode.lw(0x11, 0x11, 0),
    Opcode.movi(0x12, amountOffset),
    Opcode.lw(0x12, 0x12, 0),
    Opcode.movi(0x13, assetIdOffset),
    Opcode.call(0x10, 0x12, 0x13, 0x11),
    Opcode.ret(0x01),
  ]);

const SINGLE_CALL_LENGTH = getSingleCallInstructions(DEFAULT_OPCODE_PARAMS).toBytes().byteLength;

const SCRIPT_DATA_BASE_OFFSET =
  VM_TX_MEMORY +
  TRANSACTION_SCRIPT_FIXED_SIZE +
  // placeholder for RET instruction which is added later
  WORD_SIZE;

// Given a list of contract calls, create the actual opcodes used to call the contract
function getInstructions(offsets: CallOpcodeParamsOffset[]): Uint8Array {
  const multiCallInstructions = new Program();
  for (let i = 0; i < offsets.length; i += 1) {
    multiCallInstructions.extend(getSingleCallInstructions(offsets[i]).entries());
  }

  multiCallInstructions.push(Opcode.ret(REG_ONE));
  return multiCallInstructions.toBytes();
}

const scriptResultDecoder = (result: ScriptResult) => {
  if (toNumber(result.code) !== 0) {
    throw new Error(`Script returned non-zero result: ${result.code}`);
  }
  if (result.returnReceipt.type !== ReceiptType.ReturnData) {
    throw new Error(`Expected returnReceipt to be a ReturnDataReceipt`);
  }

  const encodedScriptReturn = arrayify(result.returnReceipt.data);
  const outputs = [{}];
  const scriptDataCoder = new AbiCoder().getCoder(
    outputs[0] as JsonAbiFragmentType
  ) as StructCoder<any>;
  const [scriptReturn, scriptReturnLength] = scriptDataCoder.decode(encodedScriptReturn, 0);
  const returnData = encodedScriptReturn.slice(scriptReturnLength);

  const contractCallResults: any[] = [];
  (scriptReturn.call_returns as any[]).forEach((callResult, i) => {
    if (callResult) {
      if (callResult.Data) {
        const [offset, length] = callResult.Data;
        contractCallResults[i] = returnData.slice(
          toNumber(offset),
          toNumber(offset) + toNumber(length)
        );
      } else {
        contractCallResults[i] = new U64Coder().encode(callResult.Value);
      }
    }
  });

  return contractCallResults;
};

export const decodeContractCallScriptResult = (
  callResult: CallResult,
  logs: Array<any> = []
): Uint8Array[] => decodeCallResult(callResult, scriptResultDecoder, logs);

export const getContractCallScript = (
  totalCalls: number
): ScriptRequest<ContractCall[], Uint8Array[]> =>
  new ScriptRequest<ContractCall[], Uint8Array[]>(
    // Script to call the contract, start with stub size matching length of calls
    getInstructions(new Array(totalCalls).fill(DEFAULT_OPCODE_PARAMS)),
    (contractCalls, updateScript) => {
      const TOTAL_CALLS = contractCalls.length;
      if (TOTAL_CALLS === 0) {
        return new Uint8Array();
      }

      // Calculate instructions length for call instructions
      const callInstructionsLength = SINGLE_CALL_LENGTH * TOTAL_CALLS;
      // pad length
      const paddingLength = (8 - (callInstructionsLength % 8)) % 8;
      const paddedInstructionsLength = callInstructionsLength + paddingLength;
      // get total data offeset AFTER all scripts
      const BASE_DATA_OFFSET = SCRIPT_DATA_BASE_OFFSET + paddedInstructionsLength;

      const paramOffsets: CallOpcodeParamsOffset[] = [];

      // The data for each call is ordered into segments
      let segmentOffset = BASE_DATA_OFFSET;

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
        scriptData.push(new B256Coder().encode(call.assetId?.toString() || NativeAssetId));
        /// 2. Amount to be forwarded `(1 * `[`WORD_SIZE`]`)`
        scriptData.push(new U64Coder().encode(call.amount || 0));
        /// 3. Gas to be forwarded `(1 * `[`WORD_SIZE`]`)`
        scriptData.push(new U64Coder().encode(call.gas || 100));
        /// 4. Contract ID ([`ContractId::LEN`]);
        scriptData.push(
          new StructCoder('contract', { value: new B256Coder() }).encode({
            value: call.contractId.toB256(),
          })
        );
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
        segmentOffset = BASE_DATA_OFFSET + concat(scriptData).byteLength;
      }

      console.log('getInstructions: refArgData', refArgData);
      console.log('getInstructions: scriptData', scriptData);

      console.log('getInstructions: paramOffsets', paramOffsets);
      const script = getInstructions(paramOffsets);

      console.log('getInstructions: script', script);
      updateScript(script);

      const finalScriptData = concat(scriptData);
      const finalRefArgData = concat(refArgData);
      return concat([finalScriptData, finalRefArgData]);
    },
    scriptResultDecoder
  );
