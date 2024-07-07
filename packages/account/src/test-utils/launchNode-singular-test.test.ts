import { launchNode } from './launchNode';

/**
 * The test runner creates an test environment per file,
 * which we can use to isolate the faulty behavior.
 */
describe('launchNode-singular-test', () => {
  let killedNodeUrl = '';
  afterAll(async () => {
    await expect(fetch(killedNodeUrl)).rejects.toThrow('fetch failed');
  });
  test('synchronous cleanup kills node before test runner exits', async () => {
    const { cleanup, url } = await launchNode();
    killedNodeUrl = url;
    cleanup();
  });
});
