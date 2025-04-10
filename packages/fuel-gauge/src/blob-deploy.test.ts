import type { Script } from 'fuels';
import { getRandomB256, hexlify, Predicate, Wallet, ZeroBytes32 } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  ScriptMainArgBool,
  PredicateTrue,
  ScriptWithMoreConfigurable,
  PredicateWithConfigurable,
  PredicateWithMoreConfigurables,
  ScriptWithConfigurable,
} from '../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('deploying blobs', () => {
  function decodeConfigurables(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    program: Predicate | Script<any, any>
  ): Record<string, unknown> {
    const configurables: Record<string, unknown> = {};

    Object.entries(program.interface.configurables).forEach(([key, { offset, concreteTypeId }]) => {
      const data = program.bytes.slice(offset);
      configurables[key] = program.interface.decodeType(concreteTypeId, data)[0];
    });

    return configurables;
  }

  it('script blob deployment works (NO CONFIGURABLE)', async () => {
    using launch = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launch;

    const script = new ScriptMainArgBool(wallet);

    const { waitForResult, blobId } = await script.deploy(wallet);

    const loaderScript = await waitForResult();

    const blobDeployed = (await provider.getBlobs([blobId])).length > 0;
    expect(blobDeployed).toBe(true);

    expect(loaderScript.bytes).not.toEqual(script.bytes);

    const { waitForResult: waitForResult2 } = await loaderScript.functions.main(true).call();
    const {
      value,
      transactionResult: { transaction },
    } = await waitForResult2();

    expect(transaction.script).equals(hexlify(loaderScript.bytes));
    expect(value).toBe(true);
  });

  it('script blob deployment works (CONFIGURABLE)', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const script = new ScriptWithConfigurable(wallet);
    const loaderScript = await (await script.deploy(wallet)).waitForResult();

    expect(decodeConfigurables(loaderScript)).toEqual(decodeConfigurables(script));

    // Test that default configurables are included by default
    const defaultConfigurable = {
      FEE: 5,
    };

    const defaultResult = await (
      await loaderScript.functions.main(defaultConfigurable.FEE).call()
    ).waitForResult();

    expect(defaultResult.logs[0]).toEqual(defaultConfigurable.FEE);
    expect(defaultResult.value).toBe(true);

    // Test that you can update configurables of the loader script
    const configurable = {
      FEE: 234,
    };
    loaderScript.setConfigurableConstants(configurable);

    const result1 = await (
      await loaderScript.functions.main(configurable.FEE).call()
    ).waitForResult();

    expect(result1.logs[0]).toEqual(configurable.FEE);
    expect(result1.value).toBe(true);
  });

  it('script blob deployment works (COMPLEX CONFIGURABLE)', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const script = new ScriptWithMoreConfigurable(wallet);

    const loaderScript = await (await script.deploy(wallet)).waitForResult();

    expect(decodeConfigurables(loaderScript)).toEqual(decodeConfigurables(script));

    const configurable = {
      U8: 16,
      U16: 201,
      U32: 1001,
      U64: 99999999,
      BOOL: false,
      B256: '0x314fa58689bbe1da2430517de2d772b384a1c1d2e9cb87e73c6afcf246045b10',
      ENUM: 'blue',
      ARRAY: [
        [101, 99],
        [123, 456],
      ],
      STR_4: 'leuf',
      TUPLE: [67, true, 'hu'],
      STRUCT_1: {
        tag: '909',
        age: 15,
        scores: [9, 2, 1],
      },
    };

    script.setConfigurableConstants(configurable);
    loaderScript.setConfigurableConstants(configurable);

    expect(decodeConfigurables(loaderScript)).toEqual(decodeConfigurables(script));

    const { waitForResult: waitForResult2 } = await script.functions.main().call();
    const { value, logs, groupedLogs } = await waitForResult2();

    const expectedLogs = [
      configurable.U8,
      configurable.U16,
      configurable.U32,
      expect.toEqualBn(configurable.U64),
      configurable.BOOL,
      configurable.B256,
      configurable.ENUM,
      configurable.ARRAY,
      configurable.STR_4,
      configurable.TUPLE,
      configurable.STRUCT_1,
    ];
    expect(value).toBeTruthy();
    expect(logs).toStrictEqual(expectedLogs);
    expect(groupedLogs).toStrictEqual({
      [ZeroBytes32]: expectedLogs,
    });
  });

  test("deploying existing script blob doesn't throw", async () => {
    using launch = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launch;

    const script = new ScriptMainArgBool(wallet);

    const sendTransactionSpy = vi.spyOn(provider, 'sendTransaction');

    await (await script.deploy(wallet)).waitForResult();
    await (await script.deploy(wallet)).waitForResult();

    expect(sendTransactionSpy).toHaveBeenCalledTimes(1);
  });

  it('predicate blob deployment works', async () => {
    using launch = await launchTestNode();

    const {
      provider,
      wallets: [deployer],
    } = launch;

    const configurableConstants = {
      FEE: 10,
      ADDRESS: '0x38966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf96',
    };

    const predicate = new PredicateWithConfigurable({
      provider,
      configurableConstants,
      data: [configurableConstants.FEE, configurableConstants.ADDRESS],
    });

    const { waitForResult, blobId } = await predicate.deploy(deployer);
    const loaderPredicate = await waitForResult();

    const blobDeployed = (await provider.getBlobs([blobId])).length > 0;
    expect(blobDeployed).toBe(true);

    expect(loaderPredicate.bytes).not.toEqual(predicate.bytes);
    expect(loaderPredicate.address.toB256()).not.toEqual(predicate.address.toB256());
    expect(loaderPredicate.predicateData).toEqual(predicate.predicateData);
    expect(decodeConfigurables(loaderPredicate)).toEqual(decodeConfigurables(predicate));

    await (await deployer.transfer(loaderPredicate.address, 10_000)).waitForResult();

    const { isStatusSuccess } = await (
      await loaderPredicate.transfer(deployer.address, 10)
    ).waitForResult();

    expect(isStatusSuccess).toBe(true);
  });

  it('loader predicate can be used with different configurables', async () => {
    using launch = await launchTestNode();
    const {
      wallets: [wallet],
      provider,
    } = launch;

    const receiver = Wallet.generate({ provider });

    const loaderPredicate = await (
      await new PredicateWithMoreConfigurables({ provider }).deploy(wallet)
    ).waitForResult();

    const configurable = {
      FEE: 99,
      ADDRESS: getRandomB256(),
      U16: 305,
      U32: 101,
      U64: 1000000,
      BOOL: false,
    };

    const predicate = new Predicate({
      data: [configurable.FEE, configurable.ADDRESS],
      bytecode: loaderPredicate.bytes,
      abi: loaderPredicate.interface.jsonAbi,
      provider,
      configurableConstants: configurable,
    });

    const res = await wallet.transfer(predicate.address, 10_000, await provider.getBaseAssetId());
    await res.waitForResult();

    const tx = await predicate.transfer(receiver.address, 1000, await provider.getBaseAssetId());
    const response = await tx.waitForResult();
    expect(response.isStatusSuccess).toBe(true);
  });

  test("deploying existing predicate blob doesn't throw", async () => {
    using launch = await launchTestNode();

    const {
      provider,
      wallets: [deployer],
    } = launch;

    const predicate = new PredicateTrue({
      provider,
    });

    const sendTransactionSpy = vi.spyOn(provider, 'sendTransaction');

    await (await predicate.deploy(deployer)).waitForResult();
    await (await predicate.deploy(deployer)).waitForResult();

    expect(sendTransactionSpy).toHaveBeenCalledTimes(1);
  });
});
