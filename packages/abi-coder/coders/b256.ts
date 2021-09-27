import { hexlify } from '@ethersproject/bytes';

import { Coder } from './abstract-coder';
import { BigNumber as BN } from '@ethersproject/bignumber';
import { arrayify } from '@ethersproject/bytes';

export default class B256Coder extends Coder {
  type: string;

  constructor(localName: string, type: string) {
    super('b256', 'b256', localName);
    this.type = type;
  }

  encode(value: string): Uint8Array {
    let encodedValue = new Uint8Array();
    try {
      encodedValue = arrayify(BN.from(value));
    } catch (error) {
      this.throwError(`Invalid ${this.type}`, value);
    }

    if (encodedValue.length !== 32) {
      this.throwError(`Invalid ${this.type}`, value);
    }
    return encodedValue;
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    const bytes = data.slice(offset, offset + 32);
    if (bytes.length !== 32) {
      this.throwError('Invalid size for b256', bytes);
    }
    return [hexlify(bytes), offset + 32];
  }
}
