import { bn, getMintedAssetId } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { TokenFactory } from '../../../test/typegen';

/**
 * @group node
 */
describe(__filename, () => {
  it('should successfully execute contract call with forwarded amount', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [{ factory: TokenFactory }],
    });

    const {
      contracts: [contract],
    } = launched;

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
