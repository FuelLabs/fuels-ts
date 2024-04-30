import type { FuelsConfig } from '../../types';
import { log, debug } from '../../utils/logger';

import { buildSwayProgram } from './buildSwayProgram';

export async function buildSwayPrograms(config: FuelsConfig) {
  log(`Building Sway programs using 'forc' binary`);
  debug(`Using 'forc' binary from: ${config.forcPath}`);

  const paths = config.workspace
    ? [config.workspace]
    : [config.contracts, config.predicates, config.scripts].flat();

  await Promise.all(paths.map((path) => buildSwayProgram(config, path)));
}
