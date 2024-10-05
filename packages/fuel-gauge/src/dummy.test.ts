/* eslint-disable no-console */
import { readFileSync } from 'fs';
import { bn, ContractFactory, hexlify, Predicate, Script } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';
import { join } from 'path';

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

    const script = new Script(loaderBytecode, ScriptDummy.abi, wallet);

    const { waitForResult: waitForResult2 } = await script.functions.main(27).call();
    const { value, logs } = await waitForResult2();
    expect(value).toBe(27);
    expect(logs[0].toNumber()).toBe(1337);
  });

  it('Should work with configurables', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const configurable = {
      SECRET_NUMBER: 1000,
    };
    const { waitForResult } = await factory.deployAsBlobTxForScript(configurable);

    const { loaderBytecode } = await waitForResult();

    expect(loaderBytecode).to.not.equal(hexlify(ScriptDummy.bytecode));

    const script = new Script(loaderBytecode, ScriptDummy.abi, wallet);

    const { waitForResult: waitForResult2 } = await script.functions.main(54).call();
    const { value, logs } = await waitForResult2();
    expect(value).toBe(54);
    expect(logs[0].toNumber()).toBe(1000);
  });

  it('Should call another script after deploying script with configurable using script program', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);

    const newScript = new Script(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    newScript.setConfigurableConstants({
      SECRET_NUMBER: 1000,
    });

    const { waitForResult } = await factory.deployAsBlobTxForScript();

    const { loaderBytecode } = await waitForResult();

    const preScript = new Script(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const otherConfigurable = {
      SECRET_NUMBER: 4592,
    };
    preScript.setConfigurableConstants(otherConfigurable);

    const { waitForResult: waitForResult2 } = await preScript.functions.main(33).call();

    const { transactionResult: transactionResult2, value, logs } = await waitForResult2();

    // The logs should reflect the new configurable that was set
    console.log('transaction result 2 logs: ', logs);
    console.log('script bytes: ', hexlify(transactionResult2.transaction.script));
    console.log('loader bytecode: ', loaderBytecode);

    expect(value).toBe(33);
    expect(logs).toBe([bn(4592)]);
  });

  it('Should work with structs', async () => {
    using launch = await launchTestNode();
    const {
      wallets: [wallet],
    } = launch;
    const bytecode = readFileSync(
      join(
        process.cwd(),
        'packages/fuel-gauge/test/fixtures/forc-projects/script-dummy/out/release/script-dummy.bin'
      )
    );
    const factory = new ContractFactory(bytecode, ScriptDummy.abi, wallet);
    const configurable = {
      SECRET_NUMBER: 10001,
    };
    const { waitForResult } = await factory.deployAsBlobTxForScript(configurable);
    const { loaderBytecode } = await waitForResult();

    expect(loaderBytecode).to.not.equal(hexlify(bytecode));

    const script = new Script(bytecode, ScriptDummy.abi, wallet, loaderBytecode);

    script.setConfigurableConstants(configurable);

    const { waitForResult: waitForResult2 } = await script.functions
      .main({
        field_a: {
          B: 99,
        },
        field_b: '0x1111111111111111111111111111111111111111111111111111111111111111',
      })
      .call();
    const { value } = await waitForResult2();
    expect(bn(value as unknown as string).eq(bn(10001))).toBe(true);
  });

  it('Should work with predicates', async () => {
    using launch = await launchTestNode();
    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(
      PredicateFalseConfigurable.bytecode,
      PredicateFalseConfigurable.abi,
      wallet
    );

    const configurable = {
      SECRET_NUMBER: 10001,
    };
    const { waitForResult } = await factory.deployAsBlobTxForScript(configurable);
    const { loaderBytecode } = await waitForResult();

    expect(loaderBytecode).to.not.equal(hexlify(PredicateFalseConfigurable.bytecode));
    // Create a new Predicate instance with the loader bytecode
    // Set the configurable constants
    // Test to ensure that the configurable constants are set correctly
    // const predicate = new Predicate(loaderBytecode, PredicateFalseConfigurable.abi, wallet);
  });
});
