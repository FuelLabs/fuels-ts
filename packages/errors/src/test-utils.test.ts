import * as indexMod from './test-utils';

describe(__filename, () => {
  test('should export all test utilities', () => {
    expect(indexMod.expectToThrowFuelError).toBeTruthy();
    expect(indexMod.safeExec).toBeTruthy();
  });
});
