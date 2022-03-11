import type { Provider, SpendQueryElement } from '@fuel-ts/providers';
import { ScriptTransactionRequest } from '@fuel-ts/providers';

import Wallet from './wallet';

export const seedWallet = async (wallet: Wallet, query: SpendQueryElement[]) => {
  const { provider } = wallet;

  const sender = '0x0101010101010101010101010101010101010101010101010101010101010101';
  const coins = await provider.getCoinsToSpend(sender, query);

  const request = new ScriptTransactionRequest({ gasLimit: 1000000 });
  request.addCoins(coins);
  query.forEach(({ amount, assetId }) => request.addCoinOutput(wallet.address, amount, assetId));

  const response = await provider.sendTransaction(request);

  await response.wait();
};

export const generateTestWallet = async (
  provider: Provider,
  query?: SpendQueryElement[]
): Promise<Wallet> => {
  const wallet = Wallet.generate({ provider });
  if (query) {
    await seedWallet(wallet, query);
  }
  return wallet;
};
