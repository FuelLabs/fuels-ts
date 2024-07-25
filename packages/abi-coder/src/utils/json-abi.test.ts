import type { AbiFunctionInput, JsonAbi } from '../types/JsonAbi';

import { ENCODING_V1 } from './constants';
import {
  findFunctionByName,
  findNonEmptyInputs,
  findTypeById,
  getEncodingVersion,
} from './json-abi';

const MOCK_ABI: JsonAbi = {
  programType: 'contract',
  specVersion: '1',
  encodingVersion: '1',
  concreteTypes: [
    {
      type: '()',
      concreteTypeId: 'a260f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
    },
    {
      type: 'str[10]',
      concreteTypeId: '338a25cb65b9251663dcce6362b744fe10aa849758299590f4efed5dd299bf50',
    },
  ],
  metadataTypes: [],
  functions: [
    {
      inputs: [
        {
          name: 'x',
          concreteTypeId: 'a260f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
        },
        {
          name: 'y',
          concreteTypeId: '338a25cb65b9251663dcce6362b744fe10aa849758299590f4efed5dd299bf50',
        },
      ],
      name: 'main',
      output: 'b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
      attributes: null,
    },
  ],
  loggedTypes: [],
  messagesTypes: [],
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

      const actual = getEncodingVersion(encodingVersion as unknown as string);

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
      const expected = MOCK_ABI.functions[0];

      const actual = findFunctionByName(MOCK_ABI, 'main');

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
      const expected = MOCK_ABI.concreteTypes[0];

      const actual = findTypeById(MOCK_ABI, expected.concreteTypeId);

      expect(actual).toEqual(expected);
    });

    it('should throw an error if the type is not found', () => {
      expect(() => findTypeById(MOCK_ABI, 'not today')).toThrowError(
        `Type with typeId 'not today' doesn't exist in the ABI.`
      );
    });
  });

  describe('findNonEmptyInputs', () => {
    it('should find non-empty inputs', () => {
      const expected = [MOCK_ABI.functions[0].inputs[1]];

      const actual = findNonEmptyInputs(MOCK_ABI, MOCK_ABI.functions[0].inputs);

      expect(actual).toEqual(expected);
    });

    it('should throw an error if the type is not found', () => {
      const inputs: AbiFunctionInput[] = [{ name: 'a', concreteTypeId: 'not today' }];

      expect(() => findNonEmptyInputs(MOCK_ABI, inputs)).toThrowError(
        `Type with typeId 'not today' doesn't exist in the ABI.`
      );
    });
  });
});
