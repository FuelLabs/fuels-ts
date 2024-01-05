import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { concat } from '@fuel-ts/utils';

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
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Expected array value.`);
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
    const data: Uint8Array[] = [Uint8Array.from(value)];

    const paddingLength = (WORD_SIZE - (value.length % WORD_SIZE)) % WORD_SIZE;
    if (paddingLength) {
      data.push(new Uint8Array(paddingLength));
    }

    return concat(data);
  }

  decode(data: Uint8Array, offset: number): [Uint8Array, number] {
    if (data.length < BASE_VECTOR_OFFSET) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid byte data size.`);
    }

    const len = data.slice(16, 24);
    const encodedLength = bn(new U64Coder().decode(len, 0)[0]).toNumber();
    const byteData = data.slice(BASE_VECTOR_OFFSET, BASE_VECTOR_OFFSET + encodedLength);

    if (byteData.length !== encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid bytes byte data size.`);
    }

    return [byteData, offset + BASE_VECTOR_OFFSET];
  }
}
