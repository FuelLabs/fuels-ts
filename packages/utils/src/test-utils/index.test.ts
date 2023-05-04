import * as indexMod from './index';

describe('index.js', () => {
  test('should export all test utilities', () => {
    expect(indexMod.safeExec).toBeTruthy();
    expect(indexMod.getForcProject).toBeTruthy();
  });
});
