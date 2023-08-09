import { BaseAssetId, Wallet, BN } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

describe(__filename, () => {
  it('should successfully simulate contract call with forwarded amount', async () => {
    const contract = await createAndDeployContractFromProject(
      SnippetProjectEnum.TRANSFER_TO_ADDRESS
    );

    const amountToForward = 40;
    const amountToTransfer = 10;

    const someAddress = Wallet.generate().address.toB256();

    // #region simulate-transactions-1
    const { gasUsed } = await contract.functions
      .transfer(amountToTransfer, BaseAssetId, someAddress)
      .callParams({
        forward: [amountToForward, BaseAssetId],
      })
      .simulate();

    // #context console.log('The gas used on this call was: ', gasUsed')
    // #endregion simulate-transactions-1
    expect(new BN(gasUsed).toNumber()).toBeGreaterThan(0);
  });

  it('should successfully execute a read only call', async () => {
    const contract = await createAndDeployContractFromProject(SnippetProjectEnum.ECHO_VALUES);

    // #region simulate-transactions-2
    const { value } = await contract.functions.echo_u8(15).simulate();
    // #endregion simulate-transactions-2
    expect(value).toEqual(15);
  });
});
