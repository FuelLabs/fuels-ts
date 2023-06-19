export const arrayWithGenericsAbi = {
  abi: {
    types: [
      {
        typeId: 0,
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
        typeId: 1,
        type: '[_; 2]',
        components: [
          {
            name: '__array_element',
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
        type: 'str[1]',
        components: null,
        typeParameters: null,
      },
      {
        typeId: 6,
        type: 'struct Generic1',
        components: [
          {
            name: 'prop1',
            type: 3,
            typeArguments: null,
          },
          {
            name: 'prop2',
            type: 4,
            typeArguments: null,
          },
        ],
        typeParameters: [3, 4],
      },
      {
        typeId: 7,
        type: 'struct Generic2',
        components: [
          {
            name: 'prop1',
            type: 3,
            typeArguments: null,
          },
          {
            name: 'prop2',
            type: 0,
            typeArguments: null,
          },
        ],
        typeParameters: [3],
      },
      {
        typeId: 8,
        type: 'struct MyArrayWithGenerics',
        components: [
          {
            name: 'prop1',
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
        name: 'simple',
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
        name: 'with_generics',
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
