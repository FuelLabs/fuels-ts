import type { JsonAbi } from '@fuel-ts/abi-coder';

export const jsonAbiMock: JsonAbi = {
  specVersion: '1',
  programType: 'script',
  encodingVersion: '1',
  concreteTypes: [{ type: '()', concreteTypeId: 'randomhash' }],
  configurables: [],
  loggedTypes: [],
  messagesTypes: [],
  metadataTypes: [],
  functions: [
    {
      name: 'main',
      inputs: [],
      output: 'randomhash',
      attributes: [],
    },
  ],
};
