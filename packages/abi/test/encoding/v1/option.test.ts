import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { AbiEncoding } from '../../../src';

describe('enum', () => {
  describe('encode', () => {
    it('should encode a value [Some]', () => {
      const coder = AbiEncoding.v1.option({ None: AbiEncoding.v1.void, Some: AbiEncoding.v1.u8 });
      const value = 100;

      const actual = coder.encode(value);

      const expected = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 1, 100]);
      expect(actual).toEqual(expected);
    });

    it('should encode a value [None]', () => {
      const coder = AbiEncoding.v1.option({ None: AbiEncoding.v1.void, Some: AbiEncoding.v1.u8 });
      const value = undefined;

      const actual = coder.encode(value);

      const expected = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]);
      expect(actual).toEqual(expected);
    });

    it('should encode a value [None - optional]', () => {
      const coder = AbiEncoding.v1.option({ None: AbiEncoding.v1.void, Some: AbiEncoding.v1.u8 });

      // @ts-expect-error optional value
      const actual = coder.encode();

      const expected = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]);
      expect(actual).toEqual(expected);
    });

    it('should throw when encoding [malformed value]', async () => {
      const coder = AbiEncoding.v1.option({ None: AbiEncoding.v1.void, Some: AbiEncoding.v1.u8 });
      const value = 'malformed value';

      await expectToThrowFuelError(
        // @ts-expect-error invalid option value
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, `Invalid option value - malformed value.`, {
          value,
        })
      );
    });
  });

  describe('decode', () => {
    it('should decode a value [Some]', () => {
      const coder = AbiEncoding.v1.option({ None: AbiEncoding.v1.void, Some: AbiEncoding.v1.u8 });
      const input = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 1, 100]);
      const expected = 100;

      const [decoded, length] = coder.decode(input, 0);

      expect(decoded).toEqual(expected);
      expect(length).toEqual(9);
    });

    it('should decode a value [None]', () => {
      const coder = AbiEncoding.v1.option({ None: AbiEncoding.v1.void, Some: AbiEncoding.v1.u8 });
      const input = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]);
      const expected = undefined;

      const [decoded, length] = coder.decode(input, 0);

      expect(decoded).toEqual(expected);
      expect(length).toEqual(8);
    });

    it('should throw when decoding [malformed value]', async () => {
      const coder = AbiEncoding.v1.option({ None: AbiEncoding.v1.void, Some: AbiEncoding.v1.u8 });
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);

      await expectToThrowFuelError(
        () => coder.decode(data, 0),
        new FuelError(FuelError.CODES.DECODE_ERROR, `Invalid option data - invalid case element.`, {
          data,
          paths: [{ path: 'Some', error: 'Invalid u8 data - unexpected length.' }],
        })
      );
    });
  });
});
