import type { JsonAbi } from '@fuel-ts/abi-coder';
import { Provider } from '@fuel-ts/account';
import * as setupTestProviderAndWalletsMod from '@fuel-ts/account/test-utils';
import { randomBytes, randomUUID } from '@fuel-ts/crypto';
import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError, safeExec } from '@fuel-ts/errors/test-utils';
import { hexlify, type SnapshotConfigs } from '@fuel-ts/utils';
import { getForcProject, waitUntilUnreachable } from '@fuel-ts/utils/test-utils';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'fs';
import { writeFile, copyFile } from 'fs/promises';
import os from 'os';
import { join } from 'path';

import ContractFactory from '../contract-factory';

import { launchTestNode } from './launch-test-node';

const { binHexlified, abiContents } = getForcProject<JsonAbi>({
  projectDir: join(__dirname, '../../test/fixtures/forc-projects/simple-contract'),
  projectName: 'simple-contract',
  build: 'release',
});
async function generateChainConfigFile(chainName: string): Promise<[string, () => void]> {
  const configsFolder = join(__dirname, '../../../../', '.fuel-core', 'configs');

  const chainMetadata = JSON.parse(
    readFileSync(join(configsFolder, 'metadata.json'), 'utf-8')
  ) as SnapshotConfigs['metadata'];

  const chainConfig = JSON.parse(
    readFileSync(join(configsFolder, chainMetadata.chain_config), 'utf-8')
  ) as SnapshotConfigs['chainConfig'];

  chainConfig.chain_name = chainName;

  const tempSnapshotDirPath = join(os.tmpdir(), '.fuels-ts', randomUUID());

  if (!existsSync(tempSnapshotDirPath)) {
    mkdirSync(tempSnapshotDirPath, { recursive: true });
  }

  const metadataPath = join(tempSnapshotDirPath, 'metadata.json');

  await copyFile(join(configsFolder, 'metadata.json'), metadataPath);
  await copyFile(
    join(configsFolder, chainMetadata.table_encoding.Json.filepath),
    join(tempSnapshotDirPath, chainMetadata.table_encoding.Json.filepath)
  );

  // Write a temporary chain configuration file.
  await writeFile(
    join(tempSnapshotDirPath, chainMetadata.chain_config),
    JSON.stringify(chainConfig),
    'utf-8'
  );

  return [tempSnapshotDirPath, () => rmSync(tempSnapshotDirPath, { recursive: true, force: true })];
}

/**
 * @group node
 */
describe('launchTestNode', () => {
  test('kills the node after going out of scope', async () => {
    let url = '';

    {
      using launched = await launchTestNode();

      const { provider } = launched;

      url = provider.url;
      await provider.getBlockNumber();
    }

    await waitUntilUnreachable(url);

    const { error } = await safeExec(async () => {
      const p = await Provider.create(url);
      await p.getBlockNumber();
    });

    expect(error).toMatchObject({
      message: 'fetch failed',
    });
  });

  test('kills the node if error happens post-launch on contract deployment', async () => {
    const spy = vi.spyOn(setupTestProviderAndWalletsMod, 'setupTestProviderAndWallets');

    const { error } = await safeExec(() =>
      launchTestNode({
        contractsConfigs: [
          {
            factory: {
              deploy: () => {
                throw new Error('Test error');
              },
            },
          },
        ],
      })
    );
    expect(error).toBeDefined();
    // Verify that error isn't due to
    expect(spy).toHaveBeenCalled();

    const {
      provider: { url },
    } = await spy.mock.results[0].value;

    // test will time out if the node isn't killed
    await waitUntilUnreachable(url);
  });

  test('a contract can be deployed', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: {
            deploy: async (wallet, options) => {
              const factory = new ContractFactory(binHexlified, abiContents, wallet);
              return factory.deploy(options);
            },
          },
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    const { waitForResult } = await contract.functions.test_function().call();
    const response = await waitForResult();
    expect(response.value).toBe(true);
  });

  test('a contract can be deployed by passing the static factory method directly', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deploy: async (wallet, options) => {
            const factory = new ContractFactory(binHexlified, abiContents, wallet);
            return factory.deploy(options);
          },
        },
      ],
    });

    const {
      contracts: [contract],
      wallets: [wallet],
    } = launched;

    const { waitForResult } = await contract.functions.test_function().call();
    const response = await waitForResult();
    expect(response.value).toBe(true);

    expect(contract.account).toEqual(wallet);
  });

  test('multiple contracts can be deployed', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deploy: async (wallet, options) => {
            const factory = new ContractFactory(binHexlified, abiContents, wallet);
            return factory.deploy(options);
          },
        },
        {
          factory: {
            deploy: async (wallet, options) => {
              const factory = new ContractFactory(binHexlified, abiContents, wallet);
              return factory.deploy(options);
            },
          },
        },
      ],
    });

    const {
      contracts: [contract, contract2],
    } = launched;

    const { waitForResult: waitForResult1 } = await contract.functions.test_function().call();
    const { waitForResult: waitForResult2 } = await contract2.functions.test_function().call();

    const response1 = await waitForResult1();
    const response2 = await waitForResult2();

    expect(response1.value).toBe(true);
    expect(response2.value).toBe(true);
  });

  test('multiple contracts can be deployed with different wallets', async () => {
    using launched = await launchTestNode({
      walletsConfig: {
        count: 2,
      },
      contractsConfigs: [
        {
          factory: {
            deploy: async (wallet, options) => {
              const factory = new ContractFactory(binHexlified, abiContents, wallet);
              return factory.deploy(options);
            },
          },
        },
        {
          factory: {
            deploy: async (wallet, options) => {
              const factory = new ContractFactory(binHexlified, abiContents, wallet);
              return factory.deploy(options);
            },
          },
          walletIndex: 1,
        },
      ],
    });

    const {
      contracts: [contract1, contract2],
      wallets: [wallet1, wallet2],
    } = launched;

    const { waitForResult: waitForResult1 } = await contract1.functions.test_function().call();
    const { waitForResult: waitForResult2 } = await contract2.functions.test_function().call();

    const contract1Response = await waitForResult1();
    const contract2Response = await waitForResult2();

    expect(contract1Response.value).toBe(true);
    expect(contract2Response.value).toBe(true);

    expect(contract1.account).toEqual(wallet1);
    expect(contract2.account).toEqual(wallet2);
  });

  test('throws on invalid walletIndex', async () => {
    await expectToThrowFuelError(
      async () => {
        await launchTestNode({
          contractsConfigs: [
            {
              factory: {
                deploy: async (wallet, options) => {
                  const factory = new ContractFactory(binHexlified, abiContents, wallet);
                  return factory.deploy(options);
                },
              },
              walletIndex: 2,
            },
          ],
        });
      },
      {
        code: FuelError.CODES.INVALID_INPUT_PARAMETERS,
        message: `Invalid walletIndex 2; wallets array contains 2 elements.`,
      }
    );
  });

  test('can be given different fuel-core args via an environment variable', async () => {
    process.env.DEFAULT_FUEL_CORE_ARGS = `--tx-max-depth 20`;

    using launched = await launchTestNode();

    const { provider } = launched;

    expect(provider.getNode().maxDepth.toNumber()).toEqual(20);
    process.env.DEFAULT_FUEL_CORE_ARGS = '';
  });

  test('can be given a different base chain config via an environment variable', async () => {
    const chainName = 'gimme_fuel';
    const [chainConfigPath, cleanup] = await generateChainConfigFile(chainName);

    process.env.DEFAULT_CHAIN_SNAPSHOT_DIR = chainConfigPath;

    using launched = await launchTestNode();
    cleanup();
    process.env.DEFAULT_CHAIN_SNAPSHOT_DIR = '';

    const { provider } = launched;

    const { name } = await provider.fetchChain();

    expect(name).toEqual(chainName);
  });

  test('chain config from environment variable can be extended manually', async () => {
    const chainName = 'gimme_fuel_gimme_fire_gimme_that_which_i_desire';
    const [chainMetadataPath, cleanup] = await generateChainConfigFile(chainName);
    process.env.DEFAULT_CHAIN_SNAPSHOT_DIR = chainMetadataPath;

    const baseAssetId = hexlify(randomBytes(32));

    using launched = await launchTestNode({
      nodeOptions: {
        snapshotConfig: {
          chainConfig: {
            consensus_parameters: {
              V2: {
                base_asset_id: baseAssetId,
              },
            },
          },
        },
      },
    });

    cleanup();
    process.env.DEFAULT_CHAIN_SNAPSHOT_DIR = '';

    const { provider } = launched;

    const {
      name,
      consensusParameters: { baseAssetId: baseAssetIdFromChainConfig },
    } = await provider.fetchChain();
    expect(name).toEqual(chainName);
    expect(baseAssetIdFromChainConfig).toEqual(baseAssetId);
  });
});
