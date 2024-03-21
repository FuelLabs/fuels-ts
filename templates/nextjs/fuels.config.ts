import { createConfig } from 'fuels';

export default createConfig({
  workspace: './sway-programs',
  output: './src/sway-api',
  /*
    This is the same value as the port specified in the `.env.local` file.
    Please keep these values in sync.
  */
  fuelCorePort: 4000,
});
