import * as indexMod from '.';

/**
 * @group node
 * @group browser
 */
describe('index.js', () => {
  test('should export all utilities', () => {
    expect(indexMod.normalizeString).toBeTruthy();
    expect(indexMod.chunkAndPadBytes).toBeTruthy();
    expect(indexMod.concatBytes).toBeTruthy();
    expect(indexMod.concat).toBeTruthy();
  });
});
