import { execSync } from 'child_process';
import { randomUUID } from 'crypto';
import { mkdirSync, rmdirSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

export function runInitTemp() {
  const fuelsPath = path.join(process.cwd(), 'packages/fuels');

  const rootDir = path.join(tmpdir(), '.fuels', 'tests', randomUUID());

  mkdirSync(rootDir, { recursive: true });

  execSync('pnpm init', { cwd: rootDir });
  execSync(`pnpm link ${fuelsPath}`, { cwd: rootDir });

  const contractDir = path.join(rootDir, 'contract');
  const outputDir = path.join(rootDir, 'output');
  mkdirSync(contractDir);
  mkdirSync(outputDir);

  execSync(`${process.env.FORC_PATH} init`, { cwd: contractDir });
  execSync(`pnpm fuels init -o ${outputDir} -c ${contractDir} --fuel-core-port 0`, {
    cwd: rootDir,
  });

  return {
    rootDir,
    contractDir,
    [Symbol.dispose]: () => {
      rmdirSync(rootDir, { recursive: true });
    },
  };
}
