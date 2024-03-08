/* eslint-disable @typescript-eslint/require-await */
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { EventEmitter } from 'events';

import type { TransactionRequestLike } from '../providers';
import type { Asset } from '../providers/assets/types';

import { FuelConnectorEventTypes } from './types';
import type {
  FuelConnectorEvents,
  ConnectorMetadata,
  FuelABI,
  Network,
  FuelEventArg,
  Version,
} from './types';

/**
 * @name FuelConnector
 *
 * Wallet Connector is a interface that represents a Wallet Connector and all the methods
 * that should be implemented to be compatible with the Fuel SDK.
 */
export abstract class FuelConnector extends EventEmitter {
  name: string = '';
  metadata: ConnectorMetadata = {} as ConnectorMetadata;
  connected: boolean = false;
  installed: boolean = false;
  events = FuelConnectorEventTypes;

  /**
   * Should return true if the connector is loaded
   * in less then one second.
   *
   * @returns Always true.
   */
  async ping(): Promise<boolean> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should return the current version of the connector
   * and the network version that is compatible.
   *
   * @returns boolean - connection status.
   */
  async version(): Promise<Version> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should return true if the connector is connected
   * to any of the accounts available.
   *
   * @returns The connection status.
   */
  async isConnected(): Promise<boolean> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should return all the accounts authorized for the
   * current connection.
   *
   * @returns The accounts addresses strings
   */
  async accounts(): Promise<Array<string>> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should start the connection process and return
   * true if the account authorize the connection.
   *
   * and return false if the user reject the connection.
   *
   * @emits accounts
   * @returns boolean - connection status.
   */
  async connect(): Promise<boolean> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should disconnect the current connection and
   * return false if the disconnection was successful.
   *
   * @emits assets connection
   * @returns The connection status.
   */
  async disconnect(): Promise<boolean> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should start the sign message process and return
   * the signed message.
   *
   * @param address - The address to sign the message
   * @param message - The message to sign all text will be treated as text utf-8
   *
   * @returns Message signature
   */
  async signMessage(_address: string, _message: string): Promise<string> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should start the send transaction process and return
   * the transaction id submitted to the network.
   *
   * If the network is not available for the connection
   * it should throw an error to avoid the transaction
   * to be sent to the wrong network and lost.
   *
   * @param address - The address to sign the transaction
   * @param transaction - The transaction to send
   *
   * @returns The transaction id
   */
  async sendTransaction(_address: string, _transaction: TransactionRequestLike): Promise<string> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should return the current account selected inside the connector, if the account
   * is authorized for the connection.
   *
   * If the account is not authorized it should return null.
   *
   * @returns The current account selected otherwise null.
   */
  async currentAccount(): Promise<string | null> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should add the the assets metadata to the connector and return true if the asset
   * was added successfully.
   *
   * If the asset already exists it should throw an error.
   *
   * @emits assets
   * @param assets - The assets to add the metadata to the connection.
   * @throws Error if the asset already exists
   * @returns True if the asset was added successfully
   */
  async addAssets(_assets: Array<Asset>): Promise<boolean> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should add the the asset metadata to the connector and return true if the asset
   * was added successfully.
   *
   * If the asset already exists it should throw an error.
   *
   * @emits assets
   * @param asset - The asset to add the metadata to the connection.
   * @throws Error if the asset already exists
   * @returns True if the asset was added successfully
   */
  async addAsset(_asset: Asset): Promise<boolean> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should return all the assets added to the connector. If a connection is already established.
   *
   * @returns Array of assets metadata from the connector vinculated to the all accounts from a specific Wallet.
   */
  async assets(): Promise<Array<Asset>> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should start the add network process and return true if the network was added successfully.
   *
   * @emits networks
   * @throws Error if the network already exists
   * @param networkUrl - The URL of the network to be added.
   * @returns Return true if the network was added successfully
   */
  async addNetwork(_networkUrl: string): Promise<boolean> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should start the select network process and return true if the network has change successfully.
   *
   * @emits networks
   * @throws Error if the network already exists
   * @param network - The network to be selected.
   * @returns Return true if the network was added successfully
   */
  async selectNetwork(_network: Network): Promise<boolean> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should return all the networks available from the connector. If the connection is already established.
   *
   * @returns Return all the networks added to the connector.
   */
  async networks(): Promise<Array<Network>> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should return the current network selected inside the connector. Even if the connection is not established.
   *
   * @returns Return the current network selected inside the connector.
   */
  async currentNetwork(): Promise<Network> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should add the ABI to the connector and return true if the ABI was added successfully.
   *
   * @param contractId - The contract id to add the ABI.
   * @param abi - The JSON ABI that represents a contract.
   * @returns Return true if the ABI was added successfully.
   */
  async addABI(_contractId: string, _abi: FuelABI): Promise<boolean> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should return the ABI from the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the ABI.
   * @returns The ABI if it exists, otherwise return null.
   */
  async getABI(_id: string): Promise<FuelABI | null> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Should return true if the abi exists in the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the abi
   * @returns Returns true if the abi exists or false if not.
   */
  async hasABI(_id: string): Promise<boolean> {
    throw new FuelError(ErrorCode.NOT_IMPLEMENTED, 'Not implemented');
  }

  /**
   * Event listener for the connector.
   *
   * @param eventName - The event name to listen
   * @param listener - The listener function
   */
  on<E extends FuelConnectorEvents['type'], D extends FuelEventArg<E>>(
    eventName: E,
    listener: (data: D) => void
  ): this {
    super.on(eventName, listener);
    return this;
  }
}
