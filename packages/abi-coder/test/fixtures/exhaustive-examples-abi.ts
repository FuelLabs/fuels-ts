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
          type: 17,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 18,
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
          type: 11,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 32,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 3,
      type: '(_, _)',
      components: [
        {
          name: '__tuple_element',
          type: 33,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 26,
          typeArguments: [
            {
              name: '',
              type: 27,
              typeArguments: [
                {
                  name: '',
                  type: 32,
                  typeArguments: null,
                },
              ],
            },
            {
              name: '',
              type: 20,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 4,
      type: '(_, _, _, _, _)',
      components: [
        {
          name: '__tuple_element',
          type: 33,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 11,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 7,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 21,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 26,
          typeArguments: [
            {
              name: '',
              type: 33,
              typeArguments: null,
            },
            {
              name: '',
              type: 11,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 5,
      type: '[_; 2]',
      components: [
        {
          name: '__array_element',
          type: 10,
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
          type: 25,
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
          type: 31,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 8,
      type: '[_; 3]',
      components: [
        {
          name: '__array_element',
          type: 17,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 9,
      type: '[_; 4]',
      components: [
        {
          name: '__array_element',
          type: 33,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 10,
      type: 'b256',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 11,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 12,
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
      typeId: 13,
      type: 'enum EnumWithBuiltinType',
      components: [
        {
          name: 'a',
          type: 11,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 32,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 14,
      type: 'enum EnumWithGeneric',
      components: [
        {
          name: 'VariantOne',
          type: 17,
          typeArguments: null,
        },
        {
          name: 'VariantTwo',
          type: 32,
          typeArguments: null,
        },
      ],
      typeParameters: [17],
    },
    {
      typeId: 15,
      type: 'enum EnumWithStructs',
      components: [
        {
          name: 'a',
          type: 12,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 25,
          typeArguments: null,
        },
        {
          name: 'c',
          type: 26,
          typeArguments: [
            {
              name: '',
              type: 32,
              typeArguments: null,
            },
            {
              name: '',
              type: 25,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
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
          type: 17,
          typeArguments: null,
        },
      ],
      typeParameters: [17],
    },
    {
      typeId: 17,
      type: 'generic T',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 18,
      type: 'generic U',
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
      type: 'str[3]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 21,
      type: 'str[4]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 22,
      type: 'str[5]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 23,
      type: 'struct B512',
      components: [
        {
          name: 'bytes',
          type: 5,
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
          type: 19,
          typeArguments: null,
        },
        {
          name: 'cap',
          type: 32,
          typeArguments: null,
        },
      ],
      typeParameters: [17],
    },
    {
      typeId: 25,
      type: 'struct SimpleStruct',
      components: [
        {
          name: 'a',
          type: 11,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 31,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 26,
      type: 'struct StructA',
      components: [
        {
          name: 'propA1',
          type: 17,
          typeArguments: null,
        },
        {
          name: 'propA2',
          type: 18,
          typeArguments: null,
        },
      ],
      typeParameters: [17, 18],
    },
    {
      typeId: 27,
      type: 'struct StructB',
      components: [
        {
          name: 'propB1',
          type: 17,
          typeArguments: null,
        },
      ],
      typeParameters: [17],
    },
    {
      typeId: 28,
      type: 'struct StructWithImplicitGenerics',
      components: [
        {
          name: 'arr',
          type: 8,
          typeArguments: null,
        },
        {
          name: 'tuple',
          type: 1,
          typeArguments: null,
        },
      ],
      typeParameters: [17, 18],
    },
    {
      typeId: 29,
      type: 'struct Vec',
      components: [
        {
          name: 'buf',
          type: 24,
          typeArguments: [
            {
              name: '',
              type: 17,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'len',
          type: 32,
          typeArguments: null,
        },
      ],
      typeParameters: [17],
    },
    {
      typeId: 30,
      type: 'u16',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 31,
      type: 'u32',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 32,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 33,
      type: 'u8',
      components: null,
      typeParameters: null,
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: 'a',
          type: 25,
          typeArguments: null,
        },
        {
          name: 'x',
          type: 29,
          typeArguments: [
            {
              name: '',
              type: 33,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'arg_then_vector_u8',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 9,
          typeArguments: null,
        },
      ],
      name: 'array_simple',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 6,
          typeArguments: null,
        },
      ],
      name: 'array_struct',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 10,
          typeArguments: null,
        },
      ],
      name: 'b_256',
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
          type: 23,
          typeArguments: null,
        },
      ],
      name: 'b_512',
      output: {
        name: '',
        type: 23,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 11,
          typeArguments: null,
        },
      ],
      name: 'boolean',
      output: {
        name: '',
        type: 11,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 12,
          typeArguments: null,
        },
      ],
      name: 'enum_simple',
      output: {
        name: '',
        type: 33,
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
      name: 'enum_with_builtin_type',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 15,
          typeArguments: null,
        },
      ],
      name: 'enum_with_structs',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 16,
          typeArguments: [
            {
              name: '',
              type: 33,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'option_u8',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [],
      name: 'return_configurables',
      output: {
        name: '',
        type: 4,
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
      name: 'string',
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
          name: 'x',
          type: 27,
          typeArguments: [
            {
              name: '',
              type: 33,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'struct_generic_simple',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 25,
          typeArguments: null,
        },
      ],
      name: 'struct_simple',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 28,
          typeArguments: [
            {
              name: '',
              type: 10,
              typeArguments: null,
            },
            {
              name: '',
              type: 33,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'struct_with_implicitGenerics',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 27,
          typeArguments: [
            {
              name: '',
              type: 2,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'struct_with_tuple',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [],
      name: 'test_function',
      output: {
        name: '',
        type: 11,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 3,
          typeArguments: null,
        },
      ],
      name: 'tuple_as_param',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg1',
          type: 10,
          typeArguments: null,
        },
        {
          name: 'arg2',
          type: 11,
          typeArguments: null,
        },
      ],
      name: 'two_args',
      output: {
        name: '',
        type: 11,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 29,
          typeArguments: [
            {
              name: '',
              type: 33,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'y',
          type: 29,
          typeArguments: [
            {
              name: '',
              type: 33,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'two_u8_vectors',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 31,
          typeArguments: null,
        },
        {
          name: 'y',
          type: 29,
          typeArguments: [
            {
              name: '',
              type: 32,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'z',
          type: 29,
          typeArguments: [
            {
              name: '',
              type: 32,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'q',
          type: 29,
          typeArguments: [
            {
              name: '',
              type: 32,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'u32_then_three_vectors_u64',
      output: {
        name: '',
        type: 33,
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
      name: 'u_16',
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
          type: 31,
          typeArguments: null,
        },
      ],
      name: 'u_32',
      output: {
        name: '',
        type: 31,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 32,
          typeArguments: null,
        },
      ],
      name: 'u_64',
      output: {
        name: '',
        type: 32,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 33,
          typeArguments: null,
        },
      ],
      name: 'u_8',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 29,
          typeArguments: [
            {
              name: '',
              type: 11,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'vector_boolean',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 29,
          typeArguments: [
            {
              name: '',
              type: 33,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'vector_u8',
      output: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 29,
          typeArguments: [
            {
              name: '',
              type: 33,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'y',
          type: 10,
          typeArguments: null,
        },
      ],
      name: 'vector_u8_then_arg',
      output: {
        name: '',
        type: 33,
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
        type: 33,
        typeArguments: null,
      },
      offset: 792,
    },
    {
      name: 'BOOL',
      configurableType: {
        name: '',
        type: 11,
        typeArguments: null,
      },
      offset: 800,
    },
    {
      name: 'ARRAY',
      configurableType: {
        name: '',
        type: 7,
        typeArguments: null,
      },
      offset: 808,
    },
    {
      name: 'STR_4',
      configurableType: {
        name: '',
        type: 21,
        typeArguments: null,
      },
      offset: 832,
    },
    {
      name: 'STRUCT',
      configurableType: {
        name: '',
        type: 26,
        typeArguments: [
          {
            name: '',
            type: 33,
            typeArguments: null,
          },
          {
            name: '',
            type: 11,
            typeArguments: null,
          },
        ],
      },
      offset: 840,
    },
  ],
} as const;
