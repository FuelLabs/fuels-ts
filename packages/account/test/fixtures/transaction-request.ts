import type {
  ChangeTransactionRequestOutput,
  CoinTransactionRequestInput,
  CoinTransactionRequestOutput,
} from '../../src';
import { ScriptTransactionRequest } from '../../src/providers/transaction-request/script-transaction-request';

export const SCRIPT_TX_COIN_REQUEST_INPUT: CoinTransactionRequestInput = {
  type: 0,
  id: '0x000000000000000000000000000000000000000000000000000000000000000000',
  assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
  amount: '0x989680',
  owner: '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e',
  txPointer: '0x00000000000000000000000000000000',
  witnessIndex: 0,
  predicate: '0x',
  predicateData: '0x',
  predicateGasUsed: '0x20',
};

export const SCRIPT_TX_COIN_REQUEST_OUTPUT_COIN: CoinTransactionRequestOutput = {
  type: 0,
  to: '0xc7862855b418ba8f58878db434b21053a61a2025209889cc115989e8040ff077',
  assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
  amount: 1,
};

export const SCRIPT_TX_COIN_REQUEST_OUTPUT_CHANGE: ChangeTransactionRequestOutput = {
  type: 2,
  to: '0xc7862855b418ba8f58878db434b21053a61a2025209889cc115989e8040ff077',
  assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
};

export const SCRIPT_TX_REQUEST = new ScriptTransactionRequest({
  gasLimit: 10_000,
  script: '0x24400000',
  scriptData: Uint8Array.from([]),
  tip: 10,
  maxFee: 90000,
  maturity: 0,
  witnessLimit: 3000,
  inputs: [SCRIPT_TX_COIN_REQUEST_INPUT],
  outputs: [SCRIPT_TX_COIN_REQUEST_OUTPUT_COIN],
  witnesses: ['0x'],
});
