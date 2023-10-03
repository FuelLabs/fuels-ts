import * as indexMod from './index';

describe('index.js', () => {
  test('should export versions constant', () => {
    expect(indexMod.versions).toBeTruthy();
    expect(indexMod.checkFuelCoreVersionCompatibility).toBeTruthy();
  });
});
