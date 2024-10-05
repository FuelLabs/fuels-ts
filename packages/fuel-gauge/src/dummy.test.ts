/* eslint-disable no-console */
import { ContractFactory, hexlify, Script } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ScriptDummy } from '../test/typegen';

/**
 * @group node
 * @group browser
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

  it('Should work with configurables', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const configurable = {
      PIN: 1000,
    };
    const { waitForResult } = await factory.deployAsBlobTxForScript(configurable);

    const { loaderBytecode } = await waitForResult();

    expect(loaderBytecode).to.not.equal(hexlify(ScriptDummy.bytecode));
  });

  it('Should call another script after deploying script with configurable using script program', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);

    const { waitForResult } = await factory.deployAsBlobTxForScript();

    const { loaderBytecode } = await waitForResult();

    const script = new Script(ScriptDummy.bytecode, ScriptDummy.abi, wallet, loaderBytecode);

    const otherConfigurable = {
      PIN: 4592,
    };

    script.setConfigurableConstants(otherConfigurable);

    const { waitForResult: waitForResult2 } = await script.functions.main().call();

    const { transactionResult: transactionResult2 } = await waitForResult2();

    // The logs should reflect the new configurable that was set
    console.log('transaction result 2 logs: ', transactionResult2.logs);
    console.log('script bytes: ', hexlify(transactionResult2.transaction.script));
    console.log('loader bytecode: ', loaderBytecode);
  });
});
