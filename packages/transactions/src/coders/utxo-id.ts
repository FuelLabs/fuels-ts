import type { Coder } from '@fuel-ts/abi';

import { coders } from './coders';

export type UtxoId = {
  /** Transaction ID (b256) */
  transactionId: string;
  /** Output index (u8) */
  outputIndex: number;
};

export const utxoIdCoder: Coder<UtxoId, UtxoId> = coders.struct({
  transactionId: coders.b256,
  outputIndex: coders.u16,
});
