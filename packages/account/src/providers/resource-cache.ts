import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { hexlify } from '@fuel-ts/utils';

import { GlobalCache } from './global-cache';
import type { ExcludeResourcesOption } from './resource';

export const DEFAULT_RESOURCE_CACHE_TTL = 20_000; // 20 seconds
export const DEFAULT_RESOURCE_CACHE_STRATEGY = 'global';

export interface CachedResource {
  utxos: Set<string>;
  messages: Set<string>;
  timestamp: number;
}

export type CacheStrategy = 'global' | 'instance';

/**
 * Resource cache
 */
export class ResourceCache {
  private readonly ttl: number;
  private readonly strategy: CacheStrategy;
  private instanceCache: Map<string, CachedResource> = new Map();
  private globalCache: GlobalCache;

  constructor(
    ttl: number = DEFAULT_RESOURCE_CACHE_TTL,
    strategy: CacheStrategy = DEFAULT_RESOURCE_CACHE_STRATEGY
  ) {
    if (typeof ttl !== 'number' || ttl <= 0) {
      throw new FuelError(
        ErrorCode.INVALID_TTL,
        `Invalid TTL: ${ttl}. Use a value greater than zero.`
      );
    }

    this.ttl = ttl;
    this.strategy = strategy;
    this.globalCache = GlobalCache.getInstance();

    if (strategy === 'global') {
      this.globalCache.setTTL(ttl);
    } else {
      this.instanceCache = new Map();
    }
  }

  getActiveCache(): Map<string, CachedResource> {
    return this.strategy === 'global' ? this.globalCache.getCache() : this.instanceCache;
  }

  getActiveTTL(): number {
    return this.strategy === 'global' ? this.globalCache.getTTL() : this.ttl;
  }

  getCacheStrategy(): CacheStrategy {
    return this.strategy;
  }

  set(transactionId: string, resources: Required<ExcludeResourcesOption>): void {
    const currentTime = Date.now();
    const cache = this.getActiveCache();

    const existingResources = cache.get(transactionId) || {
      utxos: new Set<string>(),
      messages: new Set<string>(),
      timestamp: currentTime,
    };

    resources.utxos.forEach((utxo) => existingResources.utxos.add(hexlify(utxo)));
    resources.messages.forEach((message) => existingResources.messages.add(hexlify(message)));

    cache.set(transactionId, existingResources);
  }

  unset(transactionId: string): void {
    this.getActiveCache().delete(transactionId);
  }

  getActiveData() {
    const allResources = { utxos: [] as string[], messages: [] as string[] };
    const currentTime = Date.now();
    const cache = this.getActiveCache();
    const ttl = this.getActiveTTL();

    cache.forEach((resource, transactionId) => {
      if (currentTime - resource.timestamp < ttl) {
        allResources.utxos.push(...Array.from(resource.utxos));
        allResources.messages.push(...Array.from(resource.messages));
      } else {
        cache.delete(transactionId);
      }
    });

    return allResources;
  }

  isCached(key: string): boolean {
    const currentTime = Date.now();
    const cache = this.getActiveCache();
    const ttl = this.getActiveTTL();

    for (const [transactionId, resourceData] of cache.entries()) {
      if (currentTime - resourceData.timestamp > ttl) {
        cache.delete(transactionId);
      } else if (resourceData.utxos.has(key) || resourceData.messages.has(key)) {
        return true;
      }
    }
    return false;
  }

  clear(): void {
    this.getActiveCache().clear();
  }

  getStrategy() {
    return this.strategy;
  }

  getGlobalCache() {
    return this.globalCache;
  }

  getInstanceCache() {
    return this.instanceCache;
  }

  reset() {
    this.clear();
    this.globalCache.reset();
  }

  [Symbol.dispose]() {
    this.reset();
  }
}
