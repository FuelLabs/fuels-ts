import { resetDiskAndMocks } from '../../../test/utils/resetDiskAndMocks';

import * as loggerMod from './logger';

/**
 * @group node
 */
describe('logger', () => {
  const { configureLogging, loggingConfig } = loggerMod;

  const loggingBackup = structuredClone(loggingConfig);

  const reset = () => {
    resetDiskAndMocks();
    configureLogging(loggingBackup);
  };

  beforeEach(reset);
  afterAll(reset);

  function mockStdIO() {
    const err = vi.spyOn(process.stderr, 'write').mockReturnValue(true);
    const out = vi.spyOn(process.stdout, 'write').mockReturnValue(true);
    return { err, out };
  }

  test('should configure logging', () => {
    configureLogging({ isLoggingEnabled: true, isDebugEnabled: false });
    expect(loggingConfig.isLoggingEnabled).toEqual(true);
    expect(loggingConfig.isDebugEnabled).toEqual(false);

    configureLogging({ isLoggingEnabled: false, isDebugEnabled: true });
    expect(loggingConfig.isLoggingEnabled).toEqual(false);
    expect(loggingConfig.isDebugEnabled).toEqual(false);

    configureLogging({ isLoggingEnabled: true, isDebugEnabled: true });
    expect(loggingConfig.isLoggingEnabled).toEqual(true);
    expect(loggingConfig.isDebugEnabled).toEqual(true);
  });

  test('should log', () => {
    const { err, out } = mockStdIO();
    configureLogging({ isLoggingEnabled: true, isDebugEnabled: false });
    loggerMod.log('any message');
    expect(out).toHaveBeenCalledTimes(1);
    expect(out.mock.calls[0][0]).toMatch(/any message/);
    expect(err).toHaveBeenCalledTimes(0);
  });

  test('should not log', () => {
    const { err, out } = mockStdIO();
    configureLogging({ isLoggingEnabled: false, isDebugEnabled: false });
    loggerMod.log('any message');
    expect(out).toHaveBeenCalledTimes(0);
    expect(err).toHaveBeenCalledTimes(0);
  });

  test('should debug', () => {
    const { err, out } = mockStdIO();
    configureLogging({ isLoggingEnabled: true, isDebugEnabled: true });
    loggerMod.debug('any debug message');
    expect(out).toHaveBeenCalledTimes(1);
    expect(out.mock.calls[0][0]).toMatch(/any debug message/);
    expect(err).toHaveBeenCalledTimes(0);
  });

  test('should not log', () => {
    const { err, out } = mockStdIO();
    configureLogging({ isLoggingEnabled: false, isDebugEnabled: false });
    loggerMod.debug('any debug message');
    expect(out).toHaveBeenCalledTimes(0);
    expect(err).toHaveBeenCalledTimes(0);
  });

  test('should warn', () => {
    const { err, out } = mockStdIO();
    loggerMod.warn('any warn message');
    expect(out).toHaveBeenCalledTimes(1);
    expect(out.mock.calls[0][0]).toMatch(/any warn message/);
    expect(err).toHaveBeenCalledTimes(0);
  });

  test('should error', () => {
    const { err, out } = mockStdIO();
    loggerMod.error('any error message');
    expect(out).toHaveBeenCalledTimes(0);
    expect(err).toHaveBeenCalledTimes(1);
    expect(err.mock.calls[0][0]).toMatch(/any error message/);
  });
});
