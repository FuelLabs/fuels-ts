import { ErrorCode } from '@fuel-ts/errors';
import type { BN, BNInput } from '@fuel-ts/math';
import { bn, toBytes } from '@fuel-ts/math';

import { Coder } from '../abstract-coder';

export class U64Coder extends Coder<BNInput, BN> {
  constructor() {
    super('u64', 'u64', 8);
  }

  encode(value: BNInput): Uint8Array {
    let bytes;

    try {
      bytes = toBytes(value, 8);
    } catch (error) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Invalid ${this.type}.`);
    }

    return bytes;
  }

  decode(data: Uint8Array, offset: number): [BN, number] {
    let bytes = data.slice(offset, offset + 8);
    bytes = bytes.slice(0, 8);

    return [bn(bytes), offset + 8];
  }
}
