import { toUtf8String } from './toUtf8String';

/**
 * @group node
 * @group browser
 */
describe('toUtf8String', () => {
  beforeAll(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should convert valid UTF-8 bytes to a string', () => {
    const bytes = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);
    expect(toUtf8String(bytes)).toEqual('Hello World');
  });

  it('should handle multi-byte characters', () => {
    const bytes = new Uint8Array([0xe2, 0x82, 0xac]); // '€' symbol
    expect(toUtf8String(bytes)).toEqual('€');
  });

  it('should handle invalid continuation bytes', () => {
    const bytes = new Uint8Array([0xc2, 0x61]); // Invalid continuation byte
    expect(toUtf8String(bytes)).toEqual('');
  });

  it('should handle overlong sequences', () => {
    const bytes = new Uint8Array([0xc0, 0xaf]); // Overlong sequence
    expect(toUtf8String(bytes)).toEqual('');
  });

  it('should handle out-of-range code points', () => {
    const bytes = new Uint8Array([0xf4, 0x90, 0x80, 0x80]); // Out-of-range code point
    expect(toUtf8String(bytes)).toEqual('');
  });

  it('should handle UTF-16 surrogate code points', () => {
    const bytes = new Uint8Array([0xed, 0xa0, 0x80]); // UTF-16 surrogate code point
    expect(toUtf8String(bytes)).toEqual('');
  });

  it('should handle missing continuation bytes', () => {
    const bytes = new Uint8Array([0xe2, 0x82]); // Missing continuation byte
    expect(toUtf8String(bytes)).toEqual('');
  });

  it('should handle overrun bytes', () => {
    const bytes = new Uint8Array([0xe2]); // Overrun byte
    expect(toUtf8String(bytes)).toEqual('');
  });
});
