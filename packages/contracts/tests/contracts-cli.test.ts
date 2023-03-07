import { Provider } from '@fuel-ts/providers';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { existsSync } from 'fs';
import fs, { readFile } from 'fs/promises';
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

  beforeEach(async () => {
    await cleanup();
    wallet = await generateTestWallet(new Provider('http://localhost:4000/graphql'), [[1_000_000]]);
  });

  afterEach(cleanup);

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
  });

  test('should execute cli routine and generate files', async () => {
    await fs.cp(templatePath, tempPath, {
      recursive: true,
    });
    await createConfigFile(tempPath, {
      privateKey: wallet.privateKey,
      providerUrl: 'http://localhost:4000/graphql',
      deployConfig: {
        gasPrice: 1,
      },
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
    const argv = ['node', 'fuels-contracts', 'run', '-c', tempPath];
    await run({ argv, programName: 'cli.js:test' });
    const contractsFile = await readFile(join(tempPath, './types/contracts.json'), 'utf-8');
    const contracts = JSON.parse(contractsFile.toString());
    expect(contracts.CONTRACT_FOO).toBeTruthy();
    expect(contracts.CONTRACT_BAR).toBeTruthy();
  });

  test('should execute cli routine and generate files', async () => {
    await fs.cp(templatePath, tempPath, {
      recursive: true,
    });
    await createConfigFile(tempPath, {
      privateKey: wallet.privateKey,
      providerUrl: 'http://localhost:4000/graphql',
      deployConfig: {
        gasPrice: 1,
      },
      contracts: [
        {
          path: './contracts/foo',
        },
        {
          path: './contracts/bar',
        },
      ],
      types: {
        output: './types',
      },
    });
    const argv = ['node', 'fuels-contracts', 'run', '-c', tempPath];
    await run({ argv, programName: 'cli.js:test' });
    expect(existsSync(join(tempPath, './types/index.ts'))).toBeTruthy();
  });
});
