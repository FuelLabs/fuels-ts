// #region wallet-locked-to-unlocked
import type { WalletLocked, WalletUnlocked } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet: WalletUnlocked = Wallet.generate({ provider });
const PRIVATE_KEY = wallet.privateKey;

// Lock an existing wallet
const lockedWallet: WalletLocked = Wallet.fromAddress(wallet.address, provider);

// Unlock an existing wallet
const someUnlockedWallet: WalletUnlocked = lockedWallet.unlock(PRIVATE_KEY);
// #endregion wallet-locked-to-unlocked
console.log('unlocked wallet address', someUnlockedWallet.address);
