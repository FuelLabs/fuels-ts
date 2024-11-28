import { getPredicateRoot, Predicate } from '@fuel-ts/account';
import { debug, log } from 'console';
import { readFileSync } from 'fs';

import { getABIPath, getBinaryPath, getPredicateName } from '../../config/forcUtils';
import type { DeployedPredicate, FuelsConfig } from '../../types';

import { createWallet } from './createWallet';

/**
 * Deploys all predicates.
 */
export async function deployPredicates(config: FuelsConfig) {
  const predicates: DeployedPredicate[] = [];

  const wallet = await createWallet(config.providerUrl, config.privateKey);

  log(`Deploying predicates to: ${wallet.provider.url}`);

  const predicatesLen = config.predicates.length;

  for (let i = 0; i < predicatesLen; i++) {
    const predicatePath = config.predicates[i];
    const binaryPath = getBinaryPath(predicatePath, config);
    const abiPath = getABIPath(predicatePath, config);
    const projectName = getPredicateName(predicatePath);
    const bytecode = readFileSync(binaryPath);
    const abi = JSON.parse(readFileSync(abiPath, 'utf-8'));

    const predicate = new Predicate({ abi, bytecode, provider: wallet.provider });
    const {
      bytes: loaderBytecode,
      interface: { specification },
    } = await (await predicate.deploy(wallet)).waitForResult();

    const predicateRoot = getPredicateRoot(loaderBytecode);

    debug(`Predicate deployed: ${projectName} - ${predicateRoot}`);

    predicates.push({
      path: predicatePath,
      predicateRoot,
      loaderBytecode,
      abi: specification,
    });
  }

  return predicates;
}
