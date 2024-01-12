import * as tai64Mod from 'tai64';

import * as timeMod from './time';

const { fromTai64ToDate: tai64toDate, fromDateToTai64: dateToTai64, FuelDate } = timeMod;

/**
 * @group node
 */
describe('utils/time', () => {
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

  test('fromTai64ToUnix', () => {
    const unixTimestampInSeconds = 1681391398;
    const tai64Timestamp = '4611686020108779312';

    const result = timeMod.fromTai64ToUnix(tai64Timestamp);

    expect(result).toEqual(unixTimestampInSeconds);
  });

  test('fromUnixToTai64', () => {
    const unixTimestampInSeconds = 1681391398;
    const tai64Timestamp = '4611686020108779312';

    const result = timeMod.fromUnixToTai64(unixTimestampInSeconds);

    expect(result).toEqual(tai64Timestamp);
  });
});

describe('FuelDate', () => {
  /** Should implement {@link Date} */
  test('should implement the Date interface', () => {
    const date: timeMod.IFuelDate = new FuelDate();

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
    const date: timeMod.IFuelDate = new FuelDate();

    expect(date.toUnix).toBeDefined();
    expect(date.toTai64).toBeDefined();
  });

  test('should be to format toTai64', () => {
    const unixTimestampMs = 1694450695000;
    const tai64Timestamp = '4611686020121838636';
    const date = FuelDate.from.unix.milliseconds(unixTimestampMs);

    const result = date.toTai64();

    expect(result).toEqual(tai64Timestamp);
  });

  test('should be able to format toUnix', () => {
    const tai64Timestamp = '4611686020121838636';
    const unixTimestampSeconds = 1694450695;
    const date = FuelDate.from.tai64(tai64Timestamp);

    const result = date.toUnix();

    expect(result).toEqual(unixTimestampSeconds);
  });

  describe('from', () => {
    test('should be able to instantiate from unix in milliseconds', () => {
      const unixTimestampMs = 1694450695000;

      const result = FuelDate.from.unix.milliseconds(unixTimestampMs);

      expect(result).toBeDefined();
      expect(result.toUnix).toEqual(expect.any(Function));
      expect(result.toTai64).toEqual(expect.any(Function));
    });

    test('should be able to instantiate from unix in seconds', () => {
      const unixTimestampSeconds = 1694450695;

      const result = FuelDate.from.unix.milliseconds(unixTimestampSeconds);

      expect(result).toBeDefined();
      expect(result.toUnix).toEqual(expect.any(Function));
      expect(result.toTai64).toEqual(expect.any(Function));
    });

    test('should be able to instantiate from tai64', () => {
      const tai64Timestamp = '4611686020121838636';

      const result = FuelDate.from.tai64(tai64Timestamp);

      expect(result).toBeDefined();
      expect(result.toUnix).toEqual(expect.any(Function));
      expect(result.toTai64).toEqual(expect.any(Function));
    });

    it('should have equal dates, given equal timestamp formats', () => {
      const tai64Timestamp = '4611686020108779312';
      const unixTimestampSeconds = 1681391398;
      const unixTimestampMs = 1681391398000;

      const tai64 = FuelDate.from.tai64(tai64Timestamp);
      const unixMs = FuelDate.from.unix.milliseconds(unixTimestampMs);
      const unixSeconds = FuelDate.from.unix.seconds(unixTimestampSeconds);

      expect(tai64).toEqual(unixMs);
      expect(unixMs).toEqual(unixSeconds);
      expect(unixSeconds).toEqual(tai64);
    });
  });
});
