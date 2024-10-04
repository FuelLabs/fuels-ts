import type { TransactionScript } from 'fuels';
import { ContractFactory, hexlify, Script } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ScriptDummy } from '../test/typegen';

describe('first try', () => {
  it('should deploy blob for a script transaction and submit it', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const { waitForResult } = await factory.deployAsBlobTxForScript();

    const { transactionResult } = await waitForResult();

    const scriptBytes = hexlify(ScriptDummy.bytecode);
    const actualBytes = hexlify(
      (transactionResult.transaction as unknown as TransactionScript).script
    );

    console.log(
      'transaciton result receipts for no set configurable : ',
      transactionResult.receipts
    );

    expect(scriptBytes).not.equal(actualBytes);
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
    const { waitForResult } = await factory.deployAsBlobTxForScript({
      configurableConstants: configurable,
    });

    const { transactionResult } = await waitForResult();

    const scriptBytes = hexlify(ScriptDummy.bytecode);
    const actualBytes = hexlify(
      (transactionResult.transaction as unknown as TransactionScript).script
    );

    console.log('transaciton result receipts for set config: ', transactionResult.receipts);

    expect(scriptBytes).not.equal(actualBytes);
  });

  it('Should call another script after deploying script with configurable using script program', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const configurable = {
      PIN: 1000,
    };
    const { waitForResult } = await factory.deployAsBlobTxForScript({
      configurableConstants: configurable,
    });

    const { transactionResult } = await waitForResult();

    const script = new Script(ScriptDummy.bytecode, ScriptDummy.abi, wallet);

    const otherConfigurable = {
      PIN: 4592,
    };

    script.setConfigurableConstants(otherConfigurable);

    const { waitForResult: waitForResult2 } = await script.functions.main().call();

    const { transactionResult: transactionResult2 } = await waitForResult2();

    console.log('transaciton result receipts for third test config: ', transactionResult2.logs);
  });
});
