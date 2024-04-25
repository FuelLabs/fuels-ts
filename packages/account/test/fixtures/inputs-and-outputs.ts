import { getRandomB256 } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { bn } from '@fuel-ts/math';
import type { InputCoin, InputMessage } from '@fuel-ts/transactions';
import { InputType, OutputType } from '@fuel-ts/transactions';
import { ASSET_A } from '@fuel-ts/utils/test-utils';

import type {
  CoinTransactionRequestInput,
  MessageTransactionRequestInput,
  ContractTransactionRequestInput,
  CoinTransactionRequestOutput,
  ContractTransactionRequestOutput,
  ChangeTransactionRequestOutput,
} from '../../src';

export const MOCK_COIN_INPUT: InputCoin = {
  type: InputType.Coin,
  txID: ZeroBytes32,
  outputIndex: 0,
  owner: ZeroBytes32,
  amount: bn(100),
  assetId: ZeroBytes32,
  txPointer: {
    blockHeight: 0,
    txIndex: 0,
  },
  witnessIndex: 0,
  maturity: 0,
  predicateGasUsed: bn(0),
  predicateLength: 0,
  predicateDataLength: 0,
  predicate: '0x',
  predicateData: '0x',
};

export const MOCK_MESSAGE_INPUT: InputMessage = {
  type: InputType.Message,
  sender: ZeroBytes32,
  recipient: ZeroBytes32,
  nonce: ZeroBytes32,
  amount: bn(20),
  witnessIndex: 0,
  dataLength: ZeroBytes32.length,
  data: ZeroBytes32,
  predicateGasUsed: bn(0),
  predicateLength: 0,
  predicateDataLength: 0,
  predicate: '0x',
  predicateData: '0x',
};

export const MOCK_REQUEST_COIN_INPUT: CoinTransactionRequestInput = {
  type: InputType.Coin,
  id: ZeroBytes32,
  amount: bn(100),
  assetId: ASSET_A,
  owner: getRandomB256(),
  txPointer: '0x00000000000000000000000000000000',
  witnessIndex: 0,
  maturity: 0,
};

export const MOCK_REQUEST_PREDICATE_INPUT: CoinTransactionRequestInput = {
  type: InputType.Coin,
  id: ZeroBytes32,
  amount: bn(100),
  assetId: ASSET_A,
  owner: getRandomB256(),
  txPointer: '0x00000000000000000000000000000000',
  witnessIndex: 0,
  maturity: 0,
  predicate: '0x862512a2363db2b3a375c0d4bbbd27172180d89f23f2e259bac850ab02619301',
  predicateGasUsed: bn(0),
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
  assetId: ASSET_A,
};
export const MOCK_REQUEST_CONTRACT_OUTPUT: ContractTransactionRequestOutput = {
  type: OutputType.Contract,
  inputIndex: 0,
};

export const MOCK_REQUEST_CHANGE_OUTPUT: ChangeTransactionRequestOutput = {
  type: OutputType.Change,
  to: getRandomB256(),
  assetId: ASSET_A,
};
