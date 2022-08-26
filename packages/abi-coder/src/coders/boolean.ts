import { bn, toArray } from '@fuel-ts/math';

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

    return toArray(bytes, 4);
  }

  decode(data: Uint8Array, offset: number): [boolean, number] {
    const bytes = bn(data.slice(offset, offset + 8));
    if (bytes.isZero()) {
      return [false, offset + 8];
    }
    if (!bytes.eq(bn(1))) {
      this.throwError('Invalid boolean value', bytes);
    }
    return [true, offset + 8];
  }
}
