import { launchNode } from './launchNode';

describe('only one test in this file to verify correct behavior', () => {
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
