import * as cacheMod from './fuelsVersionCache';
import { getLatestFuelsVersion } from './getLatestFuelsVersion';

describe('getLatestFuelsVersion', () => {
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
    const cache = {
      data: {
        version: '1.0.0',
      },
      timestamp: Date.now(),
    };
    vi.spyOn(cacheMod, 'checkAndLoadCache').mockReturnValue(cache);
    const result = await getLatestFuelsVersion();
    expect(result).toEqual('1.0.0');
  });

  it('should fetch if there is no cache, and save to cache', async () => {
    const mockResponse = new Response(JSON.stringify({ version: '1.0.0' }));
    const fetchSpy = vi.spyOn(global, 'fetch').mockReturnValue(Promise.resolve(mockResponse));
    const saveCacheSpy = vi.spyOn(cacheMod, 'saveToCache').mockImplementation(() => {});
    vi.spyOn(cacheMod, 'checkAndLoadCache').mockReturnValue(null);
    const version = await getLatestFuelsVersion();
    expect(fetchSpy).toHaveBeenCalled();
    expect(version).toEqual('1.0.0');
    expect(saveCacheSpy).toHaveBeenCalledWith({
      data: {
        version: '1.0.0',
      },
      timestamp: expect.any(Number),
    });
  });

  it('should refetch if the cache is expired', async () => {
    const cache = {
      data: {
        version: '0.0.0',
      },
      timestamp: Date.now() - cacheMod.FUELS_VERSION_CACHE_TTL - 1000,
    };
    vi.spyOn(cacheMod, 'checkAndLoadCache').mockReturnValue(cache);
    const mockResponse = new Response(JSON.stringify({ version: '1.0.0' }));
    const fetchSpy = vi.spyOn(global, 'fetch').mockReturnValue(Promise.resolve(mockResponse));
    const version = await getLatestFuelsVersion();
    expect(fetchSpy).toHaveBeenCalled();
    expect(version).toEqual('1.0.0');
  });
});
