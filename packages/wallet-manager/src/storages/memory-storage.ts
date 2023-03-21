import type { StorageAbstract } from '../types';

class MemoryStorage implements StorageAbstract {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storage = new Map<string, any>();

  async getItem<T>(key: string): Promise<T | null> {
    return Promise.resolve(this.storage.get(key));
  }

  async setItem(key: string, value: string) {
    await Promise.resolve(this.storage.set(key, value));
  }

  async removeItem(key: string) {
    await Promise.resolve(this.storage.delete(key));
  }

  async clear() {
    return Promise.resolve(this.storage.clear());
  }
}

export default MemoryStorage;
