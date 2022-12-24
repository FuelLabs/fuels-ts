import { runTypegen } from '@fuel-ts/abi-typegen';

import { getArtifactPaths } from '../../helpers/sway';
import type { ContractsConfig } from '../../types';

// Generate types using typechain
// and typechain-target-fuels modules
export async function buildTypes(config: ContractsConfig) {
  const cwd = process.cwd();
  // find all files matching the glob
  const filepaths = getArtifactPaths(config.contracts);
  await runTypegen({
    cwd,
    filepaths,
    output: config.types.output,
  });
}
