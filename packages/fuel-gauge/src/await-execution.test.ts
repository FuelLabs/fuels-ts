import { Provider, WalletUnlocked, randomBytes, Wallet, FUEL_NETWORK_URL } from 'fuels';
import { launchNode, launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('await-execution', () => {
  test('awaiting execution of a transaction on the provider works', async () => {
    using launched = await launchTestNode();

    const { provider } = launched;

    const genesisWallet = new WalletUnlocked(
      process.env.GENESIS_SECRET || randomBytes(32),
      provider
    );

    const destination = Wallet.generate({ provider });

    const transfer = await genesisWallet.createTransfer(
      destination.address,
      100,
      provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
    );

    transfer.updateWitnessByOwner(
      genesisWallet.address,
      await genesisWallet.signTransaction(transfer)
    );

    const response = await provider.sendTransaction(transfer, { awaitExecution: true });

    expect(response.gqlTransaction?.status?.type).toBe('SuccessStatus');
  });

  test.skip('transferring funds with awaitExecution works', async () => {
    using launched = await launchTestNode();

    const { provider } = launched;

    const genesisWallet = new WalletUnlocked(
      process.env.GENESIS_SECRET || randomBytes(32),
      provider
    );

    const sendTransactionSpy = vi.spyOn(provider, 'sendTransaction');

    const destination = Wallet.generate({ provider });

    await genesisWallet.transfer(
      destination.address,
      100,
      provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
      // { awaitExecution: true }
    );

    expect(sendTransactionSpy).toHaveBeenCalledTimes(1);
    const awaitExecutionArg = sendTransactionSpy.mock.calls[0][1];
    expect(awaitExecutionArg).toMatchObject({ awaitExecution: true });
  });

  test.skip('withdrawToBaseLayer works with awaitExecution', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const genesisWallet = new WalletUnlocked(
      process.env.GENESIS_SECRET || randomBytes(32),
      provider
    );

    const sendTransactionSpy = vi.spyOn(provider, 'sendTransaction');

    const destination = Wallet.generate({ provider });

    await genesisWallet.withdrawToBaseLayer(
      destination.address,
      100,
      {
        gasLimit: 10_000,
      }
      // { awaitExecution: true }
    );

    expect(sendTransactionSpy).toHaveBeenCalledTimes(1);
    const awaitExecutionArg = sendTransactionSpy.mock.calls[0][1];
    expect(awaitExecutionArg).toMatchObject({ awaitExecution: true });
  });
});
