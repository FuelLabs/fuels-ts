import type { Provider, CoinQuantityLike } from '@fuel-ts/providers';
import { coinQuantityfy, ScriptTransactionRequest } from '@fuel-ts/providers';

import Wallet from './wallet';

export const seedWallet = async (wallet: Wallet, quantities: CoinQuantityLike[]) => {
  const { provider } = wallet;

  const sender = '0x0101010101010101010101010101010101010101010101010101010101010101';
  const coins = await provider.getCoinsToSpend(sender, quantities);

  const request = new ScriptTransactionRequest({ gasLimit: 1_000_000 });
  request.addCoins(coins);
  quantities
    .map(coinQuantityfy)
    .forEach(({ amount, assetId }) => request.addCoinOutput(wallet.address, amount, assetId));

  const response = await provider.sendTransaction(request);

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
