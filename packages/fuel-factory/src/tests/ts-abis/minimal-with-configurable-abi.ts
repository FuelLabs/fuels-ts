export const minimalWithConfigurableAbi = {
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
        type: 'str[10]',
        components: null,
        typeParameters: null,
      },
    ],
    functions: [
      {
        inputs: [
          {
            name: 'x',
            type: 1,
            typeArguments: null,
          },
          {
            name: 'y',
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
    configurables: [
      {
        name: 'SHOULD_RETURN',
        configurableType: {
          name: '',
          type: 0,
          typeArguments: null,
        },
        offset: 68,
      },
    ],
  },
} as const;
