import { BigNumber as BN } from '@ethersproject/bignumber';
import { Coder } from './abstract-coder';
import { getBytes, pad } from './utilities';

export default class Number extends Coder {
  // This is to align the bits to the total bytes
  // See https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#unsigned-integers
  length: number;
  baseType: string;

  constructor(localName: string, baseType: string) {
    super('number', 'number', localName);
    this.baseType = baseType;
    switch (baseType) {
      case 'u8':
        this.length = 1;
        break;
      case 'u16':
        this.length = 2;
        break;
      case 'u32':
        this.length = 4;
        break;
      case 'u64':
      default:
        this.length = 8;
        break;
    }
  }

  encode(value: string): Uint8Array {
    let bytes = new Uint8Array();

    try {
      bytes = getBytes(value);
    } catch (error) {
      this.throwError(`Invalid ${this.baseType}`, value);
    }
    if (bytes.length > this.length) {
      this.throwError(`Invalid ${this.baseType}`, value);
    }

    return pad(bytes, 8);
  }

  decode(data: Uint8Array, offset: number): [BN, number] {
    let bytes = data.slice(offset, offset + 8);
    bytes = bytes.slice(8 - this.length, 8);
    return [BN.from(bytes), offset + 8];
  }
}
