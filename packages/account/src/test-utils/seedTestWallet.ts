import { randomBytes } from '@fuel-ts/crypto';

import type { Account } from '../account';
import { coinQuantityfy, ScriptTransactionRequest } from '../providers';
import type { CoinQuantityLike } from '../providers';
import { WalletUnlocked } from '../wallet';

export const seedTestWallet = async (wallet: Account, quantities: CoinQuantityLike[]) => {
  const genesisWallet = new WalletUnlocked(
    process.env.GENESIS_SECRET || randomBytes(32),
    wallet.provider
  );

  // Create transaction
  const request = new ScriptTransactionRequest();

  // Connect to the same Provider as wallet
  quantities.forEach((quantity) => {
    const { amount, assetId } = coinQuantityfy(quantity);
    request.addCoinOutput(wallet.address, amount, assetId);
  });

  const txCost = await genesisWallet.provider.getTransactionCost(request);

  request.gasLimit = txCost.gasUsed;
  request.maxFee = txCost.maxFee;

  await genesisWallet.fund(request, txCost);

  await genesisWallet.sendTransaction(request, { awaitExecution: true });
};
