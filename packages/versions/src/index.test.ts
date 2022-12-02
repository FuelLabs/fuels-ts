import * as versionsMod from './index';

describe('index.js', () => {
  test('should export default methods', async () => {
    expect(versionsMod.versions).toBeTruthy();
  });
});
