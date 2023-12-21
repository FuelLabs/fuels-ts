import * as indexMod from './test-utils';

/**
 * @group node
 */
describe(__filename, () => {
  test('should export all test utilities', () => {
    expect(indexMod.expectToThrowFuelError).toBeTruthy();
    expect(indexMod.safeExec).toBeTruthy();
  });
});
