import { createConfig } from 'fuels';

// #region config-built-in
export default createConfig({
  workspace: './sway-programs',
  output: './src/sway-programs-api',
  shouldUseBuiltinForc: true,
  shouldUseBuiltinFuelCore: true,
});
// #endregion config-built-in
