import * as indexMod from './index';

/*
 * @group common/unit
 */
describe('index.js', () => {
  test('should export versions constant', async () => {
    expect(indexMod.versions).toBeTruthy();
  });
});
