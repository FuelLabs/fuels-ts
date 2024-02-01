import { FuelWalletConnector } from './fuel-wallet-connector';
import { FuelWalletDevelopmentConnector } from './fuel-wallet-development-connector';
import { FueletWalletConnector } from './fuelet-wallet-connector';

type DefaultConnectors = {
  devMode?: boolean;
};

export function defaultConnectors({ devMode }: DefaultConnectors = {}) {
  const connectors = [new FuelWalletConnector(), new FueletWalletConnector()];
  if (devMode) {
    connectors.push(new FuelWalletDevelopmentConnector());
  }
  return connectors;
}
