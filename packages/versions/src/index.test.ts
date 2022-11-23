import { versions } from './index';

describe('index.js', () => {
  test('should export toolchain versions', async () => {
    expect(versions.FUELS_TS_SDK).toBeTruthy();
    expect(versions.FUEL_CORE).toBeTruthy();
    expect(versions.FORC).toBeTruthy();
  });
});
