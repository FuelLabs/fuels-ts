import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { Uint8ArrayWithDynamicData } from '../../../utils/utilities';
import { BASE_RAW_SLICE_OFFSET, concatWithDynamicData } from '../../../utils/utilities';
import { Coder } from '../AbstractCoder';

import { ArrayCoder } from './ArrayCoder';
import { BigNumberCoder } from './BigNumberCoder';
import { NumberCoder } from './NumberCoder';

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
    const pointer: Uint8ArrayWithDynamicData = new BigNumberCoder('u64').encode(
      BASE_RAW_SLICE_OFFSET
    );

    // pointer dynamicData, encode the vector now and attach to its pointer
    pointer.dynamicData = {
      0: concatWithDynamicData(value.map((v) => coder.encode(v))),
    };

    parts.push(pointer);

    // length (len)
    parts.push(new BigNumberCoder('u64').encode(value.length));

    return concatWithDynamicData(parts);
  }

  decode(data: Uint8Array, offset: number): [number[], number] {
    const dataBytes = data.slice(offset);
    const internalCoder = new ArrayCoder(
      new NumberCoder('u8', { isSmallBytes: true }),
      dataBytes.length
    );
    const [decodedValue] = internalCoder.decode(dataBytes, 0);

    return [decodedValue, offset + dataBytes.length];
  }
}
