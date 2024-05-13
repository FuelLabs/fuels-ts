import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';

import { WORD_SIZE } from '../../utils/constants';

import { Coder } from './AbstractCoder';
import { ArrayCoder } from './ArrayCoder';
import { BigNumberCoder } from './BigNumberCoder';
import { NumberCoder } from './NumberCoder';

export class RawSliceCoder extends Coder<number[], number[]> {
  constructor() {
    super('raw untyped slice', 'raw untyped slice', WORD_SIZE);
  }

  encode(value: number[]): Uint8Array {
    if (!Array.isArray(value)) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Expected array value.`);
    }

    const internalCoder = new ArrayCoder(new NumberCoder('u8'), value.length);
    const bytes = internalCoder.encode(value);
    const lengthBytes = new BigNumberCoder('u64').encode(bytes.length);

    return new Uint8Array([...lengthBytes, ...bytes]);
  }

  decode(data: Uint8Array, offset: number): [number[], number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid raw slice data size.`);
    }

    const offsetAndLength = offset + WORD_SIZE;
    const lengthBytes = data.slice(offset, offsetAndLength);
    const length = bn(new BigNumberCoder('u64').decode(lengthBytes, 0)[0]).toNumber();
    const dataBytes = data.slice(offsetAndLength, offsetAndLength + length);

    if (dataBytes.length !== length) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid raw slice byte data size.`);
    }

    const internalCoder = new ArrayCoder(new NumberCoder('u8'), length);
    const [decodedValue] = internalCoder.decode(dataBytes, 0);

    return [decodedValue, offsetAndLength + length];
  }
}
