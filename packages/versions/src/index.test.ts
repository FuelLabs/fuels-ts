describe('index.js', () => {
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
  test('should export unknown toolchain versions', async () => {
    const { versions } = await import('./index');

    expect(versions.FUELS).toEqual('~');
    expect(versions.FUEL_CORE).toEqual('~');
    expect(versions.FORC).toEqual('~');
  });

  test('should pass-through toolchain versions from env variables', async () => {
    // mocking
    const versionsDefault = {
      FUELS: '3.3.3',
      FORC: '1.1.1',
      FUEL_CORE: '2.2.2',
    };

    jest.mock('./index', () => ({ versions: versionsDefault }));

    // reading
    const { versions } = await import('./index');

    // validating
    expect(versions.FUELS).toEqual(versions.FUELS);
    expect(versions.FORC).toEqual(versions.FORC);
    expect(versions.FUEL_CORE).toEqual(versions.FUEL_CORE);
  });
});
