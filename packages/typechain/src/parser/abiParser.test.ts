import { expect } from 'chai';
import { parse } from './abiParser';

const ABI = [
  {
    inputs: [
      { name: 'gas', type: 'u64' },
      { name: 'coins', type: 'u64' },
      { name: 'color', type: 'b256' },
      {
        name: 'args',
        type: 'tuple',
        components: [
          { name: 'reciever', type: 'b256' },
          { name: 'amount', type: 'u64' },
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
      { name: 'color', type: 'b256' },
      {
        name: 'args',
        type: 'tuple',
        components: [
          { name: 'sender', type: 'b256' },
          { name: 'reciever', type: 'b256' },
          { name: 'amount', type: 'u64' },
        ],
      },
    ],
    name: 'send',
    outputs: [],
    type: 'function',
  },
];

describe('ABI parser', () => {
  it('parses a raw ABI', () => {
    expect(parse(ABI, 'coin')).to.eql({
      name: 'Coin',
      rawName: 'coin',
      functions: {
        mint: [
          {
            name: 'mint',
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
                name: 'color',
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
                      name: 'reciever',
                      type: {
                        type: 'b256',
                        originalType: 'b256',
                      },
                    },
                    {
                      name: 'amount',
                      type: {
                        type: 'u64',
                        bits: 64,
                        originalType: 'u64',
                      },
                    },
                  ],
                  originalType: 'tuple',
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
                name: 'color',
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
                      name: 'sender',
                      type: {
                        type: 'b256',
                        originalType: 'b256',
                      },
                    },
                    {
                      name: 'reciever',
                      type: {
                        type: 'b256',
                        originalType: 'b256',
                      },
                    },
                    {
                      name: 'amount',
                      type: {
                        type: 'u64',
                        bits: 64,
                        originalType: 'u64',
                      },
                    },
                  ],
                  originalType: 'tuple',
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
      },
    });
  });
});
