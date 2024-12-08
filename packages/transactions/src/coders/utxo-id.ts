import { Coder } from '@fuel-ts/abi';

import { coders } from './coders';

export type UtxoId = {
  /** Transaction ID (b256) */
  transactionId: string;
  /** Output index (u8) */
  outputIndex: number;
};

const utxoIdCoder: Coder<UtxoId, UtxoId> = coders.struct({
  transactionId: coders.b256,
  outputIndex: coders.u16,
});

export class UtxoIdCoder extends Coder<UtxoId, UtxoId> {
  override type = 'UtxoId';

  encode(value: UtxoId): Uint8Array {
    return utxoIdCoder.encode(value);
  }

  decode(data: Uint8Array, offset: number): [UtxoId, number] {
    return utxoIdCoder.decode(data, offset);
  }
}
