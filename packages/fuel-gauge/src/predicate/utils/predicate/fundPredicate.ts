import type { InputValue, BigNumberish, WalletUnlocked, Predicate } from 'fuels';
import { ScriptTransactionRequest, BN } from 'fuels';

export const fundPredicate = async (
  wallet: WalletUnlocked,
  predicate: Predicate<T, C>,
  amountToPredicate: BigNumberish,
  utxosAmount: number = 1
): Promise<BN> => {
  const baseAssetId = wallet.provider.getBaseAssetId();
  const request = new ScriptTransactionRequest();

  for (let i = 0; i < utxosAmount; i++) {
    request.addCoinOutput(
      predicate.address,
      new BN(amountToPredicate).div(utxosAmount),
      baseAssetId
    );
  }

  const txCost = await wallet.getTransactionCost(request);
  request.gasLimit = txCost.gasUsed;
  request.maxFee = txCost.maxFee;
  await wallet.fund(request, txCost);

  const submit = await wallet.sendTransaction(request);
  await submit.waitForResult();

  return predicate.getBalance();
};
