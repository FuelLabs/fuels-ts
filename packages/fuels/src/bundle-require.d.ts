/* eslint-disable @typescript-eslint/no-explicit-any */
// The package bundle-require don't correctly have types
// So we need to declare it here to avoid errors
declare module 'bundle-require' {
  function bundleRequire(config: any): Promise<any>;
}
