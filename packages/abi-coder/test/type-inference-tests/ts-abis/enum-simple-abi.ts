export const enumSimpleAbi = {
  abi: {
    types: [
      {
        typeId: 0,
        type: 'b256',
        components: null,
        typeParameters: null,
      },
      {
        typeId: 1,
        type: 'enum MyEnum',
        components: [
          {
            name: 'Checked',
            type: 0,
            typeArguments: null,
          },
          {
            name: 'Pending',
            type: 0,
            typeArguments: null,
          },
        ],
        typeParameters: null,
      },
    ],
    functions: [
      {
        inputs: [
          {
            name: 'x',
            type: 1,
            typeArguments: null,
          },
        ],
        name: 'main',
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
