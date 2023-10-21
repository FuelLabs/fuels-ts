import type { AbiTypegenProjectsEnum } from '@fuel-ts/utils/test-utils';
import { getForcProject } from '@fuel-ts/utils/test-utils';
import { join } from 'path';

import type { IRawAbi } from '../../../src/index';

export const getProjectResources = (project: AbiTypegenProjectsEnum) =>
  getForcProject<IRawAbi>(join(__dirname, project));
