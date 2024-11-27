import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';
import { FuelError, toBytes } from 'fuels';
import { expectToThrowFuelError } from 'fuels/test-utils';

import { AbiProjectsEnum, getAbiForcProject } from '../utils';

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

describe('types_bool', () => {
  const fn = contract.functions.types_bool;

  describe('encode', () => {
    it('should encode value [true]', () => {
      const value = true;
      const expected = new Uint8Array([1]);

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode value [false]', () => {
      const value = false;
      const expected = new Uint8Array([0]);

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to encode value [max + 1]', async () => {
      const value = 2;

      await expectToThrowFuelError(
        () => fn.encodeOutput(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid bool value.')
      );
    });

    it.todo('should fail to encode value [string]', async () => {
      const value = 'true';

      await expectToThrowFuelError(
        () => fn.encodeOutput(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid bool value.')
      );
    });
  });

  describe('decode', () => {
    it('should decode value [true]', () => {
      const value = new Uint8Array([1]);
      const expected = true;

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should decode value [false]', () => {
      const value = new Uint8Array([0]);
      const expected = false;

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to decode value [max + 1]', async () => {
      const value = new Uint8Array([2]);

      await expectToThrowFuelError(
        () => fn.encodeOutput(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid bool value.')
      );
    });

    it.todo('should fail to decode value [string]', async () => {
      const value = toBytes('true');

      await expectToThrowFuelError(
        () => fn.encodeOutput(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid bool value.')
      );
    });
  });
});
