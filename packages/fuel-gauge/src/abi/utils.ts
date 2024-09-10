import { getForcProject } from '@fuel-ts/utils/test-utils';
import { join } from 'path';

export enum AbiProjectsEnum {
  ABI_CONTRACT = 'abi-contract',
  ABI_PREDICATE = 'abi-predicate',
  ABI_SCRIPT = 'abi-script',
  ABI_EXHAUSTIVE_EXAMPLES = 'abi-exhaustive-examples',
}

const forcProjectsDir = join(__dirname, '../../test/fixtures/forc-projects');

export const getAbiForcProject = (project: AbiProjectsEnum) => {
  const result = getForcProject({
    projectDir: join(forcProjectsDir, project),
    projectName: project,
    build: 'release',
  });
  return result;
};
