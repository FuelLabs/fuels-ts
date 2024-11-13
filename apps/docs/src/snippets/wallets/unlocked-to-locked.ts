// #region wallet-unlocked-to-locked
import type { WalletUnlocked } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const unlockedWallet: WalletUnlocked = Wallet.generate({ provider });
const newlyLockedWallet = unlockedWallet.lock();
// #endregion wallet-unlocked-to-locked
console.log('newly locked wallet address', newlyLockedWallet.address);
