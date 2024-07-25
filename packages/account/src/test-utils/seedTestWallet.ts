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
  const accountsToBeFunded = Array.isArray(wallet) ? wallet : [wallet];

  // There may be multiple wallets, so want to use the same provider for them all
  const [{ provider }] = accountsToBeFunded;

  const genesisWallet = new WalletUnlocked(process.env.GENESIS_SECRET || randomBytes(32), provider);

  // Create transaction
  const request = new ScriptTransactionRequest();

  quantities.map(coinQuantityfy).forEach(({ amount, assetId }) =>
    accountsToBeFunded.forEach(({ address }) => {
      for (let i = 0; i < utxosAmount; i++) {
        request.addCoinOutput(address, amount.div(utxosAmount), assetId);
      }
    })
  );

  const txCost = await genesisWallet.getTransactionCost(request);

  request.gasLimit = txCost.gasUsed;
  request.maxFee = txCost.maxFee;

  await genesisWallet.fund(request, txCost);

  const submit = await genesisWallet.sendTransaction(request);
  await submit.waitForResult();
};
