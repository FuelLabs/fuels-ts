import Coder from './abstract-coder';

export default class EmptyCoder extends Coder<undefined, undefined> {
  constructor() {
    super('()', '()', 0);
  }

  encode(value: undefined): Uint8Array {
    return new Uint8Array();
  }

  decode(data: Uint8Array, offset: number): [undefined, number] {
    return [undefined, this.encodedLength];
  }
}
