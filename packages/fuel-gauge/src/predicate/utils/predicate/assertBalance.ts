import { BN } from 'fuels';
import type { Account } from 'fuels';

export const assertBalance = async (account: Account, value: number, assetId: string) => {
  const balance = await account.getBalance(assetId);

  expect(new BN(balance).toNumber()).toEqual(value);
};
