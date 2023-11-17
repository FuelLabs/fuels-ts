import { BaseAssetId, ScriptTransactionRequest } from 'fuels';
import type { InputValue, BN, BigNumberish, WalletUnlocked, Predicate } from 'fuels';

export const fundPredicate = async <T extends InputValue[]>(
  wallet: WalletUnlocked,
  predicate: Predicate<T>,
  amountToPredicate: BigNumberish
): Promise<BN> => {
  const { minGasPrice } = wallet.provider.getGasConfig();

  const request = new ScriptTransactionRequest({
    gasPrice: minGasPrice,
  });

  request.addCoinOutput(predicate.address, amountToPredicate, BaseAssetId);
  const { minFee, requiredQuantities, gasUsed } = await wallet.provider.getTransactionCost(request);
  request.gasLimit = gasUsed;
  await wallet.fund(request, requiredQuantities, minFee);

  const tx = await wallet.sendTransaction(request);
  await tx.waitForResult();

  return predicate.getBalance();
};
