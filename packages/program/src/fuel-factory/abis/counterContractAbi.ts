export const counterContractAbi = {
  types: [
    {
      typeId: 0,
      type: '()',
      components: [],
      typeParameters: null,
    },
    {
      typeId: 1,
      type: 'b256',
      components: null,
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
      type: 'generic T1',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 5,
      type: 'generic T2',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 6,
      type: 'raw untyped ptr',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 7,
      type: 'str[22]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 8,
      type: 'struct GenericStruct',
      components: [
        {
          name: 'myNonGeneric',
          type: 14,
          typeArguments: null,
        },
        {
          name: 'myFirstType',
          type: 4,
          typeArguments: null,
        },
        {
          name: 'mySecondType',
          type: 5,
          typeArguments: null,
        },
      ],
      typeParameters: [4, 5],
    },
    {
      typeId: 9,
      type: 'struct NestedGenericStruct',
      components: [
        {
          name: 'theStruct',
          type: 8,
          typeArguments: [
            {
              name: '',
              type: 16,
              typeArguments: null,
            },
            {
              name: '',
              type: 14,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'nonStruct',
          type: 16,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 10,
      type: 'struct RawVec',
      components: [
        {
          name: 'ptr',
          type: 6,
          typeArguments: null,
        },
        {
          name: 'cap',
          type: 15,
          typeArguments: null,
        },
      ],
      typeParameters: [3],
    },
    {
      typeId: 11,
      type: 'struct StructWithVector',
      components: [
        {
          name: 'amount',
          type: 16,
          typeArguments: null,
        },
        {
          name: 'myVector',
          type: 13,
          typeArguments: [
            {
              name: '',
              type: 16,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'myBoolean',
          type: 2,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 12,
      type: 'struct TestStruct',
      components: [
        {
          name: 'prop1',
          type: 14,
          typeArguments: null,
        },
        {
          name: 'prop2',
          type: 1,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 13,
      type: 'struct Vec',
      components: [
        {
          name: 'buf',
          type: 10,
          typeArguments: [
            {
              name: '',
              type: 3,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'len',
          type: 15,
          typeArguments: null,
        },
      ],
      typeParameters: [3],
    },
    {
      typeId: 14,
      type: 'u16',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 15,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 16,
      type: 'u8',
      components: null,
      typeParameters: null,
    },
  ],
  functions: [
    {
      inputs: [],
      name: 'count',
      output: {
        name: '',
        type: 15,
        typeArguments: null,
      },
      attributes: [
        {
          name: 'storage',
          arguments: ['read'],
        },
      ],
    },
    {
      inputs: [],
      name: 'increment',
      output: {
        name: '',
        type: 0,
        typeArguments: null,
      },
      attributes: [
        {
          name: 'storage',
          arguments: ['read', 'write'],
        },
      ],
    },
    {
      inputs: [
        {
          name: 'struc',
          type: 8,
          typeArguments: [
            {
              name: '',
              type: 14,
              typeArguments: null,
            },
            {
              name: '',
              type: 7,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'incrementBy',
      output: {
        name: '',
        type: 14,
        typeArguments: null,
      },
      attributes: [
        {
          name: 'storage',
          arguments: ['read', 'write'],
        },
      ],
    },
    {
      inputs: [
        {
          name: 'myStruct',
          type: 12,
          typeArguments: null,
        },
      ],
      name: 'structTest',
      output: {
        name: '',
        type: 13,
        typeArguments: [
          {
            name: '',
            type: 14,
            typeArguments: null,
          },
        ],
      },
      attributes: [
        {
          name: 'storage',
          arguments: ['read', 'write'],
        },
      ],
    },
    {
      inputs: [
        {
          name: 'myStruct',
          type: 9,
          typeArguments: null,
        },
      ],
      name: 'testNestedStruct',
      output: {
        name: '',
        type: 2,
        typeArguments: null,
      },
      attributes: [
        {
          name: 'storage',
          arguments: ['read', 'write'],
        },
      ],
    },
    {
      inputs: [
        {
          name: 'myVector',
          type: 13,
          typeArguments: [
            {
              name: '',
              type: 11,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'vectorTest',
      output: {
        name: '',
        type: 13,
        typeArguments: [
          {
            name: '',
            type: 14,
            typeArguments: null,
          },
        ],
      },
      attributes: [
        {
          name: 'storage',
          arguments: ['read', 'write'],
        },
      ],
    },
  ],
  loggedTypes: [],
  messagesTypes: [],
  configurables: [],
} as const;
