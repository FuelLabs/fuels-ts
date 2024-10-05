import { Provider, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  Counter,
  CounterFactory,
  CounterV2,
  CounterV2Factory,
  ProxyContract,
  ProxyContractFactory,
} from '../../../test/typegen';

describe('Proxy Contracts', () => {
  it('deploys and upgrades a contracts using a proxy', async () => {
    using launched = await launchTestNode();

    const {
      provider: testProvider,
      wallets: [testWallet],
    } = launched;
    const providerUrl = testProvider.url;
    const WALLET_PVT_KEY = testWallet.privateKey;

    // #region proxy-2
    // #import { Provider, Wallet };
    // #context import { WALLET_PVT_KEY } from 'path/to/my/env/file';
    // #context import { CounterFactory, Counter, ProxyFactory, CounterV2Factory } from 'path/to/typegen/outputs';

    const provider = await Provider.create(providerUrl);
    const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

    const counterContractFactory = new CounterFactory(wallet);
    const { waitForResult: waitForCounterContract } = await counterContractFactory.deploy();
    const { contract: counterContract } = await waitForCounterContract();
    // #endregion proxy-2

    // #region proxy-3
    // It is important to pass the pass all storage slots to the proxy in order to initialize the storage slots.
    const storageSlots = Counter.storageSlots.concat(ProxyContract.storageSlots);

    // These configurables are specific to our recommended SRC14 compliant contract. They must be passed on deploy
    // and then `initialize_proxy` must be called to setup the proxy contract.
    const configurableConstants = {
      INITIAL_TARGET: { bits: counterContract.id.toB256() },
      INITIAL_OWNER: { Initialized: { Address: { bits: wallet.address.toB256() } } },
    };

    const proxyContractFactory = new ProxyContractFactory(wallet);
    const { waitForResult: waitForProxyContract } = await proxyContractFactory.deploy({
      storageSlots,
      configurableConstants,
    });
    const { contract: proxyContract } = await waitForProxyContract();

    const { waitForResult: waitForProxyInit } = await proxyContract.functions
      .initialize_proxy()
      .call();
    await waitForProxyInit();
    // #endregion proxy-3

    // #region proxy-4
    // Make sure to use only the contract ID of the proxy when instantiating the contract
    // as this will remain static even with future upgrades.
    const initialContract = new Counter(proxyContract.id, wallet);

    const { waitForResult: waitForIncrement } = await initialContract.functions
      .increment_counter(1)
      .call();
    await waitForIncrement();

    const { value: count } = await initialContract.functions.get_count().get();
    // #endregion proxy-4

    // #region proxy-6
    const { waitForResult: waitForCounterContractV2 } = await CounterV2Factory.deploy(wallet);
    const { contract: counterContractV2 } = await waitForCounterContractV2();

    const { waitForResult: waitForUpdateTarget } = await proxyContract.functions
      .set_proxy_target({ bits: counterContractV2.id.toB256() })
      .call();

    await waitForUpdateTarget();
    // #endregion proxy-6

    // #region proxy-7
    // Again, we are instantiating the contract with the same proxy ID but using a new contract instance.
    const upgradedContract = new CounterV2(proxyContract.id, wallet);
    const { waitForResult: waitForSecondIncrement } = await upgradedContract.functions
      .increment_counter(1)
      .call();
    await waitForSecondIncrement();

    const { value: increments } = await upgradedContract.functions.get_increments().get();
    const { value: secondCount } = await upgradedContract.functions.get_count().get();
    // #endregion proxy-7

    expect(count.toNumber()).toBe(1);
    expect(secondCount.toNumber()).toBe(2);
    expect(increments.toNumber()).toBe(1);
  });
});
