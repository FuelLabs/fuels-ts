import { TAI64 } from 'tai64';

export const fromTai64ToDate = (tai64Timestamp: string): Date => {
  const timestamp = TAI64.fromString(tai64Timestamp, 10).toUnix();
  return new Date(timestamp * 1000);
};

export const fromDateToTai64 = (date: Date): string =>
  TAI64.fromUnix(Math.floor(date.getTime() / 1000)).toString(10);

export const fromUnixToDate = (unix: string): Date => new Date(parseInt(unix, 10));

export const toDateFromUnix = (date: Date): string => date.valueOf().toString();

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

  toUnix = () => toDateFromUnix(this);
  toTai64 = () => fromDateToTai64(this);
}
