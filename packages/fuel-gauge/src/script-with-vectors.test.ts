import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import type { BigNumberish, BN } from 'fuels';
import { BaseAssetId, FUEL_NETWORK_URL, Provider } from 'fuels';

import { getScript } from './utils';

const setup = async (balance = 500_000) => {
  const provider = await Provider.create(FUEL_NETWORK_URL);

  // Create wallet
  const wallet = await generateTestWallet(provider, [[balance, BaseAssetId]]);

  return wallet;
};

describe('Script With Vectors', () => {
  let gasPrice: BN;
  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
  });
  it('can call script and use main argument [array]', async () => {
    const wallet = await setup();
    const someArray = [1, 100];
    const scriptInstance = getScript<[BigNumberish[]], void>('script-with-array', wallet);

    const { logs } = await scriptInstance.functions.main(someArray).txParams({ gasPrice }).call();

    expect(logs.map((n) => n.toNumber())).toEqual([1]);
  });

  it('can call script and use main argument [vec]', async () => {
    const wallet = await setup();
    const someVec = [7, 2, 1, 5];
    const scriptInstance = getScript<[BigNumberish[]], void>('script-with-vector', wallet);

    const { logs } = await scriptInstance.functions.main(someVec).txParams({ gasPrice }).call();

    const formattedLog = logs.map((l) => (typeof l === 'string' ? l : l.toNumber()));

    expect(formattedLog).toEqual([
      7,
      'vector.buf.ptr',
      11288,
      'vector.buf.cap',
      4,
      'vector.len',
      4,
      'addr_of vector',
      11264,
    ]);
  });

  it('can call script and use main argument [struct in vec in struct in vec in struct in vec]', async () => {
    const wallet = await setup();

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

    const { value } = await scriptInstance.functions
      .main(importantDates)
      .txParams({ gasPrice })
      .call();
    expect((value as unknown as BN).toString()).toBe('1');
  });

  it('can call script and use main argument [struct in vec in struct in vec in struct in vec]', async () => {
    const wallet = await setup();

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

    const { value } = await scriptInstance.functions
      .main(vectorOfStructs)
      .txParams({ gasPrice })
      .call();
    expect((value as unknown as BN).toString()).toBe('1');
  });
});
