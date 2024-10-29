// #region fuel-options-connectors
import { FuelConnector, Fuel } from 'fuels';

class WalletConnector extends FuelConnector {
  name: string = 'My Wallet Connector';
}

const defaultConnectors = (_opts: {
  devMode: boolean;
}): Array<FuelConnector> => [new WalletConnector()];

const sdkDevMode = await new Fuel({
  connectors: defaultConnectors({
    devMode: true,
  }),
}).init();

// #endregion fuel-options-connectors
console.log('sdkDevMode', sdkDevMode);
