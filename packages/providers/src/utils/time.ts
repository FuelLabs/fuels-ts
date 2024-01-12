/**
 * @hidden
 *
 * Converts a TAI64 timestamp to a Unix timestamp in milliseconds.
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
 * @returns - The Unix timestamp in milliseconds.
 */
export const fromTai64ToUnix = (tai64Timestamp: string): number =>
  Number(BigInt(tai64Timestamp) - BigInt(2 ** 62) - BigInt(10));

/**
 * @hidden
 *
 * Converts a Unix timestamp in milliseconds to a TAI64 timestamp.
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
 * @param unixTimestampMs - The Unix timestamp in milliseconds to convert.
 * @returns - The TAI64 timestamp as a string.
 */
export const fromUnixToTai64 = (unixTimestamp: number): string =>
  (BigInt(unixTimestampMs) + BigInt(2 ** 62) + BigInt(10)).toString();
