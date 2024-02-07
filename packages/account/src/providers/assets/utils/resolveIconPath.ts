import type { Assets } from '../types';

import { urlJoin } from './url';

export function resolveIconPath(path: string, assets: Assets) {
  return assets.map((asset) => ({
    ...asset,
    icon: urlJoin(path, asset.icon),
  }));
}
