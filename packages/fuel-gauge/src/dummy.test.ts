import type { JsonAbi } from 'fuels';
import { bn, ContractFactory, hexlify, Predicate, Script, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  ScriptDummy,
  PredicateFalseConfigurable,
  ScriptMainArgBool,
  PredicateTrue,
} from '../test/typegen';

/**
 * @group node
 */
describe('first try', () => {
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
    const { loaderBytecode } = await waitForResult();

    const script = new Script(
      ScriptMainArgBool.bytecode,
      ScriptMainArgBool.abi,
      wallet,
      loaderBytecode
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

    const { loaderBytecode } = await waitForResult();
    const script = new Script(ScriptDummy.bytecode, ScriptDummy.abi, wallet, loaderBytecode);

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

    const { loaderBytecode } = await waitForResult();

    const preScript = new Script(ScriptDummy.bytecode, ScriptDummy.abi, wallet, loaderBytecode);
    const configurable = {
      SECRET_NUMBER: 299,
    };
    preScript.setConfigurableConstants(configurable);

    const { waitForResult: waitForResult2 } = await preScript.functions.main().call();

    const { value, logs } = await waitForResult2();

    expect(logs[0].toNumber()).equal(configurable.SECRET_NUMBER);
    expect(value).toBe(false);
  });

  // We need to use the `loaderBytecode` even in cases where there is no configurable constants set
  // But this tests demonstrates that we cannot decode the logs in such instances
  // We are awaiting a response from @ahmed about this
  it('it should return false if no configurable constants are set', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const { waitForResult } = await factory.deployAsBlobTxForScript();

    const { loaderBytecode } = await waitForResult();

    const script = new Script(ScriptDummy.bytecode, ScriptDummy.abi, wallet, loaderBytecode);

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

    const { waitForResult } = await factory.deployAsBlobTxForPredicate();
    const { loaderBytecode } = await waitForResult();

    expect(loaderBytecode).to.not.equal(hexlify(PredicateFalseConfigurable.bytecode));

    const configurable = {
      SECRET_NUMBER: 8000,
    };

    const predicate = new Predicate({
      data: [configurable.SECRET_NUMBER],
      bytecode: PredicateFalseConfigurable.bytecode,
      abi: PredicateFalseConfigurable.abi,
      provider,
      loaderBytecode,
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

    const { waitForResult } = await factory.deployAsBlobTxForPredicate();
    const { loaderBytecode } = await waitForResult();

    expect(loaderBytecode).to.not.equal(hexlify(PredicateFalseConfigurable.bytecode));

    const SECRET_NUMBER = 9000;

    const predicate = new Predicate({
      data: [bn(SECRET_NUMBER)],
      bytecode: PredicateFalseConfigurable.bytecode,
      abi: PredicateFalseConfigurable.abi,
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

    const { waitForResult } = await factory.deployAsBlobTxForPredicate();
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

  it.only('can run with loader bytecode with manually modified configurables', async () => {
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
    const { loaderBytecode } = await waitForResult();
    expect(loaderBytecode).to.not.equal(hexlify(PredicateFalseConfigurable.bytecode));

    const configurable = {
      SECRET_NUMBER: 8000,
    };
    const abi: JsonAbi = {
      ...PredicateFalseConfigurable.abi,
      configurables: [
        {
          ...PredicateFalseConfigurable.abi.configurables[0],
          offset: 88, // to calculate
        },
      ],
    };

    const predicate = new Predicate({
      data: [configurable.SECRET_NUMBER],
      bytecode: loaderBytecode,
      abi,
      provider,
      configurableConstants: configurable,
    });

    await wallet.transfer(predicate.address, 10_000, provider.getBaseAssetId());

    const tx = await predicate.transfer(receiver.address, 1000, provider.getBaseAssetId());
    const response = await tx.waitForResult();
    expect(response.isStatusSuccess).toBe(true);
  });
});
