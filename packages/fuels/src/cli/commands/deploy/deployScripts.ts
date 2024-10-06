import type { JsonAbi } from '@fuel-ts/abi-coder';
import type { WalletUnlocked } from '@fuel-ts/account';
import { ContractFactory } from '@fuel-ts/contract';
import { arrayify } from '@fuel-ts/utils';
import { debug, log } from 'console';
import { readFileSync } from 'fs';

import { getBinaryPath, getABIPath, getScriptName } from '../../config/forcUtils';
import type { FuelsConfig, DeployedScript } from '../../types';

import { adjustOffsets } from './adjustOffsets';
import { createWallet } from './createWallet';

/**
 * Deploys one script.
 */
export async function deployScript(wallet: WalletUnlocked, binaryPath: string, abiPath: string) {
  debug(`Deploying script for ABI: ${abiPath}`);

  const bytecode = readFileSync(binaryPath);
  const abi = JSON.parse(readFileSync(abiPath, 'utf-8'));
  const factory = new ContractFactory(bytecode, abi, wallet);

  const { waitForResult, blobId } = await factory.deployAsBlobTxForScript();
  const { configurableOffsetDiff, loaderBytecode } = await waitForResult();

  return {
    blobId,
    loaderBytecode,
    configurableOffsetDiff,
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
    const projectName = getScriptName(scriptPath);

    const { blobId, loaderBytecode, configurableOffsetDiff } = await deployScript(
      wallet,
      binaryPath,
      abiPath
    );

    let abi = JSON.parse(readFileSync(abiPath, 'utf-8')) as JsonAbi;
    if (configurableOffsetDiff) {
      abi = adjustOffsets(abi, configurableOffsetDiff);
    }

    debug(`Script deployed: ${projectName} - ${blobId}`);

    scripts.push({
      path: scriptPath,
      loaderBytecode: arrayify(loaderBytecode),
      abi,
    });
  }

  return scripts;
}
