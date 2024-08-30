import { getMintedAssetId, getRandomB256, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { TokenFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Variable Outputs', () => {
  it('should successfully execute contract call with variable outputs', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: TokenFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

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
