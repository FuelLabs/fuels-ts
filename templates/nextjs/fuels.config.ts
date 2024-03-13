import { createConfig } from 'fuels';

export default createConfig({
  workspace: './sway-programs',
  output: './src/sway-api',
  fuelCorePort: 4000, // This is the same value as the port specified in the .env.local file. Please keep these values in sync.
});
