import * as indexMod from './test-utils';

/**
 * @group node
 */
describe('index.js', () => {
  test('should export all test utilities', () => {
    expect(indexMod.getForcProject).toBeTruthy();
  });
});
