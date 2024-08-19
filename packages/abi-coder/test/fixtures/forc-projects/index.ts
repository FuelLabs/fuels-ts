import { getForcProject } from '@fuel-ts/utils/test-utils';
import { join } from 'path';

import type { JsonAbi } from '../../../src';

export enum AbiCoderProjectsEnum {
  EXHAUSTIVE_EXAMPLES = 'exhaustive-examples',
}

export const getCoderForcProject = (
  project: AbiCoderProjectsEnum,
  build: 'release' | 'debug' = 'release'
) =>
  getForcProject<JsonAbi>({
    projectDir: join(__dirname, project),
    projectName: project,
    build,
  });
