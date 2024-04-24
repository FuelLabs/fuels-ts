import { ScriptTransactionRequest } from 'fuels';
import type { InputValue, BN, BigNumberish, WalletUnlocked, Predicate } from 'fuels';

export const fundPredicate = async <T extends InputValue[]>(
  wallet: WalletUnlocked,
  predicate: Predicate<T>,
  amountToPredicate: BigNumberish
): Promise<BN> => {
  const baseAssetId = wallet.provider.getBaseAssetId();
  const request = new ScriptTransactionRequest();

  request.addCoinOutput(predicate.address, amountToPredicate, baseAssetId);
  const txCost = await wallet.provider.getTransactionCost(request);
  request.gasLimit = txCost.gasUsed;
  request.maxFee = txCost.maxFee;
  await wallet.fund(request, txCost);

  await wallet.sendTransaction(request, { awaitExecution: true });

  return predicate.getBalance();
};
