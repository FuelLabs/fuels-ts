// #region wallet-optional-provider
import type { WalletUnlocked } from 'fuels';
import { Wallet } from 'fuels';

// You can create a wallet, without a provider
let unlockedWalletWithoutProvider: WalletUnlocked = Wallet.generate();
unlockedWalletWithoutProvider = Wallet.fromPrivateKey(
  unlockedWalletWithoutProvider.privateKey
);

// All non-provider dependent methods are available
unlockedWalletWithoutProvider.lock();

// All provider dependent methods will throw
try {
  await unlockedWalletWithoutProvider.getCoins();
} catch (e) {
  console.log('error', e);
}
// #endregion wallet-optional-provider
