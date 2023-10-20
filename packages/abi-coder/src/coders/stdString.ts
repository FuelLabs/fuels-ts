import { bn } from '@fuel-ts/math';
import { concatBytes } from '@fuel-ts/utils';
import { toUtf8Bytes, toUtf8String } from 'ethers';

import { WORD_SIZE } from '../constants';
import type { Uint8ArrayWithDynamicData } from '../utilities';
import { BASE_VECTOR_OFFSET, concatWithDynamicData } from '../utilities';

import { Coder } from './abstract-coder';
import { U64Coder } from './u64';

export class StdStringCoder extends Coder<string, string> {
  static memorySize = 1;
  constructor() {
    super('struct', 'struct String', 1);
  }

  encode(value: string): Uint8Array {
    const parts: Uint8Array[] = [];

    // pointer (ptr)
    const pointer: Uint8ArrayWithDynamicData = new U64Coder().encode(BASE_VECTOR_OFFSET);

    // pointer dynamicData, encode the string vector now and attach to its pointer
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

  #getPaddedData(value: string): Uint8Array {
    const data: Uint8Array[] = [toUtf8Bytes(value)];

    const paddingLength = (WORD_SIZE - (value.length % WORD_SIZE)) % WORD_SIZE;
    if (paddingLength) {
      data.push(new Uint8Array(paddingLength));
    }

    return concatBytes(data);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    const len = data.slice(16, 24);
    const length = bn(new U64Coder().decode(len, 0)[0]).toNumber();
    const byteData = data.slice(BASE_VECTOR_OFFSET, BASE_VECTOR_OFFSET + length);
    const value = toUtf8String(byteData);
    return [value, offset + BASE_VECTOR_OFFSET];
  }
}
