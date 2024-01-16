import type { Scalars } from '../__generated__/operations';

export interface ITai64Timestamp {
  readonly tai64: Scalars['Tai64Timestamp'];
}

export interface IDateTime extends Date {
  getTai64(): Scalars['Tai64Timestamp'];
}

/**
 * Time converters.
 *
 * Tai64 (Temps Atomique International) is used internally by fuels-rs
 * https://cr.yp.to/libtai/tai64.html
 * https://cr.yp.to/proto/tai64.txt
 *
 *    To convert from Unix (seconds) to Tai64 (seconds):
 *    TAI64 = Unix(seconds) + UNIX_TAI64_OFFSET
 *
 *    To convert from Tai64 (seconds) to Unix (seconds):
 *    Unix = TAI64(seconds) - UNIX_TAI64_OFFSET
 */
const LEAP_SECONDS_SINCE_EPOCH: number = 10;
const UNIX_TAI64_OFFSET: bigint = BigInt(2 ** 62) + BigInt(LEAP_SECONDS_SINCE_EPOCH);

/**
 * Converting UNIX time units to milliseconds and vice versa.
 */
export const msToSeconds = (ms: number): number => Math.floor(ms / 1000);
export const secondsToMs = (seconds: number): number => seconds * 1000;

/**
 * Converting Tai64 (seconds) time units to UNIX (seconds) time units  and vice versa.
 *
 * Unix(seconds)  = (TAI64  - (2 ** 62) - 10)
 * TAI64(seconds) = (Unix   + (2 ** 62) + 10)
 */
export const tai64ToUnixSeconds = (tai64: Scalars['Tai64Timestamp']): number =>
  Number(BigInt(tai64) - UNIX_TAI64_OFFSET);
export const unixSecondsToTai64 = (unixSeconds: number): string =>
  String(BigInt(unixSeconds) + UNIX_TAI64_OFFSET);

/**
 * Helper to convert Tai64 (seconds) time units to UNIX (milliseconds) time units and vice.
 */
export const tai64ToUnixMilliseconds = (tai64: Scalars['Tai64Timestamp']): number =>
  secondsToMs(tai64ToUnixSeconds(tai64));
export const unixMillisecondsToTai64 = (unixMilliseconds: number): Scalars['Tai64Timestamp'] =>
  unixSecondsToTai64(msToSeconds(unixMilliseconds));

export const unixSecondsToDate = (unixSeconds: number): Date => new Date(secondsToMs(unixSeconds));

export const dateToTai64 = (date: Date): string => unixMillisecondsToTai64(date.getTime());

/**
 * This class is used to represent a date and time in the Tai64 format.
 *
 * ```typescript
 * import { DateTime } from 'fuels';
 *
 * // Constants
 * const tai64 = '4611686020108779313';
 * const unixMilliseconds = 1681391398000;
 *
 * // Instantiation
 * const now = DateTime.now();
 * const tai64 = DateTime.fromTai64(tai64);
 * const unixMs = DateTime.fromUnixMilliseconds(unixMilliseconds);
 *
 * // Custom ()
 * const { tai64 } = now;
 * tai64; // '4611686020108779313'
 *
 * // All date methods are available
 * const { tai64 } = now;
 * now.toISOString(); // '2023-04-13T13:09:58.000Z'
 * now.getTime(); // 1681391398000
 * ```
 */
export class DateTime extends Date implements IDateTime {
  static TAI64_ZERO: Scalars['Tai64Timestamp'] = '';

  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(tai64: Scalars['Tai64Timestamp']): IDateTime {
    return new DateTime(tai64ToUnixMilliseconds(tai64));
  }

  /**
   * Generates a new DateTime instance from a unix milliseconds timestamp.
   *
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(unixMilliseconds: number): IDateTime {
    return new DateTime(unixMilliseconds);
  }

  /**
   * @private
   *
   * Hide the constructor to prevent direct instantiation.
   */
  private constructor(date: Date | number | string) {
    super(date);
  }

  /**
   * Returns the Tai64 timestamp.
   *
   * @returns the Tai64 timestamp
   */
  getTai64(): Scalars['Tai64Timestamp'] {
    return dateToTai64(this);
  }
}
