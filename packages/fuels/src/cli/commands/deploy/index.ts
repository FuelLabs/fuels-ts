import type { FuelsConfig } from '../../types';

import { deployContracts } from './deployContracts';
import { deployScripts } from './deployScripts';
import { saveContractIds } from './saveContractIds';
import { saveScriptFiles } from './saveScriptFiles';

export async function deploy(config: FuelsConfig) {
  /**
   * Deploy contract and save their IDs to JSON file.
   */
  const contractIds = await deployContracts(config);
  await saveContractIds(contractIds, config.output);
  config.onDeploy?.(config, contractIds);

  /**
   * Deploy scripts and save deployed files to disk
   */
  const scripts = await deployScripts(config);
  await saveScriptFiles(scripts, config);

  // TODO: Implement me
  /**
   * After saving the script files, we need to
   * re-generate types for them.
   *
   * This time, the script will have to binaries:
   *  - the original one
   *  - the loader one (after deploy)
   *
   * At this point, we can generate one class per binary.
   *
   * This would look like:
   *
   *  import { MyScript, MyScriptDeployed } from './generated-types';
   *
   */

  return contractIds;
}
