import type { Command } from 'commander';

import { loadUserConfig } from '../config/loadConfig';
import type { Commands, UserFuelsConfig } from '../types';
import { debug, error } from '../utils/logger';

type BinaryPaths = Pick<UserFuelsConfig, 'forcPath' | 'fuelCorePath'>;

export function withBinaryPaths<CType extends Commands>(
  program: Command,
  _command: CType,
  fn: (paths: BinaryPaths) => void
) {
  return async () => {
    const options = program.opts();

    const paths: BinaryPaths = {};

    try {
      const { userConfig } = await loadUserConfig(options.path);
      paths.forcPath = userConfig.forcPath;
      paths.fuelCorePath = userConfig.fuelCorePath;
    } catch (err) {
      debug((<Error>err).message);
    }

    try {
      await fn(paths);
    } catch (err) {
      error(err);
    }
  };
}
