import { type JsonAbi, decodeScriptData } from '@fuel-ts/abi-coder';
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
}: GetFunctionCallProps): FunctionCall => {
  const [transaction] = new TransactionCoder().decode(arrayify(rawPayload), 0);

  if (!transaction.scriptData) {
    throw new FuelError(
      ErrorCode.NOT_SUPPORTED,
      'Cannot get function calls for this transaction type.'
    );
  }

  const { functionArgs, functionSelector } = decodeScriptData(
    arrayify(transaction.scriptData),
    abi
  );

  const abiInterface = new Interface(abi);
  const functionFragment = abiInterface.getFunction(functionSelector);
  const inputs = functionFragment.jsonFn.inputs;

  let argumentsProvided;

  if (functionArgs) {
    // put together decoded data with input names from abi
    argumentsProvided = inputs.reduce((prev, input, index) => {
      const value = functionArgs[index];
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
