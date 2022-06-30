import { parse } from './abiParser';

const ABI = [
  {
    inputs: [
      { name: 'gas', type: 'u64' },
      { name: 'coins', type: 'u64' },
      { name: 'asset_id', type: 'b256' },
      {
        name: 'args',
        type: '(b256,u64)',
        components: [
          { name: '__tuple_element', type: 'b256' },
          { name: '__tuple_element', type: 'u64' },
        ],
      },
    ],
    name: 'mint',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [
      { name: 'gas', type: 'u64' },
      { name: 'coins', type: 'u64' },
      { name: 'asset_id', type: 'b256' },
      {
        name: 'args',
        type: '(b256,b256,u64)',
        components: [
          { name: '__tuple_element', type: 'b256' },
          { name: '__tuple_element', type: 'b256' },
          { name: '__tuple_element', type: 'u64' },
        ],
      },
    ],
    name: 'send',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [
      { name: 'gas', type: 'u64' },
      { name: 'coins', type: 'u64' },
      { name: 'asset_id', type: 'b256' },
      { name: 'params', type: '()' },
    ],
    name: 'cancel',
    outputs: [],
    type: 'function',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'address_id',
        type: 'struct Address',
        components: [
          {
            name: 'value',
            type: 'b256',
          },
        ],
      },
      {
        name: 'asset_id',
        type: 'struct ContractId',
        components: [
          {
            name: 'value',
            type: 'b256',
          },
        ],
      },
    ],
    name: 'structure_method_return_structure',
    outputs: [
      {
        name: '',
        type: 'struct ContractId',
        components: [
          {
            name: 'value',
            type: 'b256',
          },
        ],
      },
    ],
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'params',
        type: 'enum Params',
        components: [
          {
            name: 'x',
            type: 'u32',
          },
          {
            name: 'y',
            type: 'u32',
          },
        ],
      },
      {
        name: 'asset_id',
        type: 'struct ContractId',
        components: [
          {
            name: 'value',
            type: 'b256',
          },
        ],
      },
    ],
    name: 'enum_method_return_enum',
    outputs: [
      {
        name: '',
        type: 'enum Params',
        components: [
          {
            name: 'x',
            type: 'u32',
          },
          {
            name: 'y',
            type: 'u32',
          },
        ],
      },
    ],
  },
];

describe('ABI parser', () => {
  it('parses a raw ABI', () => {
    expect(parse(ABI, 'coin')).toEqual({
      name: 'Coin',
      rawName: 'coin',
      functions: {
        mint: [
          {
            documentation: undefined,
            name: 'mint',
            inputs: [
              {
                name: 'gas',
                type: {
                  type: 'u64',
                  bits: 64,
                  originalType: 'u64',
                },
              },
              {
                name: 'coins',
                type: {
                  type: 'u64',
                  bits: 64,
                  originalType: 'u64',
                },
              },
              {
                name: 'asset_id',
                type: {
                  type: 'b256',
                  originalType: 'b256',
                },
              },
              {
                name: 'args',
                type: {
                  type: 'tuple',
                  components: [
                    {
                      name: '__tuple_element',
                      type: {
                        type: 'b256',
                        originalType: 'b256',
                      },
                    },
                    {
                      name: '__tuple_element',
                      type: {
                        type: 'u64',
                        bits: 64,
                        originalType: 'u64',
                      },
                    },
                  ],
                  originalType: '(b256,u64)',
                  structName: 'Args',
                },
              },
            ],
            outputs: [
              {
                name: '',
                type: {
                  type: 'void',
                },
              },
            ],
          },
        ],
        send: [
          {
            name: 'send',
            documentation: undefined,
            inputs: [
              {
                name: 'gas',
                type: {
                  type: 'u64',
                  bits: 64,
                  originalType: 'u64',
                },
              },
              {
                name: 'coins',
                type: {
                  type: 'u64',
                  bits: 64,
                  originalType: 'u64',
                },
              },
              {
                name: 'asset_id',
                type: {
                  type: 'b256',
                  originalType: 'b256',
                },
              },
              {
                name: 'args',
                type: {
                  type: 'tuple',
                  components: [
                    {
                      name: '__tuple_element',
                      type: {
                        type: 'b256',
                        originalType: 'b256',
                      },
                    },
                    {
                      name: '__tuple_element',
                      type: {
                        type: 'b256',
                        originalType: 'b256',
                      },
                    },
                    {
                      name: '__tuple_element',
                      type: {
                        type: 'u64',
                        bits: 64,
                        originalType: 'u64',
                      },
                    },
                  ],
                  originalType: '(b256,b256,u64)',
                  structName: 'Args',
                },
              },
            ],
            outputs: [
              {
                name: '',
                type: {
                  type: 'void',
                },
              },
            ],
          },
        ],
        cancel: [
          {
            name: 'cancel',
            documentation: undefined,
            inputs: [
              {
                name: 'gas',
                type: {
                  type: 'u64',
                  bits: 64,
                  originalType: 'u64',
                },
              },
              {
                name: 'coins',
                type: {
                  type: 'u64',
                  bits: 64,
                  originalType: 'u64',
                },
              },
              {
                name: 'asset_id',
                type: {
                  type: 'b256',
                  originalType: 'b256',
                },
              },
            ],
            outputs: [
              {
                name: '',
                type: {
                  type: 'void',
                },
              },
            ],
          },
        ],
        structure_method_return_structure: [
          {
            name: 'structure_method_return_structure',
            inputs: [
              {
                name: 'address_id',
                type: {
                  type: 'struct',
                  components: [
                    {
                      name: 'value',
                      type: {
                        type: 'b256',
                        originalType: 'b256',
                      },
                    },
                  ],
                  originalType: 'struct Address',
                  structName: 'Address',
                },
              },
              {
                name: 'asset_id',
                type: {
                  type: 'struct',
                  components: [
                    {
                      name: 'value',
                      type: {
                        type: 'b256',
                        originalType: 'b256',
                      },
                    },
                  ],
                  originalType: 'struct ContractId',
                  structName: 'ContractId',
                },
              },
            ],
            outputs: [
              {
                name: '',
                type: {
                  type: 'struct',
                  components: [
                    {
                      name: 'value',
                      type: {
                        type: 'b256',
                        originalType: 'b256',
                      },
                    },
                  ],
                  originalType: 'struct ContractId',
                  structName: 'ContractId',
                },
              },
            ],
          },
        ],
        enum_method_return_enum: [
          {
            name: 'enum_method_return_enum',
            inputs: [
              {
                documentation: undefined,
                name: 'params',
                type: {
                  type: 'enum',
                  components: [
                    {
                      name: 'x',
                      type: {
                        type: 'u32',
                        bits: 32,
                        originalType: 'u32',
                      },
                    },
                    {
                      name: 'y',
                      type: {
                        type: 'u32',
                        bits: 32,
                        originalType: 'u32',
                      },
                    },
                  ],
                  originalType: 'enum Params',
                  structName: 'Params',
                },
              },
              {
                name: 'asset_id',
                type: {
                  type: 'struct',
                  components: [
                    {
                      name: 'value',
                      type: {
                        type: 'b256',
                        originalType: 'b256',
                      },
                    },
                  ],
                  originalType: 'struct ContractId',
                  structName: 'ContractId',
                },
              },
            ],
            outputs: [
              {
                name: '',
                type: {
                  type: 'enum',
                  components: [
                    {
                      name: 'x',
                      type: {
                        type: 'u32',
                        bits: 32,
                        originalType: 'u32',
                      },
                    },
                    {
                      name: 'y',
                      type: {
                        type: 'u32',
                        bits: 32,
                        originalType: 'u32',
                      },
                    },
                  ],
                  originalType: 'enum Params',
                  structName: 'Params',
                },
              },
            ],
          },
        ],
      },
      tuples: {
        Args: [
          {
            type: 'tuple',
            components: [
              {
                name: '__tuple_element',
                type: {
                  type: 'b256',
                  originalType: 'b256',
                },
              },
              {
                name: '__tuple_element',
                type: {
                  type: 'u64',
                  bits: 64,
                  originalType: 'u64',
                },
              },
            ],
            originalType: '(b256,u64)',
            structName: 'Args',
          },
        ],
      },
      enums: {
        Params: [
          {
            type: 'enum',
            components: [
              {
                name: 'x',
                type: {
                  type: 'u32',
                  bits: 32,
                  originalType: 'u32',
                },
              },
              {
                name: 'y',
                type: {
                  type: 'u32',
                  bits: 32,
                  originalType: 'u32',
                },
              },
            ],
            originalType: 'enum Params',
            structName: 'Params',
          },
        ],
      },
      structs: {
        Address: [
          {
            type: 'struct',
            components: [
              {
                name: 'value',
                type: {
                  type: 'b256',
                  originalType: 'b256',
                },
              },
            ],
            originalType: 'struct Address',
            structName: 'Address',
          },
        ],
        ContractId: [
          {
            type: 'struct',
            components: [
              {
                name: 'value',
                type: {
                  type: 'b256',
                  originalType: 'b256',
                },
              },
            ],
            originalType: 'struct ContractId',
            structName: 'ContractId',
          },
        ],
      },
    });
  });
});
