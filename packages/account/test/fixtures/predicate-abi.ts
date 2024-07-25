import type { JsonAbi } from '@fuel-ts/abi-coder';

export const predicateAbi: JsonAbi = {
  specVersion: '1',
  programType: 'predicate',
  encodingVersion: '1',
  concreteTypes: [{ type: 'bool', concreteTypeId: 'randomhash' }],
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
