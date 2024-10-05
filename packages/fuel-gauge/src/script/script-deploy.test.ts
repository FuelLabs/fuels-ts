/* eslint-disable no-console */
import { ContractFactory, hexlify, Script } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ScriptDummy } from '../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('script-deploy', () => {
  it('should deploy blob for a script transaction and submit it', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const inputs = {
      value: 27,
    };
    const expected = {
      value: 27,
      logValue: 1337,
    };

    // Deploy script loader
    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const deployScript = await factory.deployAsBlobTxForScript();
    const { loaderBytecode } = await deployScript.waitForResult();
    expect(loaderBytecode).to.not.equal(hexlify(ScriptDummy.bytecode));

    // Now we can use the deployed script loader bytecode to call the script.
    const deployedScript = new Script(loaderBytecode, ScriptDummy.abi, wallet);
    const deployedScriptCall = await deployedScript.functions.main(inputs.value).call();
    const { value, logs } = await deployedScriptCall.waitForResult();
    expect(value).toBe(expected.value);
    expect(logs[0].toNumber(), 'Log should represent the configurable constant from Sway.').toBe(
      expected.logValue
    );
  });

  it('Should work with configurables', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const inputs = {
      value: 27,
      configurableConstants: {
        CONFIGURABLE_VALUE: 4567,
      },
    };
    const expected = {
      value: 27,
      logValue: 4567,
    };

    // Deploys script loader
    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const deployScript = await factory.deployAsBlobTxForScript(inputs.configurableConstants);
    const { loaderBytecode } = await deployScript.waitForResult();
    expect(loaderBytecode).to.not.equal(hexlify(ScriptDummy.bytecode));

    // Now we can use the deployed script loader bytecode to call the script.
    const deployedScript = new Script(loaderBytecode, ScriptDummy.abi, wallet);
    const deployedScriptResult = await deployedScript.functions.main(inputs.value).call();
    const loadedScript = await deployedScriptResult.waitForResult();
    expect(loadedScript.value).toBe(expected.value);
    // @todo @Torres-ssf @maschad is this correct?
    expect(
      loadedScript.logs[0].toNumber(),
      'Log should represent the configurable constant from the initial deploy script.'
    ).toBe(expected.logValue);
  });

  it('Should call another script after deploying script with configurable using script program', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const inputs = {
      value: 27,
      deployConfigurableConstants: {
        CONFIGURABLE_VALUE: 1234,
      },
      deployedConfigurableConstants: {
        CONFIGURABLE_VALUE: 4321,
      },
    };
    const expected = {
      value: 27,
      logValue: 4321,
    };

    // We create our initial script and set the configurable constants.
    const deployScript = new Script(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    deployScript.setConfigurableConstants(inputs.deployConfigurableConstants);

    // We then use the deployed script (via loader)
    const deployedScriptFactory = new ContractFactory(
      ScriptDummy.bytecode,
      ScriptDummy.abi,
      wallet
    );
    const { waitForResult } = await deployedScriptFactory.deployAsBlobTxForScript();
    const { loaderBytecode } = await waitForResult();

    // Instantiate script with loader bytecode
    const deployedScript = new Script(ScriptDummy.bytecode, ScriptDummy.abi, wallet);

    deployedScript.setConfigurableConstants(inputs.deployedConfigurableConstants);
    const { waitForResult: deployedScriptWaitForResult } = await deployedScript.functions
      .main(inputs.value)
      .call();

    const deployedScriptResult = await deployedScriptWaitForResult();

    // The logs should reflect the new configurable that was set
    console.log('transaction result 2 logs: ', deployedScriptResult.logs);
    console.log(
      'script bytes: ',
      hexlify(deployedScriptResult.transactionResult.transaction.script)
    );
    console.log('loader bytecode: ', loaderBytecode);

    expect(deployedScriptResult.value).toBe(expected.value);
    // @todo @Torres-ssf @maschad is this correct?
    expect(
      deployedScriptResult.logs[0].toNumber(),
      'Log should represent the configurable constant from the ones set from the deployed script.'
    ).toBe(expected.logValue);
  });
});
