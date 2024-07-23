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

  it('should handle all empty types', () => {
    const inputs: Array<JsonAbiArgument> = [
      { type: emptyAbiType.typeId, name: 'a', typeArguments: null },
      { type: emptyAbiType.typeId, name: 'b', typeArguments: null },
      { type: emptyAbiType.typeId, name: 'c', typeArguments: null },
    ];

    const result = getMandatoryInputs({ types, inputs });

    expect(result).toEqual([]);
  });

  it('should handle all non-empty types', () => {
    const inputs: Array<JsonAbiArgument> = [
      { type: nonEmptyType.typeId, name: 'a', typeArguments: null },
      { type: nonEmptyType.typeId, name: 'b', typeArguments: null },
      { type: nonEmptyType.typeId, name: 'c', typeArguments: null },
    ];

    const result = getMandatoryInputs({ types, inputs });

    expect(result).toEqual(inputs);
  });

  it('should handle a mix [non-empty, non-empty, empty]', () => {
    const inputs: Array<JsonAbiArgument> = [
      { type: nonEmptyType.typeId, name: 'a', typeArguments: null },
      { type: nonEmptyType.typeId, name: 'b', typeArguments: null },
      { type: emptyAbiType.typeId, name: 'c', typeArguments: null },
    ];

    const result = getMandatoryInputs({ types, inputs });

    expect(result).toEqual([
      { type: nonEmptyType.typeId, name: 'a', typeArguments: null },
      { type: nonEmptyType.typeId, name: 'b', typeArguments: null },
    ]);
  });

  it('should handle a mix [non-empty, empty, non-empty]', () => {
    const inputs: Array<JsonAbiArgument> = [
      { type: nonEmptyType.typeId, name: 'a', typeArguments: null },
      { type: emptyAbiType.typeId, name: 'b', typeArguments: null },
      { type: nonEmptyType.typeId, name: 'c', typeArguments: null },
    ];

    const result = getMandatoryInputs({ types, inputs });

    expect(result).toEqual(inputs);
  });
});
