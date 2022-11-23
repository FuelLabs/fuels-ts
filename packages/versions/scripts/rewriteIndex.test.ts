import { readFileSync } from 'fs';

describe('cli.js', () => {
  test('should get local versions for fuel toolchain components', async () => {
    // mocking
    const versions = {
      FUEL_CORE: '1.1.1',
      FORC: '2.2.2',
      FUELS: '3.3.3',
    };

    const writeFileSync = jest.fn();
    const getToolchainVersions = jest.fn(() => versions);

    jest.mock('fs', () => ({ readFileSync, writeFileSync }));
    jest.mock('./getToolchainVersions', () => ({ getToolchainVersions }));

    // executing
    await import('./rewriteIndex');

    // validating
    const forcRegex = new RegExp(`FORC: '${versions.FORC}'`, 'g');
    const fuelCoreRegex = new RegExp(`FUEL_CORE: '${versions.FUEL_CORE}'`, 'g');
    const fuelsRegex = new RegExp(`FUELS: process.env.BUILD_VERSION || '${versions.FUELS}`, 'g');

    const contents = writeFileSync.mock.calls[0][1];

    expect(forcRegex.test(contents)).toBeTruthy();
    expect(fuelCoreRegex.test(contents)).toBeTruthy();
    expect(fuelsRegex.test(contents)).toBeTruthy();
  });
});
