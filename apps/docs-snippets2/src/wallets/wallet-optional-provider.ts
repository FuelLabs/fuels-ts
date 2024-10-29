import type { WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

// #region wallet-optional-provider
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
// #endregion wallet-optional-provider
