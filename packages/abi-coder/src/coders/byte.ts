import { zeroPad } from '@ethersproject/bytes';
import { toArray, toBigInt } from '@fuel-ts/math';

import Coder from './abstract-coder';

export default class ByteCoder extends Coder {
  constructor(localName: string) {
    super('byte', 'byte', localName);
  }

  encode(value: string): Uint8Array {
    let bytes = new Uint8Array();

    try {
      bytes = toArray(value);
    } catch (error) {
      this.throwError('Invalid Byte', value);
    }
    if (bytes.length > 1) {
      this.throwError('Invalid Byte', value);
    }

    return zeroPad(bytes, 8);
  }

  decode(data: Uint8Array, offset: number): [bigint, number] {
    const bytes = toBigInt(data.slice(offset, offset + 8));
    return [bytes, offset + 8];
  }
}
