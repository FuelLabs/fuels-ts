import { arrayify } from './arrayify';

describe('arrayify', () => {
  it('returns Uint8Array from Uint8Array', () => {
    expect(arrayify(new Uint8Array([0, 1, 2, 3]))).toEqual(new Uint8Array([0, 1, 2, 3]));
  });

  it('returns Uint8Array from hex string', () => {
    expect(arrayify('0x00010203')).toEqual(new Uint8Array([0, 1, 2, 3]));
  });

  it('returns Uint8Array from Buffer', () => {
    expect(arrayify(Buffer.from('20'))).toEqual(new Uint8Array([50, 48]));
  });

  it('throws for invalid string', () => {
    expect(() => arrayify('nope')).toThrow();
  });
});
