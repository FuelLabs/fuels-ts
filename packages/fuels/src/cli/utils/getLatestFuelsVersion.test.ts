import * as cacheMod from './fuelsVersionCache';
import { getLatestFuelsVersion } from './getLatestFuelsVersion';

/**
 * @group node
 */
describe('getLatestFuelsVersion', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fail if fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject(new Error('Failed to fetch'))
    );
    await expect(getLatestFuelsVersion()).rejects.toThrowError('Failed to fetch');
  });

  it('should throw if fetch times out', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 5000);
        })
    );
    await expect(getLatestFuelsVersion()).rejects.toThrow();
  });

  it('should return cached version if it exists', async () => {
    const cachedVersion = '1.0.0';
    vi.spyOn(cacheMod, 'checkAndLoadCache').mockReturnValue(cachedVersion);
    const result = await getLatestFuelsVersion();
    expect(result).toEqual('1.0.0');
  });

  it('should fetch if there is no cache or the cache is expired', async () => {
    const mockResponse = new Response(JSON.stringify({ version: '1.0.0' }));
    const fetchSpy = vi.spyOn(global, 'fetch').mockReturnValue(Promise.resolve(mockResponse));
    const saveCacheSpy = vi.spyOn(cacheMod, 'saveToCache').mockImplementation(() => {});
    vi.spyOn(cacheMod, 'checkAndLoadCache').mockReturnValue(null);
    const version = await getLatestFuelsVersion();
    expect(fetchSpy).toHaveBeenCalled();
    expect(version).toEqual('1.0.0');
    expect(saveCacheSpy).toHaveBeenCalledWith('1.0.0');
  });
});
