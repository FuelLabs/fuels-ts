import type { StorageAbstract } from '../types';

export class MemoryStorage implements StorageAbstract {
  storage = new Map<string, unknown>();

  async getItem<T>(key: string): Promise<T | null> {
    const item = await this.storage.get(key);
    return item as T | null;
  }

  async setItem(key: string, value: string) {
    await this.storage.set(key, value);
  }

  async removeItem(key: string) {
    await this.storage.delete(key);
  }

  async clear() {
    await this.storage.clear();
  }
}
