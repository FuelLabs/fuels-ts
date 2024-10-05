import type { WalletUnlocked } from '@fuel-ts/account';
import { ContractFactory } from '@fuel-ts/contract';
import { debug, log } from 'console';
import { readFileSync } from 'fs';

import {
  getABIPath,
  getBinaryPath,
  getContractName,
  getPredicateName,
} from '../../config/forcUtils';
import type { DeployedPredicate, FuelsConfig } from '../../types';

import { createWallet } from './createWallet';

/**
 * Deploys one predicate.
 */
export async function deployPredicate(
  wallet: WalletUnlocked,
  binaryPath: string,
  abiPath: string,
  configurableConstants?: { [name: string]: unknown }
) {
  debug(`Deploying predicate for ABI: ${abiPath}`);

  const bytecode = readFileSync(binaryPath);
  const abi = JSON.parse(readFileSync(abiPath, 'utf-8'));
  const factory = new ContractFactory(bytecode, abi, wallet);

  const { waitForResult, predicateRoot, loaderBytecode, loaderBytecodeHexlified } =
    await factory.deployAsBlobTxForPredicate(configurableConstants);

  await waitForResult();

  return {
    predicateRoot,
    loaderBytecode,
    loaderBytecodeHexlified,
  };
}

/**
 * Deploys all predicates.
 */
export async function deployPredicates(config: FuelsConfig) {
  const predicates: DeployedPredicate[] = [];

  const wallet = await createWallet(config.providerUrl, config.privateKey);

  log(`Deploying predicates to: ${wallet.provider.url}`);

  const predicatesLen = config.scripts.length;

  for (let i = 0; i < predicatesLen; i++) {
    const predicatePath = config.predicates[i];
    const binaryPath = getBinaryPath(predicatePath, config);
    const abiPath = getABIPath(predicatePath, config);
    const projectName = getPredicateName(predicatePath);

    const { predicateRoot, loaderBytecode, loaderBytecodeHexlified } = await deployPredicate(
      wallet,
      binaryPath,
      abiPath
    );

    debug(`Predicate deployed: ${projectName} - ${predicateRoot}`);

    predicates.push({
      path: predicatePath,
      predicateRoot,
      loaderBytecode,
      loaderBytecodeHexlified,
    });
  }

  return predicates;
}
