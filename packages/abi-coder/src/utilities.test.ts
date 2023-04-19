import AbiCoder from './abi-coder';
import VecCoder from './coders/vec';
import { WORD_SIZE } from './constants';
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
    expect(CODERS[0].offset).toStrictEqual(VecCoder.getBaseOffset());
  });

  it('can getVectorAdjustments [inputs=[Vector<u8>], offset = 32]', () => {
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
    const OFFSET = 32;
    const EXPECTED: Uint8Array[] = [
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 34]),
    ];

    const RESULT = getVectorAdjustments(CODERS, VALUES, OFFSET);
    expect(RESULT).toStrictEqual(EXPECTED);
    expect(CODERS[0].offset).toStrictEqual(VecCoder.getBaseOffset() + OFFSET);
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
    // one base vec offset per each vector input
    expect(CODERS[0].offset).toStrictEqual(VecCoder.getBaseOffset() + VecCoder.getBaseOffset());
    // one base vec offset per each vector input + the first vector's data
    expect(CODERS[1].offset).toStrictEqual(
      VecCoder.getBaseOffset() + VecCoder.getBaseOffset() + VALUES[0].length * WORD_SIZE
    );
  });

  it('can getVectorAdjustments [inputs=[Vector<u8>,Vector<u64>], offset = 32]', () => {
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
    const OFFSET = 32;
    const EXPECTED: Uint8Array[] = [
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 34]),
      new Uint8Array([0, 0, 0, 0, 0, 0, 3, 99, 0, 0, 0, 0, 0, 0, 20, 189, 0, 0, 0, 0, 0, 0, 5, 57]),
    ];

    const RESULT = getVectorAdjustments(CODERS, VALUES, OFFSET);
    expect(RESULT).toStrictEqual(EXPECTED);
    // one base vec offset per each vector input + plus custom OFFSET
    expect(CODERS[0].offset).toStrictEqual(
      VecCoder.getBaseOffset() + VecCoder.getBaseOffset() + OFFSET
    );
    // one base vec offset per each vector input + the first vector's data + plus custom OFFSET
    expect(CODERS[1].offset).toStrictEqual(
      VecCoder.getBaseOffset() + VecCoder.getBaseOffset() + VALUES[0].length * WORD_SIZE + OFFSET
    );
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
    const OFFSET = 8;
    const EXPECTED: Uint8Array[] = [
      new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0,
        7,
      ]),
    ];

    const RESULT = getVectorAdjustments(CODERS, VALUES, OFFSET);
    expect(RESULT).toStrictEqual(EXPECTED);
    // one base vec offset + plus b256 data + plus custom OFFSET
    expect(CODERS[0].offset).toStrictEqual(VecCoder.getBaseOffset() + 4 * WORD_SIZE + OFFSET);
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
    const OFFSET = 14440;
    const EXPECTED: Uint8Array[] = [
      new Uint8Array([0, 0, 0, 0, 0, 0, 1, 194, 0, 0, 0, 0, 0, 0, 0, 202, 0, 0, 0, 0, 0, 0, 1, 84]),
    ];

    const RESULT = getVectorAdjustments(CODERS, VALUES, OFFSET);
    expect(RESULT).toStrictEqual(EXPECTED);
    // one base vec offset + plus u32 data + plus custom OFFSET
    expect(CODERS[1].offset).toStrictEqual(VecCoder.getBaseOffset() + WORD_SIZE + OFFSET);
  });

  it('can getVectorAdjustments [inputs=[b256,Vector<u64>,Vector<u64>,Vector<u64>], offset = 24]', () => {
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
    const VALUES = [33, [450, 202, 340], [12, 13, 14], [11, 9]];
    const OFFSET = 24;
    const EXPECTED: Uint8Array[] = [
      new Uint8Array([0, 0, 0, 0, 0, 0, 1, 194, 0, 0, 0, 0, 0, 0, 0, 202, 0, 0, 0, 0, 0, 0, 1, 84]),
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 14]),
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 9]),
    ];

    const OFFSET_PLUS_DATA_PLUS_3_OFFSETS = VecCoder.getBaseOffset() * 3 + WORD_SIZE + OFFSET;

    const RESULT = getVectorAdjustments(CODERS, VALUES, OFFSET);
    expect(RESULT).toStrictEqual(EXPECTED);
    // three base vec offset + plus u32 data + plus custom OFFSET
    expect(CODERS[1].offset).toStrictEqual(OFFSET_PLUS_DATA_PLUS_3_OFFSETS);
    // three base vec offset + plus u32 data + the first vector's data + plus custom OFFSET
    expect(CODERS[2].offset).toStrictEqual(OFFSET_PLUS_DATA_PLUS_3_OFFSETS + 3 * WORD_SIZE);
    // three base vec offset + plus u32 data + the first vector's data + the second vector's data + plus custom OFFSET
    expect(CODERS[3].offset).toStrictEqual(
      OFFSET_PLUS_DATA_PLUS_3_OFFSETS + 3 * WORD_SIZE + 3 * WORD_SIZE
    );
  });
});
