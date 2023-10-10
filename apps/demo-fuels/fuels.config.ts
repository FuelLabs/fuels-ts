import { createConfig } from 'fuels';

export default createConfig({
  workspace: './backend',
  output: './src/backend-api',
  useBuiltinForc: true,
  useBuiltinFuelCore: true,
});
