import { createConfig } from 'fuels';

const fuelCorePort = +(process.env.NEXT_PUBLIC_FUEL_NODE_PORT as string) || 4000;

const nodeUrl =
  process.env.NODE_ENV === 'development'
    ? `http://127.0.0.1:${fuelCorePort}/graphql`
    : 'https://beta-5.fuel.networ/graphql';

export default createConfig({
  workspace: './sway-programs',
  output: './src/sway-api',
  /*
    This is the same value as the port specified in the `.env.local` file.
    Please keep these values in sync.
  */
  fuelCorePort: 4000,
  providerUrl: nodeUrl,
});
