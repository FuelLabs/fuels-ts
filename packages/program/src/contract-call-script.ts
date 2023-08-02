/* eslint-disable @typescript-eslint/no-explicit-any */
import { arrayify, concat } from '@ethersproject/bytes';
import type { InputValue } from '@fuel-ts/abi-coder';
import { U64Coder, Interface } from '@fuel-ts/abi-coder';
import type { JsonAbiArgument } from '@fuel-ts/abi-coder/dist/json-abi';
import type { BN } from '@fuel-ts/math';
import { bn, toNumber } from '@fuel-ts/math';
import type { TransactionResultReturnDataReceipt } from '@fuel-ts/providers';
import { ReceiptType } from '@fuel-ts/transactions';

import contractCallScriptAbi from './multicall/static-out/multicall-abi.json';
import contractCallScriptBin from './multicall/static-out/multicall-bin';
import { ScriptRequest } from './script-request';
import type { ContractCall } from './types';

const contractCallAbiInterface = new Interface(contractCallScriptAbi);

function getMaxNumberOfCalls() {
  const input = contractCallAbiInterface.jsonAbi.functions[0].inputs[0];
  const structScriptDataType = contractCallAbiInterface.jsonAbi.types[input.type];
  const callsType =
    contractCallAbiInterface.jsonAbi.types[
      (structScriptDataType.components as readonly JsonAbiArgument[])[0].type
    ];
  const arrayRegEx = /\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/;

  const match = (arrayRegEx.exec(callsType.type) as RegExpExecArray).groups as Record<
    string,
    string
  >;
  return parseInt(match.length, 10);
}

const maxNumberOfCalls = getMaxNumberOfCalls();

type ScriptReturn = {
  call_returns: Array<{
    Value: BN;
    Data: [BN, BN];
  }>;
};

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
    if (contractCalls.length > maxNumberOfCalls) {
      throw new Error(`At most ${maxNumberOfCalls} calls are supported`);
    }

    let refArgData = new Uint8Array();

    const scriptCallSlots = [];
    for (let i = 0; i < maxNumberOfCalls; i += 1) {
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
            asset_id: call.assetId ? call.assetId : undefined,
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
    } as unknown as InputValue;

    const encodedScriptData = contractCallAbiInterface.functions.main.encodeArguments([scriptData]);
    return concat([encodedScriptData, refArgData]);
  },
  (result) => {
    if (toNumber(result.code) !== 0) {
      throw new Error(`Script returned non-zero result: ${result.code}`);
    }
    if (result.returnReceipt.type !== ReceiptType.ReturnData) {
      throw new Error(`Script did not return data: ${ReceiptType[result.returnReceipt.type]}`);
    }

    const encodedScriptReturn = arrayify(result.returnReceipt.data);

    const [scriptReturn] =
      contractCallAbiInterface.functions.main.decodeOutput(encodedScriptReturn);
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
  }
);
