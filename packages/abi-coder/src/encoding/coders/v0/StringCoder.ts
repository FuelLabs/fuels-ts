import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { concat } from '@fuel-ts/utils';
import { toUtf8Bytes, toUtf8String } from 'ethers';

import { Coder } from './AbstractCoder';

export class StringCoder<TLength extends number = number> extends Coder<string, string> {
  length: TLength;
  #paddingLength: number;

  constructor(length: TLength) {
    let paddingLength = (8 - length) % 8;
    paddingLength = paddingLength < 0 ? paddingLength + 8 : paddingLength;
    super('string', `str[${length}]`, length + paddingLength);
    this.length = length;
    this.#paddingLength = paddingLength;
  }

  encode(value: string): Uint8Array {
    if (this.length !== value.length) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Value length mismatch during encode.`);
    }

    const encoded = toUtf8Bytes(value);
    const padding = new Uint8Array(this.#paddingLength);
    return concat([encoded, padding]);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid string data size.`);
    }

    const bytes = data.slice(offset, offset + this.length);

    if (bytes.length !== this.length) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid string byte data size.`);
    }

    const value = toUtf8String(bytes);

    const padding = this.#paddingLength;
    return [value, offset + this.length + padding];
  }
}
