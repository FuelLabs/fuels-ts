import { WalletUnlocked, Predicate, BN, getRandomB256 } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { WhitelistedAddressPredicate } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */

describe('Predicate With Configurables', () => {
  it('should successfully transfer to setted whitelisted address', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    // #region predicate-with-configurable-constants-2
    const newWhitelistedAddress = getRandomB256();

    const configurable = { WHITELISTED: newWhitelistedAddress };
    // instantiate predicate with configurable constants
    const predicate = new Predicate<[string]>({
      bytecode: WhitelistedAddressPredicate.bytecode,
      provider: wallet.provider,
      abi: WhitelistedAddressPredicate.abi,
      data: [configurable.WHITELISTED],
      configurableConstants: configurable,
    });

    // transferring funds to the predicate
    const tx1 = await wallet.transfer(predicate.address, 200_000, provider.getBaseAssetId(), {
      gasLimit: 1000,
    });

    await tx1.waitForResult();

    const destinationWallet = WalletUnlocked.generate({
      provider: wallet.provider,
    });

    const amountToTransfer = 100;

    // transferring funds from the predicate to destination if predicate returns true
    const tx2 = await predicate.transfer(
      destinationWallet.address,
      amountToTransfer,
      provider.getBaseAssetId(),
      {
        gasLimit: 1000,
      }
    );

    await tx2.waitForResult();
    // #endregion predicate-with-configurable-constants-2

    const destinationBalance = await destinationWallet.getBalance(provider.getBaseAssetId());

    expect(new BN(destinationBalance).toNumber()).toEqual(amountToTransfer);
  });

  it('should successfully transfer to default whitelisted address', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    // #region predicate-with-configurable-constants-3
    const predicate = new Predicate({
      bytecode: WhitelistedAddressPredicate.bytecode,
      provider,
      abi: WhitelistedAddressPredicate.abi,
      data: ['0xa703b26833939dabc41d3fcaefa00e62cee8e1ac46db37e0fa5d4c9fe30b4132'],
    });

    // transferring funds to the predicate
    const tx1 = await wallet.transfer(predicate.address, 200_000, provider.getBaseAssetId(), {
      gasLimit: 1000,
    });

    await tx1.waitForResult();

    const destinationWallet = WalletUnlocked.generate({
      provider: wallet.provider,
    });

    const amountToTransfer = 100;

    // transferring funds from the predicate to destination if predicate returns true
    const tx2 = await predicate.transfer(
      destinationWallet.address,
      amountToTransfer,
      provider.getBaseAssetId(),
      {
        gasLimit: 1000,
      }
    );

    await tx2.waitForResult();
    // #endregion predicate-with-configurable-constants-3

    const destinationBalance = await destinationWallet.getBalance(provider.getBaseAssetId());

    expect(new BN(destinationBalance).toNumber()).toEqual(amountToTransfer);
  });
});
