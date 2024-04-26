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
    // Connect to the same Provider as wallet
    toFundAccounts[0].provider
  );

  // Create transaction
  const request = new ScriptTransactionRequest();

  quantities.map(coinQuantityfy).forEach(({ amount, assetId }) =>
    toFundAccounts.forEach(({ address }) => {
      for (let i = 0; i < utxosAmount; i++) {
        request.addCoinOutput(address, amount.div(utxosAmount), assetId);
      }
    })
  );

  const txCost = await genesisWallet.provider.getTransactionCost(request);

  request.gasLimit = txCost.gasUsed;
  request.maxFee = txCost.maxFee;

  await genesisWallet.fund(request, txCost);

  await genesisWallet.sendTransaction(request, { awaitExecution: true });
};
