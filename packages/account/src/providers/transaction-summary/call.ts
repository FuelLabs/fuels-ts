import { BigNumberCoder, type JsonAbi, StdStringCoder } from '@fuel-ts/abi-coder';
import { Interface } from '@fuel-ts/abi-coder';
import { FuelError, ErrorCode } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';
import type { ReceiptCall } from '@fuel-ts/transactions';
import { TransactionCoder } from '@fuel-ts/transactions';
import { arrayify } from '@fuel-ts/utils';

type GetFunctionCallProps = {
  abi: JsonAbi;
  receipt: ReceiptCall;
  rawPayload: string;
  maxInputs: BN;
  callScriptOffset: number;
};

export interface FunctionCall {
  amount?: BN | undefined;
  assetId?: string | undefined;
  functionSignature: string;
  functionName: string;
  argumentsProvided: Record<string, unknown> | undefined;
}

export const getFunctionCall = ({
  abi,
  receipt,
  rawPayload,
  callScriptOffset,
}: GetFunctionCallProps): FunctionCall => {
  const [transaction] = new TransactionCoder().decode(arrayify(rawPayload), 0);

  if (!transaction.scriptData) {
    throw new FuelError(
      ErrorCode.NOT_SUPPORTED,
      'Cannot get function calls for this transaction type.'
    );
  }

  const scriptData = arrayify(transaction.scriptData);

  // Decode the function selector offset
  const fnSelectorOffsetBytes = receipt.param1.toBytes(8);
  const [fnSelectorOffset] = new BigNumberCoder('u64').decode(fnSelectorOffsetBytes, 0);

  // Decode the function selector
  const [fnSelector] = new StdStringCoder().decode(
    scriptData,
    fnSelectorOffset.toNumber() - callScriptOffset
  );

  // Decode the function arguments offset
  const fnArgumentOffsetBytes = receipt.param2.toBytes(8);
  const [fnArgumentOffset] = new BigNumberCoder('u64').decode(fnArgumentOffsetBytes, 0);

  // Decode the function arguments
  const abiInterface = new Interface(abi);
  const fnArgumentsSlice = scriptData.slice(fnArgumentOffset.toNumber() - callScriptOffset);
  const fnFragment = abiInterface.getFunction(fnSelector);
  const fnArgs = fnFragment.decodeArguments(fnArgumentsSlice);

  let argumentsProvided: Record<string, unknown> | undefined;

  if (fnArgs) {
    const inputs = fnFragment.jsonFn.inputs;

    // put together decoded data with input names from abi
    argumentsProvided = inputs.reduce((prev, input, index) => {
      const value = fnArgs[index];
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
    functionSignature: fnFragment.signature,
    functionName: fnFragment.name,
    argumentsProvided,
    ...(receipt.amount?.isZero() ? {} : { amount: receipt.amount, assetId: receipt.assetId }),
  };
};
