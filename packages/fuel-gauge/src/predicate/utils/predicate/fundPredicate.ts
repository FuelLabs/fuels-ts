import { BaseAssetId } from 'fuels';
import type { InputValue, BN, BigNumberish, WalletUnlocked, Predicate } from 'fuels';

export const fundPredicate = async <T extends InputValue[]>(
  wallet: WalletUnlocked,
  predicate: Predicate<T>,
  amountToPredicate: BigNumberish
): Promise<BN> => {
  const tx = await wallet.transfer(predicate.address, amountToPredicate, BaseAssetId);
  await tx.wait();

  return predicate.getBalance();
};
