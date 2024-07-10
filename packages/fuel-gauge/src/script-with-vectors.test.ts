import type { BigNumberish } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { getScript } from './utils';

/**
 * @group node
 * @group browser
 */
describe('Script With Vectors', () => {
  it('can call script and use main argument [array]', async () => {
    using launched = await launchTestNode({
      walletsConfig: {
        amountPerCoin: 1_000_000,
      },
    });

    const {
      wallets: [wallet],
    } = launched;

    const someArray = [1, 100];
    const scriptInstance = getScript<[BigNumberish[]], void>('script-with-array', wallet);

    const { waitForResult } = await scriptInstance.functions.main(someArray).call();
    const { logs } = await waitForResult();

    expect(logs.map((n) => n.toNumber())).toEqual([1]);
  });

  it('can call script and use main argument [vec]', async () => {
    using launched = await launchTestNode({
      walletsConfig: {
        amountPerCoin: 1_000_000,
      },
    });

    const {
      wallets: [wallet],
    } = launched;

    const someVec = [7, 2, 1, 5];
    const scriptInstance = getScript<[BigNumberish[]], void>('script-with-vector', wallet);

    const scriptInvocationScope = scriptInstance.functions.main(someVec);

    const { waitForResult } = await scriptInvocationScope.call();
    const { logs } = await waitForResult();

    const formattedLog = logs.map((l) => (typeof l === 'string' ? l : l.toNumber()));

    const vecFirst = someVec[0];
    const vecCapacity = 4;
    const vecLen = 4;

    expect(formattedLog).toEqual([
      vecFirst,
      'vector.capacity()',
      vecCapacity,
      'vector.len()',
      vecLen,
    ]);
  });

  it('can call script and use main argument [struct in vec in struct in vec in struct in vec]', async () => {
    using launched = await launchTestNode({
      walletsConfig: {
        amountPerCoin: 1_000_000,
      },
    });

    const {
      wallets: [wallet],
    } = launched;

    const importantDates = [
      {
        dates: [
          {
            day: 29,
            month: 12,
            year: 2020,
          },
          {
            day: 12,
            month: 8,
            year: 2019,
          },
        ],
        tag: 4,
        lag: 7,
      },
      {
        dates: [
          {
            day: 22,
            month: 10,
            year: 1980,
          },
        ],
        tag: 3,
        lag: 9,
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scriptInstance = getScript<[any], void>('script-with-vector-mixed', wallet);

    const { waitForResult } = await scriptInstance.functions.main(importantDates).call();
    const { value } = await waitForResult();
    expect(value).toBe(true);
  });

  it('can call script and use main argument [struct in vec in struct in vec in struct in vec]', async () => {
    using launched = await launchTestNode({
      walletsConfig: {
        amountPerCoin: 1_000_000,
      },
    });

    const {
      wallets: [wallet],
    } = launched;

    const scores = [24, 56, 43];

    const importantDates = [
      {
        dates: [
          {
            day: 29,
            month: 12,
            year: 2020,
          },
          {
            day: 12,
            month: 8,
            year: 2019,
          },
        ],
        tag: 1,
        lag: 7,
      },
      {
        dates: [
          {
            day: 22,
            month: 10,
            year: 1980,
          },
        ],
        tag: 2,
        lag: 9,
      },
    ];

    const errors = [
      { StateError: 'Void' },
      { StateError: 'Pending' },
      { StateError: 'Completed' },
      { UserError: 'InsufficientPermissions' },
      { UserError: 'Unauthorized' },
      { UserError: 'Unauthorized' },
      { UserError: 'Unauthorized' },
      { UserError: 'Unauthorized' },
      { UserError: 'Unauthorized' },
    ];

    const vectorOfStructs = [
      {
        scores,
        important_dates: importantDates,
        errors,
      },
      {
        scores,
        important_dates: importantDates,
        errors,
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scriptInstance = getScript<[any[]], void>('script-with-vector-advanced', wallet);

    const { waitForResult } = await scriptInstance.functions.main(vectorOfStructs).call();
    const { value } = await waitForResult();
    expect(value).toBe(true);
  });
});
