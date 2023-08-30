import { arrayify, concat, type BytesLike } from '@ethersproject/bytes';
import { bn } from '@fuel-ts/math';

import { WORD_SIZE } from '../constants';
import type { Uint8ArrayWithDynamicData } from '../utilities';
import { BASE_VECTOR_OFFSET, concatWithDynamicData } from '../utilities';

import { Coder } from './abstract-coder';
import { U64Coder } from './u64';

export class ByteCoder extends Coder<number[], Uint8Array> {
  static memorySize = 1;
  constructor() {
    super('struct', 'struct Bytes', BASE_VECTOR_OFFSET);
  }

  encode(value: number[]): Uint8Array {
    if (!Array.isArray(value)) {
      this.throwError('expected array value', value);
    }

    const parts: Uint8Array[] = [];

    // pointer (ptr)
    const pointer: Uint8ArrayWithDynamicData = new U64Coder().encode(BASE_VECTOR_OFFSET);

    // pointer dynamicData, encode the byte vector now and attach to its pointer
    const data = this.#getPaddedData(value);
    pointer.dynamicData = {
      0: concatWithDynamicData([data]),
    };

    parts.push(pointer);

    // capacity (cap)
    parts.push(new U64Coder().encode(data.byteLength));

    // length (len)
    parts.push(new U64Coder().encode(value.length));

    return concatWithDynamicData(parts);
  }

  #getPaddedData(value: number[]): Uint8Array {
    const data: Uint8Array[] = [arrayify(value)];

    const paddingLength = (WORD_SIZE - (value.length % WORD_SIZE)) % WORD_SIZE;
    if (paddingLength) {
      data.push(new Uint8Array(paddingLength));
    }

    return concat(data);
  }

  decode(data: Uint8Array, offset: number): [Uint8Array, number] {
    const len = data.slice(16, 24);
    const length = bn(new U64Coder().decode(len, 0)[0]).toNumber();
    const byteData = data.slice(BASE_VECTOR_OFFSET, BASE_VECTOR_OFFSET + length * 8);

    return [byteData, offset + BASE_VECTOR_OFFSET];
  }
}
