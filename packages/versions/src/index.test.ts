import * as indexMod from './index';

describe('index.js', () => {
  test('should export default methods', async () => {
    expect(indexMod.versions).toBeTruthy();
    expect(indexMod.runVersions).toBeTruthy();
  });
});
