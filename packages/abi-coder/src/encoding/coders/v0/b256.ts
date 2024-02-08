import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn, toHex } from '@fuel-ts/math';
import { getBytesCopy } from 'ethers';

import { WORD_SIZE } from '../../../constants';
import { Coder } from '../abstract-coder';

export class B256Coder extends Coder<string, string> {
  constructor() {
    super('b256', 'b256', WORD_SIZE * 4);
  }

  encode(value: string): Uint8Array {
    let encodedValue;
    try {
      encodedValue = getBytesCopy(value);
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
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid b256 data size.`);
    }

    let bytes = data.slice(offset, offset + this.encodedLength);

    const decoded = bn(bytes);
    if (decoded.isZero()) {
      bytes = new Uint8Array(32);
    }

    if (bytes.length !== this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid b256 byte data size.`);
    }

    return [toHex(bytes, 32), offset + 32];
  }
}
