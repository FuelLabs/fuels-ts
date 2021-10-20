import { BigNumber as BN } from '@ethersproject/bignumber';
import { hexlify, arrayify } from '@ethersproject/bytes';

import Coder from './abstract-coder';

export default class B256Coder extends Coder {
  type: string;

  constructor(localName: string, type: string) {
    super('b256', 'b256', localName);
    this.type = type;
  }

  encode(value: string): Uint8Array {
    let encodedValue = new Uint8Array(32);
    try {
      const numericValue = BN.from(value);
      encodedValue = numericValue.isZero() ? encodedValue : arrayify(numericValue);
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

    if (BN.from(bytes).isZero()) {
      bytes = new Uint8Array(32);
    }

    if (bytes.length !== 32) {
      this.throwError('Invalid size for b256', bytes);
    }
    return [hexlify(bytes), offset + 32];
  }
}
