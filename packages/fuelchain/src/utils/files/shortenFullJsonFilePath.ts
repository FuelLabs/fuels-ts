/* eslint-disable prefer-template */
import { posix } from 'path';

/**
 * Transforms all paths matching `ContractName(\.sol)?/ContractName.ext`
 */
export function shortenFullJsonFilePath(path: string, allPaths: string[]) {
  const { name, dir, base } = posix.parse(path);

  if (allPaths.filter((p) => p.startsWith(dir + '/')).length > 1) {
    return path;
  }

  if (dir.endsWith(`/${name}.sol`) || dir.endsWith(`/${name}`)) {
    return dir.split('/').slice(0, -1).join('/') + '/' + base;
  }

  return path;
}
