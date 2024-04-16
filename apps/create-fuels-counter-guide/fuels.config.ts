// #region fuels-config-file-env
import { createConfig } from 'fuels';
import dotenv from 'dotenv';

dotenv.config({
  path: ['.env.local', '.env'],
});

const fuelCorePort = +(process.env.NEXT_PUBLIC_FUEL_NODE_PORT as string) || 4000;

const dappEnvironment = process.env.NEXT_PUBLIC_DAPP_ENVIRONMENT;

const nodeUrl =
  dappEnvironment === ('local' || undefined)
    ? `http://127.0.0.1:${fuelCorePort}/graphql`
    : 'https://beta-5.fuel.network/graphql';

export default createConfig({
  workspace: './sway-programs',
  output: './src/sway-api',
  fuelCorePort,
  providerUrl: nodeUrl,
});
// #endregion fuels-config-file-env
