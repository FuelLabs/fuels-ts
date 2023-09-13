import * as tai64Mod from 'tai64';

import * as dateMod from './date';

const { tai64toDate, dateToTai64 } = dateMod;

describe('transaction-summary/date', () => {
  afterEach(jest.restoreAllMocks);

  it('should convert TAI64 to Date correctly', () => {
    const fromStringSpy = jest.spyOn(tai64Mod.TAI64, 'fromString');
    const toUnixSpy = jest.spyOn(tai64Mod.TAI64.prototype, 'toUnix');

    const tai64Timestamp = '4611686020121838636';

    tai64toDate(tai64Timestamp);

    expect(fromStringSpy).toHaveBeenCalledTimes(1);
    expect(fromStringSpy).toHaveBeenCalledWith(tai64Timestamp, 10);

    expect(toUnixSpy).toHaveBeenCalledTimes(1);
  });

  it('should convert Date to TAI64 correctly', () => {
    const fromUnixSpy = jest.spyOn(tai64Mod.TAI64, 'fromUnix');
    const toStringSpy = jest.spyOn(tai64Mod.TAI64.prototype, 'toString');

    const date = new Date();

    dateToTai64(date);

    expect(fromUnixSpy).toHaveBeenCalledTimes(1);
    expect(fromUnixSpy).toHaveBeenCalledWith(Math.floor(date.getTime() / 1000));

    expect(toStringSpy).toHaveBeenCalledTimes(1);
    expect(toStringSpy).toHaveBeenCalledWith(10);
  });
});
