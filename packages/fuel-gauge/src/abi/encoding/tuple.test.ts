import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';
import { concat } from 'fuels';

import { U64_MAX, U64_MAX_ENCODED, U8_MAX, U8_MAX_ENCODED } from '../constants';
import { AbiProjectsEnum, getAbiForcProject } from '../utils';

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

describe('types_tuple', () => {
  const fn = contract.functions.types_tuple;

  describe('encode', () => {
    it('should encode value [U8_MAX, U8_MAX, U8_MAX]', () => {
      const value = [U8_MAX, U8_MAX, U8_MAX];
      const expected = concat([U8_MAX_ENCODED, U8_MAX_ENCODED, U8_MAX_ENCODED]);

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [U8_MAX, { propA1: U64_MAX, propA2: "aaa" }]', () => {
      const value = concat([U8_MAX_ENCODED, U8_MAX_ENCODED, U8_MAX_ENCODED]);
      const expected = [U8_MAX, U8_MAX, U8_MAX];

      const actual = fn.output.decode(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe('types_tuple_complex', () => {
  const fn = contract.functions.types_tuple_complex;

  describe('encode', () => {
    it('should encode value [U8_MAX, { a: { a: U64_MAX } }, "aaa"]]', () => {
      const value = [U8_MAX, { a: { a: U64_MAX } }, 'aaa'];
      const expected = concat([U8_MAX_ENCODED, U64_MAX_ENCODED, Uint8Array.from([97, 97, 97])]);

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value [[U8_MAX, { propA1: U64_MAX, propA2: "aaa" }]]', () => {
      const value = concat([U8_MAX_ENCODED, U64_MAX_ENCODED, Uint8Array.from([97, 97, 97])]);
      const expected = [U8_MAX, { a: { a: U64_MAX } }, 'aaa'];

      const actual = fn.output.decode(value);

      expect(actual).toStrictEqual(expected);
    });
  });
});

describe.todo('types_tuple_with_native_types');
describe.todo('types_tuple_alias_with_native_types');
