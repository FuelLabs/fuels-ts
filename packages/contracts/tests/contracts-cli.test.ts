import { Provider } from '@fuel-ts/providers';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { existsSync } from 'fs';
import fs from 'fs/promises';
import { join } from 'path';
import rimraf from 'rimraf';

import { run } from '../src/bin/cli';

import { createConfigFile } from './utils/createConfigFile';

describe('Contracts Scripts', () => {
  let wallet: WalletUnlocked;
  const tempPath = join(__dirname, './generated');
  const templatePath = join(__dirname, './template');

  const cleanup = () => {
    rimraf.sync(tempPath);
  };

  beforeAll(async () => {
    await cleanup();
    wallet = await generateTestWallet(new Provider('http://localhost:4000/graphql'), [[1_000_000]]);
  });

  // afterAll(cleanup);

  test('should execute cli routine and generate files', async () => {
    await fs.cp(templatePath, tempPath, {
      recursive: true,
    });
    await createConfigFile(tempPath, {
      contracts: [
        {
          name: 'CONTRACT_FOO',
          path: './contracts/foo',
        },
        {
          name: 'CONTRACT_BAR',
          path: './contracts/bar',
        },
      ],
      types: {
        output: './types',
      },
    });
    const argv = ['node', 'fuels-contracts', 'build', '-c', tempPath];
    await run({ argv, programName: 'cli.js:test' });
    expect(existsSync(join(tempPath, './types/index.ts'))).toBeTruthy();
    // eslint-disable-next-line no-console
    console.log(wallet);
  });
});
