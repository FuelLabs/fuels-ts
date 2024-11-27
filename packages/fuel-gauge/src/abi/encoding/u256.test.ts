import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';
import { FuelError } from 'fuels';
import { expectToThrowFuelError } from 'fuels/test-utils';

import { U256_MAX, U256_MAX_ENCODED, U256_MIN, U256_MIN_ENCODED } from '../constants';
import { AbiProjectsEnum, getAbiForcProject } from '../utils';
import { toEqualBn } from '../vitest.matcher';

// @TODO how do we enable this matcher globally?
expect.extend({ toEqualBn });

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

describe('types_u256', () => {
  const fn = contract.functions.types_u256;
  const U256_MIN_MINUS_ONE = U256_MIN - 1;
  const U256_MIN_MINUS_ONE_ENCODED = new Uint8Array([U256_MIN_MINUS_ONE]);
  const U256_MAX_PLUS_ONE = U256_MAX.add(1);
  const U256_MAX_PLUS_ONE_ENCODED = U256_MAX_PLUS_ONE.toBytes();

  describe('encode', () => {
    it('should encode value [min]', () => {
      const value = U256_MIN;
      const expected = U256_MIN_ENCODED;

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode value [max]', () => {
      const value = U256_MAX;
      const expected = U256_MAX_ENCODED;

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to encode value [min - 1]', async () => {
      const value = U256_MIN_MINUS_ONE;

      await expectToThrowFuelError(
        () => fn.output.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid U256 value.')
      );
    });

    it.todo('should fail to encode value [max + 1]', async () => {
      const value = U256_MAX_PLUS_ONE;

      await expectToThrowFuelError(
        () => fn.output.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid U256 value.')
      );
    });
  });

  describe('decode', () => {
    it('should decode value [min]', () => {
      const value = U256_MIN_ENCODED;
      const expected = U256_MIN;

      const actual = fn.output.decode(value);

      // @ts-expect-error toEqualBn is not a function
      expect(actual).toStrictEqual(expect.toEqualBn(expected));
    });

    it('should decode value [max]', () => {
      const value = U256_MAX_ENCODED;
      const expected = U256_MAX;

      const actual = fn.output.decode(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to decode value [min - 1]', async () => {
      const value = U256_MIN_MINUS_ONE_ENCODED;

      await expectToThrowFuelError(
        () => fn.output.decode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u256 value.')
      );
    });

    it.todo('should fail to decode value [max + 1]', async () => {
      const value = U256_MAX_PLUS_ONE_ENCODED;

      await expectToThrowFuelError(
        () => fn.output.decode(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u256 value.')
      );
    });
  });
});
