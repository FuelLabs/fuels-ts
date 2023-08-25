import type { ChildProcessWithoutNullStreams } from 'child_process';
import { spawn } from 'child_process';
import { writeFileSync } from 'fs';
import getPort from 'get-port';
import { dirname, join } from 'path';
import { mkdir } from 'shelljs';
import kill from 'tree-kill';

import type { ParsedFuelsConfig } from '../../types';
import { logSection } from '../../utils';

import { defaultChainConfig } from './defaultChainConfig';

export async function startFuelCore(config: ParsedFuelsConfig): Promise<{
  ip: string;
  port: number;
  childProcess: ChildProcessWithoutNullStreams;
}> {
  logSection('Starting node...');

  const coreDir = join(config.basePath, '.fuels');
  const chainConfigPath = join(coreDir, 'chainConfig.json');
  const chainConfigJson = JSON.stringify(defaultChainConfig, null, 2);

  let chainConfig = config?.chainConfig;

  if (!chainConfig) {
    mkdir('-p', dirname(chainConfigPath));
    writeFileSync(chainConfigPath, chainConfigJson);
    chainConfig = chainConfigPath;
  }

  const ip = '0.0.0.0';

  let port = config.fuelCorePort;

  if (!port) {
    port = await getPort({ port: 4000 });
  }

  // This is the private key of the `consensus.PoA.signing_key` in `defaultChainConfig.ts`.
  // This key is responsible for validating the transactions.
  const consensusKey = '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298';

  const flags = [
    'fuels-core',
    'run',
    ['--ip', ip],
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
    const command = config.useSystemFuelCore ? 'fuel-core' : './node_modules/.bin/fuels-core';
    const childProcess = spawn(command, flags, { stdio: 'pipe' });

    const killNode = () => {
      kill(Number(childProcess.pid));
    };

    process.on('beforeExit', killNode);
    process.on('uncaughtException', killNode);

    childProcess.stderr?.pipe(process.stdout);
    childProcess.stdout?.pipe(process.stdout);

    childProcess.stderr?.on('data', (data) => {
      if (/Binding GraphQL provider to/.test(data)) {
        childProcess.stderr.removeAllListeners();
        resolve({ childProcess, ip, port });
      }
    });

    childProcess.on('error', reject);
  });
}
