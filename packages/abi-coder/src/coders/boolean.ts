import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn, toBytes } from '@fuel-ts/math';

import type { SmallBytesOptions } from './abstract-coder';
import { Coder } from './abstract-coder';

export class BooleanCoder extends Coder<boolean, boolean> {
  paddingLength: number;
  options: SmallBytesOptions;

  constructor(
    options: SmallBytesOptions = {
      isSmallBytes: false,
      isRightPadded: false,
    }
  ) {
    const paddingLength = options.isSmallBytes ? 1 : 8;

    super('boolean', 'boolean', paddingLength);

    this.paddingLength = paddingLength;
    this.options = options;
  }

  encode(value: boolean): Uint8Array {
    const isTrueBool = value === true || value === false;

    if (!isTrueBool) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Invalid boolean value.`);
    }

    const output: Uint8Array = toBytes(value ? 1 : 0, this.paddingLength);

    if (this.options.isRightPadded) {
      return output.reverse();
    }

    return output;
  }

  decode(data: Uint8Array, offset: number): [boolean, number] {
    if (data.length < this.paddingLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid boolean data size.`);
    }

    let bytes;

    if (this.options.isRightPadded) {
      bytes = data.slice(offset, offset + 1);
    } else {
      bytes = data.slice(offset, offset + this.paddingLength);
    }

    const decodedValue = bn(bytes);
    if (decodedValue.isZero()) {
      return [false, offset + this.paddingLength];
    }

    if (!decodedValue.eq(bn(1))) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid boolean value.`);
    }

    return [true, offset + this.paddingLength];
  }
}
