/* eslint-disable import/no-extraneous-dependencies */

import type { WalletUnlocked } from 'fuels';
import { bn } from 'fuels';
import { launchTestNode, TestAssetId } from 'fuels/test-utils';
import { bench } from 'vitest';

import type { CounterContract, CallTestContract } from '../test/typegen/contracts';
import { CounterContractFactory, CallTestContractFactory } from '../test/typegen/contracts';
/**
 * @group node
 * @group browser
 */
describe('Contract Interaction Benchmarks', () => {
  let contract: CounterContract;
  let callTestContract: CallTestContract;
  let wallet: WalletUnlocked;
  let cleanup: () => void;
  beforeEach(async () => {
    const launched = await launchTestNode({
      contractsConfigs: [{ factory: CounterContractFactory }, { factory: CallTestContractFactory }],
    });

    cleanup = launched.cleanup;
    contract = launched.contracts[0];
    callTestContract = launched.contracts[1];
    wallet = launched.wallets[0];
  });

  afterEach(() => {
    cleanup();
  });

  bench('should successfully execute a contract read function', async () => {
    const tx = await contract.functions.get_count().call();

    const { value } = await tx.waitForResult();

    expect(JSON.stringify(value)).toEqual(JSON.stringify(bn(0)));
  });

  bench('should successfully execute a contract multi call', async () => {
    const tx = await contract
      .multiCall([contract.functions.increment_counter(100), contract.functions.get_count()])
      .call();

    const { value } = await tx.waitForResult();

    expect(JSON.stringify(value)).toEqual(JSON.stringify([bn(100), bn(100)]));
  });

  bench('should successfully write to a contract', async () => {
    const tx = await contract.functions.increment_counter(100).call();
    await tx.waitForResult();
  });

  bench('should successfully execute a contract mint', async () => {
    const tx = await callTestContract.functions.mint_coins(TestAssetId.A.value, bn(100)).call();

    await tx.waitForResult();
  });

  bench('should successfully execute a contract deploy', async () => {
    const factory = new CounterContractFactory(wallet);
    const { waitForResult } = await factory.deploy();
    const { contract: deployedContract } = await waitForResult();

    expect(deployedContract).toBeDefined();
  });
});
