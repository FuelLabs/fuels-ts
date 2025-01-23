import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { encoding } from '../../../src';

/**
 * @group node
 * @group browser
 */
describe('u16', () => {
  describe('encode', () => {
    it('should encode a u16 [min = 0]', () => {
      const coder = encoding.v1.u16;
      const expected = new Uint8Array([0, 0]);
      const value = 0;

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it(`should encode a u16 [max = 65535]`, () => {
      const coder = encoding.v1.u16;
      const expected = new Uint8Array([255, 255]);
      const value = 65535;

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should fail to encode value [min - 1 = -1]', async () => {
      const coder = encoding.v1.u16;
      const value = -1;

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          'Invalid u16 value - value is less than zero.',
          {
            value: '-1',
            type: 'u16',
          }
        )
      );
    });

    it(`should fail to encode value [max + 1 = 65536]`, async () => {
      const coder = encoding.v1.u16;
      const value = 65536;

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u16 value - value exceeds maximum.', {
          value: '65536',
          type: 'u16',
        })
      );
    });
  });

  describe('decode', () => {
    it('should decode a u16 [min]', () => {
      const coder = encoding.v1.u16;
      const expected = 0;
      const data = new Uint8Array([0, 0]);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(2);
    });

    it(`should decode a u16 [max = 65535]`, () => {
      const coder = encoding.v1.u16;
      const expected = 65535;
      const data = new Uint8Array([255, 255]);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(2);
    });

    it('should throw when decoding invalid u16 data [empty]', async () => {
      const coder = encoding.v1.u16;
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u16 data - unexpected length.', {
          data: new Uint8Array([]),
          type: 'u16',
          expectedLength: 2,
        })
      );
    });

    it('should throw when decoding invalid u16 data [empty with offset]', async () => {
      const coder = encoding.v1.u16;
      const data = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]);

      await expectToThrowFuelError(
        () => coder.decode(data, 8),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u16 data - unexpected length.', {
          data: new Uint8Array([]),
          type: 'u16',
          expectedLength: 2,
        })
      );
    });
  });
});
