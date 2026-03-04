import type { BigNumberish, Account } from 'fuels';
import { ScriptTransactionRequest, BN, OutputType, bn, mergeQuantities } from 'fuels';

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

  const quantities = request.outputs
    .filter((o) => o.type === OutputType.Coin)
    .map((o) => ({ assetId: String(o.assetId), amount: bn(o.amount) }));

  const accountCoinQuantities = mergeQuantities(quantities);

  const { assembledRequest } = await fundedAccount.provider.assembleTx({
    request,
    feePayerAccount: fundedAccount,
    accountCoinQuantities,
  });

  const submit = await fundedAccount.sendTransaction(assembledRequest);
  await submit.waitForResult();

  return accountToBeFunded.getBalance();
};
