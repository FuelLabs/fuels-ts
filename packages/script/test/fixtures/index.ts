import { join } from 'path';
import type { JsonAbi } from '@fuel-ts/abi-coder';
import { getForcProject } from '@fuel-ts/utils/test-utils';

export enum ScriptProjectsEnum {
  CALL_TEST_SCRIPT = 'call-test-script',
}

export const getScriptForcProject = (project: ScriptProjectsEnum) =>
  getForcProject<JsonAbi>({
    projectDir: join(__dirname, 'forc-projects', project),
    projectName: project,
    build: 'release',
  });
