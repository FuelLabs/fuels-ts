// #region combining-utxos
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const fundingWallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const wallet = Wallet.generate({ provider });

// First, lets fund a wallet with 10_000 of the base asset. But as we are doing this across 10 transactions,
// we will end up with 10 UTXOs.
for (let i = 0; i < 10; i++) {
  const initTx = await fundingWallet.transfer(
    wallet.address,
    1000,
    provider.getBaseAssetId()
  );
  await initTx.waitForResult();
}

// We can fetch the coins to see how many UTXOs we have, and confirm it is 10.
const { coins: initialCoins } = await wallet.getCoins(
  provider.getBaseAssetId()
);
console.log('Initial Coins Length', initialCoins.length);
// 10

// But we can also confirm the total balance of the base asset for this account is 10_000.
const initialBalance = await wallet.getBalance(provider.getBaseAssetId());
console.log('Initial Balance', initialBalance.toNumber());
// 10_000

// Now we can combine the UTXOs into a single UTXO by performing a single transfer for the
// majority of the balance. Of course, we will still need some funds for the transaction fees.
const combineTx = await wallet.transfer(
  wallet.address,
  9500,
  provider.getBaseAssetId()
);
await combineTx.wait();

// Now we can perform the same validations and see we have less UTXOs. We have 2 in this instance
// as we have performed the transfer in the base asset. So we have a UTXO for our transfer, and another
// for what is left after paying the fees.
const { coins: combinedCoins } = await wallet.getCoins(
  provider.getBaseAssetId()
);
console.log('Combined Coins Length', combinedCoins.length);
// 2

// And we can also confirm the final balance of the base asset for this account is 9_998. So
// the cost of combining is also minimal.
const combinedBalance = await wallet.getBalance(provider.getBaseAssetId());
console.log('Combined Balance', combinedBalance.toNumber());
// 9_998
// #endregion combining-utxos
