import { ErrorCode } from '@fuel-ts/errors';
import { bn, toHex } from '@fuel-ts/math';
import { getBytesCopy } from 'ethers';

import { Coder } from '../abstract-coder';

export class B512Coder extends Coder<string, string> {
  constructor() {
    super('b512', 'struct B512', 64);
  }

  encode(value: string): Uint8Array {
    let encodedValue;
    try {
      encodedValue = getBytesCopy(value);
    } catch (error) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (encodedValue.length !== 64) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return encodedValue;
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    let bytes = data.slice(offset, offset + 64);
    const decoded = bn(bytes);
    if (decoded.isZero()) {
      bytes = new Uint8Array(64);
    }
    if (bytes.length !== 64) {
      this.throwError(ErrorCode.DECODE_ERROR, `Invalid size for b512.`);
    }
    return [toHex(bytes, 64), offset + 64];
  }
}
