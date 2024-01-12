import { TAI64 } from 'tai64';

/**
 * @hidden
 *
 * Converts a TAI64 timestamp to a Unix timestamp in seconds.
 *
 * TAI64 is a 64-bit unsigned integer format that represents a point in time
 * as the number of TAI seconds elapsed since 00:00:00 TAI, January 1, 1970.
 *
 * Unix timestamp, on the other hand, represents the number of milliseconds
 * elapsed since 00:00:00 UTC, January 1, 1970.
 *
 * To convert a TAI64 timestamp to a Unix timestamp, we need to subtract the
 * TAI64 epoch time (00:00:00 TAI, January 1, 1970) from the TAI64 timestamp
 * and then add the Unix epoch time (00:00:00 UTC, January 1, 1970). The epoch
 * time difference between TAI64 and Unix is 2 ** 62 + 10.
 *
 * @param tai64Timestamp - The TAI64 timestamp to convert.
 * @returns - The Unix timestamp in seconds.
 */
export const fromTai64ToUnix = (tai64Timestamp: string): number =>
  Number(BigInt(tai64Timestamp) - BigInt(2 ** 62) - BigInt(10));

/**
 * @hidden
 *
 * Converts a Unix timestamp in seconds to a TAI64 timestamp.
 *
 * Unix timestamp represents the number of milliseconds elapsed since
 * 00:00:00 UTC, January 1, 1970. TAI64 timestamp is a 64-bit unsigned
 * integer format that represents a point in time as the number of TAI
 * seconds elapsed since 00:00:00 TAI, January 1, 1970.
 *
 * To convert a Unix timestamp to a TAI64 timestamp, we need to add the
 * TAI64 epoch time (00:00:00 TAI, January 1, 1970) to the Unix timestamp
 * and then subtract the Unix epoch time (00:00:00 UTC, January 1, 1970).
 * The epoch time difference between TAI64 and Unix is 2 ** 62 + 10.
 *
 * @param unixTimestampSeconds - The Unix timestamp in seconds to convert.
 * @returns - The TAI64 timestamp as a string.
 */
export const fromUnixToTai64 = (unixTimestampSeconds: number): string =>
  (BigInt(unixTimestampSeconds) + BigInt(2 ** 62) + BigInt(10)).toString();

export const fromTai64ToDate = (tai64Timestamp: string): Date => {
  const timestamp = TAI64.fromString(tai64Timestamp, 10).toUnix();
  return new Date(timestamp * 1000);
};

export const fromDateToTai64 = (date: Date): string =>
  TAI64.fromUnix(Math.floor(date.getTime() / 1000)).toString(10);

export const fromUnixToDate = (unix: string): Date => new Date(parseInt(unix, 10));

export const fromDateToUnix = (date: Date): string => date.valueOf().toString();

export interface IFuelDate extends Date {
  /**
   * @returns Unix timestamp in seconds
   */
  toUnix: () => string;

  /**
   * @returns Unix timestamp in seconds
   */
  toTai64: () => string;
}

export class FuelDate extends Date implements IFuelDate {
  static from = {
    unix: (unix: string): IFuelDate => new FuelDate(fromUnixToDate(unix)),
    tai64: (tai64: string): IFuelDate => new FuelDate(fromTai64ToDate(tai64)),
  };

  toUnix = (): string => fromDateToUnix(this);
  toTai64 = (): string => fromDateToTai64(this);
}
