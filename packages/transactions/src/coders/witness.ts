import { Coder } from '@fuel-ts/abi';
import { concat } from '@fuel-ts/utils';

import { byteArray } from './byte-array';
import { coders } from './coders';

export type Witness = {
  /** Length of witness data byte array */
  dataLength: number;
  /** Witness data (byte[]) */
  data: string;
};

export class WitnessCoder extends Coder<Witness, Witness> {
  override type = 'Witness';

  encode(value: Witness): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(coders.u32.encode(value.dataLength));
    parts.push(byteArray(value.dataLength).encode(value.data));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [Witness, number] {
    let decoded;
    let o = offset;

    [decoded, o] = coders.u32.decode(data, o);
    const dataLength = decoded;
    [decoded, o] = byteArray(dataLength).decode(data, o);
    const witnessData = decoded;

    return [{ dataLength, data: witnessData }, o];
  }
}
