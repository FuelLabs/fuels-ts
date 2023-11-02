import { sleep } from '../sleep';

import { launchTestNodes } from './launchTestNode';

describe('ltn', () => {
  it('asdflkwjer', async () => {
    const { cleanupAll } = await launchTestNodes({ nodeCount: 10, logger: console.log });
    await sleep(5000);
    await cleanupAll();
  });
});
