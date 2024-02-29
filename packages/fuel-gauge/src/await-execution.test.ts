import { launchNode } from '@fuel-ts/account/test-utils';
import {
  Provider,
  WalletUnlocked,
  randomBytes,
  Wallet,
  BaseAssetId,
  FUEL_NETWORK_URL,
} from 'fuels';

/**
 * @group node
 */
describe('await-execution', () => {
  test('awaiting execution of a transaction on the provider works', async () => {
    const { cleanup, ip, port } = await launchNode({
      args: ['--poa-instant', 'false', '--poa-interval-period', '400ms'],
    });
    const nodeProvider = await Provider.create(`http://${ip}:${port}/graphql`);

    const genesisWallet = new WalletUnlocked(
      process.env.GENESIS_SECRET || randomBytes(32),
      nodeProvider
    );

    const destination = Wallet.generate({ provider: nodeProvider });

    const transfer = await genesisWallet.createTransfer(destination.address, 100, BaseAssetId, {
      gasPrice: nodeProvider.getGasConfig().minGasPrice,
      gasLimit: 10_000,
    });

    const hashedTransaction = transfer.getTransactionId(nodeProvider.getChainId());
    transfer.updateWitnessByOwner(
      genesisWallet.address,
      await genesisWallet.signTransaction(hashedTransaction)
    );

    const response = await nodeProvider.sendTransaction(transfer, { awaitExecution: true });

    expect(response.gqlTransaction?.status?.type).toBe('SuccessStatus');

    cleanup();
  });

  test.skip('transferring funds with awaitExecution works', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const genesisWallet = new WalletUnlocked(
      process.env.GENESIS_SECRET || randomBytes(32),
      provider
    );

    const sendTransactionSpy = vi.spyOn(provider, 'sendTransaction');

    const destination = Wallet.generate({ provider });

    await genesisWallet.transfer(
      destination.address,
      100,
      BaseAssetId,
      {
        gasPrice: provider.getGasConfig().minGasPrice,
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
        gasPrice: provider.getGasConfig().minGasPrice,
        gasLimit: 10_000,
      }
      // { awaitExecution: true }
    );

    expect(sendTransactionSpy).toHaveBeenCalledTimes(1);
    const awaitExecutionArg = sendTransactionSpy.mock.calls[0][1];
    expect(awaitExecutionArg).toMatchObject({ awaitExecution: true });
  });
});
