import { bn, toHex } from 'fuels';
import type { BN, BigNumberish, WalletUnlocked } from 'fuels';

export const assertBalances = async (
  receiver: WalletUnlocked,
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
