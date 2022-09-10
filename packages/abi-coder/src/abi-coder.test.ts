import { hexlify, concat } from '@ethersproject/bytes';
import { bn, toHex } from '@fuel-ts/math';

import AbiCoder from './abi-coder';
import type { DecodedValue } from './coders/abstract-coder';

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

  it('encodes vectors', () => {
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
                type: 'u64',
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
    const vecData = concat([pointer, capacity, length, data]);

    const expected = hexlify(vecData);

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
                type: 'u64',
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
                type: 'u64',
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
});
