import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

/**
 * A Fuel message
 */
export type Message = {
  amount: BN;
  sender: AbstractAddress;
  recipient: AbstractAddress;
  data: number[];
  daHeight: BN;
  nonce: BN;
};
