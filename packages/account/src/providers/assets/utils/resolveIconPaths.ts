import type { Assets } from '../types';

import { urlJoin } from './url';

/**
 * Returns the list of assets with the icon paths 'resolved'. eg. `./eth.svg` -> `https://some-url.com/eth.svg`
 * @param assets - List of assets
 * @param basePath - Base path for the icon URLs (default: './')
 * @returns The assets with the icon paths resolved
 */
export function resolveIconPaths(assets: Assets, basePath = './') {
  return assets.map((asset) => ({
    ...asset,
    icon: urlJoin(basePath, asset.icon),
  }));
}
