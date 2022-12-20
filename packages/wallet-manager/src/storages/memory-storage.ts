import type { StorageAbstract } from "../types";

class MemoryStorage implements StorageAbstract {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storage = new Map<string, any>();

  async getItem<T>(key: string): Promise<T | null> {
    return this.storage.get(key);
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
