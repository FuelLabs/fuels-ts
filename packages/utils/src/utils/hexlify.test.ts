import { hexlify } from './hexlify';

describe('hexlify', () => {
  it('returns hex from bytes', () => {
    expect(hexlify(new Uint8Array([0, 1, 2, 3]))).toEqual('0x00010203');
  });

  it('returns hex from string', () => {
    expect(hexlify('0x01')).toEqual('0x01');
  });

  it('throws for invalid string', () => {
    expect(() => hexlify('nope')).toThrow();
  });
});
