import type { JsonFlatAbi } from '../../src/json-abi';

export const jsonFlatAbiMock: JsonFlatAbi = {
  types: [],
  functions: [],
  loggedTypes: [],
  configurables: [
    {
      name: 'U8',
      configurableType: {
        name: '',
        type: 12,
        typeArguments: null,
      },
      offset: 204,
    },
    {
      name: 'BOOL',
      configurableType: {
        name: '',
        type: 5,
        typeArguments: null,
      },
      offset: 212,
    },
  ],
};
