/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Provider } from '@fuel-ts/providers';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import { TestUtils } from '@fuel-ts/wallet';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import rimraf from 'rimraf';

describe('Contracts Scripts', () => {
  let wallet: WalletUnlocked;
  const files = [
    join(__dirname, './contracts.json'),
    join(__dirname, './contracts/foo/out'),
    join(__dirname, './contracts/bar/out'),
    join(__dirname, './types'),
  ];

  const cleanup = () => {
    files.forEach((file) => {
      rimraf.sync(file);
    });
  };

  beforeAll(async () => {
    await cleanup();
    wallet = await TestUtils.generateTestWallet(new Provider('http://localhost:4000/graphql'), [
      [1_000_000],
    ]);
  });

  afterAll(cleanup);

  test('should execute cli routine and generate files', async () => {
    await execSync(['../node_modules/.bin/ts-node', '../dist/bin.js', 'run'].join(' '), {
      cwd: join(__dirname),
      stdio: 'ignore',
      env: {
        ...process.env,
        // Override config.privateKey with environment variable PRIVATE_KEY
        PRIVATE_KEY: wallet.privateKey,
      },
    });
    files.forEach((f) => {
      expect(existsSync(f)).toEqual(true);
    });
    const contractsOutput = require('./contracts.json');
    expect(contractsOutput).toHaveProperty('CONTRACT_FOO');
    expect(contractsOutput).toHaveProperty('CONTRACT_BAR');
  });
});
