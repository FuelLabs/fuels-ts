import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';
import { FuelError } from 'fuels';
import { expectToThrowFuelError } from 'fuels/test-utils';

import {
  U16_MAX,
  U32_MAX,
  U64_MAX,
  U64_MAX_ENCODED,
  U64_MIN,
  U64_MIN_ENCODED,
  U8_MAX,
} from '../constants';
import { AbiProjectsEnum, getAbiForcProject } from '../utils';
import { toEqualBn } from '../vitest.matcher';

// @TODO how do we enable this matcher globally?
expect.extend({ toEqualBn });

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

describe('types_u64', () => {
  const fn = contract.functions.types_u64;
  const U64_MIN_MINUS_ONE = U64_MIN - 1;
  const U64_MIN_MINUS_ONE_ENCODED = new Uint8Array([U64_MIN_MINUS_ONE]);
  const U64_MAX_PLUS_ONE = U64_MAX.add(1);
  const U64_MAX_PLUS_ONE_ENCODED = U64_MAX_PLUS_ONE.toBytes();

  describe('encode', () => {
    it('should encode value [min]', () => {
      const value = U64_MIN;
      const expected = U64_MIN_ENCODED;

      const encoded = fn.output.encode(value);

      expect(encoded).toStrictEqual(expected);
    });

    it('should encode value [max]', () => {
      const value = U64_MAX;
      const expected = U64_MAX_ENCODED;

      const encoded = fn.output.encode(value);

      expect(encoded).toStrictEqual(expected);
    });

    it('should encode value [u8]', () => {
      const value = U8_MAX;
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, U8_MAX]);

      const encoded = fn.output.encode(value);

      expect(encoded).toStrictEqual(expected);
    });

    it('should encode value [u16]', () => {
      const value = U16_MAX;
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, U8_MAX, U8_MAX]);

      const encoded = fn.output.encode(value);

      expect(encoded).toStrictEqual(expected);
    });

    it('should encode value [u32]', () => {
      const value = U32_MAX;
      const expected = new Uint8Array([0, 0, 0, 0, U8_MAX, U8_MAX, U8_MAX, U8_MAX]);

      const encoded = fn.output.encode(value);

      expect(encoded).toStrictEqual(expected);
    });

    it.todo('should fail to encode value [min - 1]', async () => {
      const value = U64_MIN_MINUS_ONE;

      await expectToThrowFuelError(
        () => fn.output.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid U64 value.')
      );
    });

    it.todo('should fail to encode value [max + 1]', async () => {
      const value = U64_MAX_PLUS_ONE;

      await expectToThrowFuelError(
        () => fn.output.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid U64 value.')
      );
    });
  });

  describe('decode', () => {
    it('should decode value [min]', () => {
      const value = U64_MIN_ENCODED;
      const expected = U64_MIN;

      const decoded = fn.output.decode(value);

      expect(decoded).toStrictEqual(expect.toEqualBn(expected));
    });

    it('should decode value [max]', () => {
      const value = U64_MAX_ENCODED;
      const expected = U64_MAX;

      const decoded = fn.output.decode(value);

      expect(decoded).toStrictEqual(expect.toEqualBn(expected));
    });

    it('should decode value [u8]', () => {
      const value = new Uint8Array([0, 0, 0, 0, 0, 0, 0, U8_MAX]);
      const expected = U8_MAX;

      const decoded = fn.output.decode(value);

      expect(decoded).toStrictEqual(expect.toEqualBn(expected));
    });

    it('should decode value [u16]', () => {
      const value = new Uint8Array([0, 0, 0, 0, 0, 0, U8_MAX, U8_MAX]);
      const expected = U16_MAX;

      const decoded = fn.output.decode(value);

      expect(decoded).toStrictEqual(expect.toEqualBn(expected));
    });

    it('should decode value [u32]', () => {
      const value = new Uint8Array([0, 0, 0, 0, U8_MAX, U8_MAX, U8_MAX, U8_MAX]);
      const expected = U32_MAX;

      const decoded = fn.output.decode(value);

      expect(decoded).toStrictEqual(expect.toEqualBn(expected));
    });

    it.todo('should fail to decode value [min - 1]', async () => {
      const value = U64_MIN_MINUS_ONE_ENCODED;

      await expectToThrowFuelError(
        () => fn.output.decode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u64 value.')
      );
    });

    it.todo('should fail to decode value [max + 1]', async () => {
      const value = U64_MAX_PLUS_ONE_ENCODED;

      await expectToThrowFuelError(
        () => fn.output.decode(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u64 value.')
      );
    });
  });
});
