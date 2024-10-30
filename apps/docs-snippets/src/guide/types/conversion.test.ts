import type { WalletLocked, AssetId } from 'fuels';
import { Wallet, Contract, Address, isBech32, toBech32, toB256, isB256 } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';

/**
 * @group node
 */
describe('Conversion Types', () => {
  const { abiContents: abi } = getDocsSnippetsForcProject(DocSnippetProjectsEnum.ECHO_VALUES);

  it('should successfully create new address from asset id', () => {
    // #region conversion-4
    // #import { Address, AssetId };

    const b256 = '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f';
    const address = Address.fromB256(b256);
    const assetId: AssetId = address.toAssetId();
    // #endregion conversion-4

    expect(assetId.bits).toEqual(b256);
  });
});
