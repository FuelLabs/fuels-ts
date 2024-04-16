import { BYTES_32, UTXO_ID_LEN } from '@fuel-ts/abi-coder';
import { Address } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { bn } from '@fuel-ts/math';
import { hexlify } from '@fuel-ts/utils';
import { randomBytes } from 'crypto';

import type { Coin, MessageCoin } from '../providers';

export const generateFakeCoin = (partial: Partial<Coin> = {}): Coin => ({
  id: hexlify(randomBytes(UTXO_ID_LEN)),
  amount: bn(100),
  assetId: ZeroBytes32,
  owner: Address.fromRandom(),
  maturity: 0,
  blockCreated: bn(0),
  txCreatedIdx: bn(0),
  ...partial,
});

export const generateFakeMessageCoin = (partial: Partial<MessageCoin> = {}): MessageCoin => ({
  sender: Address.fromRandom(),
  recipient: Address.fromRandom(),
  assetId: ZeroBytes32,
  amount: bn(100),
  nonce: hexlify(randomBytes(BYTES_32)),
  daHeight: bn(0),
  ...partial,
});
