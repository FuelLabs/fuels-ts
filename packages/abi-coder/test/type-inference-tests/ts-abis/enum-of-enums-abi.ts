export const enumOfEnumsAbi = {
  abi: {
    types: [
      {
        typeId: 0,
        type: '()',
        components: [],
        typeParameters: null,
      },
      {
        typeId: 1,
        type: 'enum LetterEnum',
        components: [
          {
            name: 'a',
            type: 0,
            typeArguments: null,
          },
          {
            name: 'b',
            type: 0,
            typeArguments: null,
          },
          {
            name: 'c',
            type: 0,
            typeArguments: null,
          },
        ],
        typeParameters: null,
      },
      {
        typeId: 2,
        type: 'enum MyEnum',
        components: [
          {
            name: 'letter',
            type: 1,
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
            type: 2,
            typeArguments: null,
          },
        ],
        name: 'main',
        output: {
          name: '',
          type: 2,
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
