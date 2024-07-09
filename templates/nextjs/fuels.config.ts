import { createConfig } from 'fuels';
import dotenv from 'dotenv';
import { NODE_URL } from '@/lib';
import { execSync } from 'child_process';

dotenv.config({
  path: ['.env.local', '.env'],
});

const fuelCorePort = +(process.env.NEXT_PUBLIC_FUEL_NODE_PORT as string) || 4000;

export default createConfig({
  workspace: './sway-programs',
  output: './src/sway-api',
  fuelCorePort,
  providerUrl: NODE_URL,
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
  onBuild: () => {
    execSync('pnpm transform:abi', { stdio: 'inherit' });
  },
});
