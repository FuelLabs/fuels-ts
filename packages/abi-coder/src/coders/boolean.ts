import { ErrorCode } from '@fuel-ts/errors';
import { bn, toBytes } from '@fuel-ts/math';

import { Coder } from './abstract-coder';

export class BooleanCoder extends Coder<boolean, boolean> {
  paddingLength: number;

  constructor(isArray: boolean = false) {
    const paddingLength = isArray ? 1 : 8;
    super('boolean', 'boolean', paddingLength);

    this.paddingLength = paddingLength;
  }

  encode(value: boolean): Uint8Array {
    const isTrueBool = value === true || value === false;
    if (!isTrueBool) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Invalid boolean value.`);
    }

    return toBytes(value ? 8 : 0, 8);
  }

  decode(data: Uint8Array, offset: number): [boolean, number] {
    const bytes = bn(data.slice(offset, offset + this.paddingLength));
    if (bytes.isZero()) {
      return [false, offset + this.paddingLength];
    }
    if (!bytes.eq(bn(1))) {
      this.throwError(ErrorCode.DECODE_ERROR, `Invalid boolean value.`);
    }
    return [true, offset + this.paddingLength];
  }
}
