import * as indexMod from './index';

describe('index.js', () => {
  test('should export all utilities', () => {
    expect(indexMod.normalizeString).toBeTruthy();
  });
});
