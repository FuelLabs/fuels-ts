import fs, { promises } from 'fs';
import os from 'os';
import path from 'path';

class FSStorage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storage = new Map<string, any>();
  filePath = path.join(os.tmpdir(), `file-${Date.now().toString()}.json`);

  constructor(name?: string) {
    if (name) {
      this.filePath = path.join(os.tmpdir(), `${name}.json`);
    }

    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath, 'utf8');
      this.storage = new Map(JSON.parse(data));
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    return this.storage.get(key) as T | null;
  }

  async save() {
    const data = JSON.stringify([...this.storage]);
    await promises.writeFile(this.filePath, data);
  }

  async setItem<T>(key: string, value: T) {
    this.storage.set(key, value);
    await this.save();
    return this.storage;
  }

  async removeItem(key: string) {
    this.storage.delete(key);
  }

  async clear() {
    return this.storage.clear();
  }
}

export default FSStorage;
