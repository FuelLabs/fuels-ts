import * as indexMod from './AbiTypeGen';

describe('index.ts', () => {
  test('should export AbiTypeGen class', () => {
    expect(indexMod.AbiTypeGen).toBeTruthy;
  });
});
