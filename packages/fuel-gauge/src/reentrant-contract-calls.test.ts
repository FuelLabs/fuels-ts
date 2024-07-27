import { ContractFactory, ReceiptType, bn } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  ReentrantBarAbi__factory,
  ReentrantFooAbi__factory,
  StorageTestContractAbi__factory,
} from '../test/typegen/contracts';
import ReentrantBarAbiHex from '../test/typegen/contracts/ReentrantBarAbi.hex';
import ReentrantFooAbiHex from '../test/typegen/contracts/ReentrantFooAbi.hex';
import StorageTestContractAbiHex from '../test/typegen/contracts/StorageTestContractAbi.hex';

/**
 * @group node
 * @group browser
 */
describe('Reentrant Contract Calls', () => {
  it('should ensure the SDK returns the proper value for a reentrant call', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: ReentrantFooAbi__factory,
          bytecode: ReentrantFooAbiHex,
        },
        {
          deployer: ReentrantBarAbi__factory,
          bytecode: ReentrantBarAbiHex,
        },
      ],
    });

    const {
      contracts: [fooContract, barContract],
    } = launched;

    const { waitForResult } = await fooContract.functions
      .foo({ bits: fooContract.id.toB256() }, { bits: barContract.id.toB256() })
      .addContracts([barContract])
      .call();

    const {
      value,
      transactionResult: { receipts },
    } = await waitForResult();

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
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: ReentrantFooAbi__factory,
          bytecode: ReentrantFooAbiHex,
        },
        {
          deployer: ReentrantBarAbi__factory,
          bytecode: ReentrantBarAbiHex,
        },
      ],
    });

    const {
      wallets: [wallet],
      contracts: [fooContract, barContract],
    } = launched;

    const deploy = await new ContractFactory(
      StorageTestContractAbiHex,
      StorageTestContractAbi__factory.abi,
      wallet
    ).deployContract({ storageSlots: StorageTestContractAbi__factory.storageSlots });

    const { contract: storageContract } = await deploy.waitForResult();

    const reentrantCall = fooContract.functions.foo(
      { bits: fooContract.id.toB256() },
      { bits: barContract.id.toB256() }
    );

    const { waitForResult } = await fooContract
      .multiCall([reentrantCall, storageContract.functions.return_var3(), reentrantCall])
      .call();

    const result = await waitForResult();

    const expectedReentrantValue = 42;

    // return value from first call to reentrant contract call
    expect(bn(result.value[0]).toNumber()).toBe(expectedReentrantValue);
    // return value from call to a different contract
    expect(bn(result.value[1]).toNumber()).not.toBe(expectedReentrantValue);
    // return value from second call to reentrant contract call
    expect(bn(result.value[2]).toNumber()).toBe(expectedReentrantValue);
  });
});
