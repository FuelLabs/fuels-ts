import { type Command } from 'commander';

import type { FuelsConfig } from '../../types';
import { log } from '../../utils/logger';
import { deploy } from '../deploy';
import { autoStartFuelCore } from '../dev/autoStartFuelCore';

import { buildSwayPrograms } from './buildSwayPrograms';
import { generateTypes } from './generateTypes';

export async function build(config: FuelsConfig, program?: Command) {
  log('Building..');

  const options = program?.opts();
  const shouldDeploy = options?.deploy;
  const releaseMode = options?.release || shouldDeploy;

  await buildSwayPrograms(config, releaseMode);
  await generateTypes(config);

  if (shouldDeploy) {
    const fuelCore = await autoStartFuelCore(config);
    await deploy(config);
    fuelCore?.killChildProcess();
  }
}
