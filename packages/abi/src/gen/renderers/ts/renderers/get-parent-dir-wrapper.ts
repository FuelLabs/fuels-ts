import { assertUnreachable } from '@fuel-ts/utils';

import type { Abi } from '../../../../parser';

export function getParentDirWrapper(programType: Abi['programType']): {
  parentDir: string;
  withParentDir: (file: string) => string;
  removeParentDir: (file: string) => string;
} {
  let parentDir: string = '';
  switch (programType) {
    case 'contract':
      parentDir = 'contracts';
      break;
    case 'predicate':
      parentDir = 'predicates';
      break;
    case 'script':
      parentDir = 'scripts';
      break;
    case 'library':
      break;
    default:
      assertUnreachable(programType);
  }

  return {
    parentDir,
    withParentDir: (file) => `${parentDir}/${file}`,
    removeParentDir: (file) => file.split(`${parentDir}/`)[1],
  };
}
