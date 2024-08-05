import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { hexlify } from '@fuel-ts/utils';
import { Mutex } from 'async-mutex';

import type { ExcludeResourcesOption } from './resource';

interface CachedResource {
  utxos: Set<string>;
  messages: Set<string>;
  timestamp: number;
}

export const DEFAULT_RESOURCE_CACHE_TTL = 20_000; // 20 seconds
export const DEFAULT_CLEANUP_INTERVAL = DEFAULT_RESOURCE_CACHE_TTL / 2;
export class ResourceCache {
  readonly ttl: number;
  private cache: Map<string, CachedResource>;
  private mutex: Mutex;
  private cleanupInterval: NodeJS.Timeout = setInterval(() => {}, DEFAULT_CLEANUP_INTERVAL);

  constructor(ttl: number) {
    if (typeof ttl !== 'number' || ttl <= 0) {
      throw new FuelError(
        ErrorCode.INVALID_TTL,
        `Invalid TTL: ${ttl}. Use a value greater than zero.`
      );
    }
    this.ttl = ttl;
    this.cache = new Map<string, CachedResource>();
    this.mutex = new Mutex();
    this.startCleanupProcess();
  }

  private startCleanupProcess(): void {
    this.cleanupInterval = setInterval(async () => {
      await this.cleanup();
    }, this.ttl / 2);
  }

  private async cleanup(): Promise<void> {
    const release = await this.mutex.acquire();
    try {
      const currentTime = Date.now();
      for (const [transactionId, resource] of this.cache.entries()) {
        if (currentTime - resource.timestamp >= this.ttl) {
          this.cache.delete(transactionId);
        }
      }
    } finally {
      release();
    }
  }

  async set(transactionId: string, resources: Required<ExcludeResourcesOption>): Promise<void> {
    const release = await this.mutex.acquire();
    try {
      const currentTime = Date.now();
      const existingResources = this.cache.get(transactionId) || {
        utxos: new Set<string>(),
        messages: new Set<string>(),
        timestamp: currentTime,
      };

      resources.utxos.forEach((utxo) => existingResources.utxos.add(hexlify(utxo)));
      resources.messages.forEach((message) => existingResources.messages.add(hexlify(message)));

      this.cache.set(transactionId, existingResources);
    } finally {
      release();
    }
  }

  async unset(transactionId: string): Promise<void> {
    const release = await this.mutex.acquire();
    try {
      this.cache.delete(transactionId);
    } finally {
      release();
    }
  }

  async getActiveData(): Promise<{ utxos: string[]; messages: string[] }> {
    const release = await this.mutex.acquire();
    try {
      const allResources: { utxos: string[]; messages: string[] } = { utxos: [], messages: [] };
      const currentTime = Date.now();
      this.cache.forEach((resource, transactionId) => {
        if (currentTime - resource.timestamp < this.ttl) {
          allResources.utxos.push(...Array.from(resource.utxos));
          allResources.messages.push(...Array.from(resource.messages));
        } else {
          this.cache.delete(transactionId);
        }
      });
      return allResources;
    } finally {
      release();
    }
  }

  async isCached(key: string): Promise<boolean> {
    const release = await this.mutex.acquire();
    try {
      const currentTime = Date.now();
      for (const [transactionId, resourceData] of this.cache.entries()) {
        if (currentTime - resourceData.timestamp > this.ttl) {
          this.cache.delete(transactionId);
        } else if (resourceData.utxos.has(key) || resourceData.messages.has(key)) {
          return true;
        }
      }
      return false;
    } finally {
      release();
    }
  }

  async clear(): Promise<void> {
    const release = await this.mutex.acquire();
    try {
      this.cache.clear();
    } finally {
      release();
    }
  }

  async destroy(): Promise<void> {
    clearInterval(this.cleanupInterval);
    await this.clear();
  }
}
