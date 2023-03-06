import * as indexMod from './index';

describe('index.js', () => {
  test('should export versions constant', async () => {
    expect(indexMod.versions).toBeTruthy();
  });
});
