/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat } from '@ethersproject/bytes';
import type { ArrayCoder, StructCoder } from '@fuel-ts/abi-coder';
import { ASSET_ID_LEN, WORD_SIZE, AbiCoder, U64Coder } from '@fuel-ts/abi-coder';
import { Opcode, toBytesFromProgram } from '@fuel-ts/asm';
import { bn, toNumber } from '@fuel-ts/math';
import { ReceiptType } from '@fuel-ts/transactions';

import contractCallScriptAbi from './multicall/static-out/multicall-abi.json';
import contractCallScriptBin from './multicall/static-out/multicall-bin';
import { ScriptRequest } from './script-request';
import type { ContractCall } from './types';

type CallOpcodeParamsOffset = {
  callDataOffset: number;
  gasForwardedOffset: number;
  amountOffset: number;
  assetIdOffset: number;
};

const getSingleCallInstructions = ({
  callDataOffset,
  gasForwardedOffset,
  amountOffset,
  assetIdOffset,
}: CallOpcodeParamsOffset): BytesLike => {
  const program = [
    Opcode.movi(0x10, callDataOffset),
    Opcode.movi(0x11, gasForwardedOffset),
    Opcode.lw(0x11, 0x11, 0),
    Opcode.movi(0x12, amountOffset),
    Opcode.lw(0x12, 0x12, 0),
    Opcode.movi(0x13, assetIdOffset),
    Opcode.call(0x10, 0x12, 0x13, 0x11),
    Opcode.ret(0x01),
  ];
  return toBytesFromProgram(program);
};

/**
 * A script that calls contracts
 *
 * Accepts a contract ID and function data
 * Returns function result
 */
export const contractCallScript = new ScriptRequest<ContractCall[], Uint8Array[]>(
  // Script to call the contract
  getSingleCallInstructions({
    assetIdOffset: 0,
    amountOffset: 0 + ASSET_ID_LEN,
    gasForwardedOffset: 0 + ASSET_ID_LEN + WORD_SIZE,
    callDataOffset: ASSET_ID_LEN + 2 * WORD_SIZE,
  }),
  (contractCalls) => {
    const OFFSET = 0;
    // @ts-expect-error nnn
    this.bytes = arrayify(
      getSingleCallInstructions({
        assetIdOffset: OFFSET,
        amountOffset: OFFSET + ASSET_ID_LEN,
        gasForwardedOffset: OFFSET + ASSET_ID_LEN + WORD_SIZE,
        callDataOffset: OFFSET + ASSET_ID_LEN + 2 * WORD_SIZE,
      })
    );

    // todo loop through calls

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
  }
);
