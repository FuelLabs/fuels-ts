import { assertUnreachable } from '@fuel-ts/utils';

import type { Abi } from '../../../../parser';

export function getParentDirWrapper(programType: Abi['programType']): (file: string) => string {
  let directory: string = '';
  switch (programType) {
    case 'contract':
      directory = 'contracts';
      break;
    case 'predicate':
      directory = 'predicates';
      break;
    case 'script':
      directory = 'scripts';
      break;
    case 'library':
      break;
    default:
      assertUnreachable(programType);
  }

  return (file) => `${directory}/${file}`;
}
