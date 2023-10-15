import { spawn, spawnSync } from 'child_process';
import { randomUUID } from 'crypto';
import fsSync from 'fs';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import kill from 'tree-kill';

import type { ChainConfig } from './chain-config-interfaces';
import { defaultChainConfig } from './defaultChainConfig';

const defaultFuelCoreArgs = ['--vm-backtrace', '--utxo-validation', '--manual_blocks_enabled'];

export interface LaunchNodeOptions {
  consensusKey: string;
  port: string;
  args: string[];
  useSystemFuelCore: boolean;
  chainConfig: ChainConfig;
  /**
   * Used to access the fuel node's logs.
   *
   * @param text text the node prints out during its operation.
   * @returns void
   */
  logger: (text: string) => void;
}

export type LaunchNodeResult = Promise<{
  cleanup: () => Promise<void>;
  ip: string;
  port: string;
}>;

/**
 * Launches a fuel-core node locally (`127.0.0.1`)
 * @param consensusKey - the consensus key to use.
 * @param port - the port to bind to. (optional, by default the OS assigns it)
 * @param args - additional arguments to pass to fuel-core.
 * @param useSystemFuelCore - whether to use the system fuel-core binary or the one provided by the \@fuel-ts/fuel-core package.
 * */
export const launchNode = async ({
  consensusKey = '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298',
  port = '0',
  args = defaultFuelCoreArgs,
  useSystemFuelCore = false,
  chainConfig = defaultChainConfig,
  logger,
}: Partial<LaunchNodeOptions> = {}): LaunchNodeResult =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    const command = useSystemFuelCore ? 'fuel-core' : './node_modules/.bin/fuels-core';

    const tempDirPath = path.join(os.tmpdir(), '.fuels-ts', randomUUID());

    if (!fsSync.existsSync(tempDirPath)) {
      fsSync.mkdirSync(tempDirPath, { recursive: true });
    }
    const chainConfigPath = path.join(tempDirPath, '.chainConfig.json');

    // Write a temporary chain configuration file.
    await fs.writeFile(chainConfigPath, JSON.stringify(chainConfig), 'utf8');

    const child = spawn(command, [
      'run',
      '--db-type',
      'in-memory',
      '--consensus-key',
      consensusKey,
      '--chain',
      chainConfigPath as string,
      '--ip',
      '127.0.0.1',
      '--port',
      port,
      ...args,
    ]);

    // Cleanup function where fuel-core is stopped.
    const cleanup = () =>
      new Promise<void>((resolveFn, rejectFn) => {
        kill(Number(child.pid), (err) => {
          // Remove all the listeners we've added.
          child.stdout.removeAllListeners();
          child.stderr.removeAllListeners();

          // Remove the temporary folder and all its contents.
          if (!chainConfigPath) {
            spawnSync('rm', ['-rf', tempDirPath]);
          }

          if (err) rejectFn(err);
          resolveFn();
        });
      });

    child.stderr.setEncoding('utf8');

    // This string is logged by the client when the node has successfully started. We use it to know when to resolve.
    const graphQLStartSubstring = 'Binding GraphQL provider to';

    // Look for a specific graphql start point in the output.
    child!.stderr.on('data', (chunk: string) => {
      if (logger) logger(chunk);
      // Look for the graphql service start.
      if (chunk.indexOf(graphQLStartSubstring) !== -1) {
        // Resolve with the cleanup method.
        const [nodeIp, nodePort] = chunk.split(' ').at(-1)!.trim().split(':');

        resolve({ cleanup, ip: nodeIp, port: nodePort });
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
