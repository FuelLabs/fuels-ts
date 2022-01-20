import type { BigNumber } from '@ethersproject/bignumber';
import { concat } from '@ethersproject/bytes';
import { B256Coder, Coder, NumberCoder } from '@fuel-ts/abi-coder';

export type UtxoId = {
  /** Transaction ID (b256) */
  transactionId: string;
  /** Output index (u8) */
  outputIndex: BigNumber;
};

export class UtxoIdCoder extends Coder {
  constructor(localName: string) {
    super('UtxoId', 'UtxoId', localName);
  }

  encode(value: UtxoId): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder('transactionId', 'b256').encode(value.transactionId));
    parts.push(new NumberCoder('outputIndex', 'u8').encode(value.outputIndex));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [UtxoId, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder('transactionId', 'b256').decode(data, o);
    const transactionId = decoded;
    [decoded, o] = new NumberCoder('outputIndex', 'u8').decode(data, o);
    const outputIndex = decoded;

    return [
      {
        transactionId,
        outputIndex,
      },
      o,
    ];
  }
}
