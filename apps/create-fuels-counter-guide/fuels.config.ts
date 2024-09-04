// #region fuels-config-file-env
import { createConfig } from 'fuels';
import dotenv from 'dotenv';
import { NODE_URL } from './src/lib';

dotenv.config({
  path: ['.env.local', '.env'],
});

// If your node is running on a port other than 4000, you can set it here
const fuelCorePort = +(process.env.VITE_FUEL_NODE_PORT as string) || 4000;

export default createConfig({
  workspace: './sway-programs', // Path to your Sway workspace
  output: './src/sway-api', // Where your generated types will be saved
  fuelCorePort,
  providerUrl: NODE_URL,
  fuelCorePath: 'fuels-core',
  forcPath: 'fuels-forc',
});
// #endregion fuels-config-file-env