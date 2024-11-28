import { AbiCoder } from '@fuel-ts/abi';
import type { AbiSpecification } from '@fuel-ts/abi';
import type { BN } from '@fuel-ts/math';
import type { ReceiptCall } from '@fuel-ts/transactions';

type GetFunctionCallProps = {
  abi: AbiSpecification;
  receipt: ReceiptCall;
  rawPayload?: string;
  maxInputs: BN;
};

export interface FunctionCall {
  amount?: BN | undefined;
  assetId?: string | undefined;
  functionSignature: string;
  functionName: string;
  argumentsProvided: Record<string, unknown> | undefined;
}

export const getFunctionCall = ({ abi, receipt }: GetFunctionCallProps): FunctionCall => {
  const abiInterface = AbiCoder.fromAbi(abi);
  const callFunctionSelector = receipt.param1.toHex(8);
  const functionFragment = abiInterface.getFunction(callFunctionSelector);
  const inputs = functionFragment.inputs;

  const encodedArgs = receipt.param2.toHex();
  let argumentsProvided;

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

  const call = {
    functionSignature: functionFragment.signature,
    functionName: functionFragment.name,
    argumentsProvided,
    ...(receipt.amount?.isZero() ? {} : { amount: receipt.amount, assetId: receipt.assetId }),
  };

  return call;
};
