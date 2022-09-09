import { toNumber, toBytes } from '@fuel-ts/math';

import Coder from './abstract-coder';

type NumberCoderType = 'u8' | 'u16' | 'u32';

export default class NumberCoder extends Coder<number, number> {
  // This is to align the bits to the total bytes
  // See https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#unsigned-integers
  length: number;
  baseType: NumberCoderType;

  constructor(baseType: NumberCoderType) {
    super('number', baseType, 8);
    this.baseType = baseType;
    switch (baseType) {
      case 'u8':
        this.length = 1;
        break;
      case 'u16':
        this.length = 2;
        break;
      case 'u32':
      default:
        this.length = 4;
        break;
    }
  }

  encode(value: number | string): Uint8Array {
    let bytes;

    try {
      bytes = toBytes(value);
    } catch (error) {
      this.throwError(`Invalid ${this.baseType}`, value);
    }

    if (bytes.length > this.length) {
      this.throwError(`Invalid ${this.baseType}. Too many bytes.`, value);
    }

    return toBytes(bytes, 8);
  }

  decode(data: Uint8Array, offset: number): [number, number] {
    let bytes = data.slice(offset, offset + 8);
    bytes = bytes.slice(8 - this.length, 8);

    return [toNumber(bytes), offset + 8];
  }
}
