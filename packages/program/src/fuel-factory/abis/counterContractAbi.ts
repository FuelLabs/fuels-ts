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
          type: 28,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 37,
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
          type: 42,
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
          type: 10,
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
      typeId: 4,
      type: '(_, _, _)',
      components: [
        {
          name: '__tuple_element',
          type: 42,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 1,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 42,
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
          type: 29,
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
          type: 30,
          typeArguments: [
            {
              name: '',
              type: 27,
              typeArguments: null,
            },
            {
              name: '',
              type: 38,
              typeArguments: [
                {
                  name: '',
                  type: 42,
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
          type: 39,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 8,
      type: '[_; 5]',
      components: [
        {
          name: '__array_element',
          type: 16,
          typeArguments: [
            {
              name: '',
              type: 39,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 9,
      type: 'b256',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 10,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 11,
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
      typeId: 12,
      type: 'enum Error',
      components: [
        {
          name: 'StateError',
          type: 17,
          typeArguments: null,
        },
        {
          name: 'UserError',
          type: 18,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 13,
      type: 'enum MyEnum',
      components: [
        {
          name: 'Foo',
          type: 41,
          typeArguments: null,
        },
        {
          name: 'Bar',
          type: 10,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 14,
      type: 'enum MyEnumOfStruct',
      components: [
        {
          name: 'Item',
          type: 31,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 15,
      type: 'enum MyGenericEnum',
      components: [
        {
          name: 'Foo',
          type: 19,
          typeArguments: null,
        },
        {
          name: 'Bar',
          type: 22,
          typeArguments: null,
        },
      ],
      typeParameters: [19, 22],
    },
    {
      typeId: 16,
      type: 'enum Option',
      components: [
        {
          name: 'None',
          type: 0,
          typeArguments: null,
        },
        {
          name: 'Some',
          type: 19,
          typeArguments: null,
        },
      ],
      typeParameters: [19],
    },
    {
      typeId: 17,
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
      typeId: 18,
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
      typeId: 19,
      type: 'generic T',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 20,
      type: 'generic T1',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 21,
      type: 'generic T2',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 22,
      type: 'generic U',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 23,
      type: 'generic W1',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 24,
      type: 'generic W2',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 25,
      type: 'raw untyped ptr',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 26,
      type: 'str[22]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 27,
      type: 'str[3]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 28,
      type: 'str[4]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 29,
      type: 'str[5]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 30,
      type: 'struct GenericStruct',
      components: [
        {
          name: 'myNonGeneric',
          type: 39,
          typeArguments: null,
        },
        {
          name: 'myFirstType',
          type: 20,
          typeArguments: null,
        },
        {
          name: 'mySecondType',
          type: 21,
          typeArguments: null,
        },
      ],
      typeParameters: [20, 21],
    },
    {
      typeId: 31,
      type: 'struct Item',
      components: [
        {
          name: 'price',
          type: 41,
          typeArguments: null,
        },
        {
          name: 'amount',
          type: 41,
          typeArguments: null,
        },
        {
          name: 'id',
          type: 41,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 32,
      type: 'struct MyGenericEnumStruct',
      components: [
        {
          name: 'bam',
          type: 15,
          typeArguments: [
            {
              name: '',
              type: 23,
              typeArguments: null,
            },
            {
              name: '',
              type: 24,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: [23, 24],
    },
    {
      typeId: 33,
      type: 'struct MyStruct',
      components: [
        {
          name: 'bim',
          type: 41,
          typeArguments: null,
        },
        {
          name: 'bam',
          type: 13,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 34,
      type: 'struct NestedGenericStruct',
      components: [
        {
          name: 'theStruct',
          type: 30,
          typeArguments: [
            {
              name: '',
              type: 42,
              typeArguments: null,
            },
            {
              name: '',
              type: 19,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'nonStruct',
          type: 42,
          typeArguments: null,
        },
      ],
      typeParameters: [19],
    },
    {
      typeId: 35,
      type: 'struct RawVec',
      components: [
        {
          name: 'ptr',
          type: 25,
          typeArguments: null,
        },
        {
          name: 'cap',
          type: 41,
          typeArguments: null,
        },
      ],
      typeParameters: [19],
    },
    {
      typeId: 36,
      type: 'struct StructWithVector',
      components: [
        {
          name: 'amount',
          type: 42,
          typeArguments: null,
        },
        {
          name: 'myVector',
          type: 38,
          typeArguments: [
            {
              name: '',
              type: 42,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'myBoolean',
          type: 10,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 37,
      type: 'struct TestStruct',
      components: [
        {
          name: 'prop1',
          type: 39,
          typeArguments: null,
        },
        {
          name: 'prop2',
          type: 9,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 38,
      type: 'struct Vec',
      components: [
        {
          name: 'buf',
          type: 35,
          typeArguments: [
            {
              name: '',
              type: 19,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'len',
          type: 41,
          typeArguments: null,
        },
      ],
      typeParameters: [19],
    },
    {
      typeId: 39,
      type: 'u16',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 40,
      type: 'u32',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 41,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 42,
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
          type: 33,
          typeArguments: null,
        },
      ],
      name: 'complex_function',
      output: {
        name: '',
        type: 10,
        typeArguments: null,
      },
      attributes: [
        {
          name: 'payable',
          arguments: [],
        },
        {
          name: 'storage',
          arguments: ['read', 'write'],
        },
      ],
    },
    {
      inputs: [],
      name: 'count',
      output: {
        name: '',
        type: 41,
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
        type: 10,
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
          type: 38,
          typeArguments: [
            {
              name: '',
              type: 30,
              typeArguments: [
                {
                  name: '',
                  type: 37,
                  typeArguments: null,
                },
                {
                  name: '',
                  type: 38,
                  typeArguments: [
                    {
                      name: '',
                      type: 42,
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
        type: 10,
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
          type: 30,
          typeArguments: [
            {
              name: '',
              type: 39,
              typeArguments: null,
            },
            {
              name: '',
              type: 26,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'incrementBy',
      output: {
        name: '',
        type: 39,
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
        type: 10,
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
          type: 8,
          typeArguments: null,
        },
      ],
      name: 'regularOptionArray',
      output: {
        name: '',
        type: 10,
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
          type: 37,
          typeArguments: null,
        },
      ],
      name: 'structTest',
      output: {
        name: '',
        type: 38,
        typeArguments: [
          {
            name: '',
            type: 39,
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
          name: 'NestedGenericStruct',
          type: 34,
          typeArguments: [
            {
              name: '',
              type: 30,
              typeArguments: [
                {
                  name: '',
                  type: 42,
                  typeArguments: null,
                },
                {
                  name: '',
                  type: 30,
                  typeArguments: [
                    {
                      name: '',
                      type: 42,
                      typeArguments: null,
                    },
                    {
                      name: '',
                      type: 37,
                      typeArguments: null,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      name: 'testDeeplyNestedGenericStruct',
      output: {
        name: '',
        type: 10,
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
          type: 11,
          typeArguments: null,
        },
      ],
      name: 'testEnum',
      output: {
        name: '',
        type: 10,
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
          type: 12,
          typeArguments: null,
        },
      ],
      name: 'testEnumOfEnums',
      output: {
        name: '',
        type: 10,
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
          type: 14,
          typeArguments: null,
        },
      ],
      name: 'testEnumStruct',
      output: {
        name: '',
        type: 10,
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
          name: 'enumStruct',
          type: 32,
          typeArguments: [
            {
              name: '',
              type: 29,
              typeArguments: null,
            },
            {
              name: '',
              type: 40,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'testGenericEnum',
      output: {
        name: '',
        type: 10,
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
          type: 34,
          typeArguments: [
            {
              name: '',
              type: 42,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'testNestedStruct',
      output: {
        name: '',
        type: 10,
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
        type: 10,
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
        type: 10,
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
          type: 38,
          typeArguments: [
            {
              name: '',
              type: 36,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'vectorTest',
      output: {
        name: '',
        type: 38,
        typeArguments: [
          {
            name: '',
            type: 39,
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
