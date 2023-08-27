import * as indexMod from '.';

/**
 * @group node
 */
describe('index.js', () => {
  test('should export all utilities', () => {
    expect(indexMod.normalizeString).toBeTruthy();
  });
});
