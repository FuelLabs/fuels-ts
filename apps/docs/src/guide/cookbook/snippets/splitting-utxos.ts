// #region splitting-utxos
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();
// This is the wallet that will fund the sending wallet
const fundingWallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// This is the wallet that will send the funds
const wallet = Wallet.generate({ provider });
// This is the wallet that will receive the funds
const destinationWallet = Wallet.generate({ provider });

// Let's fund the sending wallet with 1000 of the base asset
const fundingTx = await fundingWallet.transfer(
  wallet.address,
  1000,
  baseAssetId
);
await fundingTx.waitForResult();

// We can fetch the coins to see how many UTXOs we have and confirm it is 1
const { coins: initialCoins } = await wallet.getCoins(baseAssetId);
console.log('Initial Coins Length', initialCoins.length);
// 1

// Now we can split the large 1000 UTXO into 5 UTXOs of 200 each,
// Including the address to send the funds to and the assetId we want to send
const splitTxns = new Array(5).fill({
  amount: 200,
  assetId: baseAssetId,
  destination: destinationWallet.address,
});

// We will also need add some funds to the wallet to cover the fee
// We could have also spent less than 200 for each UTXO, but this is just an example
const fundTx = await fundingWallet.transfer(wallet.address, 500, baseAssetId);
await fundTx.waitForResult();

console.log('Split UTXOs', splitTxns);
// [
//   { amount: 200, assetId: '0x0', destination	: '0x...' },
//   { amount: 200, assetId: '0x0', destination: '0x...' },
//   { amount: 200, assetId: '0x0', destination: '0x...' },
//   { amount: 200, assetId: '0x0', destination: '0x...' },
//   { amount: 200, assetId: '0x0', destination: '0x...' }
// ]

// Then we can send the transactions using the batchTransfer function
const batchTx = await wallet.batchTransfer(splitTxns);
await batchTx.waitForResult();
// #endregion splitting-utxos
