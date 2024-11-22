import { execSync, execFileSync, spawn } from 'child_process';
import { mkdirSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import { deferPromise, randomUUID } from '../../src';
import { findChildProcessPid } from '../utils/findChildProcessPid';
import { isProcessRunning } from '../utils/isProcessRunning';

function runInit() {
  const fuelsPath = path.join(process.cwd(), 'packages/fuels');

  const init = path.join(tmpdir(), '.fuels', 'tests', randomUUID());

  mkdirSync(init, { recursive: true });

  execFileSync('pnpm', ['init'], { cwd: init });
  execFileSync('pnpm', ['link', fuelsPath], { cwd: init });

  const contractDir = path.join(init, 'contract');
  const outputDir = path.join(init, 'output');
  mkdirSync(contractDir);
  mkdirSync(outputDir);

  execSync(`${process.env.FORC_PATH} init`, { cwd: contractDir });
  execSync(`pnpm fuels init -o ${outputDir} -c ${contractDir} --fuel-core-port 0`, { cwd: init });

  return {
    init,
    [Symbol.dispose]: () => {
      rmSync(init, { recursive: true });
    },
  };
}

/**
 * @group node
 */
describe('dev', () => {
  it(
    'cleans up resources on graceful shutdown',
    async () => {
      using paths = runInit();

      const devProcess = spawn('pnpm fuels dev', {
        shell: 'bash',
        detached: true,
        cwd: paths.init,
      });

      const devCompleted = deferPromise();

      devProcess.stdout.on('data', (chunk) => {
        const text = chunk.toString();
        if (text.indexOf('Dev completed successfully!') !== -1) {
          devCompleted.resolve(undefined);
        }
      });

      await devCompleted.promise;

      const devExited = deferPromise();
      devProcess.on('exit', () => {
        devExited.resolve(undefined);
      });

      const devPid = devProcess.pid as number;

      const fuelCorePid = findChildProcessPid(devPid, 'fuel-core') as number;

      process.kill(-devPid, 'SIGINT');

      await devExited.promise;

      expect(isProcessRunning(fuelCorePid)).toBe(false);
    },
    { timeout: 15000 }
  );
});
