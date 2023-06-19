export const vectorSimpleAbi = {
  abi: {
    types: [
      {
        typeId: 0,
        type: 'generic T',
        components: null,
        typeParameters: null,
      },
      {
        typeId: 1,
        type: 'raw untyped ptr',
        components: null,
        typeParameters: null,
      },
      {
        typeId: 2,
        type: 'struct RawVec',
        components: [
          {
            name: 'ptr',
            type: 1,
            typeArguments: null,
          },
          {
            name: 'cap',
            type: 4,
            typeArguments: null,
          },
        ],
        typeParameters: [0],
      },
      {
        typeId: 3,
        type: 'struct Vec',
        components: [
          {
            name: 'buf',
            type: 2,
            typeArguments: [
              {
                name: '',
                type: 0,
                typeArguments: null,
              },
            ],
          },
          {
            name: 'len',
            type: 4,
            typeArguments: null,
          },
        ],
        typeParameters: [0],
      },
      {
        typeId: 4,
        type: 'u64',
        components: null,
        typeParameters: null,
      },
      {
        typeId: 5,
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
            type: 3,
            typeArguments: [
              {
                name: '',
                type: 5,
                typeArguments: null,
              },
            ],
          },
        ],
        name: 'main',
        output: {
          name: '',
          type: 3,
          typeArguments: [
            {
              name: '',
              type: 5,
              typeArguments: null,
            },
          ],
        },
        attributes: null,
      },
    ],
    loggedTypes: [],
    messagesTypes: [],
    configurables: [],
  },
} as const;
