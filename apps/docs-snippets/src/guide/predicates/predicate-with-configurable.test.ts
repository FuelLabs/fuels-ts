import { WalletUnlocked, Predicate, BN, getRandomB256 } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */

describe(__filename, () => {
  let wallet: WalletUnlocked;
  let baseAssetId: string;

  const { abiContents: abi, binHexlified: bin } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.WHITELISTED_ADDRESS_PREDICATE
  );

  beforeAll(async () => {
    wallet = await getTestWallet();
    baseAssetId = wallet.provider.getBaseAssetId();
  });

  it('should successfully tranfer to setted whitelisted address', async () => {
    // #region predicate-with-configurable-constants-2
    const newWhitelistedAddress = getRandomB256();

    const configurable = { WHITELISTED: newWhitelistedAddress };
    // instantiate predicate with configurable constants
    const predicate = new Predicate<[string]>({
      bytecode: bin,
      provider: wallet.provider,
      abi,
      data: [configurable.WHITELISTED],
      configurableConstants: configurable,
    });

    // transferring funds to the predicate
    const tx1 = await wallet.transfer(predicate.address, 200_000, baseAssetId, {
      gasLimit: 1000,
    });

    await tx1.waitForResult();

    const destinationWallet = WalletUnlocked.generate({
      provider: wallet.provider,
    });

    const amountToTransfer = 100;

    // transferring funds from the predicate to destination if predicate returns true
    const tx2 = await predicate.transfer(destinationWallet.address, amountToTransfer, baseAssetId, {
      gasLimit: 1000,
    });

    await tx2.waitForResult();
    // #endregion predicate-with-configurable-constants-2

    const destinationBalance = await destinationWallet.getBalance(baseAssetId);

    expect(new BN(destinationBalance).toNumber()).toEqual(amountToTransfer);
  });

  it('should successfully tranfer to default whitelisted address', async () => {
    // #region predicate-with-configurable-constants-3
    const predicate = new Predicate({
      bytecode: bin,
      provider: wallet.provider,
      abi,
      data: ['0xa703b26833939dabc41d3fcaefa00e62cee8e1ac46db37e0fa5d4c9fe30b4132'],
    });

    // transferring funds to the predicate
    const tx1 = await wallet.transfer(predicate.address, 200_000, baseAssetId, {
      gasLimit: 1000,
    });

    await tx1.waitForResult();

    const destinationWallet = WalletUnlocked.generate({
      provider: wallet.provider,
    });

    const amountToTransfer = 100;

    // transferring funds from the predicate to destination if predicate returns true
    const tx2 = await predicate.transfer(destinationWallet.address, amountToTransfer, baseAssetId, {
      gasLimit: 1000,
    });

    await tx2.waitForResult();
    // #endregion predicate-with-configurable-constants-3

    const destinationBalance = await destinationWallet.getBalance(baseAssetId);

    expect(new BN(destinationBalance).toNumber()).toEqual(amountToTransfer);
  });
});
