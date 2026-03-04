import { launchTestNode } from 'fuels/test-utils';

import { TokenContractFactory } from '../test/typegen';
import { AdvancedLoggingFactory } from '../test/typegen/contracts/AdvancedLoggingFactory';
import { ScriptMainArgBool } from '../test/typegen/scripts';

/**
 * @group browser
 * @group node
 */
describe('User account tests', () => {
  it('should return false for a blob ID', async () => {
    using launch = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launch;

    const script = new ScriptMainArgBool(wallet);
    const { waitForResult, blobId } = await script.deploy(wallet);

    await waitForResult();

    expect(await provider.isUserAccount(blobId)).toBe(false);
  });

  it('should return false for a contract ID', async () => {
    using launch = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launch;

    const factory = new AdvancedLoggingFactory(wallet);
    const { waitForResult } = await factory.deploy();

    const { contract } = await waitForResult();

    expect(await provider.isUserAccount(contract.id.toB256())).toBe(false);
  });

  it('should return true for a wallet address', async () => {
    using launch = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launch;

    expect(await provider.isUserAccount(wallet.address.toB256())).toBe(true);
  });

  it('should return false for a transaction ID', async () => {
    using launch = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launch;

    const tx = await wallet.transfer(wallet.address, 100, await provider.getBaseAssetId());

    await tx.wait();

    expect(await provider.isUserAccount(tx.id)).toBe(false);
  });

  it('should return false for a Asset ID', async () => {
    using launch = await launchTestNode({
      contractsConfigs: [{ factory: TokenContractFactory }],
    });

    const {
      provider,
      contracts: [tokenContract],
    } = launch;

    const call = await tokenContract.functions.mint_coins(1).call();
    const {
      transactionResult: { mintedAssets },
    } = await call.waitForResult();

    const [{ assetId }] = mintedAssets;

    expect(await provider.isUserAccount(assetId)).toBe(false);
  });

  it('should return the correct address type', async () => {
    using launch = await launchTestNode({
      contractsConfigs: [{ factory: TokenContractFactory }],
    });

    const {
      provider,
      wallets: [wallet],
      contracts: [tokenContract],
    } = launch;

    const script = new ScriptMainArgBool(wallet);
    const { blobId, waitForResult } = await script.deploy(wallet);
    await waitForResult();

    const call = await tokenContract.functions.mint_coins(1000000).call();
    const {
      transactionResult: { mintedAssets, id },
    } = await call.waitForResult();
    const [{ assetId }] = mintedAssets;

    let type = await provider.getAddressType(assetId);
    expect(type).toBe('Asset');

    type = await provider.getAddressType(id);
    expect(type).toBe('Transaction');

    type = await provider.getAddressType(blobId);
    expect(type).toBe('Blob');

    type = await provider.getAddressType(tokenContract.id.toB256());
    expect(type).toBe('Contract');

    type = await provider.getAddressType(wallet.address.toB256());
    expect(type).toBe('Account');
  });
});
