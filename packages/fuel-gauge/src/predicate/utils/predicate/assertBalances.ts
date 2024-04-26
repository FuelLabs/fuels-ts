import { bn, toHex } from 'fuels';
import type { InputValue, BN, BigNumberish, WalletLocked } from 'fuels';

export const assertBalances = async <T extends InputValue[]>(
  receiver: WalletLocked,
  initialReceiverBalance: BN,
  amountToReceiver: BigNumberish
): Promise<void> => {
  // Check there are UTXO locked with the predicate hash
  // !isSkippingInitialReceiverBalance && expect(initialReceiverBalance.toHex()).toEqual(toHex(0));
  expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

  // Check the balance of the receiver
  const finalReceiverBalance = await receiver.getBalance();
  expect(bn(initialReceiverBalance).add(amountToReceiver).toHex()).toEqual(
    finalReceiverBalance.toHex()
  );
};
