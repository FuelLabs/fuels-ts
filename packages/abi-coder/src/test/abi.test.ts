import { concat } from '@ethersproject/bytes';

import { exhaustiveExamplesAbi } from '../../test/fixtures/exhaustive-examples-abi';
import { oldTestExamplesAbi } from '../../test/fixtures/old-test-examples-abi';
import Interface from '../interface';

import {
  B256_DECODED,
  B256_ENCODED,
  B256_ZERO_DECODED,
  B256_ZERO_ENCODED,
  B512_DECODED,
  B512_ENCODED,
  B512_ZERO_DECODED,
  B512_ZERO_ENCODED,
  BOOL_TRUE_ENCODED,
  BYTE_MAX_DECODED,
  BYTE_MAX_ENCODED,
  BYTE_MIN_DECODED,
  BYTE_MIN_ENCODED,
  EMPTY_U8_ARRAY,
  U16_MAX,
  U16_MAX_ENCODED,
  U32_MAX,
  U32_MAX_ENCODED,
  U64_MAX,
  U64_MAX_ENCODED,
  U8_MAX,
  U8_MAX_ENCODED,
} from './value-constants';

describe('ABI', () => {
  const abi = new Interface(oldTestExamplesAbi);

  // it('freezes the passed json abi', () => {
  //   expect(abi.jsonAbi).toEqual(oldTestExamplesAbi);
  //   expect(abi.jsonAbi).toBeFrozen();
  // });

  it('can retrieve a function fragment', () => {
    const fn = abi.functions.entry_one;

    expect(fn.name).toBe('entry_one');
  });

  describe('getting function via name/signature/selector', () => {
    it.each([
      'entry_one',
      'entry_one(u64)',
      '0x000000000c36cb9c',

      'sum',
      'sum(u64,u64)',
      '0x00000000e6af18d7',

      'sum_test',
      'sum_test(s(u64,u64))',
      '0x00000000fd5ec586',

      'takes_array',
      'takes_array(a[str[3];3])',
      '0x00000000f152ad85',

      'take_enum',
      'take_enum(e(bool,bool))',
      '0x00000000424d6522',

      'my_struct',
      'my_struct(u64,s(bool,u64))',
      '0x00000000fb356c4a',

      'array_of_structs',
      'array_of_structs(a[s(str[3],e(u64,bool,bool));3])',
      '0x00000000c2d8ff3d',

      'complex_function',
      'complex_function(s<a[b256;3],u8>(a[b256;3],e<u64>(u64,bool)),a[s<u64,bool>(u64,e<u64>(u64,bool));4],(str[5],bool),s(u64))',
      '0x0000000051fdfdad',
    ])('%p', (nameOrSignatureOrSelector: string) => {
      const fn = abi.getFunction(nameOrSignatureOrSelector);

      const works =
        fn.name === nameOrSignatureOrSelector ||
        fn.signature === nameOrSignatureOrSelector ||
        fn.selector === nameOrSignatureOrSelector;

      expect(works).toEqual(true);
    });

    it('raises an error when function is not found', () => {
      const fnName = 'doesnt_exist';
      expect(() => abi.getFunction(fnName)).toThrowError(new Error(`function ${fnName} not found`));

      expect(() => abi.encodeFunctionData(fnName, [123])).toThrowError(
        new Error(`function ${fnName} not found`)
      );

      expect(() => abi.decodeFunctionData(fnName, new Uint8Array())).toThrowError(
        new Error(`function ${fnName} not found`)
      );
    });

    it('raises an error if the arguments do not match the function input types', () => {
      expect(() => abi.encodeFunctionData('entry_one', [11, 11])).toThrow(
        'Types/values length mismatch'
      );
    });
  });

  describe('configurables', () => {
    const exhaustiveExamples = new Interface(exhaustiveExamplesAbi);

    it('sets configurables as dictionary', () => {
      const dict = exhaustiveExamplesAbi.configurables.reduce((obj, val) => {
        const o = obj;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        o[val.name] = val;
        return o;
      }, {});
      expect(exhaustiveExamples.configurables).toEqual(dict);
    });
  });

  describe('encoding/decoding', () => {
    const exhaustiveExamples = new Interface(exhaustiveExamplesAbi);

    describe('encodes and decodes', () => {
      it.each([
        {
          fn: exhaustiveExamples.functions.u_8,
          title: '[u8]',
          value: 0,
          encodedValue: EMPTY_U8_ARRAY,
        },
        {
          fn: exhaustiveExamples.functions.u_8,
          title: '[u8]',
          value: U8_MAX,
          encodedValue: U8_MAX_ENCODED,
        },
        {
          fn: exhaustiveExamples.functions.u_16,
          title: '[u16]',
          value: 0,
          encodedValue: EMPTY_U8_ARRAY,
        },
        {
          fn: exhaustiveExamples.functions.u_16,
          title: '[u16]',
          value: U16_MAX,
          encodedValue: U16_MAX_ENCODED,
        },
        {
          fn: exhaustiveExamples.functions.u_32,
          title: '[u32]',
          value: 0,
          encodedValue: EMPTY_U8_ARRAY,
        },
        {
          fn: exhaustiveExamples.functions.u_32,
          title: '[u32]',
          value: U32_MAX,
          encodedValue: U32_MAX_ENCODED,
        },
        {
          fn: exhaustiveExamples.functions.u_64,
          title: '[u64]',
          value: 0,
          encodedValue: EMPTY_U8_ARRAY,
        },
        {
          fn: exhaustiveExamples.functions.u_64,
          title: '[u64]',
          value: U64_MAX,
          encodedValue: U64_MAX_ENCODED,
        },
        {
          fn: exhaustiveExamples.functions.boolean,
          title: '[bool]',
          value: false,
          encodedValue: EMPTY_U8_ARRAY,
        },
        {
          fn: exhaustiveExamples.functions.boolean,
          title: '[bool]',
          value: true,
          encodedValue: BOOL_TRUE_ENCODED,
        },
        {
          fn: exhaustiveExamples.functions.b_256,
          title: '[b256]',
          value: B256_DECODED,
          encodedValue: B256_ENCODED,
        },
        {
          fn: exhaustiveExamples.functions.b_256,
          title: '[b256]',
          value: B256_ZERO_DECODED,
          encodedValue: B256_ZERO_ENCODED,
        },
        {
          fn: exhaustiveExamples.functions.b_512,
          title: '[b512]',
          value: B512_ZERO_DECODED,
          encodedValue: B512_ZERO_ENCODED,
        },
        {
          fn: exhaustiveExamples.functions.b_512,
          title: '[b512]',
          value: B512_DECODED,
          encodedValue: B512_ENCODED,
        },
        {
          fn: exhaustiveExamples.functions.two_args,
          title: 'two arguments',
          value: [B256_DECODED, false],
          encodedValue: [B256_ENCODED, EMPTY_U8_ARRAY],
        },
        {
          fn: exhaustiveExamples.functions.struct_simple,
          title: '[struct] simple',
          value: { a: true, b: U32_MAX },
          encodedValue: [BOOL_TRUE_ENCODED, U32_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamples.functions.struct_simple,
          title: '[struct] simple',
          value: { b: U32_MAX, a: true }, // checks that property order doesn't matter
          encodedValue: [BOOL_TRUE_ENCODED, U32_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamples.functions.struct_generic_simple,
          title: '[struct] simple generic',
          value: { propB1: U8_MAX },
          encodedValue: U8_MAX_ENCODED,
        },
        {
          fn: exhaustiveExamples.functions.struct_with_tuple,
          title: '[struct] with [tuple]',
          value: { propB1: [true, U64_MAX] },
          encodedValue: [BOOL_TRUE_ENCODED, U64_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamples.functions.tuple_as_param,
          title: '[tuple] as param',
          value: [[U8_MAX, { propA1: { propB1: U64_MAX }, propA2: 'aaa' }]],
          encodedValue: [U8_MAX_ENCODED, U64_MAX_ENCODED, EMPTY_U8_ARRAY.slice().fill(97, 0, 3)],
        },
        {
          fn: exhaustiveExamples.functions.vector_boolean,
          title: '[vector] boolean',
          value: [[true, false, true, true]],
          encodedValue: [BOOL_TRUE_ENCODED, EMPTY_U8_ARRAY, BOOL_TRUE_ENCODED, BOOL_TRUE_ENCODED],
        },
        {
          fn: exhaustiveExamples.functions.vector_u8,
          title: '[vector] u8',
          value: [[U8_MAX, 0, U8_MAX, U8_MAX]],
          encodedValue: [U8_MAX_ENCODED, EMPTY_U8_ARRAY, U8_MAX_ENCODED, U8_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamples.functions.option_u8,
          title: '[option] u8',
          value: undefined,
          encodedValue: [EMPTY_U8_ARRAY, EMPTY_U8_ARRAY],
        },
        {
          fn: exhaustiveExamples.functions.option_u8,
          title: '[option] u8',
          value: U8_MAX,
          encodedValue: [EMPTY_U8_ARRAY.slice().fill(1, 7), U8_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamples.functions.enum_simple,
          title: '[enum] simple',
          value: 'Green',
          encodedValue: EMPTY_U8_ARRAY.slice().fill(1, 7),
        },
        {
          fn: exhaustiveExamples.functions.enum_simple,
          title: '[enum] simple',
          value: 'Green',
          encodedValue: EMPTY_U8_ARRAY.slice().fill(1, 7),
        },
        {
          fn: exhaustiveExamples.functions.enum_with_builtin_type,
          title: '[enum] with builtin type',
          value: { a: true },
          encodedValue: [EMPTY_U8_ARRAY, EMPTY_U8_ARRAY.slice().fill(1, 7)],
        },
        {
          fn: exhaustiveExamples.functions.enum_with_builtin_type,
          title: '[enum] with builtin type',
          value: { b: U64_MAX },
          encodedValue: [EMPTY_U8_ARRAY.slice().fill(1, 7), U64_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamples.functions.enum_with_structs,
          title: '[enum] with structs',
          value: { c: { propA1: U64_MAX, propA2: { a: true, b: U32_MAX } } },
          encodedValue: [
            EMPTY_U8_ARRAY.slice().fill(2, 7),
            U64_MAX_ENCODED,
            BOOL_TRUE_ENCODED,
            U32_MAX_ENCODED,
          ],
        },
        {
          fn: exhaustiveExamples.functions.array_simple,
          title: '[array] simple',
          value: [[1, 2, 3, U8_MAX]],
          encodedValue: [
            EMPTY_U8_ARRAY.slice().fill(1, 7),
            EMPTY_U8_ARRAY.slice().fill(2, 7),
            EMPTY_U8_ARRAY.slice().fill(3, 7),
            U8_MAX_ENCODED,
          ],
        },
        {
          fn: exhaustiveExamples.functions.array_struct,
          title: '[array] with structs',
          value: [
            [
              { a: true, b: 1 },
              { a: false, b: U32_MAX },
              { a: true, b: 2 },
            ],
          ],
          encodedValue: [
            BOOL_TRUE_ENCODED,
            EMPTY_U8_ARRAY.slice().fill(1, 7),
            EMPTY_U8_ARRAY,
            U32_MAX_ENCODED,
            BOOL_TRUE_ENCODED,
            EMPTY_U8_ARRAY.slice().fill(2, 7),
          ],
        },
      ])('$title: $value', ({ fn, title, value, encodedValue }) => {
        const encoded = Array.isArray(value)
          ? fn.encodeArguments(value)
          : fn.encodeArguments([value]);

        const expectedEncoded =
          encodedValue instanceof Uint8Array ? encodedValue : concat(encodedValue);

        expect(encoded).toEqual(expectedEncoded);

        const decoded = fn.decodeArguments(expectedEncoded);

        expect(decoded).toEqual(Array.isArray(value) ? value : [value]);
      });
    });

    describe('fails when encoding', () => {
      it.each([
        {
          fn: exhaustiveExamples.functions.u_8,
          title: '[u8] - negative',
          value: -1,
        },
        {
          fn: exhaustiveExamples.functions.u_8,
          title: '[u8] - over max',
          value: U8_MAX + 1,
        },
        {
          fn: exhaustiveExamples.functions.u_16,
          title: '[u16] - negative',
          value: -1,
        },
        {
          fn: exhaustiveExamples.functions.u_16,
          title: '[u16] - over max',
          value: U32_MAX + 1,
        },
        {
          fn: exhaustiveExamples.functions.u_32,
          title: '[u32] - negative',
          value: -1,
        },
        {
          fn: exhaustiveExamples.functions.u_32,
          title: '[u32] - over max',
          value: U32_MAX + 1,
        },
        {
          fn: exhaustiveExamples.functions.u_64,
          title: '[u64] - negative',
          value: -1,
        },
        {
          fn: exhaustiveExamples.functions.u_64,
          title: '[u64] - over max',
          value: U64_MAX.add(1),
        },
        {
          fn: exhaustiveExamples.functions.b_256,
          title: '[b256] - too short',
          value: B256_DECODED.slice(0, B256_DECODED.length - 1),
        },
        {
          fn: exhaustiveExamples.functions.b_256,
          title: '[b256] - too long',
          value: `${B256_DECODED}0`,
        },
        {
          fn: exhaustiveExamples.functions.b_256,
          title: '[b256] - not hex',
          value: `not a hex string`,
        },
        {
          fn: exhaustiveExamples.functions.b_512,
          title: '[b512] - too short',
          value: B512_ENCODED.slice(0, B512_ENCODED.length - 1),
        },
        {
          fn: exhaustiveExamples.functions.b_512,
          title: '[b512] - too long',
          value: `${B512_DECODED}0`,
        },
        {
          fn: exhaustiveExamples.functions.b_256,
          title: '[b512] - not hex',
          value: `not a hex string`,
        },
        {
          fn: exhaustiveExamples.functions.boolean,
          title: '[boolean] - not bool',
          value: 'not bool',
        },
        {
          fn: exhaustiveExamples.functions.enum_simple,
          title: '[enum] - not in values',
          value: "Doesn't exist",
        },
        {
          fn: exhaustiveExamples.functions.enum_with_builtin_type,
          title: '[enum] - multiple values selected',
          value: { a: true, b: 1 },
        },
        {
          fn: exhaustiveExamples.functions.struct_simple,
          title: '[struct] - missing property',
          value: { a: true },
        },
        {
          fn: exhaustiveExamples.functions.struct_with_tuple,
          title: '[tuple] - extra element',
          value: { propB1: [true, U64_MAX, 'extra element'] },
        },
        {
          fn: exhaustiveExamples.functions.struct_with_tuple,
          title: '[tuple] - missing element',
          value: { propB1: [true] },
        },
        {
          fn: exhaustiveExamples.functions.array_simple,
          title: '[array] - input not array',
          value: { 0: 'element', 1: 'e', 2: 'e', 3: 'e' },
        },
        {
          fn: exhaustiveExamples.functions.array_simple,
          title: '[array] - not enough elements',
          value: [[1, 2, 3]],
        },
        {
          fn: exhaustiveExamples.functions.array_simple,
          title: '[array] - too many elements',
          value: [[1, 2, 3, 4, 5]],
        },
      ])('$title', ({ fn, value }) => {
        expect(() =>
          Array.isArray(value) ? fn.encodeArguments(value) : fn.encodeArguments([value])
        ).toThrow();
      });
    });

    describe('fails when decoding', () => {
      it.each([
        {
          fn: exhaustiveExamples.functions.b_256,
          title: '[b256] - too long',
          value: new Uint8Array(Array.from(Array(33).keys())),
        },
        // {
        //   fn: exhaustiveExamples.functions.b_256,
        //   title: '[b256] - too long',
        //   value: `${B256_DECODED}0`,
        // },
        // {
        //   fn: exhaustiveExamples.functions.b_256,
        //   title: '[b256] - not hex',
        //   value: `not a hex string`,
        // },
        // {
        //   fn: exhaustiveExamples.functions.b_512,
        //   title: '[b512] - too short',
        //   value: B512_ENCODED.slice(0, B512_ENCODED.length - 1),
        // },
        // {
        //   fn: exhaustiveExamples.functions.b_512,
        //   title: '[b512] - too long',
        //   value: `${B512_DECODED}0`,
        // },
        // {
        //   fn: exhaustiveExamples.functions.b_256,
        //   title: '[b512] - not hex',
        //   value: `not a hex string`,
        // },
        // {
        //   fn: exhaustiveExamples.functions.boolean,
        //   title: '[boolean] - not bool',
        //   value: 'not bool',
        // },
        // {
        //   fn: exhaustiveExamples.functions.enum_simple,
        //   title: '[enum] - not in values',
        //   value: "Doesn't exist",
        // },
        // {
        //   fn: exhaustiveExamples.functions.enum_with_builtin_type,
        //   title: '[enum] - multiple values selected',
        //   value: { a: true, b: 1 },
        // },
        // {
        //   fn: exhaustiveExamples.functions.struct_simple,
        //   title: '[struct] - missing property',
        //   value: { a: true },
        // },
        // {
        //   fn: exhaustiveExamples.functions.struct_with_tuple,
        //   title: '[tuple] - extra element',
        //   value: { propB1: [true, U64_MAX, 'extra element'] },
        // },
        // {
        //   fn: exhaustiveExamples.functions.struct_with_tuple,
        //   title: '[tuple] - missing element',
        //   value: { propB1: [true] },
        // },
        // {
        //   fn: exhaustiveExamples.functions.array_simple,
        //   title: '[array] - input not array',
        //   value: { 0: 'element', 1: 'e', 2: 'e', 3: 'e' },
        // },
        // {
        //   fn: exhaustiveExamples.functions.array_simple,
        //   title: '[array] - not enough elements',
        //   value: [[1, 2, 3]],
        // },
        // {
        //   fn: exhaustiveExamples.functions.array_simple,
        //   title: '[array] - too many elements',
        //   value: [[1, 2, 3, 4, 5]],
        // },
      ])('$title', ({ fn, value }) => {
        expect(() => fn.decodeArguments(value)).toThrow();
      });
    });
  });
});
