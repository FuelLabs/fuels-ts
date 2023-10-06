import type { ChildProcessWithoutNullStreams } from 'child_process';
import { spawn } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { getPortPromise } from 'portfinder';
import kill from 'tree-kill';

import type { FuelsConfig } from '../../types';
import { findPackageRoot } from '../../utils/findPackageRoot';
import { log, loggingConfig } from '../../utils/logger';

import { defaultChainConfig } from './defaultChainConfig';

export const killNode =
  (core: ChildProcessWithoutNullStreams, killFn: (pid: number) => void) => () => {
    if (core.pid) {
      killFn(Number(core.pid));
    }
  };

export const createTempChainConfig = (coreDir: string) => {
  const chainConfigPath = join(coreDir, 'chainConfig.json');
  const chainConfigJson = JSON.stringify(defaultChainConfig, null, 2);
  mkdirSync(dirname(chainConfigPath), { recursive: true });
  writeFileSync(chainConfigPath, chainConfigJson);
  return chainConfigPath;
};

export const startFuelCore = async (
  config: FuelsConfig
): Promise<{
  bindIp: string;
  accessIp: string;
  port: number;
  providerUrl: string;
  chainConfig: string;
  childProcess: ChildProcessWithoutNullStreams;
}> => {
  log('Starting node..');

  const coreDir = join(config.basePath, '.fuels');

  const bindIp = '0.0.0.0';
  const accessIp = '127.0.0.1';

  const chainConfig = config.chainConfig ?? createTempChainConfig(coreDir);
  const port = config.fuelCorePort ?? (await getPortPromise({ port: 4000 }));

  const providerUrl = `http://${accessIp}:${port}/graphql`;

  // This is the private key of the `consensus.PoA.signing_key` in `defaultChainConfig.ts`.
  // This key is responsible for validating the transactions.
  const consensusKey = '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298';

  const flags = [
    'run',
    ['--ip', bindIp],
    ['--port', port.toString()],
    ['--db-path', coreDir],
    ['--min-gas-price', '0'],
    ['--poa-instant', 'true'],
    ['--consensus-key', consensusKey],
    ['--chain', chainConfig],
    '--vm-backtrace',
    '--utxo-validation',
    '--manual_blocks_enabled',
  ].flat();

  return new Promise((resolve, reject) => {
    const pkgRootDir = findPackageRoot();
    const fuelsCorePath = join(pkgRootDir, 'node_modules', '.bin', 'fuels-core');

    const command = config.useBuiltinFuelCore ? fuelsCorePath : 'fuel-core';
    const core = spawn(command, flags, { stdio: 'pipe' });

    core.stderr.pipe(process.stderr);
    if (loggingConfig.isDebugEnabled) {
      core.stdout.pipe(process.stdout);
    }

    process.on('beforeExit', killNode(core, kill));
    process.on('uncaughtException', killNode(core, kill));

    core.stderr?.on('data', (data) => {
      if (/Binding GraphQL provider to/.test(data)) {
        resolve({
          bindIp,
          accessIp,
          port,
          providerUrl,
          childProcess: core,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          chainConfig: chainConfig!,
        });
      }
      // if (/ERROR|IO error/.test(data)) {
      if (/IO error/.test(data)) {
        log(
          `Some error occurred. Please, check to see if you have another instance running locally.`
        );
        process.exit(1);
      }
    });

    core.on('error', reject);
  });
};
