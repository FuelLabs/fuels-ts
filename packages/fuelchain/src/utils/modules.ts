/* eslint-disable import/no-dynamic-require */
/* eslint-disable consistent-return */
/* eslint-disable global-require */
import { debug } from './debug';

export function tryRequire(name: string): { module: any; name: string; path: string } | undefined {
  try {
    let path: string;
    try {
      path = require.resolve(name, { paths: [process.cwd()] });
    } catch {
      path = require.resolve(name);
    }

    const module = { module: require(path), name, path };
    debug('Load successfully: ', name);
    return module;
  } catch (err) {
    if (err instanceof Error && err.message.startsWith(`Cannot find module '${name}'`)) {
      // this error is expected
    } else {
      throw err;
    }
    debug("Couldn't load: ", name);
  }
}
