import { ErrorCode } from '@fuel-ts/errors';
import { bn, toHex } from '@fuel-ts/math';
import { getBytesCopy } from 'ethers';

import { WORD_SIZE } from '../constants';

import { Coder } from './abstract-coder';

const encodedLength = WORD_SIZE * 8;

export class B512Coder extends Coder<string, string> {
  constructor() {
    super('b512', 'struct B512', encodedLength);
  }

  encode(value: string): Uint8Array {
    let encodedValue;
    try {
      encodedValue = getBytesCopy(value);
    } catch (error) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (encodedValue.length !== encodedLength) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return encodedValue;
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    if (data.length < encodedLength) {
      this.throwError(ErrorCode.DECODE_ERROR, `Invalid b512 data size.`);
    }

    const byteDataLength = encodedLength;
    let bytes = data.slice(offset, offset + byteDataLength);

    const decoded = bn(bytes);
    if (decoded.isZero()) {
      bytes = new Uint8Array(64);
    }

    if (bytes.length !== byteDataLength) {
      this.throwError(ErrorCode.DECODE_ERROR, `Invalid b512 byte data size.`);
    }

    return [toHex(bytes, encodedLength), offset + encodedLength];
  }
}
