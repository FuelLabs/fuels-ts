import * as timeMod from './time';

const { fromTai64ToDate: tai64toDate, fromDateToTai64: dateToTai64, FuelDate } = timeMod;

const tai64 = '4611686020108779312';
const unixSeconds = 1681391398;
const unixMilliseconds = 1681391398000;

/**
 * @group node
 */
describe('utils/time', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should convert TAI64 to Date correctly', () => {
    const result = tai64toDate(tai64);

    expect(result).toEqual(new Date(unixMilliseconds));
  });

  it('should convert Date to TAI64 correctly', () => {
    const date = new Date(unixMilliseconds);

    const result = dateToTai64(date);

    expect(result).toEqual(tai64);
  });

  test('fromTai64ToUnix', () => {
    const result = timeMod.fromTai64ToUnix(tai64);

    expect(result).toEqual(unixSeconds);
  });

  test('fromUnixToTai64', () => {
    const result = timeMod.fromUnixToTai64(unixSeconds);

    expect(result).toEqual(tai64);
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
    const date = FuelDate.from.unix.milliseconds(unixMilliseconds);

    const result = date.toTai64();

    expect(result).toEqual(tai64);
  });

  test('should be able to format toUnix', () => {
    const date = FuelDate.from.tai64(tai64);

    const result = date.getTime();

    expect(result).toEqual(unixMilliseconds);
  });

  describe('from', () => {
    test('should be able to instantiate from unix in milliseconds', () => {
      const result = FuelDate.from.unix.milliseconds(unixMilliseconds);

      expect(result).toBeDefined();
      expect(result.toUnix).toEqual(expect.any(Function));
      expect(result.toTai64).toEqual(expect.any(Function));
    });

    test('should be able to instantiate from unix in seconds', () => {
      const result = FuelDate.from.unix.milliseconds(unixSeconds);

      expect(result).toBeDefined();
      expect(result.toUnix).toEqual(expect.any(Function));
      expect(result.toTai64).toEqual(expect.any(Function));
    });

    test('should be able to instantiate from tai64', () => {
      const result = FuelDate.from.tai64(tai64);

      expect(result).toBeDefined();
      expect(result.toUnix).toEqual(expect.any(Function));
      expect(result.toTai64).toEqual(expect.any(Function));
    });

    it('should have equal dates, given equal timestamp formats', () => {
      const tai64Date = FuelDate.from.tai64(tai64);
      const unixMsDate = FuelDate.from.unix.milliseconds(unixMilliseconds);
      const unixSecondsDate = FuelDate.from.unix.seconds(unixSeconds);

      expect(tai64Date).toEqual(unixMsDate);
      expect(unixMsDate).toEqual(unixSecondsDate);
      expect(unixSecondsDate).toEqual(tai64Date);
    });
  });
});
