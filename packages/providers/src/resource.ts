import type { BytesLike } from '@ethersproject/bytes';

import type { Coin } from './coin';
import type { MessageCoin } from './message';

export type RawCoin = {
  utxoId: string;
  owner: string;
  amount: string;
  assetId: string;
  maturity: string;
  blockCreated: string;
  txCreatedIdx: string;
};

export type RawMessage = {
  amount: string;
  sender: string;
  assetId: string;
  recipient: string;
  data: string;
  nonce: string;
  daHeight: string;
};

export type RawResource = RawCoin | RawMessage;
export type Resource = Coin | MessageCoin;

export type ExcludeResourcesOption = {
  utxos?: BytesLike[];
  messages?: BytesLike[];
};

export const isRawCoin = (resource: RawResource): resource is RawCoin => 'utxoId' in resource;
export const isRawMessage = (resource: RawResource): resource is RawMessage =>
  'recipient' in resource;

export const isCoin = (resource: Resource): resource is Coin => 'id' in resource;
export const isMessage = (resource: Resource): resource is MessageCoin => 'recipient' in resource;
