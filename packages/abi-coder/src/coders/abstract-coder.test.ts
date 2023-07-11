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

describe('Coder', () => {
  const coder = new TestCoder();

  it('should set offset', () => {
    expect(coder.offset).toBeUndefined();

    coder.setOffset(8);
    expect(coder.offset).toBe(8);
  });
});
