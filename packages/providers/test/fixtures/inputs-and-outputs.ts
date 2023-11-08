import { getRandomB256 } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { bn } from '@fuel-ts/math';
import { InputType, OutputType } from '@fuel-ts/transactions';

import type {
  CoinTransactionRequestInput,
  ContractTransactionRequestInput,
  MessageTransactionRequestInput,
} from '../../src/transaction-request/input';
import type {
  ChangeTransactionRequestOutput,
  CoinTransactionRequestOutput,
  ContractTransactionRequestOutput,
} from '../../src/transaction-request/output';

export const MOCK_REQUEST_COIN_INPUT: CoinTransactionRequestInput = {
  type: InputType.Coin,
  id: ZeroBytes32,
  amount: bn(100),
  assetId: '0x0101010101010101010101010101010101010101010101010101010101010101',
  owner: getRandomB256(),
  txPointer: '0x00000000000000000000000000000000',
  witnessIndex: 0,
  maturity: 0,
};

export const MOCK_REQUEST_MESSAGE_INPUT: MessageTransactionRequestInput = {
  type: InputType.Message,
  amount: bn(100),
  witnessIndex: 0,
  sender: getRandomB256(),
  recipient: getRandomB256(),
  nonce: getRandomB256(),
  data: '',
};

export const MOCK_REQUEST_CONTRACT_INPUT: ContractTransactionRequestInput = {
  type: InputType.Contract,
  contractId: getRandomB256(),
  txPointer: '0x00000000000000000000000000000000',
};

export const MOCK_REQUEST_COIN_OUTPUT: CoinTransactionRequestOutput = {
  type: OutputType.Coin,
  to: getRandomB256(),
  amount: 100,
  assetId: '0x0101010101010101010101010101010101010101010101010101010101010101',
};
export const MOCK_REQUEST_CONTRACT_OUTPUT: ContractTransactionRequestOutput = {
  type: OutputType.Contract,
  inputIndex: 0,
};

export const MOCK_REQUEST_CHANGE_OUTPUT: ChangeTransactionRequestOutput = {
  type: OutputType.Change,
  to: getRandomB256(),
  assetId: '0x0101010101010101010101010101010101010101010101010101010101010101',
};
