import { runTypeChain } from 'fuelchain';

import { getArtifactPaths } from '../../helpers/sway';
import type { ContractsConfig } from '../../types';

// Generate types using typechain
// and typechain-target-fuels modules
export async function buildTypes(config: ContractsConfig) {
  const cwd = process.cwd();
  // find all files matching the glob
  const allFiles = getArtifactPaths(config.contracts);
  await runTypeChain({
    cwd,
    filesToProcess: allFiles,
    allFiles,
    outDir: config.types.output,
    target: 'fuels',
  });
}
