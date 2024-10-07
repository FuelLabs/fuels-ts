import type { FuelsConfig } from '../../types';
import { generateTypes } from '../build/generateTypes';
import { autoStartFuelCore } from '../dev/autoStartFuelCore';

import { deployContracts } from './deployContracts';
import { deployPredicates } from './deployPredicates';
import { deployScripts } from './deployScripts';
import { saveContractIds } from './saveContractIds';
import { savePredicateFiles } from './savePredicateFiles';
import { saveScriptFiles } from './saveScriptFiles';

export async function deploy(config: FuelsConfig) {
  let cleanup: (() => void) | undefined;
  if (config.autoStartFuelCore) {
    const res = await autoStartFuelCore(config);
    cleanup = res?.killChildProcess;
  }
  /**
   * Deploy contract and save their IDs to JSON file.
   */
  const contractIds = await deployContracts(config);
  await saveContractIds(contractIds, config.output);

  config.onDeploy?.(config, contractIds);

  /**
   * Deploy scripts and save deployed files to disk.
   */
  const scripts = await deployScripts(config);
  saveScriptFiles(scripts, config);

  /**
   * Deploy predicates and save deployed files to disk.
   */
  const predicates = await deployPredicates(config);
  savePredicateFiles(predicates, config);

  cleanup?.();

  /**
   * After deploying scripts/predicates, we need to
   * re-generate factory classes with the loader code
   */
  await generateTypes(config);

  return contractIds;
}
