// #region getResourcesToSpend-2
import type { CoinQuantityLike, ExcludeResourcesOption } from 'fuels';
import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const assetIdA =
  '0x0101010101010101010101010101010101010101010101010101010101010101';

const baseAssetId = provider.getBaseAssetId();

const quantities: CoinQuantityLike[] = [
  { amount: 32, assetId: baseAssetId, max: 42 },
  { amount: 50, assetId: assetIdA },
];

const utxoId =
  '0x00000000000000000000000000000000000000000000000000000000000000010001';
const messageNonce =
  '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0';
const excludedIds: ExcludeResourcesOption = {
  utxos: [utxoId],
  messages: [messageNonce],
};

const spendableResources = await wallet.getResourcesToSpend(
  quantities,
  excludedIds
);

const tx = new ScriptTransactionRequest();
tx.addResources(spendableResources);
// #endregion getResourcesToSpend-2

console.log('spendableResources', spendableResources);
