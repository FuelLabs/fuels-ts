import type { IDateTime } from 'fuels';
import { DateTime } from 'fuels';

/**
 * @group node
 */
describe(__filename, () => {
  /**
   * Creating a DateTime instance
   */
  it('should be able to instantiate from multiple time/date formats', () => {
    // #region instantiation-methods
    // #context import type { IDateTime } from 'fuels';
    // #context import { DateTime } from 'fuels';

    let date: IDateTime | Date;

    // fromUnixMilliseconds
    const unixMilliseconds = 1681391398000;
    date = DateTime.fromUnixMilliseconds(unixMilliseconds);
    date.toISOString(); // 2023-04-13T13:09:58.000Z

    // fromUnixSeconds
    const unixSeconds = 1681391398;
    date = DateTime.fromUnixSeconds(unixSeconds);
    date.toISOString(); // 2023-04-13T13:09:58.000Z

    // fromTai64
    const tai64 = '4611686020108779312';
    date = DateTime.fromTai64(tai64);
    date.toISOString(); // 2023-04-13T13:09:58.000Z
    // #endregion instantiation-methods
  });

  /**
   * Utility methods
   */
  it('should be able to convert to multiple time/date formats', () => {
    // #region utility-functions
    // #context import type { IDateTime } from 'fuels';
    // #context import { DateTime } from 'fuels';

    const date: IDateTime = DateTime.fromUnixMilliseconds(1681391398000);

    // Our utility methods
    date.toTai64(); // (String) "4611686020108779312"
    date.toUnixMilliseconds(); // 1681391398000
    date.toUnixSeconds(); // 1681391398

    // Date object methods
    date.toISOString(); // 2023-04-13T13:09:58.000Z
    date.toDateString(); // Wed Apr 13 2023
    // ...
    // #endregion utility-functions
  });
});
