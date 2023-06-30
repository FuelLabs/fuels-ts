import type { InputValue } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/address/configs';
import type { BN, BigNumberish } from '@fuel-ts/math';
import type { WalletUnlocked } from '@fuel-ts/wallet';

import type { Predicate } from '../../src/predicate';

export const fundPredicate = async <T extends InputValue[]>(
  wallet: WalletUnlocked,
  predicate: Predicate<T>,
  amountToPredicate: BigNumberish
): Promise<BN> => {
  const tx = await wallet.transfer(predicate.address, amountToPredicate, NativeAssetId);
  await tx.waitForResult();

  return predicate.getBalance();
};
