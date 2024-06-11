import debug from 'debug';

import { logger } from '../src/index';

/**
 * @group node
 */
describe('Logger Tests', () => {
  let debugSpy: any;

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
    expect(callArgs.substring(callArgs.indexOf(' '))).toBe(` test ${message}`);
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
});
