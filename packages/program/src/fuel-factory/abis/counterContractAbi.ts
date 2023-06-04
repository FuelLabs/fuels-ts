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
      type: '(_, _)',
      components: [
        {
          name: '__tuple_element',
          type: 22,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 30,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 2,
      type: '(_, _)',
      components: [
        {
          name: '__tuple_element',
          type: 34,
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
      typeId: 3,
      type: '(_, _, _)',
      components: [
        {
          name: '__tuple_element',
          type: 5,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 9,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 8,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 4,
      type: '(_, _, _)',
      components: [
        {
          name: '__tuple_element',
          type: 34,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 1,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 34,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 5,
      type: '[_; 3]',
      components: [
        {
          name: '__array_element',
          type: 23,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 6,
      type: '[_; 5]',
      components: [
        {
          name: '__array_element',
          type: 24,
          typeArguments: [
            {
              name: '',
              type: 21,
              typeArguments: null,
            },
            {
              name: '',
              type: 31,
              typeArguments: [
                {
                  name: '',
                  type: 34,
                  typeArguments: null,
                },
              ],
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 7,
      type: '[_; 5]',
      components: [
        {
          name: '__array_element',
          type: 32,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 8,
      type: 'b256',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 9,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 10,
      type: 'enum Color',
      components: [
        {
          name: 'Blue',
          type: 0,
          typeArguments: null,
        },
        {
          name: 'Green',
          type: 0,
          typeArguments: null,
        },
        {
          name: 'Red',
          type: 0,
          typeArguments: null,
        },
        {
          name: 'Silver',
          type: 0,
          typeArguments: null,
        },
        {
          name: 'Grey',
          type: 0,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 11,
      type: 'enum Error',
      components: [
        {
          name: 'StateError',
          type: 14,
          typeArguments: null,
        },
        {
          name: 'UserError',
          type: 15,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 12,
      type: 'enum MyEnum',
      components: [
        {
          name: 'Foo',
          type: 33,
          typeArguments: null,
        },
        {
          name: 'Bar',
          type: 9,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 13,
      type: 'enum MyEnumOfStruct',
      components: [
        {
          name: 'Item',
          type: 25,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 14,
      type: 'enum StateError',
      components: [
        {
          name: 'Void',
          type: 0,
          typeArguments: null,
        },
        {
          name: 'Pending',
          type: 0,
          typeArguments: null,
        },
        {
          name: 'Completed',
          type: 0,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 15,
      type: 'enum UserError',
      components: [
        {
          name: 'InsufficientPermissions',
          type: 0,
          typeArguments: null,
        },
        {
          name: 'Unauthorized',
          type: 0,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 16,
      type: 'generic T',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 17,
      type: 'generic T1',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 18,
      type: 'generic T2',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 19,
      type: 'raw untyped ptr',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 20,
      type: 'str[22]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 21,
      type: 'str[3]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 22,
      type: 'str[4]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 23,
      type: 'str[5]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 24,
      type: 'struct GenericStruct',
      components: [
        {
          name: 'myNonGeneric',
          type: 32,
          typeArguments: null,
        },
        {
          name: 'myFirstType',
          type: 17,
          typeArguments: null,
        },
        {
          name: 'mySecondType',
          type: 18,
          typeArguments: null,
        },
      ],
      typeParameters: [17, 18],
    },
    {
      typeId: 25,
      type: 'struct Item',
      components: [
        {
          name: 'price',
          type: 33,
          typeArguments: null,
        },
        {
          name: 'amount',
          type: 33,
          typeArguments: null,
        },
        {
          name: 'id',
          type: 33,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 26,
      type: 'struct MyStruct',
      components: [
        {
          name: 'bim',
          type: 33,
          typeArguments: null,
        },
        {
          name: 'bam',
          type: 12,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 27,
      type: 'struct NestedGenericStruct',
      components: [
        {
          name: 'theStruct',
          type: 24,
          typeArguments: [
            {
              name: '',
              type: 34,
              typeArguments: null,
            },
            {
              name: '',
              type: 32,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'nonStruct',
          type: 34,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 28,
      type: 'struct RawVec',
      components: [
        {
          name: 'ptr',
          type: 19,
          typeArguments: null,
        },
        {
          name: 'cap',
          type: 33,
          typeArguments: null,
        },
      ],
      typeParameters: [16],
    },
    {
      typeId: 29,
      type: 'struct StructWithVector',
      components: [
        {
          name: 'amount',
          type: 34,
          typeArguments: null,
        },
        {
          name: 'myVector',
          type: 31,
          typeArguments: [
            {
              name: '',
              type: 34,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'myBoolean',
          type: 9,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 30,
      type: 'struct TestStruct',
      components: [
        {
          name: 'prop1',
          type: 32,
          typeArguments: null,
        },
        {
          name: 'prop2',
          type: 8,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 31,
      type: 'struct Vec',
      components: [
        {
          name: 'buf',
          type: 28,
          typeArguments: [
            {
              name: '',
              type: 16,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'len',
          type: 33,
          typeArguments: null,
        },
      ],
      typeParameters: [16],
    },
    {
      typeId: 32,
      type: 'u16',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 33,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 34,
      type: 'u8',
      components: null,
      typeParameters: null,
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: 'arg1',
          type: 3,
          typeArguments: null,
        },
        {
          name: 'arg2',
          type: 26,
          typeArguments: null,
        },
      ],
      name: 'complex_function',
      output: {
        name: '',
        type: 9,
        typeArguments: null,
      },
      attributes: [
        {
          name: 'storage',
          arguments: ['read', 'write'],
        },
        {
          name: 'payable',
          arguments: [],
        },
      ],
    },
    {
      inputs: [],
      name: 'count',
      output: {
        name: '',
        type: 33,
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
      inputs: [
        {
          name: 'arr',
          type: 6,
          typeArguments: null,
        },
      ],
      name: 'genericArray',
      output: {
        name: '',
        type: 9,
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
      inputs: [
        {
          name: 'myVector',
          type: 31,
          typeArguments: [
            {
              name: '',
              type: 24,
              typeArguments: [
                {
                  name: '',
                  type: 30,
                  typeArguments: null,
                },
                {
                  name: '',
                  type: 31,
                  typeArguments: [
                    {
                      name: '',
                      type: 34,
                      typeArguments: null,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      name: 'genericVectorStructTest',
      output: {
        name: '',
        type: 9,
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
          type: 24,
          typeArguments: [
            {
              name: '',
              type: 32,
              typeArguments: null,
            },
            {
              name: '',
              type: 20,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'incrementBy',
      output: {
        name: '',
        type: 32,
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
          name: 'arr',
          type: 7,
          typeArguments: null,
        },
      ],
      name: 'regularArray',
      output: {
        name: '',
        type: 9,
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
      inputs: [
        {
          name: 'myStruct',
          type: 30,
          typeArguments: null,
        },
      ],
      name: 'structTest',
      output: {
        name: '',
        type: 31,
        typeArguments: [
          {
            name: '',
            type: 32,
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
          name: 'enm',
          type: 10,
          typeArguments: null,
        },
      ],
      name: 'testEnum',
      output: {
        name: '',
        type: 9,
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
      inputs: [
        {
          name: 'enm',
          type: 11,
          typeArguments: null,
        },
      ],
      name: 'testEnumOfEnums',
      output: {
        name: '',
        type: 9,
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
          name: 'enm',
          type: 13,
          typeArguments: null,
        },
      ],
      name: 'testEnumStruct',
      output: {
        name: '',
        type: 9,
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
      inputs: [
        {
          name: 'myStruct',
          type: 27,
          typeArguments: null,
        },
      ],
      name: 'testNestedStruct',
      output: {
        name: '',
        type: 9,
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
          name: 'tpl',
          type: 2,
          typeArguments: null,
        },
      ],
      name: 'testTuple',
      output: {
        name: '',
        type: 9,
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
      inputs: [
        {
          name: 'tpl',
          type: 4,
          typeArguments: null,
        },
      ],
      name: 'testTupleGeneric',
      output: {
        name: '',
        type: 9,
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
      inputs: [
        {
          name: 'myVector',
          type: 31,
          typeArguments: [
            {
              name: '',
              type: 29,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'vectorTest',
      output: {
        name: '',
        type: 31,
        typeArguments: [
          {
            name: '',
            type: 32,
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
