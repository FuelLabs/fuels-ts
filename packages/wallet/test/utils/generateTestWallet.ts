import type { Provider, CoinQuantityLike } from '@fuel-ts/providers';

import { Wallet } from '../../src/wallet';
import type { WalletUnlocked } from '../../src/wallets';

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
