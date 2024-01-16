import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn, toHex } from '@fuel-ts/math';
import { arrayify } from '@fuel-ts/utils';

import { WORD_SIZE } from '../constants';

import { Coder } from './abstract-coder';

export class B512Coder extends Coder<string, string> {
  constructor() {
    super('b512', 'struct B512', WORD_SIZE * 8);
  }

  encode(value: string): Uint8Array {
    let encodedValue;
    try {
      encodedValue = arrayify(value);
    } catch (error) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (encodedValue.length !== this.encodedLength) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return encodedValue;
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid b512 data size.`);
    }

    let bytes = data.slice(offset, offset + this.encodedLength);

    const decoded = bn(bytes);
    if (decoded.isZero()) {
      bytes = new Uint8Array(64);
    }

    if (bytes.length !== this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid b512 byte data size.`);
    }

    return [toHex(bytes, this.encodedLength), offset + this.encodedLength];
  }
}
