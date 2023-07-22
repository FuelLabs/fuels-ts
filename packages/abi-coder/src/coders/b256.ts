import { arrayify } from '@ethersproject/bytes';
import { bn, toHex } from '@fuel-ts/math';

import { Coder } from './abstract-coder';

export class B256Coder extends Coder<string, string> {
  constructor() {
    super('b256', 'b256', 32);
  }

  encode(value: string): Uint8Array {
    let encodedValue;
    try {
      encodedValue = arrayify(value);
    } catch (error) {
      this.throwError(`Invalid ${this.type}`, value);
    }
    if (encodedValue.length !== 32) {
      this.throwError(`Invalid ${this.type}`, value);
    }
    return encodedValue;
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    let bytes = data.slice(offset, offset + 32);
    const decoded = bn(bytes);
    if (decoded.isZero()) {
      bytes = new Uint8Array(32);
    }
    if (bytes.length !== 32) {
      this.throwError('Invalid size for b256', bytes);
    }
    return [toHex(bytes, 32), offset + 32];
  }
}
