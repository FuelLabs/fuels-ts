import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { toUtf8String } from 'ethers';

import { WORD_SIZE } from '../../../constants';
import { Coder } from '../abstract-coder';
import { U64Coder } from '../v0/u64';

export class StrSliceCoder extends Coder<string, string> {
  static memorySize = 1;
  constructor() {
    super('strSlice', 'str', WORD_SIZE);
  }

  encode(_value: string): Uint8Array {
    throw new FuelError(ErrorCode.ENCODE_ERROR, `String slice encode unsupported in v1`);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid string slice data size.`);
    }

    const offsetAndLength = offset + WORD_SIZE;
    const lengthBytes = data.slice(offset, offsetAndLength);
    const length = bn(new U64Coder().decode(lengthBytes, 0)[0]).toNumber();
    const bytes = data.slice(offsetAndLength, offsetAndLength + length);

    if (bytes.length !== length) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid string slice byte data size.`);
    }

    return [toUtf8String(bytes), offsetAndLength + length];
  }
}
