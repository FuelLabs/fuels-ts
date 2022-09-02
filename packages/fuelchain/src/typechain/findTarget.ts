import _, { compact } from 'lodash';

import { debug } from '../utils/debug';
import { ensureAbsPath } from '../utils/files/ensureAbsPath';
import { tryRequire } from '../utils/modules';

import type { FindChainTarget } from './types';

export function findTarget(target: string): FindChainTarget {
  if (!target) {
    throw new Error(`Please provide --target parameter!`);
  }

  const possiblePaths = [
    `@typechain/${target}`, // external module
    `typechain-target-${target}`, // external module
    ensureAbsPath(target), // path
  ];

  const moduleInfo = _(possiblePaths).compact().map(tryRequire).compact().first();

  if (!moduleInfo || !moduleInfo.module.default) {
    throw new Error(
      `Couldn't find ${target}. Tried loading: ${compact(possiblePaths).join(
        ', '
      )}.\nPerhaps you forgot to install @typechain/${target}?`
    );
  }

  debug('Plugin found at', moduleInfo.path);

  const chainTarget = moduleInfo.module.default;

  chainTarget.extractAbi = moduleInfo.module.extractAbi;

  return chainTarget;
}
