/* eslint-disable @typescript-eslint/require-await */
import type { StorageAbstract } from '../../wallet-manager';

export class LocalStorage implements StorageAbstract {
  private storage: Storage;

  constructor(localStorage: Storage) {
    this.storage = localStorage;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.storage.setItem(key, value);
  }

  async getItem(key: string): Promise<string | null | undefined> {
    return this.storage.getItem(key);
  }

  async removeItem(key: string): Promise<void> {
    this.storage.removeItem(key);
  }

  async clear(): Promise<void> {
    this.storage.clear();
  }
}
