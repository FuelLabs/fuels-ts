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
    tai64: '4611686020108779339',
    unixSeconds: 1681391398,
    unixMilliseconds: 1681391398000,
    isoString: '2023-04-13T13:09:58.000Z',
  },
  nowPlusOneSecond: {
    tai64: '4611686020108779340',
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
    test('should be able to create fromTai64', () => {
      const date = DateTime.fromTai64(now.tai64);

      expect(date).toBeDefined();
      expect(date.toTai64()).toEqual(now.tai64);
    });

    test('should be able to create fromUnixMilliseconds', () => {
      const date = DateTime.fromUnixMilliseconds(now.unixMilliseconds);

      expect(date).toBeDefined();
      expect(date.toUnixMilliseconds()).toEqual(now.unixMilliseconds);
    });

    test('should be able to create fromUnixSeconds', () => {
      const date = DateTime.fromUnixSeconds(now.unixSeconds);

      expect(date).toBeDefined();
      expect(date.toUnixSeconds()).toEqual(now.unixSeconds);
    });
  });

  describe('Extend Date', () => {
    test('should extend basic Date functionality', () => {
      const date = DateTime.fromUnixMilliseconds(now.unixMilliseconds);

      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).toEqual(now.unixMilliseconds);
      expect(date.toISOString()).toEqual(now.isoString);
    });

    test('should be able to set the date', () => {
      const date = DateTime.fromUnixMilliseconds(now.unixMilliseconds);
      expect(date.getTime()).toEqual(now.unixMilliseconds);
      expect(date.toTai64()).toEqual(now.tai64);
      expect(date.toUnixSeconds()).toEqual(now.unixSeconds);
      expect(date.toUnixMilliseconds()).toEqual(now.unixMilliseconds);

      // Set the date to now + 1 second
      date.setTime(nowPlusOneSecond.unixMilliseconds);

      expect(date.getTime()).toEqual(nowPlusOneSecond.unixMilliseconds);
      expect(date.toTai64()).toEqual(nowPlusOneSecond.tai64);
      expect(date.toUnixSeconds()).toEqual(nowPlusOneSecond.unixSeconds);
      expect(date.toUnixMilliseconds()).toEqual(nowPlusOneSecond.unixMilliseconds);
    });
  });

  describe('Helper functions', () => {
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
});
