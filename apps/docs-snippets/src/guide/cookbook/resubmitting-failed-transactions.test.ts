import { bn, type FuelError } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('Resubmitting Failed Transactions', () => {
  it('should submit transaction just fine', async () => {
    const {
      provider,
      wallets: [wallet, recipient],
    } = await launchTestNode({
      walletsConfig: {
        count: 2,
      },
    });
    const baseAssetId = provider.getBaseAssetId();

    const transferAmount = 1000;

    // #region resubmitting-failed-transactions-1
    const transactionRequest = await wallet.createTransfer(
      recipient.address,
      transferAmount,
      baseAssetId
    );

    const response = await wallet.sendTransaction(transactionRequest);
    // #endregion resubmitting-failed-transactions-1

    // #region resubmitting-failed-transactions-2
    const result = await response.waitForResult();
    // #endregion resubmitting-failed-transactions-2

    expect(result.isStatusSuccess).toBeTruthy();
  });

  it('should try to re-submit the transaction', async () => {
    const {
      provider,
      wallets: [wallet, recipient],
    } = await launchTestNode({
      walletsConfig: {
        count: 2,
      },
    });
    const baseAssetId = provider.getBaseAssetId();
    const transferAmount = 1000;

    await expect(async () => {
      // #region resubmitting-failed-transactions-3
      const transactionRequest = await wallet.createTransfer(
        recipient.address,
        transferAmount,
        baseAssetId
      );

      // Set the gasLimit to 0 to force revert with OutOfGas error
      transactionRequest.gasLimit = bn(0);

      // Transaction will be successfully submitted
      const response = await wallet.sendTransaction(transactionRequest);
      try {
        await response.waitForResult();
      } catch (error) {
        if (/OutOfGas/.test((<FuelError>error).message)) {
          transactionRequest.gasLimit = bn(1000);
          // Re-submission will fail
          await wallet.sendTransaction(transactionRequest);
        }
      }
      // #endregion resubmitting-failed-transactions-3
    }).rejects.toThrow('Transaction is not inserted. UTXO does not exist: 0x');

    await expect(
      (async () => {
        const transactionRequest = await wallet.createTransfer(
          recipient.address,
          transferAmount,
          baseAssetId
        );

        transactionRequest.gasLimit = bn(0);

        const response = await wallet.sendTransaction(transactionRequest);
        // #region resubmitting-failed-transactions-4
        try {
          await response.waitForResult();
        } catch (error) {
          if (/OutOfGas/.test((<FuelError>error).message)) {
            const transactionRequest2 = await wallet.createTransfer(
              recipient.address,
              transferAmount,
              baseAssetId
            );

            await wallet.sendTransaction(transactionRequest2);
          }
        }
        // #endregion resubmitting-failed-transactions-4
      })()
    ).resolves.not.toThrow();
  });
});
