import { zeroPad } from '@ethersproject/bytes';
import { toArray, toBigInt, toNumber } from '@fuel-ts/math';

import Coder from './abstract-coder';

type NumberCoderType = 'u8' | 'u16' | 'u32' | 'u64';

type ToDecodedType<TType extends NumberCoderType> = TType extends 'u64' ? bigint : number;

export default class NumberCoder<TType extends NumberCoderType> extends Coder {
  // This is to align the bits to the total bytes
  // See https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#unsigned-integers
  length: number;
  baseType: TType;
  static MAX_SAFE_INTEGER: number;

  constructor(localName: string, baseType: TType) {
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

  encode(value: number | bigint): Uint8Array {
    let bytes = new Uint8Array();

    try {
      bytes = toArray(value);
    } catch (error) {
      this.throwError(`Invalid ${this.baseType}`, value);
    }
    if (bytes.length > this.length) {
      this.throwError(`Invalid ${this.baseType}`, value);
    }

    return zeroPad(bytes, 8);
  }

  decode(data: Uint8Array, offset: number): [ToDecodedType<TType>, number] {
    let bytes = data.slice(offset, offset + 8);
    bytes = bytes.slice(8 - this.length, 8);
    const num = (
      this.baseType === 'u64' ? toBigInt(bytes) : toNumber(bytes)
    ) as ToDecodedType<TType>;
    return [num, offset + 8];
  }
}
