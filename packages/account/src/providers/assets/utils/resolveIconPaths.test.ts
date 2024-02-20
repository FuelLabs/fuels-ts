import { resolveIconPaths } from './resolveIconPaths';
import { assets } from '..';

/**
 * @group node
 */
describe('resolveIconPaths', () => {
  test('without basePath', () => {
    const result = resolveIconPaths(assets);

    assets.forEach((asset, index) => {
      expect(result[index].icon).toBe(`./${asset.icon}`);
    });
  });

  test('with basePath', () => {
    const result = resolveIconPaths(assets, 'https://some-url.com');

    assets.forEach((asset, index) => {
      expect(result[index].icon).toBe(`https://some-url.com/${asset.icon}`);
    });
  });
});