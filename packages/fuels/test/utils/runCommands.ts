import { join } from 'path';

import { run } from '../../src/cli';

export const fixtures = join(__dirname, '..', 'fixtures');
export const workspace = join(fixtures, 'project');
export const output = join(fixtures, 'types');
export const fuelsConfig = join(fixtures, 'fuels.config.ts');

export async function runInit() {
  const argv = [
    'node',
    'fuels',
    'init',
    ['-w', workspace],
    ['-o', output],
    ['-p', fixtures],
    '--silent',
  ].flat();
  await run(argv);

  return { argv };
}
