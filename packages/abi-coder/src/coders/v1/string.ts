import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { toUtf8Bytes, toUtf8String } from 'ethers';

import { Coder } from '../abstract-coder';

export class StringCoder<TLength extends number = number> extends Coder<string, string> {
  length: TLength;
  constructor(length: TLength) {
    super('string', `str[${length}]`, length);
    this.length = length;
  }

  encode(value: string): Uint8Array {
    if (this.length !== value.length) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Value length mismatch during encode.`);
    }

    return toUtf8Bytes(value);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    const bytes = data.slice(offset, offset + this.length);
    const value = toUtf8String(bytes);

    return [value, offset + this.length];
  }
}
