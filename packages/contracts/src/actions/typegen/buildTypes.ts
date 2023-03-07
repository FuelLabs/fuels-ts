import { runTypegen } from '@fuel-ts/abi-typegen';

import { getArtifactPaths, getArtifactPaths2, getWorkspaceFiles } from '../../helpers/sway';
import { logSection } from '../../log';
import type { ContractsConfig } from '../../types';

// Generate types using typechain
// and typechain-target-fuels modules
export async function buildTypes(config: ContractsConfig) {
  logSection('🟦 Generating types...');

  const cwd = process.cwd();

  if (!config.workspace) {
    // find all files matching the glob
    const filepaths = await getArtifactPaths(config.contracts);
    await runTypegen({
      cwd,
      filepaths,
      output: config.types.output,
    });
  } else {
    const contractsPaths = await getWorkspaceFiles(config.workspace);
    const filepaths = await getArtifactPaths2(contractsPaths);
    await runTypegen({
      cwd,
      filepaths,
      output: config.types.output,
    });
  }
}
