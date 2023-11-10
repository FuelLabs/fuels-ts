import { ErrorCode } from '@fuel-ts/errors';
import type { BN, BNInput } from '@fuel-ts/math';
import { bn, toBytes } from '@fuel-ts/math';

import { WORD_SIZE } from '../constants';

import { Coder } from './abstract-coder';

export class U64Coder extends Coder<BNInput, BN> {
  constructor() {
    super('u64', 'u64', WORD_SIZE);
  }

  encode(value: BNInput): Uint8Array {
    let bytes;

    try {
      bytes = toBytes(value, WORD_SIZE);
    } catch (error) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Invalid ${this.type}.`);
    }

    return bytes;
  }

  decode(data: Uint8Array, offset: number): [BN, number] {
    if (data.length < WORD_SIZE) {
      this.throwError(ErrorCode.DECODE_ERROR, 'Invalid u64 data size.');
    }

    const byteDataLength = WORD_SIZE;
    const byteData = data.slice(offset, offset + byteDataLength);

    if (byteData.length !== byteDataLength) {
      this.throwError(ErrorCode.DECODE_ERROR, 'Invalid u64 byte data size.');
    }

    return [bn(byteData), offset + WORD_SIZE];
  }
}
