import type { Contract } from 'fuels';
import { getMintedAssetId, getRandomB256, Wallet } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;
  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.TOKEN);
  });

  it('should successfully execute contract call with variable outputs', async () => {
    const subId = getRandomB256();

    const call1 = await contract.functions.mint_coins(subId, 100).call();
    await call1.waitForResult();

    const address = { bits: Wallet.generate().address.toB256() };
    const assetId = { bits: getMintedAssetId(contract.id.toB256(), subId) };

    // #region variable-outputs-2
    const { waitForResult } = await contract.functions
      .transfer_to_address(address, assetId, 100)
      .txParams({
        variableOutputs: 1,
      })
      .call();

    const { transactionResult } = await waitForResult();
    // #endregion variable-outputs-2

    expect(transactionResult.isStatusSuccess).toBeTruthy();
  });
});
