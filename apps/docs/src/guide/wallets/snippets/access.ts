/* eslint-disable @typescript-eslint/no-unused-vars */
// #region full
// #region wallets
import type { WalletLocked, WalletUnlocked } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../env';

// We can use the `generate` to create a new unlocked wallet.
const provider = await Provider.create(LOCAL_NETWORK_URL);
const myWallet: WalletUnlocked = Wallet.generate({ provider });

// or use an Address to create a wallet
const someWallet: WalletLocked = Wallet.fromAddress(myWallet.address, provider);
// #endregion wallets

const wallet: WalletUnlocked = Wallet.generate({ provider });
const PRIVATE_KEY = wallet.privateKey;

// Lock an existing wallet
const lockedWallet: WalletLocked = Wallet.fromAddress(
  myWallet.address,
  provider
);

// Unlock an existing wallet
const someUnlockedWallet: WalletUnlocked = lockedWallet.unlock(PRIVATE_KEY);

const unlockedWallet: WalletUnlocked = Wallet.generate({ provider });
const newlyLockedWallet = unlockedWallet.lock();

// You can create a wallet, without a provider
let unlockedWalletWithoutProvider: WalletUnlocked = Wallet.generate();
unlockedWalletWithoutProvider = Wallet.fromPrivateKey(
  unlockedWalletWithoutProvider.privateKey
);

// All non-provider dependent methods are available
unlockedWalletWithoutProvider.lock();

// All provider dependent methods will throw
await expect(() => unlockedWalletWithoutProvider.getCoins()).rejects.toThrow(
  /Provider not set/
);
// #endregion full
