export const oldTestExamplesAbi = {
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
          type: 19,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 10,
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
          type: 14,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 15,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 3,
      type: '[_; 2]',
      components: [
        {
          name: '__array_element',
          type: 18,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 4,
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
      typeId: 5,
      type: '[_; 3]',
      components: [
        {
          name: '__array_element',
          type: 9,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 6,
      type: '[_; 3]',
      components: [
        {
          name: '__array_element',
          type: 14,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 7,
      type: '[_; 3]',
      components: [
        {
          name: '__array_element',
          type: 18,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 8,
      type: '[_; 4]',
      components: [
        {
          name: '__array_element',
          type: 20,
          typeArguments: [
            {
              name: '',
              type: 28,
              typeArguments: null,
            },
            {
              name: '',
              type: 10,
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
      type: 'enum MyEnum',
      components: [
        {
          name: 'Foo',
          type: 28,
          typeArguments: null,
        },
        {
          name: 'Bar',
          type: 10,
          typeArguments: null,
        },
        {
          name: 'Din',
          type: 10,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 12,
      type: 'enum MyGenericEnum',
      components: [
        {
          name: 'Foo',
          type: 28,
          typeArguments: null,
        },
        {
          name: 'Bar',
          type: 10,
          typeArguments: null,
        },
      ],
      typeParameters: [16],
    },
    {
      typeId: 13,
      type: 'enum TestEnum',
      components: [
        {
          name: 'Value',
          type: 10,
          typeArguments: null,
        },
        {
          name: 'Data',
          type: 10,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 14,
      type: 'generic T',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 15,
      type: 'generic U',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 16,
      type: 'generic V',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 17,
      type: 'raw untyped ptr',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 18,
      type: 'str[3]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 19,
      type: 'str[5]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 20,
      type: 'struct MyGenericStruct',
      components: [
        {
          name: 'bim',
          type: 14,
          typeArguments: null,
        },
        {
          name: 'bam',
          type: 12,
          typeArguments: [
            {
              name: '',
              type: 28,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: [14, 15],
    },
    {
      typeId: 21,
      type: 'struct MyOtherStruct',
      components: [
        {
          name: 'bom',
          type: 28,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 22,
      type: 'struct MyStruct',
      components: [
        {
          name: 'dummy_a',
          type: 10,
          typeArguments: null,
        },
        {
          name: 'dummy_b',
          type: 28,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 23,
      type: 'struct MyStructWithEnum',
      components: [
        {
          name: 'bim',
          type: 18,
          typeArguments: null,
        },
        {
          name: 'bam',
          type: 11,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 24,
      type: 'struct RawVec',
      components: [
        {
          name: 'ptr',
          type: 17,
          typeArguments: null,
        },
        {
          name: 'cap',
          type: 28,
          typeArguments: null,
        },
      ],
      typeParameters: [14],
    },
    {
      typeId: 25,
      type: 'struct StructWithImplicitGenerics',
      components: [
        {
          name: 'arr',
          type: 6,
          typeArguments: null,
        },
        {
          name: 'tuple',
          type: 2,
          typeArguments: null,
        },
      ],
      typeParameters: [14, 15],
    },
    {
      typeId: 26,
      type: 'struct Test',
      components: [
        {
          name: 'foo',
          type: 28,
          typeArguments: null,
        },
        {
          name: 'bar',
          type: 28,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 27,
      type: 'struct Vec',
      components: [
        {
          name: 'buf',
          type: 24,
          typeArguments: [
            {
              name: '',
              type: 14,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'len',
          type: 28,
          typeArguments: null,
        },
      ],
      typeParameters: [14],
    },
    {
      typeId: 28,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 29,
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
          type: 4,
          typeArguments: null,
        },
      ],
      name: 'array_of_structs',
      output: {
        name: '',
        type: 18,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg1',
          type: 20,
          typeArguments: [
            {
              name: '',
              type: 5,
              typeArguments: null,
            },
            {
              name: '',
              type: 29,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'arg2',
          type: 8,
          typeArguments: null,
        },
        {
          name: 'arg3',
          type: 1,
          typeArguments: null,
        },
        {
          name: 'arg4',
          type: 21,
          typeArguments: null,
        },
      ],
      name: 'complex_function',
      output: {
        name: '',
        type: 0,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 28,
          typeArguments: null,
        },
      ],
      name: 'entry_one',
      output: {
        name: '',
        type: 28,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'my_u64',
          type: 28,
          typeArguments: null,
        },
        {
          name: 'my_struct',
          type: 22,
          typeArguments: null,
        },
      ],
      name: 'my_struct',
      output: {
        name: '',
        type: 28,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 27,
          typeArguments: [
            {
              name: '',
              type: 29,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'simple_vector',
      output: {
        name: '',
        type: 0,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 25,
          typeArguments: [
            {
              name: '',
              type: 9,
              typeArguments: null,
            },
            {
              name: '',
              type: 29,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'struct_with_implicitGenerics',
      output: {
        name: '',
        type: 29,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'a',
          type: 28,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 28,
          typeArguments: null,
        },
      ],
      name: 'sum',
      output: {
        name: '',
        type: 28,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'test',
          type: 26,
          typeArguments: null,
        },
      ],
      name: 'sum_test',
      output: {
        name: '',
        type: 28,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'enum_arg',
          type: 13,
          typeArguments: null,
        },
      ],
      name: 'take_enum',
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
          name: 'arg',
          type: 7,
          typeArguments: null,
        },
      ],
      name: 'takes_array',
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
} as const;
