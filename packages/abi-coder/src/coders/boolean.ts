import { zeroPad } from '@ethersproject/bytes';
import { toArray, toBigInt } from '@fuel-ts/math';

import Coder from './abstract-coder';

export default class BooleanCoder extends Coder<boolean, boolean> {
  constructor() {
    super('boolean', 'boolean', 8);
  }

  encode(value: boolean): Uint8Array {
    let bytes;

    try {
      bytes = toArray(value ? 1 : 0);
    } catch (error) {
      this.throwError('Invalid bool', value);
    }
    if (bytes.length > 1) {
      this.throwError('Invalid bool', value);
    }

    return zeroPad(bytes, 8);
  }

  decode(data: Uint8Array, offset: number): [boolean, number] {
    const bytes = toBigInt(data.slice(offset, offset + 8));
    if (bytes === 0n) {
      return [false, offset + 8];
    }
    if (bytes !== 1n) {
      this.throwError('Invalid boolean value', bytes);
    }
    return [true, offset + 8];
  }
}
