import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';
import { concat } from 'fuels';

import {
  BOOL_TRUE_ENCODED,
  U32_MAX,
  U32_MAX_ENCODED,
  U64_MAX,
  U64_MAX_ENCODED,
} from '../constants';
import { AbiProjectsEnum, getAbiForcProject } from '../utils';
import { toEqualBn } from '../vitest.matcher';

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

expect.extend({ toEqualBn });

// @TODO implement native enums
describe.todo('types_enum', () => {
  const fn = contract.functions.types_enum;

  describe('encode', () => {
    it('should encode value [Pending]', () => {
      const value = 'Pending';
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [Pending]', () => {
      const value = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
      const expected = 'Pending';

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('types_enum_with_builtin_type', () => {
  const fn = contract.functions.types_enum_with_builtin_type;

  describe('encode', () => {
    it('should encode value [{ a: true }]', () => {
      const value = {
        a: true,
      };
      const expected = concat([
        // Case key (index: 0)
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),

        // Case value
        new Uint8Array([1]),
      ]);

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode value [{ b: U64_MAX }]', () => {
      const value = {
        b: '18446744073709551615',
      };
      const expected = concat([
        // Case key (index: 1)
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]),

        // Case value
        new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255]),
      ]);

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [{ a: true }]', () => {
      const value = concat([
        // Case key (index: 0)
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),

        // Case value
        new Uint8Array([1]),
      ]);
      const expected = {
        a: true,
      };

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should decode value [{ b: U64_MAX }]', () => {
      const value = concat([
        // Case key (index: 1)
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]),

        // Case value
        new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255]),
      ]);
      const expected = {
        // @ts-expect-error toEqualBn is not a function
        b: expect.toEqualBn(U64_MAX),
      };

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('types_enum_with_vector', () => {
  const fn = contract.functions.types_enum_with_vector;

  describe('encode', () => {
    it('should encode value [{ b: [1, 2] }]', () => {
      const value = {
        b: [1, 2],
      };
      const expected = concat([
        // Case key (index: 1)
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]),

        // Case value
        // Vector length
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]),
        // Vector data
        new Uint8Array([1, 2]),
      ]);

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [{ b: [1, 2] }]', () => {
      const value = concat([
        // Case key (index: 1)
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]),

        // Case value
        // Vector length
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]),
        // Vector
        new Uint8Array([1, 2]),
      ]);
      const expected = {
        b: [1, 2],
      };

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('types_enum_with_structs', () => {
  const fn = contract.functions.types_enum_with_structs;

  describe('encode', () => {
    it('should encode value [{ c: { propA1: U64_MAX, propA2: { a: true, b: U32_MAX } } }]', () => {
      const value = {
        c: {
          a: U64_MAX,
          b: {
            a: true,
            b: U32_MAX,
          },
        },
      };
      const expected = concat([
        // Case key (index: 2)
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]),

        // Case value
        U64_MAX_ENCODED,
        BOOL_TRUE_ENCODED,
        U32_MAX_ENCODED,
      ]);

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [{ c: { propA1: U64_MAX, propA2: { a: true, b: U32_MAX } } }]', () => {
      const value = concat([
        // Case key (index: 2)
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]),

        // Case value
        U64_MAX_ENCODED,
        BOOL_TRUE_ENCODED,
        U32_MAX_ENCODED,
      ]);
      const expected = {
        c: {
          // @ts-expect-error toEqualBn is not a function
          a: expect.toEqualBn(U64_MAX),
          b: {
            a: true,
            b: U32_MAX,
          },
        },
      };

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});
