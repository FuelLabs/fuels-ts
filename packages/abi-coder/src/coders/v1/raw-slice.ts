import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn, type BN } from '@fuel-ts/math';

import { WORD_SIZE } from '../../constants';
import { Coder } from '../abstract-coder';
import { ArrayCoder } from '../v0/array';
import { NumberCoder } from '../v0/number';
import { U64Coder } from '../v0/u64';

export class RawSliceCoder extends Coder<number[], number[]> {
  constructor() {
    super('raw untyped slice', 'raw untyped slice', WORD_SIZE);
  }

  encode(_value: number[]): Uint8Array {
    throw new FuelError(ErrorCode.ENCODE_ERROR, `Raw Slice encode unsupported in v1`);
    return new Uint8Array();
  }

  decode(data: Uint8Array, offset: number): [number[], number] {
    const offsetAndLength = offset + WORD_SIZE;
    const lengthBytes = data.slice(offset, offsetAndLength);
    const length = bn(new U64Coder().decode(lengthBytes, 0)[0]).toNumber();
    const dataBytes = data.slice(offsetAndLength, offsetAndLength + length);
    const internalCoder = new ArrayCoder(new NumberCoder('u8'), length);
    const [decodedValue] = internalCoder.decode(dataBytes, 0);

    return [decodedValue, offsetAndLength + length];
  }
}
