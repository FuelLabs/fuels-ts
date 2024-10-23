import type { BigNumberish } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  ScriptWithArray,
  ScriptWithVector,
  ScriptWithVectorAdvanced,
  ScriptWithVectorMixed,
} from '../test/typegen';
import { StateError, UserError } from '../test/typegen/scripts/ScriptWithVectorAdvancedTypes';

/**
 * @group node
 * @group browser
 */
describe('Script With Vectors', () => {
  it('can call script and use main argument [array]', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const someArray: [BigNumberish, BigNumberish] = [1, 100];
    const scriptInstance = new ScriptWithArray(wallet);

    const { waitForResult } = await scriptInstance.functions.main(someArray).call();
    const { logs } = await waitForResult();

    expect(logs.map((n) => n.toNumber())).toEqual([1]);
  });

  it('can call script and use main argument [vec]', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const someVec = [7, 2, 1, 5];
    const scriptInstance = new ScriptWithVector(wallet);

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
    using launched = await launchTestNode();

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

    const scriptInstance = new ScriptWithVectorMixed(wallet);

    const { waitForResult } = await scriptInstance.functions.main(importantDates).call();
    const { value } = await waitForResult();
    expect(value).toBe(true);
  });

  it('can call script and use main argument [struct in vec in struct in vec in struct in vec]', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const scores: number[] = [24, 56, 43];

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
      { StateError: StateError.Void },
      { StateError: StateError.Pending },
      { StateError: StateError.Completed },
      { UserError: UserError.InsufficientPermissions },
      { UserError: UserError.Unauthorized },
      { UserError: UserError.Unauthorized },
      { UserError: UserError.Unauthorized },
      { UserError: UserError.Unauthorized },
      { UserError: UserError.Unauthorized },
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

    const scriptInstance = new ScriptWithVectorAdvanced(wallet);

    const { waitForResult } = await scriptInstance.functions.main(vectorOfStructs).call();
    const { value } = await waitForResult();
    expect(value).toBe(true);
  });
});
