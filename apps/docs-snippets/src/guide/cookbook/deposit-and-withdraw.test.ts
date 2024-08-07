import type { Contract, WalletUnlocked, Provider } from 'fuels';
import { ContractFactory, Wallet, ZeroBytes32, getMintedAssetId } from 'fuels';

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
  let baseAssetId: string;

  beforeAll(async () => {
    sender = await getTestWallet();

    const { abiContents, binHexlified } = getDocsSnippetsForcProject(
      DocSnippetProjectsEnum.LIQUIDITY_POOL
    );
    provider = sender.provider;
    baseAssetId = provider.getBaseAssetId();
    const factory = new ContractFactory(binHexlified, abiContents, sender);
    const { waitForResult } = await factory.deploy({
      configurableConstants: { TOKEN: { bits: baseAssetId } },
    });
    ({ contract: liquidityPoolContract } = await waitForResult());
  });

  it('deposit and withdraw cookbook guide', async () => {
    // #region deposit-and-withdraw-cookbook-2
    const depositAmount = 100_000;
    const liquidityOwner = Wallet.generate({ provider });

    // the subId used to mint the new asset is a zero b256 on the contract
    const subId = ZeroBytes32;
    const contractId = liquidityPoolContract.id.toB256();

    const assetId = getMintedAssetId(contractId, subId);

    const call1 = await liquidityPoolContract.functions
      .deposit({ bits: liquidityOwner.address.toB256() })
      .callParams({ forward: [depositAmount, baseAssetId] })
      .txParams({ variableOutputs: 1 })
      .call();

    await call1.waitForResult();

    const liquidityAmount = await liquidityOwner.getBalance(assetId);

    expect(liquidityAmount.toNumber()).toBe(depositAmount * 2);
    // #endregion deposit-and-withdraw-cookbook-2

    // #region deposit-and-withdraw-cookbook-3
    const call2 = await liquidityPoolContract.functions
      .withdraw({ bits: liquidityOwner.address.toB256() })
      .callParams({ forward: [depositAmount, baseAssetId] })
      .txParams({ variableOutputs: 1 })
      .call();

    await call2.waitForResult();

    const baseAssetAfterWithdraw = await liquidityOwner.getBalance(baseAssetId);

    expect(baseAssetAfterWithdraw.toNumber()).toBe(depositAmount / 2);
    // #endregion deposit-and-withdraw-cookbook-3
  });
});
