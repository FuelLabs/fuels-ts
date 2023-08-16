import * as indexMod from '.';

describe('index.js', () => {
  test('should export all utilities', () => {
    expect(indexMod.normalizeString).toBeTruthy();
  });
});
