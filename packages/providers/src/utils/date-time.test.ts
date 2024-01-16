import {
  DateTime,
  dateToTai64,
  msToSeconds,
  secondsToMs,
  tai64ToUnixMilliseconds,
  tai64ToUnixSeconds,
  unixMillisecondsToTai64,
  unixSecondsToDate,
  unixSecondsToTai64,
} from './date-time';

const { now, nowPlusOneSecond } = {
  now: {
    tai64: '4611686020108779312',
    unixSeconds: 1681391398,
    unixMilliseconds: 1681391398000,
    isoString: '2023-04-13T13:09:58.000Z',
  },
  nowPlusOneSecond: {
    tai64: '4611686020108779313',
    unixSeconds: 1681391399,
    unixMilliseconds: 1681391399000,
    isoString: '2023-04-13T13:09:59.000Z',
  },
};

/**
 * @group node
 */
describe('utils/date-time', () => {
  describe('DateTime', () => {
    test('should be able to create fromUnixMilliseconds', () => {
      const date = DateTime.fromUnixMilliseconds(now.unixMilliseconds);

      expect(date).toBeDefined();
      expect(date.getTai64()).toEqual(now.tai64);
      expect(date.getTime()).toEqual(now.unixMilliseconds);
      expect(date.toISOString()).toEqual(now.isoString);
    });

    test('should be able to create fromTai64', () => {
      const date = DateTime.fromTai64(now.tai64);

      expect(date).toBeDefined();
      expect(date.getTai64()).toEqual(now.tai64);
      expect(date.getTime()).toEqual(now.unixMilliseconds);
      expect(date.toISOString()).toEqual(now.isoString);
    });

    test('should be able to set a new date', () => {
      const date = DateTime.fromUnixMilliseconds(now.unixMilliseconds);
      expect(date).toBeDefined();
      expect(date.getTime()).toEqual(now.unixMilliseconds);
      expect(date.getTai64()).toEqual(now.tai64);
      expect(date.toISOString()).toEqual(now.isoString);

      date.setTime(nowPlusOneSecond.unixMilliseconds);

      expect(date).toBeDefined();
      expect(date.getTime()).toEqual(nowPlusOneSecond.unixMilliseconds);
      expect(date.getTai64()).toEqual(nowPlusOneSecond.tai64);
      expect(date.toISOString()).toEqual(nowPlusOneSecond.isoString);
    });
  });

  test('should convert msToSeconds', () => {
    const result = msToSeconds(now.unixMilliseconds);

    expect(result).toEqual(now.unixSeconds);
  });

  test('should convert secondsToMs', () => {
    const result = secondsToMs(now.unixSeconds);

    expect(result).toEqual(now.unixMilliseconds);
  });

  test('should convert tai64ToUnixSeconds', () => {
    const result = tai64ToUnixSeconds(now.tai64);

    expect(result).toEqual(now.unixSeconds);
  });

  test('should convert unixSecondsToTai64', () => {
    const result = unixSecondsToTai64(now.unixSeconds);

    expect(result).toEqual(now.tai64);
  });

  test('should convert tai64ToUnixMilliseconds', () => {
    const result = tai64ToUnixMilliseconds(now.tai64);

    expect(result).toEqual(now.unixMilliseconds);
  });

  test('should convert unixMillisecondsToTai64', () => {
    const result = unixMillisecondsToTai64(now.unixMilliseconds);

    expect(result).toEqual(now.tai64);
  });

  test('should convert unixSecondsToDate', () => {
    const result = unixSecondsToDate(now.unixSeconds);

    expect(result.getTime()).toEqual(now.unixMilliseconds);
  });

  test('should convert dateToTai64', () => {
    const result = dateToTai64(new Date(now.unixMilliseconds));

    expect(result).toEqual(now.tai64);
  });
});
