import { Coder, NumberCoder } from '@fuel-ts/abi-coder';
import { concat } from '@fuel-ts/utils';

import { byteArray } from './byte-array';

export type Witness = {
  /** Length of witness data byte array */
  dataLength: number;
  /** Witness data (byte[]) */
  data: string;
};

export class WitnessCoder extends Coder<Witness, Witness> {
  constructor() {
    super(
      'Witness',
      // Types of dynamic length are not supported in the ABI
      'unknown',
      0
    );
  }

  encode(value: Witness): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('u32', { padToWordSize: true }).encode(value.dataLength));
    parts.push(byteArray(value.dataLength).encode(value.data));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [Witness, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('u32', { padToWordSize: true }).decode(data, o);
    const dataLength = decoded;
    [decoded, o] = byteArray(dataLength).decode(data, o);
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
