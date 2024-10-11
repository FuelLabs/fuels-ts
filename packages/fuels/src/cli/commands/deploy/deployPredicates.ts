import type { JsonAbi } from '@fuel-ts/abi-coder';
import { getPredicateRoot, type WalletUnlocked } from '@fuel-ts/account';
import { ContractFactory } from '@fuel-ts/contract';
import { arrayify } from '@fuel-ts/utils';
import { debug, log } from 'console';
import { readFileSync } from 'fs';

import { getABIPath, getBinaryPath, getPredicateName } from '../../config/forcUtils';
import type { DeployedPredicate, FuelsConfig } from '../../types';

import { adjustOffsets } from './adjustOffsets';
import { createWallet } from './createWallet';

/**
 * Deploys one predicate.
 */
export async function deployPredicate(wallet: WalletUnlocked, binaryPath: string, abiPath: string) {
  debug(`Deploying predicate for ABI: ${abiPath}`);

  const bytecode = readFileSync(binaryPath);
  const abi = JSON.parse(readFileSync(abiPath, 'utf-8'));
  const factory = new ContractFactory(bytecode, abi, wallet);

  const { waitForResult } = await factory.deployAsBlobTxForScript();

  const { loaderBytecode, configurableOffsetDiff } = await waitForResult();

  return {
    loaderBytecode,
    configurableOffsetDiff,
  };
}

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

    const { loaderBytecode, configurableOffsetDiff } = await deployPredicate(
      wallet,
      binaryPath,
      abiPath
    );
    const predicateRoot = getPredicateRoot(loaderBytecode);

    let abi = JSON.parse(readFileSync(abiPath, 'utf-8')) as JsonAbi;
    if (configurableOffsetDiff) {
      abi = adjustOffsets(abi, configurableOffsetDiff);
    }

    debug(`Predicate deployed: ${projectName} - ${predicateRoot}`);

    predicates.push({
      path: predicatePath,
      predicateRoot,
      loaderBytecode: arrayify(loaderBytecode),
      abi,
    });
  }

  return predicates;
}
