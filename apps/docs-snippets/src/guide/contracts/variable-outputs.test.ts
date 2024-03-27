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

  it('should successfully execute contract call with txParams', async () => {
    const subId = getRandomB256();

    await contract.functions.mint_coins(subId, 100).call();

    const address = { value: Wallet.generate().address.toB256() };
    const assetId = { value: getMintedAssetId(contract.id.toB256(), subId) };

    // #region variable-outputs-2
    const { transactionResult } = await contract.functions
      .transfer_to_address(address, assetId, 100)
      .txParams({
        variableOutputs: 1,
      })
      .call();
    // #endregion variable-outputs-2

    expect(transactionResult.isStatusSuccess).toBeTruthy();
  });
});
