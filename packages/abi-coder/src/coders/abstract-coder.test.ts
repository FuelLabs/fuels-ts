import Coder from './abstract-coder';

jest.mock('@ethersproject/logger', () => ({
  __esModule: true,
  ...jest.requireActual('@ethersproject/logger'),
  Logger: jest.fn().mockImplementation(() => ({
    throwArgumentError: jest.fn().mockImplementation(() => null),
  })),
}));

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
  afterEach(jest.restoreAllMocks);

  const coder = new TestCoder();

  it('should throw unreachable on throwError', () => {
    expect(() => coder.throwError('test', 'test')).toThrowError('unreachable');
  });

  it('should set offset', () => {
    expect(coder.offset).toBeUndefined();

    coder.setOffset(8);
    expect(coder.offset).toBe(8);
  });
});
