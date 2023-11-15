import { ErrorCode } from '@fuel-ts/errors';
import { bn, toBytes } from '@fuel-ts/math';

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

    return toBytes(value ? 8 : 0, 8);
  }

  decode(data: Uint8Array, offset: number): [boolean, number] {
    const bytes = bn(data.slice(offset, offset + 8));
    if (bytes.isZero()) {
      return [false, offset + 8];
    }
    if (!bytes.eq(bn(1))) {
      this.throwError(ErrorCode.DECODE_ERROR, `Invalid boolean value.`);
    }
    return [true, offset + 8];
  }
}
