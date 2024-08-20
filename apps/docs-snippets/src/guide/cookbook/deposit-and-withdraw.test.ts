import { Wallet, ZeroBytes32, getMintedAssetId } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { LiquidityPoolFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Deposit and Withdraw with Liquidity Pool', () => {
  it('deposit and withdraw cookbook guide', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const liquidityPoolContractFactory = new LiquidityPoolFactory(wallet);

    const { waitForResult } = await liquidityPoolContractFactory.deploy({
      configurableConstants: {
        TOKEN: { bits: provider.getBaseAssetId() },
      },
    });

    const { contract: liquidityPoolContract } = await waitForResult();

    // #region deposit-and-withdraw-cookbook-2
    const depositAmount = 100_000;
    const liquidityOwner = Wallet.generate({ provider });

    // the subId used to mint the new asset is a zero b256 on the contract
    const subId = ZeroBytes32;
    const contractId = liquidityPoolContract.id.toB256();

    const assetId = getMintedAssetId(contractId, subId);

    const call1 = await liquidityPoolContract.functions
      .deposit({ bits: liquidityOwner.address.toB256() })
      .callParams({ forward: [depositAmount, provider.getBaseAssetId()] })
      .txParams({ variableOutputs: 1 })
      .call();

    await call1.waitForResult();

    const liquidityAmount = await liquidityOwner.getBalance(assetId);

    expect(liquidityAmount.toNumber()).toBe(depositAmount * 2);
    // #endregion deposit-and-withdraw-cookbook-2

    // #region deposit-and-withdraw-cookbook-3
    const call2 = await liquidityPoolContract.functions
      .withdraw({ bits: liquidityOwner.address.toB256() })
      .callParams({ forward: [depositAmount, provider.getBaseAssetId()] })
      .txParams({ variableOutputs: 1 })
      .call();

    await call2.waitForResult();

    const baseAssetAfterWithdraw = await liquidityOwner.getBalance(provider.getBaseAssetId());

    expect(baseAssetAfterWithdraw.toNumber()).toBe(depositAmount / 2);
    // #endregion deposit-and-withdraw-cookbook-3
  });
});
