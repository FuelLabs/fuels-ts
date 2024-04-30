import { Address } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { AbstractAddress, BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import { EventEmitter } from 'events';

import type { ProviderOptions } from '../src';
import { FUEL_NETWORK_URL } from '../src/configs';
import { Fuel } from '../src/connectors/fuel';
import { FuelConnectorEventType } from '../src/connectors/types';
import { Provider, TransactionStatus } from '../src/providers';
import { Wallet } from '../src/wallet';

import { MockConnector } from './fixtures/mocked-connector';
import { promiseCallback } from './fixtures/promise-callback';

/**
 * @group node
 * @group browser
 */
describe('Fuel Connector', () => {
  it('should ensure is instantiated using default connectors', async () => {
    const fuel = new Fuel();
    const connectors = await fuel.connectors();
    expect(connectors.length).toBe(0);
  });

  it('should add connector using event of a custom EventBus', async () => {
    const eventBus = new EventEmitter();
    const fuel = new Fuel({
      targetObject: eventBus,
      connectors: [],
      storage: null,
    });
    let connectors = await fuel.connectors();
    expect(connectors.length).toBe(0);

    // listen to connection event
    const onConnectors = promiseCallback();
    fuel.on(fuel.events.connectors, onConnectors);

    // Trigger event to add connector
    eventBus.emit(FuelConnectorEventType, new MockConnector());
    // wait for the event to be triggered
    await onConnectors.promise;

    connectors = await fuel.connectors();
    expect(onConnectors).toBeCalledTimes(1);
    expect(onConnectors).toBeCalledWith(connectors);
    expect(connectors.length).toBeGreaterThan(0);
    expect(connectors[0].name).toEqual('Fuel Wallet');
    expect(connectors[0].installed).toEqual(true);
  });

  it('should ensure hasConnector works just fine', async () => {
    let fuel = new Fuel({
      connectors: [new MockConnector()],
      storage: null,
    });
    let hasConnector = await fuel.hasConnector();
    expect(hasConnector).toBeTruthy();

    fuel = new Fuel({
      connectors: [],
      storage: null,
    });
    hasConnector = await fuel.hasConnector();
    expect(hasConnector).toBeFalsy();
  });

  it('should ensure isConnected works just fine', async () => {
    const fuel = new Fuel({
      connectors: [new MockConnector()],
      storage: null,
    });
    const isConnected = await fuel.isConnected();
    expect(isConnected).toBeTruthy();
  });

  it('should ensure isConnected works just fine', async () => {
    const fuel = new Fuel({
      connectors: [new MockConnector()],
      storage: null,
    });
    const isConnected = await fuel.ping();
    expect(isConnected).toBeTruthy();
  });

  it('should ensure connect works just fine', async () => {
    const fuel = new Fuel({
      storage: null,
      connectors: [new MockConnector()],
    });

    // listen to connection event
    const onConnection = promiseCallback();
    const onAccounts = promiseCallback();
    const onCurrentAccount = promiseCallback();
    fuel.on(fuel.events.connection, onConnection);
    fuel.on(fuel.events.accounts, onAccounts);
    fuel.on(fuel.events.currentAccount, onCurrentAccount);

    const isConnected = await fuel.connect();
    expect(isConnected).toBeTruthy();
    const accounts = await fuel.accounts();
    await onConnection.promise;
    await onAccounts.promise;
    await onCurrentAccount.promise;

    expect(onConnection).toBeCalledTimes(1);
    expect(onConnection).toBeCalledWith(true);
    expect(onAccounts).toBeCalledTimes(1);
    expect(onAccounts).toBeCalledWith(accounts);
    expect(onCurrentAccount).toBeCalledTimes(1);
    expect(onCurrentAccount).toBeCalledWith(accounts[0]);
  });

  it('should ensure disconnect works just fine', async () => {
    const fuel = new Fuel({
      connectors: [new MockConnector()],
    });

    // listen to connection event
    const onConnection = vi.fn();
    const onAccounts = vi.fn();
    const onCurrentAccount = vi.fn();
    fuel.on(fuel.events.connection, onConnection);
    fuel.on(fuel.events.accounts, onAccounts);
    fuel.on(fuel.events.currentAccount, onCurrentAccount);

    const isConnected = await fuel.disconnect();
    expect(isConnected).toBeFalsy();
    expect(onConnection).toBeCalledTimes(1);
    expect(onConnection).toBeCalledWith(false);
    expect(onAccounts).toBeCalledWith([]);
    expect(onCurrentAccount).toBeCalledWith(null);
  });

  it('should ensure accounts returns all connected accounts', async () => {
    const fuel = new Fuel({
      storage: null,
      connectors: [new MockConnector()],
    });
    const accounts = await fuel.accounts();
    expect(accounts.length).toBeGreaterThan(0);
  });

  it('should ensure currentAccount returns current account', async () => {
    const fuel = new Fuel({
      storage: null,
      connectors: [new MockConnector()],
    });
    const [account] = await fuel.accounts();
    const currentAccount = await fuel.currentAccount();
    expect(currentAccount).toEqual(account);
  });

  it('should ensure networks returns all networks', async () => {
    const fuel = new Fuel({
      storage: null,
      connectors: [new MockConnector()],
    });
    const networks = await fuel.networks();
    expect(networks.length).toBeGreaterThan(0);
  });

  it('should ensure currentNetwork returns current network', async () => {
    const fuel = new Fuel({
      storage: null,
      connectors: [new MockConnector()],
    });
    const [network] = await fuel.networks();
    const currentNetwork = await fuel.currentNetwork();
    expect(currentNetwork).toEqual(network);
  });

  it('should ensure addNetwork works just fine', async () => {
    const fuel = new Fuel({
      storage: null,
      connectors: [new MockConnector()],
    });
    const networkUrl = 'https://beta-5.fuel.network';
    const newNetwork = {
      url: networkUrl,
      chainId: 0,
    };

    // listen to connection event
    const onNetworks = vi.fn();
    const onCurrentNetwork = vi.fn();
    fuel.on(fuel.events.networks, onNetworks);
    fuel.on(fuel.events.currentNetwork, onCurrentNetwork);

    const isNetworkAdded = await fuel.addNetwork(networkUrl);
    const networks = await fuel.networks();
    expect(isNetworkAdded).toEqual(true);
    expect(networks).toContainEqual(newNetwork);
    expect(onNetworks).toBeCalledTimes(1);
    expect(onNetworks).toBeCalledWith(networks);
    expect(onCurrentNetwork).toBeCalledTimes(1);
    expect(onCurrentNetwork).toBeCalledWith(newNetwork);
  });

  it('should ensure selectNetwork works just fine', async () => {
    const fuel = new Fuel({
      storage: null,
      connectors: [new MockConnector()],
    });
    const newNetwork = {
      url: 'https://beta-5.fuel.network',
      chainId: 0,
    };

    // listen to connection event
    const onCurrentNetwork = vi.fn();
    fuel.on(fuel.events.currentNetwork, onCurrentNetwork);

    const networkHasSwitch = await fuel.selectNetwork(newNetwork);
    expect(networkHasSwitch).toEqual(true);
    expect(onCurrentNetwork).toBeCalledTimes(1);
    expect(onCurrentNetwork).toBeCalledWith(newNetwork);
  });

  it('should ensure addAsset works just fine', async () => {
    const fuel = new Fuel({
      storage: null,
      connectors: [new MockConnector()],
    });
    const isAdded = await fuel.addAsset({
      name: 'Asset',
      symbol: 'AST',
      icon: 'ast.png',
      networks: [
        {
          type: 'fuel',
          assetId: ZeroBytes32,
          decimals: 9,
          chainId: 0,
        },
      ],
    });
    expect(isAdded).toEqual(true);
  });

  it('should ensure addAssets works just fine', async () => {
    const fuel = new Fuel({
      storage: null,
      connectors: [new MockConnector()],
    });
    const isAdded = await fuel.addAssets([
      {
        name: 'Asset',
        symbol: 'AST',
        icon: 'ast.png',
        networks: [
          {
            type: 'fuel',
            assetId: ZeroBytes32,
            decimals: 9,
            chainId: 0,
          },
        ],
      },
    ]);
    expect(isAdded).toEqual(true);
  });

  it('should ensure assets returns all assets', async () => {
    const fuel = new Fuel({
      storage: null,
      connectors: [new MockConnector()],
    });
    const assets = await fuel.assets();
    expect(assets.length).toEqual(0);
  });

  it('should ensure addABI works just fine', async () => {
    const fuel = new Fuel({
      storage: null,
      connectors: [new MockConnector()],
    });
    const isAdded = await fuel.addABI('0x001123', {
      types: [],
      loggedTypes: [],
      functions: [],
      configurables: [],
    });
    expect(isAdded).toEqual(true);
  });

  it('should ensure getABI works just fine', async () => {
    const fuel = new Fuel({
      storage: null,
      connectors: [new MockConnector()],
    });
    const abi = await fuel.getABI('0x001123');
    expect(abi).toStrictEqual(null);
  });

  it('should ensure hasABI works just fine', async () => {
    const fuel = new Fuel({
      storage: null,
      connectors: [new MockConnector()],
    });
    const hasFuel = await fuel.hasABI('0x001123');
    expect(hasFuel).toBeTruthy();
  });

  it('should throw if ping takes more than a second', async () => {
    const fuel = new Fuel({
      storage: null,
      connectors: [
        new MockConnector({
          pingDelay: 2000,
        }),
      ],
    });
    await expect(fuel.connect()).rejects.toThrowError();
  });

  it('should ensure getWallet return an wallet', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const baseAssetId = provider.getBaseAssetId();

    const wallets = [
      Wallet.fromPrivateKey(
        '0x1ff16505df75735a5bcf4cb4cf839903120c181dd9be6781b82cda23543bd242',
        provider
      ),
    ];
    const network = {
      chainId: await provider.getChainId(),
      url: provider.url,
    };
    const fuel = new Fuel({
      storage: null,
      connectors: [
        new MockConnector({
          wallets,
          networks: [network],
        }),
      ],
    });
    const account = await fuel.currentAccount();
    if (!account) {
      throw new Error('Account not found');
    }
    const wallet = await fuel.getWallet(account);
    expect(wallet.provider.url).toEqual(network.url);
    const receiver = Wallet.fromAddress(Address.fromRandom(), provider);
    const response = await wallet.transfer(receiver.address, bn(1000), baseAssetId, {
      tip: bn(1),
      gasLimit: bn(100_000),
    });
    const { status } = await response.waitForResult();
    expect(status).toEqual(TransactionStatus.success);
    expect((await receiver.getBalance()).toString()).toEqual('1000');
  }, 10_000);

  it('should be able to have switch between connectors', async () => {
    const thirdPartyConnectorName = 'Third Party Wallet';
    const walletConnectorName = 'Fuel Wallet';
    const fuel = new Fuel({
      storage: null,
      connectors: [
        new MockConnector({
          name: walletConnectorName,
        }),
        new MockConnector({
          accounts: [],
          name: thirdPartyConnectorName,
        }),
      ],
    });

    // Connectors should be available
    const connectors = await fuel.connectors();
    expect(connectors.length).toEqual(2);
    expect(connectors[0].name).toEqual(walletConnectorName);
    expect(connectors[1].name).toEqual(thirdPartyConnectorName);

    // Switch between connectors
    await fuel.selectConnector(walletConnectorName);
    expect(fuel.currentConnector()?.name).toBe(walletConnectorName);
    expect(await fuel.accounts()).toHaveLength(2);

    await fuel.selectConnector(thirdPartyConnectorName);
    expect(fuel.currentConnector()?.name).toBe(thirdPartyConnectorName);
    expect(await fuel.accounts()).toHaveLength(0);
  });

  it('should trigger currentConnector and other events when switch connector', async () => {
    const walletConnector = new MockConnector({
      name: 'Fuel Wallet',
      networks: [
        {
          chainId: 0,
          url: 'https://wallet.fuel.network',
        },
      ],
    });
    const thirdPartyConnector = new MockConnector({
      name: 'Third Party Wallet',
      networks: [
        {
          chainId: 1,
          url: 'https://thridy.fuel.network',
        },
      ],
    });
    const fuel = new Fuel({
      storage: null,
      connectors: [walletConnector, thirdPartyConnector],
    });

    async function expectEventsForConnector(connector: MockConnector) {
      const onCurrentConnector = promiseCallback();
      const onConnection = promiseCallback();
      const onAccounts = promiseCallback();
      const onNetworks = promiseCallback();
      const onCurrentNetwork = promiseCallback();
      const onCurrentAccount = promiseCallback();
      fuel.on(fuel.events.currentConnector, onCurrentConnector);
      fuel.on(fuel.events.connection, onConnection);
      fuel.on(fuel.events.accounts, onAccounts);
      fuel.on(fuel.events.networks, onNetworks);
      fuel.on(fuel.events.currentNetwork, onCurrentNetwork);
      fuel.on(fuel.events.currentAccount, onCurrentAccount);

      await fuel.selectConnector(connector.name);
      await Promise.all([
        onCurrentConnector.promise,
        onConnection.promise,
        onAccounts.promise,
        onNetworks.promise,
        onCurrentNetwork.promise,
        onCurrentAccount.promise,
      ]);

      expect(onCurrentConnector).toBeCalledTimes(1);
      expect(onCurrentConnector).toBeCalledWith(fuel.getConnector(connector.name));
      expect(onConnection).toBeCalledTimes(1);
      expect(onConnection).toBeCalledWith(true);
      expect(onAccounts).toBeCalledTimes(1);
      expect(onAccounts).toBeCalledWith(connector._accounts);
      expect(onNetworks).toBeCalledTimes(1);
      expect(onNetworks).toBeCalledWith(connector._networks);
      expect(onCurrentNetwork).toBeCalledTimes(1);
      expect(onCurrentNetwork).toBeCalledWith(connector._networks[0]);
      expect(onCurrentAccount).toBeCalledTimes(1);
      expect(onCurrentAccount).toBeCalledWith(connector._accounts[0]);
    }

    await fuel.hasConnector();
    await expectEventsForConnector(thirdPartyConnector);
    await expectEventsForConnector(walletConnector);
  });

  it('should only proxy events from the currentConnector', async () => {
    const walletConnector = new MockConnector({
      name: 'Fuel Wallet',
      networks: [
        {
          chainId: 0,
          url: 'https://wallet.fuel.network',
        },
      ],
    });
    const thirdPartyConnector = new MockConnector({
      name: 'Third Party Wallet',
      networks: [
        {
          chainId: 1,
          url: 'https://thridy.fuel.network',
        },
      ],
    });
    const fuel = new Fuel({
      storage: null,
      connectors: [walletConnector, thirdPartyConnector],
    });

    // Select wallet connector
    await fuel.selectConnector(walletConnector.name);
    // Select third party connector
    await fuel.selectConnector(thirdPartyConnector.name);
    // Select wallet connector
    await fuel.selectConnector(walletConnector.name);

    // Ensure that the current connector is the wallet connector
    expect(fuel.currentConnector()?.name).toBe(walletConnector.name);

    const onAccounts = promiseCallback();
    fuel.on(fuel.events.accounts, onAccounts);

    // Should not call event with third party connector
    thirdPartyConnector.emit(fuel.events.accounts, thirdPartyConnector._accounts);
    expect(onAccounts).toBeCalledTimes(0);

    // Should trigger event from the current connector
    walletConnector.emit(fuel.events.accounts, walletConnector._accounts);
    expect(onAccounts).toBeCalledTimes(1);
    expect(onAccounts).toBeCalledWith(walletConnector._accounts);
  });

  it('should be able to getWallet with custom provider', async () => {
    const defaultProvider = await Provider.create(FUEL_NETWORK_URL);

    const defaultWallet = Wallet.generate({
      provider: defaultProvider,
    });
    const connector = new MockConnector({
      wallets: [defaultWallet],
    });
    const fuel = new Fuel({
      connectors: [connector],
    });

    class CustomProvider extends Provider {
      static async create(_url: string, opts?: ProviderOptions) {
        const provider = new CustomProvider(FUEL_NETWORK_URL, opts);
        await provider.fetchChainAndNodeInfo();
        return provider;
      }

      // eslint-disable-next-line @typescript-eslint/require-await
      async getBalance(_owner: AbstractAddress, _assetId: BytesLike = ZeroBytes32): Promise<BN> {
        return bn(1234);
      }
    }

    const currentAccount = await fuel.currentAccount();
    if (!currentAccount) {
      throw new Error('Account not found');
    }

    const provider = await CustomProvider.create(FUEL_NETWORK_URL);
    const wallet = await fuel.getWallet(currentAccount, provider);
    expect(wallet.provider).toBeInstanceOf(CustomProvider);
    expect(await wallet.getBalance()).toEqual(bn(1234));
  });

  it('should ensure hasWallet works just fine', async () => {
    const defaultProvider = await Provider.create(FUEL_NETWORK_URL);

    const defaultWallet = Wallet.generate({
      provider: defaultProvider,
    });

    const connector = new MockConnector({
      wallets: [defaultWallet],
    });

    let hasWallet = await new Fuel().hasWallet();

    expect(hasWallet).toBeFalsy();

    hasWallet = await new Fuel({
      connectors: [connector],
    }).hasWallet();

    expect(hasWallet).toBeTruthy();
  });

  it('should ensure getProvider works just fine', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const defaultWallet = Wallet.generate({
      provider,
    });

    const connector = new MockConnector({
      wallets: [defaultWallet],
    });

    const fuel = new Fuel({
      connectors: [connector],
    });

    let sameProvider = await fuel.getProvider(provider);

    expect(sameProvider).toStrictEqual(provider);

    const customProvider: unknown = {
      chainId: 1,
      url: provider.url,
    };

    sameProvider = await fuel.getProvider(customProvider as Provider);

    expect(sameProvider instanceof Provider).toBeTruthy();

    await expectToThrowFuelError(
      () => fuel.getProvider([] as unknown as Provider),
      new FuelError(ErrorCode.INVALID_PROVIDER, 'Provider is not valid.')
    );
  });
});
