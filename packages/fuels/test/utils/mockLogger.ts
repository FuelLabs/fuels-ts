import * as logger from '../../src/cli/utils/logger';

export function mockLogger() {
  const error = jest.spyOn(logger, 'error').mockImplementation();
  const warn = jest.spyOn(logger, 'warn').mockImplementation();
  const log = jest.spyOn(logger, 'log').mockImplementation();
  const debug = jest.spyOn(logger, 'debug').mockImplementation();
  return {
    error,
    warn,
    log,
    debug,
  };
}
