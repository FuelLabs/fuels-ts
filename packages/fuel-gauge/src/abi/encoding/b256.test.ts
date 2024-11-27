import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';
import { FuelError, toBytes } from 'fuels';
import { expectToThrowFuelError } from 'fuels/test-utils';

import { B256_DECODED, B256_ENCODED } from '../constants';
import { AbiProjectsEnum, getAbiForcProject } from '../utils';

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

describe('types_b256', () => {
  const fn = contract.functions.types_b256;

  describe('encode', () => {
    it('should encode value [valid b256 hex]', () => {
      const value = B256_DECODED;
      const expected = B256_ENCODED;

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to encode value [too short]', async () => {
      const value = B256_DECODED.slice(-1);

      await expectToThrowFuelError(
        () => fn.encodeOutput(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b256 value.')
      );
    });

    it.todo('should fail to encode value [too long]', async () => {
      const value = `${B256_DECODED}PLUS`;

      await expectToThrowFuelError(
        () => fn.encodeOutput(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b256 value.')
      );
    });

    it.todo('should fail to encode value [not a hex]', async () => {
      const value = `not a hex value`;

      await expectToThrowFuelError(
        () => fn.encodeOutput(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b256 value.')
      );
    });
  });

  describe('decode', () => {
    it('should decode value [valid b256 hex]', () => {
      const value = B256_ENCODED;
      const expected = B256_DECODED;

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to decode value [too short]', async () => {
      const value = B256_ENCODED.slice(-1);

      await expectToThrowFuelError(
        () => fn.decodeOutput(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid b256 value.')
      );
    });

    it.todo('should fail to decode value [too long]', async () => {
      const value = new Uint8Array([...B256_ENCODED, 0]);

      await expectToThrowFuelError(
        () => fn.decodeOutput(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid b256 value.')
      );
    });

    it.todo('should fail to decode value [not hex]', async () => {
      const value = toBytes('not a hex value');

      await expectToThrowFuelError(
        () => fn.decodeOutput(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid b256 value.')
      );
    });
  });
});
