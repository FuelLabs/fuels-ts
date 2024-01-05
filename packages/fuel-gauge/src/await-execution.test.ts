import { launchNode } from '@fuel-ts/wallet/test-utils';
import {
  Provider,
  WalletUnlocked,
  randomBytes,
  Wallet,
  BaseAssetId,
  FUEL_NETWORK_URL,
} from 'fuels';

import { getSetupContract } from './utils';

/**
 * @group node
 */
describe('await-execution', () => {
  test('awaiting execution of a transaction on the provider works', async () => {
    const { cleanup, ip, port } = await launchNode({
      args: ['--poa-interval-period', '400ms'],
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

    transfer.updateWitnessByOwner(
      genesisWallet.address,
      await genesisWallet.signTransaction(transfer)
    );

    const response = await nodeProvider.sendTransaction(transfer, { awaitExecution: true });

    expect(response.gqlTransaction?.status?.type).toBe('SuccessStatus');

    cleanup();
  });
  test('calling contracts with awaitExecution works', async () => {
    const contract = await getSetupContract('coverage-contract')();
    const sendTransactionSpy = vi.spyOn(contract.provider, 'sendTransaction');
    const gasPrice = contract.provider.getGasConfig().minGasPrice;

    const { value } = await contract.functions
      .echo_u8(3)
      .txParams({ gasPrice, gasLimit: 10_000 })
      .call({ awaitExecution: true });
    expect(value).toBe(3);

    expect(sendTransactionSpy).toHaveBeenCalledTimes(1);
    const awaitExecutionArg = sendTransactionSpy.mock.calls[0][1];
    expect(awaitExecutionArg).toMatchObject({ awaitExecution: true });
  });

  test('transferring funds with awaitExecution works', async () => {
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
      },
      { awaitExecution: true }
    );

    expect(sendTransactionSpy).toHaveBeenCalledTimes(1);
    const awaitExecutionArg = sendTransactionSpy.mock.calls[0][1];
    expect(awaitExecutionArg).toMatchObject({ awaitExecution: true });
  });

  test('withdrawToBaseLayer works with awaitExecution', async () => {
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
      },
      { awaitExecution: true }
    );

    expect(sendTransactionSpy).toHaveBeenCalledTimes(1);
    const awaitExecutionArg = sendTransactionSpy.mock.calls[0][1];
    expect(awaitExecutionArg).toMatchObject({ awaitExecution: true });
  });
});
