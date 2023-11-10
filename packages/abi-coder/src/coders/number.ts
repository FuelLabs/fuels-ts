import { ErrorCode } from '@fuel-ts/errors';
import { toNumber, toBytes } from '@fuel-ts/math';

import { WORD_SIZE } from '../constants';

import { Coder } from './abstract-coder';

type NumberCoderType = 'u8' | 'u16' | 'u32';

export class NumberCoder extends Coder<number, number> {
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
      this.throwError(ErrorCode.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }

    if (bytes.length > this.length) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    }

    return toBytes(bytes, 8);
  }

  decode(data: Uint8Array, offset: number): [number, number] {
    if (data.length < WORD_SIZE) {
      this.throwError(ErrorCode.DECODE_ERROR, 'Invalid number data size.');
    }

    const byteDataLength = WORD_SIZE;
    let bytes = data.slice(offset, offset + byteDataLength);
    bytes = bytes.slice(8 - this.length, 8);

    if (bytes.length !== byteDataLength - (WORD_SIZE - this.length)) {
      this.throwError(ErrorCode.DECODE_ERROR, 'Invalid number byte data size.');
    }

    return [toNumber(bytes), offset + 8];
  }
}
