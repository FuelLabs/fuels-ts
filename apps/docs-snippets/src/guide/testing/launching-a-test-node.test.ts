import { AssetId, launchTestNode } from 'fuels/test-utils';
import { join } from 'path';

const pathToContractRootDir = join(__dirname, '../../test/fixtures/simple-contract');
describe('launching a test node', () => {
  test('simple contract deployment', async () => {
    // #region deploy-contract
    using launched = await launchTestNode({
      deployContracts: [pathToContractRootDir],
    });

    const {
      contracts: [contract],
      provider,
      wallets,
    } = launched;

    const response = await contract.functions.test_function().call();
    // #endregion deploy-contract
    expect(response.value).toBe(true);
    expect(provider).toBeDefined();
    expect(wallets).toBeDefined();
  });

  test('multiple contracts and wallets', async () => {
    // #region multiple-contracts-and-wallets
    using launched = await launchTestNode({
      walletConfig: {
        count: 2,
        assets: [AssetId.A, AssetId.B],
        coinsPerAsset: 2,
        amountPerCoin: 1_000,
      },
      deployContracts: [
        pathToContractRootDir,
        { contractDir: pathToContractRootDir, walletIndex: 1, options: { storageSlots: [] } },
      ],
    });

    const {
      contracts: [contract1, contract2],
      wallets: [wallet1, wallet2],
    } = launched;
    // #endregion multiple-contracts-and-wallets

    expect(contract1).toBeDefined();
    expect(contract2).toBeDefined();
    expect(contract1.account).toEqual(wallet1);
    expect(contract2.account).toEqual(wallet2);
  });

  test('configuring custom fuel-core args', async () => {
    // #region custom-fuel-core-args
    process.env.DEFAULT_FUEL_CORE_ARGS = `--tx-max-depth 20`;

    using launched = await launchTestNode();
    // #endregion custom-fuel-core-args

    const { provider } = launched;

    expect(provider.getNode().maxDepth.toNumber()).toEqual(20);
    process.env.DEFAULT_FUEL_CORE_ARGS = '';
  });

  test('configuring a base chain config', async () => {
    const chainConfigPath = join(
      __dirname,
      '../../../../',
      '.fuel-core',
      'configs',
      'chainConfig.json'
    );

    // #region custom-chain-config
    process.env.DEFAULT_CHAIN_CONFIG_PATH = chainConfigPath;

    using launched = await launchTestNode();
    // #endregion custom-chain-config

    const { provider } = launched;

    const { name } = await provider.fetchChain();

    expect(name).toEqual('local_testnet');
  });
});
