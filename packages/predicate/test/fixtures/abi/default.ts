import type { JsonFlatAbi } from '@fuel-ts/abi-coder';

export const defaultPredicateAbi: JsonFlatAbi = {
  types: [
    {
      typeId: 0,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 1,
      type: 'b256',
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: 'data',
          type: 1,
          typeArguments: null,
        },
      ],
      name: 'main',
      output: {
        name: '',
        type: 0,
        typeArguments: null,
      },
    },
  ],
  loggedTypes: [],
  configurables: [],
};
