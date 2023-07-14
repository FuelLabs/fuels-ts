import { Coder } from './abstract-coder';

class TestCoder extends Coder {
  constructor() {
    super('test', 'test', 8);
  }

  encode(_value: unknown): Uint8Array {
    return new Uint8Array();
  }

  decode(_data: Uint8Array, _offset: number): [boolean, number] {
    return [false, 8];
  }
}
