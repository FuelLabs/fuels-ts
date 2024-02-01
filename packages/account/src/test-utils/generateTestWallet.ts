import type { Provider, CoinQuantityLike } from '../providers';
import { Wallet } from '../wallet';
import type { WalletUnlocked } from '../wallets';

import { seedTestWallet } from './seedTestWallet';

export const generateTestWallet = async (
  provider: Provider,
  quantities?: CoinQuantityLike[]
): Promise<WalletUnlocked> => {
  const wallet = Wallet.generate({ provider });
  if (quantities) {
    await seedTestWallet(wallet, quantities);
  }
  return wallet;
};
