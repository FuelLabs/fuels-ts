import { assets as assetList } from './assets';
import { resolveIconPath } from './utils/resolveIconPath';

export * from './constants';
export * from './utils/network';
export * from './utils/resolveIconPath';
export * from './types';

export const assets = assetList;

export default resolveIconPath(process.env.BASE_URL || './', assetList);
