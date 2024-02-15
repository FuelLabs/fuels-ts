import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { toNumber, toBytes } from '@fuel-ts/math';

import { Coder } from '../AbstractCoder';

type NumberCoderType = 'u8' | 'u16' | 'u32' | 'u64';

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
  length: number;
  baseType: NumberCoderType;

  constructor(baseType: NumberCoderType) {
    const length = getLength(baseType);
    super('number', baseType, length);
    this.baseType = baseType;
    this.length = length;
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

    return toBytes(bytes, this.length);
  }

  decode(data: Uint8Array, offset: number): [number, number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid number data size.`);
    }

    const bytes = data.slice(offset, offset + this.length);

    if (bytes.length !== this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid number byte data size.`);
    }

    return [toNumber(bytes), offset + this.length];
  }
}
