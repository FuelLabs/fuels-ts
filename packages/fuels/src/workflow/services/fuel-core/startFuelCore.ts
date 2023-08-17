import type { ChildProcessWithoutNullStreams } from 'child_process';
import { spawn } from 'child_process';
import { join } from 'path';
import kill from 'tree-kill';

import type { LoadedConfig } from '../../types';
import { logSection } from '../../utils';

export async function startFuelCore(config: LoadedConfig): Promise<ChildProcessWithoutNullStreams> {
  logSection('Starting node...');

  const defaultChainConfig = join(__dirname);
  const chainConfig = config?.chainConfig ?? defaultChainConfig;

  const flags = [
    'fuels-core',
    'run',
    ['--ip', '127.0.0.1'],
    ['--port', '4000'],
    ['--db-path', join(config.basePath, '.fuel-core')],
    ['--min-gas-price', '0'],
    ['--poa-instant', 'true'],
    ['--consensus-key', '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298'],
    ['--chain', chainConfig],
    '--vm-backtrace',
    '--utxo-validation',
    '--manual_blocks_enabled',
  ].flat();

  return new Promise((resolve, reject) => {
    const subProcess = spawn('pnpm', flags, { stdio: 'pipe' });

    const killNode = () => {
      kill(Number(subProcess.pid));
    };

    process.on('unhandledRejection', killNode);
    process.on('uncaughtExceptionMonitor', killNode);
    process.on('rejectionHandled', killNode);
    process.on('beforeExit', killNode);
    process.on('uncaughtException', killNode);
    process.on('SIGINT', killNode);

    subProcess.stderr?.pipe(process.stdout);
    subProcess.stdout?.pipe(process.stdout);

    subProcess.stderr?.on('data', (data) => {
      if (/Binding GraphQL provider to/.test(data)) {
        resolve(subProcess);
      }
    });

    subProcess.on('error', reject);
  });
}
