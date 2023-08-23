import type { ChildProcessWithoutNullStreams } from 'child_process';
import { spawn } from 'child_process';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { mkdir } from 'shelljs';
import kill from 'tree-kill';

import type { LoadedConfig } from '../../types';
import { logSection } from '../../utils';

import { defaultChainConfig } from './defaultChainConfig';

export async function startFuelCore(config: LoadedConfig): Promise<ChildProcessWithoutNullStreams> {
  logSection('Starting node...');

  const coreDir = join(config.basePath, '.fuel-core');
  const chainConfigPath = join(coreDir, 'chainConfig.json');
  const chainConfigJson = JSON.stringify(defaultChainConfig, null, 2);

  let chainConfig = config?.chainConfig;

  if (!chainConfig) {
    mkdir('-p', dirname(chainConfigPath));
    writeFileSync(chainConfigPath, chainConfigJson);
    chainConfig = chainConfigPath;
  }

  const flags = [
    'fuels-core',
    'run',
    ['--ip', '127.0.0.1'],
    ['--port', '4000'],
    ['--db-path', coreDir],
    ['--min-gas-price', '0'],
    ['--poa-instant', 'true'],
    ['--consensus-key', '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298'],
    ['--chain', chainConfig],
    '--vm-backtrace',
    '--utxo-validation',
    '--manual_blocks_enabled',
  ].flat();

  return new Promise((resolve, reject) => {
    const command = config.useSystemFuelCore ? 'fuel-core' : './node_modules/.bin/fuels-core';
    const fuelCore = spawn(command, flags, { stdio: 'pipe' });

    const killNode = () => {
      kill(Number(fuelCore.pid));
    };

    process.on('beforeExit', killNode);
    process.on('uncaughtException', killNode);

    fuelCore.stderr?.pipe(process.stdout);
    fuelCore.stdout?.pipe(process.stdout);

    fuelCore.stderr?.on('data', (data) => {
      if (/Binding GraphQL provider to/.test(data)) {
        resolve(fuelCore);
      }
    });

    fuelCore.on('error', reject);
  });
}
