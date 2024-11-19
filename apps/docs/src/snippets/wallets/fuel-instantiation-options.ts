// #region fuel-options-connectors
import { Fuel, FuelConnector } from 'fuels';

class WalletConnector extends FuelConnector {
  public override name: string = 'My Wallet Connector';
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
