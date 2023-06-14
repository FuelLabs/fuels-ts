/* eslint-disable @typescript-eslint/no-explicit-any */
import { arrayify, concat, hexlify } from '@ethersproject/bytes';
import type { ArrayCoder, StructCoder } from '@fuel-ts/abi-coder';
import { AbiCoder, U64Coder, ABI } from '@fuel-ts/abi-coder';
import { bn, toNumber } from '@fuel-ts/math';
import { ReceiptType } from '@fuel-ts/transactions';

import contractCallScriptAbi from './multicall/static-out/multicall-abi.json';
import contractCallScriptBin from './multicall/static-out/multicall-bin';
import { ScriptRequest } from './script-request';
import type { ContractCall } from './types';

const UNFLATTEN_ABI = ABI.unflatten(contractCallScriptAbi);

/**
 * A script that calls contracts
 *
 * Accepts a contract ID and function data
 * Returns function result
 */
export const contractCallScript = new ScriptRequest<ContractCall[], Uint8Array[]>(
  // Script to call the contract
  contractCallScriptBin,
  (contractCalls) => {
    // const { functions } = new Interface();

    // console.log({
    //   input: Object.values(functions)[0].inputs[0],
    // });

    const scriptDataCoder = new AbiCoder().getCoder(
      UNFLATTEN_ABI[0]!.inputs![0]
    ) as StructCoder<any>;
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
        const args = arrayify(call.data);

        let fnArg;
        if (call.isDataPointer) {
          fnArg = { Data: [refArgData.length, args.length] };
          refArgData = concat([refArgData, args]);
        } else {
          fnArg = { Value: new U64Coder().decode(args, 0)[0] };
        }

        const scriptCall = {
          contract_id: { value: call.contractId },
          fn_selector: bn(call.fnSelector),
          fn_arg: fnArg,
          parameters: {
            amount: call.amount ? bn(call.amount) : undefined,
            asset_id: call.assetId ? { value: call.assetId } : undefined,
            gas: call.gas ? bn(call.gas) : undefined,
            is_return_data_on_heap: true,
          },
        };

        scriptCallSlot = scriptCall;
      } else {
        scriptCallSlot = undefined;
      }

      scriptCallSlots.push(scriptCallSlot);
    }

    const scriptData = {
      calls: scriptCallSlots,
    };

    const encodedScriptData = scriptDataCoder.encode(scriptData as any);
    return concat([encodedScriptData, refArgData]);
  },
  (result, calls) => {
    if (toNumber(result.code) !== 0) {
      throw new Error(`Script returned non-zero result: ${result.code}`);
    }

    const contractIds = calls.map((c) => c.contractId.toB256());
    const results: Array<any> = result.receipts
      .map((r) => {
        if (r.type === ReceiptType.ReturnData || r.type === ReceiptType.Return) {
          if (contractIds.includes(r.id)) {
            switch (r.type) {
              case ReceiptType.ReturnData: {
                return r.data;
              }
              case ReceiptType.Return: {
                return hexlify(r.val.toBytes(8));
              }
              default:
                return null;
            }
          }
        }
        return null;
      })
      .filter((v) => !!v);

    /// TODO: if results no match size of calls should throw a error

    // const encodedScriptReturn = arrayify(result.returnReceipt.data);
    // const { functions } = new Interface(contractCallScriptAbi);
    // const scriptDataCoder = new AbiCoder().getCoder(
    //   UNFLATTEN_ABI[0]!.outputs![0]
    // ) as StructCoder<any>;

    // console.log('encodedScriptReturn', encodedScriptReturn);

    // const [scriptReturn, scriptReturnLength] = scriptDataCoder.decode(encodedScriptReturn, 0);
    // const returnData = encodedScriptReturn.slice(scriptReturnLength);

    // console.log('scriptReturnLength', scriptReturnLength);
    // console.log('scriptReturn', scriptReturn);

    // const contractCallResults: any[] = [];
    // (scriptReturn.call_returns as any[]).forEach((callResult, i) => {
    //   if (callResult) {
    //     if (callResult.Data) {
    //       const [offset, length] = callResult.Data;
    //       contractCallResults[i] = returnData.slice(
    //         toNumber(offset),
    //         toNumber(offset) + toNumber(length)
    //       );
    //     } else {
    //       contractCallResults[i] = new U64Coder().encode(callResult.Value);
    //     }
    //   }
    // });

    return results;
  }
);
