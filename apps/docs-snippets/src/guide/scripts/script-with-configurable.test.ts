import type { WalletUnlocked } from 'fuels';
import { Script, BN } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let wallet: WalletUnlocked;
  const { abiContents, binHexlified } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SUM_SCRIPT
  );

  beforeAll(async () => {
    wallet = await getTestWallet();
  });

  it('should successfully sum setted configurable constant with inpputed value', async () => {
    // #region script-with-configurable-contants-2
    const script = new Script(binHexlified, abiContents, wallet);

    const configurableConstants = {
      AMOUNT: 81,
    };

    script.setConfigurableConstants(configurableConstants);

    const inpputedValue = 10;

    const { value } = await script.functions.main(inpputedValue).call();

    const expectedTotal = inpputedValue + configurableConstants.AMOUNT;

    expect(new BN(value as number).toNumber()).toEqual(expectedTotal);
    // #endregion script-with-configurable-contants-2
  });

  it('prepares a script and retrieves the id before submission', async () => {
    const argument = 10;
    const expected = 20;

    // #region preparing-scripts
    const script = new Script(binHexlified, abiContents, wallet);

    const tx = script.functions.main(argument);

    // Set the call parameters
    tx.callParams({ gasLimit: 2000 });

    // Get the entire transaction request prior to
    const txRequest = await tx.getTransactionRequest();

    // Get the transaction ID
    const txId = await tx.getTransactionId();

    // Retrieve the value of the call and the actual gas used
    const { value, gasUsed } = await tx.call();
    // #endregion preparing-scripts
    expect(txRequest).toBeDefined();
    expect(txId).toBeDefined();
    expect(new BN(value as number).toNumber()).toEqual(expected);
    expect(new BN(gasUsed).toNumber()).toBeGreaterThan(0);
  });
});
