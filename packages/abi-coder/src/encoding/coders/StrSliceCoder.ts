import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { toUtf8Bytes, toUtf8String } from '@fuel-ts/utils';

import { WORD_SIZE } from '../../utils/constants';

import { Coder } from './AbstractCoder';
import { BigNumberCoder } from './BigNumberCoder';

export class StrSliceCoder extends Coder<string, string> {
  static memorySize = 1;
  constructor() {
    super('strSlice', 'str', WORD_SIZE);
  }

  encode(value: string): Uint8Array {
    const bytes = toUtf8Bytes(value);
    const lengthBytes = new BigNumberCoder('u64').encode(value.length);

    return new Uint8Array([...lengthBytes, ...bytes]);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid string slice data size.`);
    }

    const offsetAndLength = offset + WORD_SIZE;
    const lengthBytes = data.slice(offset, offsetAndLength);
    const length = bn(new BigNumberCoder('u64').decode(lengthBytes, 0)[0]).toNumber();
    const bytes = data.slice(offsetAndLength, offsetAndLength + length);

    if (bytes.length !== length) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid string slice byte data size.`);
    }

    return [toUtf8String(bytes), offsetAndLength + length];
  }
}
