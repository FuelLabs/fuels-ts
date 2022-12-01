import * as indexMod from './index';

describe('index.ts', () => {
  test('should export AbiTypeGen class', () => {
    expect(indexMod.AbiTypeGen).toBeTruthy();
    expect(indexMod.runTypegen).toBeTruthy();
  });
});
