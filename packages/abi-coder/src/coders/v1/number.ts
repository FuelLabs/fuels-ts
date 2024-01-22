import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { toNumber, toBytes } from '@fuel-ts/math';

import { Coder } from '../abstract-coder';

type NumberCoderType = 'u8' | 'u16' | 'u32' | 'u64';

const getLength = (baseType: NumberCoderType): number => {
  switch (baseType) {
    case 'u8':
      return 1;
    case 'u16':
      return 2;
    case 'u32':
      return 4;
    case 'u64':
      return 8;
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
      this.throwError(ErrorCode.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }

    if (bytes.length > this.length) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    }

    return toBytes(bytes, this.length);
  }

  decode(data: Uint8Array, offset: number): [number, number] {
    const bytes = data.slice(offset, offset + this.length);

    return [toNumber(bytes), offset + this.length];
  }
}
