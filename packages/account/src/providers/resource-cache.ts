import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { hexlify } from '@fuel-ts/utils';

import type { ExcludeResourcesOption } from './resource';

interface CachedResource {
  utxos: Set<string>;
  messages: Set<string>;
  timestamp: number;
}

const cache = new Map<string, CachedResource>();

export class ResourceCache {
  readonly ttl: number;

  constructor(ttl: number) {
    this.ttl = ttl; // TTL in milliseconds

    if (typeof ttl !== 'number' || this.ttl <= 0) {
      throw new FuelError(
        ErrorCode.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
    }
  }

  // Add resources to the cache
  set(transactionId: string, resources: Required<ExcludeResourcesOption>): void {
    const currentTime = Date.now();
    const existingResources = cache.get(transactionId) || {
      utxos: new Set<string>(),
      messages: new Set<string>(),
      timestamp: currentTime,
    };

    resources.utxos.forEach((utxo) => existingResources.utxos.add(hexlify(utxo)));
    resources.messages.forEach((message) => existingResources.messages.add(hexlify(message)));

    cache.set(transactionId, existingResources);
  }

  // Remove resources from the cache for a given transaction ID
  unset(transactionId: string): void {
    cache.delete(transactionId);
  }

  // Get all cached resources and remove expired ones
  getActiveData() {
    const allResources: { utxos: string[]; messages: string[] } = { utxos: [], messages: [] };
    const currentTime = Date.now();
    cache.forEach((resource, transactionId) => {
      if (currentTime - resource.timestamp < this.ttl) {
        allResources.utxos.push(...resource.utxos);
        allResources.messages.push(...resource.messages);
      } else {
        cache.delete(transactionId);
      }
    });
    return allResources;
  }

  // Check if a UTXO ID or message nonce is already cached and not expired
  isCached(key: string): boolean {
    const currentTime = Date.now();
    for (const [transactionId, resourceData] of cache.entries()) {
      if (currentTime - resourceData.timestamp > this.ttl) {
        cache.delete(transactionId);
      } else if (resourceData.utxos.has(key) || resourceData.messages.has(key)) {
        return true;
      }
    }
    return false;
  }

  clear() {
    cache.clear();
  }
}
