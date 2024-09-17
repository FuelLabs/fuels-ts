import { createConfig } from 'fuels';
import dotenv from 'dotenv';
import { providerUrl } from '@/lib';

dotenv.config({
  path: ['.env.local', '.env'],
});

const fuelCorePort = +(process.env.NEXT_PUBLIC_FUEL_NODE_PORT as string) || 4000;

export default createConfig({
  workspace: './sway-programs',
  output: './src/sway-api',
  fuelCorePort,
  providerUrl,
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
});
