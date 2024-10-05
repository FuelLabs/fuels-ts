import { bn, ContractFactory, hexlify, Predicate, Script, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

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

  it('Should work when deployed with configurables', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const configurable = {
      SECRET_NUMBER: 10001,
    };
    const { waitForResult } = await factory.deployAsBlobTxForScript(configurable);

    const { loaderBytecode } = await waitForResult();

    expect(loaderBytecode).to.not.equal(hexlify(ScriptDummy.bytecode));

    const script = new Script(loaderBytecode, ScriptDummy.abi, wallet);

    const { waitForResult: waitForResult2 } = await script.functions.main().call();
    const { value } = await waitForResult2();
    expect(value).toBe(true);
  });

  it('Should call another script after deploying script with configurable using script program', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);

    const newScript = new Script(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    newScript.setConfigurableConstants({
      SECRET_NUMBER: 200,
    });

    const { waitForResult } = await factory.deployAsBlobTxForScript();

    const { loaderBytecode } = await waitForResult();

    const preScript = new Script(ScriptDummy.bytecode, ScriptDummy.abi, wallet, loaderBytecode);
    const otherConfigurable = {
      SECRET_NUMBER: 4592,
    };
    preScript.setConfigurableConstants(otherConfigurable);

    const { waitForResult: waitForResult2 } = await preScript.functions.main().call();

    const { value } = await waitForResult2();

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
});
