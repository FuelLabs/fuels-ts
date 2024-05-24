import type { WalletUnlocked } from 'fuels';
import { BN, Predicate } from 'fuels';

import {
  getDocsSnippetsForcProject,
  DocSnippetProjectsEnum,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let wallet: WalletUnlocked;
  let baseAssetId: string;

  const { abiContents: abi, binHexlified: bin } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.CONFIGURABLE_PIN
  );

  beforeAll(async () => {
    wallet = await getTestWallet();
    baseAssetId = wallet.provider.getBaseAssetId();
  });

  it('should successfully transfer to the updated pin', async () => {
    const pin = 1111;

    // #region predicate-with-configurable-pin-2
    const configurable = { PIN: pin };
    // instantiate predicate with configurable constants
    const predicate = new Predicate<[number]>({
      bytecode: bin,
      provider: wallet.provider,
      abi,
      inputData: [configurable.PIN],
      configurableConstants: configurable,
    });

    // transferring funds to the predicate
    const tx1 = await wallet.transfer(predicate.address, 1000, baseAssetId, {
      gasLimit: 1000,
    });

    // #endregion predicate-with-configurable-pin-2

    const txStatus = await tx1.waitForResult();

    expect(txStatus.isStatusSuccess).toEqual(true);
  });
});
