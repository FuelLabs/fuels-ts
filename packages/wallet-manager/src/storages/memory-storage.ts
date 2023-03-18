import type { StorageAbstract } from '../types';

class MemoryStorage implements StorageAbstract {
  storage = new Map<string, unknown>();

  async getItem<T>(key: string): Promise<T | null> {
    return this.storage.get(key) as T | null;
  }

  async setItem(key: string, value: string) {
    this.storage.set(key, value);
  }

  async removeItem(key: string) {
    this.storage.delete(key);
  }

  async clear() {
    return this.storage.clear();
  }
}

export default MemoryStorage;
