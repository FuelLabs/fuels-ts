import { safeExec } from '@fuel-ts/errors/test-utils';
import type { AssetId } from 'fuels';
import { BaseAssetId, Wallet, BN, Contract } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  it('should successfully simulate contract call with forwarded amount', async () => {
    const contract = await createAndDeployContractFromProject(
      DocSnippetProjectsEnum.TRANSFER_TO_ADDRESS
    );

    const amountToForward = 40;
    const amountToTransfer = 10;

    const provider = contract.provider;

    const someAddress = Wallet.generate({
      provider,
    }).address.toB256();

    const assetId: AssetId = {
      value: BaseAssetId,
    };

    // #region simulate-transactions-1
    const { gasUsed } = await contract.functions
      .transfer(amountToTransfer, assetId, someAddress)
      .callParams({
        forward: [amountToForward, BaseAssetId],
      })
      .txParams({ gasPrice: 1, gasLimit: 10_000 })
      .simulate();

    // #context console.log('The gas used on this call was: ', gasUsed')
    // #endregion simulate-transactions-1
    expect(new BN(gasUsed).toNumber()).toBeGreaterThan(0);
  });

  it('should successfully execute a simulate call', async () => {
    const contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_VALUES);

    // #region simulate-transactions-2
    const { value } = await contract.functions
      .echo_u8(15)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    // #endregion simulate-transactions-2
    expect(value).toEqual(15);
  });

  it('should throw when simulating with an unfunded wallet', async () => {
    const contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_VALUES);
    const unfundedWallet = Wallet.generate({ provider: contract.provider });
    const { abiContents: abi } = getDocsSnippetsForcProject(DocSnippetProjectsEnum.ECHO_VALUES);
    const deployedContract = new Contract(contract.id, abi, unfundedWallet);

    const { error } = await safeExec(() => deployedContract.functions.echo_u8(15).simulate());

    expect((<Error>error).message).toMatch('not enough coins to fit the target');
  });

  it('should throw when dry running with an unfunded wallet', async () => {
    const contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_VALUES);
    const unfundedWallet = Wallet.generate({ provider: contract.provider });
    const { abiContents: abi } = getDocsSnippetsForcProject(DocSnippetProjectsEnum.ECHO_VALUES);
    const deployedContract = new Contract(contract.id, abi, unfundedWallet);

    const { error } = await safeExec(() => deployedContract.functions.echo_u8(15).dryRun());

    expect((<Error>error).message).toMatch('not enough coins to fit the target');
  });
});
