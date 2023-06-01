export const complexAbi = {
  types: [
    {
      typeId: 0,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 1,
      type: 'generic T',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 2,
      type: 'generic U',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 3,
      type: 'generic V',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 4,
      type: 'raw untyped ptr',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 5,
      type: 'str[1]',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 6,
      type: 'struct RawVec',
      components: [
        {
          name: 'ptr',
          type: 4,
          typeArguments: null,
        },
        {
          name: 'cap',
          type: 17,
          typeArguments: null,
        },
      ],
      typeParameters: [1],
    },
    {
      typeId: 7,
      type: 'struct StructA',
      components: [
        {
          name: 'propA1',
          type: 18,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 8,
      type: 'struct StructB',
      components: [
        {
          name: 'propB1',
          type: 7,
          typeArguments: null,
        },
        {
          name: 'propB2',
          type: 15,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 9,
      type: 'struct StructC',
      components: [
        {
          name: 'propC1',
          type: 7,
          typeArguments: null,
        },
        {
          name: 'propC2',
          type: 14,
          typeArguments: [
            {
              name: '',
              type: 8,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'propC3',
          type: 10,
          typeArguments: [
            {
              name: '',
              type: 18,
              typeArguments: null,
            },
            {
              name: '',
              type: 18,
              typeArguments: null,
            },
            {
              name: '',
              type: 12,
              typeArguments: [
                {
                  name: '',
                  type: 5,
                  typeArguments: null,
                },
              ],
            },
          ],
        },
        {
          name: 'propC4',
          type: 14,
          typeArguments: [
            {
              name: '',
              type: 10,
              typeArguments: [
                {
                  name: '',
                  type: 15,
                  typeArguments: null,
                },
                {
                  name: '',
                  type: 15,
                  typeArguments: null,
                },
                {
                  name: '',
                  type: 12,
                  typeArguments: [
                    {
                      name: '',
                      type: 0,
                      typeArguments: null,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'propC5',
          type: 14,
          typeArguments: [
            {
              name: '',
              type: 10,
              typeArguments: [
                {
                  name: '',
                  type: 16,
                  typeArguments: null,
                },
                {
                  name: '',
                  type: 16,
                  typeArguments: null,
                },
                {
                  name: '',
                  type: 12,
                  typeArguments: [
                    {
                      name: '',
                      type: 14,
                      typeArguments: [
                        {
                          name: '',
                          type: 13,
                          typeArguments: null,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 10,
      type: 'struct StructD',
      components: [
        {
          name: 'propD1',
          type: 14,
          typeArguments: [
            {
              name: '',
              type: 11,
              typeArguments: [
                {
                  name: '',
                  type: 1,
                  typeArguments: null,
                },
              ],
            },
          ],
        },
        {
          name: 'propD2',
          type: 2,
          typeArguments: null,
        },
        {
          name: 'propD3',
          type: 3,
          typeArguments: null,
        },
      ],
      typeParameters: [1, 2, 3],
    },
    {
      typeId: 11,
      type: 'struct StructE',
      components: [
        {
          name: 'propE1',
          type: 7,
          typeArguments: null,
        },
        {
          name: 'propE2',
          type: 8,
          typeArguments: null,
        },
        {
          name: 'propE3',
          type: 1,
          typeArguments: null,
        },
      ],
      typeParameters: [1],
    },
    {
      typeId: 12,
      type: 'struct StructF',
      components: [
        {
          name: 'propF1',
          type: 17,
          typeArguments: null,
        },
        {
          name: 'propF2',
          type: 1,
          typeArguments: null,
        },
      ],
      typeParameters: [1],
    },
    {
      typeId: 13,
      type: 'struct StructG',
      components: [
        {
          name: 'propG1',
          type: 18,
          typeArguments: null,
        },
      ],
      typeParameters: null,
    },
    {
      typeId: 14,
      type: 'struct Vec',
      components: [
        {
          name: 'buf',
          type: 6,
          typeArguments: [
            {
              name: '',
              type: 1,
              typeArguments: null,
            },
          ],
        },
        {
          name: 'len',
          type: 17,
          typeArguments: null,
        },
      ],
      typeParameters: [1],
    },
    {
      typeId: 15,
      type: 'u16',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 16,
      type: 'u32',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 17,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
    {
      typeId: 18,
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
          type: 10,
          typeArguments: [
            {
              name: '',
              type: 16,
              typeArguments: null,
            },
            {
              name: '',
              type: 16,
              typeArguments: null,
            },
            {
              name: '',
              type: 12,
              typeArguments: [
                {
                  name: '',
                  type: 14,
                  typeArguments: [
                    {
                      name: '',
                      type: 13,
                      typeArguments: null,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      name: 'multi_params',
      output: {
        name: '',
        type: 0,
        typeArguments: null,
      },
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'x',
          type: 7,
          typeArguments: null,
        },
        {
          name: 'y',
          type: 8,
          typeArguments: null,
        },
        {
          name: 'z',
          type: 9,
          typeArguments: null,
        },
      ],
      name: 'single_params',
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
} as const;
