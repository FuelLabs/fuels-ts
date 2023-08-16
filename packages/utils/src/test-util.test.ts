import * as indexMod from './test-utils';
import { TEST_BROWSER } from './test-utils/constants';

describe('index.js', () => {
  test(`${TEST_BROWSER} - should export all test utilities`, () => {
    expect(indexMod.safeExec).toBeTruthy();
    expect(indexMod.getForcProject).toBeTruthy();
    expect(indexMod.TEST_BROWSER).toBeTruthy();
    expect(indexMod.TEST_NODE).toBeTruthy();
  });
});
