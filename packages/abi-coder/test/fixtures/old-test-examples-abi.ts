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
          type: 16,
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
      typeId: 2,
      type: '[_; 2]',
      components: [
        {
          name: '__array_element',
          type: 15,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 3,
      type: '[_; 3]',
      components: [
        {
          name: '__array_element',
          type: 20,
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
          type: 7,
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
          type: 15,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 6,
      type: '[_; 4]',
      components: [
        {
          name: '__array_element',
          type: 17,
          typeArguments: [
            {
              name: '',
              type: 22,
              typeArguments: null,
            },
            {
              name: '',
              type: 8,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 7,
      type: 'b256',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 8,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 9,
      type: 'enum MyEnum',
      components: [
        {
          name: 'Foo',
          type: 22,
          typeArguments: null,
        },
        {
          name: 'Bar',
          type: 8,
          typeArguments: null,
        },
        {
          name: 'Din',
          type: 8,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 10,
      type: 'enum MyGenericEnum',
      components: [
        {
          name: 'Foo',
          type: 22,
          typeArguments: null,
        },
        {
          name: 'Bar',
          type: 8,
          typeArguments: null,
        },
      ],
      typeParameters: [14],
    },
    {
      typeId: 11,
      type: 'enum TestEnum',
      components: [
        {
          name: 'Value',
          type: 8,
          typeArguments: null,
        },
        {
          name: 'Data',
          type: 8,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 12,
      type: 'generic T',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 13,
      type: 'generic U',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 14,
      type: 'generic V',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 15,
      type: 'str[3]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 16,
      type: 'str[5]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 17,
      type: 'struct MyGenericStruct',
      components: [
        {
          name: 'bim',
          type: 12,
          typeArguments: null,
        },
        {
          name: 'bam',
          type: 10,
          typeArguments: [
            {
              name: '',
              type: 22,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: [12, 13],
    },
    {
      typeId: 18,
      type: 'struct MyOtherStruct',
      components: [
        {
          name: 'bom',
          type: 22,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 19,
      type: 'struct MyStruct',
      components: [
        {
          name: 'dummy_a',
          type: 8,
          typeArguments: null,
        },
        {
          name: 'dummy_b',
          type: 22,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 20,
      type: 'struct MyStructWithEnum',
      components: [
        {
          name: 'bim',
          type: 15,
          typeArguments: null,
        },
        {
          name: 'bam',
          type: 9,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 21,
      type: 'struct Test',
      components: [
        {
          name: 'foo',
          type: 22,
          typeArguments: null,
        },
        {
          name: 'bar',
          type: 22,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 22,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 23,
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
      ],
      name: 'array_of_structs',
      output: {
        name: '',
        type: 15,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg1',
          type: 17,
          typeArguments: [
            {
              name: '',
              type: 4,
              typeArguments: null,
            },
            {
              name: '',
              type: 23,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'arg2',
          type: 6,
          typeArguments: null,
        },
        {
          name: 'arg3',
          type: 1,
          typeArguments: null,
        },
        {
          name: 'arg4',
          type: 18,
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
          type: 22,
          typeArguments: null,
        },
      ],
      name: 'entry_one',
      output: {
        name: '',
        type: 22,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'my_u64',
          type: 22,
          typeArguments: null,
        },
        {
          name: 'my_struct',
          type: 19,
          typeArguments: null,
        },
      ],
      name: 'my_struct',
      output: {
        name: '',
        type: 22,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'a',
          type: 22,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 22,
          typeArguments: null,
        },
      ],
      name: 'sum',
      output: {
        name: '',
        type: 22,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'test',
          type: 21,
          typeArguments: null,
        },
      ],
      name: 'sum_test',
      output: {
        name: '',
        type: 22,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'enum_arg',
          type: 11,
          typeArguments: null,
        },
      ],
      name: 'take_enum',
      output: {
        name: '',
        type: 8,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 5,
          typeArguments: null,
        },
      ],
      name: 'takes_array',
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
} as const;
