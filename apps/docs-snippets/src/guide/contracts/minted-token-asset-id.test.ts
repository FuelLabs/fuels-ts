import type { Contract } from 'fuels';
import { bn, getMintedAssetId } from 'fuels';

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

  it('should successfully execute contract call with forwarded amount', async () => {
    // #region minted-token-asset-id-2
    // #import { bn, getMintedAssetId };

    // Any valid bits256 string can be used as a sub ID
    const subID = '0xc7fd1d987ada439fc085cfa3c49416cf2b504ac50151e3c2335d60595cb90745';
    const mintAmount = bn(1000);

    const { waitForResult } = await contract.functions.mint_coins(subID, mintAmount).call();
    const txResult = await waitForResult();

    const mintedAssetId = getMintedAssetId(contract.id.toB256(), subID);
    // #endregion minted-token-asset-id-2

    expect(mintedAssetId).toBeDefined();
    expect(txResult.transactionResult.isStatusSuccess).toBeTruthy();
  });
});
