import {
  bn,
  ContractFactory,
  hexlify,
  Predicate,
  Script,
  Wallet,
  FuelError,
  ErrorCode,
} from 'fuels';
import { launchTestNode, expectToThrowFuelError } from 'fuels/test-utils';

import { ScriptDummy, PredicateFalseConfigurable } from '../test/typegen';

/**
 * @group node
 */
describe('first try', () => {
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

    const { value } = await waitForResult2();

    expect(value).toBe(false);
  });

  // We need to use the `loaderBytecode` even in cases where there is no configurable constants set
  // But this tests demonstrates that we cannot decode the logs in such instances
  // We are awaiting a response from @ahmed about this
  it.skip('it should return false if no configurable constants are set', async () => {
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

  it('it should update according to the configurable constants', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;
    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const { waitForResult } = await factory.deployAsBlobTxForScript();

    const { loaderBytecode } = await waitForResult();

    const script = new Script(ScriptDummy.bytecode, ScriptDummy.abi, wallet, loaderBytecode);

    const correctConfigurable = {
      SECRET_NUMBER: 10001,
    };

    script.setConfigurableConstants(correctConfigurable);

    const { waitForResult: waitForResult2 } = await script.functions.main().call();
    const { value } = await waitForResult2();
    expect(value).toBe(true);
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
      data: [bn(configurable.SECRET_NUMBER)],
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

  it('Should work with predicate with no configurable constants', async () => {
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
      data: [bn(configurable.SECRET_NUMBER)],
      bytecode: PredicateFalseConfigurable.bytecode,
      abi: PredicateFalseConfigurable.abi,
      provider,
      loaderBytecode,
    });

    await wallet.transfer(predicate.address, 10_000, provider.getBaseAssetId());

    await expectToThrowFuelError(
      () => predicate.transfer(receiver.address, 1000, provider.getBaseAssetId()),
      new FuelError(
        ErrorCode.INVALID_REQUEST,
        'Invalid transaction data: PredicateVerificationFailed(Panic(PredicateReturnedNonOne))'
      )
    );
  });
});
