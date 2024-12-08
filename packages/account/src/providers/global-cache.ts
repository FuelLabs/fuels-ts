import type { CachedResource } from './resource-cache';

// Singleton class to manage global cache state
export class GlobalCache {
  private static instance: GlobalCache;
  private cache: Map<string, CachedResource>;
  private ttl: number;

  private constructor() {
    this.cache = new Map();
    this.ttl = 0; // Will be set by the first Provider instance
  }

  static getInstance(): GlobalCache {
    if (!GlobalCache.instance) {
      GlobalCache.instance = new GlobalCache();
    }
    return GlobalCache.instance;
  }

  reset() {
    GlobalCache.instance = new GlobalCache();
    this.cache = new Map();
    this.ttl = 0;
  }

  setTTL(ttl: number) {
    // Only set TTL if not already set or if new TTL is smaller
    if (this.ttl === 0 || ttl < this.ttl) {
      this.ttl = ttl;
    }
  }

  getTTL(): number {
    return this.ttl;
  }

  getCache(): Map<string, CachedResource> {
    return this.cache;
  }
}
