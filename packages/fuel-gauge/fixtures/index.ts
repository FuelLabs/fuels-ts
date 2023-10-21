import type { FuelGaugeProjectsEnum } from '@fuel-ts/utils/test-utils';
import { ForcProjectDirsEnum, getForcProject } from '@fuel-ts/utils/test-utils';
import type { JsonAbi } from 'fuels';

export const getFuelGaugeProject = (project: FuelGaugeProjectsEnum) =>
  getForcProject<JsonAbi>({
    dir: ForcProjectDirsEnum.FUEL_GAUGE,
    projectName: project,
  });
