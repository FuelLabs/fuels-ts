import { writeFile } from 'fs/promises';
import { join } from 'path';

import type { FuelsConfig } from '../../src/index';

export async function createConfigFile(path: string, config: FuelsConfig) {
  await writeFile(
    join(path, './fuels.config.ts'),
    [
      `import { createFuelsConfig } from '../../src';`,
      '',
      `export default createFuelsConfig(${JSON.stringify(config, null, 2)});`,
    ].join('\n')
  );
}

export async function createConfigFileWithHooks(path: string, config: FuelsConfig) {
  await writeFile(
    join(path, './fuels.config.ts'),
    [
      `import { createFuelsConfig } from '../../src';`,
      `import hooks from '../utils/hooks';`,
      '',
      `export default createFuelsConfig({
        ...${JSON.stringify(config, null, 2)},
        onSuccess: hooks.onSuccess,
        onFailure: hooks.onFailure,
      });`,
    ].join('\n')
  );
}
