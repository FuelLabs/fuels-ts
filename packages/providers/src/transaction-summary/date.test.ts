import * as tai64Mod from 'tai64';

import * as dateMod from './date';
import type { IFuelDate } from './date';

const { fromTai64ToDate: tai64toDate, fromDateToTai64: dateToTai64, FuelDate } = dateMod;

/**
 * @group node
 */
describe('transaction-summary/date', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should convert TAI64 to Date correctly', () => {
    const fromStringSpy = vi.spyOn(tai64Mod.TAI64, 'fromString');
    const toUnixSpy = vi.spyOn(tai64Mod.TAI64.prototype, 'toUnix');

    const tai64Timestamp = '4611686020121838636';

    tai64toDate(tai64Timestamp);

    expect(fromStringSpy).toHaveBeenCalledTimes(1);
    expect(fromStringSpy).toHaveBeenCalledWith(tai64Timestamp, 10);

    expect(toUnixSpy).toHaveBeenCalledTimes(1);
  });

  it('should convert Date to TAI64 correctly', () => {
    const fromUnixSpy = vi.spyOn(tai64Mod.TAI64, 'fromUnix');
    const toStringSpy = vi.spyOn(tai64Mod.TAI64.prototype, 'toString');

    const date = new Date();

    dateToTai64(date);

    expect(fromUnixSpy).toHaveBeenCalledTimes(1);
    expect(fromUnixSpy).toHaveBeenCalledWith(Math.floor(date.getTime() / 1000));

    expect(toStringSpy).toHaveBeenCalledTimes(1);
    expect(toStringSpy).toHaveBeenCalledWith(10);
  });

  it('should convert unix to Date correctly', () => {
    const date = new Date();
    const unixTimestamp = date.valueOf().toString();
    const dateSpy = vi.spyOn(global, 'Date').mockImplementation(() => date);

    const result = dateMod.fromUnixToDate(unixTimestamp);

    expect(dateSpy).toHaveBeenCalledTimes(1);
    expect(dateSpy).toHaveBeenCalledWith(parseInt(unixTimestamp, 10));
    expect(result).toEqual(date);
  });

  it('should convert Date to unix correctly', () => {
    const date = new Date();
    const unixTimestamp = date.valueOf().toString();

    const result = dateMod.toDateFromUnix(date);

    expect(result).toEqual(unixTimestamp);
  });
});

describe('FuelDate', () => {
  /** Should implement {@link Date} */
  test('should implement the Date interface', () => {
    const date: IFuelDate = new FuelDate();

    expect(date.toISOString).toBeDefined();
    expect(date.toDateString).toBeDefined();
    expect(date.toISOString).toBeDefined();
    expect(date.toJSON).toBeDefined();
    expect(date.toTimeString).toBeDefined();
    expect(date.toUTCString).toBeDefined();
    expect(date.valueOf).toBeDefined();
  });

  /** Implement {@link IFuelDate} */
  it('should implment the IFuelDate interface', () => {
    const date: IFuelDate = new FuelDate();

    expect(date.toUnix).toBeDefined();
    expect(date.toTai64).toBeDefined();
  });

  describe('unix', () => {
    test('should be able to instantiate from unix', () => {
      const fromUnixToDateSpy = vi.spyOn(dateMod, 'fromUnixToDate');
      const unixTimestamp = '1694450695000';

      const result = FuelDate.from.unix(unixTimestamp);

      expect(result).toBeDefined();
      expect(fromUnixToDateSpy).toHaveBeenCalledTimes(1);
      expect(fromUnixToDateSpy).toHaveBeenCalledWith(unixTimestamp);
    });

    test('should be able to output a unix timestamp', () => {
      const unixTimestamp = '1694450695000';
      const date = FuelDate.from.unix(unixTimestamp);

      const result = date.toUnix();

      expect(result).toEqual(unixTimestamp);
    });

    test('should be able to output a tai64 timestamp', () => {
      const unixTimestamp = '1694450695000';
      const tai64Timestamp = '4611686020121838636';
      const date = FuelDate.from.unix(unixTimestamp);

      const result = date.toTai64();

      expect(result).toEqual(tai64Timestamp);
    });
  });

  describe('tai64', () => {
    test('should be able to instantiate from tai64', () => {
      const tai64toDateSpy = vi.spyOn(dateMod, 'fromTai64ToDate');
      const tai64Timestamp = '4611686020121838636';

      const result = FuelDate.from.tai64(tai64Timestamp);

      expect(result).toBeDefined();
      expect(tai64toDateSpy).toHaveBeenCalledTimes(1);
      expect(tai64toDateSpy).toHaveBeenCalledWith(tai64Timestamp);
    });

    test('should be able to output a unix timestamp', () => {
      const tai64Timestamp = '4611686020121838636';
      const unixTimestamp = '1694450695000';
      const date = FuelDate.from.tai64(tai64Timestamp);

      const result = date.toUnix();

      expect(result).toEqual(unixTimestamp);
    });

    test('should be able to output a tai64 timestamp', () => {
      const tai64Timestamp = '4611686020121838636';
      const date = FuelDate.from.tai64(tai64Timestamp);

      const result = date.toTai64();

      expect(result).toEqual(tai64Timestamp);
    });
  });
});
