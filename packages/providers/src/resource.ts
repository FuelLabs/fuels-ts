import type { BytesLike } from '@ethersproject/bytes';
import type { AbstractAccount } from '@fuel-ts/interfaces';

import type { Coin } from './coin';
import type { MessageCoin } from './message';

export interface RawCoin {
  utxoId: string;
  owner: string;
  amount: string;
  assetId: string;
  maturity: string;
  blockCreated: string;
  txCreatedIdx: string;
}

export interface RawMessage {
  amount: string;
  sender: string;
  assetId: string;
  recipient: string;
  data: string;
  nonce: string;
  daHeight: string;
}

export interface CoinPredicate extends Coin {
  getPredicateContent: () => { predicate: Uint8Array; predicateData: Uint8Array };
}

export interface MessageCoinPredicate extends MessageCoin {
  getPredicateContent: () => { predicate: Uint8Array; predicateData: Uint8Array };
}

export type RawResource = RawCoin | RawMessage;
export type PredicateResource = CoinPredicate | MessageCoinPredicate;
export type CoinResource = Coin | CoinPredicate;
export type MessageCoinResource = MessageCoin | MessageCoinPredicate;
export type Resource = CoinResource | MessageCoinResource;

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
export const isCoin = (resource: Resource): resource is CoinResource => 'id' in resource;
/** @hidden */
export const isMessage = (resource: Resource): resource is MessageCoinResource =>
  'recipient' in resource;
