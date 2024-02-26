/**
 * Tai64 timestamp.
 */
type Tai64Timestamp = string;

/**
 * This constant is used to calculate the offset between the Unix epoch and the TAI64 epoch.
 * It allows for a **rough** conversion between the two time formats.
 *
 * // Value expires on:  28 June 2024
 * {@link https://data.iana.org/time-zones/data/leap-seconds.list}
 * {@link https://github.com/hl2/tai64/blob/master/src/leapSeconds.ts}
 */
const TAI64_LEAP_SECONDS: number = 37;

/**
 * Tai64 (Temps Atomique International) is a time format
 *
 * The offset between the Unix epoch and the TAI64 epoch.
 * The TAI64 epoch is 2^62 nanoseconds after the Unix epoch (+ the offset of "leap seconds" relevant to the date).
 *
 * {@link https://cr.yp.to/libtai/tai64.html}
 * {@link https://cr.yp.to/proto/tai64.txt}
 */
const TAI64_UNIX_OFFSET: bigint = BigInt(2 ** 62) + BigInt(TAI64_LEAP_SECONDS);

/**
 * Converts milliseconds to seconds and vice versa.
 *
 * @param ms - milliseconds to convert
 * @returns seconds
 */
const msToSeconds = (ms: number): number => Math.floor(ms / 1000);

/**
 * Converts seconds to milliseconds and vice versa.
 *
 * @param seconds - seconds to convert
 * @returns milliseconds
 */
const secondsToMs = (seconds: number): number => seconds * 1000;

/**
 * Converts Tai64 (seconds) time units to UNIX (seconds) time units.
 *
 * @param tai64 - Tai64 timestamp
 * @returns Unix seconds timestamp
 */
const tai64ToUnixSeconds = (tai64: Tai64Timestamp): number =>
  Number(BigInt(tai64) - TAI64_UNIX_OFFSET);

/**
 * Converts Unix (seconds) to Tai64 (seconds).
 *
 * @param unixSeconds - unix seconds timestamp
 * @returns Tai64 timestamp
 */
const unixSecondsToTai64 = (unixSeconds: number): string =>
  String(BigInt(unixSeconds) + TAI64_UNIX_OFFSET);

/**
 * Helper to convert Tai64 (seconds) time units to UNIX (milliseconds) time units and vice.
 *
 * @param tai64 - Tai64 timestamp
 * @returns Unix milliseconds timestamp
 */
const tai64ToUnixMilliseconds = (tai64: Tai64Timestamp): number =>
  secondsToMs(tai64ToUnixSeconds(tai64));

/**
 * This class is used to represent a date and time in the Tai64 format.
 *
 * ```typescript
 * import { DateTime } from 'fuels';
 *
 * // Constants
 * const tai64 = '4611686020108779340';
 * const unixMilliseconds = 1681391398000;
 * const seconds = 1681391398;
 *
 * // Instantiation
 * let date: DateTime = DateTime.now();
 * date = DateTime.fromTai64(tai64);
 * date = DateTime.fromUnixMilliseconds(unixMilliseconds);
 * date = DateTime.fromUnixSeconds(seconds);
 *
 * // Utility functions
 * tai64.toTai64() // '4611686020108779340'
 * milliseconds.toUnixMilliseconds() // 1681391398000
 * seconds.toUnixSeconds() // 1681391398
 *
 * // All date methods are available
 * const now: Date = DateTime.now();
 * now.toISOString(); // '2023-04-13T13:09:58.000Z'
 * now.getTime(); // 1681391398000
 * ```
 */
export class DateTime extends Date implements Date {
  static TAI64_NULL: Tai64Timestamp = '';

  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(tai64: Tai64Timestamp): DateTime {
    return new DateTime(tai64ToUnixMilliseconds(tai64));
  }

  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(unixMilliseconds: number): DateTime {
    return new DateTime(unixMilliseconds);
  }

  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(unixSeconds: number): DateTime {
    return new DateTime(secondsToMs(unixSeconds));
  }

  /**
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
  toTai64(): Tai64Timestamp {
    return unixSecondsToTai64(this.toUnixSeconds());
  }

  /**
   * @returns the unix milliseconds timestamp
   */
  toUnixMilliseconds(): number {
    return this.getTime();
  }

  /**
   * @returns the unix seconds timestamp
   */
  toUnixSeconds(): number {
    return msToSeconds(this.getTime());
  }
}
