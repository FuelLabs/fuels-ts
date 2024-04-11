import { getBytes } from './getBytes';

/**
 * @group node
 * @group browser
 */
describe('getBytes', () => {
  it('returns Uint8Array from bytes', () => {
    expect(getBytes(new Uint8Array([0, 1, 2, 3]))).toEqual(new Uint8Array([0, 1, 2, 3]));
  });

  it('returns Uint8Array from hex string', () => {
    expect(getBytes('0x00010203')).toEqual(new Uint8Array([0, 1, 2, 3]));
  });

  it('returns Uint8Array from Buffer', () => {
    expect(getBytes(Buffer.from('20'))).toEqual(new Uint8Array([50, 48]));
  });

  it('throws for invalid string', () => {
    expect(() => getBytes('nope')).toThrow();
  });
});
