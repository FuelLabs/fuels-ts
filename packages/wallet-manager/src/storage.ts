class MemoryStorage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storage = new Map<string, any>();

  async getItem(key: string) {
    return this.storage.get(key);
  }

  async setItem<T>(key: string, value: T) {
    return this.storage.set(key, value);
  }

  async removeItem(key: string) {
    this.storage.delete(key);
  }

  async clear() {
    return this.storage.clear();
  }
}

export default MemoryStorage;
