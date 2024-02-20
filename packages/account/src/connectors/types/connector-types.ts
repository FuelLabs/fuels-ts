export enum FuelConnectorMethods {
  // General methods
  ping = 'ping',
  version = 'version',
  // Connection methods
  connect = 'connect',
  disconnect = 'disconnect',
  isConnected = 'isConnected',
  // Account methods
  accounts = 'accounts',
  currentAccount = 'currentAccount',
  // Signature methods
  signMessage = 'signMessage',
  sendTransaction = 'sendTransaction',
  // Assets metadata methods
  assets = 'assets',
  addAsset = 'addAsset',
  addAssets = 'addAssets',
  // Network methods
  networks = 'networks',
  currentNetwork = 'currentNetwork',
  addNetwork = 'addNetwork',
  selectNetwork = 'selectNetwork',
  // ABI methods
  addABI = 'addABI',
  getABI = 'getABI',
  hasABI = 'hasABI',
}

export enum FuelConnectorEventTypes {
  connectors = 'connectors',
  currentConnector = 'currentConnector',
  connection = 'connection',
  accounts = 'accounts',
  currentAccount = 'currentAccount',
  networks = 'networks',
  currentNetwork = 'currentNetwork',
  assets = 'assets',
  abis = 'abis',
}

export const FuelConnectorEventType = 'FuelConnector';
