import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';
import { FuelError } from 'fuels';
import { expectToThrowFuelError } from 'fuels/test-utils';

import { U8_MAX, U8_MAX_ENCODED, U8_MIN, U8_MIN_ENCODED } from '../constants';
import { AbiProjectsEnum, getAbiForcProject } from '../utils';

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

describe('types_u8', () => {
  const fn = contract.functions.types_u8;
  const U8_MIN_MINUS_ONE = U8_MIN - 1;
  const U8_MIN_MINUS_ONE_ENCODED = new Uint8Array([U8_MIN_MINUS_ONE]);
  const U8_MAX_PLUS_ONE = U8_MAX + 1;
  const U8_MAX_PLUS_ONE_ENCODED = new Uint8Array([U8_MAX_PLUS_ONE]);

  describe('encode', () => {
    it('should encode value [min]', () => {
      const value = U8_MIN;
      const expected = U8_MIN_ENCODED;

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode value [max]', () => {
      const value = U8_MAX;
      const expected = U8_MAX_ENCODED;

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode value [u8]', () => {
      const value = U8_MAX;
      const expected = new Uint8Array([U8_MAX]);

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to encode value [min - 1]', async () => {
      const value = U8_MAX;

      await expectToThrowFuelError(
        () => fn.encodeOutput(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8 value.')
      );
    });

    it.todo('should fail to encode value [max + 1]', async () => {
      const value = U8_MAX;

      await expectToThrowFuelError(
        () => fn.encodeOutput(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8 value.')
      );
    });
  });

  describe('decode', () => {
    it('should decode value [min]', () => {
      const value = U8_MIN_ENCODED;
      const expected = U8_MIN;

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should decode value [max]', () => {
      const value = U8_MIN_ENCODED;
      const expected = U8_MIN;

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should decode value [u8]', () => {
      const value = new Uint8Array([U8_MAX]);
      const expected = U8_MAX;

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to decode value [min - 1]', async () => {
      const value = U8_MIN_MINUS_ONE_ENCODED;

      await expectToThrowFuelError(
        () => fn.decodeOutput(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8 value.')
      );
    });

    it.todo('should fail to decode value [max + 1]', async () => {
      const value = U8_MAX_PLUS_ONE_ENCODED;

      await expectToThrowFuelError(
        () => fn.decodeOutput(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8 value.')
      );
    });
  });
});
