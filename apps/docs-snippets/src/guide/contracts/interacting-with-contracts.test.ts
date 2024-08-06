import { Contract } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { CounterFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Interacting with Contracts', () => {
  it('should successfully use "get" to read from the blockchain', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CounterFactory,
        },
      ],
    });

    const {
      contracts: [counterContract],
      provider,
    } = launched;

    const { waitForResult } = await counterContract.functions.increment_counter(1).call();
    await waitForResult();

    const { id: contractId, interface: abi } = counterContract;

    // #region interacting-with-contracts-1
    const contract = new Contract(contractId, abi, provider);

    const { value } = await contract.functions.get_count().get();
    // #endregion interacting-with-contracts-1
    expect(value.toNumber()).toBeGreaterThanOrEqual(1);
  });

  it('should successfully use "dryRun" to validate a TX without a wallet', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CounterFactory,
        },
      ],
    });

    const {
      contracts: [counterContract],
      provider,
    } = launched;

    const { id: contractId, interface: abi } = counterContract;

    // #region interacting-with-contracts-2
    const contract = new Contract(contractId, abi, provider);

    const { value } = await contract.functions.increment_counter(1).dryRun();
    // #endregion interacting-with-contracts-2
    expect(value.toNumber()).toBeGreaterThanOrEqual(1);
  });

  it('should successfully use "simulate" to validate if wallet can pay for transaction', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CounterFactory,
        },
      ],
    });

    const {
      contracts: [counterContract],
      wallets: [fundedWallet],
    } = launched;

    const { id: contractId, interface: abi } = counterContract;

    // #region interacting-with-contracts-3
    const contract = new Contract(contractId, abi, fundedWallet);

    const { value } = await contract.functions.increment_counter(10).simulate();
    // #endregion interacting-with-contracts-3
    expect(value.toNumber()).toBeGreaterThanOrEqual(10);
  });

  it('should successfully execute a contract call without a wallet [call]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CounterFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region interacting-with-contracts-4
    const { transactionId, waitForResult } = await contract.functions.increment_counter(10).call();

    const { value } = await waitForResult();
    // #endregion interacting-with-contracts-4

    expect(transactionId).toBeDefined();
    expect(value.toNumber()).toBeGreaterThanOrEqual(10);
  });

  it('should successfully execute a contract call without a wallet [call]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CounterFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region interacting-with-contracts-5
    const { waitForResult } = await contract.functions.increment_counter(10).call();
    const { value } = await waitForResult();
    // #endregion interacting-with-contracts-5

    expect(value.toNumber()).toBeGreaterThanOrEqual(10);
  });
});
