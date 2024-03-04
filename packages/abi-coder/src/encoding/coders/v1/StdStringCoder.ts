import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { toUtf8Bytes, toUtf8String } from 'ethers';

import { WORD_SIZE } from '../../../utils/constants';
import { Coder } from '../AbstractCoder';
import { BigNumberCoder } from '../v0/BigNumberCoder';

export class StdStringCoder extends Coder<string, string> {
  static memorySize = 1;
  constructor() {
    super('struct', 'struct String', WORD_SIZE);
  }

  encode(value: string): Uint8Array {
    const bytes = toUtf8Bytes(value);
    const lengthBytes = new BigNumberCoder('u64').encode(value.length);

    return new Uint8Array([...lengthBytes, ...bytes]);
  }

  decode(data: Uint8Array, offset: number): [string, number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid std string data size.`);
    }

    const offsetAndLength = offset + WORD_SIZE;
    const lengthBytes = data.slice(offset, offsetAndLength);
    const length = bn(new BigNumberCoder('u64').decode(lengthBytes, 0)[0]).toNumber();
    const dataBytes = data.slice(offsetAndLength, offsetAndLength + length);

    if (dataBytes.length !== length) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid std string byte data size.`);
    }

    return [toUtf8String(dataBytes), offsetAndLength + length];
  }
}
