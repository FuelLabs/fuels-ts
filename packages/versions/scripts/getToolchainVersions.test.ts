describe('getToolchainVersions.js', () => {
  /*
    Hooks
  */
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  /*
    Tests
  */
  test('should get local versions just fine', async () => {
    const { getToolchainVersions } = await import('./getToolchainVersions');

    const versions = getToolchainVersions();

    expect(versions.FUELS).toEqual('0.21.2');
    expect(versions.FORC).toEqual('0.30.0');
    expect(versions.FUEL_CORE).toEqual('0.14.0');
  });

  test('should throw when failing to parse Dockerfile', async () => {
    // mocking
    const readFileSync = jest.fn(() => '{}');
    jest.mock('fs', () => ({ readFileSync }));

    // executing and validating
    const { getToolchainVersions } = await import('./getToolchainVersions');
    expect(getToolchainVersions).toThrow(/Could not read version from Dockerfile/);
  });
});
