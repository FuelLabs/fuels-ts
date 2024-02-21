import type { BuildMode } from '../../config/forcUtils';
import type { FuelsConfig } from '../../types';
import { getBinarySource } from '../../utils/getBinarySource';
import { log } from '../../utils/logger';

import { buildSwayProgram } from './buildSwayProgram';

export async function buildSwayPrograms(config: FuelsConfig, mode: BuildMode) {
  log(`Building Sway programs using ${getBinarySource(config.useBuiltinFuelCore)} 'forc' binary`);

  const paths = config.workspace
    ? [config.workspace]
    : [config.contracts, config.predicates, config.scripts].flat();

  await Promise.all(paths.map((path) => buildSwayProgram(config, path, mode)));
}
