import { versions } from './index';

describe('index.js', () => {
  test('should export toolchain versions', async () => {
    expect(versions.FUELS).toBeTruthy();
    expect(versions.FUEL_CORE).toBeTruthy();
    expect(versions.FORC).toBeTruthy();
  });
});
