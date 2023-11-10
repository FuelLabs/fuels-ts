import { ErrorCode } from '@fuel-ts/errors';
import { bn, toBytes } from '@fuel-ts/math';

import { WORD_SIZE } from '../constants';

import { Coder } from './abstract-coder';

export class BooleanCoder extends Coder<boolean, boolean> {
  constructor() {
    super('boolean', 'boolean', 8);
  }

  encode(value: boolean): Uint8Array {
    const isTrueBool = value === true || value === false;
    if (!isTrueBool) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Invalid boolean value.`);
    }

    return toBytes(value ? 1 : 0, 8);
  }

  decode(data: Uint8Array, offset: number): [boolean, number] {
    if (data.length < WORD_SIZE) {
      this.throwError(ErrorCode.DECODE_ERROR, 'Invalid boolean data size.');
    }

    const byteDataLength = WORD_SIZE;
    const bytes = data.slice(offset, offset + byteDataLength);

    if (bytes.length !== byteDataLength) {
      this.throwError(ErrorCode.DECODE_ERROR, `Invalid boolean byte data size.`);
    }

    const decodedValue = bn(bytes);
    if (decodedValue.isZero()) {
      return [false, offset + WORD_SIZE];
    }

    if (!decodedValue.eq(bn(1))) {
      this.throwError(ErrorCode.DECODE_ERROR, `Invalid boolean value.`);
    }
    return [true, offset + 8];
  }
}
