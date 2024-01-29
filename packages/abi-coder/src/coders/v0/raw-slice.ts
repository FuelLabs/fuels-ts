import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';

import { WORD_SIZE } from '../../constants';
import type { Uint8ArrayWithDynamicData } from '../../utilities';
import { BASE_RAW_SLICE_OFFSET, concatWithDynamicData } from '../../utilities';
import { Coder } from '../abstract-coder';

import { ArrayCoder } from './array';
import { NumberCoder } from './number';
import { U64Coder } from './u64';

export class RawSliceCoder extends Coder<number[], number[]> {
  constructor() {
    super('raw untyped slice', 'raw untyped slice', BASE_RAW_SLICE_OFFSET);
  }

  encode(value: number[]): Uint8Array {
    if (!Array.isArray(value)) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Expected array value.`);
    }

    const parts: Uint8Array[] = [];
    const coder = new NumberCoder('u8', { isSmallBytes: true });

    // pointer (ptr)
    const pointer: Uint8ArrayWithDynamicData = new U64Coder().encode(BASE_RAW_SLICE_OFFSET);

    // pointer dynamicData, encode the vector now and attach to its pointer
    pointer.dynamicData = {
      0: concatWithDynamicData(value.map((v) => coder.encode(v))),
    };

    parts.push(pointer);

    // length (len)
    parts.push(new U64Coder().encode(value.length));

    return concatWithDynamicData(parts);
  }

  decode(data: Uint8Array, offset: number): [number[], number] {
    if (data.length < BASE_RAW_SLICE_OFFSET) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid raw slice data size.`);
    }

    const lengthOffset = offset + WORD_SIZE;
    const dataOffset = lengthOffset + WORD_SIZE;
    const lengthBytes = data.slice(lengthOffset, lengthOffset + WORD_SIZE);
    const length = bn(new U64Coder().decode(lengthBytes, 0)[0]).toNumber();

    const dataBytes = data.slice(dataOffset, dataOffset + length);
    const internalCoder = new ArrayCoder(new NumberCoder('u8', { isSmallBytes: true }), length);
    const [decodedValue] = internalCoder.decode(dataBytes, 0);

    return [decodedValue, BASE_RAW_SLICE_OFFSET + length];
  }
}
