import { safeExec } from '@fuel-ts/errors/test-utils';
import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { BaseAssetId, Wallet, BN, Contract } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';
import { getProgramDir } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  it('should successfully simulate contract call with forwarded amount', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('transfer-to-address')],
    });
    const {
      contracts: [contract],
      provider,
    } = launched;

    const amountToForward = 40;
    const amountToTransfer = 10;

    const someAddress = Wallet.generate({
      provider,
    }).address.toB256();

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

  it('should successfully execute a simulate call', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-values')],
    });
    const {
      contracts: [contract],
    } = launched;

    // #region simulate-transactions-2
    const { value } = await contract.functions.echo_u8(15).simulate();
    // #endregion simulate-transactions-2
    expect(value).toEqual(15);
  });

  it('should throw when simulating with an unfunded wallet', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-values')],
    });
    const {
      contracts: [{ id: contractId }],
      provider,
    } = launched;

    const unfundedWallet = Wallet.generate({ provider });
    const { abiContents: abi } = getSnippetProjectArtifacts(SnippetProjectEnum.ECHO_VALUES);
    const deployedContract = new Contract(contractId, abi, unfundedWallet);

    const { error } = await safeExec(() => deployedContract.functions.echo_u8(15).simulate());

    expect((<Error>error).message).toMatch('not enough coins to fit the target');
  });

  it('should throw when dry running with an unfunded wallet', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-values')],
    });
    const {
      contracts: [{ id: contractId }],
      provider,
    } = launched;

    const unfundedWallet = Wallet.generate({ provider });
    const { abiContents: abi } = getSnippetProjectArtifacts(SnippetProjectEnum.ECHO_VALUES);
    const deployedContract = new Contract(contractId, abi, unfundedWallet);

    const { error } = await safeExec(() => deployedContract.functions.echo_u8(15).dryRun());

    expect((<Error>error).message).toMatch('not enough coins to fit the target');
  });
});
