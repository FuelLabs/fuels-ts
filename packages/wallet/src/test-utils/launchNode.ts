import { BaseAssetId } from '@fuel-ts/address/configs';
import { Provider } from '@fuel-ts/providers';
import { spawn } from 'child_process';
import fs from 'fs/promises';

import type { WalletUnlocked } from '../wallets';

import { defaultChainConfig } from './defaultChainConfig';
import { generateTestWallet } from './generateTestWallet';

const defaultFuelCoreArgs = ['--vm-backtrace', '--utxo-validation', '--manual_blocks_enabled'];

type LaunchNodeOptions = {
  chainConfigPath: string;
  consensusKey: string;
  dbPath: string;
  args?: string[];
};

/**
 * Launches a fuel-core node.
 * @param chainConfigPath - path to the chain configuration file.
 * @param consensusKey - the consensus key to use.
 * @param dbPath - the path to the folder to use for the fuel-core db.
 * @param args - additional arguments to pass to fuel-core
 * */
export const launchNode = async ({
  chainConfigPath,
  consensusKey,
  dbPath,
  args = defaultFuelCoreArgs,
}: LaunchNodeOptions): Promise<() => void> =>
  new Promise((resolve) => {
    // This string is logged by the client when the node has successfully started. We use it to know when to resolve.
    const graphQLStartSubstring = 'Binding GraphQL provider to';

    const child = spawn('fuel-core', [
      'run',
      '--db-path',
      dbPath, // hardcoded
      '--consensus-key',
      consensusKey,
      '--chain',
      chainConfigPath,
      ...args,
    ]);

    // Cleanup function where fuel-core is stopped.
    const cleanup = () => {
      child.kill('SIGINT');

      // Remove all the listeners we've added.
      child.stdout.removeAllListeners();
      child.stderr.removeAllListeners();
    };

    child.stderr.setEncoding('utf8');

    // Look for a specific graphql start point in the output.
    child.stderr.on('data', (chunk: string) => {
      // Look for the graphql service start.
      if (chunk.indexOf(graphQLStartSubstring) !== -1) {
        // Resolve with the cleanup method.
        resolve(cleanup);
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
 * */
export const launchNodeAndGetWallets = async ({
  launchNodeOptions,
}: {
  launchNodeOptions?: LaunchNodeOptions;
} = {}) => {
  // Write a temporary chain configuration file.
  await fs.writeFile('.chainConfig.json', JSON.stringify(defaultChainConfig), 'utf8');

  // Create a temp db directory.
  await fs.mkdir('.fuel-core-db', { recursive: true });

  const defaultNodeOptions: LaunchNodeOptions = {
    chainConfigPath: '.chainConfig.json',
    consensusKey: '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298',
    dbPath: '.fuel-core-db',
  };

  const closeNode = await launchNode(launchNodeOptions ?? defaultNodeOptions);

  const provider = new Provider('http://127.0.0.1:4000/graphql');
  const wallets = await generateWallets(10, provider);

  const cleanup = () => {
    closeNode();
    spawn('rm', ['.chainConfig.json']);
    spawn('rm', ['-rf', '.fuel-core-db']);
  };

  return { wallets, stop: cleanup, provider };
};
