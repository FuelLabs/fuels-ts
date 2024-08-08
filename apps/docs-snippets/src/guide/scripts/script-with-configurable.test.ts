import { Script, BN } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { SumScript } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Script With Configurable', () => {
  it('should successfully sum set configurable constants with inputted value', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    // #region script-with-configurable-contants-2
    const script = new Script(SumScript.bytecode, SumScript.abi, wallet);

    const configurableConstants = {
      AMOUNT: 81,
    };

    script.setConfigurableConstants(configurableConstants);

    const inputtedValue = 10;

    const { waitForResult } = await script.functions.main(inputtedValue).call();
    const { value } = await waitForResult();

    const expectedTotal = inputtedValue + configurableConstants.AMOUNT;

    expect(new BN(value as number).toNumber()).toEqual(expectedTotal);
    // #endregion script-with-configurable-contants-2
  });

  it('prepares a script and retrieves the id before submission', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [wallet],
    } = launched;

    const argument = 10;
    const expected = 20;

    // #region preparing-scripts
    const script = new Script(SumScript.bytecode, SumScript.abi, wallet);

    const tx = script.functions.main(argument);

    // Set the call parameters
    tx.callParams({ gasLimit: 1500 });

    // Get the entire transaction request prior to
    const txRequest = await tx.getTransactionRequest();

    // Get the transaction ID
    const txId = await tx.getTransactionId();

    // Retrieve the value of the call and the actual gas used
    const { waitForResult } = await tx.call();
    const { value, gasUsed } = await waitForResult();
    // #endregion preparing-scripts
    expect(txRequest).toBeDefined();
    expect(txId).toBeDefined();
    expect(new BN(value as number).toNumber()).toEqual(expected);
    expect(new BN(gasUsed).toNumber()).toBeGreaterThan(0);
  });
});
