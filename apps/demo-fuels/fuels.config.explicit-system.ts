import { createConfig } from 'fuels';

// #region config-system
export default createConfig({
  workspace: './sway-programs',
  output: './src/sway-programs-api',
  useBuiltinForc: false,
  useBuiltinFuelCore: false,
});
// #endregion config-system
