import type { BN } from '@fuel-ts/math';

import { Interface } from '../Interface';
import { B256Coder } from '../encoding/coders/B256Coder';
import { BigNumberCoder } from '../encoding/coders/BigNumberCoder';
import { StdStringCoder } from '../encoding/coders/StdStringCoder';
import type { JsonAbi } from '../types/JsonAbiNew';

import { WORD_SIZE } from './constants';

export type DecodedScriptData = {
  amount: BN;
  assetId: string;
  contractId: string;
  functionSelector: string;
  functionArgs: unknown[] | undefined;
};

/**
 * Decodes the script data used when calling programs to deduce the amount, asset ID,
 * contract ID, function selector and function arguments passed.
 *
 * @param scriptData - the script data to decode.
 * @param abi - the abi used for the call, to deduce arguments (optional).
 * @returns the decoded script data.
 */
export const decodeScriptData = (scriptData: Uint8Array, abi?: JsonAbi): DecodedScriptData => {
  // Slice all data sections at required offsets
  const [amount, amountOffset] = new BigNumberCoder('u64').decode(scriptData, 0);
  const [assetId, assetIdOffset] = new B256Coder().decode(scriptData, amountOffset);
  const [contractId, contractIdOffset] = new B256Coder().decode(scriptData, assetIdOffset);
  const [functionSelector, functionSelectorOffset] = new StdStringCoder().decode(
    scriptData,
    contractIdOffset + WORD_SIZE + WORD_SIZE
  );

  // Slice the function arguments after the function selector
  const functionArgsBytes = scriptData.slice(functionSelectorOffset);

  // Decode the function arguments using the function selector if we have the abi
  const functionArgs = abi
    ? new Interface(abi).getFunction(functionSelector).decodeArguments(functionArgsBytes)
    : undefined;

  return {
    amount,
    assetId,
    contractId,
    functionSelector,
    functionArgs,
  };
};
