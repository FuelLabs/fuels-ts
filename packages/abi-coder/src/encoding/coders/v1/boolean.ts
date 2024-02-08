import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn, toBytes } from '@fuel-ts/math';

import { Coder } from '../abstract-coder';

export class BooleanCoder extends Coder<boolean, boolean> {
  constructor() {
    super('boolean', 'boolean', 1);
  }

  encode(value: boolean): Uint8Array {
    const isTrueBool = value === true || value === false;

    if (!isTrueBool) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Invalid boolean value.`);
    }

    return toBytes(value ? 1 : 0, this.encodedLength);
  }

  decode(data: Uint8Array, offset: number): [boolean, number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid boolean data size.`);
    }

    const bytes = bn(data.slice(offset, offset + this.encodedLength));

    if (bytes.isZero()) {
      return [false, offset + this.encodedLength];
    }

    if (!bytes.eq(bn(1))) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid boolean value.`);
    }

    return [true, offset + this.encodedLength];
  }
}
