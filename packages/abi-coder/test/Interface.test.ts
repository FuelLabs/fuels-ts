/* eslint-disable @typescript-eslint/no-explicit-any */
import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { BN } from '@fuel-ts/math';
import { concat } from '@fuel-ts/utils';

import { Interface } from '../src/Interface';
import type { AbiFunction, Configurable } from '../src/types/JsonAbiNew';

import { AbiCoderProjectsEnum, getCoderForcProject } from './fixtures/forc-projects';
import {
  B256_DECODED,
  B256_ENCODED,
  B256_ZERO_DECODED,
  B256_ZERO_ENCODED,
  B512_DECODED,
  B512_ENCODED,
  B512_ZERO_DECODED,
  B512_ZERO_ENCODED,
  BOOL_FALSE_ENCODED,
  BOOL_TRUE_ENCODED,
  ENUM_FIRST_INDEX,
  ENUM_SECOND_INDEX,
  ENUM_THIRD_INDEX,
  U16_MAX,
  U16_MAX_ENCODED,
  U16_MIN_ENCODED,
  U32_MAX,
  U32_MAX_ENCODED,
  U32_MIN_ENCODED,
  U64_MAX,
  U64_MAX_ENCODED,
  U64_MIN_ENCODED,
  U8_MAX,
  U8_MAX_ENCODED,
  U8_MIN_ENCODED,
} from './utils/constants';

const exhaustiveExamplesAbi = getCoderForcProject(
  AbiCoderProjectsEnum.EXHAUSTIVE_EXAMPLES
).abiContents;

const exhaustiveExamplesInterface = new Interface(exhaustiveExamplesAbi);

/**
 * @group node
 */
describe('Abi interface', () => {
  it('can retrieve a function fragment', () => {
    const fn = exhaustiveExamplesInterface.functions.entry_one;

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

      'simple_vector',
      'simple_vector(s<u8>(s<u8>(rawptr,u64),u64))',
      '0x00000000dd1b1a41',

      'struct_with_implicit_generics',
      'struct_with_implicit_generics(s<b256,u8>(a[b256;3],<b256,u8>(b256,u8)))',
      '0x0000000032ef2da0',
    ])('%p', (nameOrSignatureOrSelector: string) => {
      const fn = exhaustiveExamplesInterface.getFunction(nameOrSignatureOrSelector);

      const works =
        fn.name === nameOrSignatureOrSelector ||
        fn.signature === nameOrSignatureOrSelector ||
        fn.selector === nameOrSignatureOrSelector;

      expect(works).toEqual(true);
    });

    it('raises an error when function is not found', () => {
      const fnName = 'doesnt_exist';
      expect(() => exhaustiveExamplesInterface.getFunction(fnName)).toThrow();
    });
  });

  describe('configurables', () => {
    it('sets configurables as dictionary', () => {
      const dict = exhaustiveExamplesAbi.configurables.reduce((obj, val) => {
        const o: Record<string, Configurable> = obj;
        o[val.name] = val;
        return o;
      }, {});
      expect(exhaustiveExamplesInterface.configurables).toEqual(dict);
    });

    it('encodes configurables', () => {
      const encoded = exhaustiveExamplesInterface.encodeConfigurable('U8', 55);
      expect(encoded).toEqual(new Uint8Array([55]));
    });

    it('throws when encoding non-existent configurable', () => {
      expect(() => exhaustiveExamplesInterface.encodeConfigurable('futile_effort', 3)).toThrow(
        "A configurable with the 'futile_effort' was not found in the ABI."
      );
    });
  });

  describe('encoding/decoding', () => {
    describe('encodes and decodes', () => {
      it.each([
        {
          fn: exhaustiveExamplesInterface.functions.u_8,
          title: '[u8]',
          value: 0,
          encodedValue: U8_MIN_ENCODED,
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_8,
          title: '[u8]',
          value: U8_MAX,
          encodedValue: Uint8Array.from(U8_MAX_ENCODED),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_16,
          title: '[u16]',
          value: 0,
          encodedValue: Uint8Array.from(U16_MIN_ENCODED),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_16,
          title: '[u16]',
          value: U16_MAX,
          encodedValue: U16_MAX_ENCODED,
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_32,
          title: '[u32]',
          value: 0,
          encodedValue: U32_MIN_ENCODED,
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_32,
          title: '[u32]',
          value: U32_MAX,
          encodedValue: U32_MAX_ENCODED,
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_64,
          title: '[u64]',
          value: 0,
          encodedValue: U64_MIN_ENCODED,
          decodedTransformer: (decoded: unknown | undefined) =>
            (decoded as BN).toNumber() as number,
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_64,
          title: '[u64]',
          value: U8_MAX,
          encodedValue: Uint8Array.from([0, 0, 0, 0, 0, 0, 0, U8_MAX]),
          decodedTransformer: (decoded: unknown | undefined) => (decoded as BN).toNumber(),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_64,
          title: '[u64]',
          value: U16_MAX,
          encodedValue: Uint8Array.from([0, 0, 0, 0, 0, 0, U8_MAX, U8_MAX]),
          decodedTransformer: (decoded: unknown | undefined) => (decoded as BN).toNumber(),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_64,
          title: '[u64]',
          value: U32_MAX,
          encodedValue: Uint8Array.from([0, 0, 0, 0, U8_MAX, U8_MAX, U8_MAX, U8_MAX]),
          decodedTransformer: (decoded: unknown | undefined) => (decoded as BN).toNumber(),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_64,
          title: '[u64]',
          value: U64_MAX,
          encodedValue: U64_MAX_ENCODED,
        },
        {
          fn: exhaustiveExamplesInterface.functions.boolean,
          title: '[bool]',
          value: false,
          encodedValue: BOOL_FALSE_ENCODED,
        },
        {
          fn: exhaustiveExamplesInterface.functions.boolean,
          title: '[bool]',
          value: true,
          encodedValue: BOOL_TRUE_ENCODED,
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_256,
          title: '[b256]',
          value: B256_DECODED,
          encodedValue: B256_ENCODED,
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_256,
          title: '[b256]',
          value: B256_ZERO_DECODED,
          encodedValue: B256_ZERO_ENCODED,
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_512,
          title: '[b512]',
          value: B512_ZERO_DECODED,
          encodedValue: B512_ZERO_ENCODED,
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_512,
          title: '[b512]',
          value: B512_DECODED,
          encodedValue: B512_ENCODED,
        },
        {
          fn: exhaustiveExamplesInterface.functions.two_args,
          title: 'two arguments',
          value: [B256_DECODED, false],
          encodedValue: [B256_ENCODED, BOOL_FALSE_ENCODED],
        },
        {
          fn: exhaustiveExamplesInterface.functions.struct_simple,
          title: '[struct] simple',
          value: { a: true, b: U32_MAX },
          encodedValue: [BOOL_TRUE_ENCODED, U32_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamplesInterface.functions.struct_simple,
          title: '[struct] simple',
          value: { b: U32_MAX, a: true }, // checks that property order doesn't matter
          encodedValue: [BOOL_TRUE_ENCODED, U32_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamplesInterface.functions.struct_generic_simple,
          title: '[struct] simple generic',
          value: { propB1: U8_MAX },
          encodedValue: U8_MAX_ENCODED,
        },
        {
          fn: exhaustiveExamplesInterface.functions.struct_with_tuple,
          title: '[struct] with [tuple]',
          value: { propB1: [true, U64_MAX] },
          encodedValue: [BOOL_TRUE_ENCODED, U64_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamplesInterface.functions.struct_with_implicit_generics,
          title: '[struct] with implicit generics',
          value: { arr: [B256_DECODED, B256_DECODED, B256_DECODED], tuple: [B256_DECODED, U8_MAX] },
          encodedValue: [B256_ENCODED, B256_ENCODED, B256_ENCODED, B256_ENCODED, U8_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamplesInterface.functions.bytes,
          title: '[struct Bytes]',
          value: [[1, 2, 3]],
          encodedValue: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 3]),
          decodedTransformer: (decoded: unknown | undefined) => {
            const data = (decoded as BN[]).slice(0, 3);
            return Array.from(data);
          },
        },
        {
          fn: exhaustiveExamplesInterface.functions.raw_slice,
          title: '[raw_slice]',
          value: [[1, 2, 3]],
          encodedValue: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 3]),
          decodedTransformer: (decoded: unknown | undefined) => (decoded as number[]).slice(-3),
        },
        {
          fn: exhaustiveExamplesInterface.functions.dynamic_string,
          title: '[struct String]',
          value: 'H3llo W0rld',
          encodedValue: new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 11, 72, 51, 108, 108, 111, 32, 87, 48, 114, 108, 100,
          ]),
        },
        {
          fn: exhaustiveExamplesInterface.functions.tuple_as_param,
          title: '[tuple] as param',
          value: [[U8_MAX, { propA1: { propB1: U64_MAX }, propA2: 'aaa' }]],
          encodedValue: [U8_MAX_ENCODED, U64_MAX_ENCODED, Uint8Array.from([97, 97, 97])],
        },
        {
          fn: exhaustiveExamplesInterface.functions.option_u8,
          title: '[option] u8',
          value: undefined,
          encodedValue: ENUM_FIRST_INDEX,
        },
        {
          fn: exhaustiveExamplesInterface.functions.option_u8,
          title: '[option] u8',
          value: U8_MAX,
          encodedValue: [ENUM_SECOND_INDEX, U8_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamplesInterface.functions.enum_simple,
          title: '[enum] simple',
          value: 'Green',
          encodedValue: ENUM_SECOND_INDEX,
        },
        {
          fn: exhaustiveExamplesInterface.functions.enum_with_builtin_type,
          title: '[enum] with builtin type',
          value: { a: true },
          encodedValue: [ENUM_FIRST_INDEX, BOOL_TRUE_ENCODED],
        },
        {
          fn: exhaustiveExamplesInterface.functions.enum_with_builtin_type,
          title: '[enum] with builtin type',
          value: { b: U64_MAX },
          encodedValue: [ENUM_SECOND_INDEX, U64_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamplesInterface.functions.enum_with_structs,
          title: '[enum] with structs',
          value: { c: { propA1: U64_MAX, propA2: { a: true, b: U32_MAX } } },
          encodedValue: [ENUM_THIRD_INDEX, U64_MAX_ENCODED, BOOL_TRUE_ENCODED, U32_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamplesInterface.functions.array_simple,
          title: '[array] simple',
          value: [[1, 2, 3, U8_MAX]],
          encodedValue: Uint8Array.from([1, 2, 3, U8_MAX]),
        },
        {
          fn: exhaustiveExamplesInterface.functions.array_struct,
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
            Uint8Array.from([0, 0, 0, 1]),
            BOOL_FALSE_ENCODED,
            U32_MAX_ENCODED,
            BOOL_TRUE_ENCODED,
            Uint8Array.from([0, 0, 0, 2]),
          ],
        },
        {
          fn: exhaustiveExamplesInterface.functions.array_with_generic_struct,
          title: '[array] with generic struct',
          value: [
            {
              a: [
                {
                  bim: B256_DECODED,
                  bam: { propB1: U8_MAX },
                  bom: { propA1: B256_DECODED, propA2: U8_MAX },
                },
                {
                  bim: B256_DECODED,
                  bam: { propB1: 0 },
                  bom: { propA1: B256_DECODED, propA2: U8_MAX },
                },
                {
                  bim: B256_DECODED,
                  bam: { propB1: U8_MAX },
                  bom: { propA1: B256_DECODED, propA2: U8_MAX },
                },
              ],
            },
          ],
          encodedValue: [
            B256_ENCODED,
            U8_MAX_ENCODED,
            B256_ENCODED,
            U8_MAX_ENCODED,
            B256_ENCODED,
            U8_MIN_ENCODED,
            B256_ENCODED,
            U8_MAX_ENCODED,
            B256_ENCODED,
            U8_MAX_ENCODED,
            B256_ENCODED,
            U8_MAX_ENCODED,
          ],
        },
        {
          fn: exhaustiveExamplesInterface.functions.vector_boolean,
          title: '[vector] boolean',
          value: [[true, false, true, true]],
          encodedValue: [
            Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 4]),
            BOOL_TRUE_ENCODED,
            BOOL_FALSE_ENCODED,
            BOOL_TRUE_ENCODED,
            BOOL_TRUE_ENCODED,
          ],
        },
        {
          fn: exhaustiveExamplesInterface.functions.vector_u8,
          title: '[vector] u8',
          value: [[U8_MAX, 0, U8_MAX, U8_MAX]],
          encodedValue: Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 4, U8_MAX, 0, U8_MAX, U8_MAX]),
        },
        {
          fn: exhaustiveExamplesInterface.functions.arg_then_vector_u8,
          title: '[vector] some arg then u8 vector',
          value: [{ a: true, b: U32_MAX }, [U8_MAX, 0, U8_MAX, U8_MAX]],
          encodedValue: [
            BOOL_TRUE_ENCODED,
            U32_MAX_ENCODED,
            Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 4, U8_MAX, 0, U8_MAX, U8_MAX]),
          ],
        },
        {
          fn: exhaustiveExamplesInterface.functions.vector_u8_then_arg,
          title: '[vector] Vector u8 and then b256',
          value: [[U8_MAX, 0, U8_MAX, U8_MAX], B256_DECODED],
          encodedValue: [
            Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 4, U8_MAX, 0, U8_MAX, U8_MAX]),
            B256_ENCODED,
          ],
        },
        {
          fn: exhaustiveExamplesInterface.functions.two_u8_vectors,
          title: '[vector] two u8 vectors',
          value: [
            [U8_MAX, U8_MAX],
            [U8_MAX, 0, U8_MAX, U8_MAX],
          ],
          encodedValue: [
            Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 2, U8_MAX, U8_MAX]),
            Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 4, U8_MAX, 0, U8_MAX, U8_MAX]),
          ],
        },
        {
          fn: exhaustiveExamplesInterface.functions.u32_then_three_vectors_u64,
          title: '[vector] arg u32 and then three vectors u64',
          value: [33, [450, 202, 340], [12, 13, 14], [11, 9]],
          decodedTransformer: (decoded: Array<any>) =>
            decoded.map((v) =>
              Array.isArray(v) ? v.map((bignumber: BN) => bignumber.toNumber()) : v
            ),
          encodedValue: [
            Uint8Array.from([0, 0, 0, 33]),
            Uint8Array.from([
              0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 194, 0, 0, 0, 0, 0, 0, 0, 202, 0, 0, 0,
              0, 0, 0, 1, 84,
            ]),
            Uint8Array.from([
              0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0,
              0, 0, 0, 14,
            ]),
            Uint8Array.from([
              0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 9,
            ]),
          ],
        },
        {
          fn: exhaustiveExamplesInterface.functions.vector_inside_vector,
          title: '[vector] vector inside vector [with offset]',
          value: [
            [
              [0, 1, 2],
              [6, 7, 8],
            ],
          ],
          encodedValue: (input?: any, _offset: number = 0) => {
            // eslint-disable-next-line no-param-reassign
            input = input[0];
            const length = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input.length]);
            const lengthVec1 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[0].length]);
            const data1Vec1 = Uint8Array.from([0, 0, 0, input[0][0]]);
            const data2Vec1 = Uint8Array.from([0, 0, 0, input[0][1]]);
            const data3Vec1 = Uint8Array.from([0, 0, 0, input[0][2]]);
            const lengthVec2 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[1].length]);
            const data1Vec2 = Uint8Array.from([0, 0, 0, input[1][0]]);
            const data2Vec2 = Uint8Array.from([0, 0, 0, input[1][1]]);
            const data3Vec2 = Uint8Array.from([0, 0, 0, input[1][2]]);
            const expectedBytes = concat([
              // top level vector
              length,
              // top level vector, index 0 vector
              lengthVec1,
              // index 0 vector's data
              data1Vec1,
              data2Vec1,
              data3Vec1,
              // top level vector, index 1 vector
              lengthVec2,
              // index 1 vector's data
              data1Vec2,
              data2Vec2,
              data3Vec2,
            ]);
            return expectedBytes;
          },
          offset: 100,
        },
        {
          fn: exhaustiveExamplesInterface.functions.vector_inside_array,
          title: '[vector] vector inside array',
          value: [[[5, 6]]],
          encodedValue: (input?: any, _offset: number = 0) => {
            // eslint-disable-next-line no-param-reassign
            input = input[0];
            const length = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[0].length]);
            const data1 = Uint8Array.from([0, 0, 0, input[0][0]]);
            const data2 = Uint8Array.from([0, 0, 0, input[0][1]]);
            const expectedBytes = concat([length, data1, data2]);

            return expectedBytes;
          },
          offset: 40,
        },
        {
          fn: exhaustiveExamplesInterface.functions.vector_inside_enum,
          title: '[vector] vector inside enum',
          value: [
            {
              vec: [3, 9, 6, 4],
            },
          ],
          encodedValue: (input?: any, _offset: number = 0) => {
            // eslint-disable-next-line no-param-reassign
            input = input[0];
            const length = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input.vec.length]);
            const vectorData = Uint8Array.from(input.vec);

            const expectedBytes = concat([ENUM_SECOND_INDEX, length, vectorData]);
            return expectedBytes;
          },
          offset: 0,
        },
        {
          fn: exhaustiveExamplesInterface.functions.vector_inside_struct,
          title: '[vector] vector inside struct [with offset]',
          value: [
            {
              num: 7,
              vec: [3, 9, 6, 4],
            },
          ],
          encodedValue: (input?: any, _offset: number = 0) => {
            // eslint-disable-next-line no-param-reassign
            input = input[0];
            const u8 = Uint8Array.from([7]);
            const length = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input.vec.length]);
            const vectorData = Uint8Array.from(input.vec);

            const expectedBytes = concat([u8, length, vectorData]);

            return expectedBytes;
          },
          offset: 16,
        },
      ])(
        '$title: $value',
        ({ fn, title: _title, value, encodedValue, decodedTransformer, offset }) => {
          const fnArguments = Array.isArray(value) ? value : [value];
          const encodedArguments = fn.encodeArguments(fnArguments);

          const encodedVal =
            encodedValue instanceof Function ? encodedValue(value, offset) : encodedValue;
          const expectedEncoded =
            encodedVal instanceof Uint8Array ? encodedVal : concat(encodedVal);

          expect(encodedArguments).toEqual(expectedEncoded);

          const jsonFn = exhaustiveExamplesInterface.jsonAbi.functions.find(
            (f) => f.name === fn.name
          ) as AbiFunction;

          // test Interface.encodeType
          const argsEncodedAsSingleTypes = jsonFn.inputs
            .map((i) => i.concreteTypeId)
            .map((arg, idx) => exhaustiveExamplesInterface.encodeType(arg, fnArguments[idx]));

          argsEncodedAsSingleTypes?.forEach((arg, idx, arr) => {
            const argOffset = arr.slice(0, idx).reduce((result, val) => result + val.length, 0);

            expect(arg).toEqual(expectedEncoded.slice(argOffset, argOffset + arg.length));
          });

          let decoded = fn.decodeOutput(expectedEncoded)[0];

          if (decodedTransformer) {
            decoded = decodedTransformer(decoded as any[]);
          }

          const expectedDecoded = Array.isArray(value) && value.length === 1 ? value[0] : value; // the conditional is when the input is a SINGLE array/tuple - then de-nest it

          expect(decoded).toStrictEqual(expectedDecoded);

          // test Interface.decodeType
          let decodedType = exhaustiveExamplesInterface.decodeType(
            jsonFn.output,
            expectedEncoded
          )[0];

          if (decodedTransformer) {
            decodedType = decodedTransformer(decodedType as any[]);
          }

          expect(decodedType).toEqual(expectedDecoded);
        }
      );
    });

    describe('fails when encoding', () => {
      it.each([
        {
          fn: exhaustiveExamplesInterface.functions.u_8,
          title: '[u8] - negative',
          value: -1,
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_8,
          title: '[u8] - over max',
          value: U8_MAX + 1,
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8, too many bytes.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_16,
          title: '[u16] - negative',
          value: -1,
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u16.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_16,
          title: '[u16] - over max',
          value: U32_MAX + 1,
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u16, too many bytes.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_32,
          title: '[u32] - negative',
          value: -1,
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u32.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_32,
          title: '[u32] - over max',
          value: U32_MAX + 1,
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u32, too many bytes.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_64,
          title: '[u64] - negative',
          value: -1,
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u64.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_64,
          title: '[u64] - over max',
          value: U64_MAX.add(1),
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u64.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_256,
          title: '[b256] - too short',
          value: B256_DECODED.slice(0, B256_DECODED.length - 1),
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b256.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_256,
          title: '[b256] - too long',
          value: `${B256_DECODED}0`,
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b256.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_256,
          title: '[b256] - not hex',
          value: `not a hex string`,
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b256.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_512,
          title: '[b512] - too short',
          value: B512_ENCODED.slice(0, B512_ENCODED.length - 1),
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid struct B512.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_512,
          title: '[b512] - too long',
          value: `${B512_DECODED}0`,
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid struct B512.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_256,
          title: '[b512] - not hex',
          value: `not a hex string`,
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid b256.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.boolean,
          title: '[boolean] - not bool',
          value: 'not bool',
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid boolean value.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.enum_simple,
          title: '[enum] - not in values',
          value: "Doesn't exist",
          error: new FuelError(
            FuelError.CODES.INVALID_DECODE_VALUE,
            'Only one field must be provided.'
          ),
        },
        {
          fn: exhaustiveExamplesInterface.functions.enum_with_builtin_type,
          title: '[enum] - multiple values selected',
          value: { a: true, b: 1 },
          error: new FuelError(
            FuelError.CODES.INVALID_DECODE_VALUE,
            'Only one field must be provided.'
          ),
        },
        {
          fn: exhaustiveExamplesInterface.functions.struct_simple,
          title: '[struct] - missing property',
          value: { a: true },
          error: new FuelError(
            FuelError.CODES.ENCODE_ERROR,
            'Invalid struct SimpleStruct. Field "b" not present.'
          ),
        },
        {
          fn: exhaustiveExamplesInterface.functions.struct_with_tuple,
          title: '[tuple] - extra element',
          value: { propB1: [true, U64_MAX, 'extra element'] },
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Types/values length mismatch.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.struct_with_tuple,
          title: '[tuple] - missing element',
          value: { propB1: [true] },
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Types/values length mismatch.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.array_simple,
          title: '[array] - input not array',
          value: { 0: 'element', 1: 'e', 2: 'e', 3: 'e' },
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Expected array value.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.array_simple,
          title: '[array] - not enough elements',
          value: [[1, 2, 3]],
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Types/values length mismatch.'),
        },
        {
          fn: exhaustiveExamplesInterface.functions.array_simple,
          title: '[array] - too many elements',
          value: [[1, 2, 3, 4, 5]],
          error: new FuelError(FuelError.CODES.ENCODE_ERROR, 'Types/values length mismatch.'),
        },
      ])('$title', async ({ fn, value, error }) => {
        const expectedError = error ?? new FuelError(FuelError.CODES.UNKNOWN, 'Unknown error');

        await expectToThrowFuelError(
          () => (Array.isArray(value) ? fn.encodeArguments(value) : fn.encodeArguments([value])),
          expectedError
        );
      });
    });
  });
});
