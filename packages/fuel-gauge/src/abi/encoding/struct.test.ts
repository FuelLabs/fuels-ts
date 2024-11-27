import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';
import { concat, FuelError, toBytes } from 'fuels';
import { expectToThrowFuelError } from 'fuels/test-utils';

import {
  B256_DECODED,
  B256_ENCODED,
  BOOL_FALSE_ENCODED,
  BOOL_TRUE_ENCODED,
  U32_MAX,
  U32_MAX_ENCODED,
  U32_MIN,
  U32_MIN_ENCODED,
  U64_MAX,
  U64_MAX_ENCODED,
  U8_MAX,
  U8_MAX_ENCODED,
} from '../constants';
import { AbiProjectsEnum, getAbiForcProject } from '../utils';
import { toEqualBn } from '../vitest.matcher';

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

expect.extend({ toEqualBn });

/**
 * @TODO
 * - [ ] Better validation messages... 'Types/values length mismatch.'
 *        Where did the error occur? "fieldB" and/or "fieldB" (maybe an array of field names that failed)
 *        Why did it occur? (should be captured from the underlying field coder)
 */
describe('types_struct_simple', () => {
  const fn = contract.functions.types_struct_simple;

  describe('encode', () => {
    it('should encode value [{ a: true, b: U32_MAX }]', () => {
      const value = { a: true, b: U32_MAX };
      const expected = concat([BOOL_TRUE_ENCODED, U32_MAX_ENCODED]);

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode value [{ b: U32_MIN, a: false }]', () => {
      const value = { b: U32_MIN, a: false };
      const expected = concat([BOOL_FALSE_ENCODED, U32_MIN_ENCODED]);

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to encode value [missing property]', async () => {
      const value = { a: false };

      await expectToThrowFuelError(
        () => fn.output.encode(value),
        new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          'Invalid struct SimpleStruct. Field "b" not present.'
        )
      );
    });

    it.todo('should fail to encode value [additional property]', async () => {
      const value = { a: false, b: U32_MIN, naz: 'gûl' };

      await expectToThrowFuelError(
        () => fn.output.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Types/values length mismatch.')
      );
    });
  });

  describe('decode', () => {
    it('should decode value [{ a: true, b: U32_MAX }]', () => {
      const value = concat([BOOL_TRUE_ENCODED, U32_MAX_ENCODED]);
      const expected = { a: true, b: U32_MAX };

      const actual = fn.output.decode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should decode value [{ b: U32_MIN, a: false }]', () => {
      const value = concat([BOOL_FALSE_ENCODED, U32_MIN_ENCODED]);
      const expected = { b: U32_MIN, a: false };

      const actual = fn.output.decode(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to decode value [missing property]', async () => {
      const value = concat([BOOL_FALSE_ENCODED]);

      await expectToThrowFuelError(
        () => fn.output.decode(value),
        new FuelError(
          FuelError.CODES.DECODE_ERROR,
          'Invalid struct SimpleStruct. Field "b" not present.'
        )
      );
    });

    it.todo('should fail to decode value [additional property]', async () => {
      const value = concat([BOOL_FALSE_ENCODED, U32_MIN_ENCODED, toBytes('gûl')]);

      await expectToThrowFuelError(
        () => fn.output.decode(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Types/values length mismatch.')
      );
    });
  });
});

describe('types_struct_generic', () => {
  const fn = contract.functions.types_struct_generic;

  describe('encode', () => {
    it('should encode value [{ a: U8_MAX }]', () => {
      const value = { a: U8_MAX };
      const expected = U8_MAX_ENCODED;

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [{ a: true, b: U32_MAX }]', () => {
      const value = U8_MAX_ENCODED;
      const expected = { a: U8_MAX };

      const actual = fn.output.decode(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('types_struct_with_tuple', () => {
  const fn = contract.functions.types_struct_with_tuple;

  describe('encode', () => {
    it('should encode value [{ a: [true, U64_MAX] }]', () => {
      const value = { a: [true, U64_MAX] };
      const expected = concat([BOOL_TRUE_ENCODED, U64_MAX_ENCODED]);

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to encode value [missing property]', async () => {
      const value = { a: [true] };

      await expectToThrowFuelError(
        () => fn.output.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Types/values length mismatch.')
      );
    });
  });

  describe('decode', () => {
    it('should decode value [{ a: [true, U64_MAX] }]', () => {
      const value = concat([BOOL_TRUE_ENCODED, U64_MAX_ENCODED]);
      // @ts-expect-error toEqualBn is not a function
      const expected = { a: [true, expect.toEqualBn(U64_MAX)] };

      const actual = fn.output.decode(value);

      expect(actual).toStrictEqual(expected);
    });

    it.todo('should fail to encode value [missing property]', async () => {
      const value = concat([BOOL_TRUE_ENCODED]);

      await expectToThrowFuelError(
        () => fn.output.decode(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Types/values length mismatch.')
      );
    });

    it.todo('should fail to decode value [additional property]', async () => {
      const value = concat([BOOL_FALSE_ENCODED, U32_MIN_ENCODED, toBytes('gûl')]);

      await expectToThrowFuelError(
        () => fn.output.decode(value),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Types/values length mismatch.')
      );
    });
  });
});

describe.only('types_struct_with_implicit_generics', () => {
  const fn = contract.functions.types_struct_with_implicit_generics;

  describe('encode', () => {
    it('should encode value [{ a: [B256, B256, B256], b: [B256, U8_MAX] }]', () => {
      const value = {
        a: [B256_DECODED, B256_DECODED, B256_DECODED],
        b: [B256_DECODED, U8_MAX],
      };
      const expected = concat([
        B256_ENCODED,
        B256_ENCODED,
        B256_ENCODED,
        B256_ENCODED,
        U8_MAX_ENCODED,
      ]);

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [{ a: [B256, B256, B256], b: [B256, U8_MAX] }]', () => {
      const value = concat([
        B256_ENCODED,
        B256_ENCODED,
        B256_ENCODED,
        B256_ENCODED,
        U8_MAX_ENCODED,
      ]);
      const expected = {
        a: [B256_DECODED, B256_DECODED, B256_DECODED],
        b: [B256_DECODED, U8_MAX],
      };

      const actual = fn.output.decode(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('types_struct_with_vector', () => {
  const fn = contract.functions.types_struct_with_vector;

  describe('encode', () => {
    it('should encode value [{ a: 7, b: [3, 9, 6, 4] }]', () => {
      const value = { a: U8_MAX, b: [3, 9, 6, 4] };
      const expected = concat([
        U8_MAX_ENCODED,

        // Vector length
        Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 4]),
        Uint8Array.from([3, 9, 6, 4]),
      ]);

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [{ a: 7, b: [3, 9, 6, 4] }]', () => {
      const value = concat([
        U8_MAX_ENCODED,

        // Vector length
        Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 4]),
        Uint8Array.from([3, 9, 6, 4]),
      ]);
      const expected = { a: U8_MAX, b: [3, 9, 6, 4] };

      const actual = fn.output.decode(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

/**
        {
          fn: exhaustiveExamplesInterface.functions.types_struct_with_vector,
          title: '[vector] vector inside struct [with offset]',
          value: [
            {
              num: 7,
              vec: [3, 9, 6, 4],
            },
          ],
          encodedValue: (input?: any, _offset: number = 0) => {
            // eslint-disable-next-line no-param-reassign
            input = input[0];
            const u8 = Uint8Array.from([7]);
            const length = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input.vec.length]);
            const vectorData = Uint8Array.from(input.vec);

            const expectedBytes = concat([u8, length, vectorData]);

            return expectedBytes;
          },
          offset: 16,
        },
 */
