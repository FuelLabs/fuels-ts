import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import type { WalletUnlocked } from 'fuels';
import { Provider, TestUtils } from 'fuels';
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
    const contractsOutput = JSON.parse(readFileSync(join(__dirname, './contracts.json'), 'utf8'));
    expect(contractsOutput).toHaveProperty('CONTRACT_FOO');
    expect(contractsOutput).toHaveProperty('CONTRACT_BAR');
  });

  test('the generated types and contracts ids should work', async () => {
    // We need to use async import here because the generated files are not available
    // before the previous test is finished
    const { CONTRACT_FOO, CONTRACT_BAR } = await import(join(__dirname, './contracts.json'));
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { FooAbi__factory, BarAbi__factory } = await import(join(__dirname, './types'));
    const foo = FooAbi__factory.connect(CONTRACT_FOO, wallet);
    const bar = BarAbi__factory.connect(CONTRACT_BAR, wallet);

    const { value: fooResult } = await foo.functions.foo().get();
    expect(fooResult.toNumber()).toEqual(12345);
    const { value: batResult } = await bar.functions.bar().get();
    expect(batResult).toEqual('0x0000000000000000000000000000000000000000000000000000000000000100');
  });
});
