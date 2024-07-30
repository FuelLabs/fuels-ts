import type { ResolvedAbiType } from '../ResolvedAbiType';
import type { JsonAbi, JsonAbiArgument } from '../types/JsonAbi';

import { ENCODING_V1 } from './constants';
import {
  findFunctionByName,
  findNonVoidInputs,
  findTypeById,
  findVectorBufferArgument,
  getEncodingVersion,
} from './json-abi';

const MOCK_ABI: JsonAbi = {
  types: [
    { typeId: 1, type: '()', components: [], typeParameters: [] },
    { typeId: 2, type: 'u256', components: [], typeParameters: [] },
  ],
  functions: [
    { name: 'foo', attributes: [], inputs: [], output: { name: '', type: 1, typeArguments: [] } },
  ],
  loggedTypes: [],
  configurables: [],
};

const DEFAULT_ENCODING_VERSION = ENCODING_V1;

/**
 * @group node
 * @group browser
 */
describe('json-abi', () => {
  describe('getEncodingVersion', () => {
    it('should fallback to the default encoding version', () => {
      const encodingVersion = undefined;
      const expected = DEFAULT_ENCODING_VERSION;

      const actual = getEncodingVersion(encodingVersion);

      expect(actual).toBe(expected);
    });

    it('should return the encoding version (when defined)', () => {
      const expected = ENCODING_V1;

      const actual = getEncodingVersion(ENCODING_V1);

      expect(actual).toBe(expected);
    });

    it('should throw an error if the encoding version is not supported', () => {
      const encodingVersion = '-1';

      expect(() => getEncodingVersion(encodingVersion)).toThrowError(
        `Encoding version '${encodingVersion}' is unsupported.`
      );
    });
  });

  describe('findFunctionByName', () => {
    it('should find a function by name', () => {
      const expected = {
        name: 'foo',
        attributes: [],
        inputs: [],
        output: { name: '', type: 1, typeArguments: [] },
      };

      const actual = findFunctionByName(MOCK_ABI, 'foo');

      expect(actual).toEqual(expected);
    });

    it('should throw an error if the function is not found', () => {
      expect(() => findFunctionByName(MOCK_ABI, 'bar')).toThrowError(
        `Function with name 'bar' doesn't exist in the ABI`
      );
    });
  });

  describe('findTypeById', () => {
    it('should find a type by id', () => {
      const expected = {
        typeId: 1,
        type: '()',
        components: [],
        typeParameters: [],
      };

      const actual = findTypeById(MOCK_ABI, 1);

      expect(actual).toEqual(expected);
    });

    it('should throw an error if the type is not found', () => {
      expect(() => findTypeById(MOCK_ABI, -1)).toThrowError(
        `Type with typeId '-1' doesn't exist in the ABI.`
      );
    });
  });

  describe('findNonVoidInputs', () => {
    it('should find non-empty inputs', () => {
      const inputs: JsonAbiArgument[] = [
        { name: 'a', type: 1, typeArguments: [] },
        { name: 'b', type: 2, typeArguments: [] },
      ];
      const expected = [{ name: 'b', type: 2, typeArguments: [] }];

      const actual = findNonVoidInputs(MOCK_ABI, inputs);

      expect(actual).toEqual(expected);
    });

    it('should throw an error if the type is not found', () => {
      const inputs: JsonAbiArgument[] = [{ name: 'a', type: -1, typeArguments: [] }];

      expect(() => findNonVoidInputs(MOCK_ABI, inputs)).toThrowError(
        `Type with typeId '-1' doesn't exist in the ABI.`
      );
    });
  });

  describe('findVectorBufferArgument', () => {
    it('should throw, when there are no components with the name of `buf', () => {
      const components: ResolvedAbiType[] = [];

      expect(() => findVectorBufferArgument(components)).toThrowError(
        `The Vec type provided is missing or has a malformed 'buf' component.`
      );
    });

    it('should throw, when the buffer component is missing type arguments', () => {
      const components: ResolvedAbiType[] = [
        {
          name: 'buf',
          originalTypeArguments: [],
        } as unknown as ResolvedAbiType,
      ];

      expect(() => findVectorBufferArgument(components)).toThrowError(
        `The Vec type provided is missing or has a malformed 'buf' component.`
      );
    });

    it('should return the buffer argument', () => {
      const components: ResolvedAbiType[] = [
        {
          name: 'buf',
          originalTypeArguments: [{ name: 'u256', components: [], typeParameters: [] }],
        } as unknown as ResolvedAbiType,
      ];

      const expected = { name: 'u256', components: [], typeParameters: [] };
      const actual = findVectorBufferArgument(components);

      expect(actual).toEqual(expected);
    });
  });
});
