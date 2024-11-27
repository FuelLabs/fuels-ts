import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';

import { AbiProjectsEnum, getAbiForcProject } from '../utils';

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

describe('types_bytes', () => {
  const fn = contract.functions.types_bytes;

  describe('encode', () => {
    it('should encode value [valid byte]', () => {
      const value = new Uint8Array([1, 2, 3]);
      const expected: Uint8Array = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 3]);

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [valid byte]', () => {
      const value = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 3]);
      const expected: Uint8Array = new Uint8Array([1, 2, 3]);

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('types_raw_slice', () => {
  const fn = contract.functions.types_raw_slice;

  describe('encode', () => {
    it('should encode value [valid number array]', () => {
      const value: number[] = [1, 2, 3];
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 3]);

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [valid bytes]', () => {
      const value = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 3]);
      const expected: number[] = [1, 2, 3];

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('types_str_slice', () => {
  const fn = contract.functions.types_str_slice;

  describe('encode', () => {
    it('should encode value [valid string]', () => {
      const value: string = 'hello';
      const expected: Uint8Array = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 5, 104, 101, 108, 108, 111,
      ]);

      const actual = fn.encodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [valid byte]', () => {
      const value: Uint8Array = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 5, 104, 101, 108, 108, 111]);
      const expected: string = 'hello';

      const actual = fn.decodeOutput(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});
