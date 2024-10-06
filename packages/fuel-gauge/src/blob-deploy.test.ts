import type { JsonAbi } from 'fuels';
import { bn, ContractFactory, getRandomB256, hexlify, Predicate, Script, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  ScriptDummy,
  PredicateFalseConfigurable,
  ScriptMainArgBool,
  PredicateTrue,
  PredicateWithMoreConfigurables,
} from '../test/typegen';

/**
 * @group node
 */
describe('first try', () => {
  const mapToLoaderAbi = (jsonAbi: JsonAbi, configurableOffsetDiff: number) => {
    const { configurables: readOnlyConfigurables } = jsonAbi;
    const configurables: JsonAbi['configurables'] = [];
    readOnlyConfigurables.forEach((config) => {
      // @ts-expect-error shut up the read-only thing
      configurables.push({ ...config, offset: config.offset - configurableOffsetDiff });
    });
    return { ...jsonAbi, configurables } as JsonAbi;
  };

  it.todo('add test that deploys the loader with already set configurables');

  it('should ensure deploy the same blob again will not throw error', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const spy = vi.spyOn(wallet.provider, 'sendTransaction');

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const { waitForResult } = await factory.deployAsBlobTxForScript();
    const { loaderBytecode } = await waitForResult();

    const { waitForResult: waitForResult2 } = await factory.deployAsBlobTxForScript();
    const { loaderBytecode: loaderBytecode2 } = await waitForResult2();

    // Should deploy not deploy the same blob again
    expect(spy).toHaveBeenCalledTimes(1);
    expect(loaderBytecode).equals(loaderBytecode2);

    vi.restoreAllMocks();
  });

  it('should deploy blob for a script transaction and submit it', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const { waitForResult } = await factory.deployAsBlobTxForScript();

    const { loaderBytecode } = await waitForResult();

    expect(loaderBytecode).to.not.equal(hexlify(ScriptDummy.bytecode));
  });

  it('should deploy blob for a script transaction and submit it (NO CONFIGURABLE)', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptMainArgBool.bytecode, ScriptMainArgBool.abi, wallet);
    const { waitForResult } = await factory.deployAsBlobTxForScript();
    const { loaderBytecode, configurableOffsetDiff } = await waitForResult();

    const script = new Script(
      loaderBytecode,
      mapToLoaderAbi(ScriptMainArgBool.abi, configurableOffsetDiff),
      wallet
    );

    const { waitForResult: waitForResult2 } = await script.functions.main(true).call();
    const {
      value,
      transactionResult: { transaction },
    } = await waitForResult2();

    expect(transaction.script).equals(loaderBytecode);
    expect(value).toBe(true);
  });

  it('Should work for setting the configurable constants', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const { waitForResult } = await factory.deployAsBlobTxForScript();

    const { loaderBytecode, configurableOffsetDiff } = await waitForResult();
    const script = new Script(
      loaderBytecode,
      mapToLoaderAbi(ScriptDummy.abi, configurableOffsetDiff),
      wallet
    );

    const configurable = {
      SECRET_NUMBER: 10001,
    };
    script.setConfigurableConstants(configurable);

    const { waitForResult: waitForResult2 } = await script.functions.main().call();
    const { value } = await waitForResult2();

    expect(value).toBe(true);
  });

  it('Should return false for incorrectly set configurable constants', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const { waitForResult } = await factory.deployAsBlobTxForScript();

    const { loaderBytecode, configurableOffsetDiff } = await waitForResult();

    const preScript = new Script(
      loaderBytecode,
      mapToLoaderAbi(ScriptDummy.abi, configurableOffsetDiff),
      wallet
    );
    const configurable = {
      SECRET_NUMBER: 299,
    };
    preScript.setConfigurableConstants(configurable);

    const { waitForResult: waitForResult2 } = await preScript.functions.main().call();

    const { value, logs } = await waitForResult2();

    expect(logs[0].toNumber()).equal(configurable.SECRET_NUMBER);
    expect(value).toBe(false);
  });

  it('it should return false if no configurable constants are set', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const { waitForResult } = await factory.deployAsBlobTxForScript();
    const { loaderBytecode, configurableOffsetDiff } = await waitForResult();

    const script = new Script(
      loaderBytecode,
      mapToLoaderAbi(ScriptDummy.abi, configurableOffsetDiff),
      wallet
    );

    const { waitForResult: waitForResult2 } = await script.functions.main().call();
    const { value, logs } = await waitForResult2();
    expect(logs[0].toNumber()).equal(9000);
    expect(value).toBe(false);
  });

  it('Should work with predicates', async () => {
    using launch = await launchTestNode();
    const {
      wallets: [wallet],
      provider,
    } = launch;

    const receiver = Wallet.generate({ provider });

    const factory = new ContractFactory(
      PredicateFalseConfigurable.bytecode,
      PredicateFalseConfigurable.abi,
      wallet
    );

    const { waitForResult } = await factory.deployAsBlobTxForScript();
    const { loaderBytecode, configurableOffsetDiff } = await waitForResult();

    expect(loaderBytecode).to.not.equal(hexlify(PredicateFalseConfigurable.bytecode));

    const configurable = {
      SECRET_NUMBER: 8000,
    };

    const predicate = new Predicate({
      data: [configurable.SECRET_NUMBER],
      bytecode: loaderBytecode,
      abi: mapToLoaderAbi(PredicateFalseConfigurable.abi, configurableOffsetDiff),
      provider,
      configurableConstants: configurable,
    });

    await wallet.transfer(predicate.address, 10_000, provider.getBaseAssetId());

    const tx = await predicate.transfer(receiver.address, 1000, provider.getBaseAssetId());
    const response = await tx.waitForResult();
    expect(response.isStatusSuccess).toBe(true);
  });

  it('Should work with predicate when not setting configurables values', async () => {
    using launch = await launchTestNode();
    const {
      wallets: [wallet],
      provider,
    } = launch;

    const factory = new ContractFactory(
      PredicateFalseConfigurable.bytecode,
      PredicateFalseConfigurable.abi,
      wallet
    );

    const { waitForResult } = await factory.deployAsBlobTxForScript();
    const { loaderBytecode, configurableOffsetDiff } = await waitForResult();

    expect(loaderBytecode).to.not.equal(hexlify(PredicateFalseConfigurable.bytecode));

    const SECRET_NUMBER = 9000;

    const predicate = new Predicate({
      data: [bn(SECRET_NUMBER)],
      bytecode: loaderBytecode,
      abi: mapToLoaderAbi(PredicateFalseConfigurable.abi, configurableOffsetDiff),
      provider,
    });

    const transfer2 = await wallet.transfer(predicate.address, 10_000, provider.getBaseAssetId());
    await transfer2.waitForResult();

    /**
     * When destructuring the response, we get the following error:
     * Cannot read properties of undefined (reading 'waitForStatusChange')
     * TODO: Fix this!
     */
    const transfer3 = await predicate.transfer(wallet.address, 1000, provider.getBaseAssetId());
    const { isStatusSuccess } = await transfer3.waitForResult();

    expect(isStatusSuccess).toBe(true);
  });

  it('Should work with predicate with no configurable constants', async () => {
    using launch = await launchTestNode();
    const {
      wallets: [wallet],
      provider,
    } = launch;

    const factory = new ContractFactory(
      PredicateFalseConfigurable.bytecode,
      PredicateFalseConfigurable.abi,
      wallet
    );

    const { waitForResult } = await factory.deployAsBlobTxForScript();
    const { loaderBytecode } = await waitForResult();

    expect(loaderBytecode).to.not.equal(hexlify(PredicateTrue.bytecode));

    const predicate = new Predicate({
      bytecode: PredicateTrue.bytecode,
      abi: PredicateTrue.abi,
      provider,
      loaderBytecode,
    });

    const transfer2 = await wallet.transfer(predicate.address, 10_000, provider.getBaseAssetId());
    await transfer2.waitForResult();

    /**
     * When destructuring the response, we get the following error:
     * Cannot read properties of undefined (reading 'waitForStatusChange')
     * TODO: Fix this!
     */
    const transfer3 = await predicate.transfer(wallet.address, 1000, provider.getBaseAssetId());
    const { isStatusSuccess } = await transfer3.waitForResult();

    expect(isStatusSuccess).toBe(true);
  });

  it('can run with loader bytecode with manually modified configurables', async () => {
    using launch = await launchTestNode();
    const {
      wallets: [wallet],
      provider,
    } = launch;

    const receiver = Wallet.generate({ provider });

    const factory = new ContractFactory(
      PredicateFalseConfigurable.bytecode,
      PredicateFalseConfigurable.abi,
      wallet
    );

    const { waitForResult } = await factory.deployAsBlobTxForScript();
    const { loaderBytecode, configurableOffsetDiff } = await waitForResult();
    expect(loaderBytecode).to.not.equal(hexlify(PredicateFalseConfigurable.bytecode));

    const configurable = {
      SECRET_NUMBER: 8000,
    };

    const newAbi = mapToLoaderAbi(PredicateFalseConfigurable.abi, configurableOffsetDiff);

    const predicate = new Predicate({
      data: [configurable.SECRET_NUMBER],
      bytecode: loaderBytecode,
      abi: newAbi,
      provider,
      configurableConstants: configurable,
    });

    await wallet.transfer(predicate.address, 10_000, provider.getBaseAssetId());

    const tx = await predicate.transfer(receiver.address, 1000, provider.getBaseAssetId());
    const response = await tx.waitForResult();
    expect(response.isStatusSuccess).toBe(true);
  });

  it('can run with loader bytecode with many manually modified configurables', async () => {
    using launch = await launchTestNode();
    const {
      wallets: [wallet],
      provider,
    } = launch;

    const receiver = Wallet.generate({ provider });

    const factory = new ContractFactory(
      PredicateWithMoreConfigurables.bytecode,
      PredicateWithMoreConfigurables.abi,
      wallet
    );

    const { waitForResult } = await factory.deployAsBlobTxForScript();
    const { loaderBytecode, configurableOffsetDiff } = await waitForResult();
    expect(loaderBytecode).to.not.equal(hexlify(PredicateWithMoreConfigurables.bytecode));
    const configurable = {
      FEE: 99,
      ADDRESS: getRandomB256(),
      U16: 305,
      U32: 101,
      U64: 1000000,
      BOOL: false,
    };

    const newAbi = mapToLoaderAbi(PredicateWithMoreConfigurables.abi, configurableOffsetDiff);

    const predicate = new Predicate({
      data: [configurable.FEE, configurable.ADDRESS],
      bytecode: loaderBytecode,
      abi: newAbi,
      provider,
      configurableConstants: configurable,
    });

    await wallet.transfer(predicate.address, 10_000, provider.getBaseAssetId());

    const tx = await predicate.transfer(receiver.address, 1000, provider.getBaseAssetId());
    const response = await tx.waitForResult();
    expect(response.isStatusSuccess).toBe(true);
  });
});
