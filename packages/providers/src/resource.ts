import type { BytesLike } from '@ethersproject/bytes';

import type { GqlGetResourcesToSpendQuery, GqlCoinStatus } from './__generated__/operations';

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

type Resource = RawCoin | RawMessage;

export type Resources = GqlGetResourcesToSpendQuery['resourcesToSpend'];

export type ExcludeResourcesOption = {
  utxos?: BytesLike[];
  messages?: BytesLike[];
};

export const isCoin = (resource: Resource) => 'utxoId' in resource;
export const isMessage = (resource: Resource) => 'recipient' in resource;
