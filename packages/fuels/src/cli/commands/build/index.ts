import { type Command } from 'commander';

import { BuildMode } from '../../config/forcUtils';
import type { FuelsConfig } from '../../types';
import { log } from '../../utils/logger';
import { deploy } from '../deploy';
import { autoStartFuelCore } from '../dev/autoStartFuelCore';

import { buildSwayPrograms } from './buildSwayPrograms';
import { generateTypes } from './generateTypes';

export async function build(config: FuelsConfig, program: Command) {
  log('Building..');

  const options = program.opts();

  const mode: BuildMode = options.release || options.deploy ? BuildMode.RELEASE : BuildMode.DEBUG;

  await buildSwayPrograms(config, mode);
  await generateTypes(config, mode);

  if (options.deploy) {
    const fuelCore = await autoStartFuelCore(config);
    await deploy(config, program);
    fuelCore?.killChildProcess();
  }
}
