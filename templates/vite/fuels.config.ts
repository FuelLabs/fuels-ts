import { createConfig } from 'fuels';
import dotenv from 'dotenv';

import { useEnvironment } from './src/hooks/useEnvironment';

dotenv.config({
  path: ['.env.local', '.env'],
});

// eslint-disable-next-line react-hooks/rules-of-hooks
const { providerUrl } = useEnvironment();

// If your node is running on a port other than 4000, you can set it here
const fuelCorePort = +(process.env.VITE_FUEL_NODE_PORT as string) || 4000;

export default createConfig({
  workspace: './sway-programs', // Path to your Sway workspace
  output: './src/sway-api', // Where your generated types will be saved
  fuelCorePort,
  providerUrl,
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
});
