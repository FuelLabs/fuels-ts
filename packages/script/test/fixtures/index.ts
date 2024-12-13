import type { AbiSpecification } from '@fuel-ts/abi';
import { getForcProject } from '@fuel-ts/utils/test-utils';
import { join } from 'path';

export enum ScriptProjectsEnum {
  CALL_TEST_SCRIPT = 'call-test-script',
}

export const getScriptForcProject = (project: ScriptProjectsEnum) =>
  getForcProject<AbiSpecification>({
    projectDir: join(__dirname, 'forc-projects', project),
    projectName: project,
    build: 'release',
  });
