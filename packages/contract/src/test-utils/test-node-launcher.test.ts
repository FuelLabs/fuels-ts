import { Provider, sleepUntilTrue } from '@fuel-ts/account';
import { WalletConfig } from '@fuel-ts/account/test-utils';
import * as launchCustomProviderAndGetWalletsMod from '@fuel-ts/account/test-utils';
import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError, safeExec } from '@fuel-ts/errors/test-utils';
import type { ChainConfig } from '@fuel-ts/utils';
import { randomInt, randomUUID } from 'crypto';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'fs';
import { writeFile } from 'fs/promises';
import http from 'http';
import os from 'os';
import { join } from 'path';
import { parse } from 'url';

import { TestNodeLauncher } from './test-node-launcher';

const pathToContractRootDir = join(__dirname, '../../test/fixtures/simple-contract');

async function generateChainConfigFile(chainName: string): Promise<[string, () => void]> {
  const chainConfig = JSON.parse(
    readFileSync(
      join(__dirname, '../../../../', '.fuel-core', 'configs', 'chainConfig.json'),
      'utf-8'
    )
  ) as ChainConfig;

  chainConfig.chain_name = chainName;

  const tempDirPath = join(os.tmpdir(), '.fuels-ts', randomUUID());

  if (!existsSync(tempDirPath)) {
    mkdirSync(tempDirPath, { recursive: true });
  }
  const chainConfigPath = join(tempDirPath, '.chainConfig.json');

  // Write a temporary chain configuration file.
  await writeFile(chainConfigPath, JSON.stringify(chainConfig), 'utf-8');

  return [chainConfigPath, () => rmSync(tempDirPath, { recursive: true, force: true })];
}

async function urlIsLive(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const req = http.request(parse(url), () => {
      resolve(true);
    });

    req.on('error', () => resolve(false));

    req.end();
  });
}

/**
 * @group node
 */
describe('TestNodeLauncher', () => {
  test('kills the node after going out of scope', async () => {
    let url = '';

    {
      using launched = await TestNodeLauncher.launch();

      const { provider } = launched;

      url = provider.url;
      await provider.getBlockNumber();
    }
    await sleepUntilTrue(async () => !(await urlIsLive(url)));

    const { error } = await safeExec(async () => {
      const p = await Provider.create(url);
      await p.getBlockNumber();
    });

    expect(error).toMatchObject({
      message: 'fetch failed',
    });
  });

  test('kills the node if error happens post-launch', async () => {
    const launchNodeSpy = vi.spyOn(
      launchCustomProviderAndGetWalletsMod,
      'launchCustomProviderAndGetWallets'
    );

    const { error } = await safeExec(() =>
      TestNodeLauncher.launch({ deployContracts: ['invalid location'] })
    );
    expect(error).toBeDefined();
    expect(launchNodeSpy).toHaveBeenCalled();

    const {
      provider: { url },
    } = launchNodeSpy.mock.results[0].value as { provider: { url: string } };

    await sleepUntilTrue(async () => !(await urlIsLive(url)));
    expect(await urlIsLive(url)).toBe(false);
  });

  test('a contract can be deployed', async () => {
    using launched = await TestNodeLauncher.launch({
      deployContracts: [{ contractDir: pathToContractRootDir }],
    });

    const {
      contracts: [contract],
    } = launched;

    const gasPrice = contract.provider.getGasConfig().minGasPrice;

    const response = await contract.functions
      .test_function()
      .txParams({
        gasPrice,
        gasLimit: 10_000,
      })
      .call();
    expect(response.value).toBe(true);
  });

  test('a contract can be deployed by providing just the path', async () => {
    // #region deploy-contract
    using launched = await TestNodeLauncher.launch({
      deployContracts: [pathToContractRootDir],
    });

    const {
      contracts: [contract],
    } = launched;
    const gasPrice = contract.provider.getGasConfig().minGasPrice;

    const response = await contract.functions
      .test_function()
      .txParams({
        gasPrice,
        gasLimit: 10_000,
      })
      .call();
    expect(response.value).toBe(true);
    // #endregion deploy-contract
  });

  test('multiple contracts can be deployed with different wallets', async () => {
    // #region multiple-contracts-and-wallets
    using launched = await TestNodeLauncher.launch({
      walletConfig: new WalletConfig({ wallets: 2 }),
      deployContracts: [
        { contractDir: pathToContractRootDir },
        { contractDir: pathToContractRootDir, walletIndex: 1 },
      ],
    });

    const {
      contracts: [contract1, contract2],
      wallets: [wallet1, wallet2],
    } = launched;
    // #endregion multiple-contracts-and-wallets

    const gasPrice = contract1.provider.getGasConfig().minGasPrice;

    const contract1Response = (
      await contract1.functions.test_function().txParams({ gasPrice, gasLimit: 10_000 }).call()
    ).value;
    const contract2Response = (
      await contract2.functions.test_function().txParams({ gasPrice, gasLimit: 10_000 }).call()
    ).value;

    expect(contract1Response).toBe(true);
    expect(contract2Response).toBe(true);

    expect(contract1.account).toEqual(wallet1);
    expect(contract2.account).toEqual(wallet2);
  });

  test('throws on invalid walletIndex', async () => {
    await expectToThrowFuelError(
      async () => {
        await TestNodeLauncher.launch({
          deployContracts: [{ contractDir: pathToContractRootDir, walletIndex: 2 }],
        });
      },
      {
        code: FuelError.CODES.INVALID_INPUT_PARAMETERS,
        message: `Invalid walletIndex 2; wallets array contains 2 elements.`,
      }
    );
  });

  test('can be given different fuel-core args via an environment variable', async () => {
    // #region custom-fuel-core-args
    process.env.DEFAULT_FUEL_CORE_ARGS = `--tx-max-depth 20`;

    using launched = await TestNodeLauncher.launch();
    // #endregion custom-fuel-core-args

    const { provider } = launched;

    expect(provider.getNode().maxDepth.toNumber()).toEqual(20);
    process.env.DEFAULT_FUEL_CORE_ARGS = '';
  });

  test('can be given a different base chain config via an environment variable', async () => {
    const chainName = 'gimme_fuel';
    const [chainConfigPath, cleanup] = await generateChainConfigFile(chainName);

    // #region custom-chain-config
    process.env.DEFAULT_CHAIN_CONFIG_PATH = chainConfigPath;

    using launched = await TestNodeLauncher.launch();
    // #endregion custom-chain-config
    cleanup();
    process.env.DEFAULT_CHAIN_CONFIG_PATH = '';

    const { provider } = launched;

    const { name } = await provider.fetchChain();

    expect(name).toEqual(chainName);
  });

  test('chain config from environment variable can be extended manually', async () => {
    const chainName = 'gimme_fuel_gimme_fire_gimme_that_which_i_desire';
    const [chainConfigPath, cleanup] = await generateChainConfigFile(chainName);

    process.env.DEFAULT_CHAIN_CONFIG_PATH = chainConfigPath;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const max_inputs = randomInt(200);
    using launched = await TestNodeLauncher.launch({
      nodeOptions: {
        chainConfig: {
          consensus_parameters: {
            tx_params: {
              max_inputs,
            },
          },
        },
      },
    });

    cleanup();
    process.env.DEFAULT_CHAIN_CONFIG_PATH = '';

    const { provider } = launched;

    const {
      name,
      consensusParameters: { maxInputs },
    } = await provider.fetchChain();
    expect(name).toEqual(chainName);
    expect(maxInputs.toNumber()).toEqual(max_inputs);
  });
});
