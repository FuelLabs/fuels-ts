export const evmAddressAbi = {
  abi: {
    types: [
      {
        typeId: 0,
        type: 'b256',
        components: null,
        typeParameters: null,
      },
      {
        typeId: 1,
        type: 'struct EvmAddress',
        components: [
          {
            name: 'value',
            type: 0,
            typeArguments: null,
          },
        ],
        typeParameters: null,
      },
    ],
    functions: [
      {
        inputs: [
          {
            name: 'raw_address',
            type: 0,
            typeArguments: null,
          },
        ],
        name: 'main',
        output: {
          name: '',
          type: 1,
          typeArguments: null,
        },
        attributes: null,
      },
    ],
    loggedTypes: [],
    messagesTypes: [],
    configurables: [],
  },
} as const;
