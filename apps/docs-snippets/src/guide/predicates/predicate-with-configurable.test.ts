import { WalletUnlocked, Predicate, BaseAssetId, BN, getRandomB256 } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let wallet: WalletUnlocked;

  const { abiContents: abi, binHexlified: bin } = getSnippetProjectArtifacts(
    SnippetProjectEnum.WHITELISTED_ADDRESS_PREDICATE
  );

  beforeAll(async () => {
    wallet = await getTestWallet();
  });

  it('should successfully tranfer to setted whitelisted address', async () => {
    // #region predicate-with-configurable-constants-2
    const newWhitelistedAddress = getRandomB256();

    const configurable = { WHITELISTED: newWhitelistedAddress };
    const chainId = await wallet.provider.getChainId();
    // instantiate predicate with configurable constants
    const predicate = new Predicate(bin, chainId, abi, wallet.provider, configurable);

    // set predicate data to be the same as the configurable constant
    predicate.setData(configurable.WHITELISTED);

    // transfering funds to the predicate
    const tx1 = await wallet.transfer(predicate.address, 500);

    await tx1.waitForResult();

    const destinationWallet = WalletUnlocked.generate();

    const amountToTransfer = 100;

    // transfering funds from the predicate to destination if predicate returns true
    const tx2 = await predicate.transfer(destinationWallet.address, amountToTransfer);

    await tx2.waitForResult();
    // #endregion predicate-with-configurable-constants-2

    const destinationBalance = await destinationWallet.getBalance(BaseAssetId);

    expect(new BN(destinationBalance).toNumber()).toEqual(amountToTransfer);
  });

  it('should successfully tranfer to default whitelisted address', async () => {
    // #region predicate-with-configurable-constants-3
    const chainId = await wallet.provider.getChainId();
    const predicate = new Predicate(bin, chainId, abi, wallet.provider);

    // set predicate data to be the same as the configurable constant
    predicate.setData('0xa703b26833939dabc41d3fcaefa00e62cee8e1ac46db37e0fa5d4c9fe30b4132');

    // transfering funds to the predicate
    const tx1 = await wallet.transfer(predicate.address, 500);

    await tx1.waitForResult();

    const destinationWallet = WalletUnlocked.generate();

    const amountToTransfer = 100;

    // transfering funds from the predicate to destination if predicate returns true
    const tx2 = await predicate.transfer(destinationWallet.address, amountToTransfer);

    await tx2.waitForResult();
    // #endregion predicate-with-configurable-constants-3

    const destinationBalance = await destinationWallet.getBalance(BaseAssetId);

    expect(new BN(destinationBalance).toNumber()).toEqual(amountToTransfer);
  });
});
