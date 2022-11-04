import type { BytesLike } from '@ethersproject/bytes';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';

/**
 * A Fuel message
 */
export type Message = {
  sender: AbstractAddress;
  recipient: AbstractAddress;
  nonce: BN;
  amount: BN;
  data: BytesLike;
  daHeight: BN;
  fuelBlockSpend: BN;
};
