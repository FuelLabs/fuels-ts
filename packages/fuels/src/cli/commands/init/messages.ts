export const theFuelToolchainLink = 'https://docs.fuel.network/guides/installation/';

type BinaryName = 'forc' | 'fuel-core';

export const makeWarnMessage = (binaryName: BinaryName) =>
  [
    `You're using a built-in version of '${binaryName}'.`,
    `Consider installing The Fuel Toolchain:`,
    `  - ${theFuelToolchainLink}`,
  ].join('\n');
