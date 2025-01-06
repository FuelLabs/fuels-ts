/* eslint-disable @typescript-eslint/no-shadow */
/**
 * @packageDocumentation
 *
 * A logger for fuel based on the [debug](https://www.npmjs.com/package/debug) module.
 *
 * @example
 *
 * ```TypeScript
 * import { logger } from '@fuel-ts/logger'
 *
 * const log = logger('fuel-ts:my:package:name')
 *
 * try {
 *   // an operation
 *   log('something happened: %s', 'it was ok')
 * } catch (err) {
 *   log.error('something bad happened: %o', err)
 * }
 *
 * log('with this walletAddress: %w', address)
 * log('and this B256: %b', address)
 * ```
 *
 * ```console
 * $ DEBUG=fuel-ts:* node index.js
 * something happened: it was ok
 * something bad happened: <stack trace>
 * with this walletAddress: 0xf212....3aDc
 * ```
 */

import type { Address } from '@fuel-ts/address';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import debug from 'debug';

import { truncateWalletAddress } from './utils';

function createDisabledLogger(namespace: string): debug.Debugger {
  const logger = (): void => {};
  logger.enabled = false;
  logger.color = '';
  logger.diff = 0;
  logger.log = (): void => {};
  logger.namespace = namespace;
  logger.destroy = () => true;
  logger.extend = () => logger;

  return logger;
}

/**
 * Creates a logger for the passed component name.
 *
 * @example
 *
 * ```TypeScript
 * import { logger } from '@fuel-ts/logger'
 *
 * const log = logger('my-component')
 * log.info('hello world')
 * // logs "my-component hello world"
 * ```
 */
export function logger(name: string): Logger {
  // info logging is a no-op by default
  let info: debug.Debugger = createDisabledLogger(`${name}:info`);

  // look at all the debug names and see if info logging has explicitly been enabled
  if (
    debug.enabled(`${name}:info`) &&
    debug.names.map((r) => r.toString()).find((n) => n.includes(':info')) != null
  ) {
    info = debug(`${name}:info`);
  }

  return Object.assign(debug(name), {
    error: debug(`${name}:error`),
    warn: debug(`${name}:warn`),
    info,
  });
}

export function disable(): void {
  debug.disable();
}

export function enable(namespaces: string): void {
  debug.enable(namespaces);
}

export function enabled(namespaces: string): boolean {
  return debug.enabled(namespaces);
}

// Add a formatter for outputting a comma separated BN string
debug.formatters.a = (v?: BN): string => {
  if (!v) {
    return 'undefined';
  }
  return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Add a formatter for converting to a b256 string
debug.formatters.b = (v?: AbstractAddress): string => (v == null ? 'undefined' : v.toB256());

// Add a formatter for outputting a BN hex string
debug.formatters.h = (v?: BN): string => (v == null ? 'undefined' : v.toHex());

// Converts a hex string to a BN string
debug.formatters.n = (hex: string): string => {
  if (!hex) {
    return 'undefined';
  }
  try {
    const bnValue = bn(hex, 'hex');
    return bnValue.toString();
  } catch (error) {
    return 'invalid hex';
  }
};

export interface Logger {
  (formatter: unknown, ...args: unknown[]): void;
  error(formatter: unknown, ...args: unknown[]): void;
  warn(formatter: unknown, ...args: unknown[]): void;
  info(formatter: unknown, ...args: unknown[]): void;
  enabled: boolean;
}

export interface ComponentLogger {
  forComponent(name: string): Logger;
}

export interface AddressLoggerOptions {
  prefixLength: number;
  suffixLength: number;
}

/**
 * Create a component logger that will prefix any log messages with the passed
 * string.
 *
 * @example
 *
 * ```TypeScript
 * import { prefixLogger } from '@fuel-ts/logger'
 *
 * const logger = prefixLogger('my-node')
 *
 * const log = logger.forComponent('my-component')
 * log.info('hello world')
 * // logs "my-node:my-component hello world"
 * ```
 */
export function prefixLogger(prefix: string): ComponentLogger {
  return {
    forComponent(name: string) {
      return logger(`${prefix}:${name}`);
    },
  };
}

/**
 * Create a component logger that will prefix any log messages with a truncated
 * wallet address.
 *
 * @example
 *
 * ```TypeScript
 * import { walletLogger } from '@fuel-ts/logger'
 *
 * const walletAddress = wallet.address.toAddress()
 * const logger = walletLogger(walletAddress)
 *
 * const log = logger.forComponent('my-component')
 * log.info('hello world')
 * ```
 */
export function walletLogger(
  walletAddress: Address,
  options: Partial<AddressLoggerOptions> = {}
): ComponentLogger {
  return prefixLogger(truncateWalletAddress(walletAddress, options));
}

/**
 * Create a component logger
 *
 * @example
 *
 * ```TypeScript
 * import { defaultLogger } from '@fuel-ts/logger'
 *
 * const logger = defaultLogger()
 *
 * const log = logger.forComponent('my-package')
 * log.info('hello world')
 * // logs "my-package hello world"
 * ```
 */
export function defaultLogger(): ComponentLogger {
  return {
    forComponent(name: string) {
      return logger(name);
    },
  };
}
