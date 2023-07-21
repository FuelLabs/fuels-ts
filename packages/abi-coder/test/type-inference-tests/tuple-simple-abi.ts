export const tupleSimpleAbi = {
  abi: {
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
            type: 9,
            typeArguments: null,
          },
        ],
        typeParameters: null,
      },
      {
        typeId: 1,
        type: '(_, _)',
        components: [
          {
            name: '__tuple_element',
            type: 10,
            typeArguments: null,
          },
          {
            name: '__tuple_element',
            type: 6,
            typeArguments: [
              {
                name: '',
                type: 7,
                typeArguments: [
                  {
                    name: '',
                    type: 9,
                    typeArguments: null,
                  },
                ],
              },
              {
                name: '',
                type: 5,
                typeArguments: null,
              },
            ],
          },
        ],
        typeParameters: null,
      },
      {
        typeId: 2,
        type: 'bool',
        components: null,
        typeParameters: null,
      },
      {
        typeId: 3,
        type: 'generic T',
        components: null,
        typeParameters: null,
      },
      {
        typeId: 4,
        type: 'generic U',
        components: null,
        typeParameters: null,
      },
      {
        typeId: 5,
        type: 'str[3]',
        components: null,
        typeParameters: null,
      },
      {
        typeId: 6,
        type: 'struct StructA',
        components: [
          {
            name: 'propA1',
            type: 3,
            typeArguments: null,
          },
          {
            name: 'propA2',
            type: 4,
            typeArguments: null,
          },
        ],
        typeParameters: [3, 4],
      },
      {
        typeId: 7,
        type: 'struct StructB',
        components: [
          {
            name: 'propB1',
            type: 3,
            typeArguments: null,
          },
          {
            name: 'propB2',
            type: 0,
            typeArguments: null,
          },
        ],
        typeParameters: [3],
      },
      {
        typeId: 8,
        type: 'struct StructC',
        components: [
          {
            name: 'propC1',
            type: 1,
            typeArguments: null,
          },
        ],
        typeParameters: null,
      },
      {
        typeId: 9,
        type: 'u64',
        components: null,
        typeParameters: null,
      },
      {
        typeId: 10,
        type: 'u8',
        components: null,
        typeParameters: null,
      },
    ],
    functions: [
      {
        inputs: [
          {
            name: 'x',
            type: 8,
            typeArguments: null,
          },
        ],
        name: 'single_param',
        output: {
          name: '',
          type: 10,
          typeArguments: null,
        },
        attributes: null,
      },
      {
        inputs: [
          {
            name: 'x',
            type: 1,
            typeArguments: null,
          },
        ],
        name: 'tuple_params',
        output: {
          name: '',
          type: 1,
          typeArguments: null,
        },
        attributes: null,
      },
    ],
    loggedTypes: [],
    messagesTypes: [],
    configurables: [],
  },
} as const;
