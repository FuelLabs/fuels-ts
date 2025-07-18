import { ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { setupTestProviderAndWallets } from '../../test-utils';
import { Wallet } from '../../wallet';
import { ScriptTransactionRequest } from '../transaction-request';

/**
 * @group node
 * @group browser
 */
describe('mapped error messages', () => {
  it('should throw not enough coins error', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const assetId = await provider.getBaseAssetId();
    const sender = Wallet.generate({ provider });
    const recipient = Wallet.generate({ provider });

    await expectToThrowFuelError(() => sender.transfer(recipient.address, 1_000_000, assetId), {
      code: ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS,
      message: `Insufficient funds or too many small value coins. Consider combining UTXOs.`,
    });
  });

  it('should throw max coins reached error', async () => {
    using launched = await setupTestProviderAndWallets({
      walletsConfig: {
        amountPerCoin: 1,
        coinsPerAsset: 256,
      },
    });
    const {
      provider,
      wallets: [wallet],
    } = launched;
    const baseAssetId = await provider.getBaseAssetId();

    const request = new ScriptTransactionRequest();
    request.addCoinOutput(wallet.address, 256, baseAssetId);

    const assembleTx = () =>
      provider.assembleTx({
        request,
        feePayerAccount: wallet,
        accountCoinQuantities: [{ amount: 256, assetId: baseAssetId }],
      });

    await expectToThrowFuelError(assembleTx, {
      code: ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS,
      message: `Insufficient funds or too many small value coins. Consider combining UTXOs.`,
    });
  });
});
