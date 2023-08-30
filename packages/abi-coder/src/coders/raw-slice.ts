import type { BN } from '@fuel-ts/math';

import { Coder } from './abstract-coder';
import { ArrayCoder } from './array';
import { U64Coder } from './u64';

export class RawSliceCoder extends Coder<number[], BN[]> {
  constructor() {
    super('struct', 'struct Bytes', 1);
  }

  encode(value: number[]): Uint8Array {
    return new Uint8Array();
  }

  decode(data: Uint8Array, offset: number): [BN[], number] {
    const internalCoder = new ArrayCoder(new U64Coder(), data.length / 8);
    const decoded = internalCoder.decode(data, offset);

    return decoded;
  }
}
