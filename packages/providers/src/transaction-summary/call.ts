import { Interface, type JsonAbi, calculateVmTxMemory } from '@fuel-ts/abi-coder';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { ReceiptCall } from '@fuel-ts/transactions';

type GetFunctionCallProps = {
  abi: JsonAbi;
  receipt: ReceiptCall;
  rawPayload?: string;
  maxInputs: BN;
};

export const getFunctionCall = ({ abi, receipt, rawPayload, maxInputs }: GetFunctionCallProps) => {
  const abiInterface = new Interface(abi);
  const callFunctionSelector = receipt.param1.toHex(8);
  const functionFragment = abiInterface.getFunction(callFunctionSelector);
  const inputs = functionFragment.jsonFn.inputs;

  let encodedArgs;

  // if has more than 1 input or input type is bigger than 8 bytes, then it's a pointer to data
  if (functionFragment.isInputDataPointer) {
    if (rawPayload) {
      // calculate offset to get function params from rawPayload. should also consider vm offset
      const argsOffset = bn(receipt.param2)
        .sub(calculateVmTxMemory({ maxInputs: maxInputs.toNumber() }))
        .toNumber();

      // slice(2) to remove first 0x, then slice again to remove offset and get only args
      encodedArgs = `0x${rawPayload.slice(2).slice(argsOffset * 2)}`;
    }
  } else {
    // for small inputs, param2 is directly the value
    encodedArgs = receipt.param2.toHex();
  }

  let argumentsProvided;
  if (encodedArgs) {
    // use bytes got from rawPayload to decode function params
    const data = functionFragment.decodeArguments(encodedArgs);
    if (data) {
      // put together decoded data with input names from abi
      argumentsProvided = inputs.reduce((prev, input, index) => {
        const value = data[index];
        const name = input.name;

        if (name) {
          return {
            ...prev,
            // reparse to remove bn
            [name]: JSON.parse(JSON.stringify(value)),
          };
        }

        return prev;
      }, {});
    }
  }

  const call = {
    functionSignature: functionFragment.signature,
    functionName: functionFragment.name,
    argumentsProvided,
    ...(receipt.amount?.isZero() ? {} : { amount: receipt.amount, assetId: receipt.assetId }),
  };

  return call;
};
