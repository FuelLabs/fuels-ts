import type { JsonAbi } from '@fuel-ts/abi-coder';

export const jsonAbiMock: JsonAbi = {
  programType: 'script',
  specVersion: '1',
  encodingVersion: '1',
  concreteTypes: [
    {
      type: 'bool',
      concreteTypeId: 'b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
    },
    {
      type: 'u8',
      concreteTypeId: 'a760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
    },
  ],
  metadataTypes: [],
  functions: [
    {
      inputs: [
        {
          name: 'inputed_fee',
          concreteTypeId: 'a760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
        },
      ],
      name: 'main',
      output: 'b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
      attributes: null,
    },
  ],
  loggedTypes: [],
  messagesTypes: [],
  configurables: [],
};
