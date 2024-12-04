import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

export function splitUTXOs(
  balance: BN,
  amount: BN,
  assetId: string,
  destination: AbstractAddress,
  number_of_coins: number = 2
): { amount: BN; assetId: string; destination: string }[] {
  if (balance.lte(0)) {
    throw new FuelError(ErrorCode.INVALID_DATA, 'Balance must be greater than zero');
  }
  const coins = balance.divRound(amount);
  const splitInto = Math.min(coins.toNumber(), number_of_coins);

  return new Array(splitInto).fill({
    amount,
    assetId,
    destination,
  });
}
