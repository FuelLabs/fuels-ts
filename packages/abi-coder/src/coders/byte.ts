import { zeroPad } from '@ethersproject/bytes';
import { bn, BN, toArray } from '@fuel-ts/math';

import Coder from './abstract-coder';

export default class ByteCoder extends Coder<number, number> {
  constructor() {
    super('byte', 'byte', 8);
  }

  encode(value: number): Uint8Array {
    let bytes;

    try {
      bytes = toArray(value, 1);
    } catch (error) {
      this.throwError('Invalid Byte', value);
    }

    return toArray(bytes, 8);
  }

  decode(data: Uint8Array, offset: number): [number, number] {
    const bytes = data.slice(offset, offset + 8);
    const value = bn(bytes);
    if (value.gt(bn(255))) {
      this.throwError('Invalid Byte', value);
    }
    const byte = Number(value);
    return [byte, offset + 8];
  }
}
