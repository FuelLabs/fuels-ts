import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { toNumber, toBytes } from '@fuel-ts/math';

import type { EncodingOptions } from '../../../types/EncodingOptions';
import { Coder } from '../AbstractCoder';

type NumberCoderType = 'u8' | 'u16' | 'u32';

export class NumberCoder extends Coder<number, number> {
  // This is to align the bits to the total bytes
  // See https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md#unsigned-integers
  length: number;
  paddingLength: number;
  baseType: NumberCoderType;
  options: EncodingOptions;

  constructor(
    baseType: NumberCoderType,
    options: EncodingOptions = {
      isSmallBytes: false,
      isRightPadded: false,
    }
  ) {
    const paddingLength = options.isSmallBytes && baseType === 'u8' ? 1 : 8;

    super('number', baseType, paddingLength);
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

    this.paddingLength = paddingLength;
    this.options = options;
  }

  encode(value: number | string): Uint8Array {
    let bytes;

    try {
      bytes = toBytes(value);
    } catch (error) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }

    if (bytes.length > this.length) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    }

    const output = toBytes(bytes, this.paddingLength);

    if (this.baseType !== 'u8') {
      return output;
    }

    return this.options.isRightPadded ? output.reverse() : output;
  }

  private decodeU8(data: Uint8Array, offset: number): [number, number] {
    let bytes;
    if (this.options.isRightPadded) {
      bytes = data.slice(offset, offset + 1);
    } else {
      bytes = data.slice(offset, offset + this.paddingLength);
      bytes = bytes.slice(this.paddingLength - this.length, this.paddingLength);
    }

    return [toNumber(bytes), offset + this.paddingLength];
  }

  decode(data: Uint8Array, offset: number): [number, number] {
    if (data.length < this.paddingLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid number data size.`);
    }

    if (this.baseType === 'u8') {
      return this.decodeU8(data, offset);
    }

    let bytes = data.slice(offset, offset + this.paddingLength);
    bytes = bytes.slice(8 - this.length, 8);

    if (bytes.length !== this.paddingLength - (this.paddingLength - this.length)) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid number byte data size.`);
    }

    return [toNumber(bytes), offset + 8];
  }
}
