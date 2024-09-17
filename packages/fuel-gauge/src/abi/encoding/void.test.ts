import type { AbiSpecificationV1 } from '@fuel-ts/abi';
import { AbiCoder } from '@fuel-ts/abi';

import { AbiProjectsEnum, getAbiForcProject } from '../utils';

const { abiContents: contractAbi } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
const contract = AbiCoder.fromAbi(contractAbi as AbiSpecificationV1);

describe('types_void', () => {
  const fn = contract.functions.types_void;

  describe('encode', () => {
    it('should encode value [undefined]', () => {
      const value: void = undefined;
      const expected = new Uint8Array([]);

      const actual = fn.output.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode value', () => {
      const value = new Uint8Array([]);

      const actual = fn.output.decode(value);

      expect(actual).toStrictEqual(undefined);
    });
  });
});
