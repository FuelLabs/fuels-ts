import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAddress } from '@fuel-ts/interfaces';

import { Account } from '../account';
import { Provider } from '../providers';
import type { StorageAbstract } from '../wallet-manager';

import { FuelConnector } from './fuel-connector';
import {
  FuelConnectorMethods,
  FuelConnectorEventTypes,
  FuelConnectorEventType,
  LocalStorage,
} from './types';
import type { Network, FuelConnectorEventsType, TargetObject } from './types';
import type { CacheFor } from './utils';
import { cacheFor, deferPromise, withTimeout } from './utils';

// This is the time to wait for the connector
// to be available before returning false for hasConnector.
const HAS_CONNECTOR_TIMEOUT = 2_000;
// The time to cache the ping result, as is not
// expected to change the availability of the connector to
// change too often we can safely cache the result for 5 seconds
// at minimum.
const PING_CACHE_TIME = 5_000;

const { warn } = console;

export type FuelConfig = {
  connectors?: Array<FuelConnector>;
  storage?: StorageAbstract | null;
  targetObject?: TargetObject;
};

export type FuelConnectorSelectOptions = {
  emitEvents?: boolean;
};

export type Status = {
  installed: boolean;
  connected: boolean;
};

export class Fuel extends FuelConnector {
  static STORAGE_KEY = 'fuel-current-connector';
  static defaultConfig: FuelConfig = {};
  private _storage?: StorageAbstract | null = null;
  private _connectors: Array<FuelConnector> = [];
  private _targetObject: TargetObject | null = null;
  private _unsubscribes: Array<() => void> = [];
  private _targetUnsubscribe = () => {};
  private _pingCache: CacheFor = {};
  private _currentConnector?: FuelConnector | null;
  // private _initializationPromise: Promise<void>;

  constructor(config: FuelConfig = Fuel.defaultConfig) {
    super();
    // Increase the limit of listeners
    this.setMaxListeners(1_000);
    // Set all connectors
    this._connectors = config.connectors ?? [];
    // Set the target object to listen for global events
    this._targetObject = this.getTargetObject(config.targetObject);
    // Set default storage
    this._storage = config.storage === undefined ? this.getStorage() : config.storage;
    // Setup all methods
    this.setupMethods();

    (async () => {
      await this.initialize();
    })();
  }

  private async initialize(): Promise<void> {
    // Get the current connector from the storage
    await this.setDefaultConnector();
    // Setup new connector listener for global events
    this._targetUnsubscribe = this.setupConnectorListener();
  }

  // private async ensureInitialized(): Promise<void> {
  //   await this._initializationPromise;
  // }

  /**
   * Return the target object to listen for global events.
   */
  private getTargetObject(targetObject?: TargetObject): TargetObject | null {
    if (targetObject) {
      return targetObject;
    }
    if (typeof window !== 'undefined') {
      return window;
    }
    if (typeof document !== 'undefined') {
      return document;
    }
    return null;
  }

  /**
   * Return the storage used.
   */
  private getStorage(): StorageAbstract | undefined {
    if (typeof window !== 'undefined') {
      return new LocalStorage(window.localStorage);
    }
    return undefined;
  }

  /**
   * Setup the default connector from the storage.
   */
  private async setDefaultConnector(): Promise<boolean | undefined> {
    const connectorName =
      (await this._storage?.getItem(Fuel.STORAGE_KEY)) || this._connectors[0]?.name;
    if (connectorName) {
      // Setup all events for the current connector
      return this.selectConnector(connectorName, {
        emitEvents: false,
      });
    }

    return undefined;
  }

  /**
   * Start listener for all the events of the current
   * connector and emit them to the Fuel instance
   */
  private setupConnectorEvents(events: string[]): void {
    if (!this._currentConnector) {
      return;
    }
    const currentConnector = this._currentConnector;
    this._unsubscribes.map((unSub) => unSub());
    this._unsubscribes = events.map((event) => {
      const handler = (...args: unknown[]) => this.emit(event, ...args);
      currentConnector.on(event as FuelConnectorEventsType, handler);
      return () => currentConnector.off(event, handler);
    });
  }

  /**
   * Call method from the current connector.
   */
  private async callMethod(method: string, ...args: unknown[]) {
    const hasConnector = await this.hasConnector();
    await this.pingConnector();
    if (!this._currentConnector || !hasConnector) {
      throw new Error(
        `No connector selected for calling ${method}. Use hasConnector before executing other methods.`
      );
    }
    if (typeof this._currentConnector[method as keyof FuelConnector] === 'function') {
      return (this._currentConnector[method as keyof FuelConnector] as CallableFunction)(...args);
    }

    return undefined;
  }

  /**
   * Create a method for each method proxy that is available on the Common interface
   * and call the method from the current connector.
   */
  private setupMethods(): void {
    Object.values(FuelConnectorMethods).forEach((method) => {
      this[method] = async (...args: unknown[]) => this.callMethod(method, ...args);
    });
  }

  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  private async fetchConnectorStatus(
    connector: FuelConnector & { _latestUpdate?: number }
  ): Promise<Status> {
    // Control fetch status to avoid rewriting the status
    // on late responses in this way even if a response is
    // late we can avoid rewriting the status of the connector
    const requestTimestamp = Date.now();
    const [isConnected, ping] = await Promise.allSettled([
      withTimeout(connector.isConnected()),
      withTimeout(this.pingConnector(connector)),
    ]);
    // If the requestTimestamp is greater than the latest update
    // we can ignore the response as is treated as stale.
    const isStale = requestTimestamp < (connector._latestUpdate || 0);
    if (!isStale) {
      // eslint-disable-next-line no-param-reassign
      connector._latestUpdate = Date.now();
      // eslint-disable-next-line no-param-reassign
      connector.installed = ping.status === 'fulfilled' && ping.value;
      // eslint-disable-next-line no-param-reassign
      connector.connected = isConnected.status === 'fulfilled' && isConnected.value;
    }
    return {
      installed: connector.installed,
      connected: connector.connected,
    };
  }

  /**
   * Fetch the status of all connectors and set the installed and connected
   * status.
   */
  private async fetchConnectorsStatus(): Promise<Status[]> {
    return Promise.all(
      this._connectors.map(async (connector) => this.fetchConnectorStatus(connector))
    );
  }

  /**
   * Fetch the status of a connector and set the installed and connected
   * status. If no connector is provided it will ping the current connector.
   */
  private async pingConnector(connector?: FuelConnector) {
    const curConnector = connector || this._currentConnector;
    if (!curConnector) {
      return false;
    }
    // If finds a ping in the cache and the value is true
    // return from cache
    try {
      return await cacheFor(async () => withTimeout(curConnector.ping()), {
        key: curConnector.name,
        cache: this._pingCache,
        cacheTime: PING_CACHE_TIME,
      })();
    } catch {
      throw new Error('Current connector is not available.');
    }
  }

  /**
   * Setup a listener for the FuelConnector event and add the connector
   * to the list of new connectors.
   */
  private setupConnectorListener = () => {
    const { _targetObject: targetObject } = this;
    const eventName = FuelConnectorEventType;
    if (targetObject?.on) {
      targetObject.on(eventName, this.addConnector);
      return () => {
        targetObject.off?.(eventName, this.addConnector);
      };
    }
    if (targetObject?.addEventListener) {
      const handler = (e: CustomEvent<FuelConnector>) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.addConnector(e.detail);
      };
      targetObject.addEventListener(eventName, handler);
      return () => {
        targetObject.removeEventListener?.(eventName, handler);
      };
    }
    return () => {};
  };

  /**
   * Add a new connector to the list of connectors.
   */
  private addConnector = async (connector: FuelConnector): Promise<void> => {
    if (!this.getConnector(connector)) {
      this._connectors.push(connector);
    }
    // Fetch the status of the new connector
    await this.fetchConnectorStatus(connector);
    // Emit connectors events once the connector list changes
    this.emit(this.events.connectors, this._connectors);
    // If the current connector is not set
    if (!this._currentConnector) {
      // set the new connector as currentConnector
      await this.selectConnector(connector.name, {
        emitEvents: false,
      });
    }
  };

  private triggerConnectorEvents = async () => {
    const [isConnected, networks, currentNetwork] = await Promise.all([
      this.isConnected(),
      this.networks(),
      this.currentNetwork(),
    ]);
    this.emit(this.events.connection, isConnected);
    this.emit(this.events.networks, networks);
    this.emit(this.events.currentNetwork, currentNetwork);
    if (isConnected) {
      const [accounts, currentAccount] = await Promise.all([
        this.accounts(),
        this.currentAccount(),
      ]);
      this.emit(this.events.accounts, accounts);
      this.emit(this.events.currentAccount, currentAccount);
    }
  };

  /**
   * Get a connector from the list of connectors.
   */
  getConnector = (connector: FuelConnector | string): FuelConnector | null =>
    this._connectors.find((c) => {
      const connectorName = typeof connector === 'string' ? connector : connector.name;
      return c.name === connectorName || c === connector;
    }) || null;

  /**
   * Return the list of connectors with the status of installed and connected.
   */
  async connectors(): Promise<Array<FuelConnector>> {
    // await this.ensureInitialized();
    await this.fetchConnectorsStatus();
    return this._connectors;
  }

  /**
   * Set the current connector to be used.
   */
  async selectConnector(
    connectorName: string,
    options: FuelConnectorSelectOptions = {
      emitEvents: true,
    }
  ): Promise<boolean> {
    // await this.ensureInitialized();
    const connector = this.getConnector(connectorName);
    if (!connector) {
      return false;
    }
    if (this._currentConnector?.name === connectorName) {
      return true;
    }
    const { installed } = await this.fetchConnectorStatus(connector);
    if (installed) {
      this._currentConnector = connector;
      this.emit(this.events.currentConnector, connector);
      this.setupConnectorEvents(Object.values(FuelConnectorEventTypes));
      await this._storage?.setItem(Fuel.STORAGE_KEY, connector.name);
      // If emitEvents is true we query all the data from the connector
      // and emit the events to the Fuel instance allowing the application to
      // react to changes in the connector state.
      if (options.emitEvents) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.triggerConnectorEvents();
      }
      return true;
    }
    return false;
  }

  /**
   * Return the current selected connector.
   */
  currentConnector(): FuelConnector | null | undefined {
    return this._currentConnector;
  }

  /**
   * Return true if any connector is available.
   */
  async hasConnector(): Promise<boolean> {
    // await this.ensureInitialized();
    // If there is a current connector return true
    // as the connector is ready
    if (this._currentConnector) {
      return true;
    }
    // If there is no current connector
    // wait for the current connector to be set
    // for 1 second and return false if is not set
    const defer = deferPromise<boolean>();
    this.once(this.events.currentConnector, () => {
      defer.resolve(true);
    });
    // As the max ping time is 1 second we wait for 2 seconds
    // to allow applications to react to the current connector
    return withTimeout(defer.promise, HAS_CONNECTOR_TIMEOUT)
      .then(() => true)
      .catch(() => false);
  }

  async hasWallet(): Promise<boolean> {
    // await this.ensureInitialized();
    return this.hasConnector();
  }

  /**
   * Return a Fuel Provider instance with extends features to work with
   * connectors.
   *
   * @deprecated getProvider is deprecated and is going to be removed in the future, use getWallet instead.
   */
  async getProvider(providerOrNetwork?: Provider | Network): Promise<Provider> {
    warn(
      'getProvider is deprecated and is going to be removed in the future, use getWallet instead.'
    );
    return this._getProvider(providerOrNetwork);
  }

  /**
   * Return a Fuel Provider instance with extends features to work with
   * connectors.
   */
  private async _getProvider(providerOrNetwork?: Provider | Network): Promise<Provider> {
    // Decide which provider to use based on the providerOrNetwork
    let provider: Provider;
    // If provider is a valid instance of a Provider use it
    if (providerOrNetwork && 'getTransactionResponse' in providerOrNetwork) {
      provider = providerOrNetwork;
      // If the provided param is a valid network use it
    } else if (providerOrNetwork && 'chainId' in providerOrNetwork && 'url' in providerOrNetwork) {
      provider = await Provider.create(providerOrNetwork.url);
      // If nor provider or network is provided use the current network
    } else if (!providerOrNetwork) {
      const currentNetwork = await this.currentNetwork();
      provider = await Provider.create(currentNetwork.url);
      // If a provider or network was informed but is not valid
      // throw an error
    } else {
      throw new FuelError(ErrorCode.INVALID_PROVIDER, 'Provider is not valid.');
    }
    return provider;
  }

  /**
   * Return a Fuel Wallet Locked instance with extends features to work with
   * connectors.
   */
  async getWallet(
    address: string | AbstractAddress,
    providerOrNetwork?: Provider | Network
  ): Promise<Account> {
    const provider = await this._getProvider(providerOrNetwork);
    return new Account(address, provider, this);
  }

  /**
   * Remove all open listeners this is useful when you want to
   * remove the Fuel instance and avoid memory leaks.
   */
  unsubscribe(): void {
    // Unsubscribe from all events
    this._unsubscribes.map((unSub) => unSub());
    this._targetUnsubscribe();
    // Remove all listeners from fuel instance
    this.removeAllListeners();
  }

  /**
   * Clean all the data from the storage.
   */
  async clean(): Promise<void> {
    await this._storage?.removeItem(Fuel.STORAGE_KEY);
  }

  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy(): Promise<void> {
    this.unsubscribe();
    await this.clean();
  }
}
