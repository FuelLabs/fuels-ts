import type { WalletUnlocked } from 'fuels';
import { Script, BN } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let wallet: WalletUnlocked;
  let gasPrice: BN;
  const { abiContents, binHexlified } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SUM_SCRIPT
  );

  beforeAll(async () => {
    wallet = await getTestWallet();
    ({ minGasPrice: gasPrice } = wallet.provider.getGasConfig());
  });

  it('should successfully sum setted configurable constant with inpputed value', async () => {
    // #region script-with-configurable-contants-2
    const script = new Script(binHexlified, abiContents, wallet);

    const configurableConstants = {
      AMOUNT: 81,
    };

    script.setConfigurableConstants(configurableConstants);

    const inpputedValue = 10;

    const { value } = await script.functions
      .main(inpputedValue)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call();

    const expectedTotal = inpputedValue + configurableConstants.AMOUNT;

    expect(new BN(value as number).toNumber()).toEqual(expectedTotal);
    // #endregion script-with-configurable-contants-2
  });
});
