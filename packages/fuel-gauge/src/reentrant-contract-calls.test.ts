import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { BaseAssetId, ContractFactory, FUEL_NETWORK_URL, Provider, ReceiptType } from 'fuels';

import type { FuelGaugeProjectsEnum } from '../test/fixtures';
import { getFuelGaugeForcProject } from '../test/fixtures';

const bar = getFuelGaugeForcProject('bar' as FuelGaugeProjectsEnum);
const foo = getFuelGaugeForcProject('foo' as FuelGaugeProjectsEnum);

describe('Reentrant Contract Calls', () => {
  it('should ensure the SDK returns the proper value for a reentrant call', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const wallet = await generateTestWallet(provider, [[10_000, BaseAssetId]]);

    const factoryBar = new ContractFactory(bar.binHexlified, bar.abiContents, wallet);
    const barContract = await factoryBar.deployContract();

    const factoryFoo = new ContractFactory(foo.binHexlified, foo.abiContents, wallet);
    const fooContract = await factoryFoo.deployContract();

    const {
      value,
      transactionResult: { receipts },
    } = await fooContract.functions
      .foo({ value: fooContract.id.toB256() }, { value: barContract.id.toB256() })
      .addContracts([barContract])
      .call();

    const returnReceipts = receipts.filter(
      (r) => r.type === ReceiptType.Return && r.id === fooContract.id.toB256()
    );

    /**
     * Foo contract will call its foo function which will call the bar function from the
     * Bar contract, then the Bar contract within bar function will call the Foo contract again
     * but this time the baz function wich will return 1337. At this point the foo function (original
     * called function) will continue its execution and return 42. Because 2 functions from Foo
     * contract were called and both of them return values, 2 Return receipts are generated with
     * the same contract ID. The SDK should return the value from the last one, which is the
     * returned value from the foo function.
     */
    expect(value.toNumber()).toBe(42);
    expect(returnReceipts.length).toBe(2);
  });
});
