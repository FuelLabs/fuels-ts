import type { FuelsConfig } from '../../types';
import { generateTypes } from '../build/generateTypes';

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

  // eslint-disable-next-line no-param-reassign
  config.predicates = config.predicates.map((predicate) => `${predicate}/loader`);

  /**
   * After deploying scripts/predicates, we need to
   * re-generate factory classe with the loader coee
   */
  await generateTypes(config);

  return contractIds;
}
