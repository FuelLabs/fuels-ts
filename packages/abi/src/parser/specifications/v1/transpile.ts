import type { Abi, AbiConfigurable, AbiFunction, AbiLoggedType, AbiMessageType } from '../../abi';

import type { AbiSpecificationV1 } from './specification';

export const transpileV1 = (abi: AbiSpecificationV1): Abi => {
  const {
    specVersion,
    encodingVersion,
    programType,

    functions,
    loggedTypes,
    messagesTypes,
    configurables,
  } = abi;

  return {
    specVersion,
    encodingVersion,
    programType,

    functions: [],
    loggedTypes: [],
    messagesTypes: [],
    configurables: [],
  };
};
