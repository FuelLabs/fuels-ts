import { zeroPad } from '@ethersproject/bytes';
import { toArray, toBigInt, toNumber } from '@fuel-ts/math';

import Coder from './abstract-coder';

type NumberCoderType = 'u8' | 'u16' | 'u32' | 'u64';

type ToDecodedType<TBaseType extends NumberCoderType> = TBaseType extends 'u64' ? bigint : number;

export default class NumberCoder<TBaseType extends NumberCoderType = NumberCoderType> extends Coder<
  number | bigint,
  ToDecodedType<TBaseType>
> {
  // This is to align the bits to the total bytes
  // See https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#unsigned-integers
  length: number;
  baseType: TBaseType;

  constructor(baseType: TBaseType) {
    super('number', baseType);
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
    let bytes;

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

  #decodeBigInt(data: Uint8Array, offset: number): [bigint, number] {
    let bytes = data.slice(offset, offset + 8);
    bytes = bytes.slice(8 - this.length, 8);
    const num = toBigInt(bytes);
    return [num, offset + 8];
  }

  decode(data: Uint8Array, offset: number): [ToDecodedType<TBaseType>, number] {
    const [num, nextOffset] = this.#decodeBigInt(data, offset);
    if (this.baseType === 'u64') {
      return [num as ToDecodedType<TBaseType>, nextOffset];
    }
    return [toNumber(num) as ToDecodedType<TBaseType>, nextOffset];
  }
}
