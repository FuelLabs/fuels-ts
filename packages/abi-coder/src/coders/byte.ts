import { bn, toBytes } from '@fuel-ts/math';

import Coder from './abstract-coder';

export default class ByteCoder extends Coder<number, number> {
  length: number;
  
  constructor(padding: boolean = true) {
    super('byte', 'byte', padding ? 8 : 1);
    this.length = padding ? 8 : 1;
  }

  encode(value: number): Uint8Array {
    let bytes;

    try {
      bytes = toBytes(value, 1);
    } catch (error) {
      this.throwError('Invalid Byte', value);
    }

    return toBytes(bytes, this.length);
  }

  decode(data: Uint8Array, offset: number): [number, number] {
    const bytes = data.slice(offset, offset + this.length);
    const value = bn(bytes);
    if (value.gt(bn(255))) {
      this.throwError('Invalid Byte', value);
    }
    const byte = Number(value);
    return [byte, offset + this.length];
  }
}
