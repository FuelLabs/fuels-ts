import { hexlify, arrayify } from '@ethersproject/bytes';
import { AbstractAddress } from '@fuel-ts/interfaces';
import { toBigInt } from '@fuel-ts/math';

import Coder from './abstract-coder';

export default class B256Coder extends Coder<string, string> {
  constructor() {
    super('b256', 'b256', 32);
  }

  encode(value: string | AbstractAddress): Uint8Array {
    if (value instanceof AbstractAddress) {
      return value.byteAddress;
    }

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

    if (toBigInt(bytes) === 0n) {
      bytes = new Uint8Array(32);
    }

    if (bytes.length !== 32) {
      this.throwError('Invalid size for b256', bytes);
    }
    return [hexlify(bytes), offset + 32];
  }
}
