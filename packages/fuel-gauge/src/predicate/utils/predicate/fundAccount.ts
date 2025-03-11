import type { BigNumberish, Account, AssembleTxRequiredBalances } from 'fuels';
import { ScriptTransactionRequest, BN, OutputType, bn, resolveAccount } from 'fuels';

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

  const requiredBalancesIndex: Record<string, AssembleTxRequiredBalances> = {};

  request.outputs
    .filter((o) => o.type === OutputType.Coin)
    .forEach((o) => {
      const assetId = String(o.assetId);
      const outputAmount = bn(o.amount);

      const entry = requiredBalancesIndex[assetId] || {
        account: resolveAccount(fundedAccount),
        amount: bn(0),
        assetId,
        changePolicy: {
          change: fundedAccount.address.b256Address,
        },
      };

      entry.amount = entry.amount.add(outputAmount);

      requiredBalancesIndex[assetId] = entry;
    });

  const { transactionRequest } = await fundedAccount.provider.assembleTx({
    blockHorizon: 10,
    feeAddressIndex: 0,
    requiredBalances: Object.values(requiredBalancesIndex),
    transactionRequest: request,
    estimatePredicates: true,
  });

  const submit = await fundedAccount.sendTransaction(transactionRequest);
  await submit.waitForResult();

  return accountToBeFunded.getBalance();
};
