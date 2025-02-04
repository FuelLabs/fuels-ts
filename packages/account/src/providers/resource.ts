import type { BytesLike } from '@fuel-ts/utils';

import type { Coin } from './coin';
import type { MessageCoin } from './message';

export type RawCoin = {
  utxoId: string;
  owner: string;
  amount: string;
  assetId: string;
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

/** @hidden */
export type ExcludeResourcesOption = {
  utxos?: BytesLike[];
  messages?: BytesLike[];
};

/** @hidden */
export const isRawCoin = (resource: RawResource): resource is RawCoin => 'utxoId' in resource;
/** @hidden */
export const isRawMessage = (resource: RawResource): resource is RawMessage =>
  'recipient' in resource;
/** @hidden */
export const isCoin = (resource: Resource): resource is Coin => 'id' in resource;
/** @hidden */
export const isMessage = (resource: Resource): resource is MessageCoin => 'recipient' in resource;
