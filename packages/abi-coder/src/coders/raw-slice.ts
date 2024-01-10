import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';

import { WORD_SIZE } from '../constants';
import type { Uint8ArrayWithDynamicData } from '../utilities';
import { BASE_RAW_SLICE_OFFSET, concatWithDynamicData } from '../utilities';

import { Coder } from './abstract-coder';
import { ArrayCoder } from './array';
import { U64Coder } from './u64';

export class RawSliceCoder extends Coder<number[], BN[]> {
  constructor() {
    super('raw untyped slice', 'raw untyped slice', BASE_RAW_SLICE_OFFSET);
  }

  encode(value: number[]): Uint8Array {
    if (!Array.isArray(value)) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Expected array value.`);
    }

    const parts: Uint8Array[] = [];
    const coder = new U64Coder();

    // pointer (ptr)
    const pointer: Uint8ArrayWithDynamicData = new U64Coder().encode(BASE_RAW_SLICE_OFFSET);

    // pointer dynamicData, encode the vector now and attach to its pointer
    pointer.dynamicData = {
      0: concatWithDynamicData(value.map((v) => coder.encode(v))),
    };

    parts.push(pointer);

    // length (len)
    parts.push(new U64Coder().encode(value.length * WORD_SIZE));

    return concatWithDynamicData(parts);
  }

  decode(data: Uint8Array, offset: number): [BN[], number] {
    if (data.length < BASE_RAW_SLICE_OFFSET || data.length % WORD_SIZE !== 0) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid raw slice data size.`);
    }

    const internalCoder = new ArrayCoder(new U64Coder(), data.length / WORD_SIZE);
    const decoded = internalCoder.decode(data, offset);

    return decoded;
  }
}
