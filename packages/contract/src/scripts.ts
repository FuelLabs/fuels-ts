/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat } from '@ethersproject/bytes';
import type { ArrayCoder, StructCoder } from '@fuel-ts/abi-coder';
import { AbiCoder } from '@fuel-ts/abi-coder';
import U64Coder from '@fuel-ts/abi-coder/src/coders/u64';
import type { BigNumberish } from '@fuel-ts/math';
import { toNumber } from '@fuel-ts/math';
import { Script } from '@fuel-ts/script';
import { ReceiptType } from '@fuel-ts/transactions';

import contractCallScriptAbi from './contracts/multicall/out/debug/multicall-abi.json';
import contractCallScriptBin from './contracts/multicall/out/debug/multicall-bin';

export type ContractCall = {
  contractId: BytesLike;
  data: BytesLike;
  amount?: BigNumberish;
  assetId?: BytesLike;
  gas?: BigNumberish;
};

/**
 * A script that calls contracts
 *
 * Accepts a contract ID and function data
 * Returns function result
 */
export const contractCallScript = new Script<ContractCall[], Uint8Array[]>(
  // Script to call the contract
  contractCallScriptBin,
  (contractCalls) => {
    const inputs = contractCallScriptAbi[0].inputs;
    const scriptDataCoder = new AbiCoder().getCoder(inputs[0]) as StructCoder<any>;
    const callSlotsLength = (scriptDataCoder.coders.calls as ArrayCoder<any>).length;

    if (contractCalls.length > callSlotsLength) {
      throw new Error(`At most ${callSlotsLength} calls are supported`);
    }

    let refArgData = new Uint8Array();

    const scriptCallSlots = [];
    for (let i = 0; i < callSlotsLength; i += 1) {
      const call = contractCalls[i];

      let scriptCallSlot;
      if (call) {
        // Decode data in internal format
        const dataArray = arrayify(call.data);
        const functionSelector = dataArray.slice(0, 8);
        const isReferenceType = dataArray.slice(8, 16).some((b) => b === 0x01);
        const args = dataArray.slice(16);

        let fnArg;
        if (isReferenceType) {
          fnArg = { Data: [refArgData.length, args.length] };
          refArgData = concat([refArgData, args]);
        } else {
          fnArg = { Value: new U64Coder().decode(args, 0)[0] };
        }

        const scriptCall = {
          contract_id: { value: call.contractId },
          fn_selector: new U64Coder().decode(functionSelector, 0)[0],
          fn_arg: fnArg,
          parameters: {
            amount: call.amount ? { Some: BigInt(call.amount) } : { None: [] },
            asset_id: call.assetId ? { Some: { value: call.assetId } } : { None: [] },
            gas: call.gas ? { Some: BigInt(call.gas) } : { None: [] },
          },
        };

        scriptCallSlot = { Some: scriptCall };
      } else {
        scriptCallSlot = { None: [] };
      }

      scriptCallSlots.push(scriptCallSlot);
    }

    const scriptData = {
      calls: scriptCallSlots,
    };

    const encodedScriptData = scriptDataCoder.encode(scriptData as any);
    return concat([encodedScriptData, refArgData]);
  },
  (result) => {
    if (toNumber(result.code) !== 0) {
      throw new Error(`Script returned non-zero result: ${result.code}`);
    }
    if (result.returnReceipt.type !== ReceiptType.ReturnData) {
      throw new Error(`Expected returnReceipt to be a ReturnDataReceipt`);
    }
    const encodedScriptReturn = arrayify(result.returnReceipt.data);
    const outputs = contractCallScriptAbi[0].outputs;
    const scriptDataCoder = new AbiCoder().getCoder(outputs[0]) as StructCoder<any>;
    const [scriptReturn, scriptReturnLength] = scriptDataCoder.decode(encodedScriptReturn, 0);
    const returnData = encodedScriptReturn.slice(scriptReturnLength);

    const contractCallResults: any[] = [];
    (scriptReturn.call_returns as any[]).forEach((callResult, i) => {
      if (callResult.Some) {
        if (callResult.Some.Data) {
          const [offset, length] = callResult.Some.Data;
          contractCallResults[i] = returnData.slice(Number(offset), Number(offset + length));
        } else {
          contractCallResults[i] = new U64Coder().encode(callResult.Some.Value);
        }
      }
    });

    return contractCallResults;
  }
);
