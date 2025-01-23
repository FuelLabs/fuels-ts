import { UTXO_ID_LEN } from '@fuel-ts/abi';
import { getRandomB256 } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { randomBytes } from '@fuel-ts/crypto';
import { bn } from '@fuel-ts/math';
import { InputType } from '@fuel-ts/transactions';
import { hexlify } from '@fuel-ts/utils';

import type {
  CoinTransactionRequestInput,
  ContractTransactionRequestInput,
  MessageTransactionRequestInput,
} from '../providers';

export const generateFakeRequestInputCoin = (
  partial: Partial<CoinTransactionRequestInput> = {}
): CoinTransactionRequestInput => ({
  id: hexlify(randomBytes(UTXO_ID_LEN)),
  type: InputType.Coin,
  owner: getRandomB256(),
  amount: bn(100),
  assetId: ZeroBytes32,
  txPointer: '0x00000000000000000000000000000000',
  witnessIndex: 0,
  ...partial,
});

export const generateFakeRequestInputMessage = (
  partial: Partial<MessageTransactionRequestInput> = {}
): MessageTransactionRequestInput => ({
  nonce: getRandomB256(),
  type: InputType.Message,
  sender: getRandomB256(),
  recipient: getRandomB256(),
  amount: bn(100),
  witnessIndex: 0,
  ...partial,
});

export const generateFakeRequestInputContract = (
  partial: Partial<ContractTransactionRequestInput> = {}
): ContractTransactionRequestInput => ({
  contractId: getRandomB256(),
  type: InputType.Contract,
  txPointer: '0x00000000000000000000000000000000',
  ...partial,
});
