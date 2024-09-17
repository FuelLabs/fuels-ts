import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';
import { FuelError, toBytes } from 'fuels';
import { expectToThrowFuelError } from 'fuels/test-utils';

import { U8_MAX, U8_MAX_ENCODED, U8_MIN, U8_MIN_ENCODED } from '../constants';
import { AbiProjectsEnum, getAbiForcProject } from '../utils';

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

describe('types_bool', () => {
  const fn = contract.functions.types_bool;

  describe('encode', () => {
    it('should encode value [true]', () => {
      const value = true;
      const expected = new Uint8Array([1]);

      const encoded = fn.output.encode(value);

      expect(encoded).toStrictEqual(expected);
    });

    it('should encode value [false]', () => {
      const value = false;
      const expected = new Uint8Array([0]);

      const encoded = fn.output.encode(value);

      expect(encoded).toStrictEqual(expected);
    });

    it.todo('should fail to encode value [max + 1]', async () => {
      const value = 2;

      await expectToThrowFuelError(
        () => fn.output.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid bool value.')
      );
    });

    it.todo('should fail to encode value [string]', async () => {
      const value = 'true';

      await expectToThrowFuelError(
        () => fn.output.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid bool value.')
      );
    });
  });

  describe('decode', () => {
    it('should decode [true]', () => {
      const value = new Uint8Array([1]);
      const expected = true;

      const decoded = fn.output.decode(value);

      expect(decoded).toStrictEqual(expected);
    });

    it('should decode [false]', () => {
      const value = new Uint8Array([0]);
      const expected = false;

      const decoded = fn.output.decode(value);

      expect(decoded).toStrictEqual(expected);
    });

    it.todo('should fail to decode value [max + 1]', async () => {
      const value = new Uint8Array([2]);

      await expectToThrowFuelError(
        () => fn.output.encode(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid bool value.')
      );
    });

    it.todo('should fail to decode value [string]', async () => {
      const value = toBytes('true');

      await expectToThrowFuelError(
        () => fn.output.encode(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid bool value.')
      );
    });
  });
});
