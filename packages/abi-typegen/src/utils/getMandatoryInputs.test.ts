import type { IType } from '../types/interfaces/IType';
import type { JsonAbiArgument, JsonAbiType } from '../types/interfaces/JsonAbi';

import { getMandatoryInputs } from './getMandatoryInputs';
import { makeType } from './makeType';

const nonEmptyType: JsonAbiType = {
  type: 'u8',
  typeId: 1,
  components: null,
  typeParameters: null,
};

const emptyAbiType: JsonAbiType = {
  type: '()',
  typeId: 2,
  components: null,
  typeParameters: null,
};

const types: Array<IType> = [nonEmptyType, emptyAbiType].map((rawAbiType) =>
  makeType({ rawAbiType })
);

describe('getMandatoryInputs.ts', () => {
  it('should handle no inputs', () => {
    const inputs: Array<JsonAbiArgument> = [];

    const result = getMandatoryInputs({ types, inputs });

    expect(result).toEqual([]);
  });

  it('should handle all empty types [empty, empty, empty]', () => {
    const A = { type: emptyAbiType.typeId, name: 'a', typeArguments: null };
    const B = { type: emptyAbiType.typeId, name: 'b', typeArguments: null };
    const C = { type: emptyAbiType.typeId, name: 'c', typeArguments: null };
    const inputs: Array<JsonAbiArgument> = [A, B, C];

    const result = getMandatoryInputs({ types, inputs });

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

    const result = getMandatoryInputs({ types, inputs });

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

    const result = getMandatoryInputs({ types, inputs });

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

    const result = getMandatoryInputs({ types, inputs });

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

    const result = getMandatoryInputs({ types, inputs });

    expect(result).toEqual([
      { ...A, isOptional: false },
      { ...B, isOptional: false },
      { ...C, isOptional: false },
    ]);
  });
});
