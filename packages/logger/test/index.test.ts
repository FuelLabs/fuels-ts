import type { AbstractAddress } from '@fuel-ts/interfaces';
import { BN } from '@fuel-ts/math';
import debug from 'debug';
import type { MockInstance } from 'vitest';

import { logger, prefixLogger, defaultLogger } from '../src/index';

/**
 * @group node
 */
describe('Logger Tests', () => {
  let debugSpy: MockInstance;

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

  it('should format BN values with commas correctly using formatter a', () => {
    const bnValue = new BN('1000000');
    const formatted = debug.formatters.a(bnValue);
    expect(formatted).toBe('1,000,000');
  });

  it('should return undefined for null input using formatter a', () => {
    const formatted = debug.formatters.a(null);
    expect(formatted).toBe('undefined');
  });

  it('should format AbstractAddress to b256 string using formatter b', () => {
    const mockAddress = {
      toB256: () => '0xabcdef1234567890',
    };
    const formatted = debug.formatters.b(mockAddress);
    expect(formatted).toBe('0xabcdef1234567890');
  });

  it('should return undefined for null input using formatter b', () => {
    const formatted = debug.formatters.b(null);
    expect(formatted).toBe('undefined');
  });

  it('should format AbstractAddress to bech32 string using formatter c', () => {
    const mockAddress: AbstractAddress = {
      toJSON: () => '',
      toString: () => '0x000000000000000000000000000000000000000000000000000000000000002a',
      toAddress: () => 'fuel1xyzabc123',
      toB256: () => '',
      toHexString: () => '',
      toBytes: () => new Uint8Array(),
      equals: () => false,
    };
    const formatted = debug.formatters.c(mockAddress);
    expect(formatted).toBe('fuel1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq4qvpkv30');
  });

  it('should return undefined for null input using formatter c', () => {
    const formatted = debug.formatters.c(null);
    expect(formatted).toBe('undefined');
  });

  it('should format BN to hex string using formatter h', () => {
    const bnValue = new BN('255');
    const formatted = debug.formatters.h(bnValue);
    expect(formatted).toBe('0xff');
  });

  it('should return undefined for null input using formatter h', () => {
    const formatted = debug.formatters.h(null);
    expect(formatted).toBe('undefined');
  });

  it('should convert hex string to BN string using formatter n', () => {
    const hex = '0xff';
    const formatted = debug.formatters.n(hex);
    expect(formatted).toBe('255');
  });

  it('should return undefined for empty input using formatter n', () => {
    const formatted = debug.formatters.n('');
    expect(formatted).toBe('undefined');
  });

  it('should return invalid hex for invalid input using formatter n', () => {
    const formatted = debug.formatters.n('zzz');
    expect(formatted).toBe('invalid hex');
  });
});
