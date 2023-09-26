import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'shelljs';

import type { UserFuelsConfig } from '../../src/index';

export async function createConfigFile(path: string, config: UserFuelsConfig) {
  mkdir('-p', path);
  await writeFile(
    join(path, './fuels.config.ts'),
    [
      `import { createConfig } from '../../src';`,
      '',
      `export default createConfig(${JSON.stringify(config, null, 2)});`,
    ].join('\n')
  );
}

export async function createConfigFileWithHooks(path: string, config: UserFuelsConfig) {
  mkdir('-p', path);
  await writeFile(
    join(path, './fuels.config.ts'),
    [
      `import { createConfig } from '../../src';`,
      `import hooks from '../utils/hooks';`,
      '',
      `export default createConfig({
        ...${JSON.stringify(config, null, 2)},
        onSuccess: hooks.onSuccess,
        onFailure: hooks.onFailure,
      });`,
    ].join('\n')
  );
}
