// #region splitting-utxos
import { BN, Provider, Wallet, splitUTXOs } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const fundingWallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const wallet = Wallet.generate({ provider });

// let's fund the wallet with 1000 of the base asset
const fundingTx = await fundingWallet.transfer(
  wallet.address,
  1000,
  provider.getBaseAssetId()
);
await fundingTx.waitForResult();

// We can fetch the coins to see how many UTXOs we have, and confirm it is 1.
const { coins: initialCoins } = await wallet.getCoins(
  provider.getBaseAssetId()
);
console.log('Initial Coins Length', initialCoins.length);
// 1

// Now we can split the UTXO into 5 UTXOs of 200 each.
const splitTx = splitUTXOs(
  new BN(1000),
  new BN(200),
  provider.getBaseAssetId(),
  wallet.address,
  5
);

console.log('Split UTXOs', splitTx);
// [
//   { amount: 200, assetId: '0x0', destination	: '0x...' },
//   { amount: 200, assetId: '0x0', destination: '0x...' },
//   { amount: 200, assetId: '0x0', destination: '0x...' },
//   { amount: 200, assetId: '0x0', destination: '0x...' },
//   { amount: 200, assetId: '0x0', destination: '0x...' }
// ]

// Then we can send the transactions using the batchTransfer function
const batchTx = await wallet.batchTransfer(splitTx);
await batchTx.waitForResult();
// #endregion splitting-utxos
