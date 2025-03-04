import { bn } from '@fuel-ts/math';
import { InputType, OutputType } from '@fuel-ts/transactions';

import type {
  GqlInputCoinFragment,
  GqlInputMessageFragment,
  GqlInputContractFragment,
  GqlOutputChangeFragment,
  GqlOutputCoinFragment,
  GqlOutputContractCreatedFragment,
  GqlOutputContractFragment,
  GqlOutputVariableFragment,
} from '../__generated__/operations';
import type { TransactionRequestInput, TransactionRequestOutput } from '../transaction-request';

type RawInput = GqlInputCoinFragment | GqlInputMessageFragment | GqlInputContractFragment;

type RawOutput =
  | GqlOutputCoinFragment
  | GqlOutputChangeFragment
  | GqlOutputVariableFragment
  | GqlOutputContractFragment
  | GqlOutputContractCreatedFragment;

// TODO: Consider renaming everything here to serialize instead of parse:
// https://github.com/FuelLabs/fuels-ts/blob/a0bd3bee065086bdf7c7aadc4c5edb1841b206d1/packages/account/src/providers/utils/serialization.ts
export const parseRawInput = (input: RawInput) => {
  let parsedInput: TransactionRequestInput;

  switch (input.type) {
    case 'InputCoin':
      parsedInput = {
        type: InputType.Coin,
        id: input.utxoId,
        amount: bn(input.amount),
        assetId: input.assetId,
        owner: input.owner,
        txPointer: `0x${input.txPointer}`,
        witnessIndex: Number(input.witnessIndex),
        predicate: input.predicate,
        predicateData: input.predicateData,
        predicateGasUsed: bn(input.predicateGasUsed),
      };
      break;

    case 'InputMessage':
      parsedInput = {
        type: InputType.Message,
        nonce: input.nonce,
        amount: bn(input.amount),
        recipient: input.recipient,
        sender: input.sender,
        data: input.data,
        witnessIndex: Number(input.witnessIndex),
        predicate: input.predicate,
        predicateData: input.predicateData,
        predicateGasUsed: bn(input.predicateGasUsed),
      };
      break;

    default:
      parsedInput = {
        type: InputType.Contract,
        contractId: input.contractId,
        txPointer: `0x${input.txPointer}`,
      };
  }

  return parsedInput;
};

export const parseRawOutput = (output: RawOutput) => {
  let parsedOutput: TransactionRequestOutput;

  switch (output.type) {
    case 'CoinOutput':
      parsedOutput = {
        type: OutputType.Coin,
        amount: bn(output.amount),
        assetId: output.assetId,
        to: output.to,
      };
      break;

    case 'ContractOutput':
      parsedOutput = {
        type: OutputType.Contract,
        inputIndex: Number(output.inputIndex),
      };
      break;

    case 'ChangeOutput':
      parsedOutput = {
        type: OutputType.Change,
        assetId: output.assetId,
        to: output.to,
      };
      break;

    case 'ContractCreated':
      parsedOutput = {
        type: OutputType.ContractCreated,
        stateRoot: output.stateRoot,
        contractId: output.contract,
      };
      break;

    default:
      parsedOutput = {
        type: OutputType.Variable,
      };
  }

  return parsedOutput;
};
