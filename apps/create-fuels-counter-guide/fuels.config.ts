// #region fuels-config-file-env
import { createConfig } from 'fuels';
import 'dotenv/config.js';

export default createConfig({
  workspace: './sway-programs',
  output: './src/sway-api',
  fuelCorePort: +(process.env.NEXT_PUBLIC_FUEL_NODE_PORT as string),
});
// #endregion fuels-config-file-env