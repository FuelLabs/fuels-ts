import { TAI64 } from 'tai64';

export const fromTai64ToDate = (tai64Timestamp: string) => {
  const timestamp = TAI64.fromString(tai64Timestamp, 10).toUnix();
  return new Date(timestamp * 1000);
};

export const fromDateToTai64 = (date: Date) =>
  TAI64.fromUnix(Math.floor(date.getTime() / 1000)).toString(10);
