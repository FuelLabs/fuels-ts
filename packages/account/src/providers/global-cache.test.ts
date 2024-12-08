import { GlobalCache } from './global-cache';

/**
 * @group node
 * @group browser
 */
describe('GlobalCache', () => {
  beforeEach(() => {
    // Reset the singleton instance before each test
    (GlobalCache as unknown as { instance: undefined }).instance = undefined;
  });

  it('should create singleton instance', () => {
    const instance1 = GlobalCache.getInstance();
    const instance2 = GlobalCache.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should initialize with empty cache and zero TTL', () => {
    const cache = GlobalCache.getInstance();
    expect(cache.getCache().size).toBe(0);
    expect(cache.getTTL()).toBe(0);
  });

  it('should update TTL', () => {
    const cache = GlobalCache.getInstance();
    cache.setTTL(1000);
    cache.setTTL(500);
    expect(cache.getTTL()).toBe(500);
  });

  it('should return cache map instance', () => {
    const cache = GlobalCache.getInstance();
    const cacheMap = cache.getCache();
    expect(cacheMap instanceof Map).toBe(true);
  });
});
