import type { Provider, CoinQuantityLike } from '../providers';
import type { WalletUnlocked } from '../wallet';
import { Wallet } from '../wallet';

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
