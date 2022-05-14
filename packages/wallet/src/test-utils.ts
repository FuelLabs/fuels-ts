import type { Provider, CoinQuantityLike } from '@fuel-ts/providers';
import { coinQuantityfy, ScriptTransactionRequest } from '@fuel-ts/providers';
import { randomBytes } from 'crypto';

import Wallet from './wallet';

export const genesisWallet = new Wallet(process.env.GENESIS_SECRET || randomBytes(32));

export const seedWallet = async (wallet: Wallet, quantities: CoinQuantityLike[]) => {
  // Connect to the same Provider as wallet
  genesisWallet.connect(wallet.provider);
  const coins = await genesisWallet.getCoinsToSpend(quantities);
  // Create transaction
  const request = new ScriptTransactionRequest({
    gasLimit: 10000,
  });
  request.addCoins(coins);
  quantities
    .map(coinQuantityfy)
    .forEach(({ amount, assetId }) => request.addCoinOutput(wallet.address, amount, assetId));
  const response = await genesisWallet.sendTransaction(request);

  await response.wait();
};

export const generateTestWallet = async (
  provider: Provider,
  quantities?: CoinQuantityLike[]
): Promise<Wallet> => {
  const wallet = Wallet.generate({ provider });
  if (quantities) {
    await seedWallet(wallet, quantities);
  }
  return wallet;
};
