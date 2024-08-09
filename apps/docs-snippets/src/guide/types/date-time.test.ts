import { DateTime } from 'fuels';

/**
 * @group node
 * @group browser
 */
describe('DateTime Types', () => {
  it('should be able to be created from multiple sources', () => {
    // #region create-from-multiple-sources
    // #import { DateTime };

    const tai64: DateTime = DateTime.fromTai64('4611686020108779339');
    const unixSeconds: DateTime = DateTime.fromUnixSeconds(1681391398);
    const unixMilliseconds: DateTime = DateTime.fromUnixMilliseconds(1681391398000);
    // #endregion create-from-multiple-sources

    expect(tai64).toBeDefined();
    expect(tai64.toTai64()).toBe('4611686020108779339');
    expect(unixSeconds).toBeDefined();
    expect(unixSeconds.toUnixSeconds()).toBe(1681391398);
    expect(unixMilliseconds).toBeDefined();
    expect(unixMilliseconds.toUnixMilliseconds()).toBe(1681391398000);
  });

  it('should be able to create fromTai64 and convert toTai64', () => {
    // #region from-tai-64-and-to-tai-64
    // #import { DateTime };

    const date: DateTime = DateTime.fromTai64('4611686020108779339');
    // #context console.log(date.toIso); // "4611686020108779339"

    const tai64: string = date.toTai64();
    // #context console.log(tai64); // "4611686020108779339"
    // #endregion from-tai-64-and-to-tai-64

    expect(date).toBeDefined();
    expect(date.toISOString()).toEqual('2023-04-13T13:09:58.000Z');
    expect(tai64).toEqual('4611686020108779339');
  });

  it('should be able to create fromUnixMilliseconds and convert toUnixMilliseconds', () => {
    // #region from-unix-milliseconds-and-to-unix-milliseconds
    // #import { DateTime };

    const date: DateTime = DateTime.fromUnixMilliseconds(1681391398000);

    const unixMilliseconds: number = date.toUnixMilliseconds();
    // #context console.log(unixMilliseconds); // 1681391398000
    // #endregion from-unix-milliseconds-and-to-unix-milliseconds

    expect(date).toBeDefined();
    expect(unixMilliseconds).toEqual(1681391398000);
  });

  it('should be able to create fromUnixSeconds and convert toUnixSeconds', () => {
    // #region from-unix-seconds-and-to-unix-seconds
    // #import { DateTime };

    const date: DateTime = DateTime.fromUnixSeconds(1681391398);

    const unixSeconds: number = date.toUnixSeconds();
    // #context console.log(unixSeconds); // 1681391398
    // #endregion from-unix-seconds-and-to-unix-seconds

    expect(date).toBeDefined();
    expect(unixSeconds).toEqual(1681391398);
  });

  /**
   * Utility methods
   */
  it('should extend the Date class', () => {
    // #region date-object-methods
    // #import { DateTime };

    const dateTime: DateTime = DateTime.fromUnixMilliseconds(1681391398000);

    // Extends the Date object
    const date: Date = dateTime;

    // Date object methods
    date.getTime(); // 1681391398000
    date.toISOString(); // 2023-04-13T13:09:58.000Z
    date.toDateString(); // Thu Apr 13 2023
    // #endregion date-object-methods

    expect(dateTime).toBeDefined();
    expect(date).toBeInstanceOf(Date);
    expect(date.getTime()).toEqual(1681391398000);
    expect(date.toISOString()).toEqual('2023-04-13T13:09:58.000Z');
    expect(date.toDateString()).toEqual('Thu Apr 13 2023');
    expect(date.toISOString()).toEqual(dateTime.toISOString());
  });
});
