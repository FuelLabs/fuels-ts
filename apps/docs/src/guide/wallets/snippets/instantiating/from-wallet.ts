// #region wallet-from-private-key
import type { WalletLocked, WalletUnlocked } from 'fuels';
import { Provider, Wallet } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_ADDRESS,
  WALLET_PVT_KEY,
} from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

// Generate a locked wallet
const lockedWallet: WalletLocked = Wallet.fromAddress(WALLET_ADDRESS, provider);

// Unlock an existing unlocked wallet
let unlockedWallet: WalletUnlocked = lockedWallet.unlock(WALLET_PVT_KEY);
// Or directly from a private key
unlockedWallet = Wallet.fromPrivateKey(WALLET_PVT_KEY);
// #endregion wallet-from-private-key

console.log('Unlocked wallet should be defined', unlockedWallet);
