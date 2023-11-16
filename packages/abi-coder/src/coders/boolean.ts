import { ErrorCode } from '@fuel-ts/errors';
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
    const paddingLength = options.isSmallBytes ? 8 : 1;

    super('boolean', 'boolean', paddingLength);

    this.paddingLength = paddingLength;
    this.options = options;
  }

  encode(value: boolean): Uint8Array {
    const isTrueBool = value === true || value === false;

    if (!isTrueBool) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Invalid boolean value.`);
    }

    const output: Uint8Array = toBytes(value ? 1 : 0, this.paddingLength);

    if (this.options.isSmallBytes) {
      return output.reverse();
    }

    return output;
  }

  decode(data: Uint8Array, offset: number): [boolean, number] {
    let bytes;

    /**
     * TODO: Add new option flag and replace second condition -> data[offset] !== 0
     */
    if (this.options.isSmallBytes && data[offset] !== 0) {
      bytes = bn(data.slice(offset, 1)); // offset + 1 ?
    } else {
      bytes = bn(data.slice(offset, offset + this.paddingLength));
    }

    if (bytes.isZero()) {
      return [false, offset + this.paddingLength];
    }

    if (!bytes.eq(bn(1))) {
      this.throwError(ErrorCode.DECODE_ERROR, `Invalid boolean value.`);
    }

    return [true, offset + this.paddingLength];
  }
}
