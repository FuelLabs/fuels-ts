import type { WalletUnlocked } from '@fuel-ts/account';
import { debug, log } from 'console';

import type { ForcToml } from '../../config/forcUtils';
import {
  getClosestForcTomlDir,
  getBinaryPath,
  getABIPath,
  getStorageSlotsPath,
  getContractName,
  readForcToml,
} from '../../config/forcUtils';
import type { FuelsConfig, DeployedScript } from '../../types';

import { createWallet } from './createWallet';

/**
 * Deploys one script.
 */
export async function deployScript(
  wallet: WalletUnlocked,
  binaryPath: string,
  abiPath: string,
  storageSlotsPath: string,
  scriptPath: string,
  tomlContents: ForcToml
) {
  debug(`Deploying script for ABI: ${abiPath}`);

  // Implement script deploy
  await Promise.resolve({
    wallet,
    binaryPath,
    abiPath,
    storageSlotsPath,
    scriptPath,
    tomlContents,
  });

  // TODO: implement me
  return 'deployed-blob-id';
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
    const forcTomlPath = getClosestForcTomlDir(scriptPath);
    const binaryPath = getBinaryPath(scriptPath, config);
    const abiPath = getABIPath(scriptPath, config);
    const storageSlotsPath = getStorageSlotsPath(scriptPath, config);
    const projectName = getContractName(scriptPath);
    // const scriptName = getContractCamelCase(scriptPath);
    const tomlContents = readForcToml(forcTomlPath);

    const blobId = await deployScript(
      wallet,
      binaryPath,
      abiPath,
      storageSlotsPath,
      scriptPath,
      tomlContents
    );

    // TODO: implement me
    const loaderBytecode = `0x${blobId}`;

    debug(`Script deployed: ${projectName} - ${blobId}`);

    scripts.push({
      path: scriptPath,
      blobId,
      loaderBytecode,
    });
  }

  return scripts;
}
