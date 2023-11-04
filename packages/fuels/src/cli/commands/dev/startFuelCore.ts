import type { ChildProcessWithoutNullStreams } from 'child_process';
import { spawn } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { getPortPromise } from 'portfinder';
import kill from 'tree-kill';

import type { FuelsConfig } from '../../types';
import { findPackageRoot } from '../../utils/findPackageRoot';
import { getBinarySource } from '../../utils/getBinarySource';
import { error, log, loggingConfig } from '../../utils/logger';

import { defaultChainConfig, defaultConsensusKey } from './defaultChainConfig';

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

export type FuelCoreNode = {
  bindIp: string;
  accessIp: string;
  port: number;
  providerUrl: string;
  chainConfig: string;
  killChildProcess: () => void;
};

export const startFuelCore = async (config: FuelsConfig): Promise<FuelCoreNode> => {
  log(`Starting ${getBinarySource(config.useBuiltinFuelCore)} 'fuel-core' node..`);

  const coreDir = join(config.basePath, '.fuels');

  const bindIp = '0.0.0.0';
  const accessIp = '127.0.0.1';

  const chainConfig = config.chainConfig ?? createTempChainConfig(coreDir);
  const port = config.fuelCorePort ?? (await getPortPromise({ port: 4000 }));

  const providerUrl = `http://${accessIp}:${port}/graphql`;

  const flags = [
    'run',
    ['--ip', bindIp],
    ['--port', port.toString()],
    ['--db-path', coreDir],
    ['--min-gas-price', '0'],
    ['--poa-instant', 'true'],
    ['--consensus-key', defaultConsensusKey],
    ['--chain', chainConfig],
    '--vm-backtrace',
    '--utxo-validation',
    '--manual_blocks_enabled',
  ].flat();

  return new Promise((resolve, reject) => {
    const pkgRootDir = findPackageRoot();
    const builtInFuelsCorePath = join(pkgRootDir, 'node_modules', '.bin', 'fuels-core');

    const command = config.useBuiltinFuelCore ? builtInFuelsCorePath : 'fuel-core';
    const core = spawn(command, flags, { stdio: 'pipe' });

    if (loggingConfig.isLoggingEnabled) {
      core.stderr.pipe(process.stderr);
    }

    if (loggingConfig.isDebugEnabled) {
      core.stdout.pipe(process.stdout);
    }

    const killChildProcess = killNode(core, kill);

    process.on('beforeExit', killChildProcess);
    process.on('uncaughtException', killChildProcess);

    core.stderr?.on('data', (data) => {
      if (/Binding GraphQL provider to/.test(data)) {
        resolve({
          bindIp,
          accessIp,
          port,
          providerUrl,
          killChildProcess,
          chainConfig,
        });
      }
      if (/error/i.test(data)) {
        error(
          `Some error occurred. Please, check to see if you have another instance running locally.`
        );
        reject(data.toString());
      }
    });

    core.on('error', reject);
  });
};
