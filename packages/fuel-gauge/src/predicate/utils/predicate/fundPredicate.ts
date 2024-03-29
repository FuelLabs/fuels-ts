import { ScriptTransactionRequest } from 'fuels';
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

  const baseAssetId = wallet.provider.getBaseAssetId();

  request.addCoinOutput(predicate.address, amountToPredicate, baseAssetId);
  const { minFee, requiredQuantities, gasUsed } = await wallet.provider.getTransactionCost(request);
  request.gasLimit = gasUsed;
  await wallet.fund(request, requiredQuantities, minFee);

  await wallet.sendTransaction(request, { awaitExecution: true });

  return predicate.getBalance();
};
