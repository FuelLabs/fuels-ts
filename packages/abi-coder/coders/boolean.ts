import { BigNumber as BN } from '@ethersproject/bignumber';
import { Coder } from './abstract-coder';
import { getBytes, pad } from './utilities';

export default class BooleanCoder extends Coder {
  constructor(localName: string) {
    super('boolean', 'boolean', localName);
  }

  encode(value: boolean): Uint8Array {
    let bytes = new Uint8Array();

    try {
      bytes = getBytes(value ? 1 : 0);
    } catch (error) {
      this.throwError('Invalid bool', value);
    }
    if (bytes.length > 1) {
      this.throwError('Invalid bool', value);
    }

    return pad(bytes, 8);
  }

  decode(data: Uint8Array, offset: number): [boolean, number] {
    const bytes = BN.from(data.slice(offset, offset + 8));
    if (bytes.toNumber() === 0) {
      return [false, offset + 8];
    } else if (bytes.toNumber() === 1) {
      return [true, offset + 8];
    } else {
      this.throwError('Invalid boolean value', bytes);
      return [false, offset + 8];
    }
  }
}
