/* eslint-disable import/no-extraneous-dependencies */

import { DEVNET_NETWORK_URL } from '@internal/utils';
import { WalletUnlocked, bn, Provider } from 'fuels';
import { launchTestNode, TestAssetId } from 'fuels/test-utils';
import { bench } from 'vitest';

import type { CounterContract, CallTestContract } from '../test/typegen/contracts';
import {
  CounterContractFactory,
  CallTestContractFactory,
  PythContractFactory,
} from '../test/typegen/contracts';

import { isDevnet, runBenchmark } from './config';

/**
 * @group node
 * @group browser
 */
describe('Contract Interaction Benchmarks', () => {
  let contract: CounterContract;
  let callTestContract: CallTestContract;
  let wallet: WalletUnlocked;
  let cleanup: () => void;

  const setupTestEnvironment = async () => {
    if (isDevnet) {
      const provider = await Provider.create(DEVNET_NETWORK_URL);
      wallet = new WalletUnlocked(process.env.DEVNET_WALLET_PVT_KEY as string, provider);

      const { waitForResult } = await CounterContractFactory.deploy(wallet);
      contract = (await waitForResult()).contract;

      const { waitForResult: waitForResultCallTestContract } =
        await CallTestContractFactory.deploy(wallet);
      callTestContract = (await waitForResultCallTestContract()).contract;
    } else {
      const launched = await launchTestNode({
        contractsConfigs: [
          { factory: CounterContractFactory },
          { factory: CallTestContractFactory },
        ],
      });

      cleanup = launched.cleanup;
      contract = launched.contracts[0];
      callTestContract = launched.contracts[1];
      wallet = launched.wallets[0];
    }
  };

  beforeAll(setupTestEnvironment);

  afterAll(() => {
    if (!isDevnet && cleanup) {
      cleanup();
    }
  });

  runBenchmark('should successfully execute a contract read function', async () => {
    const tx = await contract.functions.get_count().call();
    const { value } = await tx.waitForResult();
    expect(value).toBeDefined();
  });

  runBenchmark('should successfully execute a contract multi call', async () => {
    const initialValue = 100;
    const tx = await contract
      .multiCall([
        contract.functions.increment_counter(initialValue),
        contract.functions.get_count(),
      ])
      .call();
    const { value } = await tx.waitForResult();
    expect(value).toBeDefined();
  });

  runBenchmark('should successfully write to a contract', async () => {
    const tx = await contract.functions.increment_counter(100).call();
    await tx.waitForResult();
  });

  runBenchmark('should successfully execute a contract mint', async () => {
    const tx = await callTestContract.functions.mint_coins(TestAssetId.A.value, bn(100)).call();
    await tx.waitForResult();
  });

  runBenchmark('should successfully execute a contract deploy', async () => {
    const factory = new CounterContractFactory(wallet);
    const { waitForResult } = await factory.deploy();
    const { contract: deployedContract } = await waitForResult();
    expect(deployedContract).toBeDefined();
  });

  bench('should successfully execute a contract deploy as blobs', async () => {
    const factory = new PythContractFactory(wallet);
    const { waitForResult } = await factory.deployAsBlobTx({
      chunkSizeMultiplier: 0.9,
    });
    const { contract: deployedContract } = await waitForResult();
    expect(deployedContract).toBeDefined();
  });
});
