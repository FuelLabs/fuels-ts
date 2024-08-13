import * as testUtilsMod from './test-utils';

/**
 * @group node
 */
describe('test-utils.js', () => {
  test('should export all test utilities', () => {
    expect(testUtilsMod.generateTestWallet).toBeTruthy();
    expect(testUtilsMod.seedTestWallet).toBeTruthy();
    expect(testUtilsMod.launchNode).toBeTruthy();
    expect(testUtilsMod.setupTestProviderAndWallets).toBeTruthy();
    expect(testUtilsMod.WalletsConfig).toBeTruthy();
    expect(testUtilsMod.TestMessage).toBeTruthy();
    expect(testUtilsMod.TestAssetId).toBeTruthy();
  });
});
