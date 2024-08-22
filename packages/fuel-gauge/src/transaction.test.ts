import { TransactionType, UnknownTransactionRequest, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('Transaction', () => {
  it('should ensure a mint transaction can be decoded just fine', async () => {
    using launched = await launchTestNode({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1ms'],
        loggingEnabled: false,
      },
    });
    const { provider } = launched;

    const {
      transactions: [tx],
    } = await provider.getTransactions({ first: 1 });

    expect(tx.type).toBe(TransactionType.Mint);
  });

  it.only('Should log a warning when the transaction type is unknown', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [wallet],
    } = launched;

    // Check if a warning was logged to the console
    const consoleWarnSpy = vi.spyOn(console, 'warn');

    const amountToTransfer = 120;

    const receipient = Wallet.generate({ provider });

    const request = new UnknownTransactionRequest({
      data: '0x',
    });

    request.addCoinOutput(receipient.address, amountToTransfer, provider.getBaseAssetId());

    await wallet.sendTransaction(request);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'This transaction type is not supported in this SDK version, it will be ignored, if you believe this is an error, please upgrade your SDK'
      )
    );

    // Clean up the spy
    consoleWarnSpy.mockRestore();
  });
});
