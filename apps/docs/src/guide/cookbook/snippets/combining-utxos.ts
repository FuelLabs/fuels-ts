import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// Creating multiple UTXOs for the consolidation
for (let i = 0; i < 10; i++) {
  const initTx = await wallet.transfer(wallet.address, 1000);
  await initTx.waitForResult();
}

// #region combining-utxos
const baseAssetId = await provider.getBaseAssetId();

// By default, this will combine UTXOs into a single output (outputNum = 1)
const result = await wallet.consolidateCoins({
  assetId: baseAssetId,
  // Optional: 'parallel' (default) or 'sequential' execution mode
  mode: 'parallel',
  // Optional: number of output UTXOs to create (default is 1)
  outputNum: 1,
});

// Check the transaction results and any errors
console.log('Successful transactions:', result.txResponses);
console.log('Failed transactions:', result.errors);

// Verify the reduced number of UTXOs
const { coins: consolidatedCoins } = await wallet.getCoins(baseAssetId);
console.log('Consolidated Coins Length', consolidatedCoins.length);
// #endregion combining-utxos
