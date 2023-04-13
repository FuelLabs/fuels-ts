export const fromTai64ToUnix = (tai64Timestamp: string) =>
  Number(BigInt(tai64Timestamp) - BigInt(2 ** 62) - BigInt(10));

export const fromUnixToTai64 = (unixTimestampMs: number) =>
  (BigInt(unixTimestampMs) + BigInt(2 ** 62) + BigInt(10)).toString();
