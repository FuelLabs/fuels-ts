export const structWithArrayAbi = {
  abi: {
    types: [
      {
        typeId: 0,
        type: '[_; 2]',
        components: [
          {
            name: '__array_element',
            type: 4,
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
        type: 'str[2]',
        components: null,
        typeParameters: null,
      },
      {
        typeId: 3,
        type: 'struct Struct1',
        components: [
          {
            name: 'prop1',
            type: 0,
            typeArguments: null,
          },
          {
            name: 'prop2',
            type: 2,
            typeArguments: null,
          },
        ],
        typeParameters: null,
      },
      {
        typeId: 4,
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
