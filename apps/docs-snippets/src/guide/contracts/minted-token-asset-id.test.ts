import type { Contract } from 'fuels';
import { bn, getMintedAssetId, createAssetId } from 'fuels';

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

    const txResult = await contract.functions.mint_coins(subID, mintAmount).call();

    const mintedAssetId = getMintedAssetId(subID, contract.id.toB256());
    // #endregion minted-token-asset-id-2

    expect(mintedAssetId).toBeDefined();
    expect(txResult.transactionResult.isStatusSuccess).toBeTruthy();
  });

  it('should create valid asset ID', async () => {
    // #region create-asset-id-1
    const subID = '0xc7fd1d987ada439fc085cfa3c49416cf2b504ac50151e3c2335d60595cb90745';

    const assetId = createAssetId(contract.id.toB256(), subID);
    const { value } = await contract.functions.echo_asset_id_comparison(assetId).simulate();
    // #endregion create-asset-id-1

    expect(assetId).toBeDefined();
    expect(value).toBeTruthy();
  });
});
