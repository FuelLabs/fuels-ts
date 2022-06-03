import { randomBytes } from '@fuel-ts/keystore';
import type { Provider, CoinQuantityLike } from '@fuel-ts/providers';
import { coinQuantityfy, ScriptTransactionRequest } from '@fuel-ts/providers';

import Wallet from './wallet';

export const seedWallet = async (wallet: Wallet, quantities: CoinQuantityLike[]) => {
  const genesisWallet = new Wallet(process.env.GENESIS_SECRET || randomBytes(32), wallet.provider);
  // Connect to the same Provider as wallet
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
