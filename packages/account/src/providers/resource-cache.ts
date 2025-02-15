import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { hexlify } from '@fuel-ts/utils';

import { isRequestInputCoin, isRequestInputCoinOrMessage } from './transaction-request';
import type {
  CoinTransactionRequestInput,
  MessageTransactionRequestInput,
  TransactionRequestInput,
} from './transaction-request';

type ResourcesOwnersMap = Map<string, { utxos: Set<string>; messages: Set<string> }>;

interface TransactionResourcesCache {
  owners: ResourcesOwnersMap;
  timestamp: number;
}

const cache = new Map<string, TransactionResourcesCache>();

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
  set(transactionId: string, inputs: TransactionRequestInput[]): void {
    const transactionResourceCache = this.setupResourcesCache(inputs);
    cache.set(transactionId, transactionResourceCache);
  }

  unset(transactionId: string): void {
    cache.delete(transactionId);
  }

  getActiveData(owner: string) {
    const activeData: { utxos: string[]; messages: string[] } = { utxos: [], messages: [] };
    const currentTime = Date.now();
    const expired: string[] = [];

    cache.forEach((resource, transactionId) => {
      const isActive = currentTime - resource.timestamp < this.ttl;

      if (isActive) {
        const resourcesFromOwner = resource.owners.get(owner);
        if (resourcesFromOwner) {
          activeData.utxos.push(...resourcesFromOwner.utxos);
          activeData.messages.push(...resourcesFromOwner.messages);
        }
      } else {
        expired.push(transactionId);
      }
    });

    expired.forEach(this.unset);

    return activeData;
  }

  isCached(owner: string, key: string): boolean {
    const currentTime = Date.now();
    let cached = false;
    const expired: string[] = [];

    for (const [transactionId, resourceData] of cache.entries()) {
      const isActive = currentTime - resourceData.timestamp < this.ttl;
      if (isActive) {
        const resourcesFromOwner = resourceData.owners.get(owner);

        if (resourcesFromOwner?.utxos.has(key) || resourcesFromOwner?.messages.has(key)) {
          cached = true;
          break;
        }
      } else {
        expired.push(transactionId);
      }
    }

    expired.forEach(this.unset);

    return cached;
  }

  clear() {
    cache.clear();
  }

  private setupResourcesCache(inputs: TransactionRequestInput[]) {
    const currentTime = Date.now();

    const transactionResourcesCache: TransactionResourcesCache = {
      owners: new Map() as ResourcesOwnersMap,
      timestamp: currentTime,
    };

    inputs.filter(isRequestInputCoinOrMessage).forEach((input) => {
      const { owner, key, type } = this.extractResourceData(input);

      if (!transactionResourcesCache.owners.has(owner)) {
        transactionResourcesCache.owners.set(owner, { utxos: new Set(), messages: new Set() });
      }

      if (type === 'utxo') {
        transactionResourcesCache.owners.get(owner)?.utxos.add(key);
      } else {
        transactionResourcesCache.owners.get(owner)?.messages.add(key);
      }
    });

    return transactionResourcesCache;
  }

  private extractResourceData(input: CoinTransactionRequestInput | MessageTransactionRequestInput) {
    if (isRequestInputCoin(input)) {
      return { owner: hexlify(input.owner), key: hexlify(input.id), type: 'utxo' as const };
    }
    return { owner: hexlify(input.recipient), key: hexlify(input.nonce), type: 'message' as const };
  }
}
