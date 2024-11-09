/* eslint-disable @typescript-eslint/require-await */

import { setTimeout } from 'timers/promises';

import type {
  TransactionRequestLike,
  WalletUnlocked,
  FuelABI,
  ConnectorMetadata,
  Network,
  SelectNetworkArguments,
} from '../../src';
import { FuelConnector } from '../../src/connectors/fuel-connector';
import { FuelConnectorEventTypes } from '../../src/connectors/types';
import type { Asset } from '../../src/providers/assets/types';

import { generateAccounts } from './generate-accounts';

type MockConnectorOptions = {
  name?: string;
  accounts?: Array<string>;
  networks?: Array<Network>;
  wallets?: Array<WalletUnlocked>;
  pingDelay?: number;
  metadata?: Partial<ConnectorMetadata>;
};

export class MockConnector extends FuelConnector {
  _accounts: Array<string>;
  _networks: Array<Network>;
  _wallets: Array<WalletUnlocked>;
  _pingDelay: number;
  override name = 'Fuel Wallet';
  override metadata: ConnectorMetadata = {
    image: '/connectors/fuel-wallet.svg',
    install: {
      action: 'Install',
      description: 'To connect your Fuel Wallet, install the browser extension.',
      link: 'https://chrome.google.com/webstore/detail/fuel-wallet/dldjpboieedgcmpkchcjcbijingjcgok',
    },
  };

  constructor(options: MockConnectorOptions = {}) {
    super();
    this._wallets = options.wallets ?? [];
    if (options.wallets) {
      this._accounts = options.wallets.map((w) => w.address.toString());
    } else {
      this._accounts = options.accounts ?? generateAccounts(2);
    }
    this._networks = options.networks ?? [
      {
        chainId: 0,
        url: 'http://127.0.0.1/v1/graphql',
      },
    ];
    // Time should be under 1 second
    this._pingDelay = options.pingDelay ?? 900;
    this.name = options.name ?? this.name;
    this.metadata = {
      ...this.metadata,
      ...options.metadata,
    };
  }

  override async ping() {
    await setTimeout(this._pingDelay);
    return true;
  }

  override async version() {
    return {
      app: '0.0.1',
      network: '>=0.12.4',
    };
  }

  override async isConnected() {
    return true;
  }

  override async accounts() {
    return this._accounts;
  }

  override async connect() {
    this.emit(FuelConnectorEventTypes.connection, true);
    this.emit(FuelConnectorEventTypes.accounts, this._accounts);
    this.emit(FuelConnectorEventTypes.currentAccount, this._accounts[0]);
    return true;
  }

  override async disconnect() {
    this.emit(FuelConnectorEventTypes.connection, false);
    this.emit(FuelConnectorEventTypes.accounts, []);
    this.emit(FuelConnectorEventTypes.currentAccount, null);
    return false;
  }

  override async signMessage(_address: string, _message: string) {
    const wallet = this._wallets.find((w) => w.address.toString() === _address);
    if (!wallet) {
      throw new Error('Wallet is not found!');
    }
    return wallet.signMessage(_message);
  }

  override async sendTransaction(_address: string, _transaction: TransactionRequestLike) {
    const wallet = this._wallets.find((w) => w.address.toString() === _address);
    if (!wallet) {
      throw new Error('Wallet is not found!');
    }
    const { id } = await wallet.sendTransaction(_transaction);
    return id;
  }

  override async currentAccount() {
    return this._accounts[0];
  }

  override async assets() {
    return [];
  }

  override async addAsset(_asset: Asset) {
    return true;
  }

  override async addAssets(_assets: Array<Asset>) {
    return true;
  }

  override async addNetwork(_network: string) {
    const newNetwork = {
      chainId: 0,
      url: _network,
    };
    this._networks.push(newNetwork);
    this.emit(FuelConnectorEventTypes.networks, this._networks);
    this.emit(FuelConnectorEventTypes.currentNetwork, newNetwork);
    return true;
  }

  override async selectNetwork(_network: SelectNetworkArguments) {
    this.emit(FuelConnectorEventTypes.currentNetwork, _network);
    return true;
  }

  override async networks() {
    return this._networks ?? [];
  }

  override async currentNetwork() {
    return this._networks[0];
  }

  override async addABI(_contractId: string, _abi: FuelABI) {
    return true;
  }

  override async getABI(_id: string) {
    return null;
  }

  override async hasABI(_id: string) {
    return true;
  }
}
