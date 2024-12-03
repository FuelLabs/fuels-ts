import { assertUnreachable } from '@fuel-ts/utils';

import type { AbiFunctionAttribute } from '../../abi';

import type { AbiFunctionAttributeV1 } from './specification';

export const mapAttribute = (attribute: AbiFunctionAttributeV1): AbiFunctionAttribute => {
  const { name, arguments: args } = attribute;

  switch (name) {
    case 'inline':
      return { name, arguments: args[0] };
    case 'storage':
      return { name: 'storage', arguments: args };
    case 'doc-comment':
      return { name, arguments: args };
    case 'payable':
    case 'test':
      return { name };
    default:
      return assertUnreachable(attribute);
  }
};
