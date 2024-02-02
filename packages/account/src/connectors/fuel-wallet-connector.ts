import type { JSONRPCRequest } from 'json-rpc-2.0';
import { JSONRPCClient } from 'json-rpc-2.0';

import { Provider, transactionRequestify, type TransactionRequestLike } from '../providers';

import { FuelConnector } from './fuel-connector';
import type {
  Asset,
  AssetData,
  AssetFuel,
  CommunicationMessage,
  ConnectorMetadata,
  EventMessage,
  FuelABI,
  Network,
  ResponseMessage,
  Version,
} from './types';
import {
  CONNECTOR_SCRIPT,
  CONTENT_SCRIPT_NAME,
  EVENT_MESSAGE,
  FuelConnectorEventTypes,
  MessageTypes,
} from './types';

const { warn } = console;

export class FuelWalletConnector extends FuelConnector {
  name: string = '';
  connected: boolean = false;
  installed: boolean = false;
  events = FuelConnectorEventTypes;
  metadata: ConnectorMetadata = {
    image: '/connectors/fuel-wallet.svg',
    install: {
      action: 'Install',
      description: 'To connect your Fuel Wallet, install the browser extension.',
      link: 'https://chrome.google.com/webstore/detail/fuel-wallet/dldjpboieedgcmpkchcjcbijingjcgok',
    },
  };

  readonly client: JSONRPCClient;

  constructor(name: string = 'Fuel Wallet') {
    super();
    this.name = name;
    this.setMaxListeners(100);
    this.client = new JSONRPCClient(this.sendRequest.bind(this), this.createRequestId);
    this.setupListener();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.setupConnector();
  }

  /**
   * ============================================================
   * Application communication methods
   * ============================================================
   */
  private async setupConnector() {
    if (typeof window !== 'undefined') {
      try {
        await this.ping();

        window.dispatchEvent(new CustomEvent('FuelConnector', { detail: this }));
      } catch (e) {
        warn(e);
      }
    }
  }

  private acceptMessage(message: MessageEvent<CommunicationMessage>): boolean {
    const { data: event } = message;
    return (
      message.origin === window.origin &&
      event.type !== MessageTypes.request &&
      event.connectorName === this.name &&
      event.target === CONNECTOR_SCRIPT
    );
  }

  private setupListener() {
    if (typeof window === 'undefined') {
      return;
    }
    window.addEventListener(EVENT_MESSAGE, this.onMessage.bind(this));
  }

  private createRequestId(): string {
    return crypto.randomUUID();
  }

  private postMessage(message: CommunicationMessage, origin?: string) {
    window.postMessage(message, origin || window.origin);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  private async sendRequest(request: JSONRPCRequest | null) {
    if (!request) {
      return;
    }
    this.postMessage({
      type: MessageTypes.request,
      target: CONTENT_SCRIPT_NAME,
      connectorName: this.name,
      request,
    });
  }

  private onResponse(message: ResponseMessage): void {
    this.client.receive(message.response);
  }

  private onEvent(message: EventMessage): void {
    message.events.forEach((eventData) => {
      if (eventData.event === 'start') {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.setupConnector();
      } else {
        this.emit(eventData.event, ...eventData.params);
      }
    });
  }

  private onMessage = (message: MessageEvent<CommunicationMessage>) => {
    const messageFroze = Object.freeze(message);
    if (!this.acceptMessage(messageFroze)) {
      return;
    }
    const { data: event } = messageFroze;
    this.onCommunicationMessage(event);
  };

  private onCommunicationMessage = (message: CommunicationMessage) => {
    switch (message.type) {
      case MessageTypes.response:
        this.onResponse(message);
        break;
      case MessageTypes.event:
        this.onEvent(message);
        break;
      default:
    }
  };

  /**
   * ============================================================
   * Connector methods
   * ============================================================
   */
  async ping(): Promise<boolean> {
    return this.client.timeout(800).request('ping', {});
  }

  async isConnected(): Promise<boolean> {
    // If the wallet not exists or not connected, return false
    try {
      return await this.client.request('isConnected', {});
    } catch {
      return false;
    }
  }

  async connect(): Promise<boolean> {
    return this.client.request('connect', {});
  }

  async disconnect(): Promise<boolean> {
    return this.client.request('disconnect', {});
  }

  async accounts(): Promise<Array<string>> {
    return this.client.request('accounts', {});
  }

  async currentAccount(): Promise<string | null> {
    return this.client.request('currentAccount', {});
  }

  async signMessage(address: string, message: string): Promise<string> {
    if (!message.trim()) {
      throw new Error('Message is required');
    }
    return this.client.request('signMessage', {
      address,
      message,
    });
  }

  async sendTransaction(address: string, transaction: TransactionRequestLike): Promise<string> {
    if (!transaction) {
      throw new Error('Transaction is required');
    }
    // Transform transaction object to a transaction request
    const txRequest = transactionRequestify(transaction);

    /**
     * TODO: We should remove this once the chainId standard start to be used and chainId is required
     * to be correct according to the network the transaction wants to target.
     */
    const network = await this.currentNetwork();
    const provider = {
      url: network.url,
    };

    return this.client.request('sendTransaction', {
      address,
      transaction: JSON.stringify(txRequest),
      provider,
    });
  }

  async assets(): Promise<Array<Asset>> {
    return this.client.request('assets', {});
  }

  async addAsset(asset: Asset): Promise<boolean> {
    return this.addAssets([asset]);
  }

  async addAssets(assets: Asset[]): Promise<boolean> {
    /**
     * TODO: Remove this once Fuel Wallet supports assets with multiple networks
     */
    const assetsData: Array<AssetData> = assets.map((asset) => {
      const fuelNetworkAsset = asset.networks.find((n) => n.type === 'fuel') as AssetFuel;
      if (!fuelNetworkAsset) {
        throw new Error('Asset for Fuel Network not found!');
      }
      return {
        ...asset,
        imageUrl: asset.icon,
        decimals: fuelNetworkAsset.decimals,
        assetId: fuelNetworkAsset.assetId,
      };
    });
    return this.client.request('addAssets', {
      assets: assetsData,
    });
  }

  async addABI(contractId: string, abi: FuelABI): Promise<boolean> {
    return this.client.request('addAbi', {
      abiMap: {
        [contractId]: abi,
      },
    });
  }

  async getABI(contractId: string): Promise<FuelABI> {
    return this.client.request('getAbi', {
      contractId,
    });
  }

  async hasABI(contractId: string): Promise<boolean> {
    const abi = await this.getABI(contractId);
    return !!abi;
  }

  async currentNetwork(): Promise<Network> {
    return this.client.request('network', {});
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async selectNetwork(_network: Network): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async networks(): Promise<Network[]> {
    return this.client.request('networks', {});
  }

  async addNetwork(networkUrl: string): Promise<boolean> {
    /**
     * TODO: Remove fetch provider once Fuel Wallet supports adding networks
     * by URL
     */
    const provider = await Provider.create(networkUrl);
    return this.client.request('addNetwork', {
      network: {
        url: provider.url,
        name: provider.getChain().name,
      },
    });
  }

  async version(): Promise<Version> {
    return this.client.request('version', {
      app: '0.0.0',
      network: '0.0.0',
    });
  }
}
