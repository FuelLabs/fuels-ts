/**
 * @group node
 */
describe('Configs', () => {
  it('exports FUEL_NETWORK_URL', async () => {
    const configs = await import('./configs');
    expect(configs.FUEL_NETWORK_URL).toBe('http://127.0.0.1:4000/graphql');
  });
});

describe('Configs - undefined process', () => {
  const originalProcess = process;

  beforeEach(() => {
    vi.resetModules();

    // @ts-expect-error - test to assert undefined process
    // eslint-disable-next-line no-global-assign
    process = undefined;
  });

  afterEach(() => {
    // eslint-disable-next-line no-global-assign
    process = originalProcess;
  });

  it('exports FUEL_NETWORK_URL with undefined process', async () => {
    expect(typeof process).toBe('undefined');
    expect(process).toBeUndefined();

    const configs = await import('./configs');

    expect(configs.FUEL_NETWORK_URL).toBe('http://127.0.0.1:4000/graphql');
  });
});

describe('Configs - overridden env', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();

    process.env = { ...originalEnv, FUEL_NETWORK_URL: 'some-other-network-url' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('exports FUEL_NETWORK_URL with overridden env', async () => {
    const configs = await import('./configs');

    expect(configs.FUEL_NETWORK_URL).toBe('some-other-network-url');
  });
});
