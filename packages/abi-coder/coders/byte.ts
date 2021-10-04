import { BigNumber as BN } from '@ethersproject/bignumber';
import Coder from './abstract-coder';
import { getBytes, pad } from './utilities';

export default class ByteCoder extends Coder {
  constructor(localName: string) {
    super('byte', 'byte', localName);
  }

  encode(value: string): Uint8Array {
    let bytes = new Uint8Array();

    try {
      bytes = getBytes(value);
    } catch (error) {
      this.throwError('Invalid Byte', value);
    }
    if (bytes.length > 1) {
      this.throwError('Invalid Byte', value);
    }

    return pad(bytes, 8);
  }

  decode(data: Uint8Array, offset: number): [BN, number] {
    const bytes = BN.from(data.slice(offset, offset + 8));
    return [bytes, offset + 8];
  }
}
