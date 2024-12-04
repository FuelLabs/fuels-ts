import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

/**
 * Split UTXOs into multiple UTXOs
 * @param balance - The balance of the UTXO
 * @param amount - The amount of each UTXO
 * @param assetId - The asset ID of the UTXO
 * @param destination - The destination address for the UTXOs
 * @param number_of_coins - The number of UTXOs to split into
 * @returns An array of the desired UTXOs with the amount, assetId, and destination
 */
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
  if (balance.divRound(amount).lt(number_of_coins)) {
    throw new FuelError(
      ErrorCode.INVALID_DATA,
      'The number of coins to split into is greater than the balance'
    );
  }

  return new Array(number_of_coins).fill({
    amount,
    assetId,
    destination,
  });
}
