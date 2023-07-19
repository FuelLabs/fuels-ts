import type { MapImplicitTypeParameters } from '../../src/type-inferrer/abi-type-inferrer';

type ImplicitStruct = (typeof exhaustiveExamplesAbi)['types'][44];
type ImplicitArray = Omit<(typeof exhaustiveExamplesAbi)['types'][13], 'components'> & {
  readonly components: readonly [
    {
      readonly name: '__array_element';
      readonly type: 28;
      readonly typeArguments: null;
    },
    {
      readonly name: '__array_element_2';
      readonly type: 29;
      readonly typeArguments: null;
    }
  ];
};

type Adf = MapImplicitTypeParameters<
  (typeof exhaustiveExamplesAbi)['types'],
  ImplicitArray,
  NonNullable<ImplicitArray['components']>
>;

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
          type: 35,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 19,
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
          type: 29,
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
      typeId: 3,
      type: '(_, _)',
      components: [
        {
          name: '__tuple_element',
          type: 19,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 53,
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
          type: 54,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 45,
          typeArguments: [
            {
              name: '',
              type: 46,
              typeArguments: [
                {
                  name: '',
                  type: 53,
                  typeArguments: null,
                },
              ],
            },
            {
              name: '',
              type: 33,
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
          type: 54,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 19,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 13,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 34,
          typeArguments: null,
        },
        {
          name: '__tuple_element',
          type: 45,
          typeArguments: [
            {
              name: '',
              type: 54,
              typeArguments: null,
            },
            {
              name: '',
              type: 19,
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
          type: 50,
          typeArguments: [
            {
              name: '',
              type: 52,
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
          type: 18,
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
          type: 33,
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
          type: 41,
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
          type: 44,
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
          type: 42,
          typeArguments: [
            {
              name: '',
              type: 30,
              typeArguments: null,
            },
            {
              name: '',
              type: 54,
              typeArguments: null,
            },
          ],
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
          type: 18,
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
          type: 52,
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
          type: 29,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 15,
      type: '[_; 3]',
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
      typeId: 16,
      type: '[_; 4]',
      components: [
        {
          name: '__array_element',
          type: 54,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 17,
      type: '[_; 4]',
      components: [
        {
          name: '__array_element',
          type: 38,
          typeArguments: [
            {
              name: '',
              type: 53,
              typeArguments: null,
            },
            {
              name: '',
              type: 19,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 18,
      type: 'b256',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 19,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 20,
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
      typeId: 21,
      type: 'enum EnumWithBuiltinType',
      components: [
        {
          name: 'a',
          type: 19,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 53,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 22,
      type: 'enum EnumWithGeneric',
      components: [
        {
          name: 'VariantOne',
          type: 29,
          typeArguments: null,
        },
        {
          name: 'VariantTwo',
          type: 53,
          typeArguments: null,
        },
      ],
      typeParameters: [29],
    },
    {
      typeId: 23,
      type: 'enum EnumWithStructs',
      components: [
        {
          name: 'a',
          type: 20,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 44,
          typeArguments: null,
        },
        {
          name: 'c',
          type: 45,
          typeArguments: [
            {
              name: '',
              type: 53,
              typeArguments: null,
            },
            {
              name: '',
              type: 44,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 24,
      type: 'enum EnumWithVector',
      components: [
        {
          name: 'num',
          type: 54,
          typeArguments: null,
        },
        {
          name: 'vec',
          type: 50,
          typeArguments: [
            {
              name: '',
              type: 54,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 25,
      type: 'enum MyEnum',
      components: [
        {
          name: 'Foo',
          type: 53,
          typeArguments: null,
        },
        {
          name: 'Bar',
          type: 19,
          typeArguments: null,
        },
        {
          name: 'Din',
          type: 19,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 26,
      type: 'enum MyGenericEnum',
      components: [
        {
          name: 'Foo',
          type: 53,
          typeArguments: null,
        },
        {
          name: 'Bar',
          type: 19,
          typeArguments: null,
        },
      ],
      typeParameters: [31],
    },
    {
      typeId: 27,
      type: 'enum Option',
      components: [
        {
          name: 'None',
          type: 0,
          typeArguments: null,
        },
        {
          name: 'Some',
          type: 29,
          typeArguments: null,
        },
      ],
      typeParameters: [29],
    },
    {
      typeId: 28,
      type: 'enum TestEnum',
      components: [
        {
          name: 'Value',
          type: 19,
          typeArguments: null,
        },
        {
          name: 'Data',
          type: 19,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 29,
      type: 'generic T',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 30,
      type: 'generic U',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 31,
      type: 'generic V',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 32,
      type: 'raw untyped ptr',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 33,
      type: 'str[3]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 34,
      type: 'str[4]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 35,
      type: 'str[5]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 36,
      type: 'struct ArrWithGenericStruct',
      components: [
        {
          name: 'a',
          type: 11,
          typeArguments: null,
        },
      ],
      typeParameters: [30],
    },
    {
      typeId: 37,
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
      typeId: 38,
      type: 'struct MyGenericStruct',
      components: [
        {
          name: 'bim',
          type: 29,
          typeArguments: null,
        },
        {
          name: 'bam',
          type: 26,
          typeArguments: [
            {
              name: '',
              type: 53,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: [29, 30],
    },
    {
      typeId: 39,
      type: 'struct MyOtherStruct',
      components: [
        {
          name: 'bom',
          type: 53,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 40,
      type: 'struct MyStruct',
      components: [
        {
          name: 'dummy_a',
          type: 19,
          typeArguments: null,
        },
        {
          name: 'dummy_b',
          type: 53,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 41,
      type: 'struct MyStructWithEnum',
      components: [
        {
          name: 'bim',
          type: 33,
          typeArguments: null,
        },
        {
          name: 'bam',
          type: 25,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 42,
      type: 'struct MyStructWithGeneric',
      components: [
        {
          name: 'bim',
          type: 29,
          typeArguments: null,
        },
        {
          name: 'bam',
          type: 46,
          typeArguments: [
            {
              name: '',
              type: 30,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'bom',
          type: 45,
          typeArguments: [
            {
              name: '',
              type: 30,
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
      typeParameters: [29, 30],
    },
    {
      typeId: 43,
      type: 'struct RawVec',
      components: [
        {
          name: 'ptr',
          type: 32,
          typeArguments: null,
        },
        {
          name: 'cap',
          type: 53,
          typeArguments: null,
        },
      ],
      typeParameters: [29],
    },
    {
      typeId: 44,
      type: 'struct SimpleStruct',
      components: [
        {
          name: 'a',
          type: 19,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 52,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 45,
      type: 'struct StructA',
      components: [
        {
          name: 'propA1',
          type: 29,
          typeArguments: null,
        },
        {
          name: 'propA2',
          type: 30,
          typeArguments: null,
        },
      ],
      typeParameters: [29, 30],
    },
    {
      typeId: 46,
      type: 'struct StructB',
      components: [
        {
          name: 'propB1',
          type: 29,
          typeArguments: null,
        },
      ],
      typeParameters: [29],
    },
    {
      typeId: 47,
      type: 'struct StructWithImplicitGenerics',
      components: [
        {
          name: 'arr',
          type: 14,
          typeArguments: null,
        },
        {
          name: 'tuple',
          type: 2,
          typeArguments: null,
        },
      ],
      typeParameters: [29, 30],
    },
    {
      typeId: 48,
      type: 'struct StructWithVector',
      components: [
        {
          name: 'num',
          type: 54,
          typeArguments: null,
        },
        {
          name: 'vec',
          type: 50,
          typeArguments: [
            {
              name: '',
              type: 54,
              typeArguments: null,
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 49,
      type: 'struct Test',
      components: [
        {
          name: 'foo',
          type: 53,
          typeArguments: null,
        },
        {
          name: 'bar',
          type: 53,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 50,
      type: 'struct Vec',
      components: [
        {
          name: 'buf',
          type: 43,
          typeArguments: [
            {
              name: '',
              type: 29,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'len',
          type: 53,
          typeArguments: null,
        },
      ],
      typeParameters: [29],
    },
    {
      typeId: 51,
      type: 'u16',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 52,
      type: 'u32',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 53,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 54,
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
          type: 44,
          typeArguments: null,
        },
        {
          name: 'x',
          type: 50,
          typeArguments: [
            {
              name: '',
              type: 54,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'arg_then_vector_u8',
      output: {
        name: '',
        type: 54,
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
          typeArguments: null,
        },
      ],
      name: 'array_simple',
      output: {
        name: '',
        type: 54,
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
        type: 54,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 36,
          typeArguments: [
            {
              name: '',
              type: 18,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'array_with_generic_struct',
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
          type: 18,
          typeArguments: null,
        },
      ],
      name: 'b_256',
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
          type: 37,
          typeArguments: null,
        },
      ],
      name: 'b_512',
      output: {
        name: '',
        type: 37,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 19,
          typeArguments: null,
        },
      ],
      name: 'boolean',
      output: {
        name: '',
        type: 19,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg1',
          type: 38,
          typeArguments: [
            {
              name: '',
              type: 12,
              typeArguments: null,
            },
            {
              name: '',
              type: 54,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'arg2',
          type: 17,
          typeArguments: null,
        },
        {
          name: 'arg3',
          type: 1,
          typeArguments: null,
        },
        {
          name: 'arg4',
          type: 39,
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
          type: 53,
          typeArguments: null,
        },
      ],
      name: 'entry_one',
      output: {
        name: '',
        type: 53,
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
      name: 'enum_simple',
      output: {
        name: '',
        type: 54,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 21,
          typeArguments: null,
        },
      ],
      name: 'enum_with_builtin_type',
      output: {
        name: '',
        type: 54,
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
      name: 'enum_with_structs',
      output: {
        name: '',
        type: 54,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'my_u64',
          type: 53,
          typeArguments: null,
        },
        {
          name: 'my_struct',
          type: 40,
          typeArguments: null,
        },
      ],
      name: 'my_struct',
      output: {
        name: '',
        type: 53,
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
              type: 54,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'option_u8',
      output: {
        name: '',
        type: 54,
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
          type: 50,
          typeArguments: [
            {
              name: '',
              type: 54,
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
          type: 35,
          typeArguments: null,
        },
      ],
      name: 'string',
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
          name: 'x',
          type: 46,
          typeArguments: [
            {
              name: '',
              type: 54,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'struct_generic_simple',
      output: {
        name: '',
        type: 54,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 44,
          typeArguments: null,
        },
      ],
      name: 'struct_simple',
      output: {
        name: '',
        type: 54,
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
              type: 18,
              typeArguments: null,
            },
            {
              name: '',
              type: 54,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'struct_with_implicitGenerics',
      output: {
        name: '',
        type: 54,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 46,
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
        type: 54,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'a',
          type: 53,
          typeArguments: null,
        },
        {
          name: 'b',
          type: 53,
          typeArguments: null,
        },
      ],
      name: 'sum',
      output: {
        name: '',
        type: 53,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'test',
          type: 49,
          typeArguments: null,
        },
      ],
      name: 'sum_test',
      output: {
        name: '',
        type: 53,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'enum_arg',
          type: 28,
          typeArguments: null,
        },
      ],
      name: 'take_enum',
      output: {
        name: '',
        type: 19,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 15,
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
        type: 19,
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
        type: 54,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg1',
          type: 18,
          typeArguments: null,
        },
        {
          name: 'arg2',
          type: 19,
          typeArguments: null,
        },
      ],
      name: 'two_args',
      output: {
        name: '',
        type: 19,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 50,
          typeArguments: [
            {
              name: '',
              type: 54,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'y',
          type: 50,
          typeArguments: [
            {
              name: '',
              type: 54,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'two_u8_vectors',
      output: {
        name: '',
        type: 54,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 52,
          typeArguments: null,
        },
        {
          name: 'y',
          type: 50,
          typeArguments: [
            {
              name: '',
              type: 53,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'z',
          type: 50,
          typeArguments: [
            {
              name: '',
              type: 53,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'q',
          type: 50,
          typeArguments: [
            {
              name: '',
              type: 53,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'u32_then_three_vectors_u64',
      output: {
        name: '',
        type: 54,
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
      name: 'u_16',
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
          type: 52,
          typeArguments: null,
        },
      ],
      name: 'u_32',
      output: {
        name: '',
        type: 52,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 53,
          typeArguments: null,
        },
      ],
      name: 'u_64',
      output: {
        name: '',
        type: 53,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'arg',
          type: 54,
          typeArguments: null,
        },
      ],
      name: 'u_8',
      output: {
        name: '',
        type: 54,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 50,
          typeArguments: [
            {
              name: '',
              type: 19,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'vector_boolean',
      output: {
        name: '',
        type: 54,
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
          type: 24,
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
          type: 48,
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
          type: 50,
          typeArguments: [
            {
              name: '',
              type: 50,
              typeArguments: [
                {
                  name: '',
                  type: 52,
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
          type: 50,
          typeArguments: [
            {
              name: '',
              type: 54,
              typeArguments: null,
            },
          ],
        },
      ],
      name: 'vector_u8',
      output: {
        name: '',
        type: 54,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 50,
          typeArguments: [
            {
              name: '',
              type: 54,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'y',
          type: 18,
          typeArguments: null,
        },
      ],
      name: 'vector_u8_then_arg',
      output: {
        name: '',
        type: 54,
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
        type: 54,
        typeArguments: null,
      },
      offset: 1296,
    },
    {
      name: 'BOOL',
      configurableType: {
        name: '',
        type: 19,
        typeArguments: null,
      },
      offset: 1304,
    },
    {
      name: 'ARRAY',
      configurableType: {
        name: '',
        type: 13,
        typeArguments: null,
      },
      offset: 1312,
    },
    {
      name: 'STR_4',
      configurableType: {
        name: '',
        type: 34,
        typeArguments: null,
      },
      offset: 1336,
    },
    {
      name: 'STRUCT',
      configurableType: {
        name: '',
        type: 45,
        typeArguments: [
          {
            name: '',
            type: 54,
            typeArguments: null,
          },
          {
            name: '',
            type: 19,
            typeArguments: null,
          },
        ],
      },
      offset: 1344,
    },
  ],
} as const;
