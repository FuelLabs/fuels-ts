export const theFuelToolchainLink = 'http://';

type BinaryName = 'forc' | 'fuel-core';

export const makeWarnMessage = (binaryName: BinaryName) =>
  [
    `You're using a built-in version of '${binaryName}'.`,
    `Consider installing The Fuel Toolchain:`,
    `  - ${theFuelToolchainLink}`,
  ].join('\n');

export const makeErrorMessage = () =>
  [`Install The Fuel Toolchain and try again:`, `  - ${theFuelToolchainLink}`].join('\n');
