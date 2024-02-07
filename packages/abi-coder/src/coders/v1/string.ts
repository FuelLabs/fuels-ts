import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { toUtf8Bytes, toUtf8String } from 'ethers';

import { Coder } from '../abstract-coder';

export class StringCoder<TLength extends number = number> extends Coder<string, string> {
  constructor(length: TLength) {
    super('string', `str[${length}]`, length);
  }

  encode(value: string): Uint8Array {
    if (value.length !== this.encodedLength) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Value length mismatch during encode.`);
    }

    return toUtf8Bytes(value);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid string data size.`);
    }

    const bytes = data.slice(offset, offset + this.encodedLength);

    if (bytes.length !== this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid string byte data size.`);
    }

    return [toUtf8String(bytes), offset + this.encodedLength];
  }
}
