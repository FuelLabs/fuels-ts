import { toBytes, toHex, bn } from '@fuel-ts/math';

import { BASE_VECTOR_OFFSET } from '../utilities';

import { Coder } from './abstract-coder';
import { U64Coder } from './u64';

const MEMORY_SIZE_OF_U8 = 1;

export class ByteCoder extends Coder<number, Uint8Array> {
  constructor() {
    super('struct', 'struct Bytes', MEMORY_SIZE_OF_U8);
  }

  encode(value: number): Uint8Array {
    return new Uint8Array();
  }

  decode(data: Uint8Array, offset: number): [Uint8Array, number] {
    const len = data.slice(16, 24);
    const length = bn(new U64Coder().decode(len, 0)[0]).toNumber();
    const byteData = data.slice(BASE_VECTOR_OFFSET, BASE_VECTOR_OFFSET + length * 8);

    return [byteData, offset + BASE_VECTOR_OFFSET];
  }
}
