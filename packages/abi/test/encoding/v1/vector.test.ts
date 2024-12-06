import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';

import type { AbiTypeComponent, GetCoderParams } from '../../../src';
import { AbiEncoding, MAX_BYTES } from '../../../src';

/**
 * @group node
 * @group browser
 */
describe('vector', () => {
  describe('fromAbi', () => {
    it('should throw when a component is not provided', async () => {
      const encoding = AbiEncoding.from('1');
      const swayType = 'struct std::vec::Vec<u64>';
      const components: AbiTypeComponent[] | undefined = undefined;
      const getCoder = vi.fn();

      await expectToThrowFuelError(
        () =>
          encoding.coders.vector.fromAbi(
            { type: { swayType, components } } as GetCoderParams,
            getCoder
          ),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'The provided vector type is missing ABI components.',
          { swayType, components }
        )
      );
    });

    it('should throw when a "buf" component is not provided', async () => {
      const encoding = AbiEncoding.from('1');
      const swayType = 'struct std::vec::Vec<u64>';
      const components: AbiTypeComponent[] = [];
      const getCoder = vi.fn();

      await expectToThrowFuelError(
        () =>
          encoding.coders.vector.fromAbi(
            { type: { swayType, components } } as GetCoderParams,
            getCoder
          ),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'The provided vector type is missing ABI component "buf".',
          { swayType, components }
        )
      );
    });

    it('should get the coder for a valid vector type', () => {
      const encoding = AbiEncoding.from('1');
      const swayType = 'struct std::vec::Vec<u64>';
      const components: AbiTypeComponent[] = [
        {
          name: 'buf',
          type: {
            swayType: 'u64',
            concreteTypeId: 'some_hash',
          },
        },
      ];
      const getCoder = vi.fn();

      const coder = encoding.coders.vector.fromAbi(
        { type: { swayType, components } } as GetCoderParams,
        getCoder
      );

      expect(coder).toBeDefined();
    });
  });

  describe('encode', () => {
    it('should encode a vector of booleans [true, false, true, false, true, true]', () => {
      const coder = AbiEncoding.v1.vector(AbiEncoding.v1.bool);
      const value = [true, false, true, false, true, true];
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 1, 0, 1, 1]);

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode a vector of numbers [8, 6, 7]', () => {
      const coder = AbiEncoding.v1.vector(AbiEncoding.v1.u8);
      const value = Uint8Array.from([8, 6, 7]);
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 8, 6, 7]);

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should throw when encoding non array input', async () => {
      const coder = AbiEncoding.v1.vector(AbiEncoding.v1.u8);
      const value = 'Nope';

      await expectToThrowFuelError(
        // @ts-expect-error - testing invalid input
        () => coder.encode(value),
        new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          'Invalid vector value - expected array value, or a Uint8Array.',
          { value }
        )
      );
    });

    it('should throw when encoding a vector with a value that cannot be encoded', async () => {
      const coder = AbiEncoding.v1.vector(AbiEncoding.v1.u8);
      const value = [256];

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8 value - value exceeds maximum.', {
          type: 'u8',
          value: '256',
        })
      );
    });
  });

  describe('decode', () => {
    it('should decode a vector of booleans [true, false, true, false, true, true]', () => {
      const coder = AbiEncoding.v1.vector(AbiEncoding.v1.bool);
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 1, 0, 1, 1]);
      const expected = [true, false, true, false, true, true];

      const [actual, newOffset] = coder.decode(data, 0);

      expect(actual).toStrictEqual(expected);
      expect(newOffset).toEqual(14);
    });

    it('should decode a vector of numbers [8, 6, 7]', () => {
      const coder = AbiEncoding.v1.vector(AbiEncoding.v1.u8);
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 8, 6, 7]);
      const expected = [8, 6, 7];

      const [actual, newOffset] = coder.decode(data, 0);

      expect(actual).toStrictEqual(expected);
      expect(newOffset).toEqual(11);
    });

    it('should decode a vector of numbers [empty]', () => {
      const coder = AbiEncoding.v1.vector(AbiEncoding.v1.u8);
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
      const expected: number[] = [];

      const [actual, newOffset] = coder.decode(data, 0);

      expect(actual).toStrictEqual(expected);
      expect(newOffset).toEqual(8);
    });

    it('should throw when decoding empty vector', async () => {
      const coder = AbiEncoding.v1.vector(AbiEncoding.v1.u8);
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data, 0),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid vector data - malformed bytes.', {
          data,
        })
      );
    });

    it('should throw when decoding vector with element data missing', async () => {
      const coder = AbiEncoding.v1.vector(AbiEncoding.v1.u8);
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2, 1]);

      await expectToThrowFuelError(
        () => coder.decode(data, 0),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u8 data - unexpected length.', {
          data: new Uint8Array([]),
          expectedLength: 1,
          type: 'u8',
        })
      );
    });

    it('should throw when decoding an array over the max vec size [VM constraints]', async () => {
      const coder = AbiEncoding.v1.vector(AbiEncoding.v1.u8);
      const data = new Uint8Array(MAX_BYTES);

      await expectToThrowFuelError(
        () => coder.decode(data, 0),
        new FuelError(
          FuelError.CODES.DECODE_ERROR,
          'Invalid vector data - exceeds maximum bytes.',
          {
            data,
            length: data.length,
            maxLength: MAX_BYTES,
          }
        )
      );
    });
  });
});
