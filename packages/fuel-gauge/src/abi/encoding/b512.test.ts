import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';
import { FuelError, toBytes } from 'fuels';
import { expectToThrowFuelError } from 'fuels/test-utils';

import { B512_DECODED, B512_ENCODED } from '../constants';
import { AbiProjectsEnum, getAbiForcProject } from '../utils';

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

describe('types_b512', () => {
  const fn = contract.functions.types_b512;

  describe('encode', () => {
    it('should encode value [valid b512 hex]', () => {
      const value = B512_DECODED;
      const expected = B512_ENCODED;

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to encode value [too short]', async () => {
      const value = B512_DECODED.slice(-1);

      await expectToThrowFuelError(
        () => fn.output.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b512 value.')
      );
    });

    it.todo('should fail to encode value [too long]', async () => {
      const value = `${B512_DECODED}PLUS`;

      await expectToThrowFuelError(
        () => fn.output.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b512 value.')
      );
    });

    it.todo('should fail to encode value [not a hex]', async () => {
      const value = `not a hex value`;

      await expectToThrowFuelError(
        () => fn.output.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b512 value.')
      );
    });
  });

  describe('decode', () => {
    it('should decode value [valid b512 hex]', () => {
      const value = B512_ENCODED;
      const expected = B512_DECODED;

      const actual = fn.output.decode(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to decode value [too short]', async () => {
      const value = B512_ENCODED.slice(-1);

      await expectToThrowFuelError(
        () => fn.output.decode(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid b512 value.')
      );
    });

    it.todo('should fail to decode value [too long]', async () => {
      const value = new Uint8Array([...B512_ENCODED, 0]);

      await expectToThrowFuelError(
        () => fn.output.decode(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid b512 value.')
      );
    });

    it.todo('should fail to decode value [not hex]', async () => {
      const value = toBytes('not a hex value');

      await expectToThrowFuelError(
        () => fn.output.decode(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid b512 value.')
      );
    });
  });
});
