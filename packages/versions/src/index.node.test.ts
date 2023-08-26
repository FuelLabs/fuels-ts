import * as indexMod from './index';

/**
 * @group node
 */
describe('index.js', () => {
  test('should export versions constant', () => {
    expect(indexMod.versions).toBeTruthy();
  });
});
