import { zeroPad } from '@ethersproject/bytes';
import { toArray, toBigInt } from '@fuel-ts/math';

import Coder from './abstract-coder';

export default class ByteCoder extends Coder<number, number> {
  constructor() {
    super('byte', 'byte', 8);
  }

  encode(value: number): Uint8Array {
    let bytes;

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

  decode(data: Uint8Array, offset: number): [number, number] {
    const bytes = data.slice(offset, offset + 8);
    const value = toBigInt(bytes);
    if (value > 255n) {
      this.throwError('Invalid Byte', value);
    }
    const byte = Number(value);
    return [byte, offset + 8];
  }
}
