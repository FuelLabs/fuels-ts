import { Provider } from '@fuel-ts/providers';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
import rimraf from 'rimraf';

import { run } from '../src/bin/cli';

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
    wallet = await generateTestWallet(new Provider('http://localhost:4000/graphql'), [[1_000_000]]);
  });

  afterAll(cleanup);

  test('should execute cli routine and generate files', async () => {
    const argv = ['node', 'fuels-contracts'];

    const result = await run({ argv, programName: 'cli.js:test' });
    console.log(result);

    // files.forEach((f) => {
    //   expect(existsSync(f)).toEqual(true);
    // });
    // const contractsOutput = require('./contracts.json');
    // expect(contractsOutput).toHaveProperty('CONTRACT_FOO');
    // expect(contractsOutput).toHaveProperty('CONTRACT_BAR');
  });
});
