import { launchNode } from './launchNode';

/**
 * The test runner creates a test environment per file,
 * which we can use to isolate the faulty behavior.
 */
/**
 * @group node
 */
describe('launchNode-singular-test', () => {
  const killedNode = {
    url: '',
  };
  afterEach(async () => {
    await expect(fetch(killedNode.url)).rejects.toThrow('fetch failed');
  });
  test('synchronous cleanup kills node before test runner exits', async () => {
    const { cleanup, url } = await launchNode({ loggingEnabled: false });
    killedNode.url = url;
    cleanup();
  });
});
