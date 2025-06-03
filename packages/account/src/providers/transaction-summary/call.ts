import { type JsonAbi, StdStringCoder } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import { type BN } from '@fuel-ts/math';
import type { ReceiptCall } from '@fuel-ts/transactions';

type GetFunctionCallProps = {
  abi: JsonAbi;
  receipt: ReceiptCall;
  offset: number;
  scriptData: Uint8Array;
};

export interface FunctionCall {
  amount?: BN | undefined;
  assetId?: string | undefined;
  functionSignature: string;
  functionName: string;
  argumentsProvided: Record<string, unknown> | undefined;
}

/**
 * Builds a FunctionCall object from a call receipt.
 */
export const getFunctionCall = ({
  abi,
  receipt,
  offset,
  scriptData,
}: GetFunctionCallProps): FunctionCall => {
  const [functionSelector, argumentsOffset] = new StdStringCoder().decode(scriptData, offset);

  const abiInterface = new Interface(abi);
  const functionFragment = abiInterface.getFunction(functionSelector);
  const inputs = functionFragment.jsonFn.inputs;

  let argumentsProvided: Record<string, unknown> | undefined;

  // Validate if the function has arguments before attempting to decode them
  if (inputs.length) {
    const functionArgsBytes = scriptData.slice(argumentsOffset);
    const decodedArguments = functionFragment.decodeArguments(functionArgsBytes);

    // Put together decoded data with input names from abi
    argumentsProvided = inputs.reduce((prev, input, index) => {
      const value = decodedArguments?.[index];
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

  return {
    functionSignature: functionFragment.signature,
    functionName: functionFragment.name,
    argumentsProvided,
    ...(receipt.amount?.isZero() ? {} : { amount: receipt.amount, assetId: receipt.assetId }),
  };
};
