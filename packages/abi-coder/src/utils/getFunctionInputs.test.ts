import type { JsonAbi, JsonAbiArgument, JsonAbiType } from '../types/JsonAbi';

import { getFunctionInputs } from './getFunctionInputs';

const nonEmptyType: JsonAbiType = {
  type: 'u8',
  typeId: 1,
  components: null,
  typeParameters: null,
};

const voidAbiType: JsonAbiType = {
  type: '()',
  typeId: 2,
  components: null,
  typeParameters: null,
};

const optionAbiType: JsonAbiType = {
  type: 'enum Option',
  typeId: 3,
  components: null,
  typeParameters: null,
};

const debugOptionAbiType: JsonAbiType = {
  type: 'enum std::option::Option',
  typeId: 4,
  components: null,
  typeParameters: null,
};

const EMPTY_ABI_TYPES: [string, JsonAbiType][] = [
  ['void', voidAbiType],
  ['option (release)', optionAbiType],
  ['option (debug)', debugOptionAbiType],
];

const jsonAbi: JsonAbi = {
  encoding: '1',
  types: [nonEmptyType, voidAbiType, optionAbiType, debugOptionAbiType],
  functions: [],
  loggedTypes: [],
  messagesTypes: [],
  configurables: [],
};

/**
 * @group node
 * @group browser
 */
describe.each(EMPTY_ABI_TYPES)(
  'getFunctionInputs.ts [empty=%s]',
  (_: string, emptyAbiType: JsonAbiType) => {
    it('should handle no inputs', () => {
      const inputs: Array<JsonAbiArgument> = [];

      const result = getFunctionInputs({ jsonAbi, inputs });

      expect(result).toEqual([]);
    });

    it('should handle all empty types [empty, empty, empty]', () => {
      const A = { type: emptyAbiType.typeId, name: 'a', typeArguments: null };
      const B = { type: emptyAbiType.typeId, name: 'b', typeArguments: null };
      const C = { type: emptyAbiType.typeId, name: 'c', typeArguments: null };
      const inputs: Array<JsonAbiArgument> = [A, B, C];

      const result = getFunctionInputs({ jsonAbi, inputs });

      expect(result).toEqual([
        { ...A, isOptional: true },
        { ...B, isOptional: true },
        { ...C, isOptional: true },
      ]);
    });

    it('should handle all non-empty types', () => {
      const A = { type: nonEmptyType.typeId, name: 'a', typeArguments: null };
      const B = { type: nonEmptyType.typeId, name: 'b', typeArguments: null };
      const C = { type: nonEmptyType.typeId, name: 'c', typeArguments: null };
      const inputs: Array<JsonAbiArgument> = [A, B, C];

      const result = getFunctionInputs({ jsonAbi, inputs });

      expect(result).toEqual([
        { ...A, isOptional: false },
        { ...B, isOptional: false },
        { ...C, isOptional: false },
      ]);
    });

    it('should handle a mix [non-empty, non-empty, empty]', () => {
      const A = { type: nonEmptyType.typeId, name: 'a', typeArguments: null };
      const B = { type: nonEmptyType.typeId, name: 'b', typeArguments: null };
      const C = { type: emptyAbiType.typeId, name: 'c', typeArguments: null };
      const inputs: Array<JsonAbiArgument> = [A, B, C];

      const result = getFunctionInputs({ jsonAbi, inputs });

      expect(result).toEqual([
        { ...A, isOptional: false },
        { ...B, isOptional: false },
        { ...C, isOptional: true },
      ]);
    });

    it('should handle a mix [empty, non-empty, non-empty]', () => {
      const A = { type: emptyAbiType.typeId, name: 'a', typeArguments: null };
      const B = { type: nonEmptyType.typeId, name: 'b', typeArguments: null };
      const C = { type: nonEmptyType.typeId, name: 'c', typeArguments: null };
      const inputs: Array<JsonAbiArgument> = [A, B, C];

      const result = getFunctionInputs({ jsonAbi, inputs });

      expect(result).toEqual([
        { ...A, isOptional: false },
        { ...B, isOptional: false },
        { ...C, isOptional: false },
      ]);
    });

    it('should handle a mix [non-empty, empty, non-empty]', () => {
      const A = { type: nonEmptyType.typeId, name: 'a', typeArguments: null };
      const B = { type: emptyAbiType.typeId, name: 'b', typeArguments: null };
      const C = { type: nonEmptyType.typeId, name: 'c', typeArguments: null };
      const inputs: Array<JsonAbiArgument> = [A, B, C];

      const result = getFunctionInputs({ jsonAbi, inputs });

      expect(result).toEqual([
        { ...A, isOptional: false },
        { ...B, isOptional: false },
        { ...C, isOptional: false },
      ]);
    });
  }
);
