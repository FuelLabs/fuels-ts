import { launchNode } from './launchNode';

/**
 * The test runner creates a test environment per file,
 * which we can use to isolate the faulty behavior.
 */
/**
 * @group node
 */
describe('launchNode-singular-test', () => {
  let killedNodeUrl = '';
  afterAll(async () => {
    await expect(fetch(killedNodeUrl)).rejects.toThrow('fetch failed');
  });
  test.only('synchronous cleanup kills node before test runner exits', async () => {
    const { cleanup, url } = await launchNode();
    killedNodeUrl = url;
    cleanup();
  });
});
