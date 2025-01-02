import type { BigNumberish, Account } from 'fuels';
import { ScriptTransactionRequest, BN } from 'fuels';

export const fundAccount = async (
  fundedAccount: Account,
  accountToBeFunded: Account,
  amount: BigNumberish,
  utxosAmount: number = 1
): Promise<BN> => {
  const baseAssetId = fundedAccount.provider.getBaseAssetId();
  const request = new ScriptTransactionRequest();

  for (let i = 0; i < utxosAmount; i++) {
    request.addCoinOutput(accountToBeFunded.address, new BN(amount).div(utxosAmount), baseAssetId);
  }

  const txCost = await fundedAccount.getTransactionCost(request);
  request.gasLimit = txCost.gasUsed;
  request.maxFee = txCost.maxFee;
  await fundedAccount.fund(request, txCost);

  const submit = await fundedAccount.sendTransaction(request);
  await submit.waitForResult();

  return accountToBeFunded.getBalance();
};
