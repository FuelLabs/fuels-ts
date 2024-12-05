import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { GlobalCache } from './global-cache';
import { ResourceCache } from './resource-cache';

describe('ResourceCache', () => {
  beforeEach(() => {
    // Reset the singleton instance before each test
    (GlobalCache as unknown as { instance: undefined }).instance = undefined;
  });

  describe('constructor', () => {
    it('should throw error if TTL is not a positive number', () => {
      expect(() => new ResourceCache(0)).toThrow(
        new FuelError(ErrorCode.INVALID_TTL, 'Invalid TTL: 0. Use a value greater than zero.')
      );
      expect(() => new ResourceCache(-1)).toThrow(
        new FuelError(ErrorCode.INVALID_TTL, 'Invalid TTL: -1. Use a value greater than zero.')
      );
      expect(() => new ResourceCache('1' as unknown as number)).toThrow(
        new FuelError(ErrorCode.INVALID_TTL, 'Invalid TTL: 1. Use a value greater than zero.')
      );
    });

    it('should initialize with global strategy by default', () => {
      const cache = new ResourceCache(1000);
      expect(cache.getStrategy()).toBe('global');
      expect(cache.getGlobalCache()).toBeDefined();
      expect(cache.getInstanceCache()).toBeUndefined();
    });

    it('should initialize with instance strategy when specified', () => {
      const cache = new ResourceCache(1000, 'instance');
      expect(cache.getStrategy()).toBe('instance');
      expect(cache.getInstanceCache()).toBeDefined();
      expect(cache.getInstanceCache()).toBeInstanceOf(Map);
    });

    it('should set TTL in global cache when using global strategy', () => {
      const ttl = 1000;
      const cache = new ResourceCache(ttl, 'global');
      expect(cache.getGlobalCache().getTTL()).toBe(ttl);
    });

    it('should not set TTL in global cache when using instance strategy', () => {
      const globalCache = GlobalCache.getInstance();
      const cache = new ResourceCache(1000, 'instance');
      expect(globalCache.getTTL()).not.toBe(1000);
      expect(cache.getActiveTTL()).toBe(1000);
    });
  });
});
