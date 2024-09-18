import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';
import { concat } from 'fuels';

import { U8_MAX } from '../constants';
import { AbiProjectsEnum, getAbiForcProject } from '../utils';

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

describe('types_vector_boolean', () => {
  const fn = contract.functions.types_vector_boolean;

  describe('encode', () => {
    it('should encode value [[true, false, true, true]]', () => {
      const value: boolean[] = [true, false, true, true];
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4, 1, 0, 1, 1]);

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [[true, false, true, true]]', () => {
      const value = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4, 1, 0, 1, 1]);
      const expected: boolean[] = [true, false, true, true];

      const actual = fn.output.decode(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('types_vector_u8', () => {
  const fn = contract.functions.types_vector_u8;

  describe('encode', () => {
    it('should encode value [[U8_MAX, 0, U8_MAX, U8_MAX]]', () => {
      const value: number[] = [U8_MAX, 0, U8_MAX, U8_MAX];
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4, U8_MAX, 0, U8_MAX, U8_MAX]);

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [[true, false, true, true]]', () => {
      const value = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4, U8_MAX, 0, U8_MAX, U8_MAX]);
      const expected: number[] = [U8_MAX, 0, U8_MAX, U8_MAX];

      const actual = fn.output.decode(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('types_vector_inside_vector', () => {
  const fn = contract.functions.types_vector_inside_vector;

  describe('encode', () => {
    it('should encode value [[0, 1, 2], [6, 7, 8]]', () => {
      const value: number[][] = [
        [0, 1, 2],
        [6, 7, 8],
      ];
      const expected = concat([
        // Wrapper vector length
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]),

        // First vector length
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3]),
        // First vector
        new Uint8Array([0, 0, 0, 0]),
        new Uint8Array([0, 0, 0, 1]),
        new Uint8Array([0, 0, 0, 2]),

        // Second vector length
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3]),
        // Second vector
        new Uint8Array([0, 0, 0, 6]),
        new Uint8Array([0, 0, 0, 7]),
        new Uint8Array([0, 0, 0, 8]),
      ]);

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [[0, 1, 2], [6, 7, 8]]', () => {
      const value = concat([
        // Wrapper vector length
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]),

        // First vector length
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3]),
        // First vector
        new Uint8Array([0, 0, 0, 0]),
        new Uint8Array([0, 0, 0, 1]),
        new Uint8Array([0, 0, 0, 2]),

        // Second vector length
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3]),
        // Second vector
        new Uint8Array([0, 0, 0, 6]),
        new Uint8Array([0, 0, 0, 7]),
        new Uint8Array([0, 0, 0, 8]),
      ]);
      const expected: number[][] = [
        [0, 1, 2],
        [6, 7, 8],
      ];

      const actual = fn.output.decode(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});
