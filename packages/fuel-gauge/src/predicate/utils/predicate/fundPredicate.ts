import { BaseAssetId, ScriptTransactionRequest } from 'fuels';
import type { InputValue, BN, BigNumberish, WalletUnlocked, Predicate } from 'fuels';

export const fundPredicate = async <T extends InputValue[]>(
  wallet: WalletUnlocked,
  predicate: Predicate<T>,
  amountToPredicate: BigNumberish
): Promise<BN> => {
  const request = new ScriptTransactionRequest();

  request.addCoinOutput(predicate.address, amountToPredicate, BaseAssetId);
  const { minFee, requiredQuantities, gasUsed, maxFee } =
    await wallet.provider.getTransactionCost(request);
  request.gasLimit = gasUsed;
  request.maxFee = maxFee;
  await wallet.fund(request, requiredQuantities, minFee);

  await wallet.sendTransaction(request, { awaitExecution: true });

  return predicate.getBalance();
};
