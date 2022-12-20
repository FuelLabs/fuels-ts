import { getSupportedVersions, thisVersionOrDefault } from './getSupportedVersions';

describe('getSupportedVersions.js', () => {
  test('should return received version of default', async () => {
    expect(thisVersionOrDefault()).toEqual('0.0.0');
    expect(thisVersionOrDefault('true')).toEqual('0.0.0');
    expect(thisVersionOrDefault(undefined)).toEqual('0.0.0');
    expect(thisVersionOrDefault('1.1.1')).toEqual('1.1.1');
  });

  test('should get versions just fine', async () => {
    // mocking
    const envBackup = { ...process.env };

    const BUILD_VERSION = '9.9.9';
    const FORC_VERSION = '8.8.8';
    const FUEL_CORE_VERSION = '7.7.7';

    process.env.BUILD_VERSION = BUILD_VERSION;
    process.env.FORC_VERSION = FORC_VERSION;
    process.env.FUEL_CORE_VERSION = FUEL_CORE_VERSION;

    // executing
    const env = getSupportedVersions();

    // restoring
    process.env = envBackup;

    // validating
    expect(env.FUELS).toEqual(BUILD_VERSION);
    expect(env.FORC).toEqual(FORC_VERSION);
    expect(env.FUEL_CORE).toEqual(FUEL_CORE_VERSION);
  });
});
