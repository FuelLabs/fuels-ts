import { Provider, WalletUnlocked, randomBytes, Wallet, FUEL_NETWORK_URL } from 'fuels';
import { launchNode } from 'fuels/test-utils';

/**
 * @group node
 */
describe('await-execution', () => {
  test('awaiting execution of a transaction on the provider works', async () => {
    const { cleanup, ip, port } = await launchNode({
      args: ['--poa-instant', 'false', '--poa-interval-period', '400ms'],
    });
    const nodeProvider = await Provider.create(`http://${ip}:${port}/v1/graphql`);
    const baseAssetId = nodeProvider.getBaseAssetId();

    const genesisWallet = new WalletUnlocked(
      process.env.GENESIS_SECRET || randomBytes(32),
      nodeProvider
    );

    const destination = Wallet.generate({ provider: nodeProvider });

    const transfer = await genesisWallet.createTransfer(destination.address, 100, baseAssetId, {
      gasLimit: 10_000,
    });

    transfer.updateWitnessByOwner(
      genesisWallet.address,
      await genesisWallet.signTransaction(transfer)
    );

    const response = await nodeProvider.sendTransaction(transfer, { awaitExecution: true });

    expect(response.gqlTransaction?.status?.type).toBe('SuccessStatus');

    cleanup();
  });

  test.skip('transferring funds with awaitExecution works', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const baseAssetId = provider.getBaseAssetId();

    const genesisWallet = new WalletUnlocked(
      process.env.GENESIS_SECRET || randomBytes(32),
      provider
    );

    const sendTransactionSpy = vi.spyOn(provider, 'sendTransaction');

    const destination = Wallet.generate({ provider });

    await genesisWallet.transfer(
      destination.address,
      100,
      baseAssetId,
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
