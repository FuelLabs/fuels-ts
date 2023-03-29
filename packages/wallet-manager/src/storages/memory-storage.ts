import type { StorageAbstract } from '../types';

class MemoryStorage implements StorageAbstract {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storage = new Map<string, any>();

  async getItem<T>(key: string): Promise<T | null> {
    const item = await this.storage.get(key);
    return item;
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

export default MemoryStorage;
