import { execSync, spawn } from 'child_process';
import { randomUUID } from 'crypto';
import fsSync from 'fs';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import kill from 'tree-kill';

import { defaultChainConfig } from './defaultChainConfig';

const defaultFuelCoreArgs = ['--vm-backtrace', '--utxo-validation', '--manual_blocks_enabled'];

type LaunchNodeOptions = {
  chainConfigPath?: string;
  consensusKey?: string;
  ip?: string;
  port?: string;
  args?: string[];
  useSystemFuelCore?: boolean;
};

export type LaunchNodeResult = Promise<{
  cleanup: () => void;
  ip: string;
  port: string;
}>;

// async function getFuelCorePid(parentPid: string, wait: boolean = false): Promise<string> {
//   if (wait) {
//     await sleep(250);
//   }
//   const fuelCorePid = execSync(`ps --ppid ${parentPid} | grep fuel-core | xargs | awk '{print $1}'`)
//     .toString()
//     .replace('\n', '');

//   return fuelCorePid === '' ? getFuelCorePid(parentPid, true) : fuelCorePid;
// }
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
}: LaunchNodeOptions): LaunchNodeResult =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    // This string is logged by the client when the node has successfully started. We use it to know when to resolve.
    const graphQLStartSubstring = 'Binding GraphQL provider to';

    const command = useSystemFuelCore ? 'fuel-core' : './node_modules/.bin/fuels-core';

    const ipToUse = ip || '127.0.0.1';

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
      '--db-type',
      'in-memory',
      '--consensus-key',
      consensusKey,
      '--chain',
      chainConfigPathToUse as string,
      '--ip',
      ipToUse,
      '--port',
      `${port ?? 0}`,
      ...args,
    ]);

    const result = {
      cleanup: () => {},
      port: '',
      ip: '',
    };

    // Cleanup function where fuel-core is stopped.
    const cleanup = () => {
      // execSync(
      //   `kill -9 $(ps -A | grep -E $(lsof -i :${result.port} -t| tr '\n' '|' | sed '$s/|$//') | grep fuel-core | awk '{print $1;}')`
      // );
      // execSync(`kill -9 ${fuelCorePid}`);
      kill(Number(child.pid));

      // Remove all the listeners we've added.
      child.stdout.removeAllListeners();
      child.stderr.removeAllListeners();

      // Remove the temporary folder and all its contents.
      if (!chainConfigPath) {
        spawn('rm', ['-rf', tempDirPath]);
      }
    };

    child!.stderr.setEncoding('utf8');

    // Look for a specific graphql start point in the output.
    child!.stderr.on('data', (chunk: string) => {
      // Look for the graphql service start.
      if (chunk.indexOf(graphQLStartSubstring) !== -1) {
        // Resolve with the cleanup method.
        const [nodeIp, nodePort] = chunk.split(' ').at(-1)!.trim().split(':');
        result.cleanup = cleanup;
        result.ip = nodeIp;
        result.port = nodePort;

        resolve(result);
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
