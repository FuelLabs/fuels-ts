import type { JsonAbiFragment, JsonFlatAbi } from '@fuel-ts/abi-coder';

export const jsonAbiFragmentMock: Required<JsonAbiFragment>[] = [
  {
    type: 'function',
    name: 'main',
    inputs: [
      {
        name: 'my_struct',
        type: 'struct MyStruct',
        components: [
          {
            name: 'arg_one',
            type: 'bool',
          },
          {
            name: 'arg_two',
            type: 'u64',
          },
        ],
      },
    ],
    outputs: [
      {
        name: 'my_struct',
        type: 'struct MyStruct',
        components: [
          {
            name: 'arg_one',
            type: 'bool',
          },
          {
            name: 'arg_two',
            type: 'u64',
          },
        ],
      },
    ],
    attributes: [],
  },
];

export const jsonAbiMock: JsonFlatAbi = {
  types: [
    {
      typeId: 0,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 1,
      type: 'u8',
      components: null,
      typeParameters: null,
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: 'inputed_fee',
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
      attributes: null,
    },
  ],
  loggedTypes: [],
  configurables: [],
};
