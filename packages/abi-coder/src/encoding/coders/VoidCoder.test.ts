import { VoidCoder } from './VoidCoder';

/**
 * @group node
 * @group browser
 */
describe('VoidCoder', () => {
  it('should have properties', () => {
    const coder = new VoidCoder();
    expect(coder.name).toEqual('void');
    expect(coder.type).toEqual('()');
    expect(coder.encodedLength).toEqual(0);
  });

  describe('encode', () => {
    it('should return an empty Uint8Array', () => {
      const input = undefined;
      const expected = new Uint8Array([]);

      const coder = new VoidCoder();
      const value = coder.encode(input);
      expect(value).toEqual(expected);
    });
  });

  describe('decode', () => {
    it('should return an undefined result', () => {
      const input = new Uint8Array([]);
      const expected = undefined;
      const expectedOffset = 0;

      const coder = new VoidCoder();
      const [value, offset] = coder.decode(input, 0);
      expect(value).toEqual(expected);
      expect(offset).toEqual(expectedOffset);
    });
  });
});
