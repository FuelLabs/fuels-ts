import { Script } from '@fuel-ts/script';
import { debug, log } from 'console';
import { readFileSync } from 'fs';

import { getBinaryPath, getABIPath, getScriptName } from '../../config/forcUtils';
import type { FuelsConfig, DeployedScript } from '../../types';

import { createWallet } from './createWallet';

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

    const bytecode = readFileSync(binaryPath);
    const abi = JSON.parse(readFileSync(abiPath, 'utf-8'));

    const script = new Script(bytecode, abi, wallet);
    const {
      bytes: loaderBytecode,
      interface: { jsonAbi },
    } = await (await script.deploy(wallet)).waitForResult();

    debug(`Script deployed: ${projectName}`);

    scripts.push({
      path: scriptPath,
      loaderBytecode,
      abi: jsonAbi,
    });
  }

  return scripts;
}
