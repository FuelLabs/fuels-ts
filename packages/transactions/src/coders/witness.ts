import type { BigNumber } from '@ethersproject/bignumber';
import { arrayify, concat, hexlify } from '@ethersproject/bytes';
import { Coder, NumberCoder } from '@fuel-ts/abi-coder';

export type Witness = {
  // Length of witness data, in bytes (u16)
  dataLength: BigNumber;
  // Witness data (byte[])
  data: string;
};

export class WitnessCoder extends Coder {
  constructor(localName: string) {
    super('Witness', 'Witness', localName);
  }

  encode(value: Witness): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new NumberCoder('dataLength', 'u16').encode(value.dataLength));
    parts.push(arrayify(value.data));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [Witness, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new NumberCoder('dataLength', 'u16').decode(data, o);
    const dataLength = decoded;
    [decoded, o] = [hexlify(data.slice(o, dataLength.toNumber())), o + dataLength.toNumber()];
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
