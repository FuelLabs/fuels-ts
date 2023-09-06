import { BaseAssetId } from '@fuel-ts/address/configs';
import { Provider } from '@fuel-ts/providers';
import { spawn } from 'child_process';
import { randomUUID } from 'crypto';
import fsSync from 'fs';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { getPortPromise } from 'portfinder';
import kill from 'tree-kill';

import type { WalletUnlocked } from '../wallets';

import { defaultChainConfig } from './defaultChainConfig';
import { generateTestWallet } from './generateTestWallet';

const defaultFuelCoreArgs = ['--vm-backtrace', '--utxo-validation', '--manual_blocks_enabled'];

type LaunchNodeOptions = {
  chainConfigPath?: string;
  consensusKey?: string;
  ip?: string;
  port?: string;
  args?: string[];
  useSystemFuelCore?: boolean;
};

/**
 * Launches a fuel-core node.
 * @param chainConfigPath - path to the chain configuration file.
 * @param consensusKey - the consensus key to use.
 * @param ip - the ip to bind to. (optional, defaults to 0.0.0.0)
 * @param port - the port to bind to. (optional, defaults to 4000 or the next available port)
 * @param args - additional arguments to pass to fuel-core
 * @param useSystemFuelCore - whether to use the system fuel-core binary or the one provided by the \@fuel-ts/fuel-core package.
 * */
export const launchNode = async ({
  chainConfigPath,
  consensusKey = '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298',
  ip,
  port,
  args = defaultFuelCoreArgs,
  useSystemFuelCore = false,
}: LaunchNodeOptions): Promise<{
  cleanup: () => void;
  ip: string;
  port: string;
}> =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    // This string is logged by the client when the node has successfully started. We use it to know when to resolve.
    const graphQLStartSubstring = 'Binding GraphQL provider to';

    const command = useSystemFuelCore ? 'fuel-core' : './node_modules/.bin/fuels-core';

    const ipToUse = ip || '0.0.0.0';

    const portToUse =
      port ||
      (
        await getPortPromise({
          port: 4000, // tries 4000 first, then 4001, then 4002, etc.
          stopPort: 5000, // don't try ports above 5000
        })
      ).toString();

    let chainConfigPathToUse = chainConfigPath;

    const tempDirPath = path.join(os.tmpdir(), '.fuels-ts', randomUUID());

    if (!chainConfigPath) {
      if (!fsSync.existsSync(tempDirPath)) {
        fsSync.mkdirSync(tempDirPath, { recursive: true });
      }
      const tempChainConfigFilePath = path.join(tempDirPath, '.chainConfig.json');
      // Write a temporary chain configuration file.
      await fs.writeFile(tempChainConfigFilePath, JSON.stringify(defaultChainConfig), 'utf8');

      chainConfigPathToUse = tempChainConfigFilePath;
    }

    const child = spawn(command, [
      'run',
      '--ip',
      ipToUse,
      '--port',
      portToUse,
      '--db-type',
      'in-memory',
      '--consensus-key',
      consensusKey,
      '--chain',
      chainConfigPathToUse as string,
      ...args,
    ]);

    // Cleanup function where fuel-core is stopped.
    const cleanup = () => {
      kill(Number(child.pid));

      // Remove all the listeners we've added.
      child.stdout.removeAllListeners();
      child.stderr.removeAllListeners();

      // Remove the temporary folder and all its contents.
      if (!chainConfigPath) {
        spawn('rm', ['-rf', tempDirPath]);
      }
    };

    child.stderr.setEncoding('utf8');

    // Look for a specific graphql start point in the output.
    child.stderr.on('data', (chunk: string) => {
      // Look for the graphql service start.
      if (chunk.indexOf(graphQLStartSubstring) !== -1) {
        // Resolve with the cleanup method.
        resolve({
          cleanup,
          ip: ipToUse,
          port: portToUse,
        });
      }
    });

    // Process exit.
    process.on('exit', cleanup);

    // Catches ctrl+c event.
    process.on('SIGINT', cleanup);

    // Catches "kill pid" (for example: nodemon restart).
    process.on('SIGUSR1', cleanup);
    process.on('SIGUSR2', cleanup);

    // Catches uncaught exceptions.
    process.on('uncaughtException', cleanup);
  });

const generateWallets = async (count: number, provider: Provider) => {
  const wallets: WalletUnlocked[] = [];
  for (let i = 0; i < count; i += 1) {
    const wallet = await generateTestWallet(provider, [[1_000, BaseAssetId]]);
    wallets.push(wallet);
  }
  return wallets;
};

/**
 * Launches a fuel-core node and returns a provider, 10 wallets, and a cleanup function to stop the node.
 * @param launchNodeOptions - options to launch the fuel-core node with.
 * @param walletCount - the number of wallets to generate. (optional, defaults to 10)
 * */
export const launchNodeAndGetWallets = async ({
  launchNodeOptions,
  walletCount = 10,
}: {
  launchNodeOptions?: Partial<LaunchNodeOptions>;
  walletCount?: number;
} = {}) => {
  const defaultNodeOptions: LaunchNodeOptions = {
    chainConfigPath: launchNodeOptions?.chainConfigPath,
    consensusKey: launchNodeOptions?.consensusKey,
  };

  const {
    cleanup: closeNode,
    ip,
    port,
  } = await launchNode({ ...defaultNodeOptions, ...launchNodeOptions });

  const provider = await Provider.connect(`http://${ip}:${port}/graphql`);
  const wallets = await generateWallets(walletCount, provider);

  const cleanup = () => {
    closeNode();
  };

  return { wallets, stop: cleanup, provider };
};
