import { createConfig } from 'fuels';

// #region config-system
export default createConfig({
  workspace: './sway-programs',
  output: './src/sway-programs-api',
  shouldUseBuiltinForc: false,
  shouldUseBuiltinFuelCore: false,
});
// #endregion config-system
