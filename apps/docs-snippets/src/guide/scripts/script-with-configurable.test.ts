import type { WalletUnlocked } from 'fuels';
import { Script, BN } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let wallet: WalletUnlocked;

  const { abiContents, binHexlified } = getSnippetProjectArtifacts(SnippetProjectEnum.SUM_SCRIPT);

  beforeAll(async () => {
    wallet = await getTestWallet();
  });

  it('should successfully sum setted configurable constant with inpputed value', async () => {
    // #region script-with-configurable-contants-2
    const script = new Script(binHexlified, abiContents, wallet);

    const configurableConstants = {
      AMOUNT: 81,
    };

    script.setConfigurableConstants(configurableConstants);

    const inpputedValue = 10;

    const { value } = await script.functions.main(inpputedValue).call();

    const expectedTotal = inpputedValue + configurableConstants.AMOUNT;

    expect(new BN(value as number).toNumber()).toEqual(expectedTotal);
    // #endregion script-with-configurable-contants-2
  });
});
