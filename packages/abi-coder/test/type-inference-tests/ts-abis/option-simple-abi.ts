export const optionSimpleAbi = {
  abi: {
    types: [
      {
        typeId: 0,
        type: '()',
        components: [],
        typeParameters: null,
      },
      {
        typeId: 1,
        type: 'enum Option',
        components: [
          {
            name: 'None',
            type: 0,
            typeArguments: null,
          },
          {
            name: 'Some',
            type: 2,
            typeArguments: null,
          },
        ],
        typeParameters: [2],
      },
      {
        typeId: 2,
        type: 'generic T',
        components: null,
        typeParameters: null,
      },
      {
        typeId: 3,
        type: 'u8',
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
            typeArguments: [
              {
                name: '',
                type: 3,
                typeArguments: null,
              },
            ],
          },
        ],
        name: 'main',
        output: {
          name: '',
          type: 1,
          typeArguments: [
            {
              name: '',
              type: 3,
              typeArguments: null,
            },
          ],
        },
        attributes: null,
      },
    ],
    loggedTypes: [],
    messagesTypes: [],
    configurables: [],
  },
} as const;
