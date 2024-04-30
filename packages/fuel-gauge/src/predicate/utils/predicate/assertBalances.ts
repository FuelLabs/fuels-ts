import { bn, toHex } from 'fuels';
import type { BN, BigNumberish, WalletLocked } from 'fuels';

export const assertBalances = async (
  receiver: WalletLocked,
  initialReceiverBalance: BN,
  amountToReceiver: BigNumberish
): Promise<void> => {
  expect(initialReceiverBalance.toHex()).toEqual(toHex(0));

  // Check the balance of the receiver
  const finalReceiverBalance = await receiver.getBalance();
  expect(bn(initialReceiverBalance).add(amountToReceiver).toHex()).toEqual(
    finalReceiverBalance.toHex()
  );
};
