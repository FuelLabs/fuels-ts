export const predicateAbi = {
  abi: {
    types: [
      {
        typeId: 0,
        type: 'bool',
        components: null,
        typeParameters: null,
      },
      {
        typeId: 1,
        type: 'struct Validation',
        components: [
          {
            name: 'has_account',
            type: 0,
            typeArguments: null,
          },
          {
            name: 'total_complete',
            type: 2,
            typeArguments: null,
          },
        ],
        typeParameters: null,
      },
      {
        typeId: 2,
        type: 'u64',
        components: null,
        typeParameters: null,
      },
    ],
    functions: [
      {
        inputs: [
          {
            name: 'received',
            type: 1,
            typeArguments: null,
          },
        ],
        name: 'main',
        output: {
          name: '',
          type: 0,
          typeArguments: null,
        },
        attributes: null,
      },
    ],
    loggedTypes: [],
    messagesTypes: [],
    configurables: [],
  },
  bin: '0x9000000447000000000000000000006c5dfcc00110fff30071480003614521017344000b614d210d9000001272400002134114005a41000173400011614d211f9000001224000000910000105d41300013410040734000179000001a5d4530015d43f00013411400244000000000000000000064',
} as const;
