import { BN } from '@fuel-ts/math';
import type { Account } from '@fuel-ts/wallet';

export const assertBalance = async (account: Account, value: number, assetId: string) => {
  const balance = await account.getBalance(assetId);

  expect(new BN(balance).toNumber()).toEqual(value);
};
