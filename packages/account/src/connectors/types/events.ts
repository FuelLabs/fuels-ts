import type { Asset } from '../../providers/assets/types';
import type { FuelConnector } from '../fuel-connector';

import type { FuelConnectorEventTypes } from './connector-types';
import type { Network } from './data-type';

/** **
 * ========================================================================================
 * Helpers
 * ========================================================================================
 */

/**
 * Extract the event argument type from the event type.
 */
export type FuelEventArg<T extends FuelConnectorEvents['type']> = Extract<
  FuelConnectorEventTypes,
  { type: T }
>['data'];

/**
 * Event trigger when the accounts available to the
 * connection changes.
 *
 * @property type - The event type.
 * @property accounts - The accounts addresses
 */
export type AccountsEvent = {
  type: FuelConnectorEventTypes.accounts;
  data: Array<string>;
};

/**
 * Event trigger when the current account on the connector is changed
 * if the account is not authorized for the connection it should trigger with value null.
 *
 * @property type - The event type.
 * @property data - The current account selected or null.
 */
export type AccountEvent = {
  type: FuelConnectorEventTypes.currentAccount;
  data: string | null;
};

/**
 * Event trigger when connection status changes. With the new connection status.
 *
 * @event ConnectionEvent
 * @property type - The event type.
 * @property data - The new connection status.
 */
export type ConnectionEvent = {
  type: FuelConnectorEventTypes.connection;
  data: boolean;
};

/**
 * Event trigger when the network selected on the connector is changed.
 * It should trigger even if the network is not available for the connection.
 *
 * @event NetworkEvent
 * @property type - The event type.
 * @property data - The network information
 */
export type NetworkEvent = {
  type: FuelConnectorEventTypes.currentNetwork;
  data: Network;
};

/**
 * Event trigger when the network selected on the connector is changed.
 * It should trigger even if the network is not available for the connection.
 *
 * @event NetworksEvent
 * @property type - The event type.
 * @property data - The network information
 */
export type NetworksEvent = {
  type: FuelConnectorEventTypes.networks;
  data: Network;
};

/**
 * Event trigger when the list of connectors has changed.
 *
 * @event ConnectorsEvent
 * @property type - The event type.
 * @property data - The list of connectors
 */
export type ConnectorsEvent = {
  type: FuelConnectorEventTypes.connectors;
  data: Array<FuelConnector>;
};

/**
 * Event trigger when the current connector has changed.
 *
 * @event ConnectorEvent
 * @property type - The event type.
 * @property data - The list of connectors
 */
export type ConnectorEvent = {
  type: FuelConnectorEventTypes.currentConnector;
  data: FuelConnector;
};

/**
 * Event trigger when the assets list of metadata changed.
 *
 * @event AssetsEvent
 * @property type - The event type.
 * @property data - The list of assets
 */
export type AssetsEvent = {
  type: FuelConnectorEventTypes.assets;
  data: Array<Asset>;
};

/**
 * All the events available to the connector.
 */
export type FuelConnectorEvents =
  | ConnectionEvent
  | NetworkEvent
  | NetworksEvent
  | AccountEvent
  | AccountsEvent
  | ConnectorsEvent
  | ConnectorEvent
  | AssetsEvent;

export type FuelConnectorEventsType = FuelConnectorEvents['type'];
