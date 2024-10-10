import { ContractFactory } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { AdvancedLoggingFactory } from '../test/typegen/contracts/AdvancedLoggingFactory';
import { ScriptDummy } from '../test/typegen/scripts';

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

    const factory = new ContractFactory(ScriptDummy.bytecode, ScriptDummy.abi, wallet);
    const { waitForResult, blobId } = await factory.deployAsBlobTxForScript();

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

    const tx = await wallet.transfer(wallet.address, 100, provider.getBaseAssetId());

    await tx.wait();

    expect(await provider.isUserAccount(tx.id)).toBe(false);
  });

  it('should return the correct address type', async () => {
    using launch = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launch;

    expect(await provider.getAddressType(wallet.address.toB256())).toBe('Account');
  });
});
