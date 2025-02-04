import chalk from 'chalk';

import * as loggerMod from './logger';
import { configureLogging, debug, error, log, loggingConfig, warn } from './logger';

/**
 * @group node
 */
describe('logger', () => {
  const loggingBackup = structuredClone(loggingConfig);
  beforeEach(() => {
    configureLogging(loggingBackup);
  });
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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    configureLogging({ isLoggingEnabled: true, isDebugEnabled: false });
    log('message');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('message');
  });

  test('should not log', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    configureLogging({ isLoggingEnabled: false, isDebugEnabled: false });
    log('any message');
    expect(logSpy).not.toHaveBeenCalled();
  });

  test('should debug', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    configureLogging({ isLoggingEnabled: true, isDebugEnabled: true });
    debug('message');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('message');
  });

  test('should not log', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    configureLogging({ isLoggingEnabled: false, isDebugEnabled: false });
    loggerMod.debug('any debug message');
    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  test('should warn', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    warn('message1', 'message2');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(chalk.yellow('message1 message2'));
  });

  test('should error', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    error('message1', 'message2');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(chalk.red('message1 message2'));
  });
});
