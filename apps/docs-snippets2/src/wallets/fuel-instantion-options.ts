// #region fuel-options-connectors
import type { FuelConnector } from 'fuels';
import { Fuel } from 'fuels';

import { WalletConnector } from './connectors';

const defaultConnectors = (_opts: {
  devMode: boolean;
}): Array<FuelConnector> => [new WalletConnector()];

const sdkDevMode = await new Fuel({
  connectors: defaultConnectors({
    devMode: true,
  }),
}).init();
// #endregion fuel-options-connectors
