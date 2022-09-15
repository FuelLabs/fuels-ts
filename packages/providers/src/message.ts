import type { BN } from '@fuel-ts/math';

/**
 * A Fuel message
 */
export type Message = {
  owner: string;
  amount: BN;
  sender: string;
  recipient: string;
  data: number[];
  nonce: BN;
};
