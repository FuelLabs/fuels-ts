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
          type: 34,
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
          type: 28,
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
      typeId: 3,
      type: '(_, _)',
      components: [
        {
          name: '__tuple_element',
          type: 18,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 50,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 4,
      type: '(_, _)',
      components: [
        {
          name: '__tuple_element',
          type: 51,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 42,
          typeArguments: [
            {
              name: '',
              type: 43,
              typeArguments: [
                {
                  name: '',
                  type: 50,
                  typeArguments: null,
                },
              ],
            },
            {
              name: '',
              type: 32,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 5,
      type: '(_, _, _, _, _)',
      components: [
        {
          name: '__tuple_element',
          type: 51,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 18,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 12,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 33,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 42,
          typeArguments: [
            {
              name: '',
              type: 51,
              typeArguments: null,
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
      typeId: 6,
      type: '[_; 1]',
      components: [
        {
          name: '__array_element',
          type: 47,
          typeArguments: [
            {
              name: '',
              type: 49,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 7,
      type: '[_; 2]',
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
      typeId: 8,
      type: '[_; 2]',
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
      typeId: 9,
      type: '[_; 3]',
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
      typeId: 10,
      type: '[_; 3]',
      components: [
        {
          name: '__array_element',
          type: 41,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 11,
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
      typeId: 12,
      type: '[_; 3]',
      components: [
        {
          name: '__array_element',
          type: 49,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 13,
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
      typeId: 14,
      type: '[_; 3]',
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
      typeId: 15,
      type: '[_; 4]',
      components: [
        {
          name: '__array_element',
          type: 51,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 16,
      type: '[_; 4]',
      components: [
        {
          name: '__array_element',
          type: 36,
          typeArguments: [
            {
              name: '',
              type: 50,
              typeArguments: null,
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
      typeId: 17,
      type: 'b256',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 18,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 19,
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
      typeId: 20,
      type: 'enum EnumWithBuiltinType',
      components: [
        {
          name: 'a',
          type: 18,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 50,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 21,
      type: 'enum EnumWithGeneric',
      components: [
        {
          name: 'VariantOne',
          type: 28,
          typeArguments: null,
        },
        {
          name: 'VariantTwo',
          type: 50,
          typeArguments: null,
        },
      ],
      typeParameters: [28],
    },
    {
      typeId: 22,
      type: 'enum EnumWithStructs',
      components: [
        {
          name: 'a',
          type: 19,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 41,
          typeArguments: null,
        },
        {
          name: 'c',
          type: 42,
          typeArguments: [
            {
              name: '',
              type: 50,
              typeArguments: null,
            },
            {
              name: '',
              type: 41,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 23,
      type: 'enum EnumWithVector',
      components: [
        {
          name: 'num',
          type: 51,
          typeArguments: null,
        },
        {
          name: 'vec',
          type: 47,
          typeArguments: [
            {
              name: '',
              type: 51,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 24,
      type: 'enum MyEnum',
      components: [
        {
          name: 'Foo',
          type: 50,
          typeArguments: null,
        },
        {
          name: 'Bar',
          type: 18,
          typeArguments: null,
        },
        {
          name: 'Din',
          type: 18,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 25,
      type: 'enum MyGenericEnum',
      components: [
        {
          name: 'Foo',
          type: 50,
          typeArguments: null,
        },
        {
          name: 'Bar',
          type: 18,
          typeArguments: null,
        },
      ],
      typeParameters: [30],
    },
    {
      typeId: 26,
      type: 'enum Option',
      components: [
        {
          name: 'None',
          type: 0,
          typeArguments: null,
        },
        {
          name: 'Some',
          type: 28,
          typeArguments: null,
        },
      ],
      typeParameters: [28],
    },
    {
      typeId: 27,
      type: 'enum TestEnum',
      components: [
        {
          name: 'Value',
          type: 18,
          typeArguments: null,
        },
        {
          name: 'Data',
          type: 18,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 28,
      type: 'generic T',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 29,
      type: 'generic U',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 30,
      type: 'generic V',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 31,
      type: 'raw untyped ptr',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 32,
      type: 'str[3]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 33,
      type: 'str[4]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 34,
      type: 'str[5]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 35,
      type: 'struct B512',
      components: [
        {
          name: 'bytes',
          type: 7,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 36,
      type: 'struct MyGenericStruct',
      components: [
        {
          name: 'bim',
          type: 28,
          typeArguments: null,
        },
        {
          name: 'bam',
          type: 25,
          typeArguments: [
            {
              name: '',
              type: 50,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: [28, 29],
    },
    {
      typeId: 37,
      type: 'struct MyOtherStruct',
      components: [
        {
          name: 'bom',
          type: 50,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 38,
      type: 'struct MyStruct',
      components: [
        {
          name: 'dummy_a',
          type: 18,
          typeArguments: null,
        },
        {
          name: 'dummy_b',
          type: 50,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 39,
      type: 'struct MyStructWithEnum',
      components: [
        {
          name: 'bim',
          type: 32,
          typeArguments: null,
        },
        {
          name: 'bam',
          type: 24,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 40,
      type: 'struct RawVec',
      components: [
        {
          name: 'ptr',
          type: 31,
          typeArguments: null,
        },
        {
          name: 'cap',
          type: 50,
          typeArguments: null,
        },
      ],
      typeParameters: [28],
    },
    {
      typeId: 41,
      type: 'struct SimpleStruct',
      components: [
        {
          name: 'a',
          type: 18,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 49,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 42,
      type: 'struct StructA',
      components: [
        {
          name: 'propA1',
          type: 28,
          typeArguments: null,
        },
        {
          name: 'propA2',
          type: 29,
          typeArguments: null,
        },
      ],
      typeParameters: [28, 29],
    },
    {
      typeId: 43,
      type: 'struct StructB',
      components: [
        {
          name: 'propB1',
          type: 28,
          typeArguments: null,
        },
      ],
      typeParameters: [28],
    },
    {
      typeId: 44,
      type: 'struct StructWithImplicitGenerics',
      components: [
        {
          name: 'arr',
          type: 13,
          typeArguments: null,
        },
        {
          name: 'tuple',
          type: 2,
          typeArguments: null,
        },
      ],
      typeParameters: [28, 29],
    },
    {
      typeId: 45,
      type: 'struct StructWithVector',
      components: [
        {
          name: 'num',
          type: 51,
          typeArguments: null,
        },
        {
          name: 'vec',
          type: 47,
          typeArguments: [
            {
              name: '',
              type: 51,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 46,
      type: 'struct Test',
      components: [
        {
          name: 'foo',
          type: 50,
          typeArguments: null,
        },
        {
          name: 'bar',
          type: 50,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 47,
      type: 'struct Vec',
      components: [
        {
          name: 'buf',
          type: 40,
          typeArguments: [
            {
              name: '',
              type: 28,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'len',
          type: 50,
          typeArguments: null,
        },
      ],
      typeParameters: [28],
    },
    {
      typeId: 48,
      type: 'u16',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 49,
      type: 'u32',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 50,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 51,
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
          type: 41,
          typeArguments: null,
        },
        {
          name: 'x',
          type: 47,
          typeArguments: [
            {
              name: '',
              type: 51,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'arg_then_vector_u8',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg1',
          type: 9,
          typeArguments: null,
        },
      ],
      name: 'array_of_structs',
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
          name: 'x',
          type: 15,
          typeArguments: null,
        },
      ],
      name: 'array_simple',
      output: {
        name: '',
        type: 51,
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
      name: 'array_struct',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 17,
          typeArguments: null,
        },
      ],
      name: 'b_256',
      output: {
        name: '',
        type: 17,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 35,
          typeArguments: null,
        },
      ],
      name: 'b_512',
      output: {
        name: '',
        type: 35,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 18,
          typeArguments: null,
        },
      ],
      name: 'boolean',
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
          type: 36,
          typeArguments: [
            {
              name: '',
              type: 11,
              typeArguments: null,
            },
            {
              name: '',
              type: 51,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'arg2',
          type: 16,
          typeArguments: null,
        },
        {
          name: 'arg3',
          type: 1,
          typeArguments: null,
        },
        {
          name: 'arg4',
          type: 37,
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
          type: 50,
          typeArguments: null,
        },
      ],
      name: 'entry_one',
      output: {
        name: '',
        type: 50,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 19,
          typeArguments: null,
        },
      ],
      name: 'enum_simple',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 20,
          typeArguments: null,
        },
      ],
      name: 'enum_with_builtin_type',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 22,
          typeArguments: null,
        },
      ],
      name: 'enum_with_structs',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'my_u64',
          type: 50,
          typeArguments: null,
        },
        {
          name: 'my_struct',
          type: 38,
          typeArguments: null,
        },
      ],
      name: 'my_struct',
      output: {
        name: '',
        type: 50,
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
              type: 51,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'option_u8',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [],
      name: 'return_configurables',
      output: {
        name: '',
        type: 5,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 47,
          typeArguments: [
            {
              name: '',
              type: 51,
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
          type: 34,
          typeArguments: null,
        },
      ],
      name: 'string',
      output: {
        name: '',
        type: 34,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 43,
          typeArguments: [
            {
              name: '',
              type: 51,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'struct_generic_simple',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 41,
          typeArguments: null,
        },
      ],
      name: 'struct_simple',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 44,
          typeArguments: [
            {
              name: '',
              type: 17,
              typeArguments: null,
            },
            {
              name: '',
              type: 51,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'struct_with_implicitGenerics',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 43,
          typeArguments: [
            {
              name: '',
              type: 3,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'struct_with_tuple',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'a',
          type: 50,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 50,
          typeArguments: null,
        },
      ],
      name: 'sum',
      output: {
        name: '',
        type: 50,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'test',
          type: 46,
          typeArguments: null,
        },
      ],
      name: 'sum_test',
      output: {
        name: '',
        type: 50,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'enum_arg',
          type: 27,
          typeArguments: null,
        },
      ],
      name: 'take_enum',
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
          name: 'arg',
          type: 14,
          typeArguments: null,
        },
      ],
      name: 'takes_array',
      output: {
        name: '',
        type: 8,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [],
      name: 'test_function',
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
          name: 'x',
          type: 4,
          typeArguments: null,
        },
      ],
      name: 'tuple_as_param',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg1',
          type: 17,
          typeArguments: null,
        },
        {
          name: 'arg2',
          type: 18,
          typeArguments: null,
        },
      ],
      name: 'two_args',
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
          name: 'x',
          type: 47,
          typeArguments: [
            {
              name: '',
              type: 51,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'y',
          type: 47,
          typeArguments: [
            {
              name: '',
              type: 51,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'two_u8_vectors',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 49,
          typeArguments: null,
        },
        {
          name: 'y',
          type: 47,
          typeArguments: [
            {
              name: '',
              type: 50,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'z',
          type: 47,
          typeArguments: [
            {
              name: '',
              type: 50,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'q',
          type: 47,
          typeArguments: [
            {
              name: '',
              type: 50,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'u32_then_three_vectors_u64',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 48,
          typeArguments: null,
        },
      ],
      name: 'u_16',
      output: {
        name: '',
        type: 48,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 49,
          typeArguments: null,
        },
      ],
      name: 'u_32',
      output: {
        name: '',
        type: 49,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 50,
          typeArguments: null,
        },
      ],
      name: 'u_64',
      output: {
        name: '',
        type: 50,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 51,
          typeArguments: null,
        },
      ],
      name: 'u_8',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 47,
          typeArguments: [
            {
              name: '',
              type: 18,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'vector_boolean',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 6,
          typeArguments: null,
        },
      ],
      name: 'vector_inside_array',
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
          type: 23,
          typeArguments: null,
        },
      ],
      name: 'vector_inside_enum',
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
          type: 45,
          typeArguments: null,
        },
      ],
      name: 'vector_inside_struct',
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
          type: 47,
          typeArguments: [
            {
              name: '',
              type: 47,
              typeArguments: [
                {
                  name: '',
                  type: 49,
                  typeArguments: null,
                },
              ],
            },
          ],
        },
      ],
      name: 'vector_inside_vector',
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
          name: 'x',
          type: 47,
          typeArguments: [
            {
              name: '',
              type: 51,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'vector_u8',
      output: {
        name: '',
        type: 51,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 47,
          typeArguments: [
            {
              name: '',
              type: 51,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'y',
          type: 17,
          typeArguments: null,
        },
      ],
      name: 'vector_u8_then_arg',
      output: {
        name: '',
        type: 51,
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
        type: 51,
        typeArguments: null,
      },
      offset: 1272,
    },
    {
      name: 'BOOL',
      configurableType: {
        name: '',
        type: 18,
        typeArguments: null,
      },
      offset: 1280,
    },
    {
      name: 'ARRAY',
      configurableType: {
        name: '',
        type: 12,
        typeArguments: null,
      },
      offset: 1288,
    },
    {
      name: 'STR_4',
      configurableType: {
        name: '',
        type: 33,
        typeArguments: null,
      },
      offset: 1312,
    },
    {
      name: 'STRUCT',
      configurableType: {
        name: '',
        type: 42,
        typeArguments: [
          {
            name: '',
            type: 51,
            typeArguments: null,
          },
          {
            name: '',
            type: 18,
            typeArguments: null,
          },
        ],
      },
      offset: 1320,
    },
  ],
} as const;
