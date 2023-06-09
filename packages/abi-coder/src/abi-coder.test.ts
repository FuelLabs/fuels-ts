import { hexlify, concat } from '@ethersproject/bytes';
import { bn, toHex } from '@fuel-ts/math';

import AbiCoder from './abi-coder';
import type { DecodedValue } from './coders/abstract-coder';
import type { JsonAbiFragmentType, JsonFlatAbi } from './json-abi';
import { ABI } from './json-abi';
import { chunkByWord } from './utilities';

const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

describe('AbiCoder', () => {
  const abiCoder = new AbiCoder();

  it('encodes and decodes a single primitive', () => {
    const types = [
      {
        type: 'b256',
        name: 'arg0',
      },
    ];
    const encoded = abiCoder.encode(types, [B256]);
    expect(hexlify(encoded)).toEqual(B256);
    const decoded = abiCoder.decode(types, encoded) as DecodedValue[];
    expect(decoded).toEqual([B256]);
  });

  it('encodes and decodes a u8 struct', () => {
    const types = [
      {
        name: 'MyStruct',
        type: 'struct MyStruct',
        components: [
          {
            name: 'num',
            type: 'u8',
          },
          {
            name: 'bar',
            type: 'u8',
          },
        ],
      },
    ];
    const encoded = abiCoder.encode(types, [
      {
        num: 7,
        bar: 9,
      },
    ]);
    expect(encoded).toEqual(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 9]));
    const decoded = abiCoder.decode(types, encoded) as DecodedValue[];
    expect(decoded).toEqual([
      {
        num: 7,
        bar: 9,
      },
    ]);
  });

  it('encodes and decodes a u8 enum', () => {
    const types = [
      {
        name: 'MyStruct',
        type: 'enum MyEnum',
        components: [
          {
            name: 'num',
            type: 'u8',
          },
          {
            name: 'bar',
            type: 'u8',
          },
        ],
      },
    ];
    const encoded = abiCoder.encode(types, [
      {
        bar: 9,
      },
    ]);
    expect(encoded).toEqual(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 9]));
    const decoded = abiCoder.decode(types, encoded) as DecodedValue[];
    expect(decoded).toEqual([
      {
        bar: 9,
      },
    ]);
  });

  it('encodes and decodes multiple primitives', () => {
    const types = [
      {
        type: 'b256',
        name: 'arg0',
      },
      {
        type: 'b256',
        name: 'arg1',
      },
    ];
    const encoded = abiCoder.encode(types, [B256, B256]);
    expect(hexlify(encoded)).toEqual(
      '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930bd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    );
    const decoded = abiCoder.decode(types, encoded) as DecodedValue[];
    expect(decoded).toEqual([B256, B256]);
  });

  it('encodes and decodes arrays', () => {
    const types = [
      {
        name: 'a',
        type: '[u64; 3]',
        components: [
          {
            name: '__array_element',
            type: 'u64',
            components: null,
          },
        ],
      },
    ];

    const encoded = abiCoder.encode(types, [[1, toHex(2), bn(3)]]);

    expect(hexlify(encoded)).toBe('0x000000000000000100000000000000020000000000000003');
  });

  it('encodes and decodes arrays of strings', () => {
    const types = [
      {
        name: 'arg',
        type: '[str[3]; 3]',
        components: [
          {
            name: '__array_element',
            type: 'str[3]',
          },
        ],
      },
    ];

    const encoded = abiCoder.encode(types, [['aaa', 'aab', 'aac']]);

    expect(hexlify(encoded)).toBe('0x616161000000000061616200000000006161630000000000');
  });

  it('encodes and decodes nested reference types', () => {
    const types = [
      {
        name: 'test',
        type: 'enum Test',
        components: [
          {
            name: 'foo',
            type: '(bool,bool)',
            components: [
              {
                name: '__tuple_element',
                type: 'bool',
              },
              {
                name: '__tuple_element',
                type: 'bool',
              },
            ],
          },
          {
            name: 'bar',
            type: 'u64',
          },
        ],
      },
      {
        name: 'arg0',
        type: 'bool',
      },
      {
        name: 'arg1',
        type: '[struct Test; 2]',
        components: [
          {
            name: '__array_element',
            type: 'struct Test',
            components: [
              {
                name: 'foo',
                type: 'u64',
              },
              {
                name: 'bar',
                type: 'u64',
              },
            ],
          },
        ],
      },
      {
        name: 'arg2',
        type: '(struct Test,bool)',
        components: [
          {
            name: '__tuple_element',
            type: 'struct Test',
            components: [
              {
                name: 'foo',
                type: 'u64',
              },
              {
                name: 'bar',
                type: 'u64',
              },
            ],
          },
          {
            name: '__tuple_element',
            type: 'bool',
          },
        ],
      },
    ];
    const encoded = abiCoder.encode(types, [
      {
        foo: [true, true],
      },
      true,
      [
        { foo: 13, bar: 37 },
        { bar: 13, foo: 37 },
      ],
      [{ foo: 13, bar: 37 }, true],
    ]);
    expect(hexlify(encoded)).toEqual(
      '0x0000000000000000000000000000000100000000000000010000000000000001000000000000000d00000000000000250000000000000025000000000000000d000000000000000d00000000000000250000000000000001'
    );
    const decoded = abiCoder.decode(types, encoded) as DecodedValue[];
    expect(JSON.stringify(Array.from(decoded))).toEqual(
      JSON.stringify([
        {
          foo: [true, true],
        },
        true,
        [
          { foo: bn(13), bar: bn(37) },
          { foo: bn(37), bar: bn(13) },
        ],
        [{ foo: bn(13), bar: bn(37) }, true],
      ])
    );
  });

  it('encodes vector [u8]', () => {
    const types = [
      {
        name: 'vector',
        type: 'struct Vec',
        components: [
          {
            name: 'buf',
            type: 'struct RawVec',
            components: [
              {
                name: 'ptr',
                type: 'raw untyped ptr',
                isParamType: true,
              },
              {
                name: 'cap',
                type: 'u64',
                isParamType: true,
              },
            ],
            typeArguments: [
              {
                name: '',
                type: 'u8',
                isParamType: true,
              },
            ],
            isParamType: true,
          },
          {
            name: 'len',
            type: 'u64',
          },
        ],
        typeArguments: [
          {
            name: '',
            type: 'u8',
            isParamType: true,
          },
        ],
        isParamType: true,
      },
    ];

    const input = [36];
    const encoded = abiCoder.encode(types, [input]);

    const pointer = [0, 0, 0, 0, 0, 0, 0, 24];
    const capacity = [0, 0, 0, 0, 0, 0, 0, input.length];
    const length = [0, 0, 0, 0, 0, 0, 0, input.length];
    const data = [0, 0, 0, 0, 0, 0, 0, input[0]];
    const expectedBytes = concat([pointer, capacity, length, data]);

    const expected = hexlify(expectedBytes);

    expect(hexlify(encoded)).toBe(expected);
  });

  it('encodes vector [u8 multi]', () => {
    const types = [
      {
        name: 'vector',
        type: 'struct Vec',
        components: [
          {
            name: 'buf',
            type: 'struct RawVec',
            components: [
              {
                name: 'ptr',
                type: 'raw untyped ptr',
                isParamType: true,
              },
              {
                name: 'cap',
                type: 'u64',
                isParamType: true,
              },
            ],
            typeArguments: [
              {
                name: '',
                type: 'u8',
                isParamType: true,
              },
            ],
            isParamType: true,
          },
          {
            name: 'len',
            type: 'u64',
          },
        ],
        typeArguments: [
          {
            name: '',
            type: 'u8',
            isParamType: true,
          },
        ],
        isParamType: true,
      },
    ];

    const input = [36, 23, 19];
    const encoded = abiCoder.encode(types, [input]);

    const pointer = [0, 0, 0, 0, 0, 0, 0, 24];
    const capacity = [0, 0, 0, 0, 0, 0, 0, input.length];
    const length = [0, 0, 0, 0, 0, 0, 0, input.length];
    const data1 = [0, 0, 0, 0, 0, 0, 0, input[0]];
    const data2 = [0, 0, 0, 0, 0, 0, 0, input[1]];
    const data3 = [0, 0, 0, 0, 0, 0, 0, input[2]];
    const expectedBytes = concat([pointer, capacity, length, data1, data2, data3]);

    const expected = hexlify(expectedBytes);

    expect(hexlify(encoded)).toBe(expected);
  });

  it('encodes vector [u8 multi large offset]', () => {
    const types = [
      {
        name: 'vector',
        type: 'struct Vec',
        components: [
          {
            name: 'buf',
            type: 'struct RawVec',
            components: [
              {
                name: 'ptr',
                type: 'raw untyped ptr',
                isParamType: true,
              },
              {
                name: 'cap',
                type: 'u64',
                isParamType: true,
              },
            ],
            typeArguments: [
              {
                name: '',
                type: 'u8',
                isParamType: true,
              },
            ],
            isParamType: true,
          },
          {
            name: 'len',
            type: 'u64',
          },
        ],
        typeArguments: [
          {
            name: '',
            type: 'u8',
            isParamType: true,
          },
        ],
        isParamType: true,
      },
    ];

    const input = [36, 23, 19];
    const encoded = abiCoder.encode(types, [input], 14440);

    const pointer = [0, 0, 0, 0, 0, 0, 56, 128];
    const capacity = [0, 0, 0, 0, 0, 0, 0, input.length];
    const length = [0, 0, 0, 0, 0, 0, 0, input.length];
    const data1 = [0, 0, 0, 0, 0, 0, 0, input[0]];
    const data2 = [0, 0, 0, 0, 0, 0, 0, input[1]];
    const data3 = [0, 0, 0, 0, 0, 0, 0, input[2]];
    const expectedBytes = concat([pointer, capacity, length, data1, data2, data3]);

    const expected = hexlify(expectedBytes);

    expect(hexlify(encoded)).toBe(expected);
  });

  it('encodes vector [u8 with offset]', () => {
    const types = [
      {
        name: 'vector',
        type: 'struct Vec',
        components: [
          {
            name: 'buf',
            type: 'struct RawVec',
            components: [
              {
                name: 'ptr',
                type: 'raw untyped ptr',
                isParamType: true,
              },
              {
                name: 'cap',
                type: 'u64',
                isParamType: true,
              },
            ],
            typeArguments: [
              {
                name: '',
                type: 'u8',
                isParamType: true,
              },
            ],
            isParamType: true,
          },
          {
            name: 'len',
            type: 'u64',
          },
        ],
        typeArguments: [
          {
            name: '',
            type: 'u8',
            isParamType: true,
          },
        ],
        isParamType: true,
      },
    ];

    const input = [19];
    const encoded = abiCoder.encode(types, [input], 16);

    const pointer = [0, 0, 0, 0, 0, 0, 0, 16 + 24];
    const capacity = [0, 0, 0, 0, 0, 0, 0, input.length];
    const length = [0, 0, 0, 0, 0, 0, 0, input.length];
    const data = [0, 0, 0, 0, 0, 0, 0, input[0]];
    const expectedBytes = concat([pointer, capacity, length, data]);

    const expected = hexlify(expectedBytes);

    expect(hexlify(encoded)).toBe(expected);
  });

  it('encodes vector [two u32 multi]', () => {
    const types = [
      {
        name: 'vector A',
        type: 'struct Vec',
        components: [
          {
            name: 'buf',
            type: 'struct RawVec',
            components: [
              {
                name: 'ptr',
                type: 'raw untyped ptr',
              },
              {
                name: 'cap',
                type: 'u64',
              },
            ],
          },
          {
            name: 'len',
            type: 'u64',
          },
        ],
        typeArguments: [
          {
            name: '',
            type: 'u32',
          },
        ],
      },
      {
        name: 'vector B',
        type: 'struct Vec',
        components: [
          {
            name: 'buf',
            type: 'struct RawVec',
            components: [
              {
                name: 'ptr',
                type: 'raw untyped ptr',
              },
              {
                name: 'cap',
                type: 'u64',
              },
            ],
          },
          {
            name: 'len',
            type: 'u64',
          },
        ],
        typeArguments: [
          {
            name: '',
            type: 'u32',
          },
        ],
      },
    ];

    const input = [
      [36, 23, 19],
      [35, 6, 4],
    ];
    const encoded = abiCoder.encode(types, input);

    const pointerA = [0, 0, 0, 0, 0, 0, 0, 48];
    const pointerB = [0, 0, 0, 0, 0, 0, 0, 72];
    const capacity = [0, 0, 0, 0, 0, 0, 0, input[0].length];
    const length = [0, 0, 0, 0, 0, 0, 0, input[0].length];
    const dataA1 = [0, 0, 0, 0, 0, 0, 0, input[0][0]];
    const dataA2 = [0, 0, 0, 0, 0, 0, 0, input[0][1]];
    const dataA3 = [0, 0, 0, 0, 0, 0, 0, input[0][2]];
    const dataB1 = [0, 0, 0, 0, 0, 0, 0, input[1][0]];
    const dataB2 = [0, 0, 0, 0, 0, 0, 0, input[1][1]];
    const dataB3 = [0, 0, 0, 0, 0, 0, 0, input[1][2]];
    const expectedBytes = concat([
      pointerA,
      capacity,
      length,
      pointerB,
      capacity,
      length,
      dataA1,
      dataA2,
      dataA3,
      dataB1,
      dataB2,
      dataB3,
    ]);

    const expected = hexlify(expectedBytes);

    expect(hexlify(encoded)).toBe(expected);
  });

  it('encodes vector inside vector [single u32]', () => {
    const types = [
      {
        name: 'vector in vector',
        type: 'struct Vec',
        components: [
          {
            name: 'buf',
            type: 'struct RawVec',
            components: [
              {
                name: 'ptr',
                type: 'raw untyped ptr',
                isParamType: true,
              },
              {
                name: 'cap',
                type: 'u64',
                isParamType: true,
              },
            ],
            typeArguments: [],
            isParamType: true,
          },
          {
            name: 'len',
            type: 'u64',
          },
        ],
        typeArguments: [
          {
            name: 'in vector',
            type: 'struct Vec',
            components: [
              {
                name: 'buf',
                type: 'struct RawVec',
                components: [
                  {
                    name: 'ptr',
                    type: 'raw untyped ptr',
                    isParamType: true,
                  },
                  {
                    name: 'cap',
                    type: 'u64',
                    isParamType: true,
                  },
                ],
                typeArguments: [
                  {
                    name: '',
                    type: 'u32',
                    isParamType: true,
                  },
                ],
                isParamType: true,
              },
              {
                name: 'len',
                type: 'u64',
              },
            ],
            typeArguments: [
              {
                name: '',
                type: 'u32',
                isParamType: true,
              },
            ],
            isParamType: true,
          },
        ],
        isParamType: true,
      },
    ];

    const input = [[5, 6]];
    const encoded = abiCoder.encode(types, [input]);

    const pointerVec1 = [0, 0, 0, 0, 0, 0, 0, 24];
    const capacityVec1 = [0, 0, 0, 0, 0, 0, 0, input.length];
    const lengthVec1 = [0, 0, 0, 0, 0, 0, 0, input.length];

    const pointerVec2 = [0, 0, 0, 0, 0, 0, 0, 48];
    const capacityVec2 = [0, 0, 0, 0, 0, 0, 0, input[0].length];
    const lengthVec2 = [0, 0, 0, 0, 0, 0, 0, input[0].length];
    const data1Vec1 = [0, 0, 0, 0, 0, 0, 0, input[0][0]];
    const data2Vec1 = [0, 0, 0, 0, 0, 0, 0, input[0][1]];

    const expectedBytes = concat([
      // top level vector
      pointerVec1,
      capacityVec1,
      lengthVec1,
      // top level vector, index 0 vector
      pointerVec2,
      capacityVec2,
      lengthVec2,
      // index 0 vector's data
      data1Vec1,
      data2Vec1,
    ]);

    const expected = hexlify(expectedBytes);

    expect(hexlify(encoded)).toBe(expected);
  });

  it('encodes vector inside array [u8 with offset]', () => {
    const types = [
      {
        name: 'array',
        type: '[_; 1]',
        components: [
          {
            name: '__array_element',
            type: 'struct Vec',
            components: [
              {
                name: 'buf',
                type: 'struct RawVec',
                components: [
                  {
                    name: 'ptr',
                    type: 'raw untyped ptr',
                  },
                  {
                    name: 'cap',
                    type: 'u64',
                  },
                ],
                typeArguments: [
                  {
                    name: '',
                    type: 'u8',
                  },
                ],
              },
              {
                name: 'len',
                type: 'u64',
              },
            ],
            typeArguments: [
              {
                name: '',
                type: 'u8',
              },
            ],
          },
        ],
      },
    ];

    const offset = 40;
    const input = [[5, 6]];
    const encoded = abiCoder.encode(types, [input], offset);

    const pointer = [0, 0, 0, 0, 0, 0, 0, 24 + offset];
    const capacity = [0, 0, 0, 0, 0, 0, 0, input[0].length];
    const length = [0, 0, 0, 0, 0, 0, 0, input[0].length];

    const data1 = [0, 0, 0, 0, 0, 0, 0, input[0][0]];
    const data2 = [0, 0, 0, 0, 0, 0, 0, input[0][1]];
    const expectedBytes = concat([pointer, capacity, length, data1, data2]);

    const expected = hexlify(expectedBytes);

    expect(hexlify(encoded)).toBe(expected);
  });

  it('encodes vector inside vector [u32]', () => {
    const types = [
      {
        name: 'vector in vector',
        type: 'struct Vec',
        components: [
          {
            name: 'buf',
            type: 'struct RawVec',
            components: [
              {
                name: 'ptr',
                type: 'raw untyped ptr',
                isParamType: true,
              },
              {
                name: 'cap',
                type: 'u64',
                isParamType: true,
              },
            ],
            typeArguments: [],
            isParamType: true,
          },
          {
            name: 'len',
            type: 'u64',
          },
        ],
        typeArguments: [
          {
            name: 'in vector',
            type: 'struct Vec',
            components: [
              {
                name: 'buf',
                type: 'struct RawVec',
                components: [
                  {
                    name: 'ptr',
                    type: 'raw untyped ptr',
                    isParamType: true,
                  },
                  {
                    name: 'cap',
                    type: 'u64',
                    isParamType: true,
                  },
                ],
                typeArguments: [
                  {
                    name: '',
                    type: 'u32',
                    isParamType: true,
                  },
                ],
                isParamType: true,
              },
              {
                name: 'len',
                type: 'u64',
              },
            ],
            typeArguments: [
              {
                name: '',
                type: 'u32',
                isParamType: true,
              },
            ],
            isParamType: true,
          },
        ],
        isParamType: true,
      },
    ];

    const input = [
      [0, 1, 2],
      [6, 7, 8],
    ];
    const encoded = abiCoder.encode(types, [input]);

    const pointer = [0, 0, 0, 0, 0, 0, 0, 24];
    const capacity = [0, 0, 0, 0, 0, 0, 0, input.length];
    const length = [0, 0, 0, 0, 0, 0, 0, input.length];

    const pointerVec1 = [0, 0, 0, 0, 0, 0, 0, 72];
    const capacityVec1 = [0, 0, 0, 0, 0, 0, 0, input[0].length];
    const lengthVec1 = [0, 0, 0, 0, 0, 0, 0, input[0].length];
    const data1Vec1 = [0, 0, 0, 0, 0, 0, 0, input[0][0]];
    const data2Vec1 = [0, 0, 0, 0, 0, 0, 0, input[0][1]];
    const data3Vec1 = [0, 0, 0, 0, 0, 0, 0, input[0][2]];
    const pointerVec2 = [0, 0, 0, 0, 0, 0, 0, 96];
    const capacityVec2 = [0, 0, 0, 0, 0, 0, 0, input[1].length];
    const lengthVec2 = [0, 0, 0, 0, 0, 0, 0, input[1].length];
    const data1Vec2 = [0, 0, 0, 0, 0, 0, 0, input[1][0]];
    const data2Vec2 = [0, 0, 0, 0, 0, 0, 0, input[1][1]];
    const data3Vec2 = [0, 0, 0, 0, 0, 0, 0, input[1][2]];
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

    const expected = hexlify(expectedBytes);

    expect(hexlify(encoded)).toBe(expected);
  });

  it('encodes vector inside enum', () => {
    const types = [
      {
        name: 'MyEnum',
        type: 'enum MyEnum',
        components: [
          {
            name: 'num',
            type: 'u8',
          },
          {
            name: 'vec',
            type: 'struct Vec',
            components: [
              {
                name: 'buf',
                type: 'struct RawVec',
                components: [
                  {
                    name: 'ptr',
                    type: 'raw untyped ptr',
                    isParamType: true,
                  },
                  {
                    name: 'cap',
                    type: 'u64',
                    isParamType: true,
                  },
                ],
                typeArguments: [
                  {
                    name: '',
                    type: 'u8',
                    isParamType: true,
                  },
                ],
                isParamType: true,
              },
              {
                name: 'len',
                type: 'u64',
              },
            ],
            typeArguments: [
              {
                name: '',
                type: 'u8',
                isParamType: true,
              },
            ],
            isParamType: true,
          },
        ],
        typeParameters: null,
      },
    ];

    const input = {
      vec: [3, 9, 6, 4],
    };
    const encoded = abiCoder.encode(types, [input]);

    const enumCaseOne = [0, 0, 0, 0, 0, 0, 0, 1];
    const pointer = [0, 0, 0, 0, 0, 0, 0, 32];
    const capacity = [0, 0, 0, 0, 0, 0, 0, input.vec.length];
    const length = [0, 0, 0, 0, 0, 0, 0, input.vec.length];
    const data1 = [0, 0, 0, 0, 0, 0, 0, input.vec[0]];
    const data2 = [0, 0, 0, 0, 0, 0, 0, input.vec[1]];
    const data3 = [0, 0, 0, 0, 0, 0, 0, input.vec[2]];
    const data4 = [0, 0, 0, 0, 0, 0, 0, input.vec[3]];
    const expectedBytes = concat([
      enumCaseOne,
      pointer,
      capacity,
      length,
      data1,
      data2,
      data3,
      data4,
    ]);

    const expected = hexlify(expectedBytes);

    expect(hexlify(encoded)).toBe(expected);
  });

  it('encodes vector inside struct', () => {
    const types = [
      {
        name: 'MyStruct',
        type: 'struct MyStruct',
        components: [
          {
            name: 'num',
            type: 'u8',
          },
          {
            name: 'vec',
            type: 'struct Vec',
            components: [
              {
                name: 'buf',
                type: 'struct RawVec',
                components: [
                  {
                    name: 'ptr',
                    type: 'raw untyped ptr',
                    isParamType: true,
                  },
                  {
                    name: 'cap',
                    type: 'u64',
                    isParamType: true,
                  },
                ],
                typeArguments: [
                  {
                    name: '',
                    type: 'u8',
                    isParamType: true,
                  },
                ],
                isParamType: true,
              },
              {
                name: 'len',
                type: 'u64',
              },
            ],
            typeArguments: [
              {
                name: '',
                type: 'u8',
                isParamType: true,
              },
            ],
            isParamType: true,
          },
        ],
        typeParameters: null,
      },
    ];

    const input = {
      num: 7,
      vec: [3, 9, 6, 4],
    };
    const encoded = abiCoder.encode(types, [input]);

    const u8 = [0, 0, 0, 0, 0, 0, 0, 7];
    const pointer = [0, 0, 0, 0, 0, 0, 0, 32];
    const capacity = [0, 0, 0, 0, 0, 0, 0, input.vec.length];
    const length = [0, 0, 0, 0, 0, 0, 0, input.vec.length];
    const data1 = [0, 0, 0, 0, 0, 0, 0, input.vec[0]];
    const data2 = [0, 0, 0, 0, 0, 0, 0, input.vec[1]];
    const data3 = [0, 0, 0, 0, 0, 0, 0, input.vec[2]];
    const data4 = [0, 0, 0, 0, 0, 0, 0, input.vec[3]];
    const expectedBytes = concat([u8, pointer, capacity, length, data1, data2, data3, data4]);

    const expected = hexlify(expectedBytes);

    expect(hexlify(encoded)).toBe(expected);
  });

  it('encodes vector inside struct [with offset]', () => {
    const types = [
      {
        name: 'MyStruct',
        type: 'struct MyStruct',
        components: [
          {
            name: 'num',
            type: 'u8',
          },
          {
            name: 'vec',
            type: 'struct Vec',
            components: [
              {
                name: 'buf',
                type: 'struct RawVec',
                components: [
                  {
                    name: 'ptr',
                    type: 'raw untyped ptr',
                    isParamType: true,
                  },
                  {
                    name: 'cap',
                    type: 'u64',
                    isParamType: true,
                  },
                ],
                typeArguments: [
                  {
                    name: '',
                    type: 'u8',
                    isParamType: true,
                  },
                ],
                isParamType: true,
              },
              {
                name: 'len',
                type: 'u64',
              },
            ],
            typeArguments: [
              {
                name: '',
                type: 'u8',
                isParamType: true,
              },
            ],
            isParamType: true,
          },
        ],
        typeParameters: null,
      },
    ];

    const input = {
      num: 7,
      vec: [7, 6, 3],
    };
    const encoded = abiCoder.encode(types, [input], 16);

    const u8 = [0, 0, 0, 0, 0, 0, 0, 7];
    const pointer = [0, 0, 0, 0, 0, 0, 0, 48];
    const capacity = [0, 0, 0, 0, 0, 0, 0, input.vec.length];
    const length = [0, 0, 0, 0, 0, 0, 0, input.vec.length];
    const data1 = [0, 0, 0, 0, 0, 0, 0, input.vec[0]];
    const data2 = [0, 0, 0, 0, 0, 0, 0, input.vec[1]];
    const data3 = [0, 0, 0, 0, 0, 0, 0, input.vec[2]];
    const expectedBytes = concat([u8, pointer, capacity, length, data1, data2, data3]);

    const expected = hexlify(expectedBytes);

    expect(hexlify(encoded)).toBe(expected);
  });

  it('encodes vectors with multiple items', () => {
    const types = [
      {
        name: 'vector',
        type: 'struct Vec',
        components: [
          {
            name: 'buf',
            type: 'struct RawVec',
            components: [
              {
                name: 'ptr',
                type: 'raw untyped ptr',
                isParamType: true,
              },
              {
                name: 'cap',
                type: 'u64',
                isParamType: true,
              },
            ],
            typeArguments: [
              {
                name: '',
                type: 'u64',
                isParamType: true,
              },
            ],
            isParamType: true,
          },
          {
            name: 'len',
            type: 'u64',
          },
        ],
        typeArguments: [
          {
            name: '',
            type: 'u64',
            isParamType: true,
          },
        ],
        isParamType: true,
      },
    ];

    const input = [36, 42, 57];
    const encoded = abiCoder.encode(types, [input]);

    const pointer = [0, 0, 0, 0, 0, 0, 0, 24];
    const capacity = [0, 0, 0, 0, 0, 0, 0, input.length];
    const length = [0, 0, 0, 0, 0, 0, 0, input.length];
    const data1 = [0, 0, 0, 0, 0, 0, 0, input[0]];
    const data2 = [0, 0, 0, 0, 0, 0, 0, input[1]];
    const data3 = [0, 0, 0, 0, 0, 0, 0, input[2]];
    const vecData = concat([pointer, capacity, length, data1, data2, data3]);

    const expected = hexlify(vecData);

    expect(hexlify(encoded)).toBe(expected);
  });

  it('encodes vectors with multiple items [with offset]', () => {
    const types = [
      {
        name: 'vector',
        type: 'struct Vec',
        components: [
          {
            name: 'buf',
            type: 'struct RawVec',
            components: [
              {
                name: 'ptr',
                type: 'raw untyped ptr',
                isParamType: true,
              },
              {
                name: 'cap',
                type: 'u64',
                isParamType: true,
              },
            ],
            typeArguments: [
              {
                name: '',
                type: 'u64',
                isParamType: true,
              },
            ],
            isParamType: true,
          },
          {
            name: 'len',
            type: 'u64',
          },
        ],
        typeArguments: [
          {
            name: '',
            type: 'u64',
            isParamType: true,
          },
        ],
        isParamType: true,
      },
    ];

    const input = [36, 42, 57];
    const encoded = abiCoder.encode(types, [input], 14440);

    const pointer = [0, 0, 0, 0, 0, 0, 56, 128];
    const capacity = [0, 0, 0, 0, 0, 0, 0, input.length];
    const length = [0, 0, 0, 0, 0, 0, 0, input.length];
    const data1 = [0, 0, 0, 0, 0, 0, 0, input[0]];
    const data2 = [0, 0, 0, 0, 0, 0, 0, input[1]];
    const data3 = [0, 0, 0, 0, 0, 0, 0, input[2]];
    const vecData = concat([pointer, capacity, length, data1, data2, data3]);

    const expected = hexlify(vecData);

    expect(hexlify(encoded)).toBe(expected);
  });

  it('encodes inputs with [vector with offset]', () => {
    const types = [
      {
        name: 'vector',
        type: 'struct Vec',
        components: [
          {
            name: 'buf',
            type: 'struct RawVec',
            components: [
              {
                name: 'ptr',
                type: 'raw untyped ptr',
              },
              {
                name: 'cap',
                type: 'u64',
              },
            ],
            typeArguments: [
              {
                name: '',
                type: 'u64',
              },
            ],
          },
          {
            name: 'len',
            type: 'u64',
          },
        ],
        typeArguments: [
          {
            name: '',
            type: 'u64',
          },
        ],
      },
    ];

    const vector = [450, 202, 1340];
    const encoded = abiCoder.encode(types, [vector], 14440);

    const pointer = [0, 0, 0, 0, 0, 0, 56, 128];
    const capacity = [0, 0, 0, 0, 0, 0, 0, vector.length];
    const length = [0, 0, 0, 0, 0, 0, 0, vector.length];
    const data1 = [0, 0, 0, 0, 0, 0, Math.floor(vector[0] / 256), vector[0] % 256];
    const data2 = [0, 0, 0, 0, 0, 0, 0, vector[1]];
    const data3 = [0, 0, 0, 0, 0, 0, Math.floor(vector[2] / 256), vector[2] % 256];
    const inputAndVecData = concat([pointer, capacity, length, data1, data2, data3]);

    const expected = hexlify(inputAndVecData);

    expect(encoded).toStrictEqual(inputAndVecData);
    expect(hexlify(encoded)).toBe(expected);
  });

  it('encodes inputs with [mixed params + vector second param + with offset]', () => {
    const types = [
      {
        type: 'u32',
        name: 'arg1',
      },
      {
        name: 'vector',
        type: 'struct Vec',
        components: [
          {
            name: 'buf',
            type: 'struct RawVec',
            components: [
              {
                name: 'ptr',
                type: 'raw untyped ptr',
              },
              {
                name: 'cap',
                type: 'u64',
              },
            ],
            typeArguments: [
              {
                name: '',
                type: 'u64',
              },
            ],
          },
          {
            name: 'len',
            type: 'u64',
          },
        ],
        typeArguments: [
          {
            name: '',
            type: 'u64',
          },
        ],
      },
    ];

    const u32 = 72;
    const vector = [450, 202, 1340];
    const encoded = abiCoder.encode(types, [u32, vector], 14440);

    const encodedU32 = [0, 0, 0, 0, 0, 0, 0, u32];
    const pointer = [0, 0, 0, 0, 0, 0, 56, 136];
    const capacity = [0, 0, 0, 0, 0, 0, 0, vector.length];
    const length = [0, 0, 0, 0, 0, 0, 0, vector.length];
    const data1 = [0, 0, 0, 0, 0, 0, Math.floor(vector[0] / 256), vector[0] % 256];
    const data2 = [0, 0, 0, 0, 0, 0, 0, vector[1]];
    const data3 = [0, 0, 0, 0, 0, 0, Math.floor(vector[2] / 256), vector[2] % 256];
    const inputAndVecData = concat([encodedU32, pointer, capacity, length, data1, data2, data3]);

    const expected = hexlify(inputAndVecData);

    expect(encoded).toStrictEqual(inputAndVecData);
    expect(hexlify(encoded)).toBe(expected);
  });

  it.skip('encodes vectors [lots of types]', () => {
    const abi = ABI.unflatten({
      types: [
        {
          typeId: 0,
          type: '(_, _)',
          components: [
            {
              name: '__tuple_element',
              type: 18,
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
          typeId: 1,
          type: '(_, _)',
          components: [
            {
              name: '__tuple_element',
              type: 17,
              typeArguments: [
                {
                  name: '',
                  type: 18,
                  typeArguments: null,
                },
              ],
            },
            {
              name: '__tuple_element',
              type: 17,
              typeArguments: [
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
          typeId: 2,
          type: '[_; 2]',
          components: [
            {
              name: '__array_element',
              type: 19,
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
              type: 17,
              typeArguments: [
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
          typeId: 4,
          type: 'bool',
          components: null,
          typeParameters: null,
        },
        {
          typeId: 5,
          type: 'enum SomeEnum',
          components: [
            {
              name: 'a',
              type: 6,
              typeArguments: null,
            },
          ],
          typeParameters: [6],
        },
        {
          typeId: 6,
          type: 'generic T',
          components: null,
          typeParameters: null,
        },
        {
          typeId: 7,
          type: 'raw untyped ptr',
          components: null,
          typeParameters: null,
        },
        {
          typeId: 8,
          type: 'str[10]',
          components: null,
          typeParameters: null,
        },
        {
          typeId: 9,
          type: 'str[13]',
          components: null,
          typeParameters: null,
        },
        {
          typeId: 10,
          type: 'str[14]',
          components: null,
          typeParameters: null,
        },
        {
          typeId: 11,
          type: 'str[15]',
          components: null,
          typeParameters: null,
        },
        {
          typeId: 12,
          type: 'str[16]',
          components: null,
          typeParameters: null,
        },
        {
          typeId: 13,
          type: 'str[17]',
          components: null,
          typeParameters: null,
        },
        {
          typeId: 14,
          type: 'str[37]',
          components: null,
          typeParameters: null,
        },
        {
          typeId: 15,
          type: 'struct RawVec',
          components: [
            {
              name: 'ptr',
              type: 7,
              typeArguments: null,
            },
            {
              name: 'cap',
              type: 19,
              typeArguments: null,
            },
          ],
          typeParameters: [6],
        },
        {
          typeId: 16,
          type: 'struct SomeStruct',
          components: [
            {
              name: 'a',
              type: 6,
              typeArguments: null,
            },
          ],
          typeParameters: [6],
        },
        {
          typeId: 17,
          type: 'struct Vec',
          components: [
            {
              name: 'buf',
              type: 15,
              typeArguments: [
                {
                  name: '',
                  type: 6,
                  typeArguments: null,
                },
              ],
            },
            {
              name: 'len',
              type: 19,
              typeArguments: null,
            },
          ],
          typeParameters: [6],
        },
        {
          typeId: 18,
          type: 'u32',
          components: null,
          typeParameters: null,
        },
        {
          typeId: 19,
          type: 'u64',
          components: null,
          typeParameters: null,
        },
      ],
      functions: [
        {
          inputs: [
            {
              name: 'u32_vec',
              type: 17,
              typeArguments: [
                {
                  name: '',
                  type: 18,
                  typeArguments: null,
                },
              ],
            },
            {
              name: 'vec_in_vec',
              type: 17,
              typeArguments: [
                {
                  name: '',
                  type: 17,
                  typeArguments: [
                    {
                      name: '',
                      type: 18,
                      typeArguments: null,
                    },
                  ],
                },
              ],
            },
            {
              name: 'struct_in_vec',
              type: 17,
              typeArguments: [
                {
                  name: '',
                  type: 16,
                  typeArguments: [
                    {
                      name: '',
                      type: 18,
                      typeArguments: null,
                    },
                  ],
                },
              ],
            },
            {
              name: 'vec_in_struct',
              type: 16,
              typeArguments: [
                {
                  name: '',
                  type: 17,
                  typeArguments: [
                    {
                      name: '',
                      type: 18,
                      typeArguments: null,
                    },
                  ],
                },
              ],
            },
            {
              name: 'array_in_vec',
              type: 17,
              typeArguments: [
                {
                  name: '',
                  type: 2,
                  typeArguments: null,
                },
              ],
            },
            {
              name: 'vec_in_array',
              type: 3,
              typeArguments: null,
            },
            {
              name: 'vec_in_enum',
              type: 5,
              typeArguments: [
                {
                  name: '',
                  type: 17,
                  typeArguments: [
                    {
                      name: '',
                      type: 18,
                      typeArguments: null,
                    },
                  ],
                },
              ],
            },
            {
              name: 'enum_in_vec',
              type: 17,
              typeArguments: [
                {
                  name: '',
                  type: 5,
                  typeArguments: [
                    {
                      name: '',
                      type: 18,
                      typeArguments: null,
                    },
                  ],
                },
              ],
            },
            {
              name: 'tuple_in_vec',
              type: 17,
              typeArguments: [
                {
                  name: '',
                  type: 0,
                  typeArguments: null,
                },
              ],
            },
            {
              name: 'vec_in_tuple',
              type: 1,
              typeArguments: null,
            },
            {
              name: 'vec_in_a_vec_in_a_struct_in_a_vec',
              type: 17,
              typeArguments: [
                {
                  name: '',
                  type: 16,
                  typeArguments: [
                    {
                      name: '',
                      type: 17,
                      typeArguments: [
                        {
                          name: '',
                          type: 17,
                          typeArguments: [
                            {
                              name: '',
                              type: 18,
                              typeArguments: null,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          name: 'test_all',
          output: {
            name: '',
            type: 4,
            typeArguments: null,
          },
          attributes: null,
        },
      ],
      loggedTypes: [],
      messagesTypes: [],
      configurables: [],
    } as JsonFlatAbi);

    const U32_VEC = [0, 1, 2];
    const VEC_IN_VEC = [
      [0, 1, 2],
      [0, 1, 2],
    ];
    const STRUCT_IN_VEC = [{ a: 0 }, { a: 1 }];
    const VEC_IN_STRUCT = { a: [0, 1, 2] };
    const ARRAY_IN_VEC = [
      [0, 1],
      [0, 1],
    ];
    const VEC_IN_ARRAY = [
      [0, 1, 2],
      [0, 1, 2],
    ];
    const VEC_IN_ENUM = { a: [0, 1, 2] };
    const ENUM_IN_VEC = [{ a: 0 }, { a: 1 }];

    const TUPLE_IN_VEC = [
      [0, 0],
      [1, 1],
    ];
    const VEC_IN_TUPLE = [
      [0, 1, 2],
      [0, 1, 2],
    ];
    const VEC_IN_A_VEC_IN_A_STRUCT_IN_A_VEC = [
      {
        a: [
          [0, 1, 2],
          [3, 4, 5],
        ],
      },
      {
        a: [
          [6, 7, 8],
          [9, 10, 11],
        ],
      },
    ];

    const encoded = abiCoder.encode(
      abi[0].inputs as JsonAbiFragmentType[],
      [
        U32_VEC,
        VEC_IN_VEC,
        STRUCT_IN_VEC,
        VEC_IN_STRUCT,
        ARRAY_IN_VEC,
        VEC_IN_ARRAY,
        VEC_IN_ENUM,
        ENUM_IN_VEC,
        TUPLE_IN_VEC,
        VEC_IN_TUPLE,
        VEC_IN_A_VEC_IN_A_STRUCT_IN_A_VEC,
      ],
      0
    );

    const expectedBytes = concat([
      [0, 0, 0, 0, 0, 0, 0, 24], // U32_VEC: pointer
      [0, 0, 0, 0, 0, 0, 0, U32_VEC.length], // U32_VEC: cap
      [0, 0, 0, 0, 0, 0, 0, U32_VEC.length], // U32_VEC: length
      [0, 0, 0, 0, 0, 0, 0, U32_VEC[0]], // U32_VEC: data
      [0, 0, 0, 0, 0, 0, 0, U32_VEC[1]], // U32_VEC: data
      [0, 0, 0, 0, 0, 0, 0, U32_VEC[2]], // U32_VEC: data
    ]);

    const expected = hexlify(expectedBytes);

    expect(hexlify(encoded)).toBe(expected);
  });
});
