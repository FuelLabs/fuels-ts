import { concat } from '@ethersproject/bytes';
import { Coder, NumberCoder } from '@fuel-ts/abi-coder';

import { ByteArrayCoder } from './byte-array';

export type Witness = {
  /** Length of witness data, in bytes (u16) */
  dataLength: number;
  /** Witness data (byte[]) */
  data: string;
};

export class WitnessCoder extends Coder {
  constructor(localName: string) {
    super('Witness', 'Witness', localName);
  }

  encode(value: Witness): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('dataLength', 'u16').encode(value.dataLength));
    parts.push(new ByteArrayCoder('data', value.dataLength).encode(value.data));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [Witness, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('dataLength', 'u16').decode(data, o);
    const dataLength = decoded;
    [decoded, o] = new ByteArrayCoder('data', dataLength).decode(data, o);
    const witnessData = decoded;

    return [
      {
        dataLength,
        data: witnessData,
      },
      o,
    ];
  }
}
