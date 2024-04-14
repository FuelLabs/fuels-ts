// #region fuels-config-file-env
import { createConfig } from 'fuels';
import dotenv from 'dotenv';

dotenv.config({
  path: ['.env.local', '.env'],
});

export default createConfig({
  workspace: './sway-programs',
  output: './src/sway-api',
  fuelCorePort: +(process.env.NEXT_PUBLIC_FUEL_NODE_PORT as string) || 4000,
});
// #endregion fuels-config-file-env