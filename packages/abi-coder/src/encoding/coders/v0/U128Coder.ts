import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { toBytes, type BN, type BNInput, bn } from '@fuel-ts/math';

import { WORD_SIZE } from '../../../utils/constants';
import { Coder } from '../AbstractCoder';

export class U128Coder extends Coder<BNInput, BN> {
  constructor() {
    super('u128', 'u128', WORD_SIZE * 2);
  }

  encode(value: BNInput): Uint8Array {
    let bytes;

    try {
      bytes = toBytes(value, WORD_SIZE * 2);
    } catch (error) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Invalid ${this.type}.`);
    }

    return bytes;
  }

  decode(data: Uint8Array, offset: number): [BN, number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid ${this.type} data size.`);
    }

    let bytes = data.slice(offset, offset + WORD_SIZE * 2);
    bytes = bytes.slice(0, WORD_SIZE * 2);

    if (bytes.length !== this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    }

    return [bn(bytes), offset + WORD_SIZE * 2];
  }
}
