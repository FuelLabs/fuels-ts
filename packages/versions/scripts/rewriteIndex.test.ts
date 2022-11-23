import { getToolchainVersions } from './getToolchainVersions';

describe('cli.js', () => {
  test('should get local versions for fuel toolchain components', async () => {
    const versions = getToolchainVersions();

    expect(versions.FUELS).toEqual('0.21.2');
    expect(versions.FORC).toEqual('0.30.0');
    expect(versions.FUEL_CORE).toEqual('0.14.0');
  });
});
