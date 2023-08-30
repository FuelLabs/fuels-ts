import type { BytesLike } from '@ethersproject/bytes';
import { bn } from '@fuel-ts/math';

import type { Uint8ArrayWithDynamicData } from '../utilities';
import { BASE_VECTOR_OFFSET, concatWithDynamicData } from '../utilities';

import { Coder } from './abstract-coder';
import { U64Coder } from './u64';

const MEMORY_SIZE_OF_U8 = 1;

export class ByteCoder extends Coder<number[], Uint8Array> {
  constructor() {
    super('struct', 'struct Bytes', MEMORY_SIZE_OF_U8);
  }

  encode(value: number[]): Uint8Array {
    if (!Array.isArray(value)) {
      this.throwError('expected array value', value);
    }

    const parts: Uint8Array[] = [];

    // pointer (ptr)
    const pointer: Uint8ArrayWithDynamicData = new U64Coder().encode(BASE_VECTOR_OFFSET);
    // pointer dynamicData, encode the vector now and attach to its pointer
    pointer.dynamicData = {
      0: concatWithDynamicData(value as unknown as BytesLike[]),
    };

    parts.push(pointer);

    // capacity (cap)
    parts.push(new U64Coder().encode(value.length));

    // length (len)
    parts.push(new U64Coder().encode(value.length));

    return concatWithDynamicData(parts);
  }

  decode(data: Uint8Array, offset: number): [Uint8Array, number] {
    const len = data.slice(16, 24);
    const length = bn(new U64Coder().decode(len, 0)[0]).toNumber();
    const byteData = data.slice(BASE_VECTOR_OFFSET, BASE_VECTOR_OFFSET + length * 8);

    return [byteData, offset + BASE_VECTOR_OFFSET];
  }
}
