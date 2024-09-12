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
  const U8_NEGATIVE = -1;
  const U8_MAX_PLUS_ONE = 256;
  const U8_MAX_PLUS_ONE_ENCODED = new Uint8Array([U8_MAX_PLUS_ONE]);

  describe('encode', () => {
    it('should encode [min]', () => {
      const encoded = fn.arguments.encode([U8_MIN]);

      expect(encoded).toStrictEqual(U8_MIN_ENCODED);
    });

    it('should encode [max]', () => {
      const encoded = fn.arguments.encode([U8_MAX]);

      expect(encoded).toStrictEqual(U8_MAX_ENCODED);
    });

    it.todo('should fail encoding [negative value]', async () => {
      await expectToThrowFuelError(
        () => fn.arguments.encode([U8_NEGATIVE]),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8 value.')
      );
    });

    it.todo('should fail encoding [max + 1]', async () => {
      await expectToThrowFuelError(
        () => fn.arguments.encode([U8_MAX_PLUS_ONE]),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8 value.')
      );
    });
  });

  describe('decode', () => {
    it('should decode [min]', () => {
      const decoded = fn.arguments.decode(U8_MIN_ENCODED);
      expect(decoded).toStrictEqual([U8_MIN]);
    });

    it('should decode [max]', () => {
      const decoded = fn.arguments.decode(U8_MAX_ENCODED);
      expect(decoded).toStrictEqual([U8_MAX]);
    });

    it.todo('should not overflow when decoding [max + 1]', async () => {
      await expectToThrowFuelError(
        () => fn.arguments.decode(U8_MAX_PLUS_ONE_ENCODED),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8 value.')
      );
    });
  });
});
