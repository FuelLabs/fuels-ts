import type { BN } from 'fuels';
import { AssetId, launchTestNode } from 'fuels/test-utils';
import { join } from 'path';

import { CounterAbi__factory } from '../../../test/typegen/contracts';
import counterContractBytecode from '../../../test/typegen/contracts/CounterAbi.hex';

/**
 * @group node
 */
describe('launching a test node', () => {
  test('simple contract deployment', async () => {
    // #region deploy-contract
    // #import { launchTestNode };

    using launched = await launchTestNode({
      deployContracts: [
        {
          deployer: CounterAbi__factory,
          bytecode: counterContractBytecode,
        },
      ],
    });

    const {
      contracts: [contract],
      provider,
      wallets,
    } = launched;

    const response = await contract.functions.count().call();
    // #endregion deploy-contract
    expect((response.value as BN).toNumber()).toBe(0);
    expect(provider).toBeDefined();
    expect(wallets).toBeDefined();
  });

  test('multiple contracts and wallets', async () => {
    // #region multiple-contracts-and-wallets
    // #import { launchTestNode, AssetId };

    // #context const contractRootDirPath = 'full-path-to-contract-root-dir';

    using launched = await launchTestNode({
      walletConfig: {
        count: 2,
        assets: AssetId.random(2),
        coinsPerAsset: 2,
        amountPerCoin: 1_000_000,
      },
      deployContracts: [
        {
          deployer: CounterAbi__factory,
          bytecode: counterContractBytecode,
        },
        {
          deployer: CounterAbi__factory,
          bytecode: counterContractBytecode,
          walletIndex: 1,
          options: { storageSlots: [] },
        },
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
    const snapshotDirPath = join(__dirname, '../../../../../', '.fuel-core', 'configs');

    // #region custom-chain-config
    process.env.DEFAULT_CHAIN_SNAPSHOT_DIR = snapshotDirPath;

    using launched = await launchTestNode();
    // #endregion custom-chain-config

    const { provider } = launched;

    const { name } = await provider.fetchChain();

    expect(name).toEqual('local_testnet');
  });
});
