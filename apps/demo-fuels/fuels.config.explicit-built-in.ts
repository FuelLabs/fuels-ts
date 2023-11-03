import { createConfig } from 'fuels';

// #region config-built-in
export default createConfig({
  workspace: './sway-programs',
  output: './src/sway-programs-api',
  useBuiltinForc: true,
  useBuiltinFuelCore: true,
});
// #endregion config-built-in
