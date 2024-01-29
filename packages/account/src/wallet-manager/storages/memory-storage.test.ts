import MemoryStorage from './memory-storage';

/**
 * @group node
 * @group browser
 */
describe('MemoryStorage', () => {
  it('Test storage operations', async () => {
    const storage = new MemoryStorage();
    const key = 'my-test-key';
    const data = JSON.stringify({ a: 1, b: 2 });

    await storage.setItem(key, data);

    expect(storage.getItem(key)).resolves.toBe(data);
    await storage.removeItem(key);
    expect(storage.getItem(key)).resolves.toBeFalsy();

    await storage.setItem(key, data);

    expect(storage.getItem(key)).resolves.toBeTruthy();
    await storage.clear();
    expect(storage.getItem(key)).resolves.toBeFalsy();
  });
});
