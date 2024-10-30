// #region full

/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fuel, LocalStorage, MemoryStorage, FuelConnector } from 'fuels';
import type { TargetObject, Network, Asset, FuelABI } from 'fuels';

// prettier-ignore
// #region fuel-connector-extends
class MyWalletConnector extends FuelConnector
// #endregion fuel-connector-extends
{}

let metadata: FuelConnector['metadata'] = {
  // #region fuel-connector-metadata-install
  install: {
    action: 'Install',
    description: 'Install the My Wallet Connector',
    link: 'https://example.com/install',
  },
  // #endregion fuel-connector-metadata-install

  // #region fuel-connector-metadata-image
  image: 'https://example.com/image.png',
  // #endregion fuel-connector-metadata-image
};

metadata = {
  install: metadata.install,
  // #region fuel-connector-metadata-image-theme
  image: {
    light: 'https://example.com/light.png',
    dark: 'https://example.com/dark.png',
  },
  // #endregion fuel-connector-metadata-image-theme
};

class WalletConnector extends FuelConnector {
  // #region fuel-connector-name
  name: string = 'My Wallet Connector';
  // #endregion fuel-connector-name

  // #region fuel-connector-metadata
  metadata = {
    install: metadata.install,
    image: metadata.image,
  };
  // #endregion fuel-connector-metadata

  private eventsConnectorEvents(): void {
    // #region fuel-connector-events-accounts
    const accounts: Array<string> = ['0x1234567890abcdef'];

    this.emit(this.events.accounts, accounts);
    // #endregion fuel-connector-events-accounts

    // #region fuel-connector-events-connection
    const connection: boolean = true;

    this.emit(this.events.connection, connection);
    // #endregion fuel-connector-events-connection

    // #region fuel-connector-events-connectors
    const connectors: Array<FuelConnector> = [new MyWalletConnector()];

    this.emit(this.events.connectors, connectors);
    // #endregion fuel-connector-events-connectors

    // #region fuel-connector-events-currentConnector
    const currentConnector: FuelConnector = new MyWalletConnector();

    this.emit(this.events.currentConnector, currentConnector);
    // #endregion fuel-connector-events-currentConnector

    // #region fuel-connector-events-currentAccount
    const currentAccount: string = '0x1234567890abcdef';

    this.emit(this.events.currentAccount, currentAccount);
    // #endregion fuel-connector-events-currentAccount

    // #region fuel-connector-events-networks
    const network: Network = {
      chainId: 1,
      url: 'https://example.com/rpc',
    };

    this.emit(this.events.networks, network);
    // #endregion fuel-connector-events-networks

    // #region fuel-connector-events-currentNetwork
    const currentNetwork: Network = {
      chainId: 1,
      url: 'https://example.com/rpc',
    };

    this.emit(this.events.currentNetwork, currentNetwork);
    // #endregion fuel-connector-events-currentNetwork

    // #region fuel-connector-events-assets
    const assets: Array<Asset> = [
      {
        name: 'Ethereum',
        symbol: 'ETH',
        icon: 'https://cdn.fuel.network/assets/eth.svg',
        networks: [
          {
            type: 'ethereum',
            chainId: 11155111,
            decimals: 18,
          },
        ],
      },
    ];

    this.emit(this.events.assets, assets);
    // #endregion fuel-connector-events-assets

    // #region fuel-connector-events-abis
    const abis: Array<FuelABI> = [
      {
        encodingVersion: '1',
        specVersion: '1',
        programType: 'contract',
        concreteTypes: [],
        metadataTypes: [],
        loggedTypes: [],
        functions: [],
        messagesTypes: [],
        configurables: [],
      },
    ];

    this.emit(this.events.abis, abis);
    // #endregion fuel-connector-events-abis
  }
}

const sdk = new Fuel();

/*
	Awaits for initialization to mitigate potential race conditions
	derived from the async nature of instantiating a connector.
*/
await sdk.init();

const defaultConnectors = (_opts: {
  devMode: boolean;
}): Array<FuelConnector> => [new WalletConnector()];

const sdkDevMode = await new Fuel({
  connectors: defaultConnectors({
    devMode: true,
  }),
}).init();

const sdkWithMemoryStorage = await new Fuel({
  storage: new MemoryStorage(),
}).init();

const window = {
  localStorage: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  } as unknown as Storage,
};

const sdkWithLocalStorage = await new Fuel({
  storage: new LocalStorage(window.localStorage),
}).init();

const emptyWindow = {} as unknown as TargetObject;

const targetObject: TargetObject = emptyWindow || document;

const sdkWithTargetObject = await new Fuel({
  targetObject,
}).init();

// #endregion full
