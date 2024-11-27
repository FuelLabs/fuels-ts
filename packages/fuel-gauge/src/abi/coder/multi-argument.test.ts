import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';
import { concat } from 'fuels';

import { B256_DECODED, B256_ENCODED, U32_MAX, U32_MAX_ENCODED, U8_MAX } from '../constants';
import { AbiProjectsEnum, getAbiForcProject } from '../utils';
import { toEqualBn } from '../vitest.matcher';

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

expect.extend({ toEqualBn });

describe('multi_arg_u64_u64', () => {
  const fn = contract.functions.multi_arg_u64_u64;

  describe('encode', () => {
    it('should encode value [U64_MAX, U64_MAX]', () => {
      const value: [number, number] = [U8_MAX, U8_MAX];
      const expected = concat([
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, U8_MAX]),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, U8_MAX]),
      ]);

      const actual = fn.arguments.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [U64_MAX, U64_MAX]', () => {
      const value = concat([
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, U8_MAX]),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, U8_MAX]),
      ]);
      // @ts-expect-error toEqualBn is not a function
      const expected: [number, number] = [expect.toEqualBn(U8_MAX), expect.toEqualBn(U8_MAX)];

      const actual = fn.arguments.decode(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('multi_arg_vector_b256', () => {
  const fn = contract.functions.multi_arg_vector_b256;

  describe('encode', () => {
    it('should encode value [[U8_MAX, 0, U8_MAX, U8_MAX], B256_DECODED]', () => {
      const value: [number[], string] = [[U8_MAX, 0, U8_MAX, U8_MAX], B256_DECODED];
      const expected = concat([
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]),
        new Uint8Array([U8_MAX, 0, U8_MAX, U8_MAX]),
        B256_ENCODED,
      ]);

      const actual = fn.arguments.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [[U8_MAX, 0, U8_MAX, U8_MAX], B256_DECODED]', () => {
      const value = concat([
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]),
        new Uint8Array([U8_MAX, 0, U8_MAX, U8_MAX]),
        B256_ENCODED,
      ]);
      const expected: [number[], string] = [[U8_MAX, 0, U8_MAX, U8_MAX], B256_DECODED];

      const actual = fn.arguments.decode(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('multi_arg_struct_vector', () => {
  const fn = contract.functions.multi_arg_struct_vector;

  describe('encode', () => {
    it('should encode value [{ a, b }, [U8_MAX, 0, U8_MAX, U8_MAX]]', () => {
      const value: [{ a: boolean; b: number }, number[]] = [
        { a: true, b: U8_MAX },
        [U8_MAX, 0, U8_MAX, U8_MAX],
      ];
      const expected = concat([
        new Uint8Array([1]),
        new Uint8Array([0, 0, 0, U8_MAX]),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]),
        new Uint8Array([U8_MAX, 0, U8_MAX, U8_MAX]),
      ]);

      const actual = fn.arguments.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [{ a, b }, [U8_MAX, 0, U8_MAX, U8_MAX]]', () => {
      const value = concat([
        new Uint8Array([1]),
        new Uint8Array([0, 0, 0, U8_MAX]),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]),
        new Uint8Array([U8_MAX, 0, U8_MAX, U8_MAX]),
      ]);
      const expected: [{ a: boolean; b: number }, number[]] = [
        { a: true, b: U8_MAX },
        [U8_MAX, 0, U8_MAX, U8_MAX],
      ];

      const actual = fn.arguments.decode(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('multi_arg_vector_vector', () => {
  const fn = contract.functions.multi_arg_vector_vector;

  describe('encode', () => {
    it('should encode value [[U8_MAX, 0], [U8_MAX, 0, U8_MAX, U8_MAX]]', () => {
      const value: [number[], number[]] = [
        [U8_MAX, 0],
        [U8_MAX, 0, U8_MAX, U8_MAX],
      ];
      const expected = concat([
        // Vector 1
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]),
        new Uint8Array([U8_MAX, 0]),
        // Vector 2
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]),
        new Uint8Array([U8_MAX, 0, U8_MAX, U8_MAX]),
      ]);

      const actual = fn.arguments.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [[U8_MAX, 0], [U8_MAX, 0, U8_MAX, U8_MAX]]', () => {
      const value = concat([
        // Vector 1
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]),
        new Uint8Array([U8_MAX, 0]),
        // Vector 2
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]),
        new Uint8Array([U8_MAX, 0, U8_MAX, U8_MAX]),
      ]);
      const expected: [number[], number[]] = [
        [U8_MAX, 0],
        [U8_MAX, 0, U8_MAX, U8_MAX],
      ];

      const actual = fn.arguments.decode(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('multi_arg_u32_vector_vector', () => {
  const fn = contract.functions.multi_arg_u32_vector_vector;

  describe('encode', () => {
    it('should encode value [U8_MAX, [[U8_MAX, 0], [U8_MAX, 0, U8_MAX, U8_MAX]]]', () => {
      const value = [U32_MAX, [123, 0], [124, 0, 125, 126]];
      const expected = concat([
        // U32
        U32_MAX_ENCODED,
        // Vector 1
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 123]), // Vector 1 - element 0
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), // Vector 1 - element 1
        // Vector 2
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 124]), // Vector 2 - element 0
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), // Vector 2 - element 1
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 125]), // Vector 2 - element 2
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 126]), // Vector 2 - element 3
      ]);

      const actual = fn.arguments.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [U8_MAX, [[U8_MAX, 0], [U8_MAX, 0, U8_MAX, U8_MAX]]]', () => {
      const value = concat([
        // U32
        U32_MAX_ENCODED,
        // Vector 1
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 123]), // Vector 1 - element 0
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), // Vector 1 - element 1
        // Vector 2
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 124]), // Vector 2 - element 0
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), // Vector 2 - element 1
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 125]), // Vector 2 - element 2
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 126]), // Vector 2 - element 3
      ]);
      const expected = [
        // @ts-expect-error toEqualBn is not a function
        expect.toEqualBn(U32_MAX),
        // @ts-expect-error toEqualBn is not a function
        [expect.toEqualBn(123), expect.toEqualBn(0)],
        // @ts-expect-error toEqualBn is not a function
        [expect.toEqualBn(124), expect.toEqualBn(0), expect.toEqualBn(125), expect.toEqualBn(126)],
      ];

      const actual = fn.arguments.decode(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});
