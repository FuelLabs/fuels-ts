import { bn, toHex, toNumber } from 'fuels';
import type { InputValue, BN, BigNumberish, WalletLocked, Predicate } from 'fuels';

export const assertBalances = async <T extends InputValue[]>(
  predicate: Predicate<T>,
  receiver: WalletLocked,
  initialPredicateBalance: BN,
  initialReceiverBalance: BN,
  amountToPredicate: BigNumberish,
  amountToReceiver: BigNumberish
): Promise<void> => {
  // Check there are UTXO locked with the predicate hash
  expect(toNumber(initialPredicateBalance)).toBeGreaterThanOrEqual(toNumber(amountToPredicate));
  // !isSkippingInitialReceiverBalance && expect(initialReceiverBalance.toHex()).toEqual(toHex(0));
  expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

  // Check the balance of the receiver
  const finalReceiverBalance = await receiver.getBalance();
  expect(bn(initialReceiverBalance).add(amountToReceiver).toHex()).toEqual(
    finalReceiverBalance.toHex()
  );

  // Check we spent the entire predicate hash input
  const finalPredicateBalance = await predicate.getBalance();
  expect(finalPredicateBalance.lte(initialPredicateBalance)).toBeTruthy();
};
