import * as logger from '../../src/cli/utils/logger';

export function mockLogger() {
  const error = vi.spyOn(logger, 'error').mockImplementation(() => {});
  const warn = vi.spyOn(logger, 'warn').mockImplementation(() => {});
  const log = vi.spyOn(logger, 'log').mockImplementation(() => {});
  const debug = vi.spyOn(logger, 'debug').mockImplementation(() => {});
  return {
    error,
    warn,
    log,
    debug,
  };
}
