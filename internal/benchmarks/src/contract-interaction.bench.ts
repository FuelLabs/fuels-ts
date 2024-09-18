/* eslint-disable import/no-extraneous-dependencies */

import { WalletUnlocked, bn, Provider } from 'fuels';
import { launchTestNode, TestAssetId } from 'fuels/test-utils';
import { bench } from 'vitest';

import type { CounterContract, CallTestContract } from '../test/typegen/contracts';
import {
  CounterContractFactory,
  CallTestContractFactory,
  PythContractFactory,
} from '../test/typegen/contracts';

import { DEVNET_CONFIG } from './config';
/**
 * @group node
 * @group browser
 */
describe('Contract Interaction Benchmarks', () => {
  let contract: CounterContract;
  let callTestContract: CallTestContract;
  let wallet: WalletUnlocked;
  let cleanup: () => void;
  const isDevnet = process.env.DEVNET_WALLET_PVT_KEY !== undefined;

  if (isDevnet) {
    beforeAll(async () => {
      const { networkUrl } = DEVNET_CONFIG;
      const provider = await Provider.create(networkUrl);
      wallet = new WalletUnlocked(process.env.DEVNET_WALLET_PVT_KEY as string, provider);

      const { waitForResult } = await CounterContractFactory.deploy(wallet);
      const { contract: contractDeployed } = await waitForResult();

      contract = contractDeployed;

      const { waitForResult: waitForResultCallTestContract } =
        await CallTestContractFactory.deploy(wallet);
      const { contract: callTestContractDeployed } = await waitForResultCallTestContract();

      callTestContract = callTestContractDeployed;
    });
  } else {
    beforeEach(async () => {
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
    });

    afterEach(() => {
      cleanup();
    });
  }

  bench(
    isDevnet
      ? 'should successfully execute a contract read function'
      : 'should successfully execute a contract read function 10 times',
    async () => {
      if (isDevnet) {
        const tx = await contract.functions.get_count().call();

        const { value } = await tx.waitForResult();

        expect(value).toBeDefined();
      } else {
        for (let i = 0; i < 10; i++) {
          const tx = await contract.functions.get_count().call();

          const { value } = await tx.waitForResult();

          expect(JSON.stringify(value)).toEqual(JSON.stringify(bn(0)));
        }
      }
    }
  );

  bench(
    isDevnet
      ? 'should successfully execute a contract multi call'
      : 'should successfully execute a contract multi call 10 times',
    async () => {
      const initialValue = 100;
      if (isDevnet) {
        const tx = await contract
          .multiCall([
            contract.functions.increment_counter(initialValue),
            contract.functions.get_count(),
          ])
          .call();

        const { value } = await tx.waitForResult();

        expect(value).toBeDefined();
      } else {
        for (let i = 1; i < 11; i++) {
          const tx = await contract
            .multiCall([contract.functions.increment_counter(100), contract.functions.get_count()])
            .call();

          const { value } = await tx.waitForResult();

          expect(JSON.stringify(value)).toEqual(
            JSON.stringify([bn(initialValue * i), bn(initialValue * i)])
          );
        }
      }
    }
  );

  bench(
    isDevnet
      ? 'should successfully write to a contract'
      : 'should successfully write to a contract 10 times',
    async () => {
      if (isDevnet) {
        const tx = await contract.functions.increment_counter(100).call();
        await tx.waitForResult();
      } else {
        for (let i = 0; i < 10; i++) {
          const tx = await contract.functions.increment_counter(100).call();
          await tx.waitForResult();
        }
      }
    }
  );

  bench(
    isDevnet
      ? 'should successfully execute a contract mint'
      : 'should successfully execute a contract mint 10 times',
    async () => {
      if (isDevnet) {
        const tx = await callTestContract.functions.mint_coins(TestAssetId.A.value, bn(100)).call();
        await tx.waitForResult();
      } else {
        for (let i = 0; i < 10; i++) {
          const tx = await callTestContract.functions
            .mint_coins(TestAssetId.A.value, bn(100))
            .call();
          await tx.waitForResult();
        }
      }
    }
  );

  bench(
    isDevnet
      ? 'should successfully execute a contract deploy'
      : 'should successfully execute a contract deploy 10 times',
    async () => {
      if (isDevnet) {
        const factory = new CounterContractFactory(wallet);
        const { waitForResult } = await factory.deploy();
        const { contract: deployedContract } = await waitForResult();

        expect(deployedContract).toBeDefined();
      } else {
        for (let i = 0; i < 10; i++) {
          const factory = new CounterContractFactory(wallet);
          const { waitForResult } = await factory.deploy();
          const { contract: deployedContract } = await waitForResult();

          expect(deployedContract).toBeDefined();
        }
      }
    }
  );

  bench('should successfully execute a contract deploy as blobs', async () => {
    const factory = new PythContractFactory(wallet);
    const { waitForResult } = await factory.deployAsBlobTx({
      chunkSizeMultiplier: 0.9,
    });
    const { contract: deployedContract } = await waitForResult();

    expect(deployedContract).toBeDefined();
  });
});
