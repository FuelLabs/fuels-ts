import { type Command } from 'commander';

import type { FuelsConfig } from '../../types';
import { log } from '../../utils/logger';
import { deploy } from '../deploy';
import { autoStartFuelCore } from '../dev/autoStartFuelCore';

import { buildSwayPrograms } from './buildSwayPrograms';
import { generateTypes } from './generateTypes';

export async function build(config: FuelsConfig, program?: Command) {
  log('Building..');

  await buildSwayPrograms(config);
  await generateTypes(config);
  config.onBuild?.(config);

  const options = program?.opts();
  if (options?.deploy) {
    const fuelCore = await autoStartFuelCore(config);
    await deploy(config);
    fuelCore?.killChildProcess();
  }
}
