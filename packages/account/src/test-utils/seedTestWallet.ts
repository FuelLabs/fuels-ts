import { randomBytes } from '@fuel-ts/crypto';

import type { Account } from '../account';
import { coinQuantityfy, ScriptTransactionRequest } from '../providers';
import type { CoinQuantityLike } from '../providers';
import { WalletUnlocked } from '../wallet';

export const seedTestWallet = async (
  wallet: Account | Account[],
  quantities: CoinQuantityLike[],
  utxosAmount = 1
) => {
  const toFundAccounts = Array.isArray(wallet) ? wallet : [wallet];

  const genesisWallet = new WalletUnlocked(
    process.env.GENESIS_SECRET || randomBytes(32),
    toFundAccounts[0].provider
  );

  // Connect to the same Provider as wallet
  const resources = await genesisWallet.getResourcesToSpend(quantities);

  const { minGasPrice } = genesisWallet.provider.getGasConfig();

  // Create transaction
  const request = new ScriptTransactionRequest({
    gasLimit: 10000,
    gasPrice: minGasPrice,
  });

  request.addResources(resources);

  quantities.map(coinQuantityfy).forEach(({ amount, assetId }) =>
    toFundAccounts.forEach(({ address }) => {
      for (let i = 0; i < utxosAmount; i++) {
        request.addCoinOutput(address, amount.div(utxosAmount), assetId);
      }
    })
  );

  await genesisWallet.sendTransaction(request, { awaitExecution: true });
};
