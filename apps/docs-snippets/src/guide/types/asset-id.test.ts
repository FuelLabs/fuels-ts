import { Address } from 'fuels';
import type { AssetId, Contract, B256Address } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe('AssetId', () => {
  let contract: Contract;
  const Bits256: B256Address = '0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c';

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_ASSET_ID);
  });

  it('should demonstrate typed asset id example', () => {
    // #region asset-id-1
    // #import { AssetId };

    const assetId: AssetId = {
      bits: Bits256,
    };
    // #endregion asset-id-1

    expect(assetId.bits).toBe(Bits256);
  });

  it('should create an AssetId from a B256Address', async () => {
    // #region asset-id-2
    // #import { AssetId };

    const b256Address = '0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c';

    const address = Address.fromB256(b256Address);

    const assetId: AssetId = address.toAssetId();
    // #endregion asset-id-2

    const { value } = await contract.functions.echo_asset_id_comparison(assetId).simulate();

    expect(value).toBeTruthy();
  });

  it('should pass an asset id to a contract', async () => {
    // #region asset-id-3
    // #import { AssetId };

    const assetId: AssetId = {
      bits: Bits256,
    };

    const { value } = await contract.functions.echo_asset_id_comparison(assetId).simulate();

    expect(value).toBeTruthy();
    // #endregion asset-id-3
  });

  it('should retrieve an asset id from a contract', async () => {
    // #region asset-id-4
    // #import { AssetId };

    const assetId: AssetId = {
      bits: Bits256,
    };

    const { value } = await contract.functions.echo_asset_id().simulate();

    expect(value).toEqual(assetId);
    // #endregion asset-id-4

    expect(value.bits).toEqual(Bits256);
  });
});
