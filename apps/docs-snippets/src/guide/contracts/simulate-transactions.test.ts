import { safeExec } from '@fuel-ts/errors/test-utils';
import type { AssetId } from 'fuels';
import { BaseAssetId, Wallet, Contract } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  it('should successfully execute a simulate call', async () => {
    const contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_VALUES);

    // #region simulate-transactions-1
    const { value } = await contract.functions.echo_u8(15).simulate();
    // #endregion simulate-transactions-1
    expect(value).toEqual(15);
  });

  it('should ensure "simulate" requires a funded wallet in order to be executed', async () => {
    const contract = await createAndDeployContractFromProject(
      DocSnippetProjectsEnum.TRANSFER_TO_ADDRESS
    );

    const { provider } = contract;

    const amountToTransfer = 1000;
    const unfundedWallet = Wallet.generate({ provider });
    const recipientAddress = Wallet.generate({ provider }).address.toB256();
    const assetId: AssetId = {
      value: BaseAssetId,
    };

    // #region simulate-transactions-2
    contract.account = unfundedWallet;

    await expect(
      contract.functions
        .transfer(amountToTransfer, assetId, recipientAddress)
        .callParams({
          forward: [amountToTransfer, BaseAssetId],
        })
        .simulate()
    ).rejects.toThrow('not enough coins to fit the target');
    // #endregion simulate-transactions-2
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
