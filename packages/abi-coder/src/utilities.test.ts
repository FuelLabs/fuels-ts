import AbiCoder from './abi-coder';
import { ParamType } from './fragments/param-type';
import type { JsonAbiFragmentType } from './json-abi';
import { filterEmptyParams, hasOptionTypes, getVectorAdjustments } from './utilities';

describe('Abi Coder Utilities', () => {
  it('can filterEmptyParams', () => {
    const INPUT: ParamType[] = [
      new ParamType({
        type: '()',
      }),
      new ParamType({
        type: 'enum Option',
      }),
      new ParamType({
        type: '()',
      }),
    ];
    const EXPECTED = [
      new ParamType({
        type: 'enum Option',
      }),
    ];

    const RESULT = filterEmptyParams(INPUT);
    expect(RESULT).toStrictEqual(EXPECTED);
  });

  it('can determine if types array hasOptionTypes [true]', () => {
    const INPUT: ParamType[] = [
      new ParamType({
        type: 'enum Option',
      }),
    ];

    const RESULT = hasOptionTypes(INPUT);
    expect(RESULT).toStrictEqual(true);
  });

  it('can determine if types array hasOptionTypes [false]', () => {
    const INPUT: ParamType[] = [
      new ParamType({
        type: 'struct Vec',
      }),
    ];

    const RESULT = hasOptionTypes(INPUT);
    expect(RESULT).toStrictEqual(false);
  });

  it('can getVectorAdjustments [no Vectors, offset = 0]', () => {
    const abiCoder = new AbiCoder();
    const NON_EMPTY_TYPES: ReadonlyArray<JsonAbiFragmentType> = [
      {
        type: 'b256',
        name: 'arg0',
      },
      {
        type: 'b256',
        name: 'arg1',
      },
    ];
    const CODERS = NON_EMPTY_TYPES.map((type) => abiCoder.getCoder(type));
    const VALUES = [43];
    const EXPECTED: Uint8Array[] = [];

    const RESULT = getVectorAdjustments(CODERS, VALUES, 0);
    expect(RESULT).toStrictEqual(EXPECTED);
  });

  it('can getVectorAdjustments [no Vectors, offset = 8]', () => {
    const abiCoder = new AbiCoder();
    const NON_EMPTY_TYPES: ReadonlyArray<JsonAbiFragmentType> = [
      {
        type: 'b256',
        name: 'arg0',
      },
      {
        type: 'b256',
        name: 'arg1',
      },
    ];
    const CODERS = NON_EMPTY_TYPES.map((type) => abiCoder.getCoder(type));
    const VALUES = [43];
    const EXPECTED: Uint8Array[] = [];

    const RESULT = getVectorAdjustments(CODERS, VALUES, 8);
    expect(RESULT).toStrictEqual(EXPECTED);
  });

  it('can getVectorAdjustments [inputs=[Vector], offset = 0]', () => {
    const abiCoder = new AbiCoder();
    const NON_EMPTY_TYPES: ReadonlyArray<JsonAbiFragmentType> = [
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
    ];
    const CODERS = NON_EMPTY_TYPES.map((type) => abiCoder.getCoder(type));
    const VALUES = [[1, 2, 34]];
    const EXPECTED: Uint8Array[] = [
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 34]),
    ];

    const RESULT = getVectorAdjustments(CODERS, VALUES, 0);
    expect(RESULT).toStrictEqual(EXPECTED);
  });

  it('can getVectorAdjustments [inputs=[Vector<u8>], offset = 36]', () => {
    const abiCoder = new AbiCoder();
    const NON_EMPTY_TYPES: ReadonlyArray<JsonAbiFragmentType> = [
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
    ];
    const CODERS = NON_EMPTY_TYPES.map((type) => abiCoder.getCoder(type));
    const VALUES = [[1, 2, 34]];
    const EXPECTED: Uint8Array[] = [
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 34]),
    ];

    const RESULT = getVectorAdjustments(CODERS, VALUES, 36);
    expect(RESULT).toStrictEqual(EXPECTED);
  });

  it('can getVectorAdjustments [inputs=[Vector<u8>, Vector<u8>], offset = 0]', () => {
    const abiCoder = new AbiCoder();
    const NON_EMPTY_TYPES: ReadonlyArray<JsonAbiFragmentType> = [
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
    ];
    const CODERS = NON_EMPTY_TYPES.map((type) => abiCoder.getCoder(type));
    const VALUES = [
      [1, 2, 34],
      [71, 72, 99],
    ];
    const EXPECTED: Uint8Array[] = [
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 34]),
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 71, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 99]),
    ];

    const RESULT = getVectorAdjustments(CODERS, VALUES, 0);
    expect(RESULT).toStrictEqual(EXPECTED);
  });

  it('can getVectorAdjustments [inputs=[Vector<u8>,Vector<u64>], offset = 0]', () => {
    const abiCoder = new AbiCoder();
    const NON_EMPTY_TYPES: ReadonlyArray<JsonAbiFragmentType> = [
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
    const CODERS = NON_EMPTY_TYPES.map((type) => abiCoder.getCoder(type));
    const VALUES = [
      [7, 2, 34],
      [867, 5309, 1337],
    ];
    const EXPECTED: Uint8Array[] = [
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 34]),
      new Uint8Array([0, 0, 0, 0, 0, 0, 3, 99, 0, 0, 0, 0, 0, 0, 20, 189, 0, 0, 0, 0, 0, 0, 5, 57]),
    ];

    const RESULT = getVectorAdjustments(CODERS, VALUES, 36);
    expect(RESULT).toStrictEqual(EXPECTED);
  });

  it('can getVectorAdjustments [inputs=[Vector<u8>,b256], offset = 8]', () => {
    const abiCoder = new AbiCoder();
    const NON_EMPTY_TYPES: ReadonlyArray<JsonAbiFragmentType> = [
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
      {
        type: 'b256',
        name: 'arg1',
      },
    ];
    const CODERS = NON_EMPTY_TYPES.map((type) => abiCoder.getCoder(type));
    const VALUES = [[1, 3, 3, 7], 43];
    const EXPECTED: Uint8Array[] = [
      new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0,
        7,
      ]),
    ];

    const RESULT = getVectorAdjustments(CODERS, VALUES, 8);
    expect(RESULT).toStrictEqual(EXPECTED);
  });

  it('can getVectorAdjustments [inputs=[b256,Vector<u64>], offset = 14440]', () => {
    const abiCoder = new AbiCoder();
    const NON_EMPTY_TYPES: ReadonlyArray<JsonAbiFragmentType> = [
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
    const CODERS = NON_EMPTY_TYPES.map((type) => abiCoder.getCoder(type));
    const VALUES = [33, [450, 202, 340]];
    const EXPECTED: Uint8Array[] = [
      new Uint8Array([0, 0, 0, 0, 0, 0, 1, 194, 0, 0, 0, 0, 0, 0, 0, 202, 0, 0, 0, 0, 0, 0, 1, 84]),
    ];

    const RESULT = getVectorAdjustments(CODERS, VALUES, 14440);
    expect(RESULT).toStrictEqual(EXPECTED);
  });
});
