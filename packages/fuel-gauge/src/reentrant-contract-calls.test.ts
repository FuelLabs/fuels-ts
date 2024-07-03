import type { Contract, WalletUnlocked } from 'fuels';
import { ContractFactory, FUEL_NETWORK_URL, Provider, ReceiptType, bn } from 'fuels';
import { generateTestWallet } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

const bar = getFuelGaugeForcProject(FuelGaugeProjectsEnum.REENTRANT_BAR);
const foo = getFuelGaugeForcProject(FuelGaugeProjectsEnum.REENTRANT_FOO);
const storageTest = getFuelGaugeForcProject(FuelGaugeProjectsEnum.STORAGE_TEST_CONTRACT);

/**
 * @group node
 */
describe('Reentrant Contract Calls', () => {
  let barContract: Contract;
  let fooContract: Contract;
  let wallet: WalletUnlocked;
  let baseAssetId: string;

  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
    wallet = await generateTestWallet(provider, [[500_000, baseAssetId]]);

    const factoryBar = new ContractFactory(bar.binHexlified, bar.abiContents, wallet);
    barContract = await factoryBar.deployContract();

    const factoryFoo = new ContractFactory(foo.binHexlified, foo.abiContents, wallet);
    fooContract = await factoryFoo.deployContract();
  });

  it('should ensure the SDK returns the proper value for a reentrant call', async () => {
    const {
      value,
      transactionResult: { receipts },
    } = await fooContract.functions
      .foo({ bits: fooContract.id.toB256() }, { bits: barContract.id.toB256() })
      .addContracts([barContract])
      .call();

    /**
     * First, the test will call:
     *   Foo.foo()
     *
     * Then `Foo` will call `Bar`:
     *   Foo.foo() --\> Bar.bar()
     *
     * And `Bar` will call `Foo` again:
     *   Bar.bar() --\> Foo.baz()
     *
     * Because two functions from `Foo` contract were called, and both
     * return values, two `Return` receipts are generated with the same
     * contract ID.
     *
     * The SDK should be able to distinguish them and correctly return
     * number 42 (from `Foo.foo`) instead of 1337 (from `Foo.baz`).
     */
    const returnReceipts = receipts.filter(
      (r) => r.type === ReceiptType.ReturnData && r.id === fooContract.id.toB256()
    );

    expect(value.toNumber()).toBe(42);
    expect(returnReceipts.length).toBe(2);
  });

  it('should ensure the SDK returns the proper value for a reentrant call on multi-call', async () => {
    const storageContract = await new ContractFactory(
      storageTest.binHexlified,
      storageTest.abiContents,
      wallet
    ).deployContract({ storageSlots: storageTest.storageSlots });

    const reentrantCall = fooContract.functions.foo(
      { bits: fooContract.id.toB256() },
      { bits: barContract.id.toB256() }
    );

    const result = await fooContract
      .multiCall([reentrantCall, storageContract.functions.return_var3(), reentrantCall])
      .call();

    const expectedReentrantValue = 42;

    // return value from first call to reentrant contract call
    expect(bn(result.value[0]).toNumber()).toBe(expectedReentrantValue);
    // return value from call to a different contract
    expect(bn(result.value[1]).toNumber()).not.toBe(expectedReentrantValue);
    // return value from second call to reentrant contract call
    expect(bn(result.value[2]).toNumber()).toBe(expectedReentrantValue);
  });
});
