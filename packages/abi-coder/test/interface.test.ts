/* eslint-disable @typescript-eslint/no-explicit-any */
import { BN } from '@fuel-ts/math';
import { concat } from '@fuel-ts/utils';

import { NumberCoder, WORD_SIZE, Interface } from '../src';
import type { JsonAbiConfigurable } from '../src/json-abi';

import exhaustiveExamplesAbi from './fixtures/forc-projects/exhaustive-examples/out/debug/exhaustive-examples-abi.json';
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
  EMPTY_8_BYTE_ARRAY,
  U16_MAX,
  U16_MAX_ENCODED,
  U32_MAX,
  U32_MAX_ENCODED,
  U64_MAX,
  U64_MAX_ENCODED,
  U8_MAX,
  U8_MAX_ENCODED,
} from './utils/constants';

function encodeVectorFully(
  encodedData: Uint8Array[] | Uint8Array,
  offset: number,
  dataLength?: number
) {
  const data = encodedData instanceof Uint8Array ? encodedData : concat(encodedData);
  // eslint-disable-next-line no-param-reassign
  dataLength ??= data.length / 8;
  const o = new NumberCoder('u32').encode(offset);
  const length = new NumberCoder('u8').encode(dataLength);
  const capacity = length;

  return {
    offset,
    length: dataLength,
    vec: concat([o, length, capacity]),
    data,
  };
}

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

      'struct_with_implicitGenerics',
      'struct_with_implicitGenerics(s<b256,u8>(a[b256;3],<b256,u8>(b256,u8)))',
      '0x00000000a282b8c9',
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

      expect(() => exhaustiveExamplesInterface.encodeFunctionData(fnName, [123])).toThrow();

      expect(() =>
        exhaustiveExamplesInterface.decodeFunctionData(fnName, new Uint8Array())
      ).toThrow();
    });

    it('raises an error if the arguments do not match the function input types', () => {
      const values = [11, 11];

      const errMsg = `Mismatch between provided arguments and expected ABI inputs.`
        .concat(` Provided ${values.length} arguments,`)
        .concat(` but expected 1 (excluding 0 optional inputs).`);

      expect(() => exhaustiveExamplesInterface.encodeFunctionData('entry_one', values)).toThrow(
        errMsg
      );
    });
  });

  describe('configurables', () => {
    it('sets configurables as dictionary', () => {
      const dict = exhaustiveExamplesAbi.configurables.reduce((obj, val) => {
        const o: Record<string, JsonAbiConfigurable> = obj;
        o[val.name] = val;
        return o;
      }, {});
      expect(exhaustiveExamplesInterface.configurables).toEqual(dict);
    });

    it('encodes configurables', () => {
      const encoded = exhaustiveExamplesInterface.encodeConfigurable('U8', 55);
      expect(encoded).toEqual(new Uint8Array([55, 0, 0, 0, 0, 0, 0, 0]));
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
          encodedValue: EMPTY_8_BYTE_ARRAY,
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_8,
          title: '[u8]',
          value: U8_MAX,
          encodedValue: Uint8Array.from(U8_MAX_ENCODED).reverse(),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_16,
          title: '[u16]',
          value: 0,
          encodedValue: EMPTY_8_BYTE_ARRAY,
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
          encodedValue: EMPTY_8_BYTE_ARRAY,
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
          encodedValue: EMPTY_8_BYTE_ARRAY,
          decodedTransformer: (decoded: unknown | undefined) =>
            (decoded as BN).toNumber() as number,
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_64,
          title: '[u64]',
          value: U8_MAX,
          encodedValue: Uint8Array.from(U8_MAX_ENCODED).reverse(),
          decodedTransformer: (decoded: unknown | undefined) => (decoded as BN).toNumber(),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_64,
          title: '[u64]',
          value: U16_MAX,
          encodedValue: U16_MAX_ENCODED,
          decodedTransformer: (decoded: unknown | undefined) => (decoded as BN).toNumber(),
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_64,
          title: '[u64]',
          value: U32_MAX,
          encodedValue: U32_MAX_ENCODED,
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
          encodedValue: EMPTY_8_BYTE_ARRAY,
        },
        {
          fn: exhaustiveExamplesInterface.functions.boolean,
          title: '[bool]',
          value: true,
          encodedValue: Uint8Array.from(BOOL_TRUE_ENCODED).reverse(),
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
          encodedValue: [B256_ENCODED, EMPTY_8_BYTE_ARRAY],
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
          fn: exhaustiveExamplesInterface.functions.struct_with_implicitGenerics,
          title: '[struct] with implicit generics',
          value: { arr: [B256_DECODED, B256_DECODED, B256_DECODED], tuple: [B256_DECODED, U8_MAX] },
          encodedValue: [B256_ENCODED, B256_ENCODED, B256_ENCODED, B256_ENCODED, U8_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamplesInterface.functions.bytes,
          title: '[struct Bytes]',
          value: [[1, 2, 3]],
          encodedValue: new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 3, 0, 0,
            0, 0, 0,
          ]),
          decodedTransformer: (decoded: unknown | undefined) => {
            const data = (decoded as BN[]).slice(0, 3);
            return Array.from(data);
          },
        },
        {
          fn: exhaustiveExamplesInterface.functions.raw_slice,
          title: '[raw_slice]',
          value: [[1, 2, 3]],
          encodedValue: new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
            0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3,
          ]),
          decodedTransformer: (decoded: unknown | undefined) => {
            const data = (decoded as BN[]).slice(2);
            return data.map((v: BN) => v.toNumber());
          },
        },
        {
          fn: exhaustiveExamplesInterface.functions.dynamic_string,
          title: '[struct String]',
          value: 'H3llo W0rld',
          encodedValue: new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 11, 72, 51, 108,
            108, 111, 32, 87, 48, 114, 108, 100, 0, 0, 0, 0, 0,
          ]),
        },
        {
          fn: exhaustiveExamplesInterface.functions.tuple_as_param,
          title: '[tuple] as param',
          value: [[U8_MAX, { propA1: { propB1: U64_MAX }, propA2: 'aaa' }]],
          encodedValue: [
            U8_MAX_ENCODED,
            U64_MAX_ENCODED,
            EMPTY_8_BYTE_ARRAY.slice().fill(97, 0, 3),
          ],
        },
        {
          fn: exhaustiveExamplesInterface.functions.option_u8,
          title: '[option] u8',
          value: undefined,
          encodedValue: [EMPTY_8_BYTE_ARRAY, EMPTY_8_BYTE_ARRAY],
        },
        {
          fn: exhaustiveExamplesInterface.functions.option_u8,
          title: '[option] u8',
          value: U8_MAX,
          encodedValue: [
            Uint8Array.from(EMPTY_8_BYTE_ARRAY).fill(1, 7),
            Uint8Array.from(U8_MAX_ENCODED).reverse(),
          ],
        },
        {
          fn: exhaustiveExamplesInterface.functions.enum_simple,
          title: '[enum] simple',
          value: 'Green',
          encodedValue: EMPTY_8_BYTE_ARRAY.slice().fill(1, 7),
        },
        {
          fn: exhaustiveExamplesInterface.functions.enum_simple,
          title: '[enum] simple',
          value: 'Green',
          encodedValue: EMPTY_8_BYTE_ARRAY.slice().fill(1, 7),
        },
        {
          fn: exhaustiveExamplesInterface.functions.enum_with_builtin_type,
          title: '[enum] with builtin type',
          value: { a: true },
          encodedValue: [EMPTY_8_BYTE_ARRAY, EMPTY_8_BYTE_ARRAY.slice().fill(1, 7)],
        },
        {
          fn: exhaustiveExamplesInterface.functions.enum_with_builtin_type,
          title: '[enum] with builtin type',
          value: { b: U64_MAX },
          encodedValue: [EMPTY_8_BYTE_ARRAY.slice().fill(1, 7), U64_MAX_ENCODED],
        },
        {
          fn: exhaustiveExamplesInterface.functions.enum_with_structs,
          title: '[enum] with structs',
          value: { c: { propA1: U64_MAX, propA2: { a: true, b: U32_MAX } } },
          encodedValue: [
            EMPTY_8_BYTE_ARRAY.slice().fill(2, 7),
            U64_MAX_ENCODED,
            BOOL_TRUE_ENCODED,
            U32_MAX_ENCODED,
          ],
        },
        {
          fn: exhaustiveExamplesInterface.functions.array_simple,
          title: '[array] simple',
          value: [[1, 2, 3, U8_MAX]],
          encodedValue: Uint8Array.from([1, 2, 3, U8_MAX, 0, 0, 0, 0]),
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
            EMPTY_8_BYTE_ARRAY.slice().fill(1, 7),
            EMPTY_8_BYTE_ARRAY,
            U32_MAX_ENCODED,
            BOOL_TRUE_ENCODED,
            EMPTY_8_BYTE_ARRAY.slice().fill(2, 7),
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
                  bom: { propA1: U8_MAX, propA2: B256_DECODED },
                },
                {
                  bim: B256_DECODED,
                  bam: { propB1: 0 },
                  bom: { propA1: U8_MAX, propA2: B256_DECODED },
                },
                {
                  bim: B256_DECODED,
                  bam: { propB1: U8_MAX },
                  bom: { propA1: U8_MAX, propA2: B256_DECODED },
                },
              ],
            },
          ],
          encodedValue: [
            B256_ENCODED,
            U8_MAX_ENCODED,
            U8_MAX_ENCODED,
            B256_ENCODED,
            B256_ENCODED,
            EMPTY_8_BYTE_ARRAY,
            U8_MAX_ENCODED,
            B256_ENCODED,
            B256_ENCODED,
            U8_MAX_ENCODED,
            U8_MAX_ENCODED,
            B256_ENCODED,
          ],
        },
        {
          fn: exhaustiveExamplesInterface.functions.vector_boolean,
          title: '[vector] boolean',
          value: [[true, false, true, true]],
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          encodedValue: () => {
            const data = Uint8Array.from([1, 0, 1, 1]);
            const vector = encodeVectorFully(data, 3 * WORD_SIZE, data.length);
            return [vector.vec, vector.data] as Uint8Array[];
          },
        },
        {
          fn: exhaustiveExamplesInterface.functions.vector_u8,
          title: '[vector] u8',
          value: [[U8_MAX, 0, U8_MAX, U8_MAX]],
          encodedValue: () => {
            const data = Uint8Array.from([U8_MAX, 0, U8_MAX, U8_MAX]);
            const vector = encodeVectorFully(data, 3 * WORD_SIZE, data.length);
            return [vector.vec, vector.data] as Uint8Array[];
          },
        },
        {
          skipDecoding: true,
          fn: exhaustiveExamplesInterface.functions.arg_then_vector_u8,
          title: '[vector] some arg then u8 vector',
          value: [{ a: true, b: U32_MAX }, [U8_MAX, 0, U8_MAX, U8_MAX]],
          encodedValue: () => {
            const data = Uint8Array.from([U8_MAX, 0, U8_MAX, U8_MAX]);

            const vector = encodeVectorFully(data, 2 * WORD_SIZE + 3 * WORD_SIZE, data.length);
            return [BOOL_TRUE_ENCODED, U32_MAX_ENCODED, vector.vec, vector.data];
          },
        },
        {
          skipDecoding: true,
          fn: exhaustiveExamplesInterface.functions.vector_u8_then_arg,
          title: '[vector] Vector u8 and then b256',
          value: [[U8_MAX, 0, U8_MAX, U8_MAX], B256_DECODED],
          encodedValue: () => {
            const data = Uint8Array.from([U8_MAX, 0, U8_MAX, U8_MAX]);

            const fullyEncodedVector = encodeVectorFully(
              data,
              3 * WORD_SIZE + B256_ENCODED.length,
              data.length
            );
            return [fullyEncodedVector.vec, B256_ENCODED, fullyEncodedVector.data] as Uint8Array[];
          },
        },
        {
          skipDecoding: true,
          fn: exhaustiveExamplesInterface.functions.two_u8_vectors,
          title: '[vector] two u8 vectors',
          value: [
            [U8_MAX, U8_MAX],
            [U8_MAX, 0, U8_MAX, U8_MAX],
          ],
          encodedValue: () => {
            const vec1Data = Uint8Array.from([U8_MAX, U8_MAX]);
            const vec2Data = Uint8Array.from([U8_MAX, 0, U8_MAX, U8_MAX]);
            const vec1 = encodeVectorFully(vec1Data, 2 * 3 * WORD_SIZE, vec1Data.length);
            const vec2 = encodeVectorFully(vec2Data, vec1.offset + vec1.length, vec2Data.length);
            return [vec1.vec, vec2.vec, vec1.data, vec2.data];
          },
        },
        {
          skipDecoding: true,
          fn: exhaustiveExamplesInterface.functions.u32_then_three_vectors_u64,
          title: '[vector] arg u32 and then three vectors u64',
          value: [33, [450, 202, 340], [12, 13, 14], [11, 9]],
          encodedValue: () => {
            const EXPECTED: Uint8Array[] = [
              new Uint8Array([0, 0, 0, 0, 0, 0, 0, 33]),
              new Uint8Array([
                0, 0, 0, 0, 0, 0, 1, 194, 0, 0, 0, 0, 0, 0, 0, 202, 0, 0, 0, 0, 0, 0, 1, 84,
              ]),
              new Uint8Array([
                0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 14,
              ]),
              new Uint8Array([0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 9]),
            ];
            const vec1 = encodeVectorFully(EXPECTED[1], WORD_SIZE + 3 * WORD_SIZE * 3);
            const vec2 = encodeVectorFully(EXPECTED[2], vec1.offset + vec1.length * WORD_SIZE);

            const vec3 = encodeVectorFully(EXPECTED[3], vec2.offset + vec2.length * WORD_SIZE);

            return [
              EXPECTED[0],
              vec1.vec,
              vec2.vec,
              vec3.vec,
              vec1.data,
              vec2.data,
              vec3.data,
            ] as Uint8Array[];
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          decodedTransformer: (value: unknown | undefined) =>
            (value as any[]).map((x) =>
              Array.isArray(x) ? x.map((y) => (y instanceof BN ? y.toNumber() : y)) : x
            ),
        },
        {
          skipDecoding: true,
          fn: exhaustiveExamplesInterface.functions.vector_inside_vector,
          title: '[vector] vector inside vector [with offset]',
          value: [
            [
              [0, 1, 2],
              [6, 7, 8],
            ],
          ],
          encodedValue: (input?: any, offset: number = 0) => {
            // eslint-disable-next-line no-param-reassign
            input = input[0];

            const pointer = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, offset + 24]);
            const capacity = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input.length]);
            const length = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input.length]);

            const pointerVec1 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, offset + 72]);
            const capacityVec1 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[0].length]);
            const lengthVec1 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[0].length]);
            const data1Vec1 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[0][0]]);
            const data2Vec1 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[0][1]]);
            const data3Vec1 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[0][2]]);
            const pointerVec2 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, offset + 96]);
            const capacityVec2 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[1].length]);
            const lengthVec2 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[1].length]);
            const data1Vec2 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[1][0]]);
            const data2Vec2 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[1][1]]);
            const data3Vec2 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[1][2]]);
            const expectedBytes = concat([
              // top level vector
              pointer,
              capacity,
              length,
              // top level vector, index 0 vector
              pointerVec1,
              capacityVec1,
              lengthVec1,
              // top level vector, index 1 vector
              pointerVec2,
              capacityVec2,
              lengthVec2,
              // index 0 vector's data
              data1Vec1,
              data2Vec1,
              data3Vec1,
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
          encodedValue: (input?: any, offset: number = 0) => {
            // eslint-disable-next-line no-param-reassign
            input = input[0];

            const pointer = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 24 + offset]);
            const capacity = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[0].length]);
            const length = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[0].length]);

            const data1 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[0][0]]);
            const data2 = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input[0][1]]);
            const expectedBytes = concat([pointer, capacity, length, data1, data2]);

            return expectedBytes;
          },
          offset: 40,
        },
        {
          skipDecoding: true,
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
            const enumCaseOne = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 1]);
            const pointer = EMPTY_8_BYTE_ARRAY.slice().fill(enumCaseOne.length + 3 * WORD_SIZE, 7);

            const capacity = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input.vec.length]);
            const length = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input.vec.length]);
            const vectorData = Uint8Array.from(input.vec);

            const expectedBytes = concat([enumCaseOne, pointer, capacity, length, vectorData]);
            return expectedBytes;
          },
          offset: 0,
        },
        {
          skipDecoding: true,
          fn: exhaustiveExamplesInterface.functions.vector_inside_struct,
          title: '[vector] vector inside struct [with offset]',
          value: [
            {
              num: 7,
              vec: [3, 9, 6, 4],
            },
          ],
          encodedValue: (input?: any, offset: number = 0) => {
            // eslint-disable-next-line no-param-reassign
            input = input[0];
            const u8 = EMPTY_8_BYTE_ARRAY.slice().fill(7, 0, 1);
            const pointer = EMPTY_8_BYTE_ARRAY.slice().fill(offset + u8.length + 3 * WORD_SIZE, 7);
            const capacity = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input.vec.length]);
            const length = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, input.vec.length]);
            const vectorData = Uint8Array.from(input.vec);

            const expectedBytes = concat([u8, pointer, capacity, length, vectorData]);

            return expectedBytes;
          },
          offset: 16,
        },
      ])(
        '$title: $value',
        ({ fn, title: _title, value, encodedValue, decodedTransformer, offset, skipDecoding }) => {
          const encoded = Array.isArray(value)
            ? fn.encodeArguments(value, offset)
            : fn.encodeArguments([value], offset);

          const encodedVal =
            encodedValue instanceof Function ? encodedValue(value, offset) : encodedValue;
          const expectedEncoded =
            encodedVal instanceof Uint8Array ? encodedVal : concat(encodedVal);

          expect(encoded).toEqual(expectedEncoded);

          if (skipDecoding) {
            return;
          }

          let decoded = fn.decodeOutput(expectedEncoded)[0];

          if (decodedTransformer) {
            decoded = decodedTransformer(decoded);
          }

          const expectedDecoded = Array.isArray(value) && value.length === 1 ? value[0] : value; // the conditional is when the input is a SINGLE array/tuple - then de-nest it

          expect(decoded).toStrictEqual(expectedDecoded);
        }
      );
    });

    describe('fails when encoding', () => {
      it.each([
        {
          fn: exhaustiveExamplesInterface.functions.u_8,
          title: '[u8] - negative',
          value: -1,
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_8,
          title: '[u8] - over max',
          value: U8_MAX + 1,
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_16,
          title: '[u16] - negative',
          value: -1,
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_16,
          title: '[u16] - over max',
          value: U32_MAX + 1,
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_32,
          title: '[u32] - negative',
          value: -1,
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_32,
          title: '[u32] - over max',
          value: U32_MAX + 1,
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_64,
          title: '[u64] - negative',
          value: -1,
        },
        {
          fn: exhaustiveExamplesInterface.functions.u_64,
          title: '[u64] - over max',
          value: U64_MAX.add(1),
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_256,
          title: '[b256] - too short',
          value: B256_DECODED.slice(0, B256_DECODED.length - 1),
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_256,
          title: '[b256] - too long',
          value: `${B256_DECODED}0`,
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_256,
          title: '[b256] - not hex',
          value: `not a hex string`,
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_512,
          title: '[b512] - too short',
          value: B512_ENCODED.slice(0, B512_ENCODED.length - 1),
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_512,
          title: '[b512] - too long',
          value: `${B512_DECODED}0`,
        },
        {
          fn: exhaustiveExamplesInterface.functions.b_256,
          title: '[b512] - not hex',
          value: `not a hex string`,
        },
        {
          fn: exhaustiveExamplesInterface.functions.boolean,
          title: '[boolean] - not bool',
          value: 'not bool',
        },
        {
          fn: exhaustiveExamplesInterface.functions.enum_simple,
          title: '[enum] - not in values',
          value: "Doesn't exist",
        },
        {
          fn: exhaustiveExamplesInterface.functions.enum_with_builtin_type,
          title: '[enum] - multiple values selected',
          value: { a: true, b: 1 },
        },
        {
          fn: exhaustiveExamplesInterface.functions.struct_simple,
          title: '[struct] - missing property',
          value: { a: true },
        },
        {
          fn: exhaustiveExamplesInterface.functions.struct_with_tuple,
          title: '[tuple] - extra element',
          value: { propB1: [true, U64_MAX, 'extra element'] },
        },
        {
          fn: exhaustiveExamplesInterface.functions.struct_with_tuple,
          title: '[tuple] - missing element',
          value: { propB1: [true] },
        },
        {
          fn: exhaustiveExamplesInterface.functions.array_simple,
          title: '[array] - input not array',
          value: { 0: 'element', 1: 'e', 2: 'e', 3: 'e' },
        },
        {
          fn: exhaustiveExamplesInterface.functions.array_simple,
          title: '[array] - not enough elements',
          value: [[1, 2, 3]],
        },
        {
          fn: exhaustiveExamplesInterface.functions.array_simple,
          title: '[array] - too many elements',
          value: [[1, 2, 3, 4, 5]],
        },
      ])('$title', ({ fn, value }) => {
        expect(() =>
          Array.isArray(value) ? fn.encodeArguments(value) : fn.encodeArguments([value])
        ).toThrow();
      });
    });
  });

  describe('abi types', () => {
    it('should return the correct type when it exists', () => {
      const abiType = exhaustiveExamplesInterface.getTypeById(0);
      expect(abiType.type).toEqual('()');
      expect(abiType.components).toBeDefined();
      expect(abiType.typeParameters).toBeNull();
    });

    it('should throw an error when type does not exist', () => {
      const id = 999;
      expect(() => exhaustiveExamplesInterface.getTypeById(id)).toThrowError(
        `Type with typeId '${id}' doesn't exist in the ABI.`
      );
    });
  });
});
