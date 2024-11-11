// #region fuel-options-connectors
import { defaultConnectors } from '@fuels/connectors';
import { Fuel } from 'fuels';

const sdkDevMode = await new Fuel({
  connectors: defaultConnectors({
    devMode: true,
  }),
}).init();

// #endregion fuel-options-connectors
console.log('sdkDevMode', sdkDevMode);
