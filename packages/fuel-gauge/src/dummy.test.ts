/* eslint-disable no-console */
import { bn, ContractFactory, hexlify, Script } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ScriptDummy } from '../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('first try', () => {
  function getDataOffset(binary: Uint8Array): number {
    const buffer = binary.buffer.slice(binary.byteOffset + 8, binary.byteOffset + 16);
    const dataView = new DataView(buffer);
    const dataOffset = dataView.getBigUint64(0, false); // big-endian
    return Number(dataOffset);
  }

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
      PIN: 1000,
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

  it.skip('Should call another script after deploying script with configurable using script program', async () => {
    using launch = await launchTestNode();

    const {
      wallets: [wallet],
    } = launch;

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);

    console.log('Script Dummy Bytecode', hexlify(ScriptDummy.bytecode));
    const newScript = new Script(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    newScript.setConfigurableConstants({
      PIN: 1000,
    });
    console.log('New Script Bytecode', hexlify(newScript.bytes));

    const { waitForResult } = await factory.deployAsBlobTxForScript();

    const { loaderBytecode } = await waitForResult();

    const preScript = new Script(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const otherConfigurable = {
      PIN: 4592,
    };
    preScript.setConfigurableConstants(otherConfigurable);

    console.log('###########################################');
    console.log('preScript: ', hexlify(preScript.bytes));
    console.log('###########################################');
    console.log('loaderBytecode: ', loaderBytecode);
    console.log('###########################################');

    // const configurablesOffset = getDataOffset(preScript.bytes);
    // const configurablesOffsetInLoader = getDataOffset(arrayify(loaderBytecode));
    // const setConfigurablesBytes = preScript.bytes.slice(configurablesOffset);
    // const dataSectionLenBytes = new Uint8Array(8);
    // const dataView = new DataView(dataSectionLenBytes.buffer);
    // dataView.setBigUint64(0, BigInt(setConfigurablesBytes.length), false); // false for big-endian

    const { waitForResult: waitForResult2 } = await preScript.functions.main(33).call();

    const { transactionResult: transactionResult2, value, logs } = await waitForResult2();

    // The logs should reflect the new configurable that was set
    console.log('transaction result 2 logs: ', logs);
    console.log('script bytes: ', hexlify(transactionResult2.transaction.script));
    console.log('loader bytecode: ', loaderBytecode);

    expect(value).toBe(33);
    expect(logs).toBe([bn(4592)]);
  });
});
