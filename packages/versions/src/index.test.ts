describe('index.js', () => {
  test('should export default toolchain versions', async () => {
    const { versions } = await import('./index');

    expect(versions.FUELS).toEqual('0.0.0');
    expect(versions.FUEL_CORE).toEqual('0.0.0');
    expect(versions.FORC).toEqual('0.0.0');
  });

  test('should default to zeroed versions', async () => {
    const { thisVersionOrDefault } = await import('./index');

    expect(thisVersionOrDefault()).toEqual('0.0.0');
    expect(thisVersionOrDefault(!0)).toEqual('0.0.0'); // the exp tsup uses
    expect(thisVersionOrDefault(true)).toEqual('0.0.0');
    expect(thisVersionOrDefault(undefined)).toEqual('0.0.0');
  });

  test('should pass-through received versions', async () => {
    const { thisVersionOrDefault } = await import('./index');

    expect(thisVersionOrDefault('1.1.1')).toEqual('1.1.1');
    expect(thisVersionOrDefault('2.2.2')).toEqual('2.2.2');
    expect(thisVersionOrDefault('3.3.3')).toEqual('3.3.3');
  });
});
