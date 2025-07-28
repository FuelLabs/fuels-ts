import { Contract, ErrorCode, ScriptTransactionRequest, Wallet } from 'fuels';
import { expectToThrowFuelError, launchTestNode } from 'fuels/test-utils';

import { CallTestContractFactory } from '../test/typegen/contracts';

import { launchTestContract } from './utils';

/**
 * @group node
 * @group browser
 */
describe('mapped error messages', () => {
  it('should throw not enough coins error', async () => {
    using contract = await launchTestContract({ factory: CallTestContractFactory });
    const expectedAssetId = await contract.provider.getBaseAssetId();

    const emptyWallet = Wallet.generate({ provider: contract.provider });

    const emptyWalletContract = new Contract(contract.id, contract.interface.jsonAbi, emptyWallet);

    await expectToThrowFuelError(() => emptyWalletContract.functions.return_void().call(), {
      code: ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS,
      message: `Insufficient funds or too many small value coins. Consider combining UTXOs.\nFor the following asset ID: '${expectedAssetId}'.`,
      metadata: { assetId: expectedAssetId },
    });
  });

  it('should throw max coins reached error', async () => {
    using launched = await launchTestNode({
      walletsConfig: {
        amountPerCoin: 1,
        coinsPerAsset: 256,
      },
    });
    const {
      provider,
      wallets: [wallet],
    } = launched;
    const expectedAssetId = await provider.getBaseAssetId();

    const request = new ScriptTransactionRequest();
    request.addCoinOutput(wallet.address, 256, await wallet.provider.getBaseAssetId());
    const txCost = await wallet.getTransactionCost(request);

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await expectToThrowFuelError(() => wallet.fund(request, txCost), {
      code: ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS,
      message: `Insufficient funds or too many small value coins. Consider combining UTXOs.\nFor the following asset ID: '${expectedAssetId}'.`,
      metadata: { assetId: expectedAssetId },
    });
  });
});
