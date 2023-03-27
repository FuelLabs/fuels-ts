import { arrayify } from '@ethersproject/bytes';
import { bn, toHex } from '@fuel-ts/math';

import Coder from './abstract-coder';

export default class B512Coder extends Coder<string, string> {
  constructor() {
    super('b512', 'struct B512', 64);
  }

  encode(value: string): Uint8Array {
    let encodedValue;
    try {
      encodedValue = arrayify(value);
    } catch (error) {
      this.throwError(`Invalid ${this.type}`, value);
    }
    if (encodedValue.length !== 64) {
      this.throwError(`Invalid ${this.type}`, value);
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
      this.throwError('Invalid size for b512', bytes);
    }
    return [toHex(bytes, 64), offset + 64];
  }
}
