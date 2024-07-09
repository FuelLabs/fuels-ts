import { execSync } from 'child_process';
import { createConfig } from 'fuels';

export default createConfig({
  workspace: './test/fixtures/forc-projects',
  output: './test/typegen',
  forcBuildFlags: ['--release'],
  forcPath: 'fuels-forc',
  fuelCorePath: 'fuels-core',
  onBuild: () => {
    execSync('pnpm transform:abi', { stdio: 'inherit' });
  },
});
