import debug from 'debug';

import { logger, prefixLogger, defaultLogger } from '../src/index';

/**
 * @group node
 */
describe('Logger Tests', () => {
  let debugSpy;

  beforeEach(() => {
    debug.enable('test');
    debugSpy = vi.spyOn(debug, 'log');
  });

  afterEach(() => {
    debugSpy.mockRestore();
  });

  it('should log info messages correctly', () => {
    const log = logger('test');
    const message = 'This is a message';
    log(message);
    const callArgs = debugSpy.mock.calls[0][0];
    expect(callArgs).toContain(`test ${message}`);
  });

  it('should format a b256 string correctly', () => {
    const log = logger('test');
    const mockAddress = {
      toB256: () => '0x123456789abcdef',
      toAddress: () => '0x12345678abcdef',
    };
    const formattedMessage = 'test: %b';

    log(formattedMessage, mockAddress);

    const callArgs = debugSpy.mock.calls[0][0];
    expect(callArgs).toContain('0x123456789abcdef');
  });

  it('should prefix log messages correctly using prefixLogger', () => {
    const prefix = 'my-node';
    const component = 'my-component';
    const message = 'hello world';
    const prefixedLogger = prefixLogger(prefix);
    const log = prefixedLogger.forComponent(component);

    debug.enable('my-node:my-component');

    log(message);
    const callArgs = debugSpy.mock.calls[0][0];
    expect(callArgs).toContain(`${prefix}:${component} ${message}`);
  });

  it('should create a default logger and log messages correctly', () => {
    const defaultLog = defaultLogger();
    const log = defaultLog.forComponent('test-component');
    debug.enable('test-component');
    const message = 'default logger test message';

    log(message);

    const callArgs = debugSpy.mock.calls[0][0];
    expect(callArgs).toContain(`test-component ${message}`);
  });
});
