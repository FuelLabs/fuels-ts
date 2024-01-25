import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { toUtf8String } from 'ethers';

import { WORD_SIZE } from '../../constants';
import { Coder } from '../abstract-coder';
import { U64Coder } from '../v0/u64';

export class StrSliceCoder extends Coder<number[], string> {
  static memorySize = 1;
  constructor() {
    super('strSlice', 'str', 1);
  }

  encode(_value: number[]): Uint8Array {
    throw new FuelError(ErrorCode.ENCODE_ERROR, `Bytes encode unsupported in v1`);
    return new Uint8Array();
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    const offsetAndLength = offset + WORD_SIZE;
    const lengthBytes = data.slice(offset, offsetAndLength);
    const length = bn(new U64Coder().decode(lengthBytes, 0)[0]).toNumber();
    const bytes = data.slice(offset, offsetAndLength + length);
    const value = toUtf8String(bytes);

    return [value, offsetAndLength + length];
  }
}
