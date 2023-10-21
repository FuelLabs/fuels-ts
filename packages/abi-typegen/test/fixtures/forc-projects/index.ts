import type { AbiTypegenProjectsEnum } from '@fuel-ts/utils/test-utils';
import { ForcProjectDirsEnum, getForcProject } from '@fuel-ts/utils/test-utils';

import type { IRawAbi } from '../../../src/index';

export const getProjectResources = (project: AbiTypegenProjectsEnum) =>
  getForcProject<IRawAbi>({
    dir: ForcProjectDirsEnum.ABI_TYPEGEN,
    projectName: project,
  });
