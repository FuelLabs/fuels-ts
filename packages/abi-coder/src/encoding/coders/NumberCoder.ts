import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { toNumber, toBytes } from '@fuel-ts/math';

import type { EncodingOptions } from '../../types/EncodingOptions';
import { WORD_SIZE } from '../../utils/constants';

import { Coder } from './AbstractCoder';

type NumberCoderType = 'u8' | 'u16' | 'u32';

const getLength = (baseType: NumberCoderType): number => {
  switch (baseType) {
    case 'u8':
      return 1;
    case 'u16':
      return 2;
    case 'u32':
      return 4;
    default:
      throw new FuelError(ErrorCode.TYPE_NOT_SUPPORTED, `Invalid number type: ${baseType}`);
  }
};

export class NumberCoder extends Coder<number, number> {
  baseType: NumberCoderType;
  options: EncodingOptions;

  constructor(
    baseType: NumberCoderType,
    options: EncodingOptions = {
      padToWordSize: false,
    }
  ) {
    const length = options.padToWordSize ? WORD_SIZE : getLength(baseType);
    super('number', baseType, length);
    this.baseType = baseType;
    this.options = options;
  }

  encode(value: number | string): Uint8Array {
    let bytes;

    try {
      bytes = toBytes(value);
    } catch (error) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }

    if (bytes.length > this.encodedLength) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    }

    return toBytes(bytes, this.encodedLength);
  }

  decode(data: Uint8Array, offset: number): [number, number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid number data size.`);
    }

    const bytes = data.slice(offset, offset + this.encodedLength);

    if (bytes.length !== this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid number byte data size.`);
    }

    return [toNumber(bytes), offset + this.encodedLength];
  }
}
