import type { BytesLike } from '@ethersproject/bytes';

import type { GqlGetResourcesToSpendQuery, GqlCoinStatus } from './__generated__/operations';
import type { Coin } from './coin';
import type { Message } from './message';

export type RawCoin = {
  utxoId: string;
  owner: string;
  amount: string;
  assetId: string;
  maturity: string;
  status: GqlCoinStatus;
  blockCreated: string;
};

export type RawMessage = {
  amount: string;
  sender: string;
  recipient: string;
  data: string;
  nonce: string;
  daHeight: string;
};

export type RawResource = RawCoin | RawMessage;
export type Resource = Coin | Message;

export type Resources = GqlGetResourcesToSpendQuery['resourcesToSpend'];

export type ExcludeResourcesOption = {
  utxos?: BytesLike[];
  messages?: BytesLike[];
};

export const isRawCoin = (resource: RawResource): resource is RawCoin => 'utxoId' in resource;
export const isRawMessage = (resource: RawResource): resource is RawMessage =>
  'recipient' in resource;

export const isCoin = (resource: Resource): resource is Coin => 'utxoId' in resource;
export const isMessage = (resource: Resource): resource is Message => 'recipient' in resource;
