import { DateTime } from './date-time';

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
 * @group browser
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

    test('should be able to convert to Tai64', () => {
      const date = DateTime.fromUnixMilliseconds(now.unixMilliseconds);

      const tai64 = date.toTai64();

      expect(tai64).toEqual(now.tai64);
    })

    test('should be able to convert to toUnixMilliseconds', () => {
      const date = DateTime.fromUnixMilliseconds(now.unixMilliseconds);

      const unixMilliseconds = date.toUnixMilliseconds();

      expect(unixMilliseconds).toEqual(now.unixMilliseconds);
    })

    test('should be able to convert to toUnixSeconds', () => {
      const date = DateTime.fromUnixMilliseconds(now.unixMilliseconds);

      const unixSeconds = date.toUnixSeconds();

      expect(unixSeconds).toEqual(now.unixSeconds);
    })
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
});
