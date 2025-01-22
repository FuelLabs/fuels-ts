import type { FuelsConfig } from '../../types';
import { generateTypes } from '../generate-types';

import { deployContracts } from './deployContracts';
import { deployPredicates } from './deployPredicates';
import { deployScripts } from './deployScripts';
import { saveContractIds } from './saveContractIds';
import { savePredicateFiles } from './savePredicateFiles';
import { saveScriptFiles } from './saveScriptFiles';

export async function deploy(config: FuelsConfig) {
  /**
   * Deploy contract and save their IDs to JSON file.
   */
  const contracts = await deployContracts(config);
  await saveContractIds(contracts, config.output);

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

  config.onDeploy?.(config, {
    contracts,
    scripts,
    predicates,
  });

  /**
   * After deploying scripts/predicates, we need to
   * re-generate factory classes with the loader code
   */
  generateTypes(config);

  return {
    contracts,
    scripts,
    predicates,
  };
}
