import { Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('await-execution', () => {
  test('awaiting execution of a transaction on the provider works', async () => {
    using launched = await launchTestNode({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '400ms'],
      },
    });

    const {
      provider,
      wallets: [genesisWallet],
    } = launched;

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

    const {
      wallets: [genesisWallet],
    } = launched;

    const sendTransactionSpy = vi.spyOn(provider, 'sendTransaction');

    const destination = Wallet.generate({ provider });

    await genesisWallet.transfer(destination.address, 100, provider.getBaseAssetId(), {
      gasLimit: 10_000,
    });

    expect(sendTransactionSpy).toHaveBeenCalledTimes(1);
    const awaitExecutionArg = sendTransactionSpy.mock.calls[0][1];
    expect(awaitExecutionArg).toMatchObject({ awaitExecution: true });
  });

  test('withdrawToBaseLayer works with awaitExecution', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [genesisWallet],
    } = launched;

    const sendTransactionSpy = vi.spyOn(provider, 'sendTransaction');

    const destination = Wallet.generate({ provider });

    await genesisWallet.withdrawToBaseLayer(destination.address, 100, {
      gasLimit: 44442,
    });

    expect(sendTransactionSpy).toHaveBeenCalledTimes(1);
  });
});
