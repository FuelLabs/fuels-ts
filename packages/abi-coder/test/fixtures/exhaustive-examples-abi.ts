export const exhaustiveExamplesAbi = {
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
          type: 9,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 29,
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
          type: 30,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 24,
          typeArguments: [
            {
              name: '',
              type: 25,
              typeArguments: [
                {
                  name: '',
                  type: 29,
                  typeArguments: null,
                },
              ],
            },
            {
              name: '',
              type: 18,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 3,
      type: '(_, _, _, _, _)',
      components: [
        {
          name: '__tuple_element',
          type: 30,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 9,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 6,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 19,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 24,
          typeArguments: [
            {
              name: '',
              type: 30,
              typeArguments: null,
            },
            {
              name: '',
              type: 9,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 4,
      type: '[_; 2]',
      components: [
        {
          name: '__array_element',
          type: 8,
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
      type: '[_; 3]',
      components: [
        {
          name: '__array_element',
          type: 28,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 7,
      type: '[_; 4]',
      components: [
        {
          name: '__array_element',
          type: 30,
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
      type: 'enum EnumWithBuiltinType',
      components: [
        {
          name: 'a',
          type: 9,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 29,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 12,
      type: 'enum EnumWithGeneric',
      components: [
        {
          name: 'VariantOne',
          type: 15,
          typeArguments: null,
        },
        {
          name: 'VariantTwo',
          type: 29,
          typeArguments: null,
        },
      ],
      typeParameters: [15],
    },
    {
      typeId: 13,
      type: 'enum EnumWithStructs',
      components: [
        {
          name: 'a',
          type: 10,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 23,
          typeArguments: null,
        },
        {
          name: 'c',
          type: 24,
          typeArguments: [
            {
              name: '',
              type: 29,
              typeArguments: null,
            },
            {
              name: '',
              type: 23,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 14,
      type: 'enum Option',
      components: [
        {
          name: 'None',
          type: 0,
          typeArguments: null,
        },
        {
          name: 'Some',
          type: 15,
          typeArguments: null,
        },
      ],
      typeParameters: [15],
    },
    {
      typeId: 15,
      type: 'generic T',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 16,
      type: 'generic U',
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
      type: 'str[4]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 20,
      type: 'str[5]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 21,
      type: 'struct B512',
      components: [
        {
          name: 'bytes',
          type: 4,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 22,
      type: 'struct RawVec',
      components: [
        {
          name: 'ptr',
          type: 17,
          typeArguments: null,
        },
        {
          name: 'cap',
          type: 29,
          typeArguments: null,
        },
      ],
      typeParameters: [15],
    },
    {
      typeId: 23,
      type: 'struct SimpleStruct',
      components: [
        {
          name: 'a',
          type: 9,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 28,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 24,
      type: 'struct StructA',
      components: [
        {
          name: 'propA1',
          type: 15,
          typeArguments: null,
        },
        {
          name: 'propA2',
          type: 16,
          typeArguments: null,
        },
      ],
      typeParameters: [15, 16],
    },
    {
      typeId: 25,
      type: 'struct StructB',
      components: [
        {
          name: 'propB1',
          type: 15,
          typeArguments: null,
        },
      ],
      typeParameters: [15],
    },
    {
      typeId: 26,
      type: 'struct Vec',
      components: [
        {
          name: 'buf',
          type: 22,
          typeArguments: [
            {
              name: '',
              type: 15,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'len',
          type: 29,
          typeArguments: null,
        },
      ],
      typeParameters: [15],
    },
    {
      typeId: 27,
      type: 'u16',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 28,
      type: 'u32',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 29,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 30,
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
          type: 7,
          typeArguments: null,
        },
      ],
      name: 'array_simple',
      output: {
        name: '',
        type: 30,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 5,
          typeArguments: null,
        },
      ],
      name: 'array_struct',
      output: {
        name: '',
        type: 30,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 8,
          typeArguments: null,
        },
      ],
      name: 'b_256',
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
          type: 21,
          typeArguments: null,
        },
      ],
      name: 'b_512',
      output: {
        name: '',
        type: 21,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 9,
          typeArguments: null,
        },
      ],
      name: 'boolean',
      output: {
        name: '',
        type: 9,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 10,
          typeArguments: null,
        },
      ],
      name: 'enum_simple',
      output: {
        name: '',
        type: 30,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 11,
          typeArguments: null,
        },
      ],
      name: 'enum_with_builtin_type',
      output: {
        name: '',
        type: 30,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 13,
          typeArguments: null,
        },
      ],
      name: 'enum_with_structs',
      output: {
        name: '',
        type: 30,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 14,
          typeArguments: [
            {
              name: '',
              type: 30,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'option_u8',
      output: {
        name: '',
        type: 30,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [],
      name: 'return_configurables',
      output: {
        name: '',
        type: 3,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 20,
          typeArguments: null,
        },
      ],
      name: 'string',
      output: {
        name: '',
        type: 20,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 25,
          typeArguments: [
            {
              name: '',
              type: 30,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'struct_generic_simple',
      output: {
        name: '',
        type: 30,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 23,
          typeArguments: null,
        },
      ],
      name: 'struct_simple',
      output: {
        name: '',
        type: 30,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 25,
          typeArguments: [
            {
              name: '',
              type: 1,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'struct_with_tuple',
      output: {
        name: '',
        type: 30,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [],
      name: 'test_function',
      output: {
        name: '',
        type: 9,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 2,
          typeArguments: null,
        },
      ],
      name: 'tuple_as_param',
      output: {
        name: '',
        type: 30,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg1',
          type: 8,
          typeArguments: null,
        },
        {
          name: 'arg2',
          type: 9,
          typeArguments: null,
        },
      ],
      name: 'two_args',
      output: {
        name: '',
        type: 9,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 27,
          typeArguments: null,
        },
      ],
      name: 'u_16',
      output: {
        name: '',
        type: 27,
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
      name: 'u_32',
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
          type: 29,
          typeArguments: null,
        },
      ],
      name: 'u_64',
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
          name: 'arg',
          type: 30,
          typeArguments: null,
        },
      ],
      name: 'u_8',
      output: {
        name: '',
        type: 30,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 26,
          typeArguments: [
            {
              name: '',
              type: 9,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'vector_boolean',
      output: {
        name: '',
        type: 30,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 26,
          typeArguments: [
            {
              name: '',
              type: 30,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'vector_u8',
      output: {
        name: '',
        type: 30,
        typeArguments: null,
      },
      attributes: null,
    },
  ],
  loggedTypes: [],
  messagesTypes: [],
  configurables: [
    {
      name: 'U8',
      configurableType: {
        name: '',
        type: 30,
        typeArguments: null,
      },
      offset: 648,
    },
    {
      name: 'BOOL',
      configurableType: {
        name: '',
        type: 9,
        typeArguments: null,
      },
      offset: 656,
    },
    {
      name: 'ARRAY',
      configurableType: {
        name: '',
        type: 6,
        typeArguments: null,
      },
      offset: 664,
    },
    {
      name: 'STR_4',
      configurableType: {
        name: '',
        type: 19,
        typeArguments: null,
      },
      offset: 688,
    },
    {
      name: 'STRUCT',
      configurableType: {
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
            type: 9,
            typeArguments: null,
          },
        ],
      },
      offset: 696,
    },
  ],
} as const;
