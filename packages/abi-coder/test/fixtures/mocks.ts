import type { ConfigurableFragment, JsonAbiFragmentType, JsonFlatAbi } from '../../src/json-abi';

export const jsonFlatAbiMock: JsonFlatAbi = {
  types: [
    {
      typeId: 0,
      type: '(_, _)',
      components: [
        {
          name: '__tuple_element',
          type: 2,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 1,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 1,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 2,
      type: 'u8',
      components: null,
      typeParameters: null,
    },
  ],
  functions: [],
  loggedTypes: [],
  configurables: [
    {
      name: 'BOOL',
      configurableType: {
        name: '',
        type: 1,
        typeArguments: null,
      },
      offset: 212,
    },
    {
      name: 'U8',
      configurableType: {
        name: '',
        type: 2,
        typeArguments: null,
      },
      offset: 204,
    },
  ],
};

export const fragmentType: JsonAbiFragmentType = {
  type: 'dummy',
  name: 'dummy',
  components: null,
  typeArguments: null,
};

export const configurableFragmentMock: ReadonlyArray<ConfigurableFragment> = [
  {
    name: 'one',
    configurableType: {
      name: '',
      type: 1,
      typeArguments: null,
    },
    offset: 1,
    fragmentType,
  },
  {
    name: 'two',
    configurableType: {
      name: '',
      type: 2,
      typeArguments: null,
    },
    offset: 2,
    fragmentType,
  },
  {
    name: 'three',
    configurableType: {
      name: '',
      type: 3,
      typeArguments: null,
    },
    offset: 3,
    fragmentType,
  },
];
