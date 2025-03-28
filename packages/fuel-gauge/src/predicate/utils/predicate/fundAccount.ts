import type { BigNumberish, Account } from 'fuels';
import { ScriptTransactionRequest, BN } from 'fuels';

export const fundAccount = async (
  fundedAccount: Account,
  accountToBeFunded: Account,
  amount: BigNumberish,
  utxosAmount: number = 1
): Promise<BN> => {
  const baseAssetId = await fundedAccount.provider.getBaseAssetId();
  const request = new ScriptTransactionRequest();

  for (let i = 0; i < utxosAmount; i++) {
    request.addCoinOutput(accountToBeFunded.address, new BN(amount).div(utxosAmount), baseAssetId);
  }

  await request.estimateAndFund(fundedAccount);

  const submit = await fundedAccount.sendTransaction(request);
  await submit.waitForResult();

  return accountToBeFunded.getBalance();
};
