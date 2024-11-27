import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';
import { FuelError } from 'fuels';
import { expectToThrowFuelError } from 'fuels/test-utils';

import { U16_MAX, U32_MAX, U32_MAX_ENCODED, U32_MIN, U32_MIN_ENCODED, U8_MAX } from '../constants';
import { AbiProjectsEnum, getAbiForcProject } from '../utils';

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

describe('types_u32', () => {
  const fn = contract.functions.types_u32;
  const U32_MIN_MINUS_ONE = U32_MIN - 1;
  const U32_MIN_MINUS_ONE_ENCODED = new Uint8Array([U32_MIN_MINUS_ONE]);
  const U32_MAX_PLUS_ONE = U32_MAX + 1;
  const U32_MAX_PLUS_ONE_ENCODED = new Uint8Array([U32_MAX_PLUS_ONE]);

  describe('encode', () => {
    it('should encode value [min]', () => {
      const value = U32_MIN;
      const expected = U32_MIN_ENCODED;

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode value [max]', () => {
      const value = U32_MAX;
      const expected = U32_MAX_ENCODED;

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode value [u8]', () => {
      const value = U8_MAX;
      const expected = new Uint8Array([0, 0, 0, U8_MAX]);

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode value [u16]', () => {
      const value = U16_MAX;
      const expected = new Uint8Array([0, 0, U8_MAX, U8_MAX]);

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to encode value [min - 1]', async () => {
      const value = U32_MIN_MINUS_ONE;

      await expectToThrowFuelError(
        () => fn.encodeOutput(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid U32 value.')
      );
    });

    it.todo('should fail to encode value [max + 1]', async () => {
      const value = U32_MAX_PLUS_ONE;

      await expectToThrowFuelError(
        () => fn.encodeOutput(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid U32 value.')
      );
    });
  });

  describe('decode', () => {
    it('should decode value [min]', () => {
      const value = U32_MIN_ENCODED;
      const expected = U32_MIN;

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should decode value [max]', () => {
      const value = U32_MAX_ENCODED;
      const expected = U32_MAX;

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should decode value [u8]', () => {
      const value = new Uint8Array([0, 0, 0, U8_MAX]);
      const expected = U8_MAX;

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should decode value [u16]', () => {
      const value = new Uint8Array([0, 0, U8_MAX, U8_MAX]);
      const expected = U16_MAX;

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to decode value [min - 1]', async () => {
      const value = U32_MIN_MINUS_ONE_ENCODED;

      await expectToThrowFuelError(
        () => fn.decodeOutput(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u32 value.')
      );
    });

    it.todo('should fail to decode value [max + 1]', async () => {
      const value = U32_MAX_PLUS_ONE_ENCODED;

      await expectToThrowFuelError(
        () => fn.decodeOutput(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u32 value.')
      );
    });
  });
});
