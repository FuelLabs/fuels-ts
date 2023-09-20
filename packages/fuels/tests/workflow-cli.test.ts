import { Provider } from '@fuel-ts/providers';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { existsSync } from 'fs';
import fs, { readFile } from 'fs/promises';
import { join } from 'path';
import rimraf from 'rimraf';

import { Commands, FUEL_NETWORK_URL } from '../src';
import { run } from '../src/cli';

import { createConfigFile } from './utils/createConfigFile';

describe('Contracts Scripts', () => {
  let wallet: WalletUnlocked;
  const tempPath = join(__dirname, 'generated');
  const templatePath = join(__dirname, 'template');

  const cleanup = () => {
    rimraf.sync(tempPath);
  };

  beforeEach(async () => {
    cleanup();
    const provider = await Provider.create(FUEL_NETWORK_URL);
    wallet = await generateTestWallet(provider, [[1_000_000]]);
  });

  afterEach(() => {
    // cleanup();
    jest.clearAllMocks();
  });

  async function runCommand(command: string) {
    const argv = ['node', 'fuels', command, '-p', tempPath];
    await run(argv);
  }

  test('should run build command', async () => {
    await fs.cp(templatePath, tempPath, {
      recursive: true,
    });
    await createConfigFile(tempPath, {
      workspace: './project',
      output: './types',
    });
    await runCommand(Commands.build);
    expect(existsSync(join(tempPath, './project/bar/out'))).toBeTruthy();
    expect(existsSync(join(tempPath, './project/predicate/out'))).toBeTruthy();
    expect(existsSync(join(tempPath, './project/script/out'))).toBeTruthy();
  });

  test('should run types command', async () => {
    await fs.cp(templatePath, tempPath, {
      recursive: true,
    });
    await createConfigFile(tempPath, {
      workspace: './project',
      output: './types',
    });
    await runCommand(Commands.build);
    await runCommand(Commands.types);
    expect(existsSync(join(tempPath, './types/index.ts'))).toBeTruthy();
    expect(
      existsSync(join(tempPath, './types/contracts/factories/BarFooAbi__factory.ts'))
    ).toBeTruthy();
    expect(
      existsSync(join(tempPath, './types/contracts/factories/FooBarAbi__factory.ts'))
    ).toBeTruthy();
    expect(
      existsSync(join(tempPath, './types/predicates/factories/PredicateTrueAbi__factory.ts'))
    ).toBeTruthy();
    expect(
      existsSync(join(tempPath, './types/scripts/factories/ScriptTrueAbi__factory.ts'))
    ).toBeTruthy();
  });

  test('should run deploy command', async () => {
    await fs.cp(templatePath, tempPath, {
      recursive: true,
    });
    await createConfigFile(tempPath, {
      deployConfig: {
        gasPrice: 1,
      },
      privateKey: wallet.privateKey,
      workspace: './project',
      output: './types',
    });
    const stdoutSpy = jest.spyOn(process.stdout, 'write');
    await runCommand(Commands.build);
    await runCommand(Commands.deploy);
    const output = stdoutSpy.mock.calls.reduce((o, call) => {
      const [message] = call;
      return `${o}${message.toString()}`;
    }, '');
    expect(output.match(/Contract successfully deployed/gi)).toHaveLength(2);
    const contractsFile = await readFile(join(tempPath, './types/contracts.json'));
    const contracts = JSON.parse(contractsFile.toString());
    expect(contracts.fooBar).toBeTruthy();
    expect(contracts.fooBar).toBeTruthy();
  });

  test('should run build, deploy and types on flow command', async () => {
    await fs.cp(templatePath, tempPath, {
      recursive: true,
    });
    await createConfigFile(tempPath, {
      deployConfig: {
        gasPrice: 1,
      },
      privateKey: wallet.privateKey,
      workspace: './project',
      output: './types',
    });
    const stdoutSpy = jest.spyOn(process.stdout, 'write');
    await runCommand(Commands.flow);
    const output = stdoutSpy.mock.calls.reduce((o, call) => {
      const [message] = call;
      return `${o}${message.toString()}`;
    }, '');
    expect(existsSync(join(tempPath, './project/bar/out'))).toBeTruthy();
    expect(existsSync(join(tempPath, './types/index.ts'))).toBeTruthy();
    expect(output.match(/Contract successfully deployed/gi)).toHaveLength(2);
    const contractsFile = await readFile(join(tempPath, './types/contracts.json'));
    const contracts = JSON.parse(contractsFile.toString());
    expect(contracts.fooBar).toBeTruthy();
    expect(contracts.fooBar).toBeTruthy();
  });
});
