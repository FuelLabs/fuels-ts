import { getForcProject } from '@fuel-ts/utils/test-utils';
import { writeFileSync } from 'fs';
import { join } from 'path';

export enum AbiProjectsEnum {
  ABI_CONTRACT = 'abi-contract',
  ABI_PREDICATE = 'abi-predicate',
  ABI_SCRIPT = 'abi-script',
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

export function autoUpdateFixture(path: string, contents: string) {
  if (process.env.UPDATE_FIXTURES === 'true') {
    if (!/fixtures/.test(path)) {
      throw new Error(`This path may no be a fixture: ${path}`);
    }
    const { log } = console;
    log('Updated fixture', path);
    writeFileSync(path, contents);
  }
  return contents;
}
