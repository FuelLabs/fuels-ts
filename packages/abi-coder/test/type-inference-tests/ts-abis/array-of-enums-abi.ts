export const arrayOfEnumsAbi = {
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
        type: '[_; 2]',
        components: [
          {
            name: '__array_element',
            type: 2,
            typeArguments: null,
          },
        ],
        typeParameters: null,
      },
      {
        typeId: 2,
        type: 'enum LettersEnum',
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
        typeId: 3,
        type: 'enum MyStruct',
        components: [
          {
            name: 'letters',
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
            type: 3,
            typeArguments: null,
          },
        ],
        name: 'main',
        output: {
          name: '',
          type: 3,
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
