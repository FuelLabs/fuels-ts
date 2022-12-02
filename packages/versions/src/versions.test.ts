describe('versions.js', () => {
  test('should export default toolchain versions', async () => {
    // injecting values
    const env = {
      BUILD_VERSION: '1.1.1',
      FORC_VERSION: '2.2.2',
      FUEL_CORE_VERSION: '3.3.3',
    };

    process.env = { ...env };

    // executing
    const { versions } = await import('./versions');

    // validating
    expect(versions.FUELS).toEqual(env.BUILD_VERSION);
    expect(versions.FORC).toEqual(env.FORC_VERSION);
    expect(versions.FUEL_CORE).toEqual(env.FUEL_CORE_VERSION);
  });

  test('should default to zeroed versions', async () => {
    const { thisVersionOrDefault } = await import('./versions');

    expect(thisVersionOrDefault()).toEqual('0.0.0');
    expect(thisVersionOrDefault(!0)).toEqual('0.0.0'); // the exp tsup uses
    expect(thisVersionOrDefault(true)).toEqual('0.0.0');
    expect(thisVersionOrDefault(undefined)).toEqual('0.0.0');
  });

  test('should pass-through received versions', async () => {
    const { thisVersionOrDefault } = await import('./versions');

    expect(thisVersionOrDefault('1.1.1')).toEqual('1.1.1');
    expect(thisVersionOrDefault('2.2.2')).toEqual('2.2.2');
    expect(thisVersionOrDefault('3.3.3')).toEqual('3.3.3');
  });
});
