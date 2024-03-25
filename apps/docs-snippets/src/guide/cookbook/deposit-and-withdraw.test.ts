import type { Contract, WalletUnlocked, Provider } from 'fuels';
import { ContractFactory, BaseAssetId, Wallet, ZeroBytes32, getAssetId } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let sender: WalletUnlocked;
  let liquidityPoolContract: Contract;
  let provider: Provider;

  beforeAll(async () => {
    sender = await getTestWallet();

    const { abiContents, binHexlified } = getDocsSnippetsForcProject(
      DocSnippetProjectsEnum.LIQUIDITY_POOL
    );
    provider = sender.provider;
    const factory = new ContractFactory(binHexlified, abiContents, sender);
    liquidityPoolContract = await factory.deployContract();
  });

  it('deposit and withdraw cookbook guide', async () => {
    // #region deposit-and-withdraw-cookbook-2
    const depositAmount = 100_000;
    const liquidityOwner = Wallet.generate({ provider });

    // the subId used to mint the new asset is a zero b256 on the contract
    const subId = ZeroBytes32;
    const contractId = liquidityPoolContract.id.toB256();

    const assetId = getAssetId(contractId, subId);

    await liquidityPoolContract.functions
      .deposit({ value: liquidityOwner.address.toB256() })
      .callParams({ forward: [depositAmount, BaseAssetId] })
      .txParams({ variableOutputs: 1 })
      .call();

    const liquidityAmount = await liquidityOwner.getBalance(assetId);

    expect(liquidityAmount.toNumber()).toBe(depositAmount * 2);
    // #endregion deposit-and-withdraw-cookbook-2

    // #region deposit-and-withdraw-cookbook-3
    await liquidityPoolContract.functions
      .withdraw({ value: liquidityOwner.address.toB256() })
      .callParams({ forward: [depositAmount, BaseAssetId] })
      .txParams({ variableOutputs: 1 })
      .call();

    const baseAssetAfterWithdraw = await liquidityOwner.getBalance(BaseAssetId);

    expect(baseAssetAfterWithdraw.toNumber()).toBe(depositAmount / 2);
    // #endregion deposit-and-withdraw-cookbook-3
  });
});
