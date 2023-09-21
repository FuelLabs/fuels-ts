import * as indexMod from './test-utils';

describe('index.js', () => {
  test('should export all test utilities', () => {
    expect(indexMod.getForcProject).toBeTruthy();
    expect(indexMod.launchNode).toBeTruthy();
  });
});
