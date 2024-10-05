import type { WalletUnlocked } from '@fuel-ts/account';
import type { DeployContractOptions } from '@fuel-ts/contract';
import { ContractFactory } from '@fuel-ts/contract';
import { debug, log } from 'console';
import { readFileSync } from 'fs';

import { getBinaryPath, getABIPath, getContractName } from '../../config/forcUtils';
import type { FuelsConfig, DeployedScript } from '../../types';

import { createWallet } from './createWallet';

/**
 * Deploys one script.
 */
export async function deployScript(
  wallet: WalletUnlocked,
  binaryPath: string,
  abiPath: string,
  configurableConstants?: DeployContractOptions['configurableConstants']
) {
  debug(`Deploying script for ABI: ${abiPath}`);

  const bytecode = readFileSync(binaryPath);
  const abi = JSON.parse(readFileSync(abiPath, 'utf-8'));
  const factory = new ContractFactory(bytecode, abi, wallet);

  const { waitForResult, blobId, loaderBytecode, loaderBytecodeHexlified } =
    await factory.deployAsBlobTxForScript(configurableConstants);
  await waitForResult();

  return {
    blobId,
    loaderBytecode,
    loaderBytecodeHexlified,
  };
}

/**
 * Deploys all scripts.
 */
export async function deployScripts(config: FuelsConfig) {
  const scripts: DeployedScript[] = [];

  const wallet = await createWallet(config.providerUrl, config.privateKey);

  log(`Deploying scripts to: ${wallet.provider.url}`);

  const scriptsLen = config.scripts.length;

  for (let i = 0; i < scriptsLen; i++) {
    const scriptPath = config.scripts[i];
    const binaryPath = getBinaryPath(scriptPath, config);
    const abiPath = getABIPath(scriptPath, config);
    const projectName = getContractName(scriptPath);

    const { blobId, loaderBytecode, loaderBytecodeHexlified } = await deployScript(
      wallet,
      binaryPath,
      abiPath
    );

    debug(`Script deployed: ${projectName} - ${blobId}`);

    scripts.push({
      path: scriptPath,
      blobId,
      loaderBytecode,
      loaderBytecodeHexlified,
    });
  }

  return scripts;
}
