import { NumberCoder } from './NumberCoder';
import { OptionCoder } from './OptionCoder';
import { VoidCoder } from './VoidCoder';

/**
 * @group node
 * @group browser
 */
describe('OptionCoder', () => {
  const coder = new OptionCoder('std::option::Option', {
    Some: new NumberCoder('u8'),
    None: new VoidCoder(),
  });

  describe('encode', () => {
    it('should encode a Some value', () => {
      const encoded = coder.encode(100);

      const expected = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0, 100]);
      expect(encoded).toEqual(expected);
    });

    it('should encode a None value', () => {
      const encoded = coder.encode(undefined);

      const expected = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 1]);
      expect(encoded).toEqual(expected);
    });

    it('should encode a None value [optional]', () => {
      const encoded = coder.encode();

      const expected = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 1]);
      expect(encoded).toEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode a Some value', () => {
      const input = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0, 100]);
      const expected = [100, 9];

      const decoded = coder.decode(input, 0);

      expect(decoded).toEqual(expected);
    });

    it('should decode a None value', () => {
      const input = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 1]);
      const expected = [undefined, 8];

      const decoded = coder.decode(input, 0);

      expect(decoded).toEqual(expected);
    });
  });
});
