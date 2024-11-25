import { assertUnreachable } from '@fuel-ts/utils';

import type { AbiFunctionAttribute } from '../../abi';

import type { AbiFunctionAttributeV1 } from './specification';

export const mapAttribute = (attribute: AbiFunctionAttributeV1): AbiFunctionAttribute => {
  switch (attribute.name) {
    case 'inline':
      return {
        name: attribute.name,
        arguments: attribute.arguments[0] === 'never' ? 'never' : 'always',
      };

    case 'storage':
      return {
        name: attribute.name,
        arguments: attribute.arguments,
      };

    case 'doc-comment':
      return {
        name: attribute.name,
        arguments: attribute.arguments,
      };

    case 'payable':
    case 'test':
      return { name: attribute.name };

    default:
      return assertUnreachable(attribute);
  }
};
