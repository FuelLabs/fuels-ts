import * as logger from '../../src/utils/logger';

export function mockLogger() {
  const error = vi.spyOn(logger, 'error').mockReturnValue();
  const warn = vi.spyOn(logger, 'warn').mockReturnValue();
  const log = vi.spyOn(logger, 'log').mockReturnValue();
  const debug = vi.spyOn(logger, 'debug').mockReturnValue();
  return {
    error,
    warn,
    log,
    debug,
  };
}
