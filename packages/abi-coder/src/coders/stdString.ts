import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { concat } from '@fuel-ts/utils';
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

    return concat(data);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid std string data size.`);
    }

    const len = data.slice(16, 24);
    const encodedLength = bn(new U64Coder().decode(len, 0)[0]).toNumber();
    const byteData = data.slice(BASE_VECTOR_OFFSET, BASE_VECTOR_OFFSET + encodedLength);

    if (byteData.length !== encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid std string byte data size.`);
    }

    const value = toUtf8String(byteData);
    return [value, offset + BASE_VECTOR_OFFSET];
  }
}
