import { hexlify, concat } from '@ethersproject/bytes';

import AbiCoder from './abi-coder';

describe('AbiCoder', () => {
  const abiCoder = new AbiCoder();

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

  it('encodes inputs with [mixed params + vector second param + with offset]', () => {
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
});
